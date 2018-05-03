var pics=[];
Page({
  data:{
    pictures:[],
    originPictures:[],
  },
  onLoad:function(option) {
    this.setData({
      name:option.title,
    })
    var tempPhotos = [];
    var str = "";
    var count = 0;
    for (var index in option.photos) {
      if (option.photos[index] != '~' && option.photos[index] != ',') {
        str = str + option.photos[index];
      } else {
        if (option.photos[index] == '~') {
          tempPhotos.push(str);
          str = "";
          count++;
        }
      }
    }
    this.setData({
      originPictures: tempPhotos,
    })
    for(var i in tempPhotos) {
      console.log(tempPhotos[i]);
    }
    console.log(count)
  },
  
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics.push(imgsrc);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          pictures:pics
        })
      }
    })
  }
})
