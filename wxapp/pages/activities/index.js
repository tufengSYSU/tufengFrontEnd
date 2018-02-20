/**
 * @file 推送+页面交互逻辑
 * @author bravos
 */


const app = getApp()
const Sticky = require('../../utils/sticky.min.js')

Page({
  data:{
    userInfo:{},
    windowWidth: 0,
    searchKey: "",
    // 轮播图参数
    indicatorDots: true,
    interval: 3000,
    duration: 500,
    // 轮播图片的路径
    imgUrl: [
      "../../assets/slidepicture/1.jpg",
      "../../assets/slidepicture/2.jpg",
      "../../assets/slidepicture/3.jpg"
    ],
    locationIconUrl: "../../assets/icon/location.png",
    searchIconUrl: "../../assets/icon/search.png",
    // 地理位置经度纬度
    location: {
      latitude: 0,
      longitude: 0,
      address: "中山大学"
    },
    // 每篇推送的信息存在此
    content: app.globalData.content,
    mark: [
      "体育",
      "公益时",
      "奖金"
    ],
    briefDescription: [
      "1758",
      "张剑演唱会",
      "定向越野",
      "维纳斯",
      "十大提案"
    ],
    // 每篇推送是否已阅览
    visited: [],
    visitedCss: "visited",
    nullstr: "",
    background: [
      "red-background",
      "blue-background",
      "yellow-background",
      "green-background",
      "grey-background"
    ],
    seq: []
  },
  /**
   * 初始化数据
   */
  onLoad: function() {
    var that = this
    this.getLocation();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth
      })
    }
    })
    console.log(this.data.windowWidth);

    this.setData({
      seq: Array.from(new Array(Math.ceil(this.data.content.length/3)), (val,index)=>index)
    })
  },
  /**
   * 获取当前位置
   */
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
  /**
   * 根据经度纬度获取当前位置的中文描述
   * @param {string} str 包含经度 纬度的字符串
   */
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
  /**
   * 得到搜索框输入
   * @param {object} e 触发事件
   */
  getSearchInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  /**
   * 把对应的推送设为已浏览
   * @param {object} e 触发事件
   */
  makeVisited: function(e) {
    var index = e.currentTarget.dataset.index
    this.data.visited[index] = 1
    console.log(index)
    this.setData({
      visited: this.data.visited
    })
  }
})

// wxcf38b0daff83a060
