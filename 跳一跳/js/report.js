function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var a = 0; a < n.length; a++) {
            var r = n[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, a, r) {
        return a && e(n.prototype, a), r && e(n, r), n;
    };
}(), a = function() {
    function a(n) {
        e(this, a);
    }
    return n(a, null, [ {
        key: "frameReport",
        value: function(e, n) {
            var a = 0;
            switch (e) {
              case "iPhone5":
                a = 1;
                break;

              case "iPhone5s":
                a = 2;
                break;

              case "iPhone6":
                a = 3;
                break;

              case "iPhone6s":
                a = 4;
                break;

              case "iPhone6Plus":
                a = 5;
                break;

              case "iPhone6sPlus":
                a = 6;
                break;

              case "iPhone7":
                a = 7;
                break;

              case "iPhone7s":
                a = 8;
                break;

              case "iPhone7Plus":
                a = 9;
                break;

              case "iPhone7sPlus":
                a = 10;
                break;

              case "iPhone8":
                a = 11;
                break;

              case "iPhone8Plus":
                a = 12;
                break;

              case "iPhoneX":
                a = 13;
            }
            new Image().src = "https://mp.weixin.qq.com/mp/jsmonitor?idkey=58121_" + 3 * a + "_" + n + ";58121_" + (3 * a + 1) + "_1&t=" + Math.random();
        }
    } ]), a;
}();

exports.default = a;