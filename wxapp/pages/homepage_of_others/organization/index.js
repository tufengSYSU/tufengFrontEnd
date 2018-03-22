const ASSETS = "../../../assets/myprofile_icon";
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
    TAB: ["动态", "活动", "相册"]
  },
  onLoad: function() {
    this.getWindowSize();
    this.getMyProfile();
    this.getMoments();
    this.getActivity();
    this.getAlbum();
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
      voteicon: VOTE_ICON,
      commenticon: COMMENT_ICON,
      hearticon: HEART_ICON
    }
    this.setData({
      user: user
    })
  },
  getMoments: function() {
    this.data.user.moments = MOMENTS_SAMPLE;
    this.setData({
      user: this.data.user
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
    if (reachTop === false && this.judge(e.detail.scrollHeight, e.detail.scrollTop, windowSize.height)) {
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
  judge: function(a, b, c) {
    return Math.abs(a-b-c) < 5;
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
    author: "卢本伟",
    time: "今天 17:00",
    images: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    content: "张剑 @中东广播台 维纳斯活动发布啦",
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
    author: "张小牛",
    time: "昨天 18:00",
    images: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    content: "张剑 @ 中东广播台 维纳斯歌手大赛发布啦",
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

const ACTIVYTY_SAMPLE = [
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
]
