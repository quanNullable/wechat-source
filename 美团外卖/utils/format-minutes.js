module.exports = function(r) {
    var t = Math.floor(r / 60), o = r % 60;
    return t ? t + "小时" + o + "分钟" : o + "分钟";
};