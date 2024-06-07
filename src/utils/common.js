import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {  useTitle } from '@vueuse/core';

// import storage from './storage';

/**
 * 全局注册element-icon
 * @param app
 */
export function useElementIcon(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}



/**
 * 获取当前访问应用类型
 */
export function getAppType() {
  const path = location.pathname.split('/').filter((val) => { return val; });

  if (!path.length) {
    return 'admin';
  } else {
    return path[0];
  }
}

/**
 * 设置网站 title
 * @param value
 */
export function setWindowTitle(value = '') {
  const title = useTitle();
  title.value = value ? value : process.env.VUE_APP_DEFAULT_TITLE;
}

/**
 * 获取token
 * @returns
 */
export function getToken() {

    try {
      const json = window.localStorage.getItem(`AuthAdminStore`);

      return "Bearer "+ JSON.parse(json).userInfo.token;
    } catch (error) {
      return window.localStorage.getItem(`${this.prefix}.${key}`);
    }

}

/**
 * 设置token
 * @param token
 * @returns
 */
export function setToken(token) {
  try {
    window.localStorage.setItem(`${this.prefix}.${param.key}`, JSON.stringify(param.data));
    typeof param.success === 'function' && param.success();
  } catch (error) {
    typeof param.fail === 'function' && param.fail(error);
  }
}

/**
 * 移除token
 * @returns
 */
export function removeToken() {
  if (typeof key === 'string') {
    window.localStorage.removeItem(`${this.prefix}.${key}`);
  } else {
    key.forEach(item => {
      window.localStorage.removeItem(`${this.prefix}.${item}`);
    });
  }
}

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

/**
 * 判断是否是url
 * @param str
 * @returns
 */
export function isUrl(str) {
  return str.indexOf('http://') != -1 || str.indexOf('https://') != -1;
}

/**
 * 图片输出
 * @param path
 * @returns
 */
export function img(path) {
  return isUrl(path) ? path : `${process.env.VUE_APP_IMG_DOMAIN || location.origin}/${path}`;
}


/**
 * 获取字符串字节长度
 * @param str
 * @returns
 */
export function strByteLength(str = '') {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

/**
 * url 转 route
 * @param url
 */
export function urlToRouteRaw(url) {
  const query = {};
  const [path, param] = url.split('?');

  param && param.split('&').forEach((str) => {
    let [name, value] = str.split('=');
    query[name] = value;
  });

  return { path, query };
}

const isArray = (value) => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
};

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj;
  }
  const o = isArray(obj) ? [] : {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

/**
 * 生成唯一字符
 * @param {Number} len
 * @param {Boolean} firstU
 * @param {Nubmer} radix
 */
export function guid(len = 10, firstU = true, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return `u${uuid.join('')}`;
  }
  return uuid.join('');
}

/**
 * 金额格式化
 */
export function moneyFormat(money) {
  return isNaN(parseFloat(money)) ? money : parseFloat(money).toFixed(2);
}

/**
 * 时间戳转日期格式
 * @param {Object} timeStamp
 */
export function timeStampTurnTime(timeStamp, type = '') {
  if (timeStamp != undefined && timeStamp != '' && timeStamp > 0) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (type) {
      if (type == 'yearMonthDay') {
        return y + '年' + m + '月' + d + '日';
      }
      return y + '-' + m + '-' + d;
    } else {
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
  } else {
    return '';
  }
}

/**
 * 过滤小数点
 * @param event
 */
export function filterDigit(event) {
  event.target.value = event.target.value.replace(/[^\d\.]/g, '');
  event.target.value = event.target.value.replace(/^\./g, '');
  event.target.value = event.target.value.replace(/\.{2,}/g, '.');
  event.target.value = event.target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
}

/**
 * 过滤整数
 * @param event
 */
export function filterNumber(event) {
  event.target.value = event.target.value.replace(/[^\d]/g, '');
}

/**
 * 过滤特殊字符
 * @param event
 */
export function filterSpecial(event) {
  event.target.value = event.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
  event.target.value = event.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
}
