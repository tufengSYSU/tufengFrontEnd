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

Page({
  data:{
    user: null,
    tabs: ["消息", "活动", "名片"],
    activityTabs: ["已关注", "已报名", "已完成"],
    tabIndex: 0,
    activityTabIndex: 0,
    reachTop: false,
    photoIcon: ASSETS + "/homepage/photo.png",
    images: [
      "https://i.loli.net/2018/02/28/5a960c61ee6b5.png",
    ],
    attentionTabIndex: 0
  },
  onLoad: function(data) {

    // wx.request({
    //   url: `https://ancestree.site/api/users/${data.id}`,
    //   data: ,
    //   success: function(res) {
    //
    //   }
    // })
    this.getMyProfile()
    this.getIcons()
    this.getScreenData()
    this.getOrganizations()
    this.getActivities()
    this.getRegistrations()
    this.getMessages()
  },
  getMyProfile: function() {
    // TODO: get data via api
    var user = USER_SAMPLE
    this.setData({
      user
    })
  },
  getIcons: function() {
    this.setData({
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON,
      addressListIcon: ADDRESSLIST_ICON,
      signedIcon: SIGNED_ICON
    })
  },
  getOrganizations: function() {
    this.setData({
      organizations: ORGANIZATION_SAMPLE
    })
  },
  getActivities: function() {
    this.setData({
      activities: ACTIVITY_SAMPLE
    })
  },
  getRegistrations: function() {
    this.setData({
      registrations: REGISTRATION_SAMPLE
    })
  },
  getMessages: function () {
    this.setData({
      messages: MESSAGES_SAMPLE
    })
  },
  clickTab: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
  },
  clickActivityTab: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activityTabIndex: index
    })
  },
  clickActivity: function(e) {
    let activityid = 1;
    let url = `../activities/activity_detail/index?activityid=${activityid}`;
    wx.navigateTo({
      url: url
    })
  },
  clickAttentionTab: function(e) {
    this.setData({
      attentionTabIndex: (this.data.attentionTabIndex === 0 ? 1 : 0)
    })
  },
  clickOrganizationTab: function(e) {
    let organizationid = 1;
    let url = "../homepage_of_others/organization/index?organizationid=${organizationid}"
    wx.navigateTo({
      url: url
    })
  },
  tabpageScroll: function(e) {
    const windowSize = this.data.windowSize
    const reachTop = this.data.reachTop
    // it's hard to equal
    console.log(e.detail.scrollTop)
    if (reachTop === false && e.detail.scrollTop === 114) {
      this.setData({
        reachTop: true
      })
    }
    else if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 60) {
      this.setData({
        reachTop: false
      })
    }
  },
  scrollToLower: function(e) {
    this.setData({
      reachTop: true
    })
  },
  getScreenData: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        const windowSize = {
          width: res.windowWidth,
          height: res.windowHeight
        }
        that.setData({
          windowSize
        })
      }
    })
  }
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
  organizations: ["中珠广播台", "足协"],
  hasSignedUp: REGISTRATION_SAMPLE,
}

const ORGANIZATION_SAMPLE = [
  {
    id: "123",
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    information: [
      {
        id: "location",
        text: "中山大学 珠海校区"
      },
      {
        id: "apartment",
        text: "有声部 咨讯部 策划部"
      },
      {
        id: "honor",
        text: "中山大学十佳社团"
      }
    ]
  },
  {
    id: "123",
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    information: [
      {
        id: "location",
        text: "中山大学 珠海校区"
      },
      {
        id: "apartment",
        text: "有声部 咨讯部 策划部"
      },
      {
        id: "honor",
        text: "中山大学十佳社团"
      }
    ]
  },
  {
    id: "123",
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    information: [
      {
        id: "location",
        text: "中山大学 珠海校区"
      },
      {
        id: "apartment",
        text: "有声部 咨讯部 策划部"
      },
      {
        id: "honor",
        text: "中山大学十佳社团"
      }
    ]
  }
]

const ACTIVITY_SAMPLE = [
  {
    id: "",
    name: "第三十一届维纳斯歌手大赛",
    image: "https://s1.ax1x.com/2018/03/19/9og0fK.jpg",
    progress: true
  },
  {
    id: "",
    name: "2016维纳斯歌友会",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    progress: false
  },
  {
    id: "",
    name: "张剑见面会",
    image: "https://i.loli.net/2018/02/28/5a960c61ee6b5.png",
    progress: false
  },
  {
    id: "",
    name: "唱飞自我 最帅张园园",
    image: "https://i.loli.net/2018/03/18/5aae364416df4.jpg",
    progress: true
  },
  {
    id: "",
    name: "图蜂最牛逼 楼上说得对",
    image: "https://i.loli.net/2018/03/18/5aae364514aef.jpg ",
    progress: true
  }
]

const REGISTRATION_SAMPLE = [
  {
    id: "",
    name: "维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 0,
    startTime: "4月15日",
    endTime: "5月30日",
    location: "梁銶琚堂",
    hosts: [
      {
        id: "location",
        name: "中大GBT",
      },
      {
        id: "apartment",
        name: "中山大学团委"
      },
    ]
  },
  {
    id: "",
    name: "维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 1,
    startTime: "4月15日",
    endTime: "5月30日",
    location: "梁銶琚堂",
    hosts: [
      {
        id: "location",
        name: "中大GBT11111",
      },
      {
        id: "apartment",
        name: "中山大学团委"
      },
    ]
  },
  {
    id: "",
    name: "维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 2,
    startTime: "4月15日",
    endTime: "5月30日",
    location: "梁銶琚堂",
    hosts: [
      {
        id: "location",
        name: "中大GBT22",
      },
      {
        id: "apartment",
        name: "中山大学团委"
      },
    ]
  },
]

const MESSAGES_SAMPLE = [
  {
    id: "",
    author: USER_SAMPLE,
    remark: "222",
    avatar: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    time: "17:02",
    unread: false,

  },

  
]