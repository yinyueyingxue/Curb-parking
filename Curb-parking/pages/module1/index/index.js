//index.js
import { ip } from '../../../utils/getApi.js';
// 定义一个num 用于记录是第几个输入值  初始值-1    
//  0 城市  1 市区字母  2--1  3--2  4--3  5--4  6--5   7---6 新能源
let num = 0;
// 在需要使用的js文件中，导入js
var util = require('../../../utils/util.js');
Page({
  data: {
    city: '浙',
    area: 'A',
    are1: '',
    are2: '',
    are3: '',
    are4: '',
    are5: '',
    xny: '',
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
    numError: ""
  },
  onLoad: function() {
    //console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  btnBingd(e) {
    //my.navigateTo({ url: '/pages/Register/Register' });
  },
  //确认缴费
  btnComputeParkingFee(e) {
    //console.log(this.data.city); 
    if ((this.data.city == "" && this.data.city == null) || this.data.area == "" || this.data.are1 == "" || this.data.are2 == "" || this.data.are3 == "" || this.data.are4 == "" || (this.data.are5 == "" && this.data.are5 == null && this.data.are5 == undefined)) {
      this.setData({
        numError: "请选择省份或车牌号",
      })
    }
    let plate = this.data.city + this.data.area + this.data.are1 + this.data.are2 + this.data.are3 + this.data.are4 + this.data.are5 + this.data.xny;
    var time = util.formatTime(new Date());
   
    wx.request({
      url: ip+'/api/XiaoChengXu/GetParkFreeByPlate',
      data: {
        userid: wx.getStorageSync("userId"),
        plate: plate
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let resstr = JSON.stringify(res);
        console.log( resstr);
        let dataprase = JSON.parse(res.data);
        if (dataprase.code == '1004'){
          wx.showModal({
            title: '提示',
            content: dataprase.msg,
            showCancel:false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (dataprase.msg == '非临时卡' || dataprase.msg == '不需要缴费') {
          wx.showModal({
            title: '提示',
            content: dataprase.msg,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '/pages/module1/order-noneed/order-noneed'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (dataprase.code == '1000') {
          console.log(" dataprase.parkrecord=" + dataprase.parkrecord);
          wx.navigateTo({ url: '/pages/module1/order/order?plate=' + dataprase.parkrecord.plate + '&amount=' + dataprase.parkrecord.amout + '&PKID=' + dataprase.parkrecord.pkid + '&parkingtime=' + dataprase.parkrecord.parktime + '&EntranceTime=' + dataprase.parkrecord.entrancetime + '&place=' + dataprase.parkrecord.pkname + '&picurl=' + dataprase.parkrecord.imgurl + '&SSamout=' + dataprase.parkrecord.ssamout + '&YHamout=' + dataprase.parkrecord.yhamout + '&Orderno=' + dataprase.parkrecord.orderno + '&AccountId=' + dataprase.parkrecord.accountId}); 
        } 
      } 
    }) 
  },
  //省份键盘输入
  city(e) {
    let txt = e.target.dataset.textdata;
    if (txt == "删") {
      num = 0;
      this.setData({
        city: '',
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
    } else {
      num++;
      this.setData({
        city: txt,
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
    } else {
      switch (num) {
        case 0:
        case 1:
          this.setData({
            area: txt,
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
  }
})