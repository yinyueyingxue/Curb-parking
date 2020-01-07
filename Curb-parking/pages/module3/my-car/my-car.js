// pages/my-car/my-car.js
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
  onUnload: function () {
    // if (getCurrentPages().length == 3) {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }
  },

  onLoad: function () {

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    if(this.checkUserId()){
      let this_ = this;
      wx.showLoading({
        title: '加载中',
      })
      let mobilePhone = wx.getStorageSync("mobilePhone");
      wx.request({
        url: httpApi.GetBindCar,
        data: {
          mobilePhone: mobilePhone
        },
        success(res) {
          console.log("我的车辆 =", res);
          let code = res.data.code;
          wx.hideLoading();
          if (code == "0") {
            let data = JSON.stringify(res.data.data);
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
        fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '获取车辆失败',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/module3/my/my'
                })
              }
            }
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
  showuntyingCar:function(e){
    console.log("e", e);
    let that = this;
    wx.showModal({
      title: '解绑',
      content: '是否确认解除绑定？',
      success(res) {
        if (res.confirm) {
          that.untyingCar(e);

        } else if (res.cancel) {
        }
      }
    })
  },
  untyingCar:function(e){
    console.log("----e", e);
    let plateNo = e.currentTarget.dataset.plateno;
    let this_ = this;
    let mobilePhone = wx.getStorageSync("mobilePhone");

    console.log('plateNo=', plateNo, 'mobilePhone=', mobilePhone);
    wx.request({
      url: httpApi.CancelBindCar,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mobilePhone: mobilePhone,
    
        plateNo: plateNo
      },success(res){
        let code = res.data.code;
        console.log("code=", res);
        if(code == "0"){
          wx.showModal({
            title:'提示',
            content:'车辆解绑成功',
            showCancel:false,
            success(res){
              if(res.confirm){
                let list = this_.data.carList;
                let newList=[];
                for(let i = 0;i < list.length;i++){
                  if (list[i].plateNo != plateNo){
                    newList.push(list[i]);
                  }
                }
                this_.setData({
                  carList: newList
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail(){
        wx.showModal({
          title: '提示',
          content: '车辆解绑失败',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/module3/my/my'
              })
            }
          }
        })
      }
    })
  }, 
  bindingCar:function(e){
    let list = this.data.carList;
    if(list.length >= 3){
      wx.showModal({
        title: '提示',
        content: '最多绑定三辆车',
        showCancel: false
      })
    }else{
      wx.redirectTo({
        url: '/pages/module3/new-car/new-car'
      })
    }
  },
  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      wx.redirectTo({
        url: '/pages/module4/register/register'
      })
      return false;
    }else{
      return true;
    }
  }
})