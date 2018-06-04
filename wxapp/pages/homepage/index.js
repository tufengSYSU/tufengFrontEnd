/**
 * @file homepage/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const app = getApp()
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
    data: {
        user: USER_SAMPLE,
        tabs: ["消息", "活动", "名片"],
        activityTabs: ["已关注", "已报名", "已完成"],
        tabIndex: 2,
        activityTabIndex: 0,
        reachTop: false,
        photoIcon: ASSETS + "/homepage/photo.png",
        images: [
            "https://i.loli.net/2018/02/28/5a960c61ee6b5.png",
        ],
        tabsBackground: app.globalData.tabsBackground,
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
        this.setData({
            defaultAvatar: app.globalData.defaultAvatar,
            defaultLogo: app.globalData.defaultLogo
        })
        console.log(this.data.finishedIcon)
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '快来看看个人的主页吧！',
            path: '/pages/homepage/index'
        }
    },
    getMyProfile: function() {
        // TODO: get data via api
        var user = USER_SAMPLE
        let userInfo = app.globalData.userInfo
        console.log(userInfo)
        user.avatar = userInfo.avatarUrl
        user.name = userInfo.nickName
        user.gender = (userInfo.gender === 1 ? "男" : "女")
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
            signedIcon: SIGNED_ICON,
            processingIcon: PROCESSING_ICON,
            finishedIcon: FINISHED_ICON,
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
    getMessages: function() {
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
    homeTown: function(e) {
        TEMP_USER_SAMPLE.hometown = e.detail.value;
    },
    birthday: function(e) {
        TEMP_USER_SAMPLE.birthday = e.detail.value;
    },
    institution: function(e) {
        TEMP_USER_SAMPLE.institution = e.detail.value;
    },
    major: function(e) {
        TEMP_USER_SAMPLE.major = e.detail.value;
    },
    description: function(e) {
        TEMP_USER_SAMPLE.description = e.detail.value;
    },

    confirmBtnClick: function(e) {
        USER_SAMPLE.hometown = TEMP_USER_SAMPLE.hometown;
        USER_SAMPLE.birthday = TEMP_USER_SAMPLE.birthday;
        USER_SAMPLE.institution = TEMP_USER_SAMPLE.institution;
        USER_SAMPLE.major = TEMP_USER_SAMPLE.major;
        USER_SAMPLE.description = TEMP_USER_SAMPLE.description;
        var user1 = USER_SAMPLE;
        this.setData({
            user: user1
        })

    },
    cancelBtnClick: function(e) {

        var user2 = USER_SAMPLE;
        this.setData({
            user: user2
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
        let organizationid = e.dataset;
        let url = "../homepage_of_others/organization/index?organizationid=${organizationid}"
        wx.navigateTo({
            url: url
        })
    },

    clickPerson: function(e) {
        let personid = e.currentTarget.dataset.value;
        let url = `../homepage_of_others/person/index?personid=${personid}`;
        wx.navigateTo({
            url: url
        })
    },
    modifyGender: function(e) {
        var that = this
        wx.showActionSheet({
            itemList: ['男', '女'],
            success: function(res) {
                console.log(res.tapIndex)
                if (res.tabIndex === 0) {
                    that.data.user.gender = "男"
                } else {
                    that.data.user.gender = "女"
                }
                that.setData({
                    user: that.data.user
                })
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
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
        } else if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 60) {
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
    background_image: app.globalData.defaultBackground,
    avatar: app.globalData.userInfo.avatarUrl,
    name: app.globalData.userInfo.nickName,
    gender: "男",
    description: "",
    info: {
        personal_info: "",
        school: "",
        contact: "",
        hobbies: [],
    },
    organizations: [],
    birthday: "",
    hometown: "",
    institution: "",
    major: "",
    phone: "",
    studentID: ""
}

const TEMP_USER_SAMPLE = {
    id: "123",
    background_image: app.globalData.defaultBackground,
    avatar: app.globalData.defaultAvatar,
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
}
const ORGANIZATION_SAMPLE = [{
        id: "123",
        background: app.globalData.defaultBackground,
        avatar: app.globalData.defaultAvatar,
        name: "中珠广播台",
        information: [{
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
        background: app.globalData.defaultBackground,
        avatar: app.globalData.defaultAvatar,
        name: "中珠广播台",
        information: [{
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
        background: app.globalData.defaultBackground,
        avatar: app.globalData.defaultAvatar,
        name: "中珠广播台",
        information: [{
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

const ACTIVITY_SAMPLE = [{
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

const REGISTRATION_SAMPLE = [{
        id: "",
        name: "维纳斯歌手大赛",
        image: app.globalData.VANSposter,
        status: 0,
        startTime: "4月15日",
        endTime: "5月30日",
        location: "梁銶琚堂",
        hosts: [{
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
        hosts: [{
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
        image: app.globalData.VANSposter,
        status: 2,
        startTime: "4月15日",
        endTime: "5月30日",
        location: "梁銶琚堂",
        hosts: [{
                id: "location",
                name: "中大GBT",
            },
            {
                id: "apartment",
                name: "中山大学团委"
            },
        ]
    },
]

const MESSAGES_SAMPLE = [{
    id: "1",
    author: {
        name: "中大图蜂",
        avatar: app.globalData.defaultLogo
    },
    remark: "么么哒！欢迎来到校园先蜂",
    avatar: app.globalData.defaultLogo,
    time: "17:02",
    unread: false,
}, ]