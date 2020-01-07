// pages/module1/moreContent/moreContent.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    navT: 0,
    inputRemark: '',
    inputAddress: '',
    inputAccount: '',
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

    var inputRemark = wx.getStorageSync("inputRemark");
    var inputAddress = wx.getStorageSync("inputAddress");
    var inputAccount = wx.getStorageSync("inputAccount");

    console.log(inputRemark, inputAddress, inputAccount);

    that.setData({
      inputRemark: inputRemark,
      inputAddress: inputAddress,
      inputAccount: inputAccount
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
   * 用户填写备注说明信息
   */
  bindRemarkInput: function (e) {
    var value = e.detail.value;
    wx.setStorageSync("inputRemark", value);

    var inputRemark = wx.getStorageSync("inputRemark");
    
    console.log("inputRemark =", inputRemark);
  },

  /**
   * 用户填写地址和电话信息
   */
  bindAddressInput: function (e) {
    var value = e.detail.value;
    wx.setStorageSync("inputAddress", value);

    var inputAddress = wx.getStorageSync("inputAddress");
  
    console.log("inputAddress =", inputAddress);
  },

  /**
   * 用户填写开户行及账号信息
   */
  bindAccountInput: function (e) {
    var value = e.detail.value;
    wx.setStorageSync("inputAccount", value);

    var inputAccount = wx.getStorageSync("inputAccount");

    console.log("inputAccount =", inputAccount);
  }

})