// 注意：每次调用$.get() 或 $.post() 或 $.ajax() 时，
// 会先调用这个 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    // options.url = 'http://www.liulongbin.top:3007' + options.url;
    options.url = 'http://127.0.0.1:3007' + options.url;
    // console.log(options.url)

    // 同一为有权限的接口，设置headers请求头
    // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调函数');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据。
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空localStorge中的token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})