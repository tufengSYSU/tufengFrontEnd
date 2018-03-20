
const ASSETS = "../../assets/plaza_icon";
const MESSAGE_ICON = ASSETS + "/message.png";
const PUSH_ICON = ASSETS + "/push.png";
const LOCATION_ICON = ASSETS + "/location.png";
const LEBEL_ICON = ASSETS + "/label.png";
const MOMENTS_ICON = ASSETS + "/moments.png";
const SETTING_ICON = ASSETS + "/setting.png";
const PHOTO_ICON = ASSETS + "/photo.png";
const YELLOWPAGE_ICON = ASSETS + "/yellowpage.png";

Page({
  data: {
    user: null
  },
  onLoad: function() {
    getHotSample();
    getMoments();
    getConcerns();
    getMyOrganizaion();
    getNearbyOrganization();
  }，
  getHotSample: function() {
    var user = {};
    user.recommend = HOT_SAMPLE;
    this.setData({
      user
    })
  },
  getMoments: function() {
    let user = this.data.user;
    user.moments = MOMENTS_SAMPLE;
    this.setData({
      user
    })
  },
  getConcerns: function() {
    let user = this.data.user;
    user.concerns = CONCERN_SAMPLE;
    this.setData({
      user
    })
  },
  getMyOrganizaion: function() {
    let user = this.data.user;
    user.myOrganization = MY_ORGANIZATION_SAMPLE;
    this.setData({
      user
    })
  },
  getNearbyOrganization: function() {
    let user = this.data.user;
    user.nearbyOrganization = NEARBY_ORGANIZAION_SAMPLE;
    this.setData({
      user
    })
  }
})

const HOT_SAMPLE = [
  {
    id: "",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
  },
  {
    id: "",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
  }
]

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

const CONCERN_SAMPLE = [
  {
    id:"",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
  },
  {
    id:"".
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
  }
]

const MY_ORGANIZATION_SAMPLE = [
  {
    id: "",
    name: "中东广播台",
    occupation: "资讯部 干事",
    numberOfMessages: 7
  },
  {
    id: "",
    name: "中东广播台",
    occupation: "资讯部 干事",
    numberOfMessages: 7
  },
  {
    id: "",
    name: "中东广播台",
    occupation: "资讯部 干事",
    numberOfMessages: 7
  }
]

const NEARBY_ORGANIZAION_SAMPLE = [
  {
    id: "",
    name: "中东广播台",
  },
  {
    id: "",
    name: "中东广播台",
  },
  {
    id: "",
    name: "中东广播台",
  }
]
