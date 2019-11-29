var e = require("../../cwx/cwx");

module.exports = {
    choosePassenger: function(s, a, n, o) {
        if ("function" == typeof s) {
            var c = e.cwx.getCurrentPage(), r = {
                maxCount: a,
                choosedPassengers: n,
                filterFunc: o.bind(c)
            };
            c.navigateTo({
                url: "/pages/passenger/passengerlist",
                data: r,
                callback: s.bind(c)
            });
        } else console.log("调用方式不正确, choosePassenger 的 callback 为必填项, 且为第一个参数!");
    }
};