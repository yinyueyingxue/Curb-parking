// pages/module2/resetPasswords/resetPasswords.js

const app = getApp()

Page({
  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    mobilePhone: "",
  },
  onLoad: function () {

    var that = this;

    var mobilePhone = wx.getStorageSync("mobilePhone");

    var starStr = mobilePhone.substring(0,3);
    var endStr = mobilePhone.substring(7, 11);



    that.setData({
      showPayPwdInput: false,  //是否展示密码输入层
      pwdVal: '',  //输入的密码
      payFocus: true, //文本框焦点
      mobilePhone: starStr + "****" + endStr,
    })

    that.showInputLayer();
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {

    var that = this;

    that.setData({
      showPayPwdInput: true,
      payFocus: true
    });

  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {

    var that = this;

    /**获取输入的密码**/
    var val = that.data.pwdVal;
    /**在这调用支付接口**/
    that.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    }, function () {
      /**弹框**/
      wx.showToast({
        title: val,
      })

    });

  },
  /**
   * 获取焦点
   */
  getFocus: function () {

    var that = this;

    that.setData({
      payFocus: true
    });

  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {

    console.log(e);

    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 4) {
      this.hidePayLayer();
    }
  },

})