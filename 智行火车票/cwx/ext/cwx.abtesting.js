var e = function() {
    var e, a = function(e) {
        console.log("ABTestingManager setLocalStore with ob = ", e), wx.setStorage({
            key: "ABTestingManager",
            data: e
        });
    }, t = function(e) {
        var a = wx.getStorageSync("ABTestingManager");
        if (a) for (var t = 0; t < a.length; t++) {
            var n = a[t];
            if (n.expCode == e) return n.abValue;
        }
        return null;
    }, n = function(e, a) {
        wx.getStorage({
            key: "ABTestingManager",
            success: function(t) {
                if (t && t.data) {
                    for (var n = t.data, r = null, o = 0; o < n.length; o++) {
                        var s = n[o];
                        if (s.expCode == e) {
                            r = s.abValue;
                            break;
                        }
                    }
                    a && a(r);
                }
            }
        });
    }, r = function(e) {
        wx.request({
            url: "https://m.ctrip.com/restapi/soa2/12378/getWeixinABData",
            data: {
                head: {
                    cid: e
                },
                appId: "5003"
            },
            method: "POST",
            success: function(e) {
                "200" == e.statusCode && e.data && e.data.abResult && a(e.data.abResult);
            },
            fail: function(e) {
                console.log("fail res = ", e);
            }
        });
    };
    return e || (e = {}), e.fetchABService = r, e.valueForKeySync = t, e.valueForKeyAsync = n, 
    e;
}();

module.exports = e;