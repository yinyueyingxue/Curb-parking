// pages/module2/homepage/homepage.js

import { ip, httpApi } from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['1'],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    navH: 0,
    navT: 0,
    homeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSystemInfo({
    //   success: res => {
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       this.data.isIphoneX = true
    //       console.log("----------");
    //       this.setData({
    //         // navH: 88,
    //         navMarginTitle: "100rpx",
    //         marginTop: "180rpx",
    //       })
    //     } else {
    //       console.log("++++++++++");
    //       this.setData({
    //         // navH: 60,
    //         navMarginTitle: "60rpx",
    //         marginTop: "128rpx",
    //       })
    //     }
    //   }
    // })

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    wx.getLocation({
      type: "wgs84",
      // altitude: true,
      success(res) {
        let lng = parseFloat(res.latitude).toFixed(6);
        let lat = parseFloat(res.longitude).toFixed(6);

        that.setData({
          'lng': lat,
          'lat': lng,
          authUserLocation: true,
          showLocation: true
        });

        wx.request({
          url: httpApi.GetNearlyPark,
          data: {
            'lon': that.data.lng,
            'lat': that.data.lat,
          },

          success(res) {

            if (res.data.code == 0) {

              var result = res.data.data;

              console.log("首页 result =", result);

              var resultNum = 0;

              for (var i = 0; i < result.length; i++) {

                if (result[i].carBitNumLeft == 0) {
                  console.log("------");
                  resultNum = 100;
                } else {
                  console.log("++++++");
                  resultNum = 1 - (result[i].carBitNumLeft / result[i].carBitNum);
                  resultNum = resultNum * 100;
                }

                result[i].resultNum = parseInt(resultNum);

                console.log("resultNum =", resultNum);
              }

              for (var i = 0; i < result.length; i++) {
                let distance = parseFloat(result[i].distance).toFixed(1);
                result[i].distance = distance;
              }

              that.setData({
                homeList: result,
              })

              console.log("result =", result);

            } else {
              wx.showToast({
                title: res.data.msg,
                duration: 1500,
                icon: 'none',
              })
            }

          }

        })
      },
      fail(err) {
        console.log(err)
      }
    });

    console.log(that.data.navH, that.data.navT);
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击停车缴费
   */
  stopCarClick: function () {
    wx.reLaunch({
      url: '/pages/module3/services/services',
    })
  },

  /**
   * 用户点击长租车位
   */
  longRentCarClick : function () {
    wx.navigateTo({
      url: '/pages/module2/longRentCar/longRentCar',
    })
  },

  /**
   * 用户点击钱包充值
   */
  walletTopUpClick : function () {
    wx.navigateTo({
      url: '/pages/module2/topUp/topUp',
    })
  },

  /**
   * 点击定位按钮调用的方法
   */ 
  navigation: function (e) {
    let arr = e.currentTarget.dataset.coordinate.split(',');
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息 
      success: function (res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          latitude: parseFloat(arr[1]), //要去的纬度-地址
          longitude: parseFloat(arr[0]), //要去的经度-地址
          name: e.currentTarget.dataset.name,
          address: e.currentTarget.dataset.address
        })
      }
    })
  },

})