Page({
    data: {
        url: ""
    },
    onLoad: function(option) {
        let url = option.url
        if (url === "https://ancestree.site/html/posts/DHE8jJNt50Kp5ZrJ29oWUA.html")
            url = "https://ancestree.site/html/posts/A.html"
        this.setData({
            url
        })
    }
})