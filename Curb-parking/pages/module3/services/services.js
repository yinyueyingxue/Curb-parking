// pages/services/services.js
import { ip, httpApi, wxpay } from '../../../utils/getApi.js';

let num = 0;

// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList:[],
    duration:'', /// 停车时长
    showList: false,
    city: '浙',
    area: 'A',
    are1: '',
    are2: '',
    are3: '',
    are4: '',
    are5: '',
    xny: '',
    comHidden: false,
    btnokshowView: false,
    cityshowView: false,
    areashowView: false,
    cityselect: false,
    areaselect: false,
    are1select: false,
    are2select: false,
    are3select: false,
    are4select: false,
    are5select: false,
    xnyselect: false,
    numError: "",
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })
    
  },

  getUserInfo: function (e) {

    var that = this;

    if (e.detail.userInfo != null) {
      try {
        wx.setStorageSync('nickName', e.detail.userInfo.nickName);
        wx.setStorageSync('headPortrait', e.detail.userInfo.avatarUrl)
        wx.login({
          success(res) {
            console.log("HFDSJFGAK", res.code);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: httpApi.SaveUserInfo,
                data: {
                  headImgUrl: e.detail.userInfo.avatarUrl,
                  mobilePhone: "15626444525",
                  nickName: e.detail.userInfo.nickName,
                  wxCode: res.code,
                  appId: wxpay.appid,
                },
                success(res) {
                  if(res.data.code == 0) {
                    console.log("00000000", res, res.data.data);
                    wx.setStorageSync('openId', res.data.data);

                    that.btnComputeParkingFee()
                  }
                  
                }
              })
            } else {

            }
          }
        });
      } catch (e) {
        console.log(e)
      }

      this.setData({
        showAuthorityRequestMask: false
      })

    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 1500
      })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    that.setData({
      showList: true,
      city: '浙',
      area: 'A',
      are1: '',
      are2: '',
      are3: '',
      are4: '',
      are5: '',
      xny: '',
    });

    if (mobilePhone.length == 11) {
      that.setData({
        hiddenService: true,
      })
    } else {
      that.setData({
        hiddenService: false,
      })
    }

    if(mobilePhone.length < 11) {
      return;
    }
    // wx.showLoading({
    //   title: '加载中',
    // });

    wx.request({
      url: httpApi.GetOrderRecord,
      data: {
        mobilePhone: mobilePhone,
        orderStatus: 1,
        plateNo: '',
      },

      success(res) {

        // wx.hideLoading();

        let result = res.data;

        console.log("停车缴费 res =", res);

        if (result.code == "0") {

          if (result.data.length == 0) {
            that.setData({
              hiddenService: false,
            })
          } else {
            that.setData({
              hiddenService: true, 
            })
          }

          result = result.data;

          var unPayAmount = 0;
          var unDiscountAmount = 0;
          for (var i = 0; i < result.length; i++) {
            unPayAmount = parseFloat(result[i].unPayAmount).toFixed(2);
            result[i].unPayAmount = parseFloat(unPayAmount);

            unDiscountAmount = parseFloat(result[i].unDiscountAmount).toFixed(2);
            result[i].unDiscountAmount = parseFloat(unDiscountAmount);

          }

          that.setData({
            payList: result,
          })

        }else {
          that.setData({
            hiddenService: false,
          })
        }
      },

    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      comHidden: false,
      btnokshowView: false,
      cityshowView: false,
      areashowView: false,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    var that = this;

    that.setData({
      'payList': [],
    })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //点击确认
  btnComputeParkingFee: function () {

    // //微信小程序发起支付请求

    var that = this;

    // let userId = wx.getStorageSync("userId");
    let userId = "123";
    //console.log(this.data.city); 
    if ((that.data.city == "" && that.data.city == null) || that.data.area == "" || that.data.are1 == "" || that.data.are2 == "" || that.data.are3 == "" || that.data.are4 == "" || (that.data.are5 == "" && that.data.are5 == null && that.data.are5 == undefined)) {
      that.setData({
        numError: "请输入正确的车牌号",
      })
    } else {

      that.setData({
        numError: "",
      });

      let plate = that.data.city + that.data.area + that.data.are1 + that.data.are2 + that.data.are3 + that.data.are4 + that.data.are5 + that.data.xny;
      
      if(plate.length < 7) {
        return;
      }

      wx.request({
        url: httpApi.GetOrderRecord,
        data: {
          mobilePhone: '',
          orderStatus: 1,
          plateNo: plate,
        },

        success(res) {

          console.log("临停缴费 res =", res);

          if (res.data.data != null) {

            wx.navigateTo({
              url: '/pages/module3/stopPayList/stopPayList?plateNo=' + plate,
            });
        

            // var parkOrder = res.data.data.parkOrder;
            // var inPark = res.data.data.inPark;

            // if (parkOrder.length > 0) {
            //   wx.navigateTo({
            //     url: '/pages/module3/stopPayList/stopPayList?plateNo=' + plate,
            //   });
            // } else {

            //   if (inPark == undefined) {
            //     wx.showToast({
            //       title: '停车费用为0元，不用缴费！！！',
            //       duration: 1500,
            //       icon: 'none',
            //     })
            //     return;
            //   }

            //   var result = inPark;

            //   var receivable = result.receivable;
            //   var pkname = result.pkname;
            //   var plateNo = result.plateNo;
            //   var inTime = result.inTime;
            //   var id = result.id;
            //   var pkno = result.pkno;
            //   var pkid = result.pkid;
            //   var tradingNo = result.tradingNo;
            //   var parkTime = result.parkTime;

            //   wx.navigateTo({
            //     url: '/pages/module3/services/payCost/confirmOrder?receivable=' + receivable + "&pkname=" + pkname + "&plateNo=" + plateNo + "&inTime=" + inTime + "&parkTime=" + parkTime + "&id=" + id + "&pkno=" + pkno + "&pkid=" + pkid + "&tradingNo=" + tradingNo,
            //   });
            // }


          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }

        },

      })

    }

  },

  //省份键盘输入
  city(e) {
    let txt = e.target.dataset.textdata;
    if (txt == "删") {
      num = 0;
      this.setData({
        city: '',
        comHidden: true,
        btnokshowView: true,
        cityshowView: true,
        areashowView: false,
        cityselect: true,
        areaselect: false,
        are1select: false,
        are2select: false,
        are3select: false,
        are4select: false,
        are5select: false,
        xnyselect: false,
      })
    }
    else {
      num++;
      this.setData({
        city: txt,
        comHidden: true,
        btnokshowView: true,
        cityshowView: false,
        areashowView: true,
        cityselect: false,
        areaselect: true,
        are1select: false,
        are2select: false,
        are3select: false,
        are4select: false,
        are5select: false,
        xnyselect: false,
      })
    }
  },
  //数字字母键盘输入
  num(e) {
    let txt = e.target.dataset.textdata;
    if (txt == "删") {
      switch (num) {
        case 1:
          this.setData({
            area: "",
            comHidden: true,
            btnokshowView: true,
            cityshowView: true,
            areashowView: false,
            cityselect: true,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 2:
          this.setData({
            are1: "",
            comHidden: true,
            cityselect: false,
            areaselect: true,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 3:
          this.setData({
            are2: "",
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: true,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 4:
          this.setData({
            are3: "",
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: true,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 5:
          this.setData({
            are4: "",
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: true,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 6:
          this.setData({
            are5: "",
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: true,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 7:
          this.setData({
            xny: "",
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        default:
          break;
      }
    }
    else {
      switch (num) {
        case 0:
        case 1:
          this.setData({
            area: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: true,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 2:
          this.setData({
            are1: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: true,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 3:
          this.setData({
            are2: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: true,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 4:
          this.setData({
            are3: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: true,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 5:
          this.setData({
            are4: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: true,
            xnyselect: false,
          })
          num++;
          break;
        case 6:
          this.setData({
            are5: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: true,
            xnyselect: false,
          })
          break;
        case 7:
          this.setData({
            xny: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: true,
          })
          break;
        default:
          break;
      }
    }
  },
  //车牌号
  citybtn(e) {
    wx.hideTabBar({
      
    });
    num = 0;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: true,
      areashowView: false,
      cityselect: true,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  areabtn(e) {
    wx.hideTabBar({

    });
    num = 1;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: true,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })

  },
  are1btn(e) {
    wx.hideTabBar({

    });
    num = 2;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: true,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are2btn(e) {
    wx.hideTabBar({

    });
    num = 3;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: true,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are3btn(e) {
    wx.hideTabBar({

    });
    num = 4;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: true,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are4btn(e) {
    wx.hideTabBar({

    });
    num = 5;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: true,
      are5select: false,
      xnyselect: false,
    })
  },
  are5btn(e) {
    wx.hideTabBar({

    });
    num = 6;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: true,
      xnyselect: false,
    })
  },
  xnybtn(e) {
    wx.hideTabBar({

    });
    num = 7;
    this.setData({
      comHidden: true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: true,
    })
  },
  //键盘 确定按钮
  inputok(e) {
    wx.showTabBar({
      
    });
    this.setData({
      comHidden: false,
      btnokshowView: false,
      cityshowView: false,
      areashowView: false,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },


  // 点击去缴费
  toPayOnClick:function (e) {

    var that = this;

    if (that.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    }

    var res = that.data.payList[e.target.dataset.index];

    console.log("去缴费 res=", res);

    let unpayamount = res.unPayAmount;
    let pkname = res.parkName;
    let plateNo = res.plateNo;
    let inTime = res.inTime;
    let id = res.id;
    let pkno = res.pkno;
    let pkid = res.pkid;
    let orderNo = res.orderNo;
    let parkTime = res.parkTime;
    let unDiscountAmount = res.unDiscountAmount;
    let carStatus = res.carStatus;
    let lookStr = 'LTJF';

    console.log(unpayamount, pkname, plateNo, inTime, id, pkno, pkid, orderNo, parkTime)
    
    wx.navigateTo({
      url: '/pages/module3/services/payCost/confirmOrder?unpayamount=' + unpayamount + "&pkname=" + pkname + "&plateNo=" + plateNo + "&inTime=" + inTime + "&parkTime=" + parkTime + "&id=" + id + "&pkno=" + pkno + "&pkid=" + pkid + "&orderNo=" + orderNo + '&unDiscountAmount=' + unDiscountAmount + '&carStatus=' + carStatus + '&lookStr=' + 'LTJF',
    });

  },

  // 点击其他车辆
  bottomViewClick:function() {

    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    } else {
      wx.navigateTo({ url: '/pages/module3/services/stopPay' });
    }

  },


  getPayList:function(){
    if (this.checkUserId() == false) {
      wx.navigateTo({
          url: '/pages/module4/register/register'
        })
     
    }else{
      wx.navigateTo({ url: '/pages/module1/paylist/paylist' });
    }
    
  },

  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      // wx.redirectTo({
      //   url: 'pages/module4/register/register'
      // })
      return false;
    } else {
      return true;
    }
  },

  
})