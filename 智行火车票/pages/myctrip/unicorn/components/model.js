function o(o) {
    var e = (o = void 0 === o ? {} : o).callbacks || {};
    this.url = o.url || "", this.params = this.buildParam(o.params), this.onSuccess = "function" == typeof e.onSuccess ? e.onSuccess : null, 
    this.onError = "function" == typeof e.onError ? e.onError : null, this.onComplete = "function" == typeof e.onComplete ? e.onComplete : null;
}

var e = require("common.js");

o.prototype.execute = function() {
    if (this.url) {
        var o = this;
        cwx.request({
            url: o.url,
            data: o.params,
            success: function(e) {
                e && 200 == e.statusCode && e.data && e.data.ResponseStatus && "Success" === e.data.ResponseStatus.Ack ? o.onSuccess && o.onSuccess(e.data) : o.onError && o.onError(e);
            },
            fail: function(e) {
                o.onError && o.onError(e);
            },
            complete: function(e) {
                o.onComplete && o.onComplete(e);
            }
        });
    }
}, o.prototype.buildParam = function(o) {
    var n = {
        ClientVersion: e.device.getClientVersion(),
        Channel: e.device.getChannel(),
        contentType: "json"
    };
    for (var t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
    return n;
}, module.exports = o;