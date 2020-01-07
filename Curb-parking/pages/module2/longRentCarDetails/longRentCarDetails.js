// pages/module2/longRentCarDetails/longRentCarDetails.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    navT: 0,
    pkname: '',
    chargingRule: '',
    typeName: '',
    cycle: '',
    remainDays: '',
    parkLotNum: '',
    palteNo: '',
    status: '',
    startTime: '',
    endTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('长租详情=', options);

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
      pkname: options.pkname,
      chargingRule: options.chargingRule,
      typeName: options.typeName,
      cycle: options.cycle,
      remainDays: options.remainDays,
      parkLotNum: options.parkLotNum,
      palteNo: options.palteNo,
      status: options.status,
      startTime: options.startTime,
      endTime: options.endTime,
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
   * 用户点击立即续费
   */
  bottomViewClick: function () {

    var that = this;

    var result = that.data;

    wx.navigateTo({
      url: '/pages/module2/promptlyRenew/promptlyRenew?typeName=' + result.typeName + '&chargingRule=' + result.chargingRule + '&startTime=' + result.startTime + '&endTime=' + result.endTime + '',
    })
  }

})