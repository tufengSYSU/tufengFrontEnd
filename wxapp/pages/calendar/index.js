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
    const curDayInPrevMonth = this.getTheSameDayInThatMonthWithOffset(curDay, -1)
    const curDayInNextMonth = this.getTheSameDayInThatMonthWithOffset(curDay, 1)
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
  // when the swiper changes
  swiperChange: function(e) {
    const circularSize = 3
    const index = e.detail.current
    const activeIndex = this.data.activeIndex
    const lastToday = this.data.todayInThatMonth

    var todayInCurrentMonth = null
    var calenders = this.data.calenders

    // swipe to right
    if (index === this.getCircularSiblingIndex(circularSize, activeIndex, 'right')) {
      todayInCurrentMonth = this.getTheSameDayInThatMonthWithOffset(lastToday, 1)
      calenders[this.getCircularSiblingIndex(circularSize, index, 'right')] = this.getWeeksWithEvents(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, 1))
    }
    // swipe to left
    else if (index === this.getCircularSiblingIndex(circularSize, activeIndex, 'left')) {
      todayInCurrentMonth = this.getTheSameDayInThatMonthWithOffset(lastToday, -1)
      calenders[this.getCircularSiblingIndex(circularSize, index, 'left')] = this.getWeeksWithEvents(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, -1))
    }
    // error
    else {
      console.error('swipe error');
    }

    this.setData({
      activeIndex: index,
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
