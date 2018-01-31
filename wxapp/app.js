//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
    userInfo: null,
    content: [
      {
        id: 1,
        date: new Date(2018, 1, 1),
        article: [
          {
            logoUrl: "../../assets/icon/demo.png",
            imgUrl: "../../assets/articlepicture/1.png",
            headLine: "中山大学团委XX活动",
            mark: ["business", "price", "sport", "food", "chance"],
            briefIntroduction: "1758"
          }
        ]
      },
      {
        id: 2,
        date: new Date(2018, 1, 2),
        article: [
          {
            logoUrl: "../../assets/icon/demo.png",
            imgUrl: "../../assets/articlepicture/2.png",
            headLine: "中山大学团委XX活动",
            mark: ["business", "price", "sport", "food", "chance"],
            briefIntroduction: "2758凑字数凑字数"
          },
        ]
      },
      {
        id: 3,
        date: new Date(2018, 1, 3),
        article: [
          {
            logoUrl: "../../assets/icon/demo.png",
            imgUrl: "../../assets/articlepicture/3.png",
            headLine: "中山大学团委XX活动",
            mark: ["business", "price", "sport", "food", "chance"],
            briefIntroduction: "3758凑字数凑字数凑字数"
          },
        ]
      },
      {
        id: 4,
        date: new Date(2018, 1, 4),
        article: [
          {
            logoUrl: "../../assets/icon/demo.png",
            imgUrl: "../../assets/articlepicture/4.png",
            headLine: "中山大学团委XX活动",
            mark: ["business", "price", "sport", "food", "chance"],
            briefIntroduction: "4758凑字数凑字数凑字数凑字数"
          },
        ]
      }
    ]
  }
})