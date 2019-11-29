function e() {
    function e(e) {
        wx.request(r.getRequestObjectV1("wxUserApi/getOpenId", e, function(e) {
            e && e.data && 200 == e.statusCode ? (n.cwx.user.openid = e.data, o.resolve(e.data)) : o.reject(e);
        }, function(e) {
            o.reject(e);
        }));
    }
    var o = t.default.getDeferred();
    n.cwx.user.openid ? o.resolve(n.cwx.user.openid) : n.cwx.login({
        success: function(t) {
            t.code && "the code is a mock one" != t.code ? e({
                Channel: n.cwx.config.channel3,
                RequestToken: t.code
            }) : o.reject(t);
        },
        fail: function(e) {
            o.reject(e);
        }
    }), c = o.promise;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("../../../cwx/cwx"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util")), o = require("./model"), r = require("../../../pages/accounts/common.js"), c = null, u = {
    upload12306pas: function(e, r, c, a) {
        if (e) {
            if (0 == e.length) return void (r && r());
            var s = e[0];
            if (1 != s.CheckStatus) return void u.upload12306pas(e.slice(1), r, c, a);
            var i = {
                Channel: n.cwx.config.partner,
                TrainModifyInfo: {
                    CNName: s.PassengerName,
                    IdentityNo: s.IDNo,
                    IdentityType: function(e) {
                        switch (s.IDType) {
                          case "1":
                          case 1:
                          default:
                            return 1;

                          case "C":
                            return 7;

                          case "G":
                            return 8;

                          case "B":
                            return 2;
                        }
                    }(),
                    PassengerType: s.PassengerType
                }
            }, d = function() {
                t.default.hideLoading(), t.default.showToast("导入12306联系人失败，请稍候再试");
            };
            (0, o.TrainModifyPassengerModel)(i, function(n) {
                n && 1 == n.RetCode ? (a && a({
                    pas: e[0]
                }), u.upload12306pas(e.slice(1), r, c, a)) : d.call(null);
            }, function(e) {
                d.call(null);
            }, function() {});
        }
    },
    getOpenId: function() {
        return c || e(), c;
    }
};

exports.default = u;