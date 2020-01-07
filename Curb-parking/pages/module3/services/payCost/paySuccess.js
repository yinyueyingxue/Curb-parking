// pages/module3/services/payCost/paySuccess.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receivable: '',
    plateNo: '',
    pkname: '',
    duration: '',
    lookstr: '',
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    console.log('支付完成 options =', options);

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })


    that.setData({
      'receivable': options.receivable,
      'plateNo': options.plateNo,
      'pkname': options.pkname,
      'duration': options.duration,
      'lookstr': options.lookstr,
    });


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

  /// 点击开发票按钮调用的方法
  inviceViewClick: function () {

    wx.showModal({
      content: '请前往 我的-发票 开具发票。',
      showCancel: false,//是否显示取消按钮
      confirmText: "知道了",//默认是“确定”
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
   * 用户点击完成
   */
  completeBtnClick: function () {
    console.log("用户点击了完成按钮");
    var that = this;
     /** 订单记录支付完成跳转到对应的页面 */
    if(that.data.lookstr == 'DDJL') {
      console.log("订单记录 -------");
      wx.navigateBack({
        delta: 2,
      })
    }else{ 
      console.log("临停缴费 -------");
      // /** 订单详情支付完成跳转到对应的页面 */
      // if (that.data.lookstr == 'DDXQ') {
      //   wx.navigateBack({
      //     delta: 4,
      //   })
      // }else{

        // if (that.data.lookstr == 'CPCXL'){
          wx.navigateBack({
            delta: 4,
          })
        // }else{
          // wx.redirectTo({
          //   url: '/pages/module3/services/services',
          // })
        // }

       
      // }
      
    } 
  }

})