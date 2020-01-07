import { ip, httpApi } from '../../../utils/getApi.js';

// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    dates: [],
    recordId: '',
    navH: 0,
    navT: 0,
  },

  onLoad: function (options) {
    console.log("options=", options);

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
      recordId: options.recordId,
    })

  },

  onShow: function () {

    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    // 发起网络请求
    wx.request({
      url: httpApi.GetOrderRecordById,
      data: {
        "recordId": that.data.recordId,
      },
      success(res) {
        console.log("ghuyuyuy", res)
        wx.hideLoading();
        let code = res.data.code;
        if (code == '0') {
          that.setData({
            "dates": res.data.data,
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
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        "currentIndex": currentPageIndex
      })

    }
  },

  orderbtn: function (e) {

    var result = e.currentTarget.dataset;

    console.log("-----------e=", e);

    console.log("parktime=", result.parktime, "paystatus=", result.paystatus);

    var lookstr = 'DDJL';


    if (result.paystatus == "1") {

      wx.navigateTo({

        url: '/pages/module1/finishorder/finishorder?plateno=' + result.plateno + '&amount=' + result.amount + '&payamount=' + result.payamount + '&discountamount=' + result.discountamount + '&pkid=' + result.pkid + '&parktime=' + result.parktime + '&intime=' + result.intime + '&pkname=' + result.pkname + '&lookstr=' + lookstr + ''
      });

    } else {

      wx.navigateTo({
        url: '/pages/module1/order/order?plateno=' + result.plateno + '&amount=' + result.amount + '&payamount=' + result.payamount + '&discountamount=' + result.discountamount + '&pkid=' + result.pkid + '&parktime=' + result.parktime + '&intime=' + result.intime + '&pkname=' + result.pkname + '&orderno=' + result.orderno + '&lookstr=' + lookstr + ''
      });

    }

  }
})