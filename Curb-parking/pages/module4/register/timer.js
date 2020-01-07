var length = 60;

function countdown(that, interval) {
  var seconds = that.data.seconds;
  var captchaLabel = that.data.captchaLabel;
  if (seconds <= 1  ) {
   
    clearInterval(interval);
   
   
    captchaLabel = '获取验证码';
    seconds = length;
    that.setData({
      captchaDisabled: false
    });
  } else {
    captchaLabel = --seconds + '秒后重新发送'
  }
  that.setData({
    seconds: seconds,
    captchaLabel: captchaLabel
  });
}

module.exports = {
  countdown: countdown,
  length: length
}
