var t = require("../../../utils/object-assign.js"), e = require("../../../utils/throttle.js");

module.exports = function(i) {
    t(i, {
        getSpuScrollHeight: function() {
            var t = this;
            try {
                wx.createSelectorQuery().select("#spuScroll").fields({
                    size: !0
                }, function() {}).exec();
            } catch (t) {
                this.lxLogWXAppError("WXAPI", t, {
                    source: "getSpuScrollHeight"
                });
            }
            wx.createSelectorQuery().select("#spuScroll").fields({
                size: !0
            }, function(e) {
                t.setData({
                    spuScrollHeight: e.height
                });
            }).exec();
        },
        getEmptySoltHeight: function() {
            var t = this;
            try {
                wx.createSelectorQuery().select(".fixed-empty-solt").fields({
                    size: !0
                }, function() {}).exec();
            } catch (t) {
                this.lxLogWXAppError("WXAPI", t, {
                    source: "getEmptySoltHeight"
                });
            }
            wx.createSelectorQuery().select(".fixed-empty-solt").fields({
                size: !0
            }, function(e) {
                t.setData({
                    emptySoltHeight: e.height
                });
            }).exec();
        },
        getSpuTagEachHeight: function() {
            var t = [], e = [];
            this.data.food_spu_tags.forEach(function(i, s) {
                var o = new Promise(function(t) {
                    wx.createSelectorQuery().select("#real-spu-tag-container-" + i.tag).fields({
                        size: !0
                    }, t).exec();
                });
                e[s] = o, o.then(function(e) {
                    t[s] = e.height;
                });
            }), Promise.all(e).then(this.updateSpuTagPositionList.bind(this, t));
        },
        updateSpuTagPositionList: function(t) {
            var e = [];
            t.forEach(function(i, s) {
                for (var o = 0, a = 0; a < s; a++) o += t[a];
                e[s] = o;
            }), e[-1] = -1;
            for (var i = 0, s = 0; s < t.length; s++) i += t[s];
            e[e.length] = i, e[e.length] = Number.MAX_VALUE, this.setData({
                spuTagEachHeight: t,
                spuTagPositionList: e
            });
        },
        checkCurrentIfNeedToLoadMore: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = t, s = this.data, o = s.spuScrollHeight, a = s.spuTagPositionList, r = this.store.getState().poi.food_spu_tags, n = void 0 === r ? [] : r;
            if (o && a) for (var c = 0; a[c + t] - a[t] < o; c++) i = c; else {
                var l = n.length - 1, h = n[t].spus.length - e, u = 0;
                if (h > 6) i = t; else for (;h <= 6; ) {
                    if ((i = t + ++u) >= l) {
                        i = l;
                        break;
                    }
                    h += (n[i] || {}).spus.length;
                }
            }
            return i;
        },
        __ifScrollTopIsInLastScreen: function(t) {
            var e = this.data, i = e.spuTagPositionList, s = e.spuScrollHeight, o = e.emptySoltHeight, a = !1, r = i[i.length - 2] + -s + o, n = i[i.length - 2] + o;
            return r < t && t < n && (a = !0), a;
        },
        _findSholdShowTag: function(t) {
            var e = this.data, i = e.spuTagPositionList, s = e.spuScrollHeight, o = e.food_spu_tags, a = this.__ifScrollTopIsInLastScreen(t), r = this.data.activeTypeIndex, n = this.data.spuTagShouldShow, c = this.data.tagViewName, l = this.data.tagViewDes;
            if (!a) {
                for (var h = 0; h < i.length; h++) i[h] <= t && t < i[h + 1] ? (n[h] = !0, r = h, 
                c = o && o[h] ? o[h].name : c, l = o && o[h] ? o[h].description : l) : t < i[h] && i[h + 1] < t + s ? n[h] = !0 : i[h] < t + s && t + s < i[h + 1] ? n[h] = !0 : t > i[h + 1] && (n[h] = !0);
                this.setData({
                    spuTagShouldShow: n,
                    activeTypeIndex: r,
                    tagViewName: c,
                    tagViewDes: l
                });
            }
        },
        _ifIncurrentTag: function(t) {
            var e = this.data, i = e.spuTagPositionList, s = e.activeTypeIndex, o = e.spuScrollHeight;
            return i[s] <= t && t + o <= i[s + 1];
        },
        findCurrentPosition: function(t) {
            this._ifIncurrentTag(t) || e(this._findSholdShowTag, 0).call(this, t);
        }
    });
};