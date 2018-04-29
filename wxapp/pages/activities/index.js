/**
 * @file 推送+页面交互逻辑
 * @author bravos
 */

//  TODO: 抓取推送日期并加到推送卡片上
const app = getApp()
const tools = require('./tools.js')
const ASSETS = "../../assets/"
const LOCATION_ICON = ASSETS + "icon/location.png"
const SEARCH_ICON = ASSETS + "icon/search.png"
const AIXIN_ICON = ASSETS + "icon/mark/aixin.png"
const BALL_ICON = ASSETS + "icon/mark/ball.png"
const MONEY_ICON = ASSETS + "icon/mark/money.png"

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
                that.getPhoto();
            }
        })
    },
    getPhoto: function() {
        var that = this;
        var articlesInOneMonth = this.data.articlesInOneMonth;
        var count = 0;
        var article = articlesInOneMonth.map((articlesInOneDay, index) => {
            articlesInOneDay.map((article, index) => {
                //console.log(count)
                let url = that.formatUrl(article.activity.wechat_url);
                //console.log(stage.id + " " + stage.activity.wechat_url + " " + url)
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
                        //console.log(count)
                        if (count === 42) {
                            that.setDateToActivities();
                            that.setData({
                                articlesInOneMonth: that.data.articlesInOneMonth.reverse()
                            })
                            that.getPostUrl();
                            that.formatDateForarticles();
                        }
                        //console.log(that.data.stages)
                    }
                })
            })
            return articlesInOneDay;
        })
    },
    // 跳转到活动主页
    getPostUrl: function() {
        let articlesInOneMonth = this.data.articlesInOneMonth;
        let posters = []
        for (let i in articlesInOneMonth) {
            let articlesInOneDay = articlesInOneMonth[i].articlesInOneDay
            articlesInOneDay.forEach((article) => {
                let item = {
                    activity_id: article.activity.id,
                    image: article.image
                }
                console.log(tools.findRelativePoster(posters, item))
                if (tools.findRelativePoster(posters, item) == false) {
                    //console.log("Push")
                    posters.push(item)
                }
            })
        }
        this.setData({
            posters
        })
        console.log(posters);
    },
    formatDateForarticles: function() {
        let articlesInOneMonth = this.data.articlesInOneMonth;
        articlesInOneMonth.map((articlesItem) => {
            articlesItem.articlesInOneDay.map((article) => {
                article.starttime = tools.formateDateToRegularForm(article.start_time)
                article.endtime = tools.formateDateToRegularForm(article.end_time)
            })
        })
        this.setData({
            articlesInOneMonth
        })
    },
    setDateToActivities: function() {
        let articlesInOneMonth = this.data.articlesInOneMonth;
        //console.log(stages)
        let month = (new Date()).getMonth() + 1;
        var newArticles = articlesInOneMonth.map((articles, index) => {
            let newObject = {}
            newObject.articlesInOneDay = articles.map((activity) => {
                return activity;
            });
            newObject.date = month + "月" + (index + 1) + "日";
            return newObject;
        })
        this.setData({
                articlesInOneMonth: newArticles
            })
            //console.log(this.data.stages)
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
    showSearchBar: function(e) {
        console.log(e)
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
     * 得到搜索框输入
     * @param {object} e 触发事件
     */
    getSearchInput: function(e) {
        this.setData({
            searchKey: e.detail.value
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
    },
    navigateToActivityDetail: function(e) {
        wx.navigateTo({
            url: 'articles_webview/index' // will be some other data
        })
    }
})

const ARTICLES_SAMPLE = [{
        id: 0,
        date: "2月7号",
        article: [{
            id: 0,
            image: "https://i.loli.net/2018/02/28/5a95a4d037347.png",
            name: "中山大学团委活动",
            location: "假草操场",
            mark: [1, 1, 0],
            content: "1758舞蹈会",
            activity_id: 12345
        }]
    },
    {
        id: 1,
        date: "2月8号",
        article: [{
            id: 1,
            image: "https://i.loli.net/2018/02/28/5a95a4d064f71.png",
            name: "数据科学与计算机学院学长团",
            location: "三饭小广场",
            mark: [0, 1, 0],
            content: "学长团",
            activity_id: 12345
        }, ]
    },
    {
        id: 2,
        date: "2月9号",
        article: [{
            id: 2,
            image: "https://i.loli.net/2018/02/28/5a95a4d088fd3.png",
            name: "维纳斯歌手大赛",
            location: "中大东校区",
            mark: [0, 1, 1],
            content: "维纳斯歌手比赛",
            activity_id: 12345
        }, ]
    },
    {
        id: 3,
        date: "2月10号",
        article: [{
            id: 3,
            image: "https://i.loli.net/2018/02/28/5a95a4d09f6ec.png",
            name: "暑假三下乡",
            location: "广州",
            mark: [0, 1],
            content: "三下乡义教",
            activity_id: 12345
        }, ]
    }
]

// wxcf38b0daff83a060