/**
 * @file calender/festival.js
 * @author isanbel(theisanbel@gmail.com)
 * reference: https://www.bbsmax.com/A/B0zqO6r5vL/
 */

const FTV = [
  //公历节日
  "0101 元旦",
  "0214 情人节",
  "0308 妇女节",
  "0312 植树节",
  "0315 消费者权益日",
  "0401 愚人节",
  "0501 劳动节",
  "0504 青年节",
  "0512 护士节",
  "0601 儿童节",
  "0701 建党节",
  "0801 建军节",
  "0910 教师节",
  "0928 孔子诞辰",
  "1001 国庆节",
  "1006 老人节",
  "1024 联合国日",
  "1224 平安夜",
  "1225 圣诞节",
  //农历节日
  "0101 春节",
  "0115 元宵节",
  "0505 端午节",
  "0707 七夕情人节",
  "0715 中元节",
  "0815 中秋节",
  "0909 重阳节",
  "1208 腊八节",
  "1224 小年"
]

const formatTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [month, day].map(formatNumber).join('')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * getCurrentYearAndMonthTitle 返回年月
 *
 * @param {Date} date
 * @return {String} eg. 2018年2月
 */
const getFesitval = (date) => {
  const formatedDate = formatTime(date)
  const formatedFtvDate = FTV.map(ftvStr => {return ftvStr.split(' ')[0]})
  const ftv = FTV.map(ftvStr => {return ftvStr.split(' ')[1]})
  const index = formatedFtvDate.indexOf(formatedDate)
  return (index >= 0) ? ftv[index] : ' '
}

module.exports = {
  getFesitval: getFesitval,
}
