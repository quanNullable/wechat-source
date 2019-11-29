Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    var o, r = e.Symbol;
    return "function" == typeof r ? r.observable ? o = r.observable : (o = r("observable"), 
    r.observable = o) : o = "@@observable", o;
};