/**
 * @file calender/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const tools = require('./tools.js')
const weekdayInCH = ['日','一','二','三','四','五','六']

Page({
  data: {
    weekdayInCH: weekdayInCH,
    yearAndMonth: null,
    sameDayInCurrentFullMonth: null,
    weeks: [],
    weeksWithEvents: []
  },
  onLoad() {
    const today = new Date()
    const yearAndMonth = tools.getCurrentYearAndMonth(today)
    const weeks = tools.getWeeksOfCurrentMonth(today)
    const dailyEventsInWeeks = tools.getDailyEventsInWeeks(today, dailyEventsIn201802)
    const sameDayInCurrentFullMonth = today
    const weeksWithEvents = tools.zip(weeks, dailyEventsInWeeks)
    this.setData({
      yearAndMonth,
      sameDayInCurrentFullMonth,
      weeks,
      dailyEventsInWeeks,
      weeksWithEvents
    })
    wx.setNavigationBarTitle({
      title: yearAndMonth
    })
  },
  // 改变月份
  changeMonth(e) {
		const direction = e.currentTarget.dataset.direction
    var sameDay = this.data.sameDayInCurrentFullMonth
    if (direction === 'prev') {
      sameDay = new Date(sameDay.setMonth(sameDay.getMonth() - 1))
    } else {
      sameDay = new Date(sameDay.setMonth(sameDay.getMonth() + 1))
    }
    const yearAndMonth = tools.getCurrentYearAndMonth(sameDay)
    const weeks = tools.getWeeksOfCurrentMonth(sameDay)
    const dailyEventsInWeeks = tools.getDailyEventsInWeeks(sameDay, dailyEventsIn201802)
    const weeksWithEvents = tools.zip(weeks, dailyEventsInWeeks)
    this.setData({
      yearAndMonth,
      sameDayInCurrentFullMonth: sameDay,
      weeks,
      dailyEventsInWeeks,
      weeksWithEvents
    })
    wx.setNavigationBarTitle({
      title: yearAndMonth
    })
  }
})

// TODO: 这只是一个简单的UI测试，后期需要变成对象的数组，以加入活动链接
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
