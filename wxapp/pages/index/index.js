Page({
  data:{
    userInfo: {}
  },
  onLoad: function() {
    var that = this
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          userInfo: res.userInfo
        })
        console.log("success")
      }
    })
  },

  entry: function() {
    wx.switchTab({
      url:"../activities/index"
    })
  }
})