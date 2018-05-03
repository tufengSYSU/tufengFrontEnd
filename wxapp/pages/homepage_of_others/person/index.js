Page({
  data: {
    user: null,
    hover: [1, 0],
    activityOrAlbum: true,
    attention: false,
    reachTop: false,
    TAB: ["活动", "社团"],
    organizations_: [],
    
  },
  onLoad: function (option) {
    var id = option.personid;
    var person_temp;
    var hobby="";
    var Name="";
    for(var index in PEOPLE_SAMPLE) {
      if(PEOPLE_SAMPLE[index].id == id) {
        person_temp = PEOPLE_SAMPLE[index];
        break;
      }
    }
    for(var index in person_temp.info.hobbies) {
      hobby = hobby+person_temp.info.hobbies[index];
      hobby = hobby+" ";
    }
    for (var index in person_temp.name) {
      Name = Name + person_temp.name[index];
      Name = Name + " ";
    }
    person_temp.name = Name;
    person_temp.info.hobbies=hobby;
    if(person_temp.gender == "男") {
      person_temp.manFlag = true;
    } else {
      person_temp.manFlag = false;
    }
    this.setData({
      person: person_temp,
    })
    var tempOrganizations = [];
    for (var index in person_temp.organizations) {
      for (var i in ORGANIZATIONS_SAMPLE) {
        if (ORGANIZATIONS_SAMPLE[i].name == person_temp.organizations[index]) {
          tempOrganizations.push(ORGANIZATIONS_SAMPLE[i]);
          break;
        }
      }
    }
    this.setData({
      organizations_: tempOrganizations
    })

    this.getRegistrations();
   
  },
  clickOrganization: function(e) {
    let organizationid = e.dataset;
    let url = "../organization/index?organizationid=${organizationid}"
    wx.navigateTo({
      url: url
    })
  },
  changeHoverClass: function (e) {
    let a = [0, 0, 0];
    this.data.hover = a;
    this.data.hover[e.target.dataset.index] = 1;
    this.setData({
      hover: this.data.hover
    })
  },
  getRegistrations: function () {
    this.setData({
      registrations: REGISTRATION_SAMPLE
    })
  },

})

const PEOPLE_SAMPLE = [
  {
    id: "123",
    background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
    name: "李三",
    gender: "男",
    manFlag: true,
    description: "半透明的影子，是流动的风",
    info: {
      personal_info: "广东 广州 双子座",
      school: "中山大学 2017级",
      contact: "QQ/WeChat/eMail",
      hobbies: ["摄影", "演唱", "足球"],
    },
    organizations: ["中珠广播台", "足协"],
    birthday: "1997-6-4",
    hometown: "江苏-苏州",
    institution: "传播与设计学院",
    major: "2015级 网络与新媒体",
    phone: "166****3587",
    studentID: "15****59"
  },
  {
    id: "1234",
    background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
    name: "李三",
    gender: "男",
    description: "半透明的影子，是流动的风",
    info: {
      personal_info: "广东 广州 双子座",
      school: "中山大学 2017级 传播与设计学院",
      contact: "QQ/WeChat/eMail",
      hobbies: ["摄影", "演唱", "足球"],
    },
    organizations: ["中珠广播台", "足协"],
    birthday: "1997-6-4",
    hometown: "江苏-苏州",
    institution: "传播与设计学院",
    major: "2015级 网络与新媒体",
    phone: "166****3587",
    studentID: "15****59"
  },
]

const ORGANIZATIONS_SAMPLE = [
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
    id: "1234",
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
    name: "第三十一届维纳斯歌手大赛",
    image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
    status: 1,
    startTime: "4月15日",
    endTime: "5月30日",
    hostTime: "4月27日",
    location: "东校区至善学生活动中心",
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