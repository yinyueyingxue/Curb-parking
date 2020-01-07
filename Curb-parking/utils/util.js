import { httpApi, payKey } from './getApi.js';
var utils = require('./sign.js');
var app = getApp();
// 格式化日期
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// export const getparktime = (inTime,outTime)=>{
//   console.log("时间转换方法 days =", inTime, outTime);
//   var stime = parseInt(inTime);

//   var etime = parseInt(outTime);
//   var usedTime = etime - stime; //两个时间戳相差的毫秒数
//   console.log("days =", stime, etime, usedTime);
//   var days = Math.floor(usedTime / (24 * 3600 * 1000));

//   // console.log("时间转换方法 days =", days);
//   //计算出小时数
//   var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
//   var hours = Math.floor(leave1 / (3600 * 1000));
//   //计算相差分钟数
//   var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
//   var minutes = Math.floor(leave2 / (60 * 1000));
//   var dayStr = days == 0 ? "" : days + "天";
//   var hoursStr = hours == 0 ? "" : hours + "小时";
//   var time = dayStr + hoursStr + minutes + "分";
//   return time;
// }

// /* 处理后台返回的数据, 过滤掉0天 0小时 */
// export const getNewTime = (parkTime) => {

//   if(parkTime.length == 0 || parkTime == undefined || parkTime == null) {
//     return;
//   }

//   /// 获取对应的秒数
//   var code1 = parkTime.match(/小时(.*)/)[1];//取小时后面所有字符串



//   var time = '';

//   if (parkTime.indexOf("天") >= 0) {
    


//   }else {

//     if (parkTime.indexOf("小时") >= 0) {

//     }else{

//     }

//   }
// }

/*
网络获取数据
*/
export const getData = (metod, url, option, callback, errback) => {

  var option = option || '';
  let data = {

    data: option
  };
  wx.getNetworkType({
    success(res) {
      // console.log(res);
      const networkType = res.networkType;
      if (networkType == 'none') {
        wx.showToast({
          title: '暂无网络',
          icon: 'none',
          duration: 1500
        });
        if (errback) {
          errback();
        };
      } else {
        if ('POST' == metod) {
          wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: data,
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

              if (callback) {
                callback(res.data);
              };

            },
            fail: function (err) {
              if (errback) {
                errback(err);
              };

            }
          })

        } else if ('GET' == metod) {
          wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: data,
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

              if (callback) {
                callback(res.data);
              };

            },
            fail: function (err) {
              if (errback) {
                errback(err);
              };

            }
          })
        }
      }
    }
  })

}



/**
 * 手机号检测
 */
export const isPoneAvailable = ($poneInput) => {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test($poneInput)) {
    return false;
  } else {
    return true;
  }
}

/*
 **
 * 
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
export const isIdCard = (str) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}
/**
 * 登录检测
 */
export const checkLogin = (callback1, callback2, callback3) => {
  //判断是否登录
  let owner_id = wx.getStorageSync('userId');
  if (!owner_id || owner_id == '') {
    callback1();
  } else if (callback2) {
    callback2();
  }

};
/*
上传文件一张图片
*/
export const uploadFile = (url, option, tempFilePaths, callback, errback) => {
  let date = Date.parse(new Date());
  let ecret_key = "82fc864c242012a43bdba30ab127dd35";
  let str = "User_H5id=" + date + ecret_key;
  let sign = md5(str);
  var option = option || '';
  let data = {
    data: option
  };
  // console.log(data);
  wx.uploadFile({
    url: url, //仅为示例，并非真实的接口地址
    formData: option,
    filePath: tempFilePaths,
    name: 'file',
    success: function (res) {
      if (callback) {
        callback(res.data);
      };

    },
    fail: function (err) {
      if (errback) {
        errback(err);
      };

    }
  })
}
// 上传多张图片
export const uploadImg = (url, option, tempFilePaths, callback, errback) => {
  let date = "";
  let ecret_key = "";
  let str = "";
  let sign = "";
  var option = option || '';
  let i = option.i ? option.i : 0;
  let data = {
    data: option
  };
  // console.log(data);
  wx.uploadFile({
    url: url, //仅为示例，并非真实的接口地址
    formData: option,
    filePath: tempFilePaths[i],
    name: 'file',
    success: function (res) {
      if (callback) {
        // callback(res.data);
      };

    },
    complete: function (complete) {
      console.log(i);
      i++;
      if (i == tempFilePaths.length) {
        console.log('执行完毕');
      }
    },
    fail: function (err) {
      if (errback) {
        errback(err);
      };

    }
  })
}

export const getMd5Sign = (myObj, keys, len) => {
  let appSecret = '32747486c2936c53c643fcd84d139c01';
  var newObj = {};
  keys.sort();
  for (let i = 0; i < len; i++) {
    newObj[keys[i]] = myObj[keys[i]];
  }
  var str = '';
  var key = Object.keys(newObj);
  for (let i = 0; i < key.length; i++) {
    if (i != 0) {
      str += "&";
    }
    str += key[i] + '=' + newObj[key[i]];
  }
  str = str + "&key=";
  str = str + appSecret;
  return utils.md5(str).toUpperCase();
}

export const getPaySign = (myObj, keys, len) => {

  let payKey = 'ZshYxb201909232052qwertyuiopasdf';  
  var newObj = {};
  keys.sort();
  for (let i = 0; i < len; i++) {
    newObj[keys[i]] = myObj[keys[i]];
  }
  var str = '';
  var key = Object.keys(newObj);
  for (let i = 0; i < key.length; i++) {
    if (i != 0) {
      str += "&";
    }
    str += key[i] + '=' + newObj[key[i]];
  }
  str = str + "&key=";
  str = str + payKey;
  return utils.md5(str).toUpperCase();
}

// 解析链接中的参数
export const getQueryString = (url, name) => {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

module.exports = {
  formatTime: formatTime,
  getData:getData,
  getMd5Sign: getMd5Sign,
  getPaySign: getPaySign,
  getQueryString: getQueryString,
  // getparktime: getparktime
}