const ASSETS = "../../../assets/homepage_of_others_icon";
const ATTENTION_ICON = ASSETS + "/organization/attention.png";
const ADDRESS_ICON = ASSETS + "/organization/address.png";
const HONOR_ICON = ASSETS + "/organization/honor.png";
const SECTION_ICON = ASSETS + "/organization/section.png";
const ARROW_ICON = ASSETS + "/organization/arrow.png";
const HEART_ICON = ASSETS + "/heart.png";
const VOTE_ICON = ASSETS + "/vote.png";
const COMMENT_ICON = ASSETS + "/comment.png";

Page({
  data: {
    user: null,
    hover: [1,0,0],
    activityOrAlbum: true,
    attention: false,
    reachTop: false,
    TAB: ["活动", "相册", "成员"]
  },
  onLoad: function(data) {
    // wx.request({
    //   url: `https://ancestree.site/api/users/${data.id}`,
    //   data
    //   success: function(res) {
    //
    //   }
    // })
    this.getWindowSize();
    this.getMyProfile();
    this.getMoments();
    this.getActivity();
    this.getAlbum();
    this.getRegistrations();
    this.getManagers();
  },
  getWindowSize: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowSize = {
          width: res.windowWidth,
          height: res.windowHeight
        };
        that.setData({
          windowSize
        })
      }
    })
  },
  getMyProfile: function() {
    let user = ORGANIZATION_SAMPLE;
    user.icon = {
      locationicon: ADDRESS_ICON,
      apartmenticon: SECTION_ICON,
      honoricon: HONOR_ICON,
      arrowicon: ARROW_ICON,
      attentionicon: ATTENTION_ICON,
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON
    }
    this.setData({
      user: user,
      voteIcon: VOTE_ICON,
      commentIcon: COMMENT_ICON,
      heartIcon: HEART_ICON
    })
  },
  getMoments: function() {
    this.setData({
      moments: MOMENTS_SAMPLE
    })
  },
  getActivity: function() {
    this.data.user.activity = ACTIVYTY_SAMPLE;
    this.setData({
      user: this.data.user
    })
  },
  getAlbum: function() {
    this.data.user.album = ALBUM_SAMPLE;
    this.setData({
      user: this.data.user
    })
  },
  getRegistrations: function () {
    //var temp = REGISTRATION_SAMPLE;
    var i;
    
    for (var index in REGISTRATION_SAMPLE) {
      var str = REGISTRATION_SAMPLE[index].endTime;
      var month;
      var day;
      for(var j in str) {
        if (j == 0 && parseInt(str[j]) == 1) {
          if (parseInt(str[1]) == 1 || parseInt(str[1]) == 2) {
            month = parseInt(str[0]) * 10 + parseInt(str[1]);
          } else {
            month = 1;
          }
        }
        if (j == 0 && parseInt(str[j]) != 1) {
          month = parseInt(str[j]);
        }
        if (j == 2 && parseInt(str[j]) >= 1 && parseInt(str[j]) <= 9) {
          if (parseInt(str[3]) >= 1 && parseInt(str[3]) <= 9) {
            day = parseInt(str[2]) * 10 + parseInt(str[3]);
          } else {
            day = parseInt(str[2]);
          }
          break;
        }
        if (j == 3 && parseInt(str[j]) >= 1 && parseInt(str[j]) <= 9) {
          if (parseInt(str[4]) >= 1 && parseInt(str[4]) <= 9) {
            day = parseInt(str[3]) * 10 + parseInt(str[4]);
          } else {
            day = parseInt(str[3]);
          }
          break;
        }       
      }
      var D = new Date();
      var curMonth = D.getMonth() + 1;
      var curDay = D.getDate();
      if(curMonth > month) {
        i = 1;
      }
      if(curMonth == month && curDay > day) {
        i = 1;
      }
      if (curMonth == month && curDay <= day) {
        i = 0;
      }
      if (curMonth < month) {
        i = 0;
      }
      if (i == 1) {
        REGISTRATION_SAMPLE[index].past=true;
      } else {
        REGISTRATION_SAMPLE[index].past = false;
      }
    }

    this.setData({
      registrations: REGISTRATION_SAMPLE
    })
  },
  getManagers: function () {
    this.setData({
      managers: MANAGERS_SAMPLE
    })
  },
  clickActivity: function() {
    let activityid = 1;
    let url = `../../activities/activity_detail/index?activityid=${activityid}`
    wx.navigateTo({
      url: url
    })
  },
  albumClickActivity: function (e) {
    var Name = e.currentTarget.dataset.value;
    let albumid = 1;
    let url = `../../homepage_of_others/organization_album/index?albumid=${albumid}&title=${Name}`
    wx.navigateTo({
      url: url
    })
  },
  makeAttention: function() {
    console.log("Yes");
    const origin = ATTENTION_ICON;
    const heart = HEART_ICON;
    let temp = (this.data.user.icon.attentionicon === origin ? heart : origin);
    this.data.user.icon.attentionicon = temp;
    console.log(this.data.user.icon.attentionicon)
    this.setData({
      user: this.data.user
    })
  },
  changeHoverClass: function(e) {
    let a = [0, 0, 0];
    this.data.hover = a;
    this.data.hover[e.target.dataset.index] = 1;
    this.setData({
      hover: this.data.hover
    })
  },
  previewImage: function(e) {
    var that = this;
    wx.previewImage({
      urls: []
    })
  },
  pageScroll: function(e) {
    const windowSize = this.data.windowSize;
    const reachTop = this.data.reachTop;
    console.log(reachTop);
    if (reachTop === false && e.detail.scrollHeight - e.detail.scrollTop == windowSize.height) {
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
    console.log("To lower")
    this.setData({
      reachTop: true
    })
  },
  voteUp: function(e) {
    const momentIndex = e.currentTarget.dataset.momentindex
    console.log(momentIndex);
    var moments = this.data.moments
    var moment = moments[momentIndex]
    var user = this.data.user

    var momentLikersIds = moment.likers.map(liker => {return liker.id})
    var indexOfUserId = momentLikersIds.indexOf(user.id)
    if (indexOfUserId >= 0) {
      // TODO: be real
      moment.likers.splice(indexOfUserId, 1);
      wx.showToast({
        title: '赞-1',
        icon: 'success',
        duration: 500
      })
    }
    else {
      // TODO: be real
      moment.likers.push({
        id: user.id,
        name: user.name
      })
      wx.showToast({
        title: '赞+1',
        icon: 'success',
        duration: 500
      })
    }
    moments[momentIndex] = moment
    this.setData({
      moments
    })
  }
})

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
    author: ORGANIZATION_SAMPLE,
    date: "今天 17:00",
    events: "维纳斯演唱会",
    images: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    content: "张大剑秀",
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
    author: ORGANIZATION_SAMPLE,
    date: "昨天 18:00",
    images: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    events: "维纳斯演唱会",
    content: "张剑秀",
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
    ],
  }
]

const ACTIVIYTY_SAMPLE = [
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

const ALBUM_SAMPLE = [
  {
    name: "默认相册",
    photos: [
    {
      id: "",
      image: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae36458587a.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae36459a31b.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae3646f3302.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae364700811.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae3646f3a4a.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae364701288.jpg"
    },
    {
      id: "",
      image: "https://i.loli.net/2018/03/18/5aae365e70369.jpg"
    }
    ],
  },
  {
    name: "致青春定向越野",
    photos: [
      {
        id: "",
        image: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae36458587a.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae36459a31b.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae3646f3302.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae364700811.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae3646f3a4a.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae364701288.jpg"
      },
      {
        id: "",
        image: "https://i.loli.net/2018/03/18/5aae365e70369.jpg"
      }
    ],
  },
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
    past: false,
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
    name: "第三十一届维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 1,
    startTime: "4月15日",
    endTime: "5月30日",
    hostTime: "4月27日",
    location: "东校区至善学生活动中心",
    past: false,
    hosts: [
      {
        id: "location",
        name: "中大GBT11111",
      },
      {
        id: "apartment",
        name: "中山大学团委"
      },
    ],
    signedUpUsername: "张剑",
    signedUpUserAcademic: "传播与设计学院",
    signedUpUserPhone: "166****3587",
    signedUpStudentID: "15****59",
  },
  {
    id: "",
    name: "维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 2,
    startTime: "4月15日",
    endTime: "4月16日",
    location: "梁銶琚堂",
    past:true,
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

const MANAGERS_SAMPLE = [
  {
    id: "",
    avatar: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
  },
  {
    id: "",
    avatar: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
  },
  {
    id: "",
    avatar: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
  },
  {
    id: "",
    avatar: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
  },
  {
    id: "",
    avatar: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
  },
]