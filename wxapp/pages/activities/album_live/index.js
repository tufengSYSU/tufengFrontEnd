Page({
  data: {},
  onLoad: function (options) {
    console.log(options.data);
    var data = JSON.parse(options.data);//解析得到对象
    const url = data.url
    console.log(data);
    this.setData({
      url
    })
  },
})
