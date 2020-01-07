
const app = getApp()

Page({
  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    titleStr: "请输入支付密码确认",
    passwordHid: false,
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

  onShow: function () {

    // var that = this;

    // that.setData({
    //   showPayPwdInput: false,  //是否展示密码输入层
    //   pwdVal: '',  //输入的密码
    //   payFocus: true, //文本框焦点

    // })

    // that.showInputLayer();
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
      titleStr: "请输入新支付密码", 
      passwordHid: true,
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

      if (that.data.titleStr == "请输入新支付密码") {

        that.setData({
          showPayPwdInput: false,  //是否展示密码输入层
          pwdVal: '',  //输入的密码
          payFocus: true, //文本框焦点

        })

        that.showInputLayer();

        wx.navigateTo({
          url: '/pages/module2/newPassword/newPassword',
        })

      }else {

        this.hidePayLayer();

      }
      
    }
  },

  /**
   * 用户点击重置密码
   */
  resetPasswords: function () {
    wx.navigateTo({
      url: '/pages/module2/resetPasswords/resetPasswords',
    })
  }

})