//const base64 = require('base64')
//const md5 = require('md5')

const base64 = require('./utils/base64.min.js').Base64
console.log(base64)

//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        var that = this

        wx.showToast({
                title: '爱你',
                icon: 'loading', // loading
                duration: 10000,
                mask: true
            })
            // 登录态维护  
        wx.checkSession({
                success: function(res) {
                    console.log(res)
                }
            })
            // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    // 获取 OPenID，HACK：这个请求本应该在后端完成，为了信息安全，但是先这样做啦
                    wx.request({
                        url: that.globalData.apiPrefix + "/openid?code=" + res.code,
                        success: function(res) {
                            if (res.data) {
                                var data = JSON.parse(res.data.data)
                                that.globalData.userInfo.openid = data.openid
                                    // console.log("=> userInfo:");
                                    // console.log(that.globalData.userInfo)
                            } else {
                                console.log('获取OpenID失败！' + res.errMsg)
                            }
                            that.getToken();
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    getUserInfo: function() {
        var that = this;
        wx.getUserInfo({
            success: res => {
                // 可以将 res 发送给后台解码出 unionId
                if (typeof(that.globalData.userInfo) === "object")
                    that.globalData.userInfo = Object.assign(that.globalData.userInfo, res.userInfo)
                else {
                    that.globalData.userInfo = res.userInfo
                }
                console.log("userInfo")
                console.log(that.globalData.userInfo)
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                }
            }
        })
    },
    getToken: function() {
        let userInfo = this.globalData.userInfo
        console.log("Get Token: ")
        console.log(userInfo.openid)
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/auth',
            data: {
                openid: userInfo.openid,
                password: "PASSWORD",
                type: 1
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                if (res.data.status === "OK") {
                    let token = res.data.data.token
                    let obj = JSON.parse(base64.atob(token.split('.')[1]))
                    that.globalData.userInfo.aud = obj.aud
                    that.getUser()
                } else {
                    console.log(res)
                }
            },
            fail: function(res) {
                console.log(res)
            },
            complete: function(res) {
                wx.hideToast();
                that.globalData.finishGetToken = true;
            }
        })
    },
    getUser: function() {
        var that = this
        let id = this.globalData.userInfo.aud
        wx.request({
            url: 'https://ancestree.site/api/users/' + id.toString(),
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                let user = res.data.data
                that.globalData.user = user
                console.log(that.globalData.userInfo)
            }
        })
    },
    createUser: function() {
        var userInfo = this.globalData.userInfo
        var that = this
        var user = {
            "id": null,
            "openid": userInfo.openid,
            "phone": null,
            "password": "PASSWORD",
            "username": userInfo.nickName,
            "nickname": userInfo.nickName,
            "email": null,
            "avatar_url": userInfo.avatarUrl,
            "city_id": 1,
            "vip": 0,
            "camera": "",
            "description": null,
            "college": "中山大学",
            "college_district": this.globalData.college_district,
            "enroll_time": null,
            "institute": null,
            "astrology": null,
            "qq": null,
            "background_url": null
        }
        console.log("Create User: ")
        console.log(user)
        wx.request({
            url: 'https://ancestree.site/api/users',
            data: user,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                console.log(res)
                that.globalData.user = res.data.data
                console.log("Regis success: " + that.globalData.user)
            }
        })
    },
    globalData: {
        userInfo: {},
        college_district: "",
        finishGetToken: false,
        finishGetCollege: false,
        apiPrefix: "https://ancestree.site/api",
        activitiesImages: [],
        activitiesWechatUrl: [],
        defaultAvatar: "https://ancestree.site/images/default/defaultAvatar.png",
        defaultBackground: "https://ancestree.site/images/default/defaultBackground.jpg",
        defaultLogo: "https://ancestree.site/images/default/defaultLogo.png",
        tabsBackground: "https://ancestree.site/images/tabs_background.png",
        VANSposter: "https://ancestree.site/images/default/VANSposter.png",
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