var app = getApp()
var watcher
Page({
    data: {
        userInfo: {},
        multiIndex: [0, 0],
        show: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showButton: true
    },
    onLoad: function() {
        this.bindGetUserInfo();
        wx.showToast({
            title: '正在登录...',
            icon: 'loading', // loading
            duration: 10000
        })
        var that = this
        watcher = setTimeout(function() {
            console.log("index page " + app.globalData.user)
            if (app.globalData.user != undefined) {
                wx.switchTab({
                    url: '../activities/index',
                })
            } else {
                that.setData({
                    show: true
                })
            }
        }, 1000)
        var that = this
        let multiArray = MULTIARRAY
        this.setData({
            multiArray
        })
    },
    bindGetUserInfo: function(e) {
        var that = this
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    app.getUserInfo();
                    that.setData({
                        showButton: false
                    })
                }
            }
        })
    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        }
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        data.multiArray[2] = [];
                        break;
                    case 1:
                        data.multiArray[1] = ['本部'];
                        //data.multiArray[2] = [];
                        break;
                }
                data.multiIndex[1] = 1;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[1]) {
                    case 0:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        break;
                    case 1:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        break;
                    case 2:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        break;
                    case 3:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        break;
                    case 4:
                        data.multiArray[1] = ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'];
                        break;
                        // case 0:
                        //     switch (data.multiIndex[1]) {
                        //         case 0:
                        //             data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        //             break;
                        //         case 1:
                        //             data.multiArray[2] = ['蛔虫'];
                        //             break;
                        //         case 2:
                        //             data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                        //             break;
                        //         case 3:
                        //             data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                        //             break;
                        //         case 4:
                        //             data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                        //             break;
                        //     }
                        //     break;
                        // case 1:
                        //     switch (data.multiIndex[1]) {
                        //         case 0:
                        //             data.multiArray[2] = ['鲫鱼', '带鱼'];
                        //             break;
                        //         case 1:
                        //             data.multiArray[2] = ['青蛙', '娃娃鱼'];
                        //             break;
                        //         case 2:
                        //             data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                        //             break;
                        //     }
                        //     break;
                }
                // data.multiIndex[2] = 0;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
    },
    confirmCollege: function() {
        app.globalData.college_district = this.data.multiArray[1][this.data.multiIndex[1]]
        app.globalData.finishGetCollege = true
        console.log(app.globalData.college_district)
        clearInterval(watcher)
        app.createUser()
        wx.switchTab({
            url: "../activities/index"
        })
    }
})

const MULTIARRAY = [
    ['中山大学', '华南农业大学'],
    ['南校园', '东校园', '北校园', '珠海校区', '深圳校区'],

]