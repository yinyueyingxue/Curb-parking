// pages/module3/services/payCost/confirmOrder.js
import { ip, wxpay, httpApi } from '../../../../utils/getApi.js';

// 在需要使用的js文件中，导入js
var utils = require('../../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    unpayamount:0.0,
    plateNo:'',
    pkname:'',
    inTime:'',
    parkTime:'',
    pkno:'',
    pkid:'', 
    unDiscountAmount:0.0,
    amount:'',
    payAmount:'',
    orderNo:'',
    butBottomM: '',
    lookstr: '',
    carStatus: 0,
    navH: 0,
    navT: 0,
    markViewHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })


    console.log("确认订单 res =", options);

    var unpayamount = parseFloat(options.unpayamount).toFixed(2);
    var unDiscountAmount = parseFloat(options.unDiscountAmount).toFixed(2);
    that.setData({
      id:options.id,
      unpayamount: parseFloat(unpayamount),
      plateNo: options.plateNo,
      pkname: options.pkname,
      inTime: options.inTime,
      pkno: options.pkno,
      pkid: options.pkid,
      orderNo: options.orderNo,
      parkTime: options.parkTime,
      carStatus: options.carStatus,
      unDiscountAmount: parseFloat(unDiscountAmount),
      lookstr: options.lookStr,
    });

    console.log("unpayamount=", that.data.unpayamount, "unDiscountAmount=", that.data.unDiscountAmount);

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


/**
 * 用户点击去支付
 */

  bottomBtnClick: function () {
    var that = this;
    
    // console.log("前=",that.data.id, that.data.pkid, that.data.pkname, that.data.pkno, that.data.plateNo, that.data.amount, that.data.orderNo);

    // var pkno = '';
    // if (that.data.pkno == "undefined" || that.data.pkno == null) {
    //   pkno = '';
    // }else{
    //   pkno = that.data.pkno;
    // }

    // console.log("后=",that.data.id, that.data.pkid, that.data.pkname, that.data.pkno, that.data.plateNo, that.data.amount, that.data.orderNo);

    wx.request({
      url: httpApi.OrderPay,
      data: {
        "orderNo": that.data.orderNo,
      },
      success(res) {

        console.log("生成订单 res =", res);

        if (res.data.code == 0) {

          console.log("dfsdfahsfjk");

          var result = res.data.data;

          // var lookstr = 'DDJL';

          console.log("lookStr=", that.data.lookstr);

          wx.navigateTo({
            url: '/pages/module1/order/order?plateno=' + result.plateNo + '&unpayamount=' + result.unPayAmount + '&payamount=' + result.payAmount + '&pkid=' + result.pkid + '&parktime=' + result.parkTime + '&intime=' + result.inTime + '&pkname=' + result.parkName + '&orderno=' + result.payRecId + '&unDiscountAmount=' + result.unDiscountAmount + '&carstatus=' + result.carStatus + '&lookstr=' + that.data.lookstr + ''
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon: "none",
          })
        }
      }
    })

    // wx.request({
    //   url: httpApi.AddParkOrder,
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   data: {
    //     "amount": 0,
    //     "areaId": "",
    //     "id": that.data.id,
    //     "imgPath": "",
    //     "inArea": "",
    //     "inTime": "",
    //     "lastPay": "",
    //     "nextAmount": 0,
    //     "nextTime": 0,
    //     "payIdx": 0,
    //     "payTime": "",
    //     "pkid": that.data.pkid,
    //     "pkname": that.data.pkname,
    //     "pkno": pkno,
    //     "plateNo": that.data.plateNo,
    //     "receivable": that.data.receivable,
    //     "remark": "",
    //     "ruleId": 0,
    //     "spaceId": "",
    //     "spaceName": "",
    //     "sstime": "",
    //     "subsum": 0,
    //     "tradingNo": that.data.tradingNo
    //   },

    //   success(res) {
    //     console.log("res = ", res);

    //     if(res.data.code == "0") {

    //       that.setData({
    //         'orderNo': res.data.data.orderNo,
    //         'discountAmount': res.data.data.discountAmount,
    //         'amount': res.data.data.amount,
    //         'payAmount': res.data.data.payAmount,
    //       });

    //       console.log("00000000000000 lookstr= ", that.data.lookstr);
    //       wx.navigateTo({
    //         url: '/pages/module1/order/order?plateno=' + that.data.plateNo + "&pkid=" + that.data.pkid + "&pkname=" + that.data.pkname + "&intime=" + that.data.inTime + "&parktime=" + that.data.parkTime + "&amount=" + that.data.amount + "&payamount=" + that.data.payAmount + "&discountamount=" + that.data.discountAmount + "&orderno=" + that.data.orderNo + '&lookstr=' + that.data.lookstr,
    //       })

    //     }else{
    //       wx.showToast({
    //         title: res.data.msg,
    //         duration: 1500,
    //         icon: "none",
    //       })
    //     }

    //   }

    // })
    
  },

})