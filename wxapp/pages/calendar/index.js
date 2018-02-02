/**
 * @file calender/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const tools = require('./tools.js')
const WEEKDAY_IN_CH = ['日','一','二','三','四','五','六']

Page({
  data: {
    weekdayInCH: WEEKDAY_IN_CH,
    todayInThatMonth: null,
    // activeIndex actually only works with the frist render
    activeIndex: 1,
    // Array of weeksWithEvents(in one month)
    calenders: []
  },
  onLoad: function() {
    const curDay = new Date()
    const curDayInPrevMonth = new Date((new Date(curDay)).setMonth(curDay.getMonth() - 1))
    const curDayInNextMonth = new Date((new Date(curDay)).setMonth(curDay.getMonth() + 1))
    this.setData({
      todayInThatMonth: curDay,
      calenders: [
        this.getWeeksWithEvents(curDayInPrevMonth),
        this.getWeeksWithEvents(curDay),
        this.getWeeksWithEvents(curDayInNextMonth),
      ]
    })
    this.syncTitle()
  },
  swiperChange: function(e) {
    const index = e.detail.current
    const activeIndex = this.data.activeIndex
    console.log(index)
    // console.log(this.data.calenders[index])
    // // swipe to right
    // if (index < activeIndex || (index === 2 && activeIndex)) {
    //
    // }
    const curDay = new Date()
    const curDayInPrevMonth = new Date((new Date(curDay)).setMonth(curDay.getMonth() - 1))
    const curDayInNextMonth = new Date((new Date(curDay)).setMonth(curDay.getMonth() + 1))
    var oneDayInCurMonth = null
    switch (index) {
      case 0:
        oneDayInCurMonth = curDayInPrevMonth
        break;
      case 1:
        oneDayInCurMonth = curDay
        break;
      case 2:
        oneDayInCurMonth = curDayInNextMonth
        break;
      default:
        break
    }
    this.setData({
      activeIndex: index,
      todayInThatMonth: oneDayInCurMonth
    })
    this.syncTitle()
  },
  // 获得一个月的数据，输入值为当月的某一天
  getWeeksWithEvents: function(oneDay) {
    // TODO: get dailyEventsInThatMonth by http request
    return tools.getWeeksWithEventsOfCurrentMonth(oneDay, dailyEventsIn201802)
  },
  // 同步页面标题
  syncTitle: function() {
    const oneDay = this.data.todayInThatMonth
    const yearAndMonth = tools.getCurrentYearAndMonth(oneDay)
    wx.setNavigationBarTitle({
      title: yearAndMonth
    })
  }
})

// TODO: 这只是一个简单的UI测试，后期需要变成对象的数组，以加入活动链接
// TODO: 所有使用此值的地方，将来都会变成发起的数据请求
const dailyEventsIn201802 = [
  [],
  ['1758'],
  [],
  [],
  ['草地音乐会'],
  [],
  ['1758'],
  [],
  [],
  ['草地音乐会','运动会','lala'],
  [],
  ['1758'],
  [],
  [],
  ['草地音乐会'],
  [],
  [],
  ['草地音乐会'],
  [],
  ['1758'],
  [],
  [],
  ['草地音乐会'],
  [],
  ['1758'],
  [],
  [],
  ['草地音乐会','草地'],
  [],
  [],
  ['草地音乐会']
]
