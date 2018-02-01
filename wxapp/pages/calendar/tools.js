/**
 * @file calender/tools.js, provide the tools
 * @author isanbel(theisanbel@gmail.com)
 */

/**
 * getCurrentYearAndMonth 返回年月
 *
 * @param {Date} date
 * @return {String} eg. 2018年2月
 */
const getCurrentYearAndMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return year + '年' + month + '月'
}

/**
 * getWeeksOfCurrentMonth 获得当天所在月的所有周
 *
 * @param {Date} date
 * @return {Array} Array of week{Array}
 */
const getWeeksOfCurrentMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const dayCount = lastDay.getDate()

  var weeks = []
  // firstly fill the days before first day in current month of the first week with ''
  var oneWeek = new Array(firstDay.getDay()).fill('')

  // push the oneWeeks one by one into weeks
  for (let i = 0; i < dayCount; i++) {
    if (oneWeek.length == 7) {
      weeks.push(oneWeek)
      oneWeek = []
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

module.exports = {
  getCurrentYearAndMonth: getCurrentYearAndMonth,
  getWeeksOfCurrentMonth: getWeeksOfCurrentMonth
}
