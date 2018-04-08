Page({
  data: {
    url: {
      url: "http://www.pailixiang.com/m/album_ia54800121.html",
      query: {
        from: "singlemessage",
        isappinstalled: 0
      }
    }
  },
  navToAlbum: function() {
    console.log(this.data.url);
    console.log('../album_live/index?data='+JSON.stringify(this.data));
    wx.navigateTo({
      url: '../album_live/index?data='+JSON.stringify(this.data) // will be some other data
    })
  }
})
