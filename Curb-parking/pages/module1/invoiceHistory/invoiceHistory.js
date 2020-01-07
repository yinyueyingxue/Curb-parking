// pages/module1/invoiceHistory/invoiceHistory.js

import { ip, httpApi } from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listModels: [],
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

    var mobilePhone = wx.getStorageSync("mobilePhone");
      wx.request({
        url: httpApi.GetUnInvoiceHis,
        data: {
          mobilePhone: mobilePhone,
        },

        success(res) {
          console.log("开票历史 res =", res);
          if(res.data.code == 0) {
            
            var statusTitle = '';
            var titleColor = '';
            for(var i = 0; i < res.data.data.length; i++) {
              var status = res.data.data[i].status;
              if(status == 0) {
                statusTitle = '已开票';
                titleColor = '#888888';
              }else if (status == 1) {
                statusTitle = '待开票';
                titleColor = '#FF8000';
              }else {
                statusTitle = '审核失败';
                titleColor = '#D0142C';
              }
              res.data.data[i].statusTitle = statusTitle;
              res.data.data[i].titleColor = titleColor;
            }

            that.setData({
              listModels: res.data.data,
            })
          }
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

  },
  /**
   * 用户点击列表
   */
  listViewClick: function (e) {
    console.log(e);
    var item = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/module1/invoiceDetails/invoiceDetails?addresstel= ' + item.addresstel + '&banknum=' + item.banknum + '&email=' + item.email + '&invoiceamount=' + item.invoiceamount + '&invoicecontent=' + item.invoicecontent + '&invoicetime=' + item.invoicetime + '&invoicetitle=' + item.invoicetitle + '&mobile=' + item.mobile + '&msg=' + item.msg + '&statustitle=' + item.statustitle + '&titlecolor=' + item.titlecolor + '&taxnum=' + item.taxnum + '',
    })
  }
})