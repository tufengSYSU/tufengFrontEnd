/**
 * @file 推送+页面交互逻辑
 * @author bravos
 */


const app = getApp()
const Sticky = require('../../utils/sticky.min.js')

Page({
  data:{
    userInfo:{},
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
    // 地理位置经度纬度
    location: {
      latitude: 0,
      longitude: 0,
      address: "中山大学"
    },
    locationIconUrl: "../../assets/icon/location.png",
    searchKey: "",
    // 每篇推送的信息存在此
    content: app.globalData.content,
    // 每篇推送是否已阅览
    visited: [],
    switchFlag: true,
    currentTab: 0,
    background: [
      "red-background",
      "blue-background",
      "yellow-background",
      "green-background"
    ],
    // 文章内容索引，把推送的数目二，分成两个日期的推送一组，一个索引表示两个日期的文章数组(在content的位置2*n, 2*n+1)
    indexSeq: []
  },
  /**
   * 初始化数据
   */
  onLoad: function() {
    this.getLocation();
    var n = Math.round(this.data.content.length/2)
    var seq = Array.from(new Array(n),(val,index)=>index)
    this.setData({
      indexSeq: seq
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
    var row = e.currentTarget.dataset.row
    console.log(e)
    console.log(row)
    this.data.visited[row] = 1
    this.setData({
      visited: this.data.visited
    })
  },
  /**
   * 轮播图更换页面
   * @param {object} e 触发事件
   */
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  }
})

// wxcf38b0daff83a060
