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
      }
    ],
    picture: [
      "../../../assets/articlepicture/1.png",
      "../../../assets/articlepicture/2.png",
      "../../../assets/articlepicture/3.png",
      "../../../assets/articlepicture/4.png",
      "../../../assets/articlepicture/4.png",
      "../../../assets/articlepicture/4.png",
      "../../../assets/articlepicture/1.png",
      "../../../assets/articlepicture/2.png",
      "../../../assets/album/1.jpg",
      "../../../assets/album/2.jpg",
      "../../../assets/album/3.jpg",
      "../../../assets/album/4.jpg",
      "../../../assets/album/5.jpg"
    ],
    hoverclass: [
      "non-hover-text",
      "non-hover-text"
    ],
    activityOrAlbum: true,
    attention: false
  },

  onLoad: function() {

  },
  changeHoverClass: function(obj) {
    const index = obj.currentTarget.dataset.index;
    this.data.hoverclass[0] = "non-hover-text";
    this.data.hoverclass[1] = "non-hover-text";
    this.data.hoverclass[index] = "hover-text";
    this.setData({
      hoverclass: this.data.hoverclass,
      activityOrAlbum: !this.data.activityOrAlbum
    })
  },
  makeAttention: function(obj) {
    const origin = "../../../assets/icon/attention.png";
    const selected = "../../../assets/icon_selected/attention.png";
    this.setData({
      attention: !this.data.attention,
      "iconUrl[0]": (this.data.iconUrl[0] == origin ? selected : origin)
    })
  }
})
