import { ip, httpApi } from '../../../utils/getApi.js';

// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    dates: [],
    dates2: [],
    dates3: [],
    navH: 0,
    navT: 0,
    marginTop: "",
    titleMarginTop: "",
  }, 
  
  onLoad: function (options) {
    console.log("options=", options);

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    // wx.getSystemInfo({
    //   success: res => {
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       that.data.isIphoneX = true
    //       that.setData({
    //         marginTop: "178rpx",
    //         titleMarginTop: "180rpx",
    //       })
    //     } else {
    //       that.setData({
    //         marginTop: "128rpx",
    //         titleMarginTop: "130rpx",
    //       })
    //     }
    //   }
    // })
    
  },

  onShow: function () {
    let mobilePhone = wx.getStorageSync("mobilePhone");
    console.log(mobilePhone)
    let that = this;
    // wx.showLoading({
    //   title: '加载中',
    // });
    // 发起网络请求
    wx.request({
      url: httpApi.GetOrderRecord,
      data: {
        mobilePhone: mobilePhone,
        orderStatus: 3,
        plateNo: '',
      },
      success(res) {
        console.log("ghuyuyuy", res)
        wx.hideLoading();
        let code = res.data.code;
        if (code == '0') {

          if (res.data.data.length < 0) {
            return;
          }

          var result = res.data.data;
          var unPayAmount = 0;
          var unDiscountAmount = 0;
          for (var i = 0; i < result.length; i++) {
            unPayAmount = parseFloat(result[i].unPayAmount).toFixed(2);
            result[i].unPayAmount = parseFloat(unPayAmount);

            unDiscountAmount = parseFloat(result[i].unDiscountAmount).toFixed(2);
            result[i].unDiscountAmount = parseFloat(unDiscountAmount);

          }

          that.setData({
            "dates": result,
          })

          console.log("8888", that.data.dates);

        }

      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500
        })
      }

    }) 
  },

  onReady: function () {
    if (this.checkUserId() == false) {
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

  //用户点击tab时调用
  titleClick: function (e) {

    console.log("ccc");
    this.setData({
      //拿到当前索引并动态改变
      "currentIndex": e.currentTarget.dataset.idx
    })
    let mobilePhone = wx.getStorageSync("mobilePhone");
    let that = this;
  },
  //swiper切换时会调用
  pagechange: function (e) {
   
      this.setData({
        "currentIndex": e.detail.current,
      })
  },

  detailsClick: function (e) { 

    var result = e.currentTarget.dataset;

    console.log("-----------e=",e);

    console.log("parktime=", result.parktime, "paystatus=", result.paystatus);

    // var lookstr = 'DDJL';

    wx.navigateTo({
      url: '/pages/module1/parkrecordDetails/parkrecordDetails?orderNo=' + result.orderno + '&plateNo=' + result.plateno + '&parkName=' + result.parkname + '&inTime=' + result.intime + '&outTime=' + result.outtime + '&carStatus=' + result.carstatus,
    })

      // wx.navigateTo({ 
      //   url: '/pages/module1/parkrecordDetails/parkrecordDetails?plateNo=' + result.plateno + '&amount=' + result.totalamount + '&pkid=' + result.pkid + '&parktime=' + result.duration + '&pkname=' + result.pkname + '&orderNo=' + result.orderno + '&recordId=' + result.recordid + '&status=' + result.status + '&lookstr=' + lookstr + '&intime=' + result.intime + '&outtime=' + result.outtime + ''
      //   });
    
  },

  /// 点击支付按钮
  payBtnClick: function (e) {

    console.log("点击了支付按钮 e =", e);

    var result = e.currentTarget.dataset;

    wx.request({
      url: httpApi.OrderPay,
      data: {
        "orderNo": result.orderno,
      },
      success(res) {

        console.log("生成订单 res =", res);

        if(res.data.code == 0) {

          console.log("dfsdfahsfjk");

          var result = res.data.data;
          
          var lookstr = 'DDJL';

          wx.navigateTo({
            url: '/pages/module1/order/order?plateno=' + result.plateNo + '&unpayamount=' + result.unPayAmount + '&payamount=' + result.payAmount + '&pkid=' + result.pkid + '&parktime=' + result.parkTime + '&intime=' + result.inTime + '&pkname=' + result.parkName + '&orderno=' + result.payRecId + '&unDiscountAmount=' + result.unDiscountAmount + '&carstatus=' + result.carStatus + '&lookstr=' + lookstr + ''
          });
        }else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon: "none",
          })
        }
      }
    })
 
  }

})