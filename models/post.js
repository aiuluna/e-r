// var HOST = (process.env.NODE_ENV == 'production' ? require('../models/baseOut.js') : require('../models/base.js'));
var url = require('url');
var HOST = require('../config/download/56ctms-www.js');
var HOSTgate = HOST.HOSTgate;
var HOSTgate2 = HOST.HOSTgate2;
var dingPOst = HOST.dingPOst;
var fetch = require('superfetch');
var spidex = require("spidex");
var mesNum = 0;
setInterval(function () {
    mesNum = 0;
},86400)

function getBrowserName(u){
    // var u = req.headers['user-agent'];
    var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var weixin = u.indexOf('MicroMessenger') > -1;
    var qq = u.match(/\sQQ/i) == " qq";

    var browserName = ios ? 'IOS' : (android ? '安卓': (weixin ? '微信' : (qq ? 'QQ' : '')) );
    return browserName;
}

exports.userSubmit = function (req,callback) {//提交
    var body = req.body;
    var browserName = 'PC';
    if(body.mobile){
        browserName = getBrowserName(req.headers['user-agent']);
    }
    var urls = req.headers.referer;
    var dingTag, dingOptions;
    if(urls.indexOf('hmsr') > -1){
        var q = url.parse(urls, true).query;
        dingTag = 'hmsr-'+ (q.hmsr || '') + ', hmpl-' + (q.hmpl || '') + ', hmcu-' + (q.hmcu || '') + ', hmkw-' + (q.hmkw || '') + ', hmci-' + (q.hmci || '');
    }

    if(dingTag == undefined){
        dingOptions = {
            msgtype:'markdown',
            "markdown":{
                "title": "3TMS "+browserName+"预约",
                "text": "3TMS "+browserName+"预约\n"+
                        "## 姓名:"+ body.name+"\n"+
                        "## 电话:"+ body.phone+"\n"+
                        "## 公司名称:"+ body.companyName+"\n"+
                        "## 来源:"+ body.from+"\n"
            }
        };
    }else {
        dingOptions = {
            msgtype:'markdown',
            "markdown":{
                "title": "3TMS "+browserName+"预约",
                "text": "3TMS "+browserName+"预约\n"+
                        "## 姓名:"+ body.name+"\n"+
                        "## 电话:"+ body.phone+"\n"+
                        "## 公司名称:"+ body.companyName+"\n"+
                        "## 来源:"+ body.from+"\n"+
                        "## tag:"+ dingTag+"\n"
            }
        };
    }

    fetch.defaults({encoding: 'utf8'}).post(dingPOst, dingOptions).then(function (body) {
        var data = {
            status:200,
            message:null,
            body:null
        }
        callback(null,data);
    }).catch(function (res) {
        var data = {
            status:500,
            message:'接口异常',
            body:null
        }
        callback(null,data);
    })
}
