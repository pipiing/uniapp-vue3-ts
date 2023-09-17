import { HttpStatus } from './../enums/RespEnum'

// 请求api基地址（服务器IP地址、域名等）
const baseURL = import.meta.env.VITE_APP_BASE_URL

const request = <T>(options: UniApp.RequestOptions) => {
  // 开启网络请求遮罩层
  uni.showLoading({
    title: '数据加载中……',
    mask: true,
  })

  return new Promise<result<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success: (res) => {
        // 401 未登录 => 清除会员token，跳转到登录页
        if (res.statusCode === HttpStatus.UNAUTHORIZED) {
          // useMemberStore().clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else if (res.statusCode !== HttpStatus.SUCCESS) {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as result<T>).msg || '请求错误',
          })
          reject(res)
        } else {
          // 请求成功
          resolve(res.data as result<T>)
        }
      },
      // 响应失败
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
      complete: () => {
        // 关闭网络请求遮罩层
        uni.hideLoading()
      },
    })
  })
}

export const uploadFile = <T>(options: UniApp.UploadFileOption) => {
  return new Promise<result<T>>((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          resolve(data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '获取失败',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

// 请求拦截器
const requestInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时
    options.timeout = 10000
    // 添加小程序请求头标识
    options.header = {
      'Content-Type': 'application/json;charset=utf-8',
      // 将其余请求头解构，重新设置
      ...options.header,
    }
    // 添加 token 请求头标识（根据会员仓库 => 是否登录）
    const isToken = (options.header || {}).isToken === true
    // const token = useMemberStore().profile?.token
    // if (token && isToken) {
    //   // 设置 token
    //   options.header.Authorization = token
    // }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', requestInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', requestInterceptor)

// 导出
export default request
