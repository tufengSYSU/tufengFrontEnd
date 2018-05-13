//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        var that = this

        // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if (res.code) {
                        // 获取 OPenID，HACK：这个请求本应该在后端完成，为了信息安全，但是先这样做啦
                        wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe394906b703e6f6d&secret=4265e01cb21d28e15e54957dc06ceaa2&js_code=' + res.code + '&grant_type=authorization_code',
                            success: function(res) {
                                if (res.data) {
                                    that.globalData.userInfo.openid = res.data.openid
                                    console.log(that.globalData.userInfo);
                                } else {
                                    console.log('获取OpenID失败！' + res.errMsg)
                                }
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: {},
        apiPrefix: "https://ancestree.site/api",
        activitiesImages: [],
        activitiesWechatUrl: [],
        defaultAvatar: "https://ancestree.site/images/default/defaultAvatar.png",
        defaultBackground: "https://ancestree.site/images/default/defaultBackground.jpg",
        defaultLogo: "https://ancestree.site/images/default/defaultLogo.png",
        defaultPhotos: [
            "https://ancestree.site/images/defaultPhotos/1.jpg",
            "https://ancestree.site/images/defaultPhotos/2.jpg",
            "https://ancestree.site/images/defaultPhotos/3.jpg",
            "https://ancestree.site/images/defaultPhotos/4.jpg",
            "https://ancestree.site/images/defaultPhotos/5.jpg",
            "https://ancestree.site/images/defaultPhotos/6.jpg",
            "https://ancestree.site/images/defaultPhotos/7.jpg",
            "https://ancestree.site/images/defaultPhotos/8.jpg",
            "https://ancestree.site/images/defaultPhotos/9.jpg",
            "https://ancestree.site/images/defaultPhotos/10.jpg"
        ]
    }
})