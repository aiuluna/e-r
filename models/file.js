var _ = require('underscore');
var crypto = require('crypto');

var defalutData = {
    verson:'1.0.1'
}
exports.setData = function (o) {//合并对象
    return _.extend(o,defalutData);
};
exports.changeTime=function (t,nohour) {//时间戳换成时间
    if (String(t).indexOf("-") >= 0 || t == null) {
        return t='';
    } else {
        var date = new Date(t);
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() <10 ? '0' + date.getDate() +' ' : date.getDate() + ' ';
        if (date.getHours() < 10) {
            h = '0' + date.getHours() + ':';
        } else {
            h = date.getHours() + ':';
        }
        if (date.getMinutes() < 10) {
            m = '0' + date.getMinutes() + ':';
        } else {
            m = date.getMinutes() + ':';
        }
        if (date.getSeconds() < 10) {
            s = '0' + date.getSeconds();
        } else {
            s = date.getSeconds();
        }
        if(nohour) {
            return Y + M + D;
        }else {
            return Y + M + D + h + m + s;
        }
    }
};
exports.checkMobile = function (text) {
    var myreg = /^(1+\d{10})$/;
    return !myreg.test(text) ? false : true;
}
exports.md5=function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};