var e = require("../../../cwx/cwx");

module.exports = {
    editPassenger: function(t, a, s, r, i) {
        if ("function" == typeof t) {
            var n = e.cwx.getCurrentPage(), g = {
                passengerInfo: a,
                supportedPasType: s,
                supportedIdType: r,
                flightStartDate: i
            };
            n.navigateTo({
                url: "../flightPassengerEdit/flightPassengerEdit",
                data: g,
                immediateCallback: t.bind(n)
            });
        } else console.log("调用方式不正确, editPassenger 的 callback 为必填项, 且为第一个参数!");
    }
};