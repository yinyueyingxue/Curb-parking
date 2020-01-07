// pages/module2/walletTopUp/walletTopUp.js

import { ip, httpApi } from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    navT: 0,
    balance: 0, /// 账户余额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    wx.request({
      url: httpApi.QueryAccountBalance,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNum: '15988845617',
      },
      success(res) {
        console.log("获取钱包余额",res);

        if(res.data.code == 0) {
          
          that.setData({
            balance: res.data.data.balance,
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
   * 用户点击充值
   */
  topUpViewClick: function () {
    wx.navigateTo({
      url: '/pages/module2/topUp/topUp',
    })
  },

  /**
   * 用户点击无感支付授权
   */
  payViewClick: function () {
    wx.showModal({
      title: "开通无感支付",
      content: '开通后，余额低于200元时，出场自动使用余额付款',
      // showCancel: false,//是否显示取消按钮
      confirmText: "确定",//默认是“确定”
      confirmColor: '#407EC2',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
        }
      },
    })
  },

  /**
   * 用户点击授权绑定
   */
  impowerViewClick: function () {
    wx.showModal({
      title: "授权绑定",
      content: '是否绑定德充网账户?',
      // showCancel: false,//是否显示取消按钮
      confirmText: "确定",//默认是“确定”
      confirmColor: '#407EC2',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
        }
      },
    })
  },

  /**
   * 用户点击修改支付密码
   */
  changePassword: function () {
    wx.navigateTo({
      url: '/pages/module2/changePassword/changePassword',
    })
  }

})