// pages/module2/newPassword/newPassword.js
const app = getApp()

Page({
  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
  },
  onLoad: function () {

    var that = this;

    that.setData({
      showPayPwdInput: false,  //是否展示密码输入层
      pwdVal: '',  //输入的密码
      payFocus: true, //文本框焦点

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
      pwdVal: '',
    }, function () {

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

    var that = this;

    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6) {
        this.hidePayLayer();
    }
  },
})