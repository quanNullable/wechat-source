function e(e) {
    var s = [];
    return e.forEach(function(e) {
        var a = (e.CommonPassengerCard || [])[0] || {};
        s.push({
            mUID: e.UID,
            mPID: e.PassengerID,
            mType: e.PassengerType,
            mCardType: a.CardType,
            mCardNo: a.CardNo,
            mName: e.CNName,
            mBirth: e.Birthday || ""
        });
    }), s;
}

function s(e) {
    return {
        PassengerID: (e = e || {}).mPID || "0",
        PassengerType: e.mType || "A",
        Birthday: e.mBirth,
        CNName: e.mName,
        ConfirmType: "1",
        ENFirstName: "",
        ENLastName: "",
        CommonPassengerCard: [ {
            CardType: e.mCardType || "1",
            CardNo: e.mCardNo
        } ]
    };
}

require("utils.js");

var a = require("service.js"), r = {};

r.get = function(s, r) {
    r = r || {}, (s = s || {}).head = s.head || {}, s.Parameters = [ {
        Key: "BizType",
        Value: "BUS"
    }, {
        Key: "BookingType",
        Value: "B"
    } ], a.getPassengers(s, {
        success: function(s) {
            var a = (s = s || {}).Result || s.result || {};
            if (0 == (a.Result || a.Result)) {
                var u = e(s.CommonPassengers || []);
                r.success && r.success(u);
            } else r.fail && r.fail(a.ErrMessage || "获取常旅信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "获取常旅信息失败");
        }
    });
}, r.save = function(e, r) {
    r = r || {}, (e = e || {}).head = e.head || {}, e.head.auth = e.auth, e.Parameters = [ {
        Key: "BizType",
        Value: "BUS"
    }, {
        Key: "BookingType",
        Value: "B"
    }, {
        Key: "EditType",
        Value: 0
    } ];
    var u = s(e.passenger);
    e.CommonPassenger = u, a.savePassengers(e, {
        success: function(e) {
            var s = (e = e || {}).Result || e.result || {};
            0 == (s.Result || s.Result) ? r.success && r.success(e) : r.fail && r.fail(s.ErrMessage || "添加乘客信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "添加乘客信息失败");
        }
    });
}, r.update = function(e, r) {
    r = r || {}, (e = e || {}).head = e.head || {}, e.head.auth = e.auth, e.Parameters = [ {
        Key: "BizType",
        Value: "BUS"
    }, {
        Key: "BookingType",
        Value: "B"
    }, {
        Key: "EditType",
        Value: 1
    } ];
    var u = s(e.passenger);
    e.CommonPassenger = u, a.updPassengers(e, {
        success: function(e) {
            var s = (e = e || {}).Result || e.result || {};
            0 == (s.Result || s.Result) ? r.success && r.success(e) : r.fail && r.fail(s.ErrMessage || "更新乘客信息失败");
        },
        fail: function(e) {
            r.fail && r.fail(e || "更新乘客信息失败");
        }
    });
}, module.exports = {
    Passengers: r
};