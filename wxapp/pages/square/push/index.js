const app = getApp()

// 动态图标
const AIXIN_ICON = "/assets/icon/mark/aixin.png"
const BALL_ICON = "/assets/icon/mark/aixin.png"
const MONEY_ICON = "/assets/icon/mark/aixin.png"

var pics = [];

Page({
    data:{
      pictures: [],
      buffer: null,
      startTime: '00:00',
      startDate: '2018-01-01',
      inputTxt: "",
      fullName: "",
      casIndex: 0,
      typeArray: ['请选择活动类型','公益', '体育', '文娱', '比赛', '讲座'],
  
    },
    inputValue: function(event) {
      this.data.buffer = event.detail.value;
    },
  
    bindCasPickerChange: function (e) {
        //console.log(this.data.casArray);
        //console.log('下拉选择的是', this.data.casArray[e.detail.value])
        this.setData({
          casIndex: e.detail.value
        })
    },
    fullName: function(e) {
      this.setData({
        fullName: e.detail.value,
      })

    },
    inputHonor: function(e) {
      this.setData({
        prize: e.detail.value,
      })
    },
    activityRange: function(e) {
      this.setData({
        range: e.detail.value,
      })
    },
    
    startDatePickerSelected: function(e) {
        this.setData({
            startDate: e.detail.value,
        })
    },
    startTimePickerSelected: function(e) {
        //调用setData()重新绘制
        this.setData({
            startTime: e.detail.value,
        })
    },
    append: function() {
      if(this.data.buffer == null) {
  
      } else {
        this.data.organization.departments.push(this.data.buffer);
        this.data.buffer = null;
        this.data.inputTxt = null;
      }
  
      var organization = this.data.organization;
      var inputTxt = this.data.inputTxt;
      this.setData({
        organization,
        inputTxt
      })
    },

    chooseimage: function () {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          var imgsrc = res.tempFilePaths;
          if(pics == null) {
            pics.push(imgsrc);
          } else {
            pics = [];
            pics.push(imgsrc);
          }

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            pictures:pics
          })
        }
      })
    },
    

    releaseActivity: function() {
        var that = this;
        var flag = true;
        var successFlag = true;
        this.getActivity()

        if(this.data.fullName == "") {
          flag = false;
          wx.showToast({
            title: '请输入活动名称',
            icon: "loading",
            duration: 1000,
            mask: true
          })
      
        }

        if(this.data.range == null) {
          flag = false;
          wx.showToast({
            title: '请输入辐射范围',
            icon: "loading",
            duration: 1000,
            mask: true
          })
      
        }

        if(this.data.prize == null) {
          flag = false;
          wx.showToast({
            title: '请输入活动奖励',
            icon: "loading",
            duration: 1000,
            mask: true
          })
        }
        
        if(this.data.typeArray[this.data.casIndex] == "请选择活动类型") {
          flag = false;
          wx.showToast({
            title: '请选择活动类型',
            icon: "loading",
            duration: 1000,
            mask: true
          })
        
        }

        if(flag == true) {
        wx.request({
            url: 'https://ancestree.site/api/activities',
            header: {
              "Content-Type": "application/json"
            },
            data: this.data.activity,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            complete: function(res) {
                if(res == null || res.data == null) {
                  console.error('网络请求失败')
                  successFlag = false;
                  return;
                } else {
                  console.log("网络请求成功")
                  console.log(res.data.data)
                  successFlag = true;
                  wx.showToast({
                    title: '发布活动成功',
                    icon: 'success',
                    duration: 1000,
                    mask: true
                  })

                }
            }
        })
        console.log(successFlag)
            if(successFlag == true) {
                this.setData({
                    prize: null,
                    fullName: "",
                    range: null,
                    casIndex: 0,
                })
                this.getActivity()
            }
        }
    },
    
    onLoad: function(option) {
      this.getOrganization()
      this.getIcons()
      var organizationID = parseInt(option.organizationid)
      this.setData({
        organizationID
      })
      console.log(this.data.organizationID)
      //this.append(); why???
      //this.getActivity()
      

    },
    getActivity: function() {
      var activity = ACTIVITY_SAMPLE;
      activity.name = this.data.fullName;
      activity.description = this.data.range;
      activity.category = this.data.typeArray[this.data.casIndex];
      activity.poster_url = this.data.pictures[0];
      activity.logo_url = "";
      activity.wechat_url = "";
      activity.sports_medals = "";
      activity.public_service_hours = "";
      activity.prize = this.data.prize;
      activity.other_prize = "";
      activity.organization_id = this.data.organizationID;

      this.setData({
        activity
      })

    },

    getIcons: function() {
        this.setData({
            aiXin: AIXIN_ICON,
            ball: BALL_ICON,
            money: MONEY_ICON,
        })
    },
    getOrganization: function() {
      var organization = ORGANIZATION_SAMPLE;
      this.setData({
        organization
      })
    },
   
  })
  
  const ORGANIZATION_SAMPLE = {
    id: 123,
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    departments: ["11", "222"],
    honor:"",
    location: "",
    setupTime:"",
    activities:['维纳斯歌手大赛', '致青春定向越野', '张剑粉丝见面会'],
  }

  const ACTIVITY_SAMPLE = {
    "id": null,
    "name": "",
    "description": "",
    "category": "",
    "poster_url": "",
    "logo_url": "",
    "wechat_url": "",
    "sports_medals": "",
    "public_service_hours": "",
    "prize": "",
    "other_prize": "",
    "organization_id": 1
  }
  