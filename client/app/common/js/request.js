/**
 * Created by huzhang on 2017/11/29.
 */

/**
 * fetch api
 * https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch
 */
import 'whatwg-fetch'
import qs from 'query-string';

const fn = function () {
}

export default class Request {
  constructor(options = {}) {
    this.conf = {
      method: 'GET',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      credentials: 'include',  //默认允许发送cookie
      mode: 'cors',
      timeout: options.timeout || 30000,
      prefix: location.hostname + ":" + location.port,
      complete: () => {
      },
      ...options
    }
  }

  get(url, data, success = fn, error = fn, complete = fn) {
    if (typeof url === 'object') {
      return this.send({
        ...url,
        method: 'GET'
      })
    }
    if (typeof data === 'function') {
      return this.get(url, null, data, success, error)
    }
    return this.send({
      method: 'GET',
      url,
      data,
      success,
      error,
      complete
    })
  }

  post(url, data, success = fn, error = fn, complete = fn) {
    if (typeof url === 'object') {
      return this.send({
        ...url,
        data: JSON.stringify(url.data),
        method: 'POST'
      })
    }
    if (typeof data === 'function') {
      return this.post(url, null, data, success, error)
    }
    return this.send({
      method: 'POST',
      url,
      data: JSON.stringify(data),
      success,
      error,
      complete
    })
  }

   send(_options) {
    //合并options
    const options = {
      ...this.conf,
      ...(_options || {})
    }

    //合并headers
    options.headers = {
      ...options.headers,
      ...(_options.headers || {})
    }

    options.method = options.method.toLowerCase()

    // 重新组织 URL
    rewriteUrl(options)

    options.body = options.data;
    delete options.data;

    let oldFetch = fetch;

    return new Promise(async (resolve, reject) => {
      let timeoutId = setTimeout(()=> {
        reject(new Error("fetch timeout"))
      }, options.timeout)

      await oldFetch(options.url, options)
        .then(res=> {
          "use strict";
          clearTimeout(timeoutId)
          // options.success(res)
          resolve(res.json())
        }, err=> {
          "use strict";
          clearTimeout(timeoutId)
          // options.error(err)
          reject(err)
        })

      options.complete()
    })

  }

}

/*
 * 重写URL地址
 */
function rewriteUrl(options){
  const {url} = options;
  // 将相对地址与域名拼接组装绝对地址
  if(!/^(?:https?:)?\/\//i.test(url)){
    options.url = '\/\/' + (`${options.prefix}/${url}`.replace(/\/{2,}/g, '/'));
  }
  // 合并原始URL与参数组装新URL
  if(options.method === 'get' && options.data){
    const [url, search] = options.url.split('?');
    const query = {
      ...qs.parse(search),
      ...options.data
    };
    options.url = `${url}?${qs.stringify(query)}`;
  }
}




