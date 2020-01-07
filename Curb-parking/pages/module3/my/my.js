// pages/my/my.js
import {ip, httpApi} from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '昵称',
    headPortrait: '../../../images/touxiang.png',
    loginHidden: false,
    loginOutHidden: false,
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

    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    if (mobilePhone.length == 11) {
      that.setData({
        hiddenService: true,
        loginHidden: true,
        loginOutHidden: false,
      })
    } else {
      that.setData({
        hiddenService: false,
        loginHidden: false,
        loginOutHidden: true,
      })
    }


    if (that.checkUserId() == false) {
      that.setData({
        loginHidden: false,
        loginOutHidden: true
      })
    }else{
      that.setData({
        loginHidden: true,
        loginOutHidden: false
      })
    }

    that.setData({
      nickName: wx.getStorageSync('nickName') || '昵称',
      headPortrait: wx.getStorageSync('headPortrait') || '../../../images/touxiang.png'
    })
  
    that.setData({
      showList: true,
    });

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
   * 点击登录按钮
   */ 
  loginClick: function () {

    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    }
  },

  /**
   * 点击退出登录调用的方法
   */
  loginOutClick : function () {
    var that = this;
    wx.showModal({
      title: '退出登录',
      content: '是否确认要退出当前账号?',
      confirmColor: '#407EC2',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {

        } else {
          that.setData({
            nickName: '昵称',
            headPortrait: '../../../images/touxiang.png',
            loginHidden: false,
            loginOutHidden: true,
            hiddenService:false,
          });

          wx.clearStorageSync();
        }
      },
    })

  },

  /**
   * 用户点击我的车辆
   */
  getMyCar:function(e){
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    }else{
      wx.navigateTo({ url: '/pages/module3/my-car/my-car' });
    }
    
  },

  /**
   * 用户点击订单记录
   */
  getMyOrder:function(){
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    }else{
      wx.navigateTo({ url: '/pages/module1/parkrecord/parkrecord' });
    }
   
  },

  /**
   * 用户点击月卡续费
   */
  toMC: function () {
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })
    } else {
      wx.navigateTo({
        url: '/pages/module3/monthly-card/one',
      })
    }
  },

  /**
   * 用户点击我的钱包
   */
  myWalletClick: function () {
    
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })
    } else {
      wx.navigateTo({
        url: '/pages/module2/walletTopUp/walletTopUp',
      })
    }

  },

  /**
   * 用户点击发票
   */
  invoiceClick: function() {
    if(this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    }else{
      wx.navigateTo({ url: '/pages/module1/invoice/invoice' });
    }
  },

  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      // wx.redirectTo({
      //   url: 'pages/module4/register/register'
      // })
      return false;
    } else {
      return true;
    }
  },
})