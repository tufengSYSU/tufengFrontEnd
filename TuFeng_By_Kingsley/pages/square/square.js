// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArray: [
      {
        _id: '2fd234adffgh5756jbewetu',
        title: '东校荒野求生',
        asso: ['定向越野协会', '体育学院'],
        activity_type: '体育',
        location: '中山大学东校区',
        time: '9:30am',
        schedule: [
          { date: '8.28', sub_activity: '摆台' },
          { date: '9.05', sub_activity: '报名截止' },
          { date: '9.07', sub_activity: '比赛日' }
        ],
        detail: [
          '有体育章',
          '参加有精美礼品'
        ]
      },
      {
        _id: '2fwk32sav234756jbewetu',
        title: 'READY PLAYER ONE',
        asso: ['电影协会'],
        activity_type: '休闲',
        location: '中山大学东校区',
        time: '9:30am',
        schedule: [
          { date: '8.28', sub_activity: '摆台' },
          { date: '9.05', sub_activity: '报名截止' },
          { date: '9.07', sub_activity: '比赛日' }
        ],
        detail: [
          '有体育章',
          '参加有精美礼品'
        ]
      },
      // {
      //   id: 1,
      //   short_name: "内环",
      //   name: "跑内环100圈",
      //   description: "时限三个月",
      //   category: "",
      //   college_district: 1,
      //   school: "",
      //   range: "",
      //   type_: "",
      //   poster_url: "",
      //   logo_url: "",
      //   wechat_url: "",
      //   live_url: "",
      //   sports_medals: "",
      //   public_service_hours: "",
      //   prize: "",
      //   other_prize: "",
      //   attention_num: 0
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
})