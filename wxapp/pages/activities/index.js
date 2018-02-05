const app = getApp()
const Sticky = require('../../utils/sticky.min.js')

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
    content: app.globalData.content,
    changeOpacity: "opacity:0.5",
    visited: [],
    switchFlag: true,
    background: [
      "red-background",
      "blue-background",
      "yellow-background",
      "green-background"
    ],
    currentTab: 0,
    indexSeq: []
  },
  onLoad: function() {
    this.getLocation();
    var n = Math.round(this.data.content.length/2)
    var seq = Array.from(new Array(n),(val,index)=>index)
    this.setData({
      indexSeq: seq
    })
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
        console.log("请求地址为：" + res.data.result.address)
      },
    })
  },
  getSearchInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  makeVisited: function(e) {
    var row = e.currentTarget.dataset.row
    console.log(e)
    console.log(row)
    this.data.visited[row] = 1
    this.setData({
      visited: this.data.visited
    })
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  }
})

// wxcf38b0daff83a060
