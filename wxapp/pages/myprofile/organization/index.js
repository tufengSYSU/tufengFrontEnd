Page({
  data: {
    coverImageUrl: "../../../assets/articlepicture/1.png",
    logoUrl: "../../../assets/organizationlogo/1.jpg",
    iconUrl: [
      "../../../assets/icon/attention.png",
      "../../../assets/icon/arrow.png",
      "../../../assets/icon/organization/address.png",
      "../../../assets/icon/organization/section.png",
      "../../../assets/icon/organization/honor.png"
    ],
    activity: [
      {
        name: "第三十一届维纳斯歌手大赛",
        imgUrl: "../../../assets/articlepicture/1.png",
        progress: true
      },
      {
        name: "2016维纳斯歌友会",
        imgUrl: "../../../assets/articlepicture/2.png",
        progress: false
      },
      {
        name: "张剑见面会",
        imgUrl: "../../../assets/articlepicture/3.png",
        progress: false
      },
      {
        name: "唱飞自我 最帅张园园",
        imgUrl: "../../../assets/articlepicture/4.png",
        progress: true
      },
      {
        name: "图蜂最牛逼 楼上说得对",
        imgUrl: "../../../assets/slidepicture/3.jpg",
        progress: true
      },
    ],
    picture: [
      "../../../assets/articlepicture/1.png",
      "../../../assets/articlepicture/2.png",
      "../../../assets/articlepicture/3.png",
      "../../../assets/articlepicture/4.png",
      "../../../assets/album/1.jpg",
      "../../../assets/album/2.jpg",
      "../../../assets/album/3.jpg",
      "../../../assets/album/4.jpg",
      "../../../assets/album/5.jpg"
    ],
    hoverclass: [
      "hover-text",
      "non-hover-text"
    ],
    activityOrAlbum: true,
    attention: false,
    coverImageCss: [
      "cross-cover-image",
      "vertical-cover-image"
    ],
    introductionCss: [
      "cross-activity-introduction",
      "vertical-activity-introduction"
    ],
    hiddenCss: "display: none",
    fixCss: "",
    pageY: 0,
    dif: 0
  },

  onLoad: function() {

  },
  changeHoverClass: function(obj) {
    const index = obj.currentTarget.dataset.index;
    this.data.hoverclass[0] = "non-hover-text";
    this.data.hoverclass[1] = "non-hover-text";
    this.data.hoverclass[index] = "hover-text";
    this.data.hiddenCss = (index == 1 ? "" : "display: none");
    this.setData({
      hoverclass: this.data.hoverclass,
      activityOrAlbum: (index == 0 ? true : false),
      hiddenCss: this.data.hiddenCss
    })
  },
  makeAttention: function(obj) {
    const origin = "../../../assets/icon/attention.png";
    const selected = "../../../assets/icon_selected/attention.png";
    this.setData({
      attention: !this.data.attention,
      "iconUrl[0]": (this.data.iconUrl[0] == origin ? selected : origin)
    })
  },
  previewImage: function(e) {
    var that = this;
    wx.previewImage({
      urls: []
    })
  },
  touchS: function(e) {
    console.log(e);
    this.setData({
      pageY: e.touches[0].clientY
    })
    console.log(this.data.pageY);
  },
  touchM: function(e) {
    var different = this.data.pageY - e.touches[0].clientY;
    if (different + this.data.dif > 398) {
      this.data.fixCss = "fix";
    }
    else {
      this.data.fixCss = "";
    }
    this.setData({
      fixCss: this.data.fixCss
    });
    console.log(different + this.data.dif);
    console.log(this.data.fixCss);
  },
  touchE: function(e) {
    this.setData({
      dif: this.data.dif + this.data.pageY - e.changedTouches[0].clientY
    });
  }
})
