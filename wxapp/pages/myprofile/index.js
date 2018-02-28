/**
 * @file myprofile/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const ASSETS = "../../assets"
const MALE_ICON = ASSETS + "/myprofile_icon/male.png"
const FEMALE_ICON = ASSETS + "/myprofile_icon/female.png"
const PERSON_ICON = ASSETS + "/myprofile_icon/person.png"
const SCHOOL_ICON = ASSETS + "/myprofile_icon/school.png"
const CONTACT_ICON = ASSETS + "/myprofile_icon/contact.png"
const HOBBY_ICON = ASSETS + "/myprofile_icon/hobby.png"
const VOTE_ICON = ASSETS + "/myprofile_icon/vote.png"
const COMMENT_ICON = ASSETS + "/myprofile_icon/comment.png"
const HEART_ICON = ASSETS + "/myprofile_icon/heart.png"

Page({
  data:{
    user: null,
    tabs: ["动态", "社团"],
    tabIndex: 0,
    reachTop: false,
  },
  onLoad: function() {
    this.getMyProfile()
    this.getMoments()
    this.getIcons()
    this.getScreenData()
  },
  getMyProfile: function() {
    // TODO: get data via api
    var user = USER_SAMPLE
    user.genderIcon = user.gender === "male" ? MALE_ICON : FEMALE_ICON
    user.infoIcon = {
      person_info: PERSON_ICON,
      school: SCHOOL_ICON,
      contact: CONTACT_ICON,
      hobby: HOBBY_ICON,
    }
    this.setData({
      user
    })
  },
  getMoments: function() {
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
  getIcons: function() {
    this.setData({
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON,
    })
  },
  clickTab: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
  },
  tabpageScroll: function(e) {
    const windowSize = this.data.windowSize
    const reachTop = this.data.reachTop
    // it's hard to equal
    if (reachTop === false && e.detail.scrollHeight - e.detail.scrollTop === windowSize.height) {
      this.setData({
        reachTop: true
      })
    }
    if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 60) {
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
  background: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
  avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
  name: "李三",
  gender: "male",
  description: "半透明的影子，是流动的风",
  info: {
    person_info: "广东 广州 双子座",
    school: "中山大学 2017级 传播与设计学院",
    contact: "QQ/WeChat/eMail",
    hobby: ["摄影", "演唱", "足球"],
  },
  organizations: ["中珠广播台", "足协"]
}

// TODO: 上拉加载更多动态
// TODO: 点击点赞者或评论者进入他们的主页

const MOMENTS_SAMPLE = [
  {
    author: USER_SAMPLE,
    date: new Date(2018, 1, 2),
    content: "乘着旧日的叮叮电车 寻觅温暖旧情怀 Encore维纳斯歌友会 逆时而上 再现那些声音的传奇",
    images: ["https://i.loli.net/2018/02/28/5a960c61ee6b5.png"],
    forward: null,
    likers: [
      {
        id: "",
        name: "张三"
      },
      {
        id: "",
        name: "李四"
      },
      {
        id: "",
        name: "雪MM"
      },
    ],
    comments: [
      {
        author: {
          id: "",
          name: "卢本伟"
        },
        reply_to: null,
        content: "救我啊马飞"
      },
      {
        author: {
          id: "",
          name: "蛇哥"
        },
        reply_to: null,
        content: "兄弟，借我一个亿"
      },
      {
        author: {
          id: "",
          name: "李三"
        },
        reply_to: {
          id: "",
          name: "卢本伟"
        },
        content: "牛逼"
      }
    ]
  },
  {
    author: USER_SAMPLE,
    date: new Date(2018, 1, 2),
    content: "转发了",
    forward: {
      author: {
        id: "",
        name: "中珠广播台"
      },
      content: "是兄弟就来砍我",
      images: ["https://i.loli.net/2018/02/28/5a960c61ee6b5.png"],
    },
    likers: [
      {
        id: "",
        name: "张三"
      },
      {
        id: "",
        name: "李四"
      },
      {
        id: "",
        name: "雪MM"
      },
    ],
    comments: [
      {
        author: {
          id: "",
          name: "isanbel"
        },
        reply_to: null,
        content: "我也不知道该说什么，就和前面的一样吧"
      },
      {
        author: {
          id: "",
          name: "卢本伟"
        },
        reply_to: null,
        content: "救我啊马飞"
      },
      {
        author: {
          id: "",
          name: "蛇哥"
        },
        reply_to: null,
        content: "兄弟，借我一个亿"
      },
      {
        author: {
          id: "",
          name: "李三"
        },
        reply_to: {
          id: "",
          name: "卢本伟"
        },
        content: "牛逼"
      }
    ]
  }
]
