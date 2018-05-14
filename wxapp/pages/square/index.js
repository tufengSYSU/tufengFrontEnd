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
        user: null,
        bar: ["蜂动态", "社团墙"],
        tabIndex: 0,
        searchValue: '',
        voteIcon: "../../assets/myprofile_icon/vote.png",
        commentIcon: "../../assets/myprofile_icon/comment.png",
        heartIcon: "../../assets/myprofile_icon/heart.png",
        arrowIcon: "../../assets/myprofile_icon/organization/arrow.png",
        searchIcon: "../../assets/icon/search.png",
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
        this.getMoments();
        this.getConcerns();
        this.getMyOrganizaion();
        this.getNearbyOrganization();
        const previousMargin = (this.data.windowSize.width - 220) / 2 - 10;
        const nextMargin = previousMargin;
        this.setData({
            previousMargin,
            nextMargin
        })
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
        var user = {};
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
    getMoments: function() {
        let moments = MOMENTS_SAMPLE;
        this.setData({
            moments
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
        user.privilige = [];
        //var privilige[];
        for (var index in MY_ORGANIZATION_SAMPLE) {
            var i = MY_ORGANIZATION_SAMPLE[index].occupation.indexOf(" ");
            var temp = MY_ORGANIZATION_SAMPLE[index].occupation.substring(i + 1);
            if (temp != "干事") {
                user.privilige.push(true);
            } else {
                user.privilige.push(false);
            }
        }

        this.setData({
            user
        })
    },

    getNearbyOrganization: function() {
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/organizations',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                let data = res.data.data
                data.forEach((org) => {
                    org.logo_url = app.globalData.defaultAvatar
                    org.searchFlag = 1
                })
                that.setData({
                    nearbyOrganization: data
                })
            }
        })
        let user = this.data.user;
        user.nearbyOrganization = NEARBY_ORGANIZAION_SAMPLE;
        this.setData({
            user
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
        console.log(organizationId)
        let url = `../homepage_of_others/organization/index?id=${organizationId}`
        wx.navigateTo({
            url: url
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
        var t = e.currentTarget.dataset.text;
        if (t == "信息维护") {
            wx.navigateTo({
                url: "../square/news/index"
            })
        }
        if (t == "启动报名") {
            wx.navigateTo({
                url: "../square/enroll/index"
            })
        }
    }
})

const HOT_SAMPLE = [{
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    },
    {
        id: "",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
    }
]

const MOMENTS_SAMPLE = [{
        id: "1",
        author: {
            name: "张剑",
            avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
        },
        date: new Date(2018, 1, 2),
        content: "乘着旧日的叮叮电车 寻觅温暖旧情怀 Encore维纳斯歌友会 逆时而上 再现那些声音的传奇",
        images: ["https://i.loli.net/2018/02/28/5a960c61ee6b5.png"],
        forward: null,
        likers: [{
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
        comments: [{
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
        author: {
            name: "张剑",
            avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
        },
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
        likers: [{
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
        comments: [{
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
    id: "",
    name: "中东广播台",
    occupation: "资讯部 部长",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
    numberOfMessages: 7
}]

const NEARBY_ORGANIZAION_SAMPLE = [{
        id: "",
        name: "中东广播台",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
        searchFlag: true,
    },
    {
        id: "",
        name: "中东足协",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
        searchFlag: true,
    },
    {
        id: "",
        name: "张剑粉丝团",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
        searchFlag: true,
    },
    {
        id: "",
        name: "diss张剑团",
        avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
        searchFlag: true,
    },
]

var KEYS = [
    "name",
]