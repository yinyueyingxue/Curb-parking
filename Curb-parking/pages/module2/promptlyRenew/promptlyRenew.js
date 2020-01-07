// pages/module2/promptlyRenew/promptlyRenew.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ number: 1, status: 0 },
           { number: 2, status: 0 },
           { number: 3, status: 0 },
           { number: 6, status: 0 },
           { number: 12, status: 0 },
           { number: 18, status: 0 }],
    navH: 0,
    navT: 0,
    chargingRule: '',
    typeName: '',
    startTime: '',
    endTime: '',
    number: 0,
    startStr: '',
    endStr: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    that.setData({
      navH: app.globalData.navHeight,
      navT: app.globalData.navTop,
      chargingRule: parseInt(options.chargingRule),
      typeName: options.typeName,
      startTime: options.startTime,
      endTime: options.endTime,
      startStr: options.startTime,
      endStr: options.endTime,
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
   * 用户选择金额
   */
  butViewClick: function (e) {

    var that = this;

    console.log("ddd", e);

    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      var number = list[i].number;
      if (e.currentTarget.dataset.number == number) {
        list[i].status = 1;
      } else {
        list[i].status = 0;
      }
    }

    that.setData({
      list: list,
      number: parseInt(e.currentTarget.dataset.number),
    })

    that.getNewDataString(that.data.typeName); 

  },

  /**
   * 年 季 月 时间的计算
   */
  getNewDataString: function (typeName) {

    var that = this;

    var startYear;  /// 开始年
    var startMonth;  /// 开始月
    var startDay;
    var startTime;
    var endYear;  /// 结束年
    var endMonth;  /// 结束月
    var endDay;
    var endTime;
    
    that.setData({
      startTime: that.data.startStr,
      endTime: that.data.endStr,
    })

    startYear = that.data.startTime.substring(0,4);
    startMonth = that.data.startTime.substring(5, 7);
    startDay = that.data.startTime.substring(8, 10);
    startTime = that.data.startTime.substring(11, 19);
    endYear = that.data.endTime.substring(0, 4);
    endMonth = that.data.endTime.substring(5, 7);
    endDay = that.data.endTime.substring(8, 10);
    endTime = that.data.endTime.substring(11, 19);

    console.log('startYear=', startYear, 'startMonth=', startMonth, 'startDay=', startDay, 'startTime=' + startTime);

    var year;
    var month;

    if (typeName == '年') {

      var num0 = parseInt(endYear);
      var num1 = parseInt(endYear) + that.data.number;

      var startStr = num0 + '-' + endMonth + '-' + endDay + ' ' + endTime;

      var endStr = num1 + '-' + endMonth + '-' + endDay + ' ' + endTime;

    } else {

      if (typeName == '季') {

        month = 3 * that.data.number;
        var num0 = parseInt(endMonth);
        var num1 = parseInt(endMonth) + month;
        endDay = parseInt(endDay) + 1;
        
        if (num1 < 12) {

          if(endDay < 10){
            endDay = '0' + endDay;
          }

          var startStr = endYear + '-' + '0' + num0 + '-' + endDay + ' ' + endTime;

          var endStr = endYear + '-' + '0' + num1 + '-' + endDay + ' ' + endTime;

          console.log('季结算出来的结果=', 'startStr=', startStr, 'endStr=', endStr);

          that.setData({
            startTime: startStr,
            endTime: endStr,
          })

        } else {

          /// 取商
          var endConsult = parseInt(num1 / 12);
          /// 取余
          var endSurplus = parseInt(num1 % 12);

          var num3 = parseInt(endYear) + endConsult;
       
          if (endSurplus == 0) {
            endSurplus = 12;
          }

          var num4;
      
          if (endSurplus < 10) {
            console.log("我进来了");
            num4 = '0' + endSurplus;
          } else {
            console.log("我没进来");
            num4 = endSurplus;
          }

          if(endDay < 10) {
            endDay = '0' + endDay;
          }

          var startStr = endYear + '-' + endMonth + '-' + endDay + ' ' + endTime;

          var endStr = num3 + '-' + num4 + '-' + endDay + ' ' + endTime;

          console.log('季结算出来的结果', 'startStr=', startStr, 'endStr=', endStr);

          that.setData({
            startTime: startStr,
            endTime: endStr,
          })

        }

      } else {

        var num0 = parseInt(endMonth);
        var num1 = parseInt(endMonth) + that.data.number;
        endDay = parseInt(endDay) + 1;

        if (num1 < 12) {

          if (endDay < 10) {
            endDay = '0' + endDay;
          }

          var startStr = endYear + '-' + '0' + num0 + '-' + endDay + ' ' + endTime;

          var endStr = endYear + '-' + '0' + num1 + '-' + endDay + ' ' + endTime;

          console.log('月结算出来的结果=', 'startStr=', startStr, 'endStr=', endStr);

          that.setData({
            startTime: startStr,
            endTime: endStr,
          })

        } else {

          console.log('num0=', num0, 'num1=', num1);

          /// 取商
          var endConsult = parseInt(num1 / 12);
          /// 取余
          var endSurplus = parseInt(num1 % 12);

          var num3 = parseInt(endYear) + endConsult;

          console.log('endConsult=', endConsult, 'num3=', num3);

          if (endSurplus == 0) {
            endSurplus = 12;
          }

          var num4;

          if (endSurplus < 10) {
            console.log("我进来了");
            num4 = '0' + endSurplus;
          } else {
            console.log("我没进来");
            num4 = endSurplus;
          }

          if (endDay < 10) {
            endDay = '0' + endDay;
          }

          var startStr = endYear + '-' + endMonth + '-' + endDay + ' ' + endTime;

          var endStr = num3 + '-' + num4 + '-' + endDay + ' ' + endTime;

          console.log('月结算出来的结果', 'startStr=', startStr, 'endStr=', endStr);

          that.setData({
            startTime: startStr,
            endTime: endStr,
          })

        }

      }
    }

  }
  
})