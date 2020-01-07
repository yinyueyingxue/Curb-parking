// pages/feedback/feedback.js
import { ip } from '../../../utils/getApi.js';
let t = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    advice: '',
    length: 0,
    maxLength: 150,
    pics: [],
    isShow: true,
  },
  /**获取textarea值：评论内容 */
  bindTextAreaBlur: function (e) {
    this.setData({
      advice: e.detail.value,
      length: e.detail.value.length,
      maxLength: this.data.maxLength
    })
  },

  /**上传图片 */
  uploadImage: function () {
    let that = this;
    let pics = that.data.pics;
    wx.chooseImage({
      count: 3 - pics.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let imgSrc = res.tempFilePaths;
        pics.push(imgSrc);
        if (pics.length >= 3) {
          that.setData({
            isShow: false
          })

        }
        that.setData({
          pics: pics
        })
      },
    })

  },

  /**删除图片 */
  deleteImg: function (e) {
    let that = this;
    let deleteImg = e.currentTarget.dataset.img;
    let pics = that.data.pics;
    let newPics = [];
    for (let i = 0; i < pics.length; i++) {
      //判断字符串是否相等
      if (pics[i]["0"] !== deleteImg["0"]) {
        newPics.push(pics[i])
      }
    }
    that.setData({
      pics: newPics,
      isShow: true
    })

  },
  
  /**提交 */
  submitAdvice: function () {
    let that = this;
    let advice = that.data.advice;
    let data = this.data.pics;
    let userid = wx.getStorageSync("userId");
    let i=0;
    console.log(123);
    console.log(userid);
    if (advice==null||advice==""){
      wx.showToast({
        title: '内容不得为空',
        icon: 'success',
        duration: 1500
      })
    }else{
      if(data[0]==null){
        wx.request({
          url: ip+'/api/XiaoChengXu/uploadFile?content=' + advice + '&UserId=' + userid+'',
          data:{
            content: advice
          },
          method:'POST',
          success:function(res){
            console.log(3);
            wx.showModal({
              title: '提示',
              content: '提交成功',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      }else{
        wx.uploadFile({
          url: ip+'/api/XiaoChengXu/uploadFile?content=' + advice + '&UserId=' + userid + '',
          filePath: data[i][0],
          name: 'file',
          success: function (res) {
            console.log(res);
          },
          complete: function (complete) {
            console.log(i);
            i++;
            if (i == data.length) {
              console.log('执行完毕');
              wx.showModal({
                title: '提示',
                content: '提交成功',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateBack({
                      delta: 1
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {//若图片还没有传完，则继续调用函数
              t=1;
              that.uploadimg(data);
            }
          },
          fail: function (err) {
            console.log('执行失败');

          }
        })
      }
      
      
    }
    
    //保存操作
  },
  
  uploadimg(data){
    let that = this;
    let userid = wx.getStorageSync("userId");
    wx.uploadFile({
      url: ip+'/api/XiaoChengXu/uploadFile?content=&UserId=' + userid + '',
      filePath: data[t][0],
      name: 'file',
      success: function (res) {
        console.log(res);
      },
      complete: function (complete) {
        console.log(t);
        t++;
        if (t == data.length) {
          console.log('执行完毕');
          wx.showModal({
            title: '提示',
            content: '提交成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {//若图片还没有传完，则继续调用函数
          console.log(data);

          that.uploadimg(data);
        }
      }
    })
  },

  phoneCall: function (e) {
    
    wx.makePhoneCall({
      phoneNumber: '057187290358',
      success:function(){
        console.log('成功打电话')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(wx.getStorageSync("userId"));
    
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

  }
})