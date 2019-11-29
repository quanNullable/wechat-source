function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var o = e[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, i, o) {
        return i && t(e.prototype, i), o && t(e, o), e;
    };
}(), i = function() {
    function i(e) {
        t(this, i), this.optionReport = e.report || function() {}, this.duration = e.duration || 7e3, 
        this.logMessage = "", this.logMaxLength = e.logMaxLength || 5e3, this.timeout = null, 
        this.haveReport = 0;
    }
    return e(i, [ {
        key: "start",
        value: function() {
            var t = this;
            this.timeout || this.haveReport || (this.timeout = setTimeout(function() {
                t.report();
            }, this.duration));
        }
    }, {
        key: "pulse",
        value: function() {
            var t = this;
            this.timeout && (this.rpClearTimeout(), this.timeout = setTimeout(function() {
                t.report();
            }, this.duration));
        }
    }, {
        key: "stop",
        value: function() {
            this.rpClearTimeout();
        }
    }, {
        key: "rpClearTimeout",
        value: function() {
            this.timeout && (clearTimeout(this.timeout), this.timeout = null);
        }
    }, {
        key: "report",
        value: function() {
            this.haveReport = 1, this.optionReport(this.logMessage), this.logMessage = "";
        }
    }, {
        key: "log",
        value: function() {
            for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            var o = e.join(";;;");
            if (o) {
                this.logMessage += o;
                var n = this.logMessage.length;
                if (n > this.logMaxLength) {
                    var r = n - this.logMaxLength;
                    this.logMessage = this.logMessage.slice(r, n);
                }
            }
        }
    } ]), i;
}();

exports.default = i;