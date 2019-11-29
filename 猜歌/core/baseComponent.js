var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = (require("../utils/weixinHelper.js"), require("../utils/common.js")), o = (require("../config/errorenum.js"), 
require("../api/systemApi.js")), i = require("../config/urienum.js"), n = require("../utils/cacheHepler.js"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/deepAssign.js")), s = require("../utils/memoryHelper.js");

module.exports = {
    baseComponent: function(u) {
        var a = {
            data: {
                imageBase: i.imageBase,
                videoBase: i.videoBase
            }
        }, m = {
            attached: function() {
                this.notification = this.selectComponent("#notification"), (0, t.isFunction)(u.onInit) && u.onInit.apply(this);
            },
            methods: {
                showLoading: function(e, t) {
                    wx.showLoading({
                        title: e,
                        mark: !0
                    });
                },
                hideLoading: function() {
                    wx.hideLoading();
                },
                getMemory: s.getMemory,
                setMemory: s.setMemory,
                getCache: n.getCache,
                setCache: n.setCache,
                isEmpty: t.isEmpty,
                submitFormId: function(t) {
                    "object" == (void 0 === t ? "undefined" : e(t)) ? (0, o.addFormId)(t.detail.formId) : (0, 
                    o.addFormId)(t);
                }
            }
        };
        return (0, r.default)(a, m, u);
    }
};