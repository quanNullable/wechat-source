function t(t) {
    this.settings = e.extend({
        url: "",
        method: "POST",
        data: {},
        success: function() {},
        fail: function() {}
    }, t || {});
}

require("../config/config.js"), require("../models/stores.js").OrderDetailStore(), 
require("../common/util.js");

var e = require("../../../3rd/lodash.core.min.js");

e.extend(t.prototype, {
    constructor: t,
    excute: function() {
        var t = this, e = this.settings.data, s = "https://order.tieyou.com/index.php?param=" + this.settings.url + ".html&requestType=rep";
        wx.request({
            url: s,
            _data: e,
            success: function(e) {
                t.settings.success(e.data);
            },
            fail: function(e) {
                t.settings.fail(e.data);
            }
        });
    }
}), module.exports = {
    BaseModel: t
};