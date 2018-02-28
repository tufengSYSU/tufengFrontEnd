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

Page({
  data:{
    user: null,
    tabs: ["动态", "社团"],
    tabIndex: 0,
    reachTop: false,
  },
  onLoad: function() {
    this.getMyProfile()
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
    if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 30) {
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
