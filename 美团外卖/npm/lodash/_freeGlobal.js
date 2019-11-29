var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = "object" == ("undefined" == typeof global ? "undefined" : o(global)) && global && global.Object === Object && global;

module.exports = t;