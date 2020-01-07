// pages/module1/invoiceDetails/invoiceDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresstel: '',
    banknum: '',
    email: '',
    invoiceamount: 0,
    invoicecontent: '',
    invoicetime: '',
    invoicetitle: '',
    mobile: '',
    msg: '',
    statustitle: '',
    titlecolor: '',
    taxnum: '',
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

    console.log("开票详情",options);

    that.setData({
      addresstel: options.addresstel,
      banknum: options.banknum,
      email: options.email,
      invoiceamount: options.invoiceamount,
      invoicecontent: options.invoicecontent,
      invoicetime: options.invoicetime,
      invoicetitle: options.invoicetitle,
      mobile: options.mobile,
      msg: options.msg,
      statustitle:options.statustitle,
      titlecolor:options.titlecolor,
      taxnum:options.taxnum,
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