// pages/home-page/details.js
import {
  ip
} from '../../../utils/getApi.js';
import {
  checkLogin
} from '../../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    pkName: '',
    distance: 0,
    address: '',
    spaceBitNum: 0,
    carBitNum: 0,
    carBitNumLeft: 0,
    pointLng: 0,
    pointLat: 0,
    pointName: '',
    pointAddress: '',
    feeremark: '',
    coordinate:'',
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("停车场详情 = ", options);
    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    that.setData({
      pkName: options.pkName,
      distance: options.distance,
      address: options.address,
      spaceBitNum: options.spaceBitNum,
      carBitNum: options.carBitNum,
      carBitNumLeft: options.carBitNumLeft,
      pointLng: options.pointLng,
      pointLat: options.pointLat,
      pointName: options.pointName,
      pointAddress: options.pointAddress,
      feeremark: options.feeremark,
      coordinate: options.coordinate
    })
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /// 点击定位按钮调用的方法
  navigation: function (e) {
    var that = this;

    let arr = that.data.coordinate.split(',');

    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息 
      success: function (res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          latitude: parseFloat(arr[1]), //要去的纬度-地址
          longitude: parseFloat(arr[0]), //要去的经度-地址
          name: that.data.pkName,
          address: that.data.address
        })
      }
    })
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

  }
})