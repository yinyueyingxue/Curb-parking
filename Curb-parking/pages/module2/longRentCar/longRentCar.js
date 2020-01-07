// pages/module2/longRentCar/longRentCar.js

import { ip, httpApi } from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    navH: 0,
    navT: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    
    var mobilePhone = wx.getStorageSync("mobilePhone");

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })

    wx.request({
      url: httpApi.GetLongrentInfo,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobilePhone: '13222222222'
      },
      success (res) {
        console.log("长租信息", res);

        if(res.data.code == 0) {

          var typeName;

          var result = res.data.data;

          for(var i = 0; i < result.length; i++){
            var longrentCycleType = result[i].longrentCycleType;
            if(longrentCycleType == 1){
              typeName = "月";
            }else{
              if(longrentCycleType == 2){
                typeName = "季";
              }else{
                typeName = "年";
              }
            }
            result[i].typeName = typeName;
            result[i].chargingRule = parseInt(result[i].chargingRule);
          }

          that.setData({
            carList: result,
          })

          

        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
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
   * 用户点击查看详情
   */
  carListViewClick: function (e) {

    var that = this;

    console.log("点击详情 =", e.currentTarget.dataset.id);

    var result;
    var carList = that.data.carList;

    for(var i = 0; i < carList.length; i++){
      var id =  carList[i].id;
      if (id == e.currentTarget.dataset.id) {
        result = carList[i];
      }
    }

    var pkname = result.pkname;
    var chargingRule = result.chargingRule;
    var typeName = result.typeName;
    var cycle = result.cycle;
    var remainDays = result.remainDays;
    var parkLotNum = result.parkLotNum;
    var palteNo = result.palteNo;
    var status = result.status;
    var startTime = result.startTime;
    var endTime = result.endTime;

    console.log("选中的result=", result);

    wx.navigateTo({
      url: '/pages/module2/longRentCarDetails/longRentCarDetails?pkname=' + pkname + '&chargingRule=' + chargingRule + '&typeName=' + typeName + '&cycle=' + cycle + '&remainDays=' + remainDays + '&parkLotNum=' + parkLotNum + '&palteNo=' + palteNo + '&status=' + status + '&startTime=' + startTime + '&endTime=' + endTime + '',
    })
  }

})