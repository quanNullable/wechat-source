var e = require("../models/models.js"), o = require("../models/stores.js"), t = e.ExceptionInfoCollectModel, r = o.OrderDetailStore(), d = o.OrderDetailExtendStore(), i = o.PayResultOrderStore(), l = {};

l.exceptionInfoCollect = function(e) {
    t({
        data: e
    }).excute();
}, l.setTempOid = function(e) {
    e && e.oidex && 0 != e.oidex && i.setAttr("realoid", e.oidex);
}, l.clearStore = function() {
    r.remove(), d.remove();
}, module.exports = l;