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

module.exports = {
  getRandomColor,
  getHighSColor
}
