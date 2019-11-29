function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.login12306 = void 0;

var a = e(require("../../util")), o = require("../../../../../cwx/cwx"), i = e(require("../../common")), t = require("../../model"), s = require("../../store");

exports.login12306 = {
    data: {
        login12306Name: "",
        login12306Pas: "",
        logedin: 0,
        passengerList12306: []
    },
    methods: {
        inputName: function(e) {
            this.setData({
                login12306Name: e.detail.value
            });
        },
        inputPas: function(e) {
            this.setData({
                login12306Pas: e.detail.value
            });
        },
        goLogin: function() {
            var e = this;
            if (!this.data.login12306Name || !this.data.login12306Pas) return this.showTrainToast("请输入正确的帐号密码");
            this.showTrainLoading("正在登录..."), (0, t.Login12306Model)({
                UserName: this.data.login12306Name,
                Password: this.data.login12306Pas,
                IsCheckExist: 0
            }, function(a) {
                if (0 == a.Code) {
                    var o = a.RequestKey;
                    e.checkLoginStatus(o, function() {
                        e.hideBackDrop(), e.setData({
                            logedin: 1
                        });
                    });
                } else e.showTrainToast("12306故障，请稍候重试");
            }, function(a) {
                e.showTrainToast(a.Message);
            });
        },
        checkLoginStatus: function(e, a) {
            var o = this, i = !1, n = setTimeout(function() {
                clearTimeout(n), i = !0;
            }, 8e3), r = {
                RequestKey: e,
                UserName: this.data.login12306Name,
                Password: this.data.login12306Pas,
                PartnerName: "Ctrip.Train",
                Token: ""
            };
            (0, t.Check12306Model)(r, function(t) {
                if (0 == t.Code || 1 == t.Code) {
                    o.hideTrainLoading(), o.showTrainToast(t.Message, "ok");
                    var n = {
                        name: o.data.login12306Name,
                        pwd: o.data.login12306Pas,
                        passengerList12306: t.PassengerList || []
                    };
                    s.TrainBookStore.setAttr("bind12306", n), a && a(t);
                } else 3 == t.Code ? i ? (o.showTrainToast("系统异常，请稍后重试"), o.hideBackDrop()) : setTimeout(function() {
                    o.checkLoginStatus(e, a);
                }, 1e3) : 4 == t.Code ? ("用户名或密码错误" === t.Message ? o.showTrainToast("输入有误") : o.showTrainToast(t.Message), 
                o.load12306FromStore()) : (o.showTrainToast(t.Message || "系统异常，请稍后重试"), o.hideBackDrop());
            }, function(e) {
                o.showTrainToast(e.Message || "系统异常，请稍后重试"), o.hideBackDrop();
            }, function() {
                o.login12306cb && o.login12306cb();
            });
        },
        cancel: function() {
            this.hideBackDrop();
        },
        load12306FromStore: function() {
            if (s.TrainBookStore.get()) {
                var e = s.TrainBookStore.get().bind12306, a = 0, o = "", i = "", t = void 0;
                e && (a = 1, o = e.name, i = e.pwd, t = e.passengerList12306), this.setData({
                    logedin: a,
                    login12306Name: o,
                    login12306Pas: i,
                    passengerList12306: t
                });
            }
        },
        goToRegister12306: function() {
            this.hideBackDrop();
            var e = {
                url: "../register12306/register12306"
            };
            this.getPageLevel() >= 5 ? o.cwx.redirectTo(e) : this.navigateTo(e);
        },
        refresh12306pas: function() {
            var e = this;
            if (!e.data.login12306Name || !e.data.login12306Pas) return e.showTrainToast("请先登录12306账号"), 
            e.hideBackDrop(), void setTimeout(function() {
                e.showLogin12306();
            }, 500);
            var o = 0, s = function() {
                e.hideTrainLoading(), e.showTrainToast("已导入" + o + "位", "ok"), e.getPassInfo();
            }, n = function() {
                e.hideTrainLoading(), e.showTrainToast("导入12306联系人失败，请稍候再试");
            }, r = function() {
                (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).pas && o++;
            };
            a.default.showModal({
                title: "",
                m: "是否导入您12306账户里的所有联系人？",
                confirmText: "确定导入",
                showCancel: !0,
                cancelText: "返回",
                done: function(a) {
                    a.confirm && (e.data.passengerList12306 && e.data.passengerList12306.length ? (e.showTrainLoading(), 
                    i.default.upload12306pas(e.data.passengerList12306, s, n, r)) : (0, t.Login12306Model)({
                        UserName: e.data.login12306Name,
                        Password: e.data.login12306Pas,
                        IsCheckExist: 0
                    }, function(a) {
                        if (0 == a.Code) {
                            var o = a.RequestKey;
                            e.checkLoginStatus(o, function(a) {
                                e.showTrainLoading(), i.default.upload12306pas(a.PassengerList, s, n, r);
                            });
                        } else e.showTrainToast("12306故障，请稍候重试");
                    }, function(a) {
                        e.showTrainToast(a.Message);
                    }));
                }
            });
        }
    }
};