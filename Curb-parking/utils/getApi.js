/*
 * 接口参数
*/
//const ip = 'http://localhost:58717';
/**测试 */
// const ip = 'https://spstest.spsing.com:4433';//接口

// /**本地 */
// const ip = 'http://192.168.1.14:9999';
// if (ip == 'http://192.168.1.14:9999') {//正式环境注释打印
//   // console.log=function(){};
// }

/**测试环境 */
const ip = 'https://test-sps.vinsuan.cn';
if (ip == 'https://test-sps.vinsuan.cn') {//正式环境注释打印
  // console.log=function(){};
}

/**生产环境 */
// const ip = 'https://gateway.vinsuan.cn'
// if (ip == 'https://gateway.vinsuan.cn' ){//正式环境注释打印
//       console.log=function(){};
// }

const payKey = 'ZshYxb201909232052qwertyuiopasdf';//'9884EDC30C762ACC4934CB57600ED7AB';
const http = {
  serverIp: ip + '/parking-api/api',//接口地址 
}

const wxpay = {//小程序配置参数
  appid: 'wx77017d9958a5eb94',
  partner: '',
  pub_appsecret: '',
  biz: ''//关注小程序参数
}

const httpApi = {//接口
  GetVerCode: http.serverIp + '/userLogin/getVerCode',                        /// 获取验证码
  UserLogin: http.serverIp + '/userLogin/userLogin',                          /// 用户登陆
  SaveUserInfo: http.serverIp + '/userLogin/saveUserInfoByWxCode',            /// 获取用户信息
  GetNearlyPark: http.serverIp + '/parkInfo/getNearlyPark',                   /// 获取附近车场
  GetNoParkFee: http.serverIp + '/parkInfo/getNoParkFee',                     /// 获取未停车缴费
  GetParkFee: http.serverIp + '/parkInfo/getParkFee',                         /// 获取在场停车缴费
  GetTemParkFee: http.serverIp + '/parkInfo/getTemParkFee',                   /// 获取临停在场车辆缴费
  GetBindCar: http.serverIp + '/parkInfo/getBindCar',                         /// 获取绑定车辆
  AddBindCar: http.serverIp + '/parkInfo/addBindCar',                         /// 绑定车辆
  CancelBindCar: http.serverIp + '/parkInfo/cancelBindCar',                   /// 删除绑定车辆
  GetOrderRecord: http.serverIp + '/parkInfo/getOrderRecord',                 /// 获取订单记录
  GetOrderDetail: http.serverIp + '/parkInfo/getOrderDetail',                 /// 订单详情
  InAndOutByPage: http.serverIp + '/parkInfo/getRecCardInAndOutByPage',       /// 停车进出记录信息      
  OrderPay: http.serverIp + '/parkInfo/orderPay',                             /// 根据进出记录id生成订单
  GetOrderRecordById: http.serverIp + '/parkInfo/getOrderRecordById',         /// 根据进出记录id查询订单信息
  AddParkOrder: http.serverIp + '/parkInfo/addParkOrder',                     /// 生成在场车辆订单
  WayPay: ip + '/payment-api/wxPay/miniOrder',                                /// 小程序微信支付
  GetInvoiceOrder: http.serverIp + '/bill/getInvoiceOrder',                   /// 获取未开发票的用户订单
  InvoiceIssuance: http.serverIp + '/bill/InvoiceIssuance',                   /// 开具发票
  GetUnInvoiceHis: http.serverIp + '/bill/getUnInvoiceHis',                   /// 开票历史 
  QueryAccountBalance: http.serverIp + '/accountBalance/queryAccountBalance', /// 获取小程序余额
  UpdateBalance: http.serverIp + '/accountBalance/updateBalance',             /// 钱包充值
  GetLongrentInfo: http.serverIp + '/DLApp/getLongrentInfo',                  /// 查询长租信息
}

module.exports = {
  ip,
  wxpay,
  http,
  httpApi,
  payKey 
}