/**
 * @file homepage/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const ASSETS = "../../assets"
const VOTE_ICON = ASSETS + "/homepage_of_others_icon/vote.png"
const COMMENT_ICON = ASSETS + "/homepage_of_others_icon/comment.png"
const HEART_ICON = ASSETS + "/homepage_of_others_icon/heart.png"
const ADDRESSLIST_ICON = ASSETS + "/homepage_of_others_icon/person.png"

Page({
  data:{
    user: null,
    tabs: ["消息", "动态", "活动", "相册", "个性化"],
    tabIndex: 0,
    reachTop: false,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  },
  onLoad: function() {
    this.getMyProfile()
    this.getMoments()
    this.getMessages()
    this.getPersonalizations()
    this.getIcons()
    this.getScreenData()
  },
  getMyProfile: function() {
    // TODO: get data via api
    var user = USER_SAMPLE
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

  getMessages: function() {
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

  getIcons: function() {
    this.setData({
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON,
      addressListIcon: ADDRESSLIST_ICON
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

const USER_SAMPLE_OTHER = {
  id: "1234",
  background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
  avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
  name: "张四",
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

const USER_SAMPLE_PERSONALIZATION = {
  id: "12345",
  background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
  avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
  name: "张三",
  gender: "男",
  description: "半透明的影子，是流动的风",
  info: {
    personal_info: "广东 广州 双子座",
    school: "中山大学 2015级 传播与设计学院",
    contact: "QQ/WeChat/eMail",
    hobbies: ["足球", "吉他", "DotA"],
  },
  organizations: ["中珠广播台", "足协"]
}

const ORGANIZATION_SAMPLE = {
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

const MOMENTS_SAMPLE = [
  {
    id: "1",
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
    id: "2",
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

const MESSAGES_SAMPLE = [
  {
    id: "1",
    addressList: "通讯录",
    remark: "[刘雨欣]关注了你",
    unread: true
  },
  {
    id: "2",
    author: USER_SAMPLE,
    remark: "传设院NMSL",
    time: "17:55",
    unread: true
  },
  {
    id: "3",
    author: USER_SAMPLE_OTHER,
    remark: "传设院NMSL",
    time: "16:17",
    unread: false
  },
  {
    id: "4",
    organization: ORGANIZATION_SAMPLE,
    remark: "你发布的动态[追寻ENCORE]获得16个赞/2评论",
    time: "13:08",
    unread: false
  }
]

const PERSONALIZATIONS_SAMPLE = [
  {
    id: "1",
    person: USER_SAMPLE_PERSONALIZATION,
    birthday: "1997-6-4",
    QQ: "12345678",
    WeChat: "Ubiquitous_Max",
    phoneNumber: "18820188888",
    major: "网络与新媒体",
    hometown: "江苏-苏州"
  }
 
]