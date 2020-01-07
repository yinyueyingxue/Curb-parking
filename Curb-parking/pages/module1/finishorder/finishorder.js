import {
  ip
} from '../../../utils/getApi.js';
Page({
  data: {
    plateNo: "",
    pkId: "",
    pkName: "",
    inTime: "",
    parkTime: "",
    amount: "0.0",
    payAmount: "0.0",
    discountAmount: "0.0",
    orderNo: "",
    boxshow: false,
    imgshow: false,
    marginTop: "",
  },
  onLoad: function (options) {
  
    var that = this;

    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.data.isIphoneX = true
          that.setData({
            marginTop: "178rpx",
          })
        } else {
          that.setData({
            marginTop: "128rpx",
          })
        }
      }
    })


    that.setData({
      plateNo: options.plateno,
      pkId: options.pkid,
      pkName: options.pkname,
      inTime: options.intime,
      parkTime: options.parktime,
      amount: options.amount,
      payAmount: options.payamount, 
      discountAmount: options.discountamount,
      orderNo: options.orderno,
    })

  },
  onShow() {},
  btnSubmitPaymentRequest() {
    let respayAmount = this.data.payAmount;
    let resplateNo = this.data.plateNo;
    let respkpkId = this.data.pkId;
    let respkparkTime = this.data.parkTime;
    let respkName = this.data.pkName;

    console.log("respayamount=" + respayAmount);
    console.log("resplatenumber=" + resplateNo);
    console.log("resPKID=" + respkpkId);
    let openid = "";
    //获取code
    wx.login({
      success(res) {
        if (res.code) {
          console.log("res=" + JSON.stringify(res));
          let rescode = res.code;

          //  wx.showLoading("请稍后...") ;
          //发起网络请求 根据code获取openid,然后去预支付统一下单
          wx.request({
            url: ip + '/api/XiaoChengXu/SendCode',
            data: {
              code: rescode
            },

            header: {
              'content-type': 'application/json' // 默认值
            },
            success(sendCoderes) {
              let sendCoderesult = JSON.stringify(sendCoderes);
              console.log("success sendCoderesult1=" + sendCoderesult);
              let resultcodeMsg = JSON.parse(sendCoderes.data);
              if (resultcodeMsg.code == "1000") {
                openid = resultcodeMsg.data.openid;
                console.log('openid=' + openid)
              } else {
                console.log('openid获取失败')
              }

              if (openid != "") {
                // 发起网络请求
                wx.request({
                  url: ip + '/api/XiaoChengXu/Pay',
                  data: {
                    openid: openid,
                    fee: respayamount,
                    platenumber: resplatenumber,
                    pkid: resPKID
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(payres) {
                    //返回openid
                    // let result = JSON.stringify(payres);
                    let payresstr = JSON.stringify(payres);
                    console.log("success payresstr=" + payresstr);
                    let resultcodeMsg = payres.data;
                    let resultorderNo = resultcodeMsg.data.orderNo;
                    let resulttimeStamp = resultcodeMsg.data.timeStamp;
                    let resultnonceStr = resultcodeMsg.data.nonceStr;
                    let resultpackage = resultcodeMsg.data.prepayId;
                    let resultpaySign = resultcodeMsg.data.sign;
                    let resultopenid = resultcodeMsg.data.openid;
                    console.log("Notifysuccess resultorderNo=" + resultorderNo);
                    //调微信支付
                    wx.requestPayment({
                      timeStamp: resulttimeStamp,
                      nonceStr: resultnonceStr,
                      package: 'prepay_id=' + resultpackage,
                      signType: 'MD5',
                      paySign: resultpaySign,
                      success(paymentres) {
                        console.log("success Paymentres=" + JSON.stringify(paymentres));
                        //发起网络请求
                        wx.request({
                          url: ip + '/api/XiaoChengXu/Notify',
                          data: {
                            openid: resultopenid,
                            wxOrderNum: resultpackage,
                            orderNum: resultorderNo
                          },
                          header: {
                            'content-type': 'application/json' // 默认值
                          },
                          success(notifyres) {
                            console.log("Notifysuccess Notifyresstr=" + JSON.stringify(notifyres));
                            console.log("Notifysuccess Notifyres=" + notifyres);
                            wx.navigateTo({
                              url: '/pages/module1/order-success/order-success?payamount=' + respayamount + '&plate=' + resplatenumber + '&parkingtime=' + resparkingtime + '&place=' + resplace
                            });
                          },
                          fail(notifyres) {
                            console.log("fail Notifyres=" + notifyres);
                          }

                        })

                      },
                      fail(paymentres) {
                        console.log("fail Paymentres=" + JSON.stringify(paymentres));
                      }
                    })
                  }

                })

              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  showimg() {
    this.setData({
      imgshow: true,
    })
  },
  closeimg() {
    this.setData({
      imgshow: false,
    })
  }
})