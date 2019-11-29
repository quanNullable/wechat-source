module.exports = function(r) {
    var t = Math.floor(r / 60), o = r % 60;
    return t ? t + "分钟" + o + "秒" : o + "秒";
};