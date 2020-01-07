// pages/invoice/invoice.js
import { ip } from '../../../utils/getApi.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
   * 用户点击停车开票
   */
  invoiceCarClick: function () {
    wx.navigateTo({
      url: '/pages/module1/invoiceList/invoiceList',
    })
  },

  /**
   * 用户点击开票历史
   */
  invoiceHistoryClick: function () {
    wx.navigateTo({
      url: '/pages/module1/invoiceHistory/invoiceHistory',
    })
  },

  /**
   * 用户点击开票历史
   */
  invoiceHelpClick: function () {
    wx.navigateTo({
      url: '/pages/module1/invoiceHelp/invoiceHelp',
    })
  },

})