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

const formatUrl = function(url) {
  try {
    if (!url) {
      return "null";
    }
    if (url[0] === "\"") {
      url = url.slice(1)
    }
    if (url[url.length - 1] === "\"")
      url = url.slice(0, url.length-1)
    if (url.search("https") === -1) {
      url = url.slice(4);
      url = "https" + url;
    }
    return url;
  }
  catch(e) {
    console.log(e)
  }
}

const parseHTML = function(data, variable) {
  try {
    let regStr = `${variable}.*`
    let pattern = RegExp(regStr);
    let formatPattern = RegExp("\".*\"");
    let target = pattern.exec(data);
    if (target === null) {
      console.log(variable + " missing ")
      target = (variable === "msg_title" ? this.data.defaultTitle : this.data.defaultImage);
    }
    else {
      target = formatPattern.exec(target)[0];
      target = target.slice(1,target.length-1);
      target = (target === null ? (variable === "msg_title" ? this.data.defaultTitle : this.data.defaultImage) : target);
    }
    return target;
  }
  catch(e) {
    console.log(e)
  }
}

module.exports = {
  getRandomColor,
  getHighSColor,
  formatUrl,
  parseHTML
}
