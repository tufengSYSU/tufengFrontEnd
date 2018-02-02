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
    todayInThatMonth: null,
    weeksWithEvents: []
  },
  onLoad() {
    const today = new Date()
    this.setDataInAMonth(today)
  },
  // 改变月份
  changeMonth(e) {
		const direction = e.currentTarget.dataset.direction
    var sameDay = this.data.todayInThatMonth
    if (direction === 'prev') {
      sameDay = new Date(sameDay.setMonth(sameDay.getMonth() - 1))
    } else {
      sameDay = new Date(sameDay.setMonth(sameDay.getMonth() + 1))
    }
    this.setDataInAMonth(sameDay)
  },
  // 设置一个月的数据，输入值为当月的某一天
  setDataInAMonth(oneDay) {
    const yearAndMonth = tools.getCurrentYearAndMonth(oneDay)
    const weeks = tools.getWeeksOfCurrentMonth(oneDay)
    const dailyEventsInWeeks = tools.getDailyEventsInWeeks(oneDay, dailyEventsIn201802)
    const weeksWithEvents = tools.zip(weeks, dailyEventsInWeeks)
    this.setData({
      yearAndMonth,
      todayInThatMonth: oneDay,
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
