var app = getApp()
var SEARCH_ICON = "../../../assets/icon/search.png"

Page({
    data: {
        searchKeyword: undefined
    },
    onLoad: function(options) {
        var data = JSON.parse(options.data)
        var count = 0
        for (var key in data) {
            data[key].image = app.globalData.activitiesImages[count]
            data[key].wechat_url = app.globalData.activitiesWechatUrl[count]
            data[key].show = true;
            count++
        }

        this.setData({
            activities: data
        })

        this.setData({
            searchIcon: SEARCH_ICON
        })
    },
    getSearchInput: function(e) {
        console.log(e)
        this.setData({
            searchKeyword: e.detail.value
        })
    },
    searchActivities: function(e) {
        console.log(e)
        if (e.detail.value) {
            this.setData({
                searchKeyword: e.detail.value
            })
        }
        this.changeActivitiesState()
    },
    changeActivitiesState: function() {
        var reg = new RegExp(this.data.searchKeyword)
        var keys = KEYS
        var activities = this.data.activities
        this.displayActivitiesToNone();
        keys.forEach(k => {
            for (var actKey in activities) {
                console.log(activities[actKey][k])
                if (activities[actKey][k] && activities[actKey][k].toString().match(reg)) {
                    activities[actKey].show = true
                }
            }
        });
        this.setData({
            activities
        })
    },
    displayActivitiesToNone: function() {
        var activities = this.data.activities
        for (var actKey in activities) {
            activities[actKey].show = false
        }
    },
    rollToActivityDetails: function() {
        wx.navigateTo({
            url: '../activity_detail/index',
        })
    }
})


var KEYS = [
    "short_name",
    "name",
    "description",
    "category",
    "sports_medals",
    "public_service_hours",
    "prize",
    "other_prize",
    "starttime",
    "endtime"
]