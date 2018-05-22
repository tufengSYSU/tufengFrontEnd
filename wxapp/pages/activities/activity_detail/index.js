/**
 * @file homepage/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const ASSETS = "../../../assets"
const data = require('./defaultData.js')
const tools = require('../tools.js')
var app = getApp()

// 动态图标
const VOTE_ICON = ASSETS + "/homepage_of_others_icon/vote.png"
const COMMENT_ICON = ASSETS + "/homepage_of_others_icon/comment.png"
const HEART_ICON = ASSETS + "/homepage_of_others_icon/heart.png"
const ADDRESSLIST_ICON = ASSETS + "/homepage_of_others_icon/person.png"

// 活动图标
const SIGNED_ICON = ASSETS + "/homepage/signed.png"
const PROCESSING_ICON = ASSETS + "/homepage/processing.png"
const FINISHED_ICON = ASSETS + "/homepage/finished.png"

const PHOTO_ICON = ASSETS + "/homepage/photo.png"

// TODO: 如果是传值进来的

Page({
    data: {
        user: null,
        tabs: ["时间轴", "相册", "简介", "大家问"],
        tabIndex: 0,
        reachTop: false,
        images: [
            "https://i.loli.net/2018/02/28/5a960c61ee6b5.png",
        ],
        Comment: "",
        defaultTitle: "尚未录入推送信息",
        defaultImage: app.globalData.defaultPhotos[0],
        nameMap: ["体育", "公益（一般为公益时）", "奖金", "其他奖励"],
        tabsBackground: app.globalData.tabsBackground
    },
    onLoad: function(option) {
        console.log(option)
        if (option.data) {
            var activity = JSON.parse(option.data)
            console.log(activity)
            this.setData({
                activityid: activity.id
            })
            if (activity.roll === true) {
                this.setData({
                    roll: true
                })
            }
            console.log(option)
        } else {
            this.setData({
                activity: data.activity
            })
        }
        console.log(this.data.activityid)
        this.getMyProfile()
        this.getIcons()
        this.getScreenData()
    },
    getMyProfile: function() {
        var id = this.data.activityid;
        if (!this.data.activity && id) {
            var that = this
            wx.request({
                url: `https://ancestree.site/api/activities?actid=${id}`,
                methon: "GET",
                success: function(res) {
                    let data = res.data.data
                    console.log(data)
                    let activity = data.activity
                    activity.comments = []
                    activity.stages = data.activity_stages
                    that.setData({
                        activity
                    })
                    that.getOrganization();
                    that.setDateForActivity();
                    that.setActivityParts();
                    that.getArticles();
                    if (that.data.roll === true)
                        that.navigateToWebView();
                },
                fail: function(res) {
                    that.setData({
                        activity: data.activity
                    })
                }
            })
        }
        var user = USER_SAMPLE;
        this.setData({
            user
        })
    },
    getOrganization: function() {
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/organizations',
            method: 'GET',
            success: function(res) {
                let organizations = res.data.data
                let activity = that.data.activity
                let id = activity.organization_id
                var org = []
                for (var i in organizations) {
                    if (organizations[i].id === id) {
                        organizations[i].logo_url = "https://i.loli.net/2018/02/28/5a95a3730ee1a.png"
                        org.push(organizations[i])
                        break
                    }
                }
                that.setData({
                    organization: org
                })
            }
        })
    },
    setDateForActivity: function() {
        let activity = this.data.activity
        activity.stages.map((stage) => {
            if (!activity.starttime) {
                activity.start_time = stage.start_time
                activity.end_time = stage.end_time
            } else {
                activity.start_time = activity.start_time > stage.start_time ? stage.start_time : activity.start_time
                activity.end_time = activity.end_time > stage.end_time ? activity.end_time : stage.end_time
            }
        })
        let s = new Date(activity.start_time)
        let e = new Date(activity.end_time)
        activity.startTime = (s.getMonth() + 1) + "月" + (s.getDate() + "日") + (s.getHours() + "点")
        activity.endTime = (e.getMonth() + 1) + "月" + (e.getDate() + "日") + (e.getHours() + "点")
        this.setData({
            activity
        })
    },
    setActivityParts: function() {
        let activity = this.data.activity
        let parts = []
        let leftSideBox = []
        var that = this
        activity.stages.forEach((stage) => {
            let item1 = {
                name: stage.content,
                location: stage.location.slice(0, 8),
                time: stage.start_time,
                normalTime: that.getNormalTime(new Date(stage.start_time)),
                id: stage.id
            }
            let item2 = {
                name: stage.content + "结束",
                location: stage.location.slice(0, 8),
                time: stage.end_time,
                normalTime: that.getNormalTime(new Date(stage.end_time)),
                id: stage.id
            }
            if (stage.content.search("报名") != -1) {
                let box = that.buildLeftSideBox(stage)
                box.signup_url = stage.signup_url
                leftSideBox.push(box)
                item1.mark = 1
            }
            parts.push(item1)
            parts.push(item2)
        })
        parts.sort(this.sortParts)
        this.setData({
            parts
        })
        this.setDataForLeftSideBox(leftSideBox);
    },
    getArticles: function() {
        let activity = this.data.activity
        let articles = []
        var that = this
        if (activity.wechat_url != "") {
            console.log(activity.wechat_url)
            wx.request({
                url: tools.formatUrl(activity.wechat_url),
                success: function(res) {
                    try {
                        let data = res.data
                        let article = {}
                        article.title = tools.parseHTML(data, "msg_title");
                        article.image = tools.parseHTML(data, "msg_cdn_url");
                        if (article.image != null && article.image != "") {
                            that.data.activity.image = article.image
                        } else {
                            that.data.activity.image = defaultImage
                        }
                        that.setData({
                            activity: that.data.activity
                        })
                        article.starttime = activity.startTime
                        article.endtime = activity.endTime
                        article.wechat_url = activity.wechat_url
                        article.publish_time = tools.parseHTML(data, "publish_time").slice(0, 10);
                        console.log(article)
                        articles.push(article)
                        that.setData({
                            articles
                        })
                    } catch (e) {
                        console.log(e)
                    }
                },
                fail: function(res) {
                    console.log(res)
                }
            })
        }
    },
    getNormalTime: function(date) {
        return (date.getMonth() + 1) + "月" + (date.getDate() + "日") + (date.getHours() + "点")
    },
    sortParts: function(a, b) {
        return a.time > b.time
    },
    buildLeftSideBox: function(stage) {
        let item = {
            id: stage.id,
            name: "报名",
            count: 0,
            index1: -1,
            index2: -1,
            top: 0, // 距离报名开始节点的高度
            left: 90,
            width: 0,
            deg1: 0,
            deg2: 0,
        }
        console.log(item)

        return item;
    },
    setDataForLeftSideBox: function(leftSideBox) {
        var that = this
        leftSideBox.forEach((box) => {
            let indexs = that.findIndexOfPart(box.id)
            box.index1 = indexs[0]
            box.index2 = indexs[1]
            box.count = box.index2 - box.index1
            box.top = box.index1 * 100 + box.count * 50 + 10
            box.left = 90
            box.width = Math.round(Math.sqrt(box.count * 50 * box.count * 50 + 1936))
            box.deg1 = (-1) * Math.round(Math.atan(box.count * 50 / 44) * 180 / Math.PI)
            box.deg2 = (-1) * box.deg1
        })

        this.setData({
            leftSideBox
        })
    },
    findIndexOfPart: function(id) {
        let parts = this.data.parts
        let indexs = []
        parts.forEach((part, index) => {
            if (part.id === id) {
                indexs.push(index)
            }
        })
        return indexs
    },
    getIcons: function() {
        this.setData({
            voteIcon: VOTE_ICON,
            commentIcon: COMMENT_ICON,
            heartIcon: HEART_ICON,
            addressListIcon: ADDRESSLIST_ICON,
            photoIcon: PHOTO_ICON,
        })
    },
    clickTab: function(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            tabIndex: index
        })
    },
    clickActTab: function(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            actTabIndex: index
        })
    },
    renameFilePath: function(path) {
        path = path.replace(/\?/g, "abcd")
        return path
    },
    rollToWebview: function(e) {
        if (e.currentTarget.dataset.url != "") {
            var parseUrl = e.currentTarget.dataset.url.split("/")
            console.log(parseUrl)
            var url = "https://ancestree.site/html/posts/" + this.renameFilePath(parseUrl[parseUrl.length - 1]) + ".html";
            console.log(url)
            wx.navigateTo({
                url: `../articles_webview/index?url=${url}&test=` + parseUrl[parseUrl.length - 1],
            })
        }
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
        if (reachTop === true && e.detail.scrollHeight - e.detail.scrollTop >= windowSize.height + 60) {
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
    commentInput: function(e) {
        this.setData({
            Comment: e.detail.value
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
    },
    // 相册相关
    chooseImage: function() { // 添加商品图片
        var that = this;
        wx.chooseImage({
            // count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var images = that.data.images;
                images = images.concat(res.tempFilePaths);
                that.setData({
                    images
                })
            }
        })
    },
    onShareAppMessage: function(res) {
        let activity = { id: this.data.activityid, roll: true }
        let str = JSON.stringify(activity)
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '快来看看校园活动的主页吧！',
            path: '/pages/activities/activity_detail/index?data=' + str
        }
    },
    previewImage: function(e) {
        var that = this;
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: that.data.images // 需要预览的图片http链接列表
        })
    },
    navigateToWebView: function() {
        let url = this.data.activity.live_url
        wx.navigateTo({
            url: './photolives_webview/index?url=' + url,
        })
    },
    postComment: function() {
        var comment = this.data.Comment;
        var date = new Date();
        let item = {
            user: USER_SAMPLE,
            commentTime: (date.getMonth() + 1) + "月" + (date.getDate()) + "日",
            content: comment
        }
        this.data.activity.comments.push(item)
        this.setData({
            activity: this.data.activity
        })
    }
})


// the sample data
const USER_SAMPLE = {
    id: "123",
    background_image: "https://i.loli.net/2018/02/28/5a95a34b851ea.png",
    avatar: "https://i.loli.net/2018/02/28/5a95a3730ee1a.png",
    name: "李三",
    gender: "male",
    description: "半透明的影子，是流动的风",
    info: {
        personal_info: "广东 广州 双子座",
        school: "中山大学 2017级 传播与设计学院",
        contact: "QQ/WeChat/eMail",
        hobbies: ["摄影", "演唱", "足球"],
    },
    organizations: ["中珠广播台", "足协"]
}

const ARTICLE_SAMPLE = [{
        image: "http://mmbiz.qpic.cn/mmbiz_jpg/bXxPI5a0rKGjCepumu03QyxicicUaCiacy3iap3dbcsTNCsrR8LX6aTuo8usvvIbBTp8eIeXicfwhqYKMDiceUgH9Iog/0?wx_fmt=jpeg",
        title: "维纳斯",
        starttime: "4月15日",
        endtime: "5月20日",
        location: "梁球锯堂"
    },
    {
        image: "http://mmbiz.qpic.cn/mmbiz_jpg/bXxPI5a0rKGjCepumu03QyxicicUaCiacy3iap3dbcsTNCsrR8LX6aTuo8usvvIbBTp8eIeXicfwhqYKMDiceUgH9Iog/0?wx_fmt=jpeg",
        title: "维纳斯",
        starttime: "4月20日",
        endtime: "5月25日",
        location: "小礼堂"
    }
]