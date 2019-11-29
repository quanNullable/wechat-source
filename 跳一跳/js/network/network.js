function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t, a) {
    var s = {};
    return a.map(function(e) {
        s[e.item_id] = e.poster_min;
    }), e.bottle_skin = s[e.bottle_skin_id], t.map(function(e) {
        e.bottle_skin = s[e.bottle_skin_id];
    }), {
        my_user_info: e,
        user_info: t
    };
}

function s(e, t) {
    var a = t ? e + "(" + t + ")" : e;
    wx.showModal({
        title: "提示",
        content: a,
        showCancel: !1
    });
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = void 0;
    try {
        t = JSON.parse(e.resources) || {};
    } catch (e) {
        t = {};
    }
    var a = void 0, s = void 0;
    return e.expire_time && (s = Math.floor(Date.now() / 1e3), a = e.expire_time - s), 
    {
        display_info: t.display_info || {},
        img: t.display_info && t.display_info.poster,
        use_status: e.useble || 0,
        unlock_wording: t.display_info && t.display_info.unlock_wording,
        left_time: a,
        expire_time: e.expire_time,
        type: t.type,
        id: e.item_id,
        property: t.property
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
}, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a), s && e(t, s), t;
    };
}();

exports.upLoadVerifyPic = function(e) {
    var t = e.path || "", a = e.succ || function() {
        console.log("upLoadVerifyPic need succ func");
    }, n = e.complete || function() {
        console.log("upLoadVerifyPic need complete func");
    }, i = u.default.sessionId || "";
    if (!t || !i) return console.log("upLoadVerifyPic need session_id：" + i + "upLoadVerifyPic need path：" + t), 
    n(), void s("提交失败", "n0");
    console.log(_.AJAX_URL + "/wxagame/wxagame_filetransfer?action=preview"), wx.uploadFile({
        url: _.AJAX_URL + "/wxagame/wxagame_filetransfer?action=preview",
        filePath: t,
        name: "file",
        formData: {
            base_req: JSON.stringify({
                session_id: i,
                fast: 1
            })
        },
        success: function(e) {
            if (console.log("upLoadVerifyPic success", e), 200 == e.statusCode) if (e.data) {
                var t = JSON.parse(e.data);
                if (t.base_resp && 0 == t.base_resp.errcode) {
                    var n = t.content;
                    a(n);
                } else s("提交失败", "e" + t.base_resp.errcode);
            } else s("提交失败", "no res data"); else s("提交失败", "s" + e.statusCode);
        },
        fail: function(e) {
            console.log("upLoadVerifyPic fail", e), s("提交失败", "n1");
        },
        complete: function() {
            n();
        }
    });
}, exports.upLoadVerifySubmit = function(e) {
    var t = u.default.sessionId || "", a = e.complete || function() {
        console.log("upLoadVerifySubmit need complete func");
    }, n = e.succ || function() {
        console.log("upLoadVerifySubmit need succ func");
    }, i = String(e.name), o = String(e.mobile), r = String(e.fileid), d = Number.parseInt(e.is_async) || 0;
    if (!t) return console.log("upLoadVerifySubmit need session_id：" + t), s("提交失败", "n0"), 
    void a();
    var f = {
        base_req: {
            session_id: u.default.sessionId,
            fast: 1
        },
        name: i,
        phone_number: o,
        photo_id: r,
        is_async: d
    };
    wx.request({
        url: _.AJAX_URL + "/wxagame/wxagame_appeal?action=submit",
        method: "POST",
        data: f,
        success: function(e) {
            200 === e.statusCode ? e.data && e.data.base_resp && 0 === e.data.base_resp.errcode ? n() : s("提交失败", "e" + e.data.base_resp.errcode) : s("提交失败", "s" + e.statusCode);
        },
        fail: function() {
            s("提交失败", "n1");
        },
        complete: function() {
            a();
        }
    });
};

var u = e(require("../store/session")), d = e(require("../store/storage")), f = require("../util/encryption"), c = require("./../config"), l = e(require("../lib/mue/eventcenter")), _ = {
    AJAX_URL: "https://mp.weixin.qq.com"
}, m = function() {
    function e() {
        t(this, e);
    }
    return r(e, null, [ {
        key: "onServerConfigForbid",
        value: function(e) {
            this.emmitServerConfigForbid = e;
        }
    }, {
        key: "getUserInfo",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, a = this, s = {
                base_req: {
                    session_id: u.default.sessionId,
                    fast: 1
                }
            };
            return new Promise(function(n, i) {
                function r(t, s) {
                    try {
                        Math.random() < .1 && ("object" == (void 0 === s ? "undefined" : o(s)) && (s = JSON.stringify(s)), 
                        a.badReport("$$getUserInfoFail;" + t + ";" + s + ";"));
                    } catch (e) {
                        console.log(e);
                    }
                    if ("rejectForFail" == t) {
                        var n = /timeout/g;
                        "object" == (void 0 === s ? "undefined" : o(s)) && n.test(s.errMsg) && e.sendServerError(8);
                    }
                    i();
                }
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_getuserinfo",
                    method: "POST",
                    data: s,
                    success: function(e) {
                        if (200 === e.statusCode) if (0 === e.data.base_resp.errcode) {
                            t(e.data);
                            var a = {
                                nickname: e.data.nickname,
                                headimg: e.data.headimg,
                                open_id: e.data.open_id
                            };
                            d.default.saveMyUserInfo(a), n(e.data);
                        } else r("rejectForErrcode", e.data.base_resp.errcode); else r("rejectForStatusCode", e.statusCode);
                    },
                    fail: function(e) {
                        r("rejectForFail", e);
                    }
                });
            });
        }
    }, {
        key: "login",
        value: function() {
            var e = this, t = this.loginPromise = new Promise(function(e, t) {
                console.log("wx.login"), wx.login({
                    success: function(a) {
                        a.code ? (u.default.setLoginState(a.code), e(a.code)) : t("sessionId get fail have no res.code");
                    },
                    fail: function() {
                        console.log("wx.login fail"), t("sessionId get fail");
                    }
                });
            });
            return t.catch(function() {
                e.loginPromise = null;
            }), t;
        }
    }, {
        key: "requestLogin",
        value: function(e) {
            e || (e = function() {}), this.loginPromise || this.login(), this.loginPromise.then(function() {
                e(!0);
            }, function(t) {
                e(!1);
            });
        }
    }, {
        key: "requestFriendsScore",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (!u.default.serverConfig || u.default.serverConfig.friends_score_switch) {
                if (u.default.sessionId) {
                    var t = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        }
                    };
                    return new Promise(function(s, n) {
                        wx.request({
                            url: _.AJAX_URL + "/wxagame/wxagame_getfriendsscore",
                            method: "POST",
                            data: t,
                            success: function(t) {
                                if (200 === t.statusCode) if (0 === t.data.base_resp.errcode) {
                                    if (t.data.bottle_skin_list) {
                                        var i = a(t.data.my_user_info || {}, t.data.user_info, t.data.bottle_skin_list), o = i.user_info, r = i.my_user_info;
                                        t.data.user_info = o, t.data.my_user_info = r;
                                    }
                                    e(!0, t.data), s(t.data);
                                } else e && (e(!1), n()); else e && (e(!1), n());
                            },
                            fail: function(t) {
                                e(!1, !1), n();
                            }
                        });
                    });
                }
                e(!1);
            }
        }
    }, {
        key: "requestSettlement",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (u.default.sessionId) {
                var n = {
                    score: e,
                    times: t,
                    game_data: JSON.stringify(s)
                }, i = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    action_data: (0, f.encrypt)(n, u.default.sessionId)
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_settlement",
                    method: "POST",
                    data: i,
                    success: function(e) {
                        if (200 === e.statusCode) if (0 === e.data.base_resp.errcode) {
                            var t = e.data.cheater_status || 0;
                            if (1 == (e.data.appeal_status || 0)) a(!0, {
                                banType: 2
                            }, e.data); else switch (t) {
                              case 1:
                                a(!0, {
                                    banType: 3
                                }, e.data);
                                break;

                              case 2:
                                a(!0, {
                                    banType: 1
                                }, e.data);
                                break;

                              default:
                                a(!0, {
                                    banType: 0
                                }, e.data);
                            }
                        } else a(!1, "e" + e.data.base_resp.errcode); else a(!1, "s" + e.statusCode);
                    },
                    fail: function(e) {
                        a(!1, "n1");
                    }
                });
            } else a(!1, "n0");
        }
    }, {
        key: "requestCreateGame",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (!u.default.serverConfig || u.default.serverConfig.audience_mode_switch) {
                u.default.sessionId || this.reGetSessionId("requestCreateGame", e);
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    }
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_creategame",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        200 === t.statusCode && 0 === t.data.base_resp.errcode ? e(!0, t) : e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else e(!1, "当前围观人数过多，请稍后再试");
        }
    }, {
        key: "reGetSessionId",
        value: function(e, t) {
            var a = this;
            d.default.clearSessionId(), this.requestLogin(function(s) {
                s ? t ? a[e](t) : a[e]() : t && t(!1);
            });
        }
    }, {
        key: "requestInit",
        value: function(e) {
            if (u.default.sessionId) if (u.default.serverConfig) {
                var t = u.default.serverConfig.version;
                this.requestServerInit(t, e);
            } else this.requestServerInit(0, e);
        }
    }, {
        key: "requestServerInit",
        value: function(e) {
            var t = {
                base_req: {
                    session_id: u.default.sessionId,
                    fast: 1
                },
                version: e
            };
            wx.request({
                url: _.AJAX_URL + "/wxagame/wxagame_init",
                method: "POST",
                data: t,
                success: function(e) {
                    200 === e.statusCode && 0 === e.data.base_resp.errcode && ((e.data.version > u.default.serverConfig.version || !u.default.serverConfig.version) && (u.default.setServerConfig(e.data), 
                    d.default.saveServerConfig(e.data)), console.log("wtf init"), l.default.emit(c.EVENT.INITRESPONSE, e.data));
                },
                fail: function(e) {
                    console.log("Network requestInit fail", e);
                }
            });
        }
    }, {
        key: "requestMmpayBonus",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    }
                };
                console.log("---------------request MMPAY"), wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_getuserstatus",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        200 === t.statusCode ? t.data && 0 !== t.data.base_resp.errcode ? e(!1, t) : t.data ? e(!0, t) : e(!1, t) : e(!1, t);
                    },
                    fail: function(t) {
                        e(!1, t);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "getGroupScore",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1,
                        group_info: {
                            share_ticket: u.default.shareTicket
                        }
                    }
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_getgrouprank",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        if (200 === t.statusCode) if (0 === t.data.base_resp.errcode) {
                            if (console.log(t.data), t.data.bottle_skin_list) {
                                var s = a(t.data.my_user_info || {}, t.data.user_info, t.data.bottle_skin_list), n = s.user_info, i = s.my_user_info;
                                t.data.user_info = n, t.data.my_user_info = i;
                            }
                            e(!0, t);
                        } else e(!1); else e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "createPK",
        value: function(e) {
            return new Promise(function(t, a) {
                if (u.default.sessionId) {
                    wx.showLoading();
                    var s = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        },
                        score: e
                    };
                    wx.request({
                        url: _.AJAX_URL + "/wxagame/wxagame_createpk",
                        method: "POST",
                        data: s,
                        success: function(e) {
                            200 === e.statusCode && 0 === e.data.base_resp.errcode ? (u.default.setPkId(e.data.pk_id), 
                            t()) : a();
                        },
                        fail: function(e) {
                            a();
                        },
                        complete: function() {
                            wx.hideLoading();
                        }
                    });
                } else a();
            });
        }
    }, {
        key: "getBattleData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments[1];
            if (u.default.sessionId && t) {
                var a = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    pk_id: t
                };
                u.default.shareTicket && (a.base_req.group_info = {
                    share_ticket: u.default.shareTicket
                }), wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_getpkinfo",
                    method: "POST",
                    data: a,
                    success: function(t) {
                        200 === t.statusCode && 0 === t.data.base_resp.errcode ? e(!0, t) : e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "updatepkinfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments[1], a = arguments[2];
            if (u.default.sessionId && t) {
                var s = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    pk_id: t,
                    score: a
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_updatepkinfo",
                    method: "POST",
                    data: s,
                    success: function(t) {
                        200 === t.statusCode && 0 === t.data.base_resp.errcode ? e(!0, t) : e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "quitGame",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (u.default.gameId || u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    game_id: u.default.gameId
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_quitgame",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        200 === t.statusCode && 0 === t.data.base_resp.errcode ? e(!0, t) : e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "syncop",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (u.default.gameId || u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    game_id: u.default.gameId
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_syncop",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        200 === t.statusCode && 0 === t.data.base_resp.errcode ? e(!0, t) : e(!1);
                    },
                    fail: function(t) {
                        e(!1);
                    }
                });
            } else callback(!1);
        }
    }, {
        key: "sendReport",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (u.default.sessionId) {
                var a = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1,
                        client_info: t
                    },
                    report_list: e
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_bottlereport",
                    method: "POST",
                    data: a,
                    success: function(e) {},
                    fail: function() {}
                });
            }
        }
    }, {
        key: "sendEggReport",
        value: function(e) {
            if (u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    egg_info_list: e
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_eggreport",
                    method: "POST",
                    data: t,
                    success: function(e) {
                        console.log("Network sendEggReport success", e);
                    },
                    fail: function() {
                        console.log("Network sendEggReport fail");
                    }
                });
            }
        }
    }, {
        key: "badReport",
        value: function(e, t) {
            var a = wx.getSystemInfoSync(), s = u.default.sessionId || "", e = "nickName:" + d.default.getMyUserInfo().nickname + ",model:" + a.model + ",SDKVersion:" + a.SDKVersion + ",version:" + a.version + ",subVersion:" + c.SUBVERSION + ",sessionId:" + s + ",errmsg:" + e + ",stack:" + t;
            this.requestBadjs(130, e);
        }
    }, {
        key: "logReport",
        value: function(e) {
            var t = wx.getSystemInfoSync(), a = (u.default.sessionId, "nickName:" + d.default.getMyUserInfo().nickname + ",model:" + t.model + ",SDKVersion:" + t.SDKVersion + ",version:" + t.version + ",subVersion:" + c.SUBVERSION + ",logMsg:" + e);
            this.requestBadjs(150, a);
        }
    }, {
        key: "requestBadjs",
        value: function(e, t) {
            wx.request({
                url: "https://badjs.weixinbridge.com/badjs",
                data: {
                    id: e,
                    level: 4,
                    msg: t + "$"
                },
                success: function(e) {},
                fail: function(e) {}
            });
        }
    }, {
        key: "sendServerError",
        value: function(e) {
            if (u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    id: 3,
                    key: e
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_jsreport",
                    method: "POST",
                    data: t,
                    success: function(e) {},
                    fail: function() {}
                });
            }
        }
    }, {
        key: "createRouterId",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            if (u.default.sessionId) {
                var t = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    }
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_allocrouteid",
                    method: "POST",
                    data: t,
                    success: function(t) {
                        200 === t.statusCode ? t.data && t.data.base_resp && 0 === t.data.base_resp.errcode ? (e(!0, t.data.route_id), 
                        console.log("Network createRouterId: ", t.data.route_id)) : e(!1, "e" + t.data.base_resp.errcode) : e(!1, "s" + t.statusCode);
                    },
                    fail: function(t) {
                        e(!1, "n1");
                    }
                });
            } else e(!1, "n0");
        }
    }, {
        key: "getWeeklyPlayBack",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments[1];
            if (u.default.sessionId && t) {
                var a = {
                    base_req: {
                        session_id: u.default.sessionId,
                        fast: 1
                    },
                    game_version: c.VERSION,
                    action: "weekly_rank",
                    playback_id: t
                };
                wx.request({
                    url: _.AJAX_URL + "/wxagame/wxagame_playback",
                    method: "POST",
                    data: a,
                    success: function(t) {
                        var a = Object.assign({}, t);
                        if (200 === a.statusCode) {
                            if (!a.data || 0 === a.data.base_resp.errcode) return a.data && a.data.game_data ? (a.data.game_data = JSON.parse(a.data.game_data), 
                            a.data.bottle_skin_data = n(a.data.bottle_skin), void e(!0, a)) : void e(!1, a);
                            e(!1, a);
                        } else e(!1, a);
                    },
                    fail: function(t) {
                        e(!1, t);
                    }
                });
            } else e(!1);
        }
    }, {
        key: "getFriendPlayBack",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_playback", a = {
                open_playback_id: e,
                game_version: c.VERSION
            };
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: a
            }).then(function(e) {
                return e && e.game_data ? (e.game_data = JSON.parse(e.game_data), e.bottle_skin_data = n(e.bottle_skin), 
                Promise.resolve(e)) : Promise.reject();
            }, function() {
                Promise.reject();
            });
        }
    }, {
        key: "getOpenPlaybackData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = _.AJAX_URL + "/wxagame/wxagame_setplayback", a = {
                action: "weekly_rank",
                query: e
            };
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: a
            }).then(function(e) {
                return new Promise(function(t, a) {
                    e.qrcode_img && e.open_playback_id ? t(e) : a();
                });
            }, function() {
                return Promise.reject();
            });
        }
    }, {
        key: "syncSelectedBottleSkin",
        value: function(e) {
            return new Promise(function(t, a) {
                if (u.default.sessionId && e) {
                    var s = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        },
                        item_id: e
                    };
                    wx.request({
                        url: _.AJAX_URL + "/wxagame/wxagame_selectbottleskin",
                        method: "POST",
                        data: s,
                        success: function(e) {
                            200 === e.statusCode ? e.data && 0 !== e.data.base_resp.errcode ? a(e) : t() : a(e);
                        },
                        fail: function(e) {
                            a(e);
                        }
                    });
                } else a();
            });
        }
    }, {
        key: "getBottleSkinShopData",
        value: function() {
            return new Promise(function(e, t) {
                function a(e) {
                    return {
                        canUseSkinIdList: e.item_list.filter(function(e) {
                            return 1 == e.useble;
                        }).map(function(e) {
                            return e.item_id;
                        }),
                        bottleSkinShopList: e.item_list.map(function(e) {
                            return n(e);
                        })
                    };
                }
                if (u.default.sessionId) {
                    var s = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        }
                    };
                    wx.request({
                        url: _.AJAX_URL + "/wxagame/wxagame_getskincenter",
                        method: "POST",
                        data: s,
                        success: function(s) {
                            if (200 === s.statusCode) if (s.data && 0 !== s.data.base_resp.errcode) t(s); else if (s.data && s.data.item_list) {
                                var n = a(s.data);
                                e(n);
                            } else t(s); else t(s);
                        },
                        fail: function(e) {
                            t(e);
                        }
                    });
                } else t();
            });
        }
    }, {
        key: "getUserProfile",
        value: function(e) {
            return new Promise(function(t, a) {
                function s(e) {
                    return {
                        highest_score: e.history_best_score,
                        week_best_score: e.week_best_score,
                        headimg: e.headimg,
                        nickname: e.nickname,
                        praise_info: e.praise_info,
                        playback_poster: e.playback_poster || ""
                    };
                }
                if (u.default.sessionId) {
                    var n = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        },
                        open_user_id: e
                    };
                    wx.request({
                        url: _.AJAX_URL + "/wxagame/wxagame_getpersonaldetail",
                        method: "POST",
                        data: n,
                        success: function(e) {
                            200 === e.statusCode ? e.data && 0 !== e.data.base_resp.errcode ? a(e) : e.data && e.data.user_info ? t(s(e.data.user_info)) : a(e) : a(e);
                        },
                        fail: function(e) {
                            a(e);
                        }
                    });
                } else a();
            });
        }
    }, {
        key: "sendLikeTo",
        value: function(e) {
            return new Promise(function(t, a) {
                if (u.default.sessionId) {
                    var s = {
                        base_req: {
                            session_id: u.default.sessionId,
                            fast: 1
                        },
                        open_user_id: e
                    };
                    wx.request({
                        url: _.AJAX_URL + "/wxagame/wxagame_praise",
                        method: "POST",
                        data: s,
                        success: function(e) {
                            e.data.over_limit ? a({
                                overLimit: e.data.over_limit
                            }) : t();
                        },
                        fail: function(e) {
                            a(e);
                        }
                    });
                } else a();
            });
        }
    }, {
        key: "requestWithId",
        value: function(e) {
            function t(e) {
                var t = e.sessionId, a = e.opt;
                a.data = a.data || {}, a.data.base_req = {
                    session_id: t,
                    fast: 1
                };
                var s = a.success, n = a.fail;
                a.success = function(e) {
                    200 === e.statusCode ? 0 === e.data.base_resp.errcode ? s(e.data) : n("errcode unexpected:" + e.data.base_resp.errcode) : n("status code unexpected:" + e.statusCode);
                }, wx.request(i({}, a));
            }
            if (!e.url) return console.error("requestWithId need url"), void (!("function" != typeof e.fail) && e.fail("requestWithId need url"));
            var a = e.fail = e.fail || function() {
                console.error("requestWithId need fail function");
            };
            e.success = e.success || function() {
                console.error("requestWithId need success function");
            };
            u.default.sessionId ? t({
                sessionId: u.default.sessionId,
                opt: e
            }) : this.loginPromise ? this.loginPromise.then(function(a) {
                t({
                    sessionId: a,
                    opt: e
                });
            }, function(e) {
                a(e);
            }) : (this.login(), this.loginPromise.then(function(a) {
                t({
                    sessionId: a,
                    opt: e
                });
            }, function(e) {
                a(e);
            }));
        }
    }, {
        key: "requestWithIdPromise",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = null;
            return t.data = "object" === o(t.data) ? t.data : {}, (a = "object" !== (void 0 === t ? "undefined" : o(t)) || "object" != o(t.data) || Array.isArray(t.data) ? Promise.reject("opt or optData is not an pureObject") : new Promise(function(a, s) {
                var n = t.success || function() {}, o = t.fail || function() {};
                t.success = function(e) {
                    "function" == typeof n && n(e), a(e);
                }, t.fail = function(e) {
                    "function" == typeof o && o(e), s(e);
                }, e.requestWithId(i({}, t));
            })).catch(function(e) {
                console.log("requestWithIdPromise Error", t, e);
            }), a;
        }
    }, {
        key: "requestMsg",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_getmsglist";
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: e
            });
        }
    }, {
        key: "requestMsgRedPot",
        value: function() {
            var e = _.AJAX_URL + "/wxagame/wxagame_getunreadmsgcount", t = {
                type: 1
            };
            return this.requestWithIdPromise({
                url: e,
                method: "POST",
                data: t
            });
        }
    }, {
        key: "getproperty",
        value: function() {
            var e = _.AJAX_URL + "/wxagame/wxagame_getproperty", t = {};
            return this.requestWithIdPromise({
                url: e,
                method: "POST",
                data: t
            });
        }
    }, {
        key: "useproperty",
        value: function(e) {
            var t = e.property_id, a = e.seed, s = _.AJAX_URL + "/wxagame/wxagame_useproperty", n = {
                property_id: t,
                seed: a
            };
            return this.requestWithIdPromise({
                url: s,
                method: "POST",
                data: n
            });
        }
    }, {
        key: "revertproperty",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            if (u.default.sessionId) {
                var a = _.AJAX_URL + "/wxagame/wxagame_revertproperty", s = {
                    score: t,
                    game_data: JSON.stringify(e)
                }, n = {
                    action_data: (0, f.encrypt)(s, u.default.sessionId)
                };
                return this.requestWithIdPromise({
                    url: a,
                    method: "POST",
                    data: n
                });
            }
        }
    }, {
        key: "getGiftData",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_getgift", a = {
                gift_id: e
            };
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: a
            });
        }
    }, {
        key: "getSkin",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_getskin";
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: e
            });
        }
    }, {
        key: "getBlock",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_geteggobject";
            return this.requestWithIdPromise({
                url: t,
                method: "POST",
                data: e
            });
        }
    }, {
        key: "getAdReward",
        value: function() {
            var e = _.AJAX_URL + "/wxagame/wxagame_adreward", t = {};
            return this.requestWithIdPromise({
                url: e,
                method: "POST",
                data: t
            });
        }
    }, {
        key: "showBannerAd",
        value: function() {
            var e = _.AJAX_URL + "/wxagame/wxagame_adbanner", t = {};
            return this.requestWithIdPromise({
                url: e,
                method: "POST",
                data: t
            });
        }
    }, {
        key: "sceneLogin",
        value: function(e) {
            var t = _.AJAX_URL + "/wxagame/wxagame_scenelogin";
            this.requestWithId({
                url: t,
                method: "POST",
                success: e,
                fail: function() {}
            });
        }
    } ]), e;
}();

exports.default = m;