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
    weeks: []
  },
  onLoad() {
    const today = new Date()
    const yearAndMonth = tools.getCurrentYearAndMonth(today)
    const weeks = tools.getWeeksOfCurrentMonth(today)
    this.setData({
      yearAndMonth,
      weeks
    })
  },
})
