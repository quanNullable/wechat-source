function e(e, n, i) {
    var o = {
        orderNumber: i,
        passengerList: n,
        mobile: e
    };
    return new t(function(e, n) {
        (0, r.BindBankCardModel)(o, function(n) {
            e();
        }, function(n) {
            e();
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BindBankCard = e, exports.CheckIsBindBankCard = function(e) {
    var n = {
        orderNumber: e
    };
    return new t(function(e, t) {
        (0, r.CheckIsBindBankCardModel)(n, function(n) {
            e(1 == n.resultCode);
        });
    });
}, exports.StartActivateCardWeak = function(r) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], o = arguments[2], u = i.filter(function(e) {
        return !e.isChild;
    }).map(function(e) {
        return {
            mobile: r,
            name: e.cname,
            idCardNo: e.idcard.no,
            cardType: n.default.getCardType(parseInt(e.idcard.type)),
            isSelf: !1
        };
    });
    return new t(function(n, t) {
        e(r, u, o).then(function(e) {
            n();
        }).catch(function(e) {
            console.log(e), n();
        });
    });
};

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util")), r = require("./model"), t = require("./libs/es6-promise");