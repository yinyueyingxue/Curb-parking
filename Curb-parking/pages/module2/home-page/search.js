// pages/home-page/search.js
import {
  ip, httpApi
} from '../../../utils/getApi.js';
import {
  checkLogin
} from '../../../utils/util.js';
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'SZYBZ-EOC35-QDAIB-Q4KZ5-QUZIO-GGFUY' // 必填
});
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lat: 0,
    lng: 0,
    backfill: '',
    suggestion:[],
    id:'',
    parkList: [],
    showView: false,
    topNum: 0,
    navH: 0,
    navT: 0,
  },

  backfill: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    for (var i = 0; i < that.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: that.data.suggestion[i].title,
          lat: that.data.suggestion[i].latitude,
          lng: that.data.suggestion[i].longitude,
        });
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: ip + '/api/XiaoChengXu/GetAllParkDetails',
      data: {
        "PKName": "",
        "index": "1",
        "fromLat": that.data.lat,
        "fromLng": that.data.lng
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          var data = JSON.stringify(res.data.resultData);
          var parkList = JSON.parse(data);
          that.setData({
            parkList: parkList,
            showView: false,
            topNum: that.data.topNum = 0
          })
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
  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var that = this;
    console.log("e======", e);
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region: '杭州', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        var sug = [];
        for (var i = 0; i < that.data.parkList.length; i++) {
          
          let name = that.data.parkList[i].pkname;

          if (name.indexOf(e.detail.value) >= 0) {

            sug.push(that.data.parkList[i]);

          }
          
        }
        that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
        });

        if (e.detail.value != '' || e.detail.value != null){
          that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
            showView: true
          });
        }
      },
      fail: function (error) {
        that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          showView: false
        });
      },
      complete: function (res) {

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
      "lng": options.lng,
      "lat": options.lat
    })
    
    that.getAllParkLots();
    showView: (options.showView == "true" ? true : false)
  },

  /// 点击定位按钮调用的方法
  navigation: function (e) {
    let arr = e.currentTarget.dataset.coordinate.split(',');
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息 
      success: function (res) {
        wx.openLocation({ //使用微信内置地图查看位置。
          latitude: parseFloat(arr[1]), //要去的纬度-地址
          longitude: parseFloat(arr[0]), //要去的经度-地址
          name: e.currentTarget.dataset.name,
          address: e.currentTarget.dataset.address
        })
      }
    })
  },

  getAllParkLots: function( ){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: httpApi.GetNearlyPark,
      data: {
        lat: that.data.lat,
        lon: that.data.lng
      },

      success(res) {
        wx.hideLoading();

        for(var i = 0; i < res.data.data.length; i++) {
          let distance = parseFloat(res.data.data[i].distance).toFixed(1);
          res.data.data[i].distance = distance;
          that.setData({
            'parkList': res.data.data,
          })
        };
        
      }

    })

  },
 
  toDetails: function (e) {
    console.log("附近停车场 = ", e);
    var that = this;
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'details?pkName=' + data.pkname + '&distance=' + data.distance + '&address=' + data.address + '&spaceBitNum=' + data.spacebitnum + '&carBitNum=' + data.carbitnum + '&carBitNumLeft=' + data.carbitnumleft + '&pointLat=' + data.pointlat + '&pointLng=' + data.pointlng + '&pointName=' + data.pointname + '&pointAddress=' + data.pointaddress + '&feeremark=' + data.feeremark + '&coordinate=' + data.coordinate + '',
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

  }
})