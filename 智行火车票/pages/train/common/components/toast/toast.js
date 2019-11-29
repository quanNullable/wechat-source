Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.trainToast = function() {
    return {
        data: {
            trainToast: {
                type: "",
                text: "",
                mask: !1,
                timeoutId: null
            }
        },
        methods: {
            showCustomToast: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = t.type, s = t.text, a = t.duration, e = t.mask;
                if (o && s) {
                    var i = this, n = this.data.trainToast.timeoutId;
                    n && clearTimeout(n), n = setTimeout(function() {
                        i.resetCustomToast();
                    }, a || 1500), this.setData({
                        trainToast: {
                            type: o,
                            text: s,
                            mask: e,
                            timeoutId: n
                        }
                    });
                }
            },
            hideCustomToast: function() {
                this.resetCustomToast();
            },
            resetCustomToast: function() {
                this.data.trainToast.timeoutId && clearTimeout(this.data.trainToast.timeoutId), 
                this.setData({
                    trainToast: {
                        type: "",
                        text: "",
                        mask: !1,
                        timeoutId: null
                    }
                });
            },
            showTrainToast: function(t, o) {
                this.showCustomToast({
                    type: o || "fail",
                    text: t
                });
            },
            showTrainLoading: function(t) {
                this.showCustomToast({
                    type: "loading",
                    text: t || "加载中...",
                    duration: 1e4,
                    mask: !0
                });
            },
            hideTrainLoading: function() {
                this.resetCustomToast();
            }
        }
    };
};