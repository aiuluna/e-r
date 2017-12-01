var posts = require('../models/post.js');
var file = require('../models/file.js');
var url = require("url");


exports.postUser = function (req, res) {//提交信息
  var d = {
    status: 500
  };
  if (!req.body.name) {
    d.message = '姓名不能为空'
    res.json(d);
  } else if (!req.body.phone) {
    d.message = '手机号码不能为空'
    res.json(d);
  } else if (!file.checkMobile(req.body.phone)) {
    d.message = '请输入正确的手机号码'
    res.json(d);
  }
  /*else if(!req.body.companyName){
      d.message = '公司名称不能为空'
      res.json(d);
  }*/
  else {
    if(req.session.userpost != undefined){
      d.message = '1分钟内只可提交一次预约'
      res.json(d)
    }else {
      req.setTimeout(6000,function(){
        res.abort()
      });
      posts.userSubmit(req, function (err, data) {
        if (err) {
          d.message = '接口异常'
          res.json(d);
        } else {
          req.session.userpost = 'no'
          res.json(data);
        }
      })
    }
  }
}

