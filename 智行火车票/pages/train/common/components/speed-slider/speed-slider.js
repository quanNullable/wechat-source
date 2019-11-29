function e(e) {
    return "width: " + e + "px;";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../../../../cwx/cwx"), d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../util"));

exports.default = {
    data: {
        speedSlider: {
            items: [],
            index: 0,
            costPrice: 1,
            speedPkgNums: 0,
            pasNums: 1,
            touchendHandlerFn: "speedSliderTouchendHandler",
            touchmoveHandlerFn: "speedSliderTouchmoveHandler",
            onChangeFn: "",
            selectedItem: null,
            speedLineStyle: "width: 0px"
        }
    },
    methods: {
        speedSliderModelInit: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : this.data.speedSlider.onChangeFn;
            this.setData({
                "speedSlider.onChangeFn": n,
                "speedSlider.items": d,
                "speedSlider.pasNums": i,
                "speedSlider.index": e,
                "speedSlider.selectedItem": d.length ? d[e] : null
            }), t._.isFunction(this[this.data.speedSlider.onChangeFn]) && this[this.data.speedSlider.onChangeFn]();
        },
        speedSliderInit: function() {
            for (var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.speedSlider.index, d = arguments.length, i = Array(d > 1 ? d - 1 : 0), n = 1; n < d; n++) i[n - 1] = arguments[n];
            this.speedSliderModelInit.apply(this, [ t ].concat(i)), setTimeout(function() {
                e.speedSliderSetLevel(t);
            }, 20);
        },
        speedSliderTouchendHandler: function(e) {
            var t = this;
            if (e.detail || e.changedTouches && e.changedTouches[0]) {
                var d = e.detail && e.detail.x || e.changedTouches && e.changedTouches[0].pageX;
                this.speedSlider_getLevelLeftOffsets().then(function(e) {
                    return t.speedSlider_getSliderIndex(e, d);
                }).then(function(e) {
                    var d = e.levelLeftCenterXs, i = e.index;
                    t.speedSlider_SetIndexAndPos(d, i);
                });
            }
        },
        speedSliderSetLevel: function(e) {
            var t = this;
            return this.speedSlider_getLevelLeftOffsets().then(function(d) {
                return t.speedSlider_SetIndexAndPos(d, e);
            });
        },
        speedSlider_getLevelLeftOffsets: function() {
            var e = d.default.getDeferred(), i = this;
            return this.speedSilder_levelRects && this.speedSilder_levelRects.length ? e.resolve(this.speedSilder_levelRects) : t.cwx.createSelectorQuery().selectAll(".speed-type .type").boundingClientRect(function(t) {
                var d = [];
                t.forEach(function(e, i) {
                    var n = e.left, s = e.width, l = void 0;
                    l = 0 === i ? n : i == t.length - 1 ? n + s / 2 : n + 5 * s / 14, d.push({
                        left: n,
                        center: l
                    });
                }), i.speedSilder_levelRects = d, e.resolve(d);
            }).exec(), e.promise;
        },
        speedSlider_getSliderIndex: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], i = d.default.getDeferred();
            if (e.length) {
                var n = 0;
                if (t < e[0].left) ; else if (t > e[e.length - 1].left) n = e.length - 1; else for (var s = 1; s < e.length; s++) if (t < e[s].left) {
                    n = s - 1;
                    break;
                }
                return i.resolve({
                    levelLeftCenterXs: e,
                    index: n
                }), i.promise;
            }
            i.reject();
        },
        speedSlider_SetIndexAndPos: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], d = arguments[1], i = t[d];
            this.setData({
                "speedSlider.speedLineStyle": i ? e(i.center) : ""
            }), this.speedSlider_SetIndex(t, d);
        },
        speedSlider_SetIndex: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            var e = arguments[1], d = this.data.speedSlider.items[e], i = this.data.speedSlider.index, n = {
                "speedSlider.index": e,
                "speedSlider.speedPkgNums": d.speedPkgNums,
                "speedSlider.selectedItem": d
            };
            this.setData(n), e != i && t._.isFunction(this[this.data.speedSlider.onChangeFn]) && this[this.data.speedSlider.onChangeFn]();
        },
        speedSliderTouchmoveHandler: function(t) {
            var d = this;
            if (t.detail || t.changedTouches && t.changedTouches[0]) {
                var i = t.detail && t.detail.x || t.changedTouches && t.changedTouches[0].pageX;
                this.setData({
                    "speedSlider.speedLineStyle": e(i)
                }), this.speedSlider_getLevelLeftOffsets().then(function(e) {
                    return d.speedSlider_getSliderIndex(e, i);
                }).then(function(e) {
                    var t = e.levelLeftCenterXs, i = e.index;
                    d.speedSlider_SetIndex(t, i);
                });
            }
        }
    }
};