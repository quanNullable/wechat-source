function t(t) {
    return Array.isArray(t) ? t : Array.from(t);
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

function r(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
}, a = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, r, i) {
        return r && t(e.prototype, r), i && t(e, i), e;
    };
}(), o = (require("../../lib/animation"), function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    e.default = t;
}(require("../../lib/three")), function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../control/propertyCtrl"))), n = function() {
    function n(t) {
        var e = t.game, i = t.onGoRecord, a = t.onReturn, o = t.onLike;
        r(this, n), this.game = e, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.onGoRecord = i, this.onReturn = a, this.onLike = o;
    }
    return a(n, [ {
        key: "updateProfilePraiseStatus",
        value: function(r) {
            var a = this, n = [].concat(e(this.data.praise_info.headimg_list));
            n.findIndex(function(t) {
                return t == a.data.headimg;
            }) < 0 && n.push(this.data.headimg);
            var s = {
                praise_info: i({}, this.data.praise_info, {
                    is_already_praise: r,
                    praise_count: this.data.praise_info.praise_count + 1,
                    total_praise_count: this.data.praise_info.total_praise_count + 1,
                    headimg_list: n
                })
            };
            if (this.data && this.data.is_self && 10 == s.praise_info.praise_count) {
                var u = o.default.getPropsData() || [];
                u.push({
                    property_id: "fake",
                    item_id: 1
                }), s.propsData = {
                    property_list: u
                }, setTimeout(function() {
                    o.default.getProps();
                }, 1e3);
            } else s.propsData = {
                property_list: o.default.getPropsData()
            };
            if (s.propsData && Array.isArray(s.propsData.property_list)) {
                var l = t(s.propsData.property_list).slice(0);
                s.propsData.property_list = l.filter(function(t) {
                    return 1 == t.item_id;
                });
            }
            this.full2D.updateProfilePraise && this.full2D.updateProfilePraise(s);
        }
    }, {
        key: "show",
        value: function(t) {
            this.game.full2D.hide2D(), this.data = t, this.full2D.showProfile(i({}, t, {
                onReturn: this.onReturn,
                onRecord: this.onGoRecord,
                onLike: this.onLike
            }));
        }
    }, {
        key: "onClickHide",
        value: function() {
            this.onReturn();
        }
    }, {
        key: "hide",
        value: function() {
            this.game.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;