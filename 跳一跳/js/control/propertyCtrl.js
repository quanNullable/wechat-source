function r(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}

function e(r) {
    if (Array.isArray(r)) {
        for (var e = 0, t = Array(r.length); e < r.length; e++) t[e] = r[e];
        return t;
    }
    return Array.from(r);
}

function t(r, e) {
    if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function r(r, e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(r, i.key, i);
        }
    }
    return function(e, t, i) {
        return t && r(e.prototype, t), i && r(e, i), e;
    };
}(), n = r(require("../network/network")), o = r(require("../control/networkCtrl")), p = (r(require("../lib/mue/eventcenter")), 
require("../config")), u = {
    propArray: [],
    item_list: []
}, a = function() {
    function r() {
        t(this, r);
    }
    return i(r, null, [ {
        key: "getProps",
        value: function() {
            var r = this, e = o.default.getPropperty();
            return e.then(function(e) {
                u.propArray = e.property_list, u.item_list = e.item_list, r.prepareAllIcon();
            }, function() {}), e;
        }
    }, {
        key: "getPropsData",
        value: function() {
            return [].concat(e(u.propArray));
        }
    }, {
        key: "getSuccPropList",
        value: function() {
            var r = u.succ_property_list || [];
            return [].concat(e(r));
        }
    }, {
        key: "canUseProp",
        value: function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = !1;
            return e = this.getFirstPropByClass(r) > -1, this.resetUsingList(), e;
        }
    }, {
        key: "confirmUsingProp",
        value: function(r) {
            var e = this, t = r.id, i = r.game, o = r.seed, p = new Promise(function(r, i) {
                var p = e.getFirstPropByClass(t);
                if (p > -1) {
                    var a = u.propArray[p].property_id;
                    n.default.useproperty({
                        property_id: a,
                        seed: o
                    }).then(function() {
                        r(a);
                    }, function() {
                        i({
                            type: 1,
                            errMsg: "property_id confirm fail",
                            property_id: a,
                            item_id: t
                        });
                    });
                } else i({
                    type: 0,
                    errMsg: "can not find any props"
                });
            });
            return p.then(function(r) {
                e.usingProp(t, r, i);
            }, function(r) {
                console.log(r), r.property_id && r.item_id && e.addFail(r.item_id, r.property_id);
            }), p;
        }
    }, {
        key: "usingProp",
        value: function(r, e, t) {
            if (Array.isArray(u.propArray)) {
                var i = u.propArray.findIndex(function(r) {
                    return r.property_id == e;
                });
                i > -1 && (u.propArray.splice(i, 1), this.gameUsingProp(r, t, {
                    property_id: e,
                    item_id: r
                }), this.addSuccess(r, e));
            }
        }
    }, {
        key: "gameUsingProp",
        value: function(r, e, t) {
            switch (r) {
              case 1:
                e.wellJump(t);
            }
        }
    }, {
        key: "reviewUsingProp",
        value: function(r, e, t) {
            switch (r) {
              case 1:
                e.wellJump(t), this.audienceWatchPropAni(e, r);
            }
        }
    }, {
        key: "observeUsingProp",
        value: function(r, e, t) {
            switch (r) {
              case 1:
                e.observeWellJump(t), this.audienceWatchPropAni(e, r);
            }
        }
    }, {
        key: "getFirstPropById",
        value: function(r) {
            return this.getPropById("property_id", r);
        }
    }, {
        key: "getFirstPropByClass",
        value: function(r) {
            return this.getPropById("item_id", r);
        }
    }, {
        key: "getPropById",
        value: function(r, e) {
            var t = -1;
            return Array.isArray(u.propArray) && (t = u.propArray.findIndex(function(t) {
                return t[r] == e;
            })), t;
        }
    }, {
        key: "resetUsingList",
        value: function() {
            u.succ_property_list = [], u.fail_property_list = [];
        }
    }, {
        key: "addSuccess",
        value: function(r, e) {
            Array.isArray(u.succ_property_list) || (u.succ_property_list = []), u.succ_property_list.push({
                item_id: r,
                property_id: e
            });
        }
    }, {
        key: "addFail",
        value: function(r, e) {
            Array.isArray(u.fail_property_list) || (u.fail_property_list = []), u.fail_property_list.push({
                item_id: r,
                property_id: e
            });
        }
    }, {
        key: "handleGameOver",
        value: function(r) {
            var e = this;
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            u.fail_property_list && u.fail_property_list.length && (r.succ_property_list = u.succ_property_list.slice(0), 
            r.fail_property_list = u.fail_property_list.slice(0), n.default.revertproperty(r, 0).then(function() {
                e.getProps();
            }, function() {
                e.getProps();
            }));
        }
    }, {
        key: "prepareAllIcon",
        value: function() {
            var r = [];
            for (var e in p.PROP_BOARD.skin) {
                var t = this.prepareSingleSkin(e);
                r.push(t);
            }
            return Promise.all(r);
        }
    }, {
        key: "prepareSingleSkin",
        value: function(r) {
            new Promise(function(e, t) {
                p.PROP_BOARD.skinTexture[r] || e(), p.loader.load(p.PROP_BOARD.skin[r], function(t) {
                    p.PROP_BOARD.skinTexture[r] = t, e();
                }, function() {}, function() {
                    t();
                });
            });
        }
    }, {
        key: "audienceWatchPropAni",
        value: function(r, e) {
            r && r.UI && r.UI.audienceWatchPropAni && r.UI.audienceWatchPropAni(e);
        }
    }, {
        key: "checkUsingProp",
        value: function() {
            return !(!u.succ_property_list || !u.succ_property_list.length);
        }
    } ]), r;
}();

exports.default = a;