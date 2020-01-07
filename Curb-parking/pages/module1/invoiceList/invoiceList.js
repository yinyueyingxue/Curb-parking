// pages/module1/invoiceList/invoiceList.js
import { ip, httpApi } from '../../../utils/getApi.js';
// 在需要使用的js文件中，导入js
var utils = require('../../../utils/util.js');

const app = getApp()

const date = new Date()
console.log("最上面date =", date);
const years = []
const months = []
const days = []

for (let i = 1960; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lisidid: ['1', '2', '3', '4', '5', '6', '2', '3', '4', '5', '6', '2', '3', '4', '5', '6'],
    listModels: [],
    pages: 0,  /// 总页数
    total: 0,  /// 总条数
    farmingSelect:false,  /// 本业选择
    completeSelect:false,  /// 全部选择
    maskHidden: true,   /// 点击筛选订单筛选
    pageHidden:false,
    cityList: [],
    // hfhffh: ['1', '2', '3', '4', '5', '6', '2', '3', '4', '5', '6', '2', '3', '4', '5', '6'],
    dataHidden: true,
    years: years,
    year: '',
    months: months,
    month: '',
    days: days,
    day: '',
    value: [9999, 1, 1],
    newDate: '',
    enterDate: '',  /// 条件筛选开始时间
    comeDate: '',   /// 条件筛选结束时间
    dateIndex: '',  /// 用来区分赋值
    isScroll: true,  /// 禁止View滚动
    bottomViewHidden: true,  /// 控制订单条数和金额View的显示和隐藏
    totalMoney: 0, /// 选中开取发票的总金额
    totalNumber: 0,  /// 选中 开取发票的总条数
    orderNos: '',  /// 多张订单编号的拼接
    pageIndex: 1,  /// 第几页
    pageSize: 0,  /// 每页多少条数据
    lowStr: '',  /// 用户输入的最低价
    heightStr: '',  /// 用户输入的最高价
    bottomViewHeight: '',  /// 适配iphoneX
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

    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.data.isIphoneX = true
          that.setData({
            bottomViewHeight: "190rpx",
            // marginTop: "178rpx",
          })
        } else {
          that.setData({
            bottomViewHeight: "120rpx",
            // marginTop: "128rpx",
          })
        }
      }
    }) 

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    that.setData({
      newDate: Y + "-" + M + "-" + D,
      value: [9999, M-1, D-1],
    })

    that.onPullDownRefresh();

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

    var that = this;

    if(that.data.maskHidden == false) {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();

      return;
    }

    console.log("花花回复");

    that.setData({
      pageIndex: 0,
      pageSize: 10,
    })

    // 显示顶部刷新图标
    // wx.showNavigationBarLoading();

    that.getLoadingListData(that.data.pageIndex, that.data.pageSize);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;

    if (that.data.maskHidden == false) {
      return;
    }

    var num = that.data.pageIndex + 1;

    console.log("num=", num);

    that.setData({
      pageIndex: num,
      pageSize: 10,
    })

    that.getLoadingListData(that.data.pageIndex, that.data.pageSize);

  },

  /**
   * 请求订单记录列表数据
   */
  getLoadingListData: function (pageIndex, pageSize) {

    var that = this;

    if(pageIndex == 0) {
      pageSize = 10;
      that.setData({
        listModels: [],
        pageIndex: 1,
      })
    }

    /// 当上拉加载更多的 页数, 大于总页数, 就不请求.
    if(pageIndex > that.data.pages) {
      return;
    }

    /// 当用户点击全部选择, 先清空列表数组, pageIndex修改成第一页, pageSize数据条数改成最大
    if (that.data.completeSelect == true) {
      that.setData({
        listModels: [],
      })
      pageIndex = 1;
      pageSize = that.data.total;
    }

    var amountEnd = that.data.heightStr;
    var amountStart = that.data.lowStr;
    var cityId = '';
    console.log("cityList=", that.data.cityList);
    for(var i = 0; i < that.data.cityList.length; i++) {
      if (that.data.cityList[i].select == true) {
        console.log("我 jinlai l ");
        cityId = that.data.cityList[i].cityId;
      }
    }


    var comeDate = that.data.comeDate;
    var enterDate = that.data.enterDate;
    var mobilePhone = wx.getStorageSync("mobilePhone");
    console.log(mobilePhone, pageIndex, pageSize);

    console.log("amountEnd=", amountEnd, "amountStart=", amountStart, "city=", cityId, "comeDate=", comeDate, "enterDate=", enterDate, "mobilePhone=", mobilePhone, "pageSize=", pageSize, "pageIndex=", pageIndex);

    // 发起网络请求
    wx.request({
      url: httpApi.GetInvoiceOrder,
      data: {
        "amountEnd": amountEnd,
        "amountStart": amountStart,
        "city": cityId,
        "inTimeEnd": comeDate,
        "inTimeStart": enterDate,
        "mobilePhone": mobilePhone,
        "limit": pageSize,
        "outTimeEnd": '',
        "outTimeStart": '',
        "page": pageIndex,
      },

      success(res) {
        console.log('停车开票 res=', res);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var listSelect = false;

        if (res.data.code == '0') {

          var index = pageIndex * 10;

          var result = res.data.data.resultPage.records;

          for(var i = 0; i < result.length; i++) {

            if (that.data.completeSelect == true) {
              result[i].listSelect = true;
              result[i].index = index + i;
            }else{
              result[i].listSelect = false;
              result[i].index = index + i;
            }
          }

          console.log("result =", result);
          var citys = res.data.data.citys;
          for(var i = 0; i < citys.length; i++) {
            citys[i].select = false;
          }
          

          that.setData({
            listModels: that.data.listModels.concat(result),
            cityList: citys,
            pages: res.data.data.resultPage.pages,
            total: res.data.data.resultPage.total
          })


          var selectList = [];
          var orderNoList = [];
          for (var i = 0; i < that.data.listModels.length; i++) {

            var listSelect = that.data.listModels[i].listSelect;
            if (listSelect == true) {

              selectList.push(that.data.listModels[i].amount);
              orderNoList.push(that.data.listModels[i].orderNo);
            }

            console.log("selectList =", selectList);
          }

          var result = 0;
          for (var i = 0; i < selectList.length; i++) {
            var num = result + selectList[i];
            var result = num;
            that.setData({
              totalMoney: result,
              totalNumber: selectList.length
            })
          }

          var orderNo = '';
          for (var i = 0; i < orderNoList.length; i++) {
            if(orderNo.length <= 0) {
              var orderNo = orderNoList[i];
            }else{
              var orderNo = orderNo + ',' + orderNoList[i];
            }
            var orderNo = orderNo;
            that.setData({
              orderNos: orderNo
            })
          }

          console.log("orderNos =", that.data.orderNos);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

 
  /**
   * 用户点击订单筛选
   */
  filtrateViewClick: function () {
    var that = this;
    that.setData({
      maskHidden: false,
      isScroll: false,
    })

    var result = that.data.listModels;

    if(result.length > 5 && that.data.maskHidden == false) {
      that.setData({
        pageHidden: true,
      })
    }else{
      that.setData({
        pageHidden: false,
      })
    }
  },

  /**
   * 用户点击筛选蒙板
   */
  maskViewClick: function () {
    var that = this;
    that.setData({
      maskHidden: true,
      isScroll: true,
    })
  },

  /**
   * 用户点击列选择
   */
  listSelectViewClick: function (e) {
    var that = this;

    var listModels = that.data.listModels
    
    for (var i = 0; i < listModels.length; i++) {
      var index = listModels[i].index;

      if (e.currentTarget.dataset.index == index) {
        if (listModels[i].listSelect == true) {
          listModels[i].listSelect = false;
        }else{
          listModels[i].listSelect = true;
        } 
      }   
    };
    
    that.setData({
      listModels: listModels,
    })

    var selectList = [];
    var orderNoList = [];
    for (var i = 0; i < that.data.listModels.length; i++) {

      var listSelect = that.data.listModels[i].listSelect;
      if (listSelect == true) {

        selectList.push(that.data.listModels[i].amount);
        orderNoList.push(that.data.listModels[i].orderNo);
      }

      console.log("selectList =", selectList);

      if (selectList.length > 0) {
        that.setData({
          bottomViewHidden:false,
        })
      }else {
        that.setData({
          bottomViewHidden: true,
          farmingSelect: false,
          completeSelect: false,
        })
      }
    }

    /// 当用户选择的条数等于总条数, 本页选择和全部选择都勾选上
    if (selectList.length == that.data.total) {
      that.setData({
        farmingSelect: true,
        completeSelect: true,
      })
    }

    var result = 0;
    for (var i = 0; i < selectList.length; i++) {
      var num = result + selectList[i];
      var result = num;
      that.setData({
        totalMoney: result,
        totalNumber:selectList.length
      })
    }

    var orderNo = '';
    for (var i = 0; i < orderNoList.length; i++) {
      if (orderNo.length <= 0) {
        var orderNo = orderNoList[i];
      } else {
        var orderNo = orderNo + ',' + orderNoList[i];
      }
      var orderNo = orderNo;
      that.setData({
        orderNos: orderNo
      })
    }

    for (var i = 0; i < listModels.length; i++) {
      if(listModels[i].listSelect == false) {
        that.setData({
          farmingSelect: false,
          completeSelect: false,
        })
      }
    }

    console.log("orderNos =", that.data.orderNos);

  },

  /**
   * 用户点击本业或全部数据选择
   */
  bottomTypeViewClick: function (e) {
    
    var that = this;

    var listModels = that.data.listModels

    for (var i = 0; i < listModels.length; i++) {
      if (listModels[i].listSelect == false) {
        listModels[i].listSelect = true;
      }
    }

    var farmingSelect = false;
    var completeSelect = false;

    if (e.currentTarget.dataset.index == 0) {

      if(listModels.length == that.data.total) {

        if(that.data.farmingSelect == true && that.data.completeSelect == true) {
          farmingSelect = false;
          completeSelect = false;
          
          for (var i = 0; i < listModels.length; i++) {
            if (listModels[i].listSelect == true) {
              listModels[i].listSelect = false;
            }
          }

          that.setData({
            listModels: listModels,
            totalMoney: 0,
            totalNumber: 0,
            bottomViewHidden: true,
            farmingSelect: farmingSelect,
            completeSelect: completeSelect,
            orderNos: '',
          })
           
        }else {
          farmingSelect = true;
          completeSelect = true;

          console.log("12");

          that.setData({
            farmingSelect: farmingSelect,
            completeSelect: completeSelect,
            listModels: listModels,
            bottomViewHidden: false
          })
        }

      }else{

        if(that.data.farmingSelect == false) {
          farmingSelect = true;
          completeSelect = false;
          console.log("13");
          that.setData({
            farmingSelect: farmingSelect,
            completeSelect: completeSelect,
            listModels: listModels,
            bottomViewHidden: false
          })
        }else{
          farmingSelect = false;
          completeSelect = false;
          console.log("13");

          for(var i = 0; i < listModels.length; i++) {
            if(listModels[i].listSelect == true) {
              listModels[i].listSelect = false;
              that.setData({
                listModels: listModels,
              })
            }
          }

          that.setData({
            farmingSelect: farmingSelect,
            completeSelect: completeSelect,
            listModels: listModels,
            totalMoney: 0,
            totalNumber: 0,
            bottomViewHidden: true,
            orderNos: '',
          })
        }
        
      }

    }else {
      
      if(that.data.completeSelect == true) {
        farmingSelect = false;
        completeSelect = false;

        for(var i = 0; i < listModels.length; i++) {
          if (listModels[i].listSelect == true) {
            listModels[i].listSelect = false;
          }
        }

        that.setData({
          listModels: listModels,
          totalMoney: 0,
          totalNumber: 0,
          bottomViewHidden: true,
          farmingSelect: farmingSelect,
          completeSelect: completeSelect,
          orderNos: '',
        })

      }else {
        farmingSelect = true;
        completeSelect = true;

        that.setData({
          farmingSelect: farmingSelect,
          completeSelect: completeSelect,
          listModels: listModels,
          bottomViewHidden: false
        })
      }

      that.onReachBottom();

    }

    console.log("listModels =", that.data.listModels);

      var selectList = [];
      var orderNoList = [];
      for (var i = 0; i < that.data.listModels.length; i++) {
        
        var listSelect = that.data.listModels[i].listSelect;
        if (listSelect == true) {

          selectList.push(that.data.listModels[i].amount);
          orderNoList.push(that.data.listModels[i].orderNo)
        }
      }

    console.log("selectList =", selectList, "orderNoList=", orderNoList);

      var result = 0;
      for (var i = 0; i < selectList.length; i++) {
        var num = result + selectList[i];
        var result = num;
        that.setData({
          totalMoney: result,
          totalNumber: selectList.length,
        })
      }

      if(that.data.totalMoney == 0 && that.data.totalNumber == 0) {
        that.setData({
          bottomViewHidden: true,
        })
      }

      var orderNo = '';
      for (var i = 0; i < orderNoList.length; i++) {
        if (orderNo.length <= 0) {
          var orderNo = orderNoList[i];
        } else {
          var orderNo = orderNo + ',' + orderNoList[i];
        }
        var orderNo = orderNo;
        that.setData({
          orderNos: orderNo
        })
      }

      console.log("orderNos =", that.data.orderNos);
    
  },

  /**
   * 用户点击选择日期
   */
  dataViewClick: function (e) {
    console.log(e);
    var that = this;

    that.setData({
      dataHidden:false,
      dateIndex: e.currentTarget.dataset.index,
    })
  },

  /**
   * 用户点击隐藏日期选择器
   */
  maskDataViewClick: function () {
    var that = this;
    that.setData({
      dataHidden: true,
    })
  },

  /**
   * 用户选择好日期点击确定
   */
  confirmClick: function () {
    var that = this;

    console.log(that.data.month.length, that.data.month.length);
  
    if (that.data.month.length < 2) {
      console.log("month = 我进来了");
      that.setData({
        month: '0' + that.data.month,
      })
      
    }

    if (that.data.day.length < 2) {
      console.log("day = 我进来了");
      that.setData({
        day: '0' + that.data.day,
      })
    }

    console.log("month=", that.data.month, "day=", that.data.day);

    if(that.data.month == 0 && that.data.day == 0) {
      if (that.data.dateIndex == 0) {
        that.setData({
          enterDate: that.data.newDate,
        })
      } else {
        that.setData({
          comeDate: that.data.newDate,
        })
      }
    }else {
      if (that.data.dateIndex == 0) {
        that.setData({
          enterDate: that.data.year + '-' + that.data.month + '-' + that.data.day,
        })
      } else {
        that.setData({
          comeDate: that.data.year + '-' + that.data.month + '-' + that.data.day,
        })
      }
    }
    
  },

  /**
   * 用户取消日期选择
   */
  cancelClick: function () {
    var that = this;

  },

  /**
   * 用户选择筛选的城市
   */
  cityViewClick: function (e) {

    var that = this;

    console.log(e);

    var result = that.data.cityList;

    for(var i = 0; i < result.length; i++) {
      var cityId = result[i].cityId;
      if (e.currentTarget.dataset.cityid == cityId) {
        result[i].select = true;
      }else{
        result[i].select = false;
      }
    }
    that.setData({
      cityList: result,
    })

  },

  /**
   * 用户点击下一步
   */
  nextBtnClick: function () {
    var that = this;

    if(that.data.totalNumber > 0 && that.data.totalMoney > 0) {
      
      wx.navigateTo({
        url: '/pages/module1/parkingTicket/parkingTicket?totalMoney=' + that.data.totalMoney + '&orderNos=' + that.data.orderNos + '',
      })

    }else {
      wx.showToast({
        title: '至少勾选一条开票订单!',
        icon: 'none',
        duration: 1500
      })
    }
    
  },

  /**
   * 用户点击日期选择器确定按钮
   */
  bindChange: function (e) {
    var that = this;
    const val = e.detail.value
    console.log("日期选择",e, that.data.years, that.data.months, that.data.days);
    that.setData({
      year: that.data.years[val[0]].toString(),
      month: that.data.months[val[1]].toString(),
      day: that.data.days[val[2]].toString(),
    })

    console.log(that.data.year,"-", that.data.month,"-", that.data.day);
  },

  /**
   * 用户输入最低价
   */
  bindLowPriceInput: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      lowStr: value,
    })
  },

  /**
   * 用户输入最高价
   */
  bindHeightPriceInput: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      heightStr: value,
    })
  },

  /**
   * 用户点击重置
   */

  resetViewClick: function () {
    var that = this;

    var result = that.data.cityList;

    for(var i = 0; i < result.length; i++) {
      if(result[i].select == true) {
        result[i].select = false;
      }
    }

    that.setData({
      enterDate: '',
      comeDate: '',
      lowStr: '',
      heightStr: '',
      cityList: result,
    })
  },

  /**
   * 用户点击确定
   */

  confirmViewClick: function () {
    var that = this;
    that.setData({
      listModels:[],
    })
    that.getLoadingListData(0, that.data.total);
    that.maskViewClick();
  },

})