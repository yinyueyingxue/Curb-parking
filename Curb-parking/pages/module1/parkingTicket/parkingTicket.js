// pages/module1/parkingTicket/parkingTicket.js
import { ip, httpApi } from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeSelected: true,
    markViewHidden: true,
    totalMoney: '',  /// 开票金额
    orderNos: '',  /// 订单编号
    nameStr: '',  /// 抬头名称
    shuiHStr: '',  /// 税号
    mailboxStr: '',  /// 接收邮箱
    inputRemark: '',  /// 备注
    inputAddress: '',  /// 地址和电话
    inputAccount: '',  /// 开户行及账号
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options=', options);

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
      totalMoney: options.totalMoney,
      orderNos: options.orderNos,
    })

    wx.removeStorageSync('inputRemark');
    wx.removeStorageSync('inputAddress');
    wx.removeStorageSync('inputAccount')
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
   * 用户选择企业
   */
  qYViewClick: function () {
    var that = this;
    that.setData({
      typeSelected: true,
    }) 
  },
  /**
   * 
   */
  dWViewClick: function () {
    var that = this;
    that.setData({
      typeSelected: false,
    }) 
  },
  /**
   * 用户点击更多内容
   */
  contentViewClick: function () {
    wx.navigateTo({
      url: '/pages/module1/moreContent/moreContent',
    })
  },
  /**
   * 用户点击了提交
   */
  inputBtnClick: function () {
    var that = this;
    that.setData({
      markViewHidden: false,
    })

  },
  /**
   * 用户点击蒙版
   */
  maskViewClick: function () {
    var that = this;
    that.setData({
      markViewHidden: true,
    })
  },

  /**
   * 用户输入抬头名称
   */
  bindNameInput: function (e) {
    var that = this;
    var value = e.detail.value;

    that.setData({
      nameStr: value,
    })
  },

  /**
   * 用户输入税号
   */
  bindShuiHInput: function (e) {
    var that = this;
    var value = e.detail.value;

    that.setData({
      shuiHStr: value,
    })
  },

  /**
   * 用户输入接收邮箱
   */
  bindMailboxInput: function (e) {
    var that = this;
    var value = e.detail.value;

    that.setData({
      mailboxStr: value,
    })
  },

  /**
   * 用户点击去提交
   */
  bottomBtnClick: function () {

    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    if ((/^[\u4E00-\u9FA5A-Za-z]+$/.test(that.data.shuiHStr))) {

    console.log("税号....");
      wx.showToast({
        title: '输入的税号有误,请重新输入',
        duration: 2000,
        icon: 'none',
      });
      return false;
    }


    if (that.data.mailboxStr.length <= 0 || that.data.nameStr.length <= 0 || mobilePhone.length <= 0 || that.data.orderNos.length <= 0 || that.data.totalMoney.length <= 0) {
      
      wx.showToast({
        title: '请完善好开票的一些必填项!',
        icon: 'none',
        duration: 1500
      })

      return;
    }

    if (that.data.shuiHStr.length < 0) {
      that.setData({
        shuiHStr: '',
      })
    }

    console.log("orderNos=", that.data.orderNos);

    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: httpApi.InvoiceIssuance,
      data:{
        'addressTel': that.data.inputAddress,
        'bankNum': that.data.inputAccount,
        'content': '停车开票',
        'email': that.data.mailboxStr,
        'ghdwmc': that.data.nameStr,
        'ghdwsbh': that.data.shuiHStr,
        'mobile': mobilePhone,
        'orderNo': that.data.orderNos,
        'remark': that.data.inputRemark,
        'sum': that.data.totalMoney,
      },

      success(res) {

        console.log("开票接口返回数据 res =", res);
        if(res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/module1/invoiceSucceed/invoiceSucceed',
          })
        }else{
          wx.showModal({
            title: '开票失败',
            content: res.data.msg,
          })
        }
        
      }


    })

  }

})