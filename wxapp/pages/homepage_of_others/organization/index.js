var app = getApp()
const tools = require('./tools.js')

const ASSETS = "../../../assets/homepage_of_others_icon";
const ATTENTION_ICON = ASSETS + "/organization/attention.png";
const ADDRESS_ICON = ASSETS + "/organization/address.png";
const HONOR_ICON = ASSETS + "/organization/honor.png";
const SECTION_ICON = ASSETS + "/organization/section.png";
const ARROW_ICON = ASSETS + "/organization/arrow.png";
const HEART_ICON = ASSETS + "/heart.png";
const VOTE_ICON = ASSETS + "/vote.png";
const COMMENT_ICON = ASSETS + "/comment.png";
var SERVER_PATH = "https://ancestree.site";

Page({
    data: {
        user: null,
        hover: [1, 0, 0],
        activityOrAlbum: true,
        attention: false,
        reachTop: false,
        TAB: ["活动", "相册", "成员"],
        list: null,
        coverPhoto: app.globalData.defaultPhotos[0]
    },
    onLoad: function(option) {
        console.log(option)
        option.id = (option.id != undefined ? option.id : 100021);
        console.log(option)
            //console.log(option.id)
        this.setData({
            organizationID: option.id,
            oBackground: defaultBackground,
        })
        this.getWindowSize();
        this.getMyProfile();
        this.getRegistrations();
        this.getManagers();
        this.getMembers();
        this.sendRequest();
        //this.send();

    },

    sendRequest: function() {
        var that = this;
        wx.request({
            url: "https://ancestree.site/api/activities",
            data: {
                oid: this.data.organizationID,
            },
            header: {
                'content-type': 'application/json' // 默认值，返回的数据设置为json数组格式
            },
            success: function(res) {
                var data = res.data.data;
                //console.log(data)
                that.setData({
                    list: data
                })
                that.getCoverImage();
            },
        })
    },
    onShareAppMessage: function(res) {
        let id = this.data.organizationID
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '快来看看中大社团的主页吧！',
            path: '/pages/homepage_of_others/organization/index?id=' + id
        }
    },
    getCoverImage: function() {
        let list = this.data.list
        var that = this
        list.forEach(event => {
            let url = tools.formatUrl(event.activity.wechat_url)
            if (url != null) {
                wx.request({
                    url: url,
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res) {
                        let html = res.data
                        event.activity.image = tools.parseHTML(html, "msg_cdn_url")
                        console.log(event)
                        that.setData({
                            list
                        })
                    }
                })
            }
        })
    },
    getWindowSize: function() {
        const that = this;
        wx.getSystemInfo({
            success: function(res) {
                var windowSize = {
                    width: res.windowWidth,
                    height: res.windowHeight
                }
                that.setData({
                    windowSize
                })
            }
        })
    },
    getMyProfile: function() {
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/organizations',
            data: {},
            method: 'GET',
            success: function(res) {
                let data = res.data.data
                let id = that.data.organizationID
                let org = undefined
                    //console.log(data)
                data.forEach(ele => {
                    //console.log(ele)
                    if (ele.id == id.toString()) {
                        org = ele
                        org.honor = "中山大学优秀社团"
                        org.logo_url = app.globalData.defaultAvatar
                        org.background = app.globalData.defaultBackground
                    }
                });
                if (org === undefined) {
                    console.log(org)
                    org = ORGANIZATION_SAMPLE
                }
                console.log(org)
                let user = org
                that.setData({
                    user
                })
                that.getActivity();
                that.getAlbum();
                //console.log(that.data.user)
            }
        })
        const app = getApp();
        let Avatar = app.globalData.defaultAvatar;

        this.setData({
            voteIcon: VOTE_ICON,
            commentIcon: COMMENT_ICON,
            heartIcon: HEART_ICON,
            locationIcon: ADDRESS_ICON,
            apartmentIcon: SECTION_ICON,
            honorIcon: HONOR_ICON,
            arrowIcon: ARROW_ICON,
            attentionIcon: ATTENTION_ICON,
            voteIcon: VOTE_ICON,
            commentIcon: COMMENT_ICON,
            heartIcon: HEART_ICON,
            //avatar: Avatar

        })
    },
    getActivity: function() {
        this.data.user.activity = ACTIVITY_SAMPLE;
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
    getRegistrations: function() {
        //var temp = REGISTRATION_SAMPLE;
        var i;

        for (var index in REGISTRATION_SAMPLE) {
            var str = REGISTRATION_SAMPLE[index].endTime;
            var month;
            var day;
            for (var j in str) {
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
            if (curMonth > month) {
                i = 1;
            }
            if (curMonth == month && curDay > day) {
                i = 1;
            }
            if (curMonth == month && curDay <= day) {
                i = 0;
            }
            if (curMonth < month) {
                i = 0;
            }
            if (i == 1) {
                REGISTRATION_SAMPLE[index].past = true;
            } else {
                REGISTRATION_SAMPLE[index].past = false;
            }
        }

        this.setData({
            registrations: REGISTRATION_SAMPLE
        })
    },
    getManagers: function() {
        this.setData({
            managers: MANAGERS_SAMPLE
        })
    },
    getMembers: function() {
        this.setData({
            members: MEMBERS_SAMPLE
        })
    },
    clickActivity: function() {
        let activityid = 1;
        let url = `../../activities/activity_detail/index?activityid=${activityid}`
        wx.navigateTo({
            url: url
        })
    },
    albumClickActivity: function(e) {
        var Name = e.currentTarget.dataset.value;
        var photos = [];
        for (var index in e.currentTarget.dataset.photos) {
            photos.push(e.currentTarget.dataset.photos[index].image);
            photos.push('~');
        }
        let albumid = 1;
        let url = `../../homepage_of_others/organization_album/index?albumid=${albumid}&title=${Name}&photos=${photos}`
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

        var momentLikersIds = moment.likers.map(liker => { return liker.id })
        var indexOfUserId = momentLikersIds.indexOf(user.id)
        if (indexOfUserId >= 0) {
            // TODO: be real
            moment.likers.splice(indexOfUserId, 1);
            wx.showToast({
                title: '赞-1',
                icon: 'success',
                duration: 500
            })
        } else {
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
    "id": 100021,
    "name": "中大武侠文化协会",
    "phone": "100021",
    "password": "",
    "college": "中山大学",
    "college_district": "东校区",
    "logo_url": app.globalData.defaultAvatar,
    "description": "",
    "honor": "中山大学优秀社团",
    background: app.globalData.defaultBackground
}

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

const ALBUM_SAMPLE = [{
        name: "默认相册",
        photos: [{
                id: "",
                image: app.globalData.defaultPhotos[0]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[1]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[2]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[3]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[4]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[5]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[6]
            },
            {
                id: "",
                image: app.globalData.defaultPhotos[7]
            }
        ],
    },
    /*{
        name: "致青春定向越野",
        photos: [{
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
    },*/
]

const REGISTRATION_SAMPLE = [{
        id: "",
        name: "维纳斯歌手大赛",
        image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
        status: 0,
        startTime: "4月15日",
        endTime: "5月30日",
        location: "梁銶琚堂",
        past: false,
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
        past: false,
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
        image: "https://i.loli.net/2018/03/13/5aa7c647839fc.png",
        status: 2,
        startTime: "4月15日",
        endTime: "4月16日",
        location: "梁銶琚堂",
        past: true,
        hosts: [{
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

const defaultAvatar = app.globalData.defaultAvatar;
const defaultBackground = app.globalData.defaultBackground;
const MANAGERS_SAMPLE = [{
        id: "",
        avatar: defaultAvatar,
    },

]

const MEMBERS_SAMPLE = [{
        id: "",
        avatar: defaultAvatar,
    },
    {
        id: "",
        avatar: defaultAvatar,
    },
    {
        id: "",
        avatar: defaultAvatar,
    },
    {
        id: "",
        avatar: defaultAvatar,
    },
    {
        id: "",
        avatar: defaultAvatar,
    },
]