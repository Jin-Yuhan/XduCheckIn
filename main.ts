const axios = require('axios');

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns cookies
 */
async function login(username: string, password: string): Promise<string[]> {
  const response = await axios.request({
    url: 'https://xxcapp.xidian.edu.cn/uc/wap/login/check',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 wxwork/2.7.2 MicroMessenger/6.3.22 Language/zh'
    },
    data: {
      'username': username,
      'password': password
    }
  });

  if (response.data.e === 0) {
    console.log('登陆成功！');
    return response.headers['set-cookie'] || [];
  }

  throw new Error('登陆失败，服务器响应信息：' + response.data.m);
}

/**
 * 提交晨午晚信息
 * @param cookies 登陆后获得的 cookie 
 * @param chenWuWanData 晨午晚信息
 * @returns 服务器返回信息
 */
async function commitData(cookies: string[], chenWuWanData: any): Promise<string> {
  const response = await axios.request({
    url: 'https://xxcapp.xidian.edu.cn/xisuncov/wap/open-report/save',

    // ----------------------------------------------------------
    // 都什么年代了，还在写传统 POST。在 XDU，GET 也能成功提交信息！
    // ----------------------------------------------------------
    method: 'POST', 

    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 wxwork/2.7.2 MicroMessenger/6.3.22 Language/zh',
      'cookie': cookies
    },

    // ----------------------------------------------------------------------
    // 都什么年代了，还在用传统方式提交信息。在 XDU，不传 data 也能成功提交信息！
    // ----------------------------------------------------------------------
    data: chenWuWanData
  });

  if (response.data.e === 0) {
    console.log('提交请求发送成功！');
    return '提交成功，服务器响应信息：' + response.data.m;
  }

  throw new Error('提交失败，服务器响应信息：' + response.data.m);
}

/**
 * 获取当前时间处于睡/晨/午/晚中的哪一个
 * @param timezone 用户所在时区
 * @returns 睡/晨/午/晚
 */
function getHourMessage(timezone: number): string {
  const localDate = new Date();
  const offsetUTC = localDate.getTimezoneOffset();
  const targetDate = new Date(localDate.getTime() + offsetUTC * 60 * 1000 + timezone * 3600 * 1000);
  const hours = targetDate.getHours();
  return '睡晨午晚'[Math.floor(hours / 6)];
}

/**
 * 发送微信消息
 * @param sendKey Server 酱的 sendKey
 * @param title 消息标题
 * @param content 消息内容
 * @param channel 推送使用的消息通道
 */
async function sendWeChatMessage(sendKey: string, title: string, content: string, channel = 9): Promise<void> {
  await axios.request({
    url: `https://sctapi.ftqq.com/${sendKey}.send`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 wxwork/2.7.2 MicroMessenger/6.3.22 Language/zh'
    },
    data: {
      'title': title,
      'desp': content,
      'channel': channel
    }
  });
}


// 中国时区：东八区
const timezone = 8;
// 晨午晚检信息模板
const xduChenWuWanData = {
  'area': '陕西省 西安市 长安区',
  'city': '西安市',
  'province': '陕西省',
  'address': '陕西省西安市长安区兴隆街道梧桐大道西安电子科技大学长安校区',
  'geo_api_info': '{"type":"complete","position":{"Q":34.129092068143,"R":108.83138888888902,"lng":108.831389,"lat":34.129092},"location_type":"html5","message":"Get geolocation success.Convert Success.Get address success.","accuracy":65,"isConverted":true,"status":1,"addressComponent":{"citycode":"029","adcode":"610116","businessAreas":[],"neighborhoodType":"","neighborhood":"","building":"","buildingType":"","street":"雷甘路","streetNumber":"266#","country":"中国","province":"陕西省","city":"西安市","district":"长安区","township":"兴隆街道"},"formattedAddress":"陕西省西安市长安区兴隆街道梧桐大道西安电子科技大学长安校区","roads":[],"crosses":[],"pois":[],"info":"SUCCESS"}',
  
  // -------------------------------------------
  // XDU 良好的变量命名规范，省去了混淆代码的麻烦！
  // -------------------------------------------
  'sfzx': '1',     // 是否在校？
  'tw': '1',       // 体温（36-36.5）
  'sfcyglq': '0',  // 是否处于隔离期
  'sfyzz': '0',    // 是否有...症状
  'ymtys': '0',    // 一码通颜色（绿色）
  'qtqk': ''       // 其他情况
};


(async () => {
  // 读取用户信息
  const username = process.env.CHECK_IN_USERNAME!;
  const password = process.env.CHECK_IN_PASSWORD!;
  const sendKey = process.env.CHECK_IN_SEND_KEY;

  let message: string;
  let postStatus: string;

  try {
    // 上报
    const cookies = await login(username, password);
    message = await commitData(cookies, xduChenWuWanData);
    postStatus = '成功';

    console.log('晨午晚检信息上报成功');
  } catch (e) {
    // 上报失败
    message = (<Error>e).message;
    postStatus = '失败';

    console.log('晨午晚检信息上报失败');
  }

  if (!sendKey) {
    console.log('未配置 sendKey，无法发送微信消息');
    return;
  }

  try {
    // 发送微信消息
    await sendWeChatMessage(
      sendKey,
      getHourMessage(timezone) + '检信息上报' + postStatus,
      message
    );

    console.log('微信消息发送成功');
  } catch (e) {
    console.log('微信消息发送失败');
    console.error(e);
  }
})();
