/**
 * @file homepage/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const ASSETS = "../../assets"

// 动态图标
const VOTE_ICON = ASSETS + "/homepage_of_others_icon/vote.png"
const COMMENT_ICON = ASSETS + "/homepage_of_others_icon/comment.png"
const HEART_ICON = ASSETS + "/homepage_of_others_icon/heart.png"
const ADDRESSLIST_ICON = ASSETS + "/homepage_of_others_icon/person.png"

// 活动图标
const SIGNED_ICON = ASSETS + "/homepage/signed.png"
const PROCESSING_ICON = ASSETS + "/homepage/processing.png"
const FINISHED_ICON = ASSETS + "/homepage/finished.png"

const PHOTO_ICON = ASSETS + "/ homepage / photo.png"


Page({
  data: {
    url: {
      url: "http://www.pailixiang.com/m/album_ia54800121.html",
      query: {
        from: "singlemessage",
        isappinstalled: 0
      }
    },
    user: null,
    //activity: null,
    tabs: ["时间轴", "相册", "简介", "留言板"],
    tabIndex: 0,
    actTabIndex: 0,
    reachTop: false,
    actTabs: [
      { icon: SIGNED_ICON, name: "已报名" },
      { icon: PROCESSING_ICON, name: "进行中" },
      { icon: FINISHED_ICON, name: "已完成" },
    ],

    images: [
      "https://i.loli.net/2018/02/28/5a960c61ee6b5.png",
    ],
    Comment:""

  },
  
  onLoad: function (data) {
    this.getMyProfile()
    this.getIcons()
    this.getScreenData()
  },
  getMyProfile: function () {
    // wx.request({
    //   url: "https://ancestree.site/api/activities_stages/15-01-01",
    //   methon: "GET",
    //   success: function( {
    //   },
    // })
    // TODO: get data via api
    var user = USER_SAMPLE;
    var D = new Date();
    var init = new Date("2018/4/20/13:30");
    var days = init.getTime() - D.getTime();
    var leaveDay = parseInt(days / (1000 * 60 * 60 * 24));
    var leaveHour = parseInt(days / (1000 * 60 * 60)) - leaveDay * 24;
    var leaveMin = parseInt(days / (1000 * 60)) - leaveDay * 1440 - leaveHour * 60;

    ACTIVITY_SAMPLE.leave_Day = leaveDay;
    ACTIVITY_SAMPLE.leave_Hour = leaveHour;
    ACTIVITY_SAMPLE.leave_Min = leaveMin;
    var activity = ACTIVITY_SAMPLE
    this.setData({
      user,
      activity,
    })
  },
  getMoments: function () {
    var moments = MOMENTS_SAMPLE
    moments = moments.map(moment => {
      // TODO: parseDate
      // moment.date = tools.parseDate(moment.date)
      return moment
    })
    this.setData({
      moments
    })
  },

  getMessages: function () {
    var messages = MESSAGES_SAMPLE
    messages = messages.map(message => {
      return message
    })
    this.setData({
      messages
    })
  },

  getPersonalizations: function () {
    var personalizations = PERSONALIZATIONS_SAMPLE
    personalizations = personalizations.map(personalization => {
      return personalization
    })
    this.setData({
      personalizations
    })
  },

  getIcons: function () {
    this.setData({
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON,
      addressListIcon: ADDRESSLIST_ICON,
      photoIcon: PHOTO_ICON,
    })
  },
  clickTab: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
  },
  clickActTab: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      actTabIndex: index
    })
  },
  tabpageScroll: function (e) {
    const windowSize = this.data.windowSize
    const reachTop = this.data.reachTop
    // it's hard to equal
    if (reachTop === false && e.detail.scrollHeight - e.detail.scrollTop === windowSize.height) {
      this.setData({
        reachTop: true
      })
    }
    if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 60)    {
      this.setData({
        reachTop: false
      })
    }
  },
  scrollToLower: function (e) {
    this.setData({
      reachTop: true
    })
  },
  commentInput:function(e) {
    this.setData({
      Comment: e.detail.value
    })
  },

  getScreenData: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        const windowSize = {
          width: res.windowWidth,
          height: res.windowHeight
        }
        that.setData({
          windowSize
        })
      }
    })
  },
  // 相册相关
  chooseImage: function () { // 添加商品图片
    var that = this;
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var images = that.data.images;
        images = images.concat(res.tempFilePaths);
        that.setData({
          images
        })
      }
    })
  },
  previewImage: function (e) {
    var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.images // 需要预览的图片http链接列表
    })
  },

  getLeaveHour() {
    var D = new Date();
    var init = new Date("2018/4/20");
    var days = init.getTime() - D.getTime();
    var leaveDay = parseInt(days / (1000 * 60 * 60 * 24));
    var leaveHour = parseInt(days / (1000 * 60 * 60)) - leaveDay * 24;
    var leaveMin = parseInt(days / (1000 * 60)) - leaveDay * 1440 - leaveHour * 60;
    this.setData({
      leaveHour
    })
  },
})


// the sample data
const USER_SAMPLE = {
  id: "123",
  background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
  avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
  name: "李三",
  gender: "male",
  description: "半透明的影子，是流动的风",
  info: {
    personal_info: "广东 广州 双子座",
    school: "中山大学 2017级 传播与设计学院",
    contact: "QQ/WeChat/eMail",
    hobbies: ["摄影", "演唱", "足球"],
  },
  organizations: ["中珠广播台", "足协"]
}

const ACTIVITY_SAMPLE = {
  id: "1234",
  background_image: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
  name: "第三十一届维纳斯歌手大赛",
  startTime: "4月15日",
  endTime: "5月30日",
  location: "梁銶琚堂",
  organization: "中山大学广播台",
  likers: "7854",
  introduction: "报道称，自停止使用以来，该空间站的高度一直在稳步下降",

  leave_Day: 0,
  leave_Hour: 0,
  leave_Min: 0,
  parts: [
    {
      partName: "开启报名",
      partStartTime: "4月15日 00:30",
      partPlace: " "
    },
    {
      partName: "初赛",
      partStartTime: "4月20日 13:30",
      partPlace: "四饭小广场"
    },
    {
      partName: "LiveShow",
      partStartTime: " ",
      partPlace: " "
    },
  ],
  
  comments: [
    {
      user: USER_SAMPLE,
      commentTime: "今天 17:00",
      content: "张剑NMSL"
    },

  ]
}
