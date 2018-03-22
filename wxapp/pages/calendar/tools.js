/**
 * @file calender/tools.js, provide the tools
 * @author isanbel(theisanbel@gmail.com)
 */

/**
 * getCurrentYearAndMonthTitle 返回年月
 *
 * @param {Date} date
 * @return {String} eg. 2018年2月
 */
const getCurrentYearAndMonthTitle = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthInCHN = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
  return {year: year, month: monthInCHN[month]+'月'}
}

/**
 * getWeeksOfCurrentMonth 获得当天所在月的所有周
 *
 * @param {Date} date
 * @return {Array} Array of week{Array}
 */
const getWeeksOfCurrentMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const dayCount = lastDay.getDate()

  var weeks = []
  // firstly fill the days before first day in current month of the first week with ''
  var oneWeek = new Array(firstDay.getDay()).fill('')

  // push the oneWeeks one by one into weeks
  for (let i = 0; i < dayCount; i++) {
    if (oneWeek.length === 7) {
      weeks.push(oneWeek)
      oneWeek = []
      oneWeek.push(i + 1)
    }
    else {
      oneWeek.push(i + 1)
    }
  }
  if (oneWeek.length > 0) {
    oneWeek = oneWeek.concat(new Array(7 - oneWeek.length).fill(''))
    weeks.push(oneWeek)
  }

  return weeks
}

/**
 * getDailyDataInWeeks 获得当天所在月的所有数据，按周整理
 * TODO: 根据实际情况调整传入的参数，有时可以传入一个dailyDataInMonth对象，就不用date了
 *
 * @param {Array} dailyDataInMonth 在一月里，每天的活动组成的数组
 * @return {Array} dailyEventsInWeeks
 */
const getDailyDataInWeeks = (date, dailyDataInMonth) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const dayCount = lastDay.getDate()

  var dailyDataInWeeks = []
  // firstly fill the days before first day in current month of the first week with []
  const emptyObj = null
  var dailyDataInOneWeek = new Array(firstDay.getDay()).fill(emptyObj)

  // push the dailyDataInOneWeek one by one into dailyDataInWeeks
  for (let i = 0; i < dayCount; i++) {
    if (dailyDataInOneWeek.length === 7) {
      dailyDataInWeeks.push(dailyDataInOneWeek)
      dailyDataInOneWeek = []
      dailyDataInOneWeek.push(dailyDataInMonth[i])
    }
    else {
      dailyDataInOneWeek.push(dailyDataInMonth[i])
    }
  }
  if (dailyDataInOneWeek.length > 0) {
    dailyDataInOneWeek = dailyDataInOneWeek.concat(new Array(7 - dailyDataInOneWeek.length).fill(emptyObj))
    dailyDataInWeeks.push(dailyDataInOneWeek)
  }

  return dailyDataInWeeks
}

/**
 * isToday 判断是否是今天
 *
 * @param {Date} date 一天
 * @return {Boolean} 是否是今天
 */
const isToday = (date) => {
  var today = new Date()
  if(date.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
      return true
  } else {
      return false
  }
}

/**
 * getRandomColor https://stackoverflow.com/questions/1484506/random-color-generator
 *
 * @return {String} color
 */
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  getCurrentYearAndMonthTitle: getCurrentYearAndMonthTitle,
  getWeeksOfCurrentMonth: getWeeksOfCurrentMonth,
  getDailyDataInWeeks: getDailyDataInWeeks,
  isToday: isToday,
  getRandomColor: getRandomColor,
}
