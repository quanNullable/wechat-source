function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = function() {
    function i() {
        e(this, i);
    }
    return t(i, null, [ {
        key: "init",
        value: function() {
            this.sessionId = "", this.gameId = "", this.gameTicket = "", this.serverConfig = "", 
            this.shareTicket = "", this.pkId = "", this.serverConfig = "";
        }
    }, {
        key: "setLoginState",
        value: function(e) {
            this.sessionId = e;
        }
    }, {
        key: "setGameId",
        value: function(e) {
            this.gameId = e;
        }
    }, {
        key: "setGameTicket",
        value: function(e) {
            this.gameTicket = e;
        }
    }, {
        key: "setServerConfig",
        value: function(e) {
            this.serverConfig = e;
        }
    }, {
        key: "setShareTicket",
        value: function(e) {
            this.shareTicket = e;
        }
    }, {
        key: "setPkId",
        value: function(e) {
            this.pkId = e;
        }
    }, {
        key: "clearPkId",
        value: function() {
            this.pkId = "";
        }
    }, {
        key: "clearGameId",
        value: function() {
            this.gameId = "";
        }
    }, {
        key: "clearShareTicket",
        value: function() {
            this.ShareTicket = "";
        }
    }, {
        key: "clearGameTicket",
        value: function() {
            this.gameTicket = "";
        }
    }, {
        key: "setServerConfig",
        value: function(e) {
            this.serverConfig = e;
        }
    } ]), i;
}();

exports.default = i;