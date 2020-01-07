import { ip, wxpay, httpApi} from '../../../utils/getApi.js';

// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({
  data: {
    plateno: "",
    pkid: "",
    pkname: "",
    intime: "",
    parktime: "",
    unpayamount: 0.0,
    payMoney: '',
    unDiscountAmount: 0.0,
    carstatus: '0',
    orderno: "",
    lookstr: "",
    boxshow: false,
    imgshow: false,
    butBottomM:'',
    primaryHidden: false,
    navH: 0,
    navT: 0,
    markViewHidden: true,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    showPayHidden: true,
  },

  onLoad: function (options) {
    var that = this;
    console.log("我打印的", options);
  
    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    var unpayamount = parseFloat(options.unpayamount).toFixed(2);
    var unDiscountAmount = parseFloat(options.unDiscountAmount).toFixed(2);

    that.setData({
      plateno: options.plateno,
      pkid: options.pkid,
      pkname: options.pkname,
      intime: options.intime,
      parktime: options.parktime,
      unpayamount: parseFloat(unpayamount),
      unDiscountAmount: parseFloat(unDiscountAmount),
      orderno: options.orderno,
      carstatus: options.carstatus,
      lookstr: options.lookstr,
    })

    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.data.isIphoneX = true
          that.setData({
            butBottomM: "168rpx",
          })
        } else {
          that.setData({
            butBottomM: "98rpx",
          })
        }
      }
    })

  }, 

  onShow() {
  },

  /**
  * 用户点击了去支付
  */
  goPayClick: function () {

    console.log("用户点击了去支付");

    var that = this;

    that.setData({

      markViewHidden: false,

    })
  },

  btnSubmitPaymentRequest() { 

    var that = this;

    let resamount = that.data.payamount;
    let resplatenumber = that.data.plate;
    let resPKID = that.data.PKID;
    let resparkingtime = that.data.parkingtime;
    let resplace = that.data.place;
    let resDiscountAmount = that.data.DiscountAmount;
    let resOrderno = that.data.Orderno;
    let resAccountId = that.data.AccountId;
    

    let openId = wx.getStorageSync('openId');
    let appId = wxpay.appid;

    if(openId == null) {
      wx.showToast({
        title: 'openId 获取失败!',
        icon: 'none',
        duration: 1500
      })
    }

    console.log("123456", openId, that.data.orderno, that.data.pkid, that.data.unpayamount, that.data.lookstr);
    wx.request({
      url: httpApi.WayPay,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "body": "停车支付",
        "busType": 1,
        "isSub": 0,
        "openid": openId,
        "orderNo": that.data.orderno,
        "pkid": that.data.pkid,
        "spbillCreateIp": "127.0.0.1",
        "totalFee": that.data.unpayamount
      },

      success(res) {

        console.log("res=", res);

        if (res.data.data.length < 2) {
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 1500
          })
          return;
        }
        
        console.log("7789999", res.data);

        let nonceStr = res.data.data.nonce_str;
        let code = res.data.code;
        let prepayId = res.data.data.prepay_id;
        let signType = "MD5";
        var timeStamp = Date.parse(new Date());
        timeStamp = timeStamp / 1000;

        let myObj = {
          appId: appId,
          nonceStr: nonceStr,
          package: 'prepay_id=' + prepayId,
          signType: signType,
          timeStamp: timeStamp
        }

        let keys = Object.keys(myObj);
        let len = keys.length; 
        let paySign = utils.getPaySign(myObj, keys, len);
  

        if (code == "0") {
          console.log("keys", keys, "len", len, "paySign", paySign);

          // Number 转 String
          var timestamp = timeStamp.toString();

          wx.requestPayment(
            {
              'timeStamp': timestamp,
              'nonceStr': nonceStr,
              'package': 'prepay_id=' + prepayId,
              'signType': signType,
              'paySign': paySign,
              'success': function (res) {
                console.log("11", res);
                wx.navigateTo({
                  url: '/pages/module3/services/payCost/paySuccess?receivable=' + that.data.unpayamount + "&pkname=" + that.data.pkname + "&plateNo=" + that.data.plateno + "&duration=" + that.data.parktime + "&lookstr=" + that.data.lookstr,
                })
              },
              'fail': function (res) {
                console.log("22", res);
              },
              'complete': function (res) {
                console.log("33", res);
              }
            });
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }

      }
      })
    
  },

  /**
  * 用户点击蒙板
  */
  maskViewClick: function () {

    var that = this;

    that.setData({
      markViewHidden: true,
    })

  },

  /**
   * 用户点击了支付的类型
   */
  payTypeClick: function () {

    var that = this;

    that.showInputLayer();
  },

  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    /**在这调用支付接口**/
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function () {
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
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },

  /**
   * 用户点击忘记密码
   */
  slipPasswordClick: function () {

    var that = this;

    that.hidePayLayer();

    that.setData({
      markViewHidden: true,
    })

    wx.navigateTo({
      url: '/pages/module2/changePassword/changePassword',
    })

  },
  
  showimg() {
    this.setData({
      imgshow: true,
    })
  }, 
  closeimg() {
    this.setData({
      imgshow: false,
    })
  }
})
