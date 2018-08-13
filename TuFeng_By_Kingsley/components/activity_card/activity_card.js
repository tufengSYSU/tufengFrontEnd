// components/activity_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activity: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setAssoStr: function () {
      var result = '';
      this.properties.activity.asso.map((asso) => {
        result += asso + ' & '
      })
      result = result.slice(0, result.length - 3)
      this.setData({assoStr: result});
    },
  },

  attached: function () {
    this.setAssoStr();
  }
})
