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

module.exports = {
    formatUrl,
    parseHTML
}