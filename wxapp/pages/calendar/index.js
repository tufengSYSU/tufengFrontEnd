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
    weeks: []
  },
  onLoad() {
    const today = new Date()
    const yearAndMonth = tools.getCurrentYearAndMonth(today)
    const weeks = tools.getWeeksOfCurrentMonth(today)
    const sameDayInCurrentFullMonth = today
    this.setData({
      yearAndMonth,
      sameDayInCurrentFullMonth,
      weeks
    })
    // wx.setNavigationBarTitle({
    //   title: yearAndMonth
    // })
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
    this.setData({
      yearAndMonth,
      sameDayInCurrentFullMonth: sameDay,
      weeks
    })
  }
})
