function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var n = i[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(i, t, n) {
        return t && e(i.prototype, t), n && e(i, n), i;
    };
}(), t = (function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    i.default = e;
}(require("./lib/three")), function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./pages/lookers"))), n = function() {
    function n(i) {
        e(this, n), this.num = 0, this.list = [], this.imgPlanes = [], this.camera = i, 
        this.lookers = new t.default({
            camera: i
        }), this.isOpen = !1;
    }
    return i(n, [ {
        key: "peopleCome",
        value: function(e) {
            this.list.findIndex(function(i) {
                return !!i && i.audience_openid == e.audience_openid;
            }) > -1 || (this.list.push(e), this.num++, this.isOpen && this.showAvatar());
        }
    }, {
        key: "peopleOut",
        value: function(e) {
            var i = this.list.findIndex(function(i) {
                return !!i && i.audience_openid == e.audience_openid;
            });
            i < 0 || (this.num = this.num - 1 < 0 ? 0 : this.num - 1, this.list.splice(i, 1), 
            this.isOpen && this.showAvatar());
        }
    }, {
        key: "showAvatar",
        value: function() {
            if (this.num > 0) {
                for (var e = [], i = 1; i < 4; i++) this.list.length - i >= 0 && e.unshift(this.list[this.list.length - i].audience_headimg);
                this.lookers.showLookers({
                    avaImg: !0,
                    icon: !0,
                    wording: !1,
                    num: this.num,
                    avatar: e
                });
            } else this.lookers.showLookers({
                avaImg: !1,
                icon: !0,
                wording: !1
            });
        }
    }, {
        key: "open",
        value: function() {
            this.isOpen = !0, this.showAvatar();
        }
    }, {
        key: "close",
        value: function() {
            this.isOpen = !1, this.hideAll();
        }
    }, {
        key: "reset",
        value: function() {
            this.num = 0, this.list = [], this.lookers.hideLookers();
        }
    }, {
        key: "hideAll",
        value: function() {
            this.lookers.hideLookers();
        }
    } ]), n;
}();

exports.default = n;