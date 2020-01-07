// pages/module1/parkrecordDetails/parkrecordDetails.js

import { ip, httpApi } from '../../../utils/getApi.js';

// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    goPayList: [],
    listHidden: true,
    goPayHidden: false,
    payListHidden: true,
    status: 0,
    parkName: '',
    plateNo: '',
    inTime: '',
    outTime: '',
    carStatus: 0,
    payStatus: 0,
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options=", options);

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    // if (options.status == 1 && options.amount > 0) {
      
      console.log('--------------------');
      that.setData({
        listHidden: false,
        goPayHidden: false,
        parkName: options.parkName,
        plateNo: options.plateNo,
        inTime: options.inTime,
        outTime: options.outTime,
        carStatus: options.carStatus,
        goPayList: that.data.goPayList.concat(options),
      })
    // }

    // that.setData({
    //   status: options.status,
    // })

    // console.log("wod =", that.data.goPayList);

    var that = this;

    wx.request({
      url: httpApi.GetOrderDetail,
      data: {
        "orderNo": options.orderNo,
      },
      success(res) {
        console.log("ghuyuyuy", res)
        wx.hideLoading();
        let code = res.data.code;

        if (code == '0') {

          if(res.data.data.length <= 0) {
            console.log('hffjfjjfjf');
            return;
          }

          for (var i = 0; i < res.data.data.length; i++) {
            var result = res.data.data[i];
            if (result.payStatus == 0) {
              console.log("我进来了 = ", i);
              that.setData({
                // pkName: result.pkname,
                // plateNo: result.plateNo,
                // inTime: result.inTime,
                // outTime: result.outTime,
                goPayList: that.data.goPayList.concat(result),
              })
            }else{
              that.setData({  
                // pkName: result.pkname,
                // plateNo: result.plateNo,
                // inTime: result.inTime,
                // outTime: result.outTime,
                resultList: that.data.resultList.concat(result),
              })                 
            }
          }

          if(that.data.goPayList.length <= 0) {
            console.log('+++++++++++++++');
            that.setData({
              goPayHidden: false,
            })
          }else {
            console.log('===============');
            that.setData({
              goPayHidden: true,
              payStatus: that.data.goPayList[0].payStatus,
            })
          }

          if (that.data.resultList.length <= 0) {
            that.setData({
              payListHidden: true,
            })
          } else {
            that.setData({
              payListHidden: false,
            })
          }

          if (that.data.goPayList.length <= 0 && that.data.resultList.length <= 0) {
            that.setData({
              listHidden: true,
            })
          }else{
            that.setData({
              listHidden: false,
            })
          }

          console.log("goPayList=", that.data.goPayList, "resultList=", that.data.resultList);

        }

      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500
        })
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


  /// 点击支付按钮
  goPayViewClick: function (e) {
    console.log("_____", e);

    console.log("点击了支付按钮 e =", e);

    var result = e.currentTarget.dataset;

    wx.request({
      url: httpApi.PayOrder,
      data: {
        "orderNo": result.orderno,
        "plateNo": result.plateno,
        "recordId": result.recordid,
      },
      success(res) {

        console.log("生成订单 res =", res);

        if (res.data.code == 0) {

          console.log("dfsdfahsfjk");

          var result = res.data.data;

          var lookstr = 'DDXQ';

          wx.navigateTo({
            url: '/pages/module1/order/order?plateno=' + result.plateNo + '&amount=' + result.amount + '&payamount=' + result.payamount + '&pkid=' + result.pkid + '&parktime=' + result.parktime + '&intime=' + result.inTime + '&pkname=' + result.pkname + '&orderno=' + result.orderNo + '&lookstr=' + lookstr + ''
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

  }
})