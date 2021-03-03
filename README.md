# 南京信息工程大学 wifi登录 前端

在**浏览器没有 cors 限制**的情况下，该前端可由浏览器直接正常运行，且可以安装为 pwa。（目前暂时禁用了sw.js以开发）  
遗憾的是，绝大多数浏览器都有 cors 限制，因此并不能直接运行，因此，该前端还被我用  
* Electron  
* Android WebView  

进行包装，分别为电脑端和手机端服务。

## 下载 / download

```bash
git clone https://github.com/lixiang810/nuist-wifi-login-frontend/
cd nuist-wifi-frontend
npm i
```

## 构建 / build

```bash
npm run build
```

## 开发 / develop
```bash
npm start
```
