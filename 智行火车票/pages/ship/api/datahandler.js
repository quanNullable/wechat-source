function e(e, a) {
    var s = [];
    return e.forEach(function(e) {
        var n = e.CommonPassengerCard || [], t = {}, i = e.PassengerID, t = {};
        if (a[i]) {
            var u = a[i];
            n.length > 0 && n.forEach(function(e) {
                e.CardType == u && (t = e || {});
            });
        } else t = (e.CommonPassengerCard || [])[0] || {};
        s.push({
            mUID: e.UID,
            mPID: e.PassengerID,
            mType: r.PASSENGER_TYPE[e.PassengerType || "A"],
            mCardType: r.CARDS_TYPE[t.CardType],
            mCardNo: t.CardNo,
            mName: e.CNName,
            mBirth: e.Birthday,
            enFirstName: e.ENFirstName,
            enLastName: e.ENLastName,
            gender: e.Gender,
            Nationality: e.Nationality
        });
    }), s;
}

function a(e) {
    return {
        PassengerID: (e = e || {}).mPID || "0",
        PassengerType: e.mType || "A",
        Birthday: e.mBirth,
        CNName: e.mName,
        ConfirmType: "1",
        ENFirstName: e.surname || "",
        ENLastName: e.givenname || "",
        Nationality: e.Nationality || "",
        Gender: e.gender || "",
        CommonPassengerCard: [ {
            CardType: e.mCardType || "1",
            CardNo: e.mCardNo
        } ]
    };
}

require("../common/utils.js");

var s = require("api.js"), r = require("../common/global.js"), n = {};

n.get = function(a, r, n) {
    r = r || {}, (a = a || {}).head = a.head || {}, a.Parameters = [ {
        Key: "BizType",
        Value: "SHIP"
    }, {
        Key: "BookingType",
        Value: "B"
    } ], s.getPassengers(a, {
        success: function(a) {
            var s = (a = a || {}).Result || a.result || {};
            if (0 == (s.Result || s.Result)) {
                var t = e(a.CommonPassengers || [], n);
                r.success && r.success(t);
            } else r.fail && r.fail(s.ErrMessage || "获取常旅信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "获取常旅信息失败");
        }
    });
}, n.save = function(e, r) {
    r = r || {}, (e = e || {}).head = e.head || {}, e.head.auth = e.auth, e.Parameters = [ {
        Key: "BizType",
        Value: "SHIP"
    }, {
        Key: "BookingType",
        Value: "B"
    }, {
        Key: "EditType",
        Value: 0
    } ];
    var n = a(e.passenger);
    e.CommonPassenger = n, s.savePassengers(e, {
        success: function(e) {
            var a = (e = e || {}).Result || e.result || {};
            0 == (a.Result || a.Result) ? r.success && r.success(e) : r.fail && r.fail(a.ErrMessage || "添加乘客信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "添加乘客信息失败");
        }
    });
}, n.update = function(e, r) {
    r = r || {}, (e = e || {}).head = e.head || {}, e.head.auth = e.auth, e.Parameters = [ {
        Key: "BizType",
        Value: "SHIP"
    }, {
        Key: "BookingType",
        Value: "B"
    }, {
        Key: "EditType",
        Value: 1
    } ];
    var n = a(e.passenger);
    e.CommonPassenger = n, s.updPassengers(e, {
        success: function(e) {
            var a = (e = e || {}).Result || e.result || {};
            0 == (a.Result || a.Result) ? r.success && r.success(e) : r.fail && r.fail(a.ErrMessage || "更新乘客信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "更新乘客信息失败");
        }
    });
}, module.exports = {
    Passengers: n
};