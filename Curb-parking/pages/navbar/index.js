const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: 0,
    marginTopIcon: "",
    marginTopTitle: "",
  },
  lifetimes: {
    attached: function () {
      console.log("67435789375984=", App.globalData.navHeight);
      wx.getSystemInfo({
        success: res => {
          let modelmes = res.model;
          if (modelmes.search('iPhone X') != -1) {
            this.data.isIphoneX = true
            console.log("----------");
            this.setData({
              // navH: App.navHeight,
              // marginTopIcon: "100rpx",
              // marginTopTitle: "105rpx",
            })
          } else {
            console.log("++++++++++");
            this.setData({
              // navH: App.navHeight,
              // marginTopIcon: "50rpx",
              // marginTopTitle: "55rpx",
            })
          }
        }
      })
      this.setData({
        navH: App.globalData.navHeight,
        navT: App.globalData.navTop,
      })
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    navBackViewClick: function () {
      console.log("dfasfasfsf");
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    navHomeViewClick: function () {
      console.log("dfasfasfsf");
      wx.reLaunch({
        url: '/pages/module2/homepage/homepage'
      })
    },
  }
  
})

// // components/navbar/index.js
// const App = getApp();

// Component({
//   options: {
//     addGlobalClass: true,
//   },
//   /**
//    * 组件的属性列表
//    */
//   properties: {
//     pageName: String,
//     showNav: {
//       type: Boolean,
//       value: true
//     },
//     showHome: {
//       type: Boolean,
//       value: true
//     }
//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
    // navH: 0,
    // navT: 0
//   },
//   lifetimes: {
//     attached: function () {
//       this.setData({
//         navH: App.globalData.navHeight,
//         navT: App.globalData.navTop,
//       })
//     }
//   },
//   /**
//    * 组件的方法列表
//    */
//   methods: {
//     //回退
//     navBack: function () {
//       console.log("dfasfasfsf");
//       wx.navigateBack({
//         delta: 1
//       })
//     },
//     //回主页
//     toIndex: function () {
//       console.log("dfasfasfsf");
//       wx.navigateTo({
//         url: '/pages/home-page/home-page'
//       })
//     },
//   }
// })

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     // navH: 0,
//     // navT: 0,
//     pageName: String,
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that = this;
    
//     // that.setData({
//     //   navH: App.globalData.navHeight,
//     //   navT: App.globalData.navTop,
//     // })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
    
//   },

//   backViewClick: function () {
//     wx.navigateBack({
//       delta: 1
//     })
//   },
//   //回主页
//   homeViewClick: function () {
//     wx.reLaunch({
//       url: '/pages/module2/home-page/home-page'
//     })
//   },
// })