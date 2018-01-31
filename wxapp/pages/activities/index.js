const app = getApp()

Page({

  data:{
    userInfo:{},
    indicatorDots: true,
    interval: 3000,
    duration: 500,
    imgUrl: [
      "../../assets/slidepicture/1.jpg",
      "../../assets/slidepicture/2.jpg",
      "../../assets/slidepicture/3.jpg"
    ],
    location: {
      latitude: 0,
      longitude: 0,
      address: "中山大学"
    },
    locationIconUrl: "../../assets/icon/location.png",
    searchKey: "",
    content: app.globalData.content
  },
  onLoad: function() {
    this.getLocation();
  },

  getLocation: function() {
    var that = this
    var locationString = ""
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          'location.latitude': res.latitude,
          'location.longitude': res.longitude
        })
        locationString = res.latitude + "," + res.longitude
        that.requestAddress(locationString)
      }
    })
  },
  requestAddress: function(str) {
    var that = this
    wx.request({
      url: "https://apis.map.qq.com/ws/geocoder/v1/",
      data: {
        "key": "6UVBZ-LUKLU-3ZRV7-BUDEO-SZJCZ-CQBN4",
        "location": str
      },
      methon: "GET",
      success: function(res) {
        that.setData({
          'location.address': res.data.result.address
        })
        if (that.data.location.address.length > 4) {
          that.setData({
            'location.address': that.data.location.address.substr(0, 4) + "..."
          })
        }
        console.log("请求地址为：" + res.data.result.address)
      },
    })
  },
  getSearchInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  }

})

// wxcf38b0daff83a060