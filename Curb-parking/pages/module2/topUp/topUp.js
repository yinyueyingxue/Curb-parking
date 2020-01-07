// pages/module2/topUp/topUp.js

import { ip, httpApi } from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ number: 25, status: 0 },
           { number: 50, status: 0 },
           { number: 100, status: 0 },
           { number: 200, status: 0 },
           { number: 300, status: 0 },
           { number: 500, status: 0 }],
    inputMoney: "",
    navH: 0,
    navT: 0,
    payAmount: 0, /// 用户选择的金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    console.log(that.data.list);

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
   * 用户选择金额
   */
  butViewClick: function (e) {

    var that = this;

    console.log("ddd", e);

    var list = that.data.list;
    for(var i = 0; i < list.length; i++) {
      var number = list[i].number;
      if (e.currentTarget.dataset.number == number) {
        list[i].status = 1;
      }else{
        list[i].status = 0;
      }
    }

    that.setData({
      list: list,
      payAmount: e.currentTarget.dataset.number,
    })

  },

  /**
   * 用户输入金额
   */
  inputClick: function (e) {

    var that = this;

    console.log(e.detail.value);

    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].status == 1) {
        list[i].status = 0;
      }
    }

    that.setData({
      list: list,
      inputMoney: e.detail.value
    })

    
  },

  /**
   * 点击立即续费调用的方法
   */
  bottomViewClock: function () {

    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    wx.request({
      url: httpApi.UpdateBalance,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        payAmount: that.data.payAmount,
        phoneNum: '15988845617',
      },
      success(res) {
        console.log("获取钱包余额", res);

        if (res.data.code == 0) {

        }

      }
    })

  }


})