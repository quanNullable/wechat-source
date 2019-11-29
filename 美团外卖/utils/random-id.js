module.exports = function() {
    var x = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
        var t = (x + 16 * Math.random()) % 16 | 0;
        return x = Math.floor(x / 16), ("x" === r ? t : 3 & t | 8).toString(16);
    });
};