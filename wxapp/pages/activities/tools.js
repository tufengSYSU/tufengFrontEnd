const REPLACE_MARK = "&&"

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
 * 
 * @param {http url} url
 * convert http url to https 
 */
const formatUrl = function(url) {
    try {
        if (!url) {
            return "null";
        }
        if (url[0] === "\"") {
            url = url.slice(1)
        }
        if (url[url.length - 1] === "\"")
            url = url.slice(0, url.length - 1)
        if (url.search("https") === -1) {
            url = url.slice(4);
            url = "https" + url;
        }
        return url;
    } catch (e) {
        console.log(e)
    }
}

/**
 * 
 * @param {HTML DATA} data 
 * @param {HTML ELEMENTS NAME} variable 
 * get Wechat articles title and image
 */
const parseHTML = function(data, variable) {
    try {
        let regStr = `${variable}.*`
        let pattern = RegExp(regStr);
        let formatPattern = RegExp("\".*\"");
        let target = pattern.exec(data);
        if (target === null) {
            console.log(variable + " missing ")
            target = (variable === "msg_title" ? this.data.defaultTitle : this.data.defaultImage);
        } else {
            target = formatPattern.exec(target)[0];
            target = target.slice(1, target.length - 1);
            target = (target === null ? (variable === "msg_title" ? this.data.defaultTitle : this.data.defaultImage) : target);
        }
        return target;
    } catch (e) {
        console.log(e)
    }
}

const findRelativePoster = (posters, item) => {
    var flag = false;
    posters.forEach((poster) => {
        if (poster.activity_id === item.activity_id) {
            flag = true;
        }
    })
    return flag;
}

/**
 * 
 * @param {date str} str
 * format date to this form
 * XX月XX日 
 */
const formateDateToRegularForm = (str) => {
    var date = new Date(str);
    return (date.getMonth() + 1) + "月" + date.getDate() + "日"
}

const removeQuotation = (str) => {
    if (str.length > 1 || str[0] === "\"") {
        return str.slice(1, str.length - 1);
    }
    return str;
}

const Unicode = {
    stringify: function(str) {
        var res = [],
            len = str.length;
        for (var i = 0; i < len; ++i) {
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return str ? "\\u" + res.join("\\u") : "";
    },

    parse: function(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    }
}

const strReplace = {
    encode: function(str) {
        while (str.search("=") != -1) {
            str = str.replace("=", REPLACE_MARK)
        }
        return str;
    },

    decode: function(str) {
        while (str.search(REPLACE_MARK) != -1) {
            str = str.replace(REPLACE_MARK, "=")
        }
        return str;
    }
}

module.exports = {
    getRandomColor,
    getHighSColor,
    formatUrl,
    parseHTML,
    findRelativePoster,
    formateDateToRegularForm,
    removeQuotation,
    Unicode,
    strReplace
}