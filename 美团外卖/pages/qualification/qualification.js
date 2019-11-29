function i(i) {
    return function() {
        var e = i.apply(this, arguments);
        return new Promise(function(i, n) {
            function a(t, r) {
                try {
                    var o = e[t](r), s = o.value;
                } catch (i) {
                    return void n(i);
                }
                if (!o.done) return Promise.resolve(s).then(function(i) {
                    a("next", i);
                }, function(i) {
                    a("throw", i);
                });
                i(s);
            }
            return a("next");
        });
    };
}

var e = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), a = require("../base.js"), t = require("../../utils/mix.js"), r = require("../../components/rohr/rohr.js"), o = require("../../api/index.js").poiQualification, s = {
    pageName: "qualification",
    data: {
        noDataShown: !0,
        poiSafeInfoShown: !1,
        qualiPicsShown: !1,
        foodClassifyShown: !1,
        qualify_show_type: 0,
        qualify_pics: [],
        certify_info: {},
        classify_pic: [],
        support_classify: !1,
        gradeMap: {
            0: "未设置",
            1: "优秀",
            2: "良好",
            3: "一般",
            4: "较差",
            5: "中等"
        },
        classifyMap: {
            2: "A",
            3: "C",
            5: "B"
        },
        levelMap: {
            0: "未设置",
            1: "A",
            2: "B",
            3: "C",
            4: "D"
        }
    },
    poiID: "",
    onLoad: function(n) {
        var a = this, t = n.poi_id, r = n.cat_id, o = void 0 === r ? "" : r, s = n.hash_id, u = void 0 === s ? "" : s;
        return i(e.default.mark(function i() {
            return e.default.wrap(function(i) {
                for (;;) switch (i.prev = i.next) {
                  case 0:
                    return a.poiID = t, a.cat_id = o, a.hash_id = u, i.next = 5, a.loadQualificaitonData(t);

                  case 5:
                  case "end":
                    return i.stop();
                }
            }, i, a);
        }))();
    },
    loadQualificaitonData: function(n) {
        var a = this;
        return i(e.default.mark(function i() {
            var t, r, s, u, c, f, p, l, d, _;
            return e.default.wrap(function(i) {
                for (;;) switch (i.prev = i.next) {
                  case 0:
                    return i.next = 2, o({
                        wm_poi_id: n
                    });

                  case 2:
                    (t = i.sent) ? (r = t.qualify_pics, s = t.certify_info, u = t.classify_pic, c = t.support_classify, 
                    f = +t.qulify_show_type, p = !1, l = !1, d = !1, _ = !1, 3 === f ? (s.permit_num && (p = !0), 
                    l = !0) : 1 === f ? (p = !1, l = !0) : 2 === f ? (s.licence_num && (p = !0), l = !1) : d = !0, 
                    s && !s.company_name && (p = !1), !s.permit_num && u && 0 !== u.length && (_ = !0), 
                    a.setData({
                        poiSafeInfoShown: p,
                        noDataShown: d,
                        qualiPicsShown: l,
                        foodClassifyShown: _,
                        qualify_pics: r,
                        classify_pic: u,
                        certify_info: s,
                        support_classify: c
                    })) : a.setData({
                        noDataShown: !0
                    }), a.loading(!1);

                  case 5:
                  case "end":
                    return i.stop();
                }
            }, i, a);
        }))();
    },
    onClickPhotos: function(i) {
        var e = i.currentTarget.dataset, n = e.picarry, a = e.picnow;
        wx.previewImage({
            current: n[a],
            urls: n
        });
    }
};

(0, n.page)(t(s, a, r));