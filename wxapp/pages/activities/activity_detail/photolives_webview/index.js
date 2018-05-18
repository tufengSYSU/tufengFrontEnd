const sitePreFix = "https://www.pailixiang.com"

Page({
    data: {},
    onLoad: function(options) {
        let url
        let parseUrl
        let newUrl
        if (options.url.search(sitePreFix) === -1) {
            console.log(options.url)
            url = options.url
            parseUrl = url.split("/")
            parseUrl = parseUrl.slice(3)
            newUrl = sitePreFix
            for (var i in parseUrl) {
                newUrl = newUrl + "/" + parseUrl[i]
            }
            console.log(newUrl)
        } else {
            newUrl = options.url
        }
        console.log(options)
        console.log(newUrl)
        this.setData({
                url: newUrl
            })
            // 生命周期函数--监听页面加载
    },
    onReady: function() {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function() {
        // 生命周期函数--监听页面显示
    },
    onHide: function() {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function() {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})