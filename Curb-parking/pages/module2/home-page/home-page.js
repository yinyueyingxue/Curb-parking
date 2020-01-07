// pages/home-page/home-page.js
import { ip, httpApi } from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');
const app = getApp();
//引入SDK核心
var QQMapWX = require("../../../utils/qqmap-wx-jssdk")
//实例化API核心类
var demo = new QQMapWX({
  key:'R5KBZ-CTEKR-EBYWH-WGR3N-WSQWS-I6FFF'
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    lat: 30.222574, //这里必须定义lat,lng，不然标注点出不来
    lng: 120.121498,
    scale: 13,
    markers: [],
    showModalStatus: false,
    allParkCount: 0,
    allCarBitNum: 0,
    pkName: '',
    distance: 0,
    address: '',
    spaceBitNum: 0,
    carBitNum: 0,
    carBitNumLeft: 0,
    pointLng: 0,
    pointLat: 0,
    pointName: '',
    pointAddress: '',
    feeremark: '',
    navH: 0,
    navT: 0,
    // marginTopO: "",
    // marginTopT: "",
    // isIphoneX: false,
    // tabBarH: '',
    // butBottomM: '',
  },
  backLocation(e) {
    var that = this;
    var map = wx.createMapContext("map");
    map.moveToLocation();
  },
  getLocationMarkers(data) {
    let markers = [];
    for (let i = 0; i < data.length; i++) {
      // locationData[i].siteId = i;
      let marker = this.createMarker(data[i]);
      markers.push(marker);
    }
    return markers;
  },
  createMarker(point) {

    let arr = point.coordinate.split(',');

    let marker = {
      id: point.pkid,
      latitude: arr[1],
      longitude: arr[0],
      width: '60rpx',
      height: '60rpx',
      pkname: point.pkname,
      address: point.address,
      distance: point.distance.toFixed(1),
      spaceBit: point.spaceBitNum,
      carBitNumLeft: point.carBitNumLeft,
      carBitNum: point.carBitNum,
      feeremark: point.feeRemark,
      resultNum: point.resultNum,
    };

    if (0 < marker.resultNum <= 15) {
      marker.iconPath = "../../../images/pinorange.png"
    }

    if (marker.resultNum > 15) {
      marker.iconPath = "../../../images/pingreen.png"
    }

    if (marker.resultNum <= 0) {
      marker.iconPath = "../../../images/pingray.png"
    }
  
    return marker;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      adrr:options.adrr
    })
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
    })
    
    // wx.getSystemInfo({
    //   success: res => {
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       this.data.isIphoneX = true
    //       this.setData({
    //         marginTopO: "60rpx",
    //         marginTopT: "180rpx",
    //       })
    //     } else {
    //       this.setData({
    //         marginTopO: "20rpx",
    //         marginTopT: "120rpx",
    //       })
    //     }
    //   }
    // })
    // wx.login({
    //   success: res => {
    //     let d = {
    //       appid: 'wx6ef5d86d4d3ad4b8', // 从微信公众平台开发设置中获取
    //       secret: '586a74626114778ef1c183b1d63ba997' // 从微信公众平台开发设置中获取
    //     };
    //     // 微信官方的获取openid的接口
    //     var wxLoginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret='
    //       + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
    //     wx.request({
    //       url: wxLoginUrl,
    //       data: {},
    //       method: 'GET',
    //       success: res => {
    //         let openid = res.data.openid;
    //         console.log("openid=", openid);
    //         // this.judgeIsWxlogin(openid); // 向后端发送openid判断是否可以直接用该微信号登陆
    //       }
    //     });
    //   }
    // });

    // wx.getSystemInfo({
    //   success: res => {
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       that.data.isIphoneX = true
    //       that.setData({
    //         tabBarH: "168rpx",
    //         butBottomM: "190rpx"
    //       })
    //     }else{
    //       that.setData({
    //         tabBarH: "98rpx",
    //         butBottomM: "120rpx"
    //       })
    //     }
    //   }
    // }) 

    // that.currentPoint();
    // if (options.lat != null && options.lng != null) {
    //   that.setData({
    //     'lng': options.lng,
    //     'lat': options.lat
    //   })
    // }else{
    wx.getLocation({
      type: "wgs84",
      // altitude: true,
      success(res) {
        let lng = parseFloat(res.latitude).toFixed(6);
        let lat = parseFloat(res.longitude).toFixed(6);

        console.log("lng=", lng, "lat=", lat);

        that.setData({
          'lng': lat,
          'lat': lng,
          authUserLocation: true,
          showLocation: true
        });

        wx.request({
          url: httpApi.GetNearlyPark,
          data: {
            'lon': that.data.lng,
            'lat': that.data.lat,
          },

          success(res) {

            if(res.data.code == 0) {

              var result = res.data.data;

              console.log("首页 result =", result);
              
              var resultNum = 0;

              for (var i = 0; i < result.length; i++) {
                
                if (result[i].carBitNumLeft == 0) {
                  console.log("------");
                  resultNum = 100;
                }else {
                  console.log("++++++");
                  resultNum = 1 - (result[i].carBitNumLeft / result[i].carBitNum);
                  resultNum = resultNum * 100;
                }
                
                result[i].resultNum = parseInt(resultNum);

                console.log("resultNum =", resultNum);
              }

              console.log("result =", result);

              that.setData({
                'markers': that.getLocationMarkers(result),
                'controls': res.data.data
              })

              console.log("markers=", that.getLocationMarkers(result));

            }else{
              wx.showToast({
                title: res.data.msg,
                duration: 1500,
                icon: 'none',
              })
            }
            
          }

        })
      },
      fail(err) {
        console.log(err)
      }
    });

    // } 
  },
  seeMap:function(){
    demo.geocoder({
      address:this.data.adrr,
      success:res =>{
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          scale:28
        })
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){
        console.log(res);
      }
    })
  },

  /// 点击查看附件车场
  toNearby: function () {
    var that = this;
    var data = that.data;
    wx.navigateTo({
      url: 'search?lat=' + data.lat + '&lng=' + data.lng + '',
    })
  },

  /// 点击地图上对应的车场调用的方法
  tapMarker(e) {
    var that = this;
    var res = '';
    for(var i = 0; i < that.data.markers.length; i ++) {

      if (that.data.markers[i].id == e.markerId){
        res = that.data.markers[i];
      }
    }

    that.setData({
      'pkName': res.pkname,
      'distance': parseFloat(res.distance).toFixed(1),
      'address': res.address,
      'spaceBitNum': res.spaceBit,
      'carBitNumLeft': res.carBitNumLeft,
      'carBitNum': res.carBitNum,
      'feeremark': res.feeremark,
      'pointLng': res.longitude,
      'pointLat': res.latitude,
      'pointName': res.pkname,
      'pointAddress': res.address
    });
    
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
    wx.showTabBar();
  },
  navigation: function (e) {
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息 
      success: function (res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          latitude: parseFloat(e.currentTarget.dataset.lat), //要去的纬度-地址
          longitude: parseFloat(e.currentTarget.dataset.lng), //要去的经度-地址
          name: e.currentTarget.dataset.name,
          address: e.currentTarget.dataset.address
        })
      }
    })
  },
  toLocation: function () {
    var that = this;
    var data = that.data;
    wx.navigateTo({
      url: 'search?lat=' + data.lat + '&lng=' + data.lng + '',
    })
  },

  toServices: function () {
    var that = this;

    if(that.data.hiddenService == true) {
      wx.redirectTo({
        url: '../../module3/services/services',
      })
    }else{
      wx.redirectTo({
        url: '../../module3/services/stopPay',
      })
    }

  },
  toMy: function () {
    wx.redirectTo({
      url: '../../module3/my/my',
    })
  },

  /// 点击未缴费记录调用的方法
  numberViewClick: function () {

    wx.navigateTo({
      url: '../../module1/parkrecord/parkrecord',
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

    var that = this;
    var mobilePhone = wx.getStorageSync("mobilePhone");

    if (mobilePhone.length == 11) {
      that.setData({
        hiddenService: true,
      })
    } else {
      that.setData({
        hiddenService: false,
      }) 
    }

    that.setData({
      showList: true,
    });

    if (mobilePhone.length < 11) {
      return;
    }

    /// 请求未缴费记录接口
    wx.request({
      url: httpApi.GetOrderRecord,
      data: {
        mobilePhone: mobilePhone,
        orderStatus: 1,
        plateNo: "",
      },
      success(res) {
        console.log("res=", res);
        if (res.data.code == '0') {
          that.setData({
            allParkCount: res.data.data,
          })

          console.log("allParkCount=", that.data.allParkCount.length);
        } else {
          that.setData({
            allParkCount: '0',
          })
        }

      }
    })

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
