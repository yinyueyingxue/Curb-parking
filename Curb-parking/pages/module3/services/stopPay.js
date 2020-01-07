// pages/services/services.js
import { ip, httpApi } from '../../../utils/getApi.js';
// 定义一个num 用于记录是第几个输入值  初始值-1    
//  0 城市  1 市区字母  2--1  3--2  4--3  5--4  6--5   7---6 新能源
let num = 0;
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: false,
    city: '浙',
    area: 'A',
    are1: '',
    are2: '',
    are3: '',
    are4: '',
    are5: '',
    xny: '',
    comHidden: false,
    btnokshowView: false,
    cityshowView: false,
    areashowView: false,
    cityselect: false,
    areaselect: false,
    are1select: false,
    are2select: false,
    are3select: false,
    are4select: false,
    are5select: false,
    xnyselect: false,
    numError: "",
    payList: [],
    hiddenService: false,
    isIphoneX: false,
    // tabBarH: '',
    butBottomM: '',
    keyboardB: '',
    navH: 0,
    navT: 0,
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


    that.setData({
      showList: true,
    });

    console.log("options=", options);
    var qrUrl = decodeURIComponent(options)

    console.log("hffh =", options.pkId);

    that.setData({
      //获取链接中的参数信息
      pkid: utils.getQueryString(qrUrl, 'pkid'),

    })

    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.data.isIphoneX = true
          that.setData({
            tabBarH: "168rpx",
            butBottomM: "190rpx",
            keyboardB: '36rpx',
          })
        } else {
          that.setData({
            tabBarH: "98rpx",
            butBottomM: "120rpx",
            keyboardB: '64rpx',
          })
        }
      }
    })

    console.log("isIphoneX = ", that.data.isIphoneX, "tabBar = ", that.data.tabBarH);

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

    var mobilePhone = wx.getStorageSync("mobilePhone")

    that.setData({
      showList: true,
      city: '浙',
      area: 'A',
      are1: '',
      are2: '',
      are3: '',
      are4: '',
      are5: '',
      xny: '',
    });


    that.setData({
      showList: true,
    });

    if (mobilePhone.length == 11) {
      that.setData({
        hiddenService: true,
      })
    } else {
      that.setData({
        hiddenService: false,
      })
    }

    if (mobilePhone.length < 11) {
      return;
    }

    wx.request({
      url: httpApi.GetParkFee,
      data: {
        mobilePhone: mobilePhone
      },

      success(res) {

        let result = res.data;

        if (result.code == "0") {

          if (result.data.length == 0) {
            that.setData({
              hiddenService: false,
            })
          } else {
            that.setData({
              hiddenService: true,
            })
          }

          that.setData({
            "payList": result.data,
          });

        } else {
          that.setData({
            hiddenService: false,
          })
        }
      },

    })

  },

  /// 点击服务调用的方法
  toServices: function (e) {
    var that = this;

    if (that.data.hiddenService == true) {
      wx.redirectTo({
        url: '../../module3/services/services',
      })
    } else {
      wx.redirectTo({
        url: '../../module3/services/stopPay',
      })
    }

  },

  /// 点击首页调用的方法
  toHome: function (e) {
    wx.redirectTo({
      url: '/pages/module2/home-page/home-page'
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

  },
  //去缴费
  toPayOnClick(e) {
    wx.navigateTo({
      url: '/pages/module3/services/payCost/payError'
    })

  },
  //点击确认
  btnComputeParkingFee(e) {

    // //微信小程序发起支付请求

    var that = this;

    if (that.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

      return;

    }

    // let userId = wx.getStorageSync("userId");
    let userId = "123";
    //console.log(this.data.city); 
    if ((that.data.city == "" && that.data.city == null) || that.data.area == "" || that.data.are1 == "" || that.data.are2 == "" || that.data.are3 == "" || that.data.are4 == "" || (that.data.are5 == "" && that.data.are5 == null && that.data.are5 == undefined)) {
      that.setData({
        numError: "请输入正确的车牌号",
      })
    } else {

      that.setData({
        numError: "",
      });

      let plate = that.data.city + that.data.area + that.data.are1 + that.data.are2 + that.data.are3 + that.data.are4 + that.data.are5 + that.data.xny;

      wx.request({
        url: httpApi.GetOrderRecord,
        data: {
          mobilePhone: '',
          orderStatus: 1,
          plateNo: plate,
        },

        success(res) {

          console.log("临停缴费 res =", res);
          
          if(res.data.data != null) {

            wx.navigateTo({
              url: '/pages/module3/stopPayList/stopPayList?plateNo=' + plate,
            });

            // var parkOrder = res.data.data.parkOrder;
            // var inPark = res.data.data.inPark;

            // if(parkOrder.length > 0) {
            //   wx.navigateTo({
            //     url: '/pages/module3/stopPayList/stopPayList?plateNo=' + plate,
            //   });
            // }else {

            //   if (inPark == undefined) {
            //     wx.showToast({
            //       title: '停车费用为0元，不用缴费！！！',
            //       duration: 1500,
            //       icon: 'none',
            //     })
            //     return;
            //   }

            // var result = res.data.data[0];

            //   var receivable = result.receivable;
            //   var pkname = result.pkname;
            //   var plateNo = result.plateNo;
            //   var inTime = result.inTime;
            //   var id = result.id;
            //   var pkno = result.pkno;
            //   var pkid = result.pkid;
            //   var tradingNo = result.tradingNo;
            //   var parkTime = result.parkTime;

            //   wx.navigateTo({
            //     url: '/pages/module3/services/payCost/confirmOrder?receivable=' + receivable + "&pkname=" + pkname + "&plateNo=" + plateNo + "&inTime=" + inTime + "&parkTime=" + parkTime + "&id=" + id + "&pkno=" + pkno + "&pkid=" + pkid + "&tradingNo=" + tradingNo,
            //   });
            // // }


          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
          
        },

      })
      
    }
    
  },

  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      // wx.redirectTo({
      //   url: 'pages/module4/register/register'
      // })
      return false;
    } else {
      return true;
    }
  },

  //省份键盘输入
  city(e) {
    let txt = e.target.dataset.textdata;
    if (txt == "删") {
      num = 0;
      this.setData({
        city: '',
        comHidden:true,
        btnokshowView: true,
        cityshowView: true,
        areashowView: false,
        cityselect: true,
        areaselect: false,
        are1select: false,
        are2select: false,
        are3select: false,
        are4select: false,
        are5select: false,
        xnyselect: false,
      })
    }
    else {
      num++;
      this.setData({
        city: txt,
        comHidden:true,
        btnokshowView: true,
        cityshowView: false,
        areashowView: true,
        cityselect: false,
        areaselect: true,
        are1select: false,
        are2select: false,
        are3select: false,
        are4select: false,
        are5select: false,
        xnyselect: false,
      })
    }
  },
  //数字字母键盘输入
  num(e) {
    let txt = e.target.dataset.textdata;
    if (txt == "删") {
      switch (num) {
        case 1:
          this.setData({
            area: "",
            comHidden:true,
            btnokshowView: true,
            cityshowView: true,
            areashowView: false,
            cityselect: true,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 2:
          this.setData({
            are1: "",
            comHidden:true,
            cityselect: false,
            areaselect: true,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 3:
          this.setData({
            are2: "",
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: true,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 4:
          this.setData({
            are3: "",
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: true,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 5:
          this.setData({
            are4: "",
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: true,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 6:
          this.setData({
            are5: "",
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: true,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        case 7:
          this.setData({
            xny: "",
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num--;
          break;
        default:
          break;
      }
    }
    else {
      switch (num) {
        case 0:
        case 1:
          this.setData({
            area: txt,
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: true,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 2:
          this.setData({
            are1: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: true,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 3:
          this.setData({
            are2: txt,
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: true,
            are4select: false,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 4:
          this.setData({
            are3: txt,
            comHidden:true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: true,
            are5select: false,
            xnyselect: false,
          })
          num++;
          break;
        case 5:
          this.setData({
            are4: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: true,
            xnyselect: false,
          })
          num++;
          break;
        case 6:
          this.setData({
            are5: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: true,
            xnyselect: false,
          })
          break;
        case 7:
          this.setData({
            xny: txt,
            comHidden: true,
            cityselect: false,
            areaselect: false,
            are1select: false,
            are2select: false,
            are3select: false,
            are4select: false,
            are5select: false,
            xnyselect: true,
          })
          break;
        default:
          break;
      }
    }
  },
  //车牌号
  citybtn(e) {
    num = 0;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: true,
      areashowView: false,
      cityselect: true,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  areabtn(e) {
    num = 1;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: true,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })

  },
  are1btn(e) {
    num = 2;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: true,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are2btn(e) {
    num = 3;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: true,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are3btn(e) {
    num = 4;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: true,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  are4btn(e) {
    num = 5;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: true,
      are5select: false,
      xnyselect: false,
    })
  },
  are5btn(e) {
    num = 6;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: true,
      xnyselect: false,
    })
  },
  xnybtn(e) {
    num = 7;
    this.setData({
      comHidden:true,
      btnokshowView: true,
      cityshowView: false,
      areashowView: true,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: true,
    })
  },
  //键盘 确定按钮
  inputok(e) {
    this.setData({
      comHidden: false,
      btnokshowView: false,
      cityshowView: false,
      areashowView: false,
      cityselect: false,
      areaselect: false,
      are1select: false,
      are2select: false,
      are3select: false,
      are4select: false,
      are5select: false,
      xnyselect: false,
    })
  },
  getPayList: function () {
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    } else {
      wx.navigateTo({ url: '/pages/module1/paylist/paylist' });
    }

  },
  MonthRenewals: function () {
    if (this.checkUserId() == false) {
      wx.navigateTo({
        url: '/pages/module4/register/register'
      })

    } else {
      wx.navigateTo({ url: '/pages/module3/monthly-card/one' });
    }

  },
  toHome: function (e) {
    wx.redirectTo({
      url: '/pages/module2/home-page/home-page'
    })
  },
  toMy: function () {
    wx.redirectTo({
      url: '../../module3/my/my',
    })
  },

  checkUserId() {
    let userId = wx.getStorageSync("userId");
    if (userId == '' || userId == undefined) {
      // wx.redirectTo({
      //   url: 'pages/module4/register/register'
      // })
      return false;
    } else {
      return true;
    }
  },
})