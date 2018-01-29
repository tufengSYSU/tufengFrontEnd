
Page({

  data:{
    userInfo:{},
    indicatorDots: true,
    interval: 1500,
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
        locationString = that.data.location.latitude + "," + that.data.location.longitude
        wx.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/",
          data: {
            "key": "6UVBZ-LUKLU-3ZRV7-BUDEO-SZJCZ-CQBN4",
            "location": locationString
          },
          methon: "GET",
          success: function(res) {
            that.setData({
              'location.address': res.data.result.address
            })
            console.log("请求成功")
            console.log("请求地址为：" + res.data.result.address)
          },
          fail: function(res) {
            console.log("定位失败")
          }
        })
      }
    })


  },
  getSearchInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  }

})