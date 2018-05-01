Page({
  onLoad: function (option) {
    var id = option.personid;
    var person_temp;
    for(var index in PEOPLE_SAMPLE) {
      if(PEOPLE_SAMPLE[index].id == id) {
        person_temp = PEOPLE_SAMPLE[index];
        break;
      }
    }
  
    this.setData({
      person: person_temp,
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