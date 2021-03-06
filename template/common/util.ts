/* eslint-disable */
// @ts-ignore
import Taro from "@tarojs/taro";
// @ts-ignore
import WxRequest from "wx-extend/src/assets/plugins/wx-request/lib/index";
import { WithPathOpts } from "./Opts.d";

const instance = new WxRequest({
  header: {
    "Content-type": "application/json",
    Authorization: Taro.getStorageSync("token"),
  },
});

type Conf = any;

function createAPI(baseURL?: string) {
  return function(conf: Conf) {
    conf = conf || {};
    return instance.request(
      Object.assign(
        {},
        {
          url: conf.url,
          baseURL: baseURL,
          method: conf.method,
        },
        conf.opts
      )
    );
  };
}

function convertRESTAPI(url: string, opts: WithPathOpts): string {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach(key => {
    const r = new RegExp("(:" + key + "|{" + key + "})", "g");
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

interface InterceptorHandler<V> {
  (value: V): V | Promise<V>;
}

interface InterceptorErrorHandler {
  (error: any): any;
}

// 请求拦截器
function useRequestInterceptor(
  beforeRequestHandler?: InterceptorHandler<any>, // 请求拦截
  requestError?: InterceptorHandler<any>, // 请求错误
  response?: InterceptorHandler<any>, // 响应拦截
  errorHandler?: InterceptorErrorHandler // 响应失败
): number {
  return instance.interceptors.use({
    request: beforeRequestHandler,
    requestError: requestError,
    response: response,
    responseError: errorHandler,
  });
}

// 相应拦截器
// function useResponseInterceptor(
//   successHandler?: InterceptorHandler<any>,
//   errorHandler?: InterceptorErrorHandler
// ): number {
//   return instance.interceptors.use(successHandler, errorHandler);
// }

// // 移除请求拦截器
// function ejectRequestInterceptor(interceptorId: number) {
//   instance.interceptors.request.eject(interceptorId);
// }

// // 移除响应拦截器
// function ejectResponseInterceptor(interceptorId: number) {
//   instance.interceptors.response.eject(interceptorId);
// }

export {
  createAPI,
  convertRESTAPI,
  useRequestInterceptor,
  //  useResponseInterceptor,
  //  ejectRequestInterceptor,
  //  ejectResponseInterceptor,
};
