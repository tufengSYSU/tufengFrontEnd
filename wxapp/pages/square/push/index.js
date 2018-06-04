const app = getApp()

// 动态图标
const AIXIN_ICON = "/assets/icon/mark/aixin.png"
const BALL_ICON = "/assets/icon/mark/aixin.png"
const MONEY_ICON = "/assets/icon/mark/aixin.png"

var pics = [];

Page({
    data: {
        pictures: [],
        buffer: null,
        inputTxt: "",
        fullName: "",
        casIndex: 0,
        typeArray: ['请选择活动类型', '公益', '体育', '文娱', '比赛', '讲座'],
        startTime: '00:00',
        endTime: '00:00',
        activities: ['维纳斯', '演唱会'],
        activitiesIndex: 0
    },
    inputValue: function(event) {
        this.data.buffer = event.detail.value;
    },
    bindCasPickerChange: function(e) {
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
    shortName: function(e) {
        this.setData({
            shortName: e.detail.value
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
    stageFullName: function(e) {
        this.setData({
            stageFullName: e.detail.value
        })
    },
    stageLocation: function(e) {
        this.setData({
            stageLocation: e.detail.value
        })
    },
    startDatePickerSelected: function(e) {
        this.setData({
            startDate: e.detail.value,
        })
    },
    endDatePickerSelected: function(e) {
        this.setData({
            endDate: e.detail.value,
        })
    },
    startTimePickerSelected: function(e) {
        //调用setData()重新绘制
        this.setData({
            startTime: e.detail.value,
        })
    },
    endTimePickerSelected: function(e) {
        //调用setData()重新绘制
        this.setData({
            endTime: e.detail.value,
        })
    },
    formatDate: function(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },
    chooseimage: function() {
        var _this = this;
        wx.chooseImage({
            count: 1, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                var imgsrc = res.tempFilePaths;
                if (pics == null) {
                    pics.push(imgsrc);
                } else {
                    pics = [];
                    pics.push(imgsrc);
                }

                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                _this.setData({
                    pictures: pics
                })
            }
        })
    },
    releaseActivity: function() {
        var that = this;
        var flag = true;
        var successFlag = true;
        this.getActivity()

        if (this.data.fullName == "") {
            flag = false;
            wx.showToast({
                title: '请输入活动名称',
                icon: "loading",
                duration: 1000,
                mask: true
            })

        }

        if (this.data.range == null) {
            flag = false;
            wx.showToast({
                title: '请输入辐射范围',
                icon: "loading",
                duration: 1000,
                mask: true
            })

        }

        if (this.data.prize == null) {
            flag = false;
            wx.showToast({
                title: '请输入活动奖励',
                icon: "loading",
                duration: 1000,
                mask: true
            })
        }

        if (this.data.typeArray[this.data.casIndex] == "请选择活动类型") {
            flag = false;
            wx.showToast({
                title: '请选择活动类型',
                icon: "loading",
                duration: 1000,
                mask: true
            })

        }

        if (flag == true) {
            wx.request({
                url: 'https://ancestree.site/api/activities',
                header: {
                    "Content-Type": "application/json"
                },
                data: that.data.activity,
                method: 'POST',
                complete: function(res) {
                    if (res == null || res.data == null) {
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
                            duration: 3000,
                            mask: true
                        })
                    }
                }
            })
            console.log(successFlag)
            if (successFlag == true) {
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
    releaseActivityStage: function() {
        var that = this;
        var flag = true;
        var successFlag = true;
        var stage = this.getActivityStage()
        if (this.data.activities === undefined || this.data.activities.length === 0) {
            wx.showToast({
                title: "尚未录入活动",
                icon: "loading",
                duration: 1500,
                mask: true
            })
            return;
        }
        var activity_id = this.data.activities[this.data.activitiesIndex].activity.id
        console.log("activity_id = " + activity_id)

        if (activity_id === undefined) {
            wx.showToast({
                title: "录入活动出错",
                icon: "loading",
                duration: 1500,
                mask: true
            })
            return;
        }

        if (this.data.stageFullName == "") {
            flag = false;
            wx.showToast({
                title: '请输入阶段名称',
                icon: "loading",
                duration: 1500,
                mask: true
            })

        }

        if (this.data.stageLocation == null) {
            flag = false;
            wx.showToast({
                title: '请输入地点',
                icon: "loading",
                duration: 1500,
                mask: true
            })

        }

        if (flag == true) {
            wx.request({
                url: 'https://ancestree.site/api/activities/' + activity_id + '/activity_stages',
                header: {
                    "Content-Type": "application/json"
                },
                data: stage,
                method: 'POST',
                complete: function(res) {
                    if (res == null || res.data == null) {
                        console.error('网络请求失败')
                        successFlag = false;
                        return;
                    } else {
                        console.log("网络请求成功")
                        console.log(res.data.data)
                        successFlag = true;
                        wx.showToast({
                            title: '发布活动阶段成功',
                            icon: 'success',
                            duration: 3000,
                            mask: true
                        })
                    }
                }
            })
            console.log(successFlag)
            if (successFlag == true) {
                that.setData({
                    stageFullName: null,
                    stageLocation: "",
                    startDate: that.formatDate(new Date()),
                    endDate: that.formatDate(new Date()),
                    startTime: "00:00",
                    endTime: "24:00"
                })
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
        let dateStr = this.formatDate(new Date())
        this.setData({
            startDate: "2018-01-01",
            endDate: "2018-02-02"
        })
        console.log(this.data.organizationID)

        this.getOrgActivities();
    },
    getOrgActivities: function() {
        let id = this.data.organizationID
        var that = this
        wx.request({
            url: 'https://ancestree.site/api/activities?oid=' + id,
            method: 'GET',
            success: function(res) {
                let activities = res.data.data
                let activitiesName = activities.map(item => {
                    if (item.activity.short_name === undefined || item.activity.short_name === "") {
                        return item.activity.name
                    }
                    return item.activity.short_name
                })
                if (activitiesName.length === 0) {
                    activitiesName.push("尚未录入活动")
                }
                console.log(activities)
                that.setData({
                    activities,
                    activitiesName
                })
            }
        })
    },
    getActivity: function() {
        var activity = ACTIVITY_SAMPLE;
        activity.name = this.data.fullName;
        activity.short_name = this.data.shortName;
        activity.description = this.data.range;
        activity.category = this.data.typeArray[this.data.casIndex];
        activity.poster_url = this.data.pictures[0];
        activity.logo_url = "";
        activity.wechat_url = "";
        activity.sports_medals = "";
        activity.public_service_hours = "";
        activity.prize = this.data.prize;
        activity.other_prize = "";
        //        activity.organization_id = this.data.organizationID;
        activity.organization_id = this.data.organizationID ? this.data.organizationID : 101002;

        this.setData({
            activity
        })
    },
    getActivityStage: function() {
        var stage = STAGE_SAMPLE;
        stage.start_time = this.parseDate(this.data.startDate, this.data.startTime);
        stage.end_time = this.parseDate(this.data.endDate, this.data.endTime);
        stage.location = this.data.stageLocation;
        stage.content = this.data.stageFullName;
        stage.activity_id = 61;
        console.log("stage")
        console.log(stage)
        return stage;
    },
    parseDate: function(dateStr, time) {
        var temp = new Date(dateStr);
        var timeary = time.split(':');
        temp.setHours(parseInt(timeary[0]));
        temp.setMinutes(parseInt(timeary[1]));
        console.log(temp);
        return temp.toISOString();
    },
    chooseActivity: function(e) {
        let index = e.detail.value
        this.setData({
            activitiesIndex: index
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
    honor: "",
    location: "",
    setupTime: "",
    activities: ['维纳斯歌手大赛', '致青春定向越野', '张剑粉丝见面会'],
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

const STAGE_SAMPLE = {
    "id": null,
    "stage_num": 1,
    "start_time": "2018-02-23T15:38:00+08:00",
    "end_time": "2018-02-23T15:39:00+08:00",
    "location": "广东省中山市中山大学东校区公共教学楼",
    "content": "content",
    "activity_id": 1
}