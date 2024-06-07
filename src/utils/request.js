import axios from 'axios';
import { getToken, isUrl } from './common';
import { ElMessage } from 'element-plus'

// import useUserStore from '@/stores/modules/user';


class Request {
    constructor() {
        this.instance = axios.create({
            // baseURL: process.env.VUE_APP_BASE_URL.substr(-1) == '/' ? process.env.VUE_APP_BASE_URL : `${process.env.VUE_APP_BASE_URL}/`,
            timeout: 0,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // 全局请求拦截器
        this.instance.interceptors.request.use(
          (config) => {
              // 携带token site-id
              console.log( getToken() );
              if (getToken()) {
                  config.headers["Authorization"] = getToken();

              }
              return config;
          },
          (err) => {
              return Promise.reject(err);
          }
        );

        // 全局响应拦截器
        this.instance.interceptors.response.use(
          (response) => {
              if (response.request.responseType != 'blob') {
                  const res = response.data;
                  // if (res.code != 1) {
                  if (res.code != 1) {
                      this.handleAuthError(res.code);
                      if (res.code != 401 && response.config.showErrorMessage !== false) {
                          this.showMessage({ message: res.msg, type: 'error', dangerouslyUseHTMLString: true, duration: 5000 });
                      }
                      return Promise.reject(new Error(res.msg || 'Error'));
                  } else {
                      if (response.config.showSuccessMessage) ElMessage({ message: res.msg, type: 'success' });
                      return res;
                  }
              }
              return response.data;
          },
          (err) => {
              this.handleNetworkError(err);
              return Promise.reject(err);
          }
        );
    }

    // 发送get请求
    get(url, config) {
        return this.instance.get(url, config);
    }

    // 发送post请求
    post(url, data, config) {
        return this.instance.post(url, data, config);
    }

    // 发送put请求
    put(url, data, config) {
        return this.instance.put(url, data, config);
    }

    // 发送delete请求
    delete(url, config) {
        return this.instance.delete(url, config);
    }

    // 处理网络请求错误
    handleNetworkError(err) {
        let errMessage = '';

        if (err.response && err.response.status) {
            const errStatus = err.response.status;
            switch (errStatus) {
                case 400:
                    errMessage = '请求错误(400)';
                    break;
                case 401:
                    errMessage = '未授权，请重新登录(401)';
                    break;
                case 403:
                    errMessage = '拒绝访问(403)';
                    break;
                case 404:
                    const baseURL = isUrl(err.response.config.baseURL) ? err.response.config.baseURL : `${location.origin}${err.response.config.baseURL}`;
                    errMessage = `${baseURL} 请求地址出错(404)`;
                    break;
                case 405:
                    errMessage = '请求方法未允许(405)';
                    break;
                case 408:
                    errMessage = '请求超时(408)';
                    break;
                case 409:
                    errMessage = '冲突(409)';
                    break;
                case 500:
                    errMessage = '服务器错误(500)';
                    break;
                case 501:
                    errMessage = '服务未实现(501)';
                    break;
                case 502:
                    errMessage = '网络错误(502)';
                    break;
                case 503:
                    errMessage = '服务不可用(503)';
                    break;
                case 504:
                    errMessage = '网络超时(504)';
                    break;
                case 505:
                    errMessage = 'HTTP版本不受支持(505)';
                    break;
                default:
                    errMessage = `连接出错(${errStatus})!`;
            }
        } else {
            if (err.message.includes('timeout')) {
                errMessage = '请求超时!';
            }
            if (err.code === 'ERR_NETWORK') {
                const baseURL = isUrl(err.config.baseURL) ? err.config.baseURL : `${location.origin}${err.config.baseURL}`;
                errMessage = `${baseURL} 网络异常!`;
            }
        }

        if (errMessage) {
            this.showMessage({ dangerouslyUseHTMLString: true, duration: 5000, message: errMessage, type: 'error' });
        }
    }

    handleAuthError(code) {
        switch (code) {
            case 401:
                // useUserStore().logout();
                break;
            default:
                break;
        }
    }

    messageCache = new Map();

    showMessage(options) {
        const cacheKey = options.message;
        const cachedMessage = this.messageCache.get(cacheKey);

        if (!cachedMessage || Date.now() - cachedMessage.timestamp > 5000) { // 5秒内重复内容不再弹出，可自定义过期时间
            this.messageCache.set(cacheKey, { timestamp: Date.now() });
            ElMessage(options);
        }
    }
}

export default new Request();
