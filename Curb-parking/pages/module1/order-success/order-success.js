// pages/order-success/order-success.js
import { ip } from '../../../utils/getApi.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plate: "浙B44444",  
    parkingtime: "1小时",
    place: "天主教堂",
    payamount: "1.0" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let q = JSON.stringify(options);
    console.log(q)
    let resultplate = JSON.parse(q).plate||'';
    let resultamount = JSON.parse(q).payamount || ''; 
    let resultparkingtime = JSON.parse(q).parkingtime || ''; 
    let resultplace = JSON.parse(q).place || ''; 
    this.setData({
      plate: resultplate, 
      parkingtime: resultparkingtime,
      payamount: resultamount,
      place: resultplace 
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
  onUnload: function () {

    wx.navigateBack({
      delta: 3
    })
    // if (getCurrentPages().length == 3) {
      
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  invoice(){ 
    //wx.redirectTo({ url: '/pages/invoice/invoice' }) ;
    // wx.showToast({
    //   title: '请找工作人员索要发票',
    //   icon: 'success',
    //   duration: 2000
    // })
    wx.showModal({
      title: '',
      content: '请找工作人员索要发票 ',
      showCancel:false,
      confirmText:'知道了',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  }
})