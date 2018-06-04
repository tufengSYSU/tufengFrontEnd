var app = getApp()
const ASSETS = "../../assets/plaza_icon";
const MESSAGE_ICON = ASSETS + "/message.png";
const PUSH_ICON = ASSETS + "/push.png";
const LOCATION_ICON = ASSETS + "/location.png";
const LABEL_ICON = ASSETS + "/label.png";
const MOMENTS_ICON = ASSETS + "/moments.png";
const SETTING_ICON = ASSETS + "/setting.png";
const PHOTO_ICON = ASSETS + "/photo.png";
const YELLOWPAGE_ICON = ASSETS + "/yellowpage.png";


Page({
    data: {
        user: app.globalData.user,
        bar: ["蜂动态", "社团墙"],
        tabIndex: 0,
        searchValue: '',
        voteIcon: "../../assets/myprofile_icon/vote.png",
        commentIcon: "../../assets/myprofile_icon/comment.png",
        heartIcon: "../../assets/myprofile_icon/heart.png",
        arrowIcon: "../../assets/myprofile_icon/organization/arrow.png",
        searchIcon: "../../assets/icon/search.png",
        currentPage: 0,
    },
    onLoad: function() {
        // wx.request({
        //   url: `https://ancestree.site/api/users/${data.id}`,
        //   data
        //   success: function(res) {
        //
        //   }
        // })
        this.getScreenData();
        this.getHotSample();
        this.getIcon();
        this.getConcerns();
        this.getMyOrganization();
        this.getNearbyOrganization();
        const previousMargin = (this.data.windowSize.width - 220) / 2 - 10;
        const nextMargin = previousMargin;
        this.setData({
            previousMargin,
            nextMargin
        })
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '快来看看中大社团的主页吧！',
            path: '/pages/square/index'
        }
    },
    switchTab: function() {
        wx.switchTab({
            url: "/pages/myprofile/index"
        })
    },
    getScreenData: function() {
        var that = this;
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
    getHotSample: function() {
        var user = USER_SAMPLE;
        user.recommend = HOT_SAMPLE;
        this.setData({
            user
        })
    },
    getIcon: function() {
        let user = this.data.user;
        user.location = LOCATION_ICON;
        user.label = LABEL_ICON;
        user.photo = PHOTO_ICON;
        user.organizationIcon = [{
                text: "信息维护",
                avatar: MESSAGE_ICON
            },
            {
                text: "编辑推送",
                avatar: PUSH_ICON
            },
            {
                text: "发布活动",
                avatar: MOMENTS_ICON
            },
            {
                text: "启动报名",
                avatar: SETTING_ICON
            },
            {
                text: "相关设置",
                avatar: YELLOWPAGE_ICON
            }
        ]
    },
    getConcerns: function() {
        let user = this.data.user;
        user.concerns = CONCERN_SAMPLE;
        this.setData({
            user
        })
    },
    getMyOrganization: function() {
        var that = this
        let user = this.data.user;
        let url = "https://ancestree.site/api/users/" + user.id + "/organizations"
        wx.request({
            url: url,
            method: 'GET',
            success: function(res) {
                user.myOrganization = res.data.data
                that.setData({
                    user
                })
                if (that.data.nearbyOrganization != undefined) {
                    that.getMyOrganizationById()
                }
            }
        })
    },
    getMyOrganizationById: function() {
        let nearbyOrganization = this.data.nearbyOrganization;
        let myOrg = this.data.user.myOrganization;
        nearbyOrganization.forEach((org) => {
            myOrg.forEach((ownOrg) => {
                if (ownOrg.organization_id === org.id) {
                    Object.assign(ownOrg, org)
                    console.log(ownOrg)
                }
            })
        })
        console.log(myOrg)
        this.data.user.myOrganization = myOrg
        this.setData({
            user: this.data.user
        })
    },
    getNearbyOrganization: function() {
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/organizations',
            data: {},
            method: 'GET',
            success: function(res) {
                let data = res.data.data
                data.forEach((org) => {
                    org.logo_url = app.globalData.defaultAvatar
                    org.searchFlag = 1
                })
                that.setData({
                    nearbyOrganization: data
                })
                if (that.data.user.myOrganization != undefined) {
                    that.getMyOrganizationById();
                }
            },
        })
    },
    clickSearchTab: function() {
        var reg = new RegExp(this.data.searchValue)
        var keys = KEYS
        let user = this.data.user;
        user.nearbyOrganization = NEARBY_ORGANIZAION_SAMPLE;
        keys.forEach(k => {
            for (var actKey in user.nearbyOrganization) {
                console.log(user.nearbyOrganization[actKey][k])
                if (user.nearbyOrganization[actKey][k] && user.nearbyOrganization[actKey][k].toString().match(reg)) {
                    user.nearbyOrganization[actKey].searchFlag = true
                } else {
                    user.nearbyOrganization[actKey].searchFlag = false
                }
            }
        });
        this.setData({
            user
        })
    },
    searchInput: function(e) {
        var value = e.detail.value;
        this.setData({
            searchValue: value
        })
    },
    clickOrganizationTab: function(e) {
        let organizationId = e.currentTarget.dataset.id;
        let url = `../homepage_of_others/organization/index?id=${organizationId}`
        wx.navigateTo({
            url: url
        })
    },
    getIDValue: function(e) {
        count = e.currentTarget.dataset.count
        this.setData({
            count
        })
    },

    getOrganizationID: function(e) {
        var organizationID = this.data.user.myOrganization[this.data.currentPage].id;
        //console.log(organizationID)
        this.setData({
            organizationID
        })

    },

    clicktab: function(e) {
        let tabIndex = (e.currentTarget.dataset.index === this.data.tabIndex ? this.data.tabIndex : e.currentTarget.dataset.index);
        this.setData({
            tabIndex
        })
    },

    changePage: function(e) {
        let text = e.currentTarget.dataset.text;
        console.log(e)
        wx.navigateTo({
            url: "settings/index"
        })
    },
    rollToHomepageOfOthers: function() {
        wx.navigateTo({
            url: "../homepage_of_others/index"
        })
    },
    rollTo: function(e) {
        console.log(e)
        var t = e.currentTarget.dataset.text;
        var id = e.currentTarget.dataset.id;
        if (t == "信息维护") {
            wx.navigateTo({
                url: `./news/index?organizationid=${id}`
            })
        }
        if (t == "启动报名") {
            let url = `./enroll/index?organizationid=${id}`
            wx.navigateTo({
                url: url
            })
        }
        if (t == "发布活动") {
            //console.log(this.data.organizationID)
            let url = `./push/index?organizationid=${id}`
            wx.navigateTo({
                url: url
            })
        }

    }
})

const USER_SAMPLE = {
    astrology: "",
    avatar_url: "",
    background_url: "",
    camera: "",
    city_id: 1,
    college: "中山大学",
    college_district: "南校园",
    create_time: "2018-05-19T00:31:17+08:00",
    description: "",
    email: "",
    enroll_time: 0,
    id: 1,
    institute: "",
    nickname: "",
    openid: "oKIqG5J56HMa8xey_Xr_rW_oU1Io",
    password: "319f4d26e3c536b5dd871bb2c52e3178",
    phone: "",
    qq: "",
    username: "",
    vip: 0
}

const HOT_SAMPLE = [{
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    },
    {
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    }
]

const CONCERN_SAMPLE = [{
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    },
    {
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    }
]

const MY_ORGANIZATION_SAMPLE = [{
    id: 100066,
    name: "中东广播台",
    occupation: "资讯部 部长",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
    numberOfMessages: 7
}]

var KEYS = [
    "name",
]