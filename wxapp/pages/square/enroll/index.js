Page({
    data: {
        //casArray: ['双眼皮', 'TBM', '隆胸', '减肥', 'qita'],
        casIndex: 0,
        startTime: '00:00',
        endTime: '00:00',
        stages: [],
        startDate: (new Date()).toLocaleDateString,
        endDate: (new Date()).toLocaleDateString
    },

    onLoad: function(option) {
        var organizationID = parseInt(option.organizationid)
        this.setData({
            organizationID
        })
        console.log(this.data.organizationID)
        this.getActivities();
    },
    getActivities: function() {
        var that = this
        wx.request({
            url: "https://ancestree.site/api/activities",
            header: {
                "content-Type": "application/json"
            },
            data: {
                oid: this.data.organizationID,
            },
            success: function(res) {
                var data = res.data.data;
                console.log(data)
                var list = [];
                var idList = [];
                for (var i in data) {
                    list.push(data[i].activity.name)
                        //console.log(data[i].activity.id)
                    idList.push(data[i].activity.id)
                }
                that.setData({
                    list
                })
                that.setData({
                    idList
                })
            },

        })
    },
    deleteStage: function(e) {
        var deleteContent = e.currentTarget.dataset.value;
        var temp = this.data.stages;
        for (var i in temp) {
            if (temp[i].content == deleteContent) {
                temp.splice(i, 1);
                break;
            }
        }
        //console.log(temp)
        this.setData({
            stages: temp,
        })
    },

    inputLocal: function(e) {
        this.setData({
            Location: e.detail.value,
        })
    },

    inputType: function(e) {
        this.setData({

            Type: e.detail.value,
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

    bindCasPickerChange: function(e) {
        //console.log(this.data.casArray);
        //console.log('下拉选择的是', this.data.casArray[e.detail.value])
        this.setData({
            casIndex: e.detail.value
        })
    },
    addStage: function() {
        var flag = true;
        var successFlag = true;
        var tmpStage = this.data.stages;
        var tempStage = A_STAGE_SAMPLE;
        tempStage.activity_id = this.data.idList[this.data.casIndex];
        tempStage.location = this.data.Location;
        tempStage.start_time = this.data.startDate + this.data.startTime;
        tempStage.end_time = this.data.endDate + this.data.endTime;
        tempStage.content = this.data.Type;
        //console.log(tempStage)

        if (tempStage.location == undefined || tempStage == "") {
            flag = false;
            console.log(flag)
            wx.showToast({
                title: '请输入报名地点',
                icon: "loading",
                duration: 1000,
                mask: true
            })
            return;
        }
        if (tempStage.content == undefined || tempStage == "") {
            flag = false;
            wx.showToast({
                title: '请输入报名类型',
                icon: "loading",
                duration: 1000,
                mask: true
            })
            return;
        }

        if (flag == true) {
            var ID = this.data.idList[this.data.casIndex];
            wx.request({
                url: `https://ancestree.site/api/activities/${ID}/activity_stages`,
                header: {
                    "content-Type": "application/json"
                },
                data: {
                    tempStage
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                complete: function(res) {
                    if (res == null || res.data == null) {
                        console.error('网络请求失败')
                        successFlag = false;
                        return;
                    } else {
                        console.log("网络请求成功")
                            //console.log(res.data.data)
                        successFlag = true;
                        wx.showToast({
                            title: '发布报名并添加活动阶段成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        })

                    }
                }

            })
        }

        if (successFlag == true && flag == true) {
            tmpStage.push(tempStage)
                //console.log(tempStage)
            this.setData({
                stages: tmpStage,
                startTime: '00:00',
                endTime: '00:00',
                startDate: '2018-01-01',
                endDate: '2018-01-01',
                Location: "",
                Type: "",
                casIndex: 0,
            })
            console.log(this.data.stages)

        }
        //var that = this
    },
})

const A_STAGE_SAMPLE = {
    id: null,
    stage_num: null,
    start_time: "",
    end_time: "",
    location: "",
    content: "",
    activity_id: 17,
}
const STAGE_SAMPLE = [

]

const ORGANIZATION_SAMPLE = {
    id: "123",
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    departments: ["11", "222"],
    honor: "",
    location: "",
    setupTime: "",
    activities: ['维纳斯歌手大赛', '致青春定向越野', '张剑粉丝见面会'],
}