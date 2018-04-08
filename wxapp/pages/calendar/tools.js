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

/**
 * getHighSColor
 *
 * @return {String} color
 */
const getHighSColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  do {
    color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (!colorHasHighS(color))
  return color;
}

/**
 * colorHasHighS
 *
 * @return {Bool}
 */
const colorHasHighS = (colorInHex) => {
  let R = parseInt(colorInHex.substr(1, 2), 16);
  let G = parseInt(colorInHex.substr(3, 2), 16);
  let B = parseInt(colorInHex.substr(5, 2), 16);
  let max = Math.max(R, G, B);
  let min = Math.min(R, G, B);
  var S = ((max - min) / max);
  return (S > 0.7) ? true : false;
}

/**
 * getPrettyRandomColor
 *
 * @return {String} color
 */
const getPrettyRandomColor = () => {
  return prettyColor[Math.floor(Math.random() * prettyColor.length)];
}
const prettyColor = [
  "#7B8BE3", "#854836", "#D05A6E", "#B19693", "#ED784A", "#E98B2A", "#B5CAA0",
  "#91AD70", "#90B44B", "#91B493", "#808F7C", "#77969A", "#1E88A8", "#A5DEE4",
  "#3A8FB7", "#58B2DC", "#51A8DD", "#2EA9DF", "#7B90D2", "#4E4F97", "#8A6BBE",
  "#6A4C9C", "#986DB2", "#5E3D50", "#C1328E", "#E03C8A", "#828282", "#F596AA",
  "#F8C3CD", "#66BAB7"
]

module.exports = {
  getCurrentYearAndMonthTitle: getCurrentYearAndMonthTitle,
  getWeeksOfCurrentMonth: getWeeksOfCurrentMonth,
  getDailyDataInWeeks: getDailyDataInWeeks,
  isToday: isToday,
  getRandomColor: getRandomColor,
  getPrettyRandomColor: getPrettyRandomColor,
}
