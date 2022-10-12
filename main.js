var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var axios = require('axios');
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns cookies
 */
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.request({
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
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data.e === 0) {
                        console.log('登陆成功！');
                        return [2 /*return*/, response.headers['set-cookie'] || []];
                    }
                    throw new Error('登陆失败，服务器响应信息：' + response.data.m);
            }
        });
    });
}
/**
 * 提交晨午晚信息
 * @param cookies 登陆后获得的 cookie
 * @param chenWuWanData 晨午晚信息
 * @returns 服务器返回信息
 */
function commitData(cookies, chenWuWanData) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.request({
                        url: 'https://xxcapp.xidian.edu.cn/xisuncov/wap/open-report/save',
                        method: 'POST',
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 wxwork/2.7.2 MicroMessenger/6.3.22 Language/zh',
                            'cookie': cookies
                        },
                        data: chenWuWanData
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data.e === 0) {
                        console.log('提交请求发送成功！');
                        return [2 /*return*/, response.data.m];
                    }
                    throw new Error('提交失败，服务器响应信息：' + response.data.m);
            }
        });
    });
}
/**
 * 获取当前时间处于睡/晨/午/晚中的哪一个
 * @param timezone 用户所在时区
 * @returns 睡/晨/午/晚
 */
function getHourMessage(timezone) {
    var localDate = new Date();
    var offsetUTC = localDate.getTimezoneOffset();
    var targetDate = new Date(localDate.getTime() + offsetUTC * 60 * 1000 + timezone * 3600 * 1000);
    var hours = targetDate.getHours();
    return '睡晨午晚'[Math.floor(hours / 6)];
}
/**
 *
 * @param sendKey
 * @param title
 * @param short
 * @param content
 * @param channel
 */
function sendWechatMessage(sendKey, title, content, channel) {
    if (channel === void 0) { channel = 9; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.request({
                        url: "https://sctapi.ftqq.com/".concat(sendKey, ".send"),
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
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var timezone = 8;
var xduChenWuWanData = {
    'area': '陕西省 西安市 长安区',
    'city': '西安市',
    'province': '陕西省',
    'address': '陕西省西安市长安区兴隆街道梧桐大道西安电子科技大学长安校区',
    'geo_api_info': '{"type":"complete","position":{"Q":34.129092068143,"R":108.83138888888902,"lng":108.831389,"lat":34.129092},"location_type":"html5","message":"Get geolocation success.Convert Success.Get address success.","accuracy":65,"isConverted":true,"status":1,"addressComponent":{"citycode":"029","adcode":"610116","businessAreas":[],"neighborhoodType":"","neighborhood":"","building":"","buildingType":"","street":"雷甘路","streetNumber":"266#","country":"中国","province":"陕西省","city":"西安市","district":"长安区","township":"兴隆街道"},"formattedAddress":"陕西省西安市长安区兴隆街道梧桐大道西安电子科技大学长安校区","roads":[],"crosses":[],"pois":[],"info":"SUCCESS"}',
    'sfzx': '1',
    'tw': '1',
    'sfcyglq': '0',
    'sfyzz': '0',
    'ymtys': '0',
    'qtqk': '' // 其他情况
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var username, password, sendKey, message, postStatus, cookies, e_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = process.env.CHECKUP_USERNAME;
                password = process.env.CHECKUP_PASSWORD;
                sendKey = process.env.CHECKUP_SENDKEY;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, login(username, password)];
            case 2:
                cookies = _a.sent();
                return [4 /*yield*/, commitData(cookies, xduChenWuWanData)];
            case 3:
                message = _a.sent();
                postStatus = '成功';
                console.log('晨午晚检信息上报成功');
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                // 上报失败
                message = e_1.message;
                postStatus = '失败';
                console.log('晨午晚检信息上报失败');
                return [3 /*break*/, 5];
            case 5:
                if (!sendKey) {
                    console.log('未配置 sendKey，无法发送微信消息');
                    return [2 /*return*/];
                }
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                // 发送微信消息
                return [4 /*yield*/, sendWechatMessage(sendKey, getHourMessage(timezone) + '检信息上报' + postStatus, message)];
            case 7:
                // 发送微信消息
                _a.sent();
                console.log('微信消息发送成功');
                return [3 /*break*/, 9];
            case 8:
                e_2 = _a.sent();
                console.log('微信消息发送失败');
                console.error(e_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); })();
