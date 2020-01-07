// pages/module2/home-page/nearby.js
import {
  ip
} from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: 0,
    lng: 0,
    pkName:'',
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
      lat: options.pointLat,
      lng: options.pointLng,
      pkName: options.pkName
    })

    that.getAllPark();
  },
  getAllPark: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: ip + '/api/XiaoChengXu/GetAllParkDetails',
      data: {
        "index": "1",
        "PKName": that.data.pkName,
        "fromLat": that.data.lat,
        "fromLng": that.data.lng
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          var data = JSON.stringify(res.data.resultData);
          var parkList = JSON.parse(data);
          that.setData({
            parkList: parkList
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  navigation: function (e) {
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息 
      success: function (res) {
        wx.openLocation({//使用微信内置地图查看位置。
          latitude: e.currentTarget.dataset.lat,//要去的纬度-地址
          longitude: e.currentTarget.dataset.lng,//要去的经度-地址
          name: e.currentTarget.dataset.name,
          address: e.currentTarget.dataset.address
        })
      }
    })
  },
  toDetails: function (e) {
    console.log("222222 =", e);
    var that = this;
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'details?pkName=' + data.pkname + '&distance=' + data.distance + '&address=' + data.address + '&spaceBitNum=' + data.spacebitnum + '&carBitNum=' + data.carbitnum + '&pointLat=' + data.pointlat + '&pointLng=' + data.pointlng + '&pointName=' + data.pointname + '&pointAddress=' + data.pointaddress + '&feeremark=' + data.feeremark + ''
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