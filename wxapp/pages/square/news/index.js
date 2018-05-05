Page({
  data:{
    buffer: null,
    inputTxt: "",
  },
  inputValue: function(event) {
    this.data.buffer = event.detail.value;
  },
  inputHonor: function(event) {
    //this.data.organization.honor = event.detail.value;
    ORGANIZATION_SAMPLE.honor = event.detail.value;
    
  },

  inputName: function(event) {
    ORGANIZATION_SAMPLE.name = event.detail.value;
  },
  inputSetUpTime: function (event) {
    ORGANIZATION_SAMPLE.setupTime = event.detail.value;
  },
  append: function() {
    if(this.data.buffer == null) {

    } else {
      this.data.organization.departments.push(this.data.buffer);
      this.data.buffer = null;
      this.data.inputTxt = null;
    }

    var organization = this.data.organization;
    var inputTxt = this.data.inputTxt;
    this.setData({
      organization,
      inputTxt
    })
  },

  onLoad: function() {
    this.getOrganization();
    //this.append(); why???
  },
  
  getOrganization: function() {
    var organization = ORGANIZATION_SAMPLE;
    this.setData({
      organization
    })
  },
 
})

const ORGANIZATION_SAMPLE = {
  id: "123",
  background: "https://i.loli.net/2018/03/13/5aa7c6477fcdd.png",
  avatar: "https://i.loli.net/2018/03/14/5aa7f867768fa.jpg",
  name: "中珠广播台",
  departments: ["11", "222"],
  honor:"",
  location: "",
  setupTime:"",
}
