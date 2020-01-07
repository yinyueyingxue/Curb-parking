// pages/order-noneed/order-noneed.js
import { ip } from '../../../utils/getApi.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: [ 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    let that=this;
    // 发起网络请求
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: ip+'/api/XiaoChengXu/GetParkFree',
      data: {
        userid: wx.getStorageSync("userId")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) { 
        wx.hideLoading();
        let resstr = JSON.stringify(res);
        // console.log("success resstr=" + resstr); 
        let dataprase = JSON.parse(res.data)
        if (dataprase.code=='1000')
        { 
          console.log( dataprase); 
          that.setData({
            dates: dataprase.parkrecord,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // if (this.checkUserId() == false) {
    //   wx.redirectTo({
    //     url: '/pages/module4/register/register'
    //   })
    //   // wx.showModal({
    //   //   title: '提示',
    //   //   content: '您未登录或登录已失效，请重新登录！',
    //   //   showCancel: false,
    //   //   success(res) {
    //   //     if (res.confirm) {
    //   //       wx.redirectTo({
    //   //         url: '/pages/module4/register/register'
    //   //       })
    //   //     }
    //   //   }
    //   // })
    // }
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
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  otherplate(){
    wx.navigateTo({ url: '/pages/module1/index/index' });
  },
  orderbtn(e){
    // console.log("amout=" + e.currentTarget.dataset.amout); 
    // console.log("plate=" + e.currentTarget.dataset.plate); 
    // console.log("pkid=" + e.currentTarget.dataset.pkid); 
    // console.log("entrancetime=" + e.currentTarget.dataset.entrancetime); 
    // console.log("parktime=" + e.currentTarget.dataset.parktime); 
    // console.log("pkname=" + e.currentTarget.dataset.pkname);  
    wx.navigateTo({ url: '/pages/module1/order/order?plate=' + e.currentTarget.dataset.plate + '&amount=' + e.currentTarget.dataset.amout + '&PKID=' + e.currentTarget.dataset.pkid + '&parkingtime=' + e.currentTarget.dataset.parktime + '&EntranceTime=' + e.currentTarget.dataset.entrancetime + '&place=' + e.currentTarget.dataset.pkname + '&picurl=' + e.currentTarget.dataset.imgurl + '&SSamout=' + e.currentTarget.dataset.ssamout + '&YHamout=' + e.currentTarget.dataset.yhamout + '&Orderno=' + e.currentTarget.dataset.orderno + '&AccountId=' + e.currentTarget.dataset.accountId });
  }
})