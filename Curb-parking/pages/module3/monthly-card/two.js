// pages/monthly-card/two.js
import { getPaySign } from '../../../utils/util.js';
import { ip, wxpay } from '../../../utils/getApi.js';
// var re = /([0-9]+\.[0-9]{2})[0-9]*/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo:0,
    btnIndex:1,
    totalAmount:0,
    month:1,
    canPlay:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.checkUserId()){
      let id = options.id;
      console.log("a:" + id);
      let list = wx.getStorageSync("monthCardList");
      console.log(list);
      let item;
      for (let i = 0; i < list.length; i++) {
        if (list[i].GID == id) {
          item = list[i];
          break;
        }
      }
      this.setData({
        cardInfo: item,
        totalAmount: Math.round(item.Amount * 100) / 100
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您未登录或登录已失效，请重新登录！',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/module4/register/register'
            })
          }
        }
      })
    }

  },
  selectMonth:function(e){
    let index = e.currentTarget.dataset.index;
    let amount = this.data.cardInfo.Amount * index;
    this.setData({
      btnIndex : index,
      totalAmount: Math.round(amount * 100) / 100 ,
      month:index,
      canPlay:true
    })
  },
  monthInput:function(e){
    var regNum = new RegExp('[0-9]+', 'g');
    console.log(e.detail.value);
    if (e.detail.value != ""){
      let value = regNum.exec(e.detail.value);
      console.log(value);
      if (value != null) {
        let amount = this.data.cardInfo.Amount * value;
        this.setData({
          month: parseInt(value),
          btnIndex: 0,
          totalAmount: Math.round(amount * 100) / 100,
          canPlay:true
        })
      }else{
        
        this.setData({
          btnIndex: 1,
          canPlay:false,
          totalAmount:0
        })
      }
    }else{
      this.setData({
        btnIndex: 1,
        
      })
    }
  },
  monthRenewals:function(e){
    console.log(this.data.cardInfo);
    if(!this.data.canPlay){
      wx.showToast({
        title: '请输入正确月数',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let monthNum = this.data.month;
    let gid = this.data.cardInfo.GID;
    let amount = this.data.totalAmount;
    let userId = wx.getStorageSync('userId');
    //let amount = 0.01;
    console.log("month:" + monthNum);
    wx.request({
      url: ip+'/api/XiaoChengXu/MonthRenewalsPay',
      data:{
        GID:gid,
        month: monthNum,
        paymoney: amount,
        userId: userId
      },
      success(res){
        let code = res.data.code;
        if(code == "2000"){
          var myObj = {
            'timeStamp': res.data.data.timeStamp+'',
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.prepayId,
            'signType': res.data.data.signType,
            'appId': wxpay.appid
          }
          let keys = Object.keys(myObj);
          let len = keys.length;
          let Sign = getPaySign(myObj, keys,len);
          console.log(res.data.data);
          let orderNo = res.data.data.orderNo;
          let prepayId = res.data.data.prepayId;
          wx.requestPayment(
            {
              'timeStamp': res.data.data.timeStamp+'',
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.prepayId,
              'signType': res.data.data.signType,
              'paySign': Sign,
              'success': function (re) {
                console.log("success" + re);
                wx.request({
                  url: ip+'/api/XiaoChengXu/MonthRenewals_Noify',
                  //url: res.data.data.notifyUrl,
                  data: {
                    orderNo: orderNo,
                    status: 0,
                    prepayId: prepayId,
                    GID: gid
                  },
                  success(r) {
                    let code = r.data.code;
                    if (code == "2000") {
                      wx.showModal({
                        title: '提示',
                        content: r.data.msg + '',
                        showCancel: false,
                        success(rr) {
                          if (rr.confirm) {
                            wx.redirectTo({
                              url: '/pages/module3/monthly-card/one'
                            })
                          }
                        }
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: r.data.msg + '',
                        showCancel: false,
                        success(rr) {
                          if (rr.confirm) {
                            wx.redirectTo({
                              url: '/pages/module3/monthly-card/one'
                            })
                          }
                        }
                      })
                    }
                  }
                })
               },
              'fail': function (res) {
                console.log(res);
               }
            })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg+'',
            showCancel: false
          })
        }
      }
    })
  },
  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      wx.redirectTo({
        url: 'pages/module4/register/register'
      })
      
      return false;
    } else {
      return true;
    }
  }
})