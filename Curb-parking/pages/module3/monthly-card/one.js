// pages/monthly-card/one.js
import { ip } from '../../../utils/getApi.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: '',
    navH: 0,
    navT: 0,
    carList:[],
    monthCardList:[]
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


    if(this.checkUserId()){
      let this_ = this;
      wx.showLoading({
        title: '加载中',
      })
      let userId = wx.getStorageSync("userId");
      wx.request({
        url: ip+'/api/XiaoChengXu/GetPlateNo',
        data: {
          //UserID:'a54799ed-d330-4ae1-b6fe-a9b0010c910e'
          UserID: userId
        },
        success(res) {
          wx.hideLoading();
          let code = res.data.code;
          if (code == "2000") {
            let data = JSON.stringify(res.data.resultData);
            let carList = JSON.parse(data);
            this_.setData({
              carList: carList
            });
          } else {
            this_.setData({
              carList: []
            });
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您未登录或登录已失效，请重新登录！',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/module4/register/register'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (getCurrentPages().length == 3) {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  GetMonthCard: function (e) {
    console.log(e.currentTarget.dataset.index);
    let plateId = e.currentTarget.dataset.index;
    let this_ = this;
    if (plateId != this_.data.showIndex) {
      this_.setData({
        showIndex: plateId,
        monthCardList: []
      })
    } else {
      this_.setData({
        showIndex: "",
        monthCardList:[]
      })
    }
    wx.request({
      url: ip+'/api/XiaoChengXu/GetMonthCard',
      data:{
        plateId: plateId
      },
      success(res){
        let code = res.data.code;
        if(code == "2000"){
          let data = JSON.stringify(res.data.resultData);
          let list = JSON.parse(data);
          wx.setStorageSync('monthCardList', list);
          this_.setData({
            monthCardList: list
          })
        }else{
          this_.setData({
            monthCardList: []
          })
        }
      }
    })
  },
  toTwo:function(e){
    wx.navigateTo({ url: '/pages/module3/monthly-card/two?id=' + e.currentTarget.dataset.index });
  },
  checkUserId(){
    let userId = wx.getStorageSync("userId");
    if(userId == '' || userId == undefined){
      // wx.redirectTo({
      //   url: 'pages/module4/register/register'
      // })
      return false;
    }else{
      return true;
    }
  }
})