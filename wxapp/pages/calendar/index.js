/**
 * @file calender/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const app = getApp()
const util = require('../../utils/util.js')
const tools = require('./tools.js')
const lunar = require('./lunar.js')
const festival = require('./festival.js')

const ASSETS = "../../assets"
const WEEKDAY_IN_CH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const LOCATION_ARROW = ASSETS + "/icon/scrollintotoday.png" // 动态图标

Page({
    data: {
        weekdayInCH: WEEKDAY_IN_CH,
        goToTodayIcon: LOCATION_ARROW,
        toView: "lastDay",
        todayInThatMonth: null,
        // activeIndex actually only works with the frist render
        activeIndexTheLast: 0,
        activeIndex: 1,
        // Array of weeksWithEvents(in one month)
        calenders: [
            [],
            [],
            []
        ]
    },
    onLoad: function() {
        const curDay = new Date()
        const curDayInPrevMonth = this.getTheSameDayInThatMonthWithOffset(curDay, -1)
        const curDayInNextMonth = this.getTheSameDayInThatMonthWithOffset(curDay, 1)
        this.setData({
                todayInThatMonth: curDay,
                activeIndexTheLast: 0,
                activeIndex: 1
            })
            // get data in 3 months
        this.getDataInOneMonth(curDayInPrevMonth, 0)
        this.getDataInOneMonth(curDay, 1)
        this.getDataInOneMonth(curDayInNextMonth, 2)

        this.syncTitle()
        this.getScreenWidth()
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '快来看看校园活动日历吧！',
            path: '/pages/calendar/index'
        }
    },
    // when the swiper changes
    swiperChange: function(e) {
        const circularSize = 3
        const lastToday = (this.data.todayInThatMonth !== null) ? this.data.todayInThatMonth : new Date()
        var activeIndexTheLast = this.data.activeIndex
        var activeIndex = e.detail.current
        var todayInCurrentMonth = null
        var calenders = this.data.calenders

        // swipe to right
        if (activeIndex === this.getCircularSiblingIndex(circularSize, activeIndexTheLast, 'right')) {
            todayInCurrentMonth = this.getTheSameDayInThatMonthWithOffset(lastToday, 1)
            this.getDataInOneMonth(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, 1), this.getCircularSiblingIndex(circularSize, activeIndex, 'right'))
        }
        // swipe to left
        else if (activeIndex === this.getCircularSiblingIndex(circularSize, activeIndexTheLast, 'left')) {
            todayInCurrentMonth = this.getTheSameDayInThatMonthWithOffset(lastToday, -1)
            this.getDataInOneMonth(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, -1), this.getCircularSiblingIndex(circularSize, activeIndex, 'left'))
        }
        // when swiper changed by changing the activeIndex programmatically
        // the e.detail.current equals activeIndex
        else if (activeIndex === activeIndexTheLast) {
            todayInCurrentMonth = lastToday
        }
        // error
        else {
            console.error('swipe error');
        }

        this.setData({
            activeIndex,
            activeIndexTheLast,
            todayInThatMonth: todayInCurrentMonth,
            calenders: calenders
        })
        this.syncTitle()
    },
    getTheSameDayInThatMonthWithOffset: function(curDay, monthOffset) {
        return new Date((new Date(curDay)).setMonth(curDay.getMonth() + monthOffset))
    },
    getCircularSiblingIndex: function(circularSize, curIndex, direction) {
        if (curIndex < 0 || curIndex >= circularSize) {
            console.error('curIndex out of range');
        }
        if (direction === 'right') {
            if (curIndex + 1 < circularSize) {
                return curIndex + 1
            } else {
                return 0
            }
        } else {
            if (curIndex > 0) {
                return curIndex - 1
            } else {
                return circularSize - 1
            }
        }
    },
    // 获得一个月的数据，输入值为当月的某一天和在日历里的索引
    getDataInOneMonth: function(oneDay, calenderIndex) {
        let date = new Date(oneDay)
        let that = this
        date.setDate(0) // the last day before this month
        wx.request({
            url: app.globalData.apiPrefix + "/activity_stages?one_day_in_that_month=" + util.formatTimeToYYMMDD(new Date(oneDay)),
            method: "GET",
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                console.log(app.globalData.apiPrefix + "/activity_stages?one_day_in_that_month=" + util.formatTimeToYYMMDD(new Date(oneDay)));
                console.log(res.data)
                    // const eventsInOneMonth = dailyEventsIn201802
                const eventsInOneMonth = res.data.data
                const data = eventsInOneMonth.map(events => {
                    date.setDate(date.getDate() + 1)
                    events = events.map(event => {
                            // append name, timeInterval, place attributes for rendering
                            // event.name = event.activity.short_name
                            // 目前 name 外面包了一层字符串引号，不知为何，不应如此，遂先去其首尾
                            event.name = event.activity.short_name
                            event.timeInterval = util.formatTimeToMMDDHHMM(new Date(event.start_time)) + ' ~ ' + util.formatTimeToMMDDHHMM(new Date(event.end_time))
                            event.place = event.location
                                // add color to every event
                            event.color = tools.getPrettyRandomColor()
                            return event
                        })
                        // isLastDay
                    let nextDay = new Date(date)
                    nextDay.setDate(date.getDate() + 1)
                    return {
                        date: new Date(date),
                        dateObj: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            date: date.getDate(),
                            weekday: WEEKDAY_IN_CH[new Date(date).getDay()],
                            festival: festival.getFesitval(new Date(date)),
                        },
                        events,
                        isLastDay: tools.isToday(nextDay),
                        istoday: tools.isToday(date),
                    }
                })

                var calenders = that.data.calenders

                // 判断calender是否为空数组
                var calenderOfThisMonthWasEmpty = false
                if (calenders[calenderIndex].length === 0) {
                    calenderOfThisMonthWasEmpty = true
                }

                calenders[calenderIndex] = data
                that.setData({
                    calenders
                })

                // 滚动到目标view需要calender数据载入完成
                // 因为是异步操作，在初次进入日历页面都时候，每次获取一个月数据都尝试滚动一次
                if (calenderOfThisMonthWasEmpty) {
                    that.setData({
                        toView: "lastDay"
                    })
                }
            }
        })
    },
    // 同步页面标题
    syncTitle: function() {
        const oneDay = this.data.todayInThatMonth
        const dateTitle = tools.getCurrentYearAndMonthTitle(oneDay)
        this.setData({
            title: dateTitle
        })
    },
    showDetailed: function(e) {
        const event = e.currentTarget.dataset.event
        const activity = { id: event.activity.id }
        wx.navigateTo({
            url: '../activities/activity_detail/index?data=' + JSON.stringify(activity)
        })
    },
    slideOut: function(e) {
        // 确定滑出页的数据
        const day = e.currentTarget.dataset.day
        this.setSlideOutData(day)

        // 滑出页动画
        const screenWidth = this.data.screenWidth
        const leftPanellWidth = screenWidth * (1 - 0.40)
        const offset = e.detail.x * (1 - leftPanellWidth / screenWidth) / screenWidth * 100
        this.setData({
            slideOut: true,
            calenderSlideStyle: "transform: translateX(-" + offset + "%);transition: 0.3s;"
        })
    },
    slideAway: function(e) {
        this.setData({
            slideOut: false,
            calenderSlideStyle: "transform: translateX(0%);transition: 0.3s;"
        })
    },
    getScreenWidth: function() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                const screenWidth = res.screenWidth
                that.setData({
                    screenWidth
                })
            }
        })
    },
    setSlideOutData: function(dailyData) {
        this.setData({
            slideOutData: {
                dailyData,
                lDate: lunar.getLunarDateStr(new Date(dailyData.date)),
                festival: festival.getFesitval(new Date(dailyData.date)),
            }
        })
    },
    reload: function() {
        this.onLoad()
        this.setData({
            toView: ""
        })
        this.setData({
            toView: "lastDay"
        })
    }
})