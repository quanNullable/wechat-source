var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, n = {
    device: {
        getClientVersion: function() {
            return "6.20";
        },
        getChannel: function() {
            return "WX";
        }
    },
    user: {
        checkLogin: function(o) {
            if (!o || "function" != typeof o) return cwx.user.isLogin();
        },
        login: function(n) {
            n || (n = {}), n.param && "object" === o(n.param) || (n.param = {}), n.callback && "function" == typeof n.callback || (n.callback = function() {}), 
            cwx.user.login(n);
        },
        logout: function(o) {
            "function" != typeof o && (o = function() {}), cwx.user.logout(o);
        }
    }
};

module.exports = n;