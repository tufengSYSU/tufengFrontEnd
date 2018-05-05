Page({
    data:{
        //casArray: ['双眼皮', 'TBM', '隆胸', '减肥', 'qita'],
        casIndex: 0,
        startTime: '00:00',
        endTime: '00:00',
        startDate: '2018-01-01',
        endDate: '2018-01-01',
        organization: ORGANIZATION_SAMPLE,
    },

    getOrganization() {
        this.setData({
            organization: ORGANIZATION_SAMPLE
        })
    },

    onLoad: function() {
        this.getOrganization();
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

    bindCasPickerChange: function (e) {
        //console.log(this.data.casArray);
        //console.log('下拉选择的是', this.data.casArray[e.detail.value])
        this.setData({
          casIndex: e.detail.value
        })
    },
    

})
const ORGANIZATION_SAMPLE = {
    id: "123",
    background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
    avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
    name: "中珠广播台",
    departments: ["11", "222"],
    honor:"",
    location: "",
    setupTime:"",
    activities:['维纳斯歌手大赛', '致青春定向越野', '张剑粉丝见面会'],
}