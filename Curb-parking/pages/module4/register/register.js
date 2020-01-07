// pages/register/register.js
import {
  ip, httpApi, wxpay
} from '../../../utils/getApi.js';
var timer = require('timer.js');

const app = getApp()

Page({

  data: {
    showAuthorityRequestMask: false,
    mobilePhone: '',
    captchaLabel: '获取验证码',
    seconds: timer.length,
    captchaDisabled: false,
    verCode: '',
    navH: 0,
    navT: 0,
  },
  phoneInput: function (e) {
    this.setData({
      mobilePhone: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      verCode: e.detail.value
    })
  },
  verification: function (e) {
    console.log(this.data.phone);

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
    if (this.data.mobilePhone == 0) {
      wx.showToast({
        title: '手机号为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.mobilePhone < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.mobilePhone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
        this.setData({
          captchaDisabled: true
        });
      this.setData({
        captchaLabel: timer.length + '秒后重新发送'
      });
      var interval = setInterval(() => {
        timer.countdown(this, interval);
        // console.log(timer.length)

      }, 1000);

      wx.request({
        url: httpApi.GetVerCode,
        data: {
          mobilePhone: this.data.mobilePhone
        },

        complete: function (res) {
          console.log(res)
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
  },

  /// 点击登录按钮
  getUserInfo: function (e) {

    var that = this;

    if (e.detail.userInfo != null) {
      try {
        wx.setStorageSync('nickName', e.detail.userInfo.nickName);
        wx.setStorageSync('headPortrait', e.detail.userInfo.avatarUrl)
      } catch (e) {
        console.log(e)
      }

      this.setData({
        showAuthorityRequestMask: false
      })

      that.loginClick(e);

    }else{
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 1500
      })
    }

    // 用户点击了授权登录之后，才会出现微信的授权请求弹框
    // 需要判断用户在微信请求框里真正点击了什么, success判断是弹框是否弹出，而不是用户的选择结果

    /* 用户拒绝授权会走else */


  },

  loginClick: function (e) {
    let that = this;
    let dat = this.data.mobilePhone;
    
    let headImgUrl = wx.getStorageSync("headPortrait");
    let nickName = wx.getStorageSync("nickName");


    wx.request({
      url: httpApi.UserLogin,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobilePhone: dat,
        verCode: that.data.verCode
      },

      success(res) {
        let code = res.data.code;
        wx.setStorageSync('userId', res.data.data);
        wx.setStorageSync('mobilePhone', that.data.mobilePhone)
        if (code == "0") {
          wx.reLaunch({
            url: '/pages/module2/homepage/homepage'
          })

          wx.login({
            success(res) {
              console.log("HFDSJFGAK", res.code);
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: httpApi.SaveUserInfo,
                  data: {
                    headImgUrl: headImgUrl,
                    mobilePhone: dat,
                    nickName: nickName,
                    wxCode: res.code,
                    appId: wxpay.appid,
                  },
                  success(res) {
                    
                    console.log("00000000", res, res.data.data);
                    wx.setStorageSync('openId', res.data.data);
                  }
                })
              } else {
                
              }
            }
          });

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.error,
          })
        }
      }

    })

  },
  
  refuse: function (e) {
    this.setData({
      showAuthorityRequestMask: false
    })
  },
  checkUserInfoAuthority() {
    /* 如果授权过，showAuthorityRequestMask为false */
    this.setData({
      showAuthorityRequestMask: wx.getStorageSync("userId") ? false : false
    })
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


    wx.login({
      ccess: res => {
        if (res.code) {
          wx.request({
            url: '',
          })
        }
      }
    })
    // this.checkUserInfoAuthority();
    // console.log(wx.getStorageSync("userId"));
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