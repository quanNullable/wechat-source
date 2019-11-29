function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../utils/api.js")), e = (require("../utils/config.js"), a(require("../image/script/image.js"))), s = a(require("../sms/script/sms.js")), i = a(require("../voice/script/voice.js")), c = a(require("../slidervalid/script/slider.plugin.js")), r = a(require("../lbs/script/lbs.js")), u = a(require("../buying/script/buying.js")), d = (new t.default(), 
{
    data: {
        show: 0
    },
    onLoad: function() {
        var a = this;
        wx.getStorage({
            key: "yodaPageData",
            success: function(t) {
                var d = t.data, n = {
                    data: d,
                    success: d.success,
                    fail: d.fail,
                    style: d.style
                };
                switch (Number(d.type)) {
                  case 1:
                    a.setData({
                        show: 1
                    }), Object.keys(e.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, e.default.data) : a[t] = e.default[t];
                    }), a.initImageSDK(n);
                    break;

                  case 4:
                    a.setData({
                        show: 4
                    }), Object.keys(s.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, s.default.data) : a[t] = s.default[t];
                    }), a.initSmsSDK(n);
                    break;

                  case 40:
                    a.setData({
                        show: 40
                    }), Object.keys(i.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, i.default.data) : a[t] = i.default[t];
                    }), a.initVoiceSDK(n);
                    break;

                  case 69:
                    a.setData({
                        show: 69
                    }), Object.keys(u.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, u.default.data) : a[t] = u.default[t];
                    }), a.initBuyingSDK(n);
                    break;

                  case 71:
                    a.setData({
                        show: 71
                    }), Object.keys(c.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, c.default.data) : a[t] = c.default[t];
                    }), a.initSliderSDK(n);
                    break;

                  case 79:
                    a.setData({
                        show: 79
                    }), Object.keys(r.default).forEach(function(t) {
                        "data" === t ? Object.assign(a.data, r.default.data) : a[t] = r.default[t];
                    }), a.initLbsSDK(n);
                }
            }
        });
    },
    navigate: function(a) {
        var t = a.options, e = a.url;
        if (wx.removeStorage({
            key: "yodaPageData",
            success: function(a) {}
        }), t && "back" === t.navigate) {
            var s = e.split("?")[1].split("&"), i = Object.create(null);
            s.forEach(function(a) {
                var t = a.split("=");
                i[t[0]] = t[1];
            }), getApp().yodaVerifyData = i;
            var c = t.delta || 1;
            wx.navigateBack({
                delta: c
            });
        } else wx.redirectTo({
            url: e
        });
    }
});

Page(d);