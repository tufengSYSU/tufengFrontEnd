/**
 * @file calender/index.js
 * @author isanbel(theisanbel@gmail.com)
 */

const tools = require('./tools.js')
const lunar = require('./lunar.js')
const festival = require('./festival.js')
const WEEKDAY_IN_CH = ['周日','周一','周二','周三','周四','周五','周六']

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
        this.getDataInWeeks(curDayInPrevMonth),
        this.getDataInWeeks(curDay),
        this.getDataInWeeks(curDayInNextMonth),
      ]
    })
    this.syncTitle()
    this.getScreenWidth()
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
      calenders[this.getCircularSiblingIndex(circularSize, index, 'right')] = this.getDataInWeeks(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, 1))
    }
    // swipe to left
    else if (index === this.getCircularSiblingIndex(circularSize, activeIndex, 'left')) {
      todayInCurrentMonth = this.getTheSameDayInThatMonthWithOffset(lastToday, -1)
      calenders[this.getCircularSiblingIndex(circularSize, index, 'left')] = this.getDataInWeeks(this.getTheSameDayInThatMonthWithOffset(todayInCurrentMonth, -1))
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
  getDataInWeeks: function(oneDay) {
    // TODO: get data by http request
    let date = new Date(oneDay)
    date.setDate(0)
    const eventsInOneMonth = dailyEventsIn201802
    const data = eventsInOneMonth.map(events => {
      date.setDate(date.getDate() + 1)
      return {
        date: new Date(date),
        dateObj: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
        },
        events,
        istoday: tools.isToday(date),
        hasmore: events.length > 4 ? true:false
      }
    })
    return tools.getDailyDataInWeeks(oneDay, data)
  },
  // 同步页面标题
  syncTitle: function() {
    const oneDay = this.data.todayInThatMonth
    const dateTitle = tools.getCurrentYearAndMonthTitle(oneDay)
    this.setData({
      title: dateTitle
    })
  },
  slideOut: function(e) {

    // 确定滑出页的数据
    const day = e.currentTarget.dataset.day
    this.setSlideOutData(day)

    // 滑出页动画
    const screenWidth = this.data.screenWidth
    const leftPanellWidth = screenWidth * (1 - 0.40)
    const offset = e.detail.x * (1 - leftPanellWidth / screenWidth) / screenWidth * 100
    this.setData({
      slideOut: true,
      calenderSlideStyle: "transform: translateX(-" + offset + "%);transition: 0.3s;"
    })
  },
  slideAway: function(e) {
    this.setData({
      slideOut: false,
      calenderSlideStyle: "transform: translateX(0%);transition: 0.3s;"
    })
  },
  getScreenWidth: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        const screenWidth = res.screenWidth
        that.setData({
          screenWidth
        })
      }
    })
  },
  setSlideOutData: function(dailyData) {
    const colors = dailyData.events.map(event => {
      return tools.getRandomColor()
    })
    this.setData({
      slideOutData: {
        dailyData,
        colors,
        lDate: lunar.getLunarDateStr(new Date(dailyData.date)),
        festival: festival.getFesitval(new Date(dailyData.date)),
      }
    })
  }
})

// TODO: 这只是一个简单的UI测试，后期需要变成对象的数组，以加入活动链接
// TODO: 所有使用此值的地方，将来都会变成发起的数据请求
const dailyEventsIn201802 = [
  [],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '张剑见面会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '届唱非自我',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'no',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'today',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '张剑见面会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '届唱非自我',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'no',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'today',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '张剑见面会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '1758',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '届唱非自我',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'no',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'today',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '届唱非自我',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '东校区荒野行动',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '定向越野',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'no',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'today',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
  [],
  [
    {
      name: '草地音乐会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: '运动会',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    },
    {
      name: 'event',
      timeInterval: '12:00~18:00',
      place: '三饭小广场'
    }
  ],
]
