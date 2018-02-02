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
 * getDailyEventsInWeeks 获得当天所在月的所有活动，按周整理
 * TODO: 根据实际情况调整传入的参数，有时可以传入一个dailyEventsInMonth对象，就不用date了
 *
 * @param {Array} dailyEventsInMonth 在一月里，每天的活动组成的数组
 * @return {Array} dailyEventsInWeeks
 */
const getDailyEventsInWeeks = (date, dailyEventsInMonth) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const dayCount = lastDay.getDate()

  var dailyEventsInWeeks = []
  // firstly fill the days before first day in current month of the first week with []
  var dailyEventsInOneWeek = new Array(firstDay.getDay()).fill([])

  // push the dailyEventsInOneWeek one by one into dailyEventsInWeeks
  for (let i = 0; i < dayCount; i++) {
    if (dailyEventsInOneWeek.length === 7) {
      dailyEventsInWeeks.push(dailyEventsInOneWeek)
      dailyEventsInOneWeek = []
      dailyEventsInOneWeek.push(dailyEventsInMonth[i])
    }
    else {
      dailyEventsInOneWeek.push(dailyEventsInMonth[i])
    }
  }
  if (dailyEventsInOneWeek.length > 0) {
    dailyEventsInOneWeek = dailyEventsInOneWeek.concat(new Array(7 - dailyEventsInOneWeek.length).fill([]))
    dailyEventsInWeeks.push(dailyEventsInOneWeek)
  }

  return dailyEventsInWeeks
}

/**
 * zip https://stackoverflow.com/questions/32937181/javascript-es6-map-multiple-arrays
 * which allows you to do: zip(["a","b","c"], [1,2,3]); // ["a", 1], ["b", 2], ["c", 3]
 *
 * @param {Array} a1
 * @param {Array} a2
 * @return {Array} the zipped
 */
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]])

/**
 * getWeeksWithEventsOfCurrentMonth, the combined func of 3 func called in it
 *
 * @param {Date} date
 * @param {Array} dailyEventsInThatMonth
 * @return {Array} the zipped
 */
const getWeeksWithEventsOfCurrentMonth = (date, dailyEventsInThatMonth) => {
  return zip(getWeeksOfCurrentMonth(date), getDailyEventsInWeeks(date, dailyEventsInThatMonth))
}

module.exports = {
  getCurrentYearAndMonth: getCurrentYearAndMonth,
  getWeeksOfCurrentMonth: getWeeksOfCurrentMonth,
  getDailyEventsInWeeks: getDailyEventsInWeeks,
  zip: zip,
  getWeeksWithEventsOfCurrentMonth
}
