/**
 * @file 推送+页面交互逻辑
 * @author bravos
 */

const app = getApp()
const tools = require('./tools.js')
const ASSETS = "../../assets/"
const LOCATION_ICON = ASSETS + "icon/location.png"
const SEARCH_ICON = ASSETS + "icon/search.png"
const SPORT_ICON = ASSETS + "icon/mark/aixin.png"
const BALL_ICON = ASSETS + "icon/mark/ball.png"
const MONEY_ICON = ASSETS + "icon/mark/money.png"

Page({
  data:{
    userInfo: undefined,
    windowWidth: 0,
    searchKey: "",
    // 轮播图片的路径 使用每天的第一篇推送来做
    // 每篇推送是否已阅览
    visited: [],
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
    this.getLocation();
    this.getIcons();
    this.getWindowSize();
    this.getArticlesInOneMonth();
    this.setData({
      seq: Array.from(new Array(Math.ceil(this.data.articlesInOneMonth.length/3)), (val,index)=>index)
    })
    console.log(this.data.seq)
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
        let location = {
          latitude: res.latitude,
          longitude: res.longitude,
          address: "中山大学"
        }
        that.setData({
          location
        })
        locationString = res.latitude + "," + res.longitude
        that.requestAddress(locationString)
      }
    })
  },
  getIcons: function() {
    this.setData({
      locationIcon: LOCATION_ICON,
      searchIcon: SEARCH_ICON,
      sportIcon: SPORT_ICON,
      ballIcon: BALL_ICON,
      moneyIcon: MONEY_ICON
    })
  },
  getWindowSize: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        let windowSize = {
          width: res.windowWidth,
          height: res.windowHeight
        }
        that.setData({
          windowSize
        })
      }
    })
  },
  getArticlesInOneMonth: function() {
    let articlesInOneMonth = ARTICLES_SAMPLE
    let briefIntroduction = []
    let slidePictures = []
    articlesInOneMonth = articlesInOneMonth.map(onedayArticles => {
      if (onedayArticles.article[0])
        slidePictures.push(onedayArticles.article[0].image)
      onedayArticles.article.map(temp => {
        let item = {
          text: temp.briefIntroduction,
          color: tools.getRandomColor()
        }
        briefIntroduction.push(item)
      })
      return onedayArticles;
    })
    this.setData({
      articlesInOneMonth,
      briefIntroduction,
      slidePictures
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
        let location = that.data.location
        location.address = res.data.result.address
        that.setData({
          location
        })
        console.log("请求地址为：" + that.data.location.address)
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
  },
  navigateToActivityDetail: function() {
    wx.navigateTo({
      url: 'activity_detail/index?data='+JSON.stringify(this.data) // will be some other data
    })
  }
})

const ARTICLES_SAMPLE = [
  {
    id: 0,
    date: "2月7号",
    article: [
      {
        id: 0,
        image: "https://i.loli.net/2018/02/28/5a95a4d037347.png",
        headLine: "中山大学团委活动",
        mark: ["money", "ball", "aixin"],
        briefIntroduction: "1758舞蹈会"
      }
    ]
  },
  {
    id: 1,
    date: "2月8号",
    article: [
      {
        id: 1,
        image: "https://i.loli.net/2018/02/28/5a95a4d064f71.png",
        headLine: "数据科学与计算机学院学长团",
        mark: ["money", "ball"],
        briefIntroduction: "学长团"
      },
    ]
  },
  {
    id: 2,
    date: "2月9号",
    article: [
      {
        id: 2,
        image: "https://i.loli.net/2018/02/28/5a95a4d088fd3.png",
        headLine: "维纳斯歌手大赛",
        mark: ["money", "aixin"],
        briefIntroduction: "维纳斯歌手比赛"
      },
    ]
  },
  {
    id: 3,
    date: "2月10号",
    article: [
      {
        id: 3,
        image: "https://i.loli.net/2018/02/28/5a95a4d09f6ec.png",
        headLine: "暑假三下乡-把阳光撒到世界每一个角落",
        mark: ["money"],
        briefIntroduction: "三下乡义教"
      },
    ]
  }
]

// wxcf38b0daff83a060
