/**
 * @file 推送+页面交互逻辑
 * @author bravos
 */

//  TODO: 请求社团名字加入活动卡片中
//  TODO: swiper 无缝切换
//  TODO: 已阅读活动, 加标志位
//  TODO: 函数解隅
//  TODO: 顶部栏信息做成可向右滑动

const app = getApp()
const tools = require('./tools.js')
const ASSETS = "../../assets/"
const LOCATION_ICON = ASSETS + "icon/location.png"
const SEARCH_ICON = ASSETS + "icon/search.png"
const AIXIN_ICON = ASSETS + "icon/mark/aixin.png"
const BALL_ICON = ASSETS + "icon/mark/ball.png"
const MONEY_ICON = ASSETS + "icon/mark/money.png"
const IMAGE_URL_PREFIX = "https://ancestree.site/posts/assets/images"

Page({
    data: {
        userInfo: undefined,
        windowWidth: 0,
        searchKey: "",
        // 轮播图片的路径 使用每天的第一篇推送来做
        // 每篇推送是否已阅览
        visited: [],
        subTab: ["推送+", "我看过", "公益", "文娱"],
        currentTab: 0,
        currentDate: "4月29日"
    },
    /**
     * 初始化数据
     */
    onLoad: function() {
        // 两个请求
        this.getLocation();
        this.getIcons();
        this.getWindowSize();
        this.setDateFormat();
        this.getArticlesInOneMonth();
        this.getFunction();
    },
    swiperChange: function(e) {
        console.log(e.detail.current)
    },
    getFunction: function() {
        this.formatUrl = tools.formatUrl;
        this.parseHTML = tools.parseHTML;
    },
    getIcons: function() {
        this.setData({
            locationIcon: LOCATION_ICON,
            searchIcon: SEARCH_ICON,
            aixinIcon: AIXIN_ICON,
            ballIcon: BALL_ICON,
            moneyIcon: MONEY_ICON
        })
        this.setData({
            defaultTitle: "中大图峰",
            defaultImage: "https://i.loli.net/2018/04/17/5ad5f1e0c85cc.png"
        })
    },
    getWindowSize: function() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                let windowSize = {
                    width: res.windowWidth,
                    height: res.windowHeight
                }
                that.setData({
                    windowSize
                })
            }
        })
    },
    getArticlesInOneMonth: function() {
        let date = new Date().format();
        var that = this;
        //console.log(date)
        wx.request({
            url: "https://ancestree.site/api/activity_stages",
            data: {
                one_day_in_that_month: date
            },
            success: function(res) {
                let stages = res.data.data
                that.setData({
                    articlesInOneMonth: stages
                })
                that.getArticlesInfo();
            }
        })
    },
    getArticlesInfo: function() {
        var that = this;
        var articlesInOneMonth = this.data.articlesInOneMonth;
        var count = 0;
        this.getArticlesCounts();
        var article = articlesInOneMonth.map((articlesInOneDay) => {
            articlesInOneDay.map((article) => {
                let url = that.formatUrl(article.activity.wechat_url);
                wx.request({
                    url: url,
                    success: function(res) {
                        let data = res.data
                        article.title = that.parseHTML(data, "msg_title");
                        article.image = that.parseHTML(data, "msg_cdn_url");
                        article.publish_time = that.parseHTML(data, "publish_time").slice(0, 10);
                        if (article.title === that.data.defaultTitle) {
                            console.log(article.id + " ")
                        }
                        that.setData({
                            articlesInOneMonth
                        })
                    },
                    fail: function(res) {
                        article.title = that.data.defaultTitle
                        article.image = that.data.defaultImage
                        that.setData({
                            articlesInOneMonth
                        })
                    },
                    complete: function() {
                        count++;
                        if (count === that.data.articlesCounts) {
                            that.setInfoToActivities();
                            that.setData({
                                articlesInOneMonth: that.data.articlesInOneMonth.reverse()
                            })
                            console.log(that.data.articlesInOneMonth)
                        }
                    }
                })
            })
            return articlesInOneDay;
        })
    },
    setInfoToActivities: function(article) {
        var that = this;
        let articlesInOneMonth = this.data.articlesInOneMonth;
        let month = (new Date()).getMonth() + 1;
        var posters = []
        var activities = {}
        var newArticles = articlesInOneMonth.map((articles, index) => {
            let newObject = {}
            newObject.articlesInOneDay = articles.map((article) => {
                // format date
                that.formatDateForArticles(article)
                    // get Slide Poster
                that.getPosterAndActivities(posters, activities, article)
                return article;
            });
            newObject.date = month + "月" + (index + 1) + "日";
            return newObject;
        })
        this.setData({
            articlesInOneMonth: newArticles,
            posters,
            activities
        })
    },
    // 跳转到活动主页
    getPosterAndActivities: function(posters, activities, article) {
        let item = {
            activity_id: article.activity.id,
            image: article.image
        }
        let act = article.activity
        act.image = article.image
        act.location = article.location
        act.short_name = tools.removeQuotation(act.short_name)
        this.setTypeToActivity(act);
        act.starttime = article.starttime
        act.endtime = article.endtime
        if (activities[(act.id)]) {
            let originActivity = activities[(act.id).toString()]
            act.starttime = (originActivity.starttime < act.starttime ? originActivity.starttime : act.starttime)
            act.endtime = (originActivity.endtime > act.endtime ? originActivity.endtime : act.endtime)
        }
        activities[(act.id).toString()] = act;
        if (tools.findRelativePoster(posters, item) === false) {
            //console.log("Push")
            posters.push(item)
        }
    },
    setTypeToActivity: function(act) {
        if (tools.removeQuotation(act.sports_medals) != "无")
            act.type = 0;
        else if (tools.removeQuotation(act.public_service_hours) != "无")
            act.type = 1;
        else if (tools.removeQuotation(act.prize) != "无")
            act.type = 2;
        else
            act.type = 0;
    },
    getArticlesCounts: function() {
        var articlesInOneMonth = this.data.articlesInOneMonth;
        var articlesCounts = articlesInOneMonth.reduce(function(pre, cur, index, array) {
            if (index === 0)
                return pre.length + cur.length
            else
                return pre + cur.length;
        }, []);
        this.setData({
            articlesCounts
        })
    },
    formatDateForArticles: function(article) {
        article.starttime = tools.formateDateToRegularForm(article.start_time)
        article.endtime = tools.formateDateToRegularForm(article.end_time)
    },
    setDateFormat: function() {
        Date.prototype.format = function() {
            let year = this.getFullYear();
            let month = this.getMonth() + 1;
            let day = this.getDate();
            month = (month >= 10) ? month.toString() : "0" + month
            day = (day >= 10) ? day.toString() : "0" + day
            let str = year + "-" + month + "-" + day;
            return str.substr(2);
        }
    },
    rollToActivityDetails: function(e) {
        wx.navigateTo({
            url: './activity_detail/index',
        })
    },
    changeCurrentTap: function(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    rollToWebview: function() {
        console.log("roll")
        wx.navigateTo({
            url: './articles_webview/index',
        })
    },
    rollToSearchView: function(e) {
        var data = this.data.activities;
        for (var key in data) {
            app.globalData.activitiesImages.push(data[key].image)
            app.globalData.activitiesWechatUrl.push(data[key].wechat_url)
            data[key].image = ""
            data[key].wechat_url = ""
        }
        console.log(data)
        wx.navigateTo({
            url: './search_view/index?data=' + JSON.stringify(data),
        })

        var count = 0;
        for (var key in data) {
            data[key].image = app.globalData.activitiesImages[count]
            data[key].wechat_url = app.globalData.activitiesWechatUrl[count]
            count++;
        }
    },
    /**
     * 获取当前位置
     */
    getLocation: function() {
        var that = this
        var locationString = ""
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                let location = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    address: "中山大学"
                }
                that.setData({
                    location
                })
                locationString = res.latitude + "," + res.longitude
                that.requestAddress(locationString)
            }
        })
    },
    /**
     * 根据经度纬度获取当前位置的中文描述
     * @param {string} str 包含经度 纬度的字符串
     */
    requestAddress: function(str) {
        var that = this
        wx.request({
            url: "https://apis.map.qq.com/ws/geocoder/v1/",
            data: {
                "key": "6UVBZ-LUKLU-3ZRV7-BUDEO-SZJCZ-CQBN4",
                "location": str
            },
            methon: "GET",
            success: function(res) {
                let location = that.data.location
                location.address = res.data.result.address_component.city
                that.setData({
                    location
                })
                console.log("请求地址为：" + that.data.location.address)
            },
        })
    },
    /**
     * 把对应的推送设为已浏览
     * @param {object} e 触发事件
     */
    makeVisited: function(e) {
        var index = e.currentTarget.dataset.index
        this.data.visited[index] = 1
        console.log(index)
        this.setData({
            visited: this.data.visited
        })
    }
})


// wxcf38b0daff83a060