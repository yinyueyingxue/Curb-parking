// pages/module3/stopPayList/stopPayList.js

import { ip, httpApi } from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList: [],
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options=", options);

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })


    wx.request({
      url: httpApi.GetOrderRecord,
      data: {
        mobilePhone: '',
        orderStatus: 1,
        plateNo: options.plateNo,
      },

      success(res) {

        console.log("临停缴费 res =", res);

        if (res.data.data != null) {

          var result = res.data.data;
          var unPayAmount = 0;
          var unDiscountAmount = 0;

          for(var i = 0; i < result.length; i++) {

            unPayAmount = parseFloat(result[i].unPayAmount).toFixed(2);
            result[i].unPayAmount = parseFloat(unPayAmount);
            
            unDiscountAmount = parseFloat(result[i].unDiscountAmount).toFixed(2);
            result[i].unDiscountAmount = parseFloat(unDiscountAmount);

          }

          that.setData({
            payList: result,
          })

          // that.setData({
          //   payList: that.data.payList.concat(res.data.data.inPark),
          // })

          // // console.log("fhsdkjfghkj =", that.data.payList, that.data.payList[0].plateNo);

          // if (that.data.payList[0].plateNo == undefined) {
          //   that.setData({
          //     payList: [],
          //   })
          // }
      
          // console.log("length = ", that.data.payList.plateNo);

          // that.setData({
          //   payList: that.data.payList.concat(res.data.data.parkOrder),
          // })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }

      },

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
   * 用户点击去缴费
   */
  toPayOnClick: function (e) {

    console.log("fsdfsdf =", e);

    var that = this;

    var res = that.data.payList[e.target.dataset.index];

    console.log("去缴费 res=", res);

    let unpayamount = res.unPayAmount;
    let carStatus = res.carStatus;
    let unDiscountAmount = res.unDiscountAmount;
    let pkname = res.parkName;
    let plateNo = res.plateNo;
    let inTime = res.inTime;
    let id = res.id;
    let pkno = res.pkno;
    let pkid = res.pkid;
    let orderNo = res.orderNo;
    let parkTime = res.parkTime;

    let lookstr = "CPCXL";

    // console.log(amount, pkname, plateNo, inTime, id, pkno, pkid, orderNo, parkTime)

    wx.navigateTo({
      url: '/pages/module3/services/payCost/confirmOrder?unpayamount=' + unpayamount + "&pkname=" + pkname + "&carStatus=" + carStatus + "&unDiscountAmount=" + unDiscountAmount + "&plateNo=" + plateNo + "&inTime=" + inTime + "&parkTime=" + parkTime + "&id=" + id + "&pkno=" + pkno + "&pkid=" + pkid + "&orderNo=" + orderNo + '&lookStr=' + '',
    });

  }

})
