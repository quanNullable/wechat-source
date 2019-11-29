function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, t) {
        var i = [], a = !0, s = !1, n = void 0;
        try {
            for (var o, r = e[Symbol.iterator](); !(a = (o = r.next()).done) && (i.push(o.value), 
            !t || i.length !== t); a = !0) ;
        } catch (e) {
            s = !0, n = e;
        } finally {
            try {
                !a && r.return && r.return();
            } finally {
                if (s) throw n;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), s = e(require("../network/network")), n = e(require("../pages/review/review")), o = e(require("../pages/review/shareCard")), r = e(require("../store/storage")), u = require("../shareApp"), c = require("../pages/pages2d/base"), h = e(require("../lib/mue/eventcenter")), l = require("../config"), m = e(require("../control/bottleSkinBaseCtrl")), d = e(require("../control/propertyCtrl")), g = require("../util/forceUpdate"), f = function() {
    function e(i) {
        t(this, e), this.game = i, this.gameCtrl = i.gameCtrl, this.initData();
    }
    return a(e, [ {
        key: "initData",
        value: function() {
            this.isInThisPage = !1, this.isInShareCardPage = !1, this.scene = void 0, this.pause = !1, 
            this.actionList = [], this.musicList = [], this.touchStartList = [], this.index = 0, 
            this._playCache = function() {}, this.gameData = {}, this.reviewPage = null, this.onHide = function() {}, 
            this.skinResources = null, this.shareCardData = null, this.property = {}, this.playback_poster = null;
        }
    }, {
        key: "init",
        value: function(e) {
            function t(e, i) {
                wx.showLoading({
                    mask: !0
                }), a(i, _).then(function(t) {
                    var i = t.gameData, a = t.skinResources;
                    wx.hideLoading(), e(i, a), k.game.reporter.clickReviewBtn(0);
                }, function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    wx.hideLoading(), wx.showModal({
                        title: "提示",
                        content: "获取回放数据失败" + a,
                        confirmText: "重试",
                        cancelText: "取消",
                        success: function(a) {
                            a.confirm ? t(e, i) : _ && k.onHide && k.onHide();
                        },
                        fail: function() {
                            _ && k.onHide && k.onHide();
                        }
                    }), k.game.reporter.clickReviewBtn(1);
                });
            }
            function a(e, t) {
                var a = void 0;
                return new Promise(function(s, n) {
                    c(e, t).then(function(e) {
                        a = e.game_data;
                        var t = e.bottle_skin_data, i = t && t.id ? h(t) : Promise.resolve(void 0);
                        return Promise.all([ i, u(a.skin_id, a.skin_sn) ]);
                    }, function(e) {
                        return Promise.reject(e);
                    }).then(function(e) {
                        var t = i(e, 2), n = t[0];
                        t[1];
                        s({
                            gameData: a,
                            skinResources: n
                        });
                    }, function(e) {
                        n();
                    });
                });
            }
            function u(e, t) {
                return T.loadSkinForOtherMode(e, t);
            }
            function c(e) {
                return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? s.default.getFriendPlayBack(e) : new Promise(function(t, i) {
                    s.default.getWeeklyPlayBack(function(e, a) {
                        var s = "";
                        e ? t(a.data) : (a && a.data && a.data.base_resp && a.data.base_resp.errcode && (s = "，(e" + a.data.base_resp.errcode + ")"), 
                        i(s));
                    }, e);
                });
            }
            function h(e) {
                return m.default.getBottleSkinResourceBySkinData(e);
            }
            function l(e, t) {
                function i() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    k.reviewPage = new n.default({
                        game: k.game,
                        week_best_score: d.week_best_score,
                        is_self: b,
                        is_from_share: _,
                        maxBonusScore: t,
                        succeedTime: i,
                        onChangeProgress: function(e) {
                            k.isChanging = !1, k.changeProgressTo(e);
                        },
                        onTouchStartProgress: function() {
                            k.isChanging = !0;
                        },
                        onHide: function() {
                            k.onHide(), k.destroy();
                        },
                        onOpenSharePage: function() {
                            k.shareCard(d);
                        }
                    }), k.shareReviewCard = new o.default({
                        game: k.game,
                        week_best_score: d.week_best_score,
                        headimg: d.headimg,
                        maxBonusScore: t,
                        succeedTime: i,
                        onShare: function(e) {
                            k.onShareToFriends({
                                open_playback_id: e,
                                week_best_score: d.week_best_score,
                                headimg: d.headimg,
                                is_self: d.is_self,
                                playback_poster: k.playback_poster
                            });
                        },
                        onSave: function(e) {
                            k.onSavePhoto(e);
                        },
                        onCloseSharePage: function() {
                            k.isInShareCardPage = !1, k.onCloseSharePage();
                        }
                    }), k.play(e.seed, e.action, e.musicList, e.timestamp, e.version, e.use_wangzhe, e.mmpay_status, e.use_mmpaybase, e.skin_id, e.property, function() {
                        if (k.game.currentScore && d.week_best_score && k.game.currentScore != d.week_best_score) {
                            s.default.sendServerError(9);
                            if (Math.random() < .01) {
                                var e = r.default.getMyUserInfo(), t = e && e.open_id;
                                t && s.default.badReport("searchflag:reviewNotRight;open_id:" + t + ";playback_id:" + w + ";currentScore:" + k.game.currentScore + ";week_best_score:" + d.week_best_score + ";");
                            }
                        }
                        k.onHide && k.onHide();
                    }), k.reviewPage.show(d, a);
                }
                var a = k.getTotalGameTime(e.timestamp, e.action);
                k.isInThisPage = !0, k.scene = f, k.skinResources = t, k.gameData = e, b ? k.CalGameExtraData(function(e, t) {
                    i(e, t);
                }) : i();
            }
            var d = e.user_data, f = e.scene, p = e.callback, _ = e.is_from_share, v = e.onHide, y = e.playback_poster, k = this, w = d && d.playback_id, b = d && d.is_self, T = this.game.skinManager;
            this.onHide = v || this.onHide, this.playback_poster = y, t(function(e, t) {
                1 === (0, g.compareMyVersion)(e.version) ? (0, g.forceUpdate)(function() {}, "点击确定，进行版本更新后重试") : (p && p(), 
                l(e, t));
            }, w);
        }
    }, {
        key: "CalGameExtraData",
        value: function(e) {
            this.speedUpto(this.gameData.timestamp.length - 1, this.gameData, function(t, i) {
                e && e(t, i);
            });
        }
    }, {
        key: "onSavePhoto",
        value: function(e) {
            e.toTempFilePath({
                x: (0, c.cx)(46),
                y: (0, c.cy)(95),
                width: (0, c.cwh)(322),
                height: (0, c.cwh)(524),
                success: function(e) {
                    wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function() {
                            wx.showToast({
                                title: "保存成功"
                            });
                        }
                    });
                },
                fail: function(e) {}
            });
        }
    }, {
        key: "shareCard",
        value: function(e) {
            function t() {
                i.reviewPage.pause(), i.isInShareCardPage = !0, i.pausePlay(), i.shareReviewCard.show({
                    qrcode: i.shareCardData.qrcode_img,
                    open_playback_id: i.shareCardData.open_playback_id
                });
            }
            e.playback_id;
            var i = this, a = "mode=reviewPage&headimg=" + e.headimg;
            this.shareCardData ? t() : (wx.showLoading({
                mask: !0
            }), s.default.getOpenPlaybackData(a).then(function(e) {
                wx.hideLoading(), i.isInThisPage && (i.shareCardData = e, t());
            }, function() {
                wx.hideLoading(), i.isInThisPage && (i.isInShareCardPage = !1, wx.showToast({
                    title: "获取分享失败",
                    icon: "none"
                }));
            }));
        }
    }, {
        key: "onCloseSharePage",
        value: function() {
            this.continue(), this.reviewPage.continue(), this.setProgressByIndex(this.index);
        }
    }, {
        key: "onShareToFriends",
        value: function(e) {
            var t = e.open_playback_id, i = e.week_best_score, a = e.headimg, s = e.is_self;
            e.playback_poster;
            (0, u.ShareReviewCard)({
                open_playback_id: t,
                week_best_score: i,
                headimg: a,
                is_self: s,
                playback_poster: this.playback_poster,
                cb: function() {}
            });
        }
    }, {
        key: "getTotalGameTime",
        value: function(e, t) {
            var i = e.length;
            return e[i - 1] - e[0] + t[i - 1][0] + 3e3;
        }
    }, {
        key: "changeProgressTo",
        value: function(e) {
            var t = this, i = this.findStep(e);
            this._destroy(), this.speedUpto(i, this.gameData, function() {
                t._playCache();
            }), this.setProgressByIndex(i);
        }
    }, {
        key: "setProgressByIndex",
        value: function(e) {
            var t = void 0;
            if (0 === e) t = .01; else {
                var i = this.getTotalGameTime(this.gameData.timestamp, this.gameData.action), a = this.gameData.timestamp[0];
                t = (this.gameData.timestamp[e - 1] - a) / i;
            }
            this.reviewPage.startProgressBarFrom(t);
        }
    }, {
        key: "findStep",
        value: function(e) {
            var t = this.gameData.timestamp, i = e * this.getTotalGameTime(this.gameData.timestamp, this.gameData.action), a = t[0], s = void 0;
            if (i > t[t.length - 1] - a) s = t.length; else for (s = t.length - 1; s >= 0 && !(i < t[s] - a + 1 && i > t[s - 1] - a); s--) ;
            return s - 1;
        }
    }, {
        key: "destroy",
        value: function(e) {
            this.isInThisPage && (this.reviewPage.hide(), this.game.resetScene(), h.default.emit(l.EVENT.GOTOSINGLESTARTPAGE, {}), 
            this._destroy(), this.isInThisPage = !1, this.initData());
        }
    }, {
        key: "_play",
        value: function(e) {
            var t = this;
            if (this.index < this.actionList.length && !this.pause) {
                var i = this.actionList[this.index][3] || null, a = this.actionList[this.index][1], s = this.musicList[this.index + 1], n = this.actionList[this.index][2], o = this.actionList[this.index][0], r = 0 == this.index ? 0 : this.touchStartList[this.index] - this.touchStartList[this.index - 1];
                this.timer = setTimeout(function() {
                    ++t.index, "stop" != t.game.bottle.status ? (t.speedUpto(t.index - 2, t.gameData, function() {
                        t._play(e);
                    }), t.setProgressByIndex(t.index)) : (t.isChanging && t.setProgressByIndex(t.index), 
                    1 == i || t.game.touchStartAnim({
                        fromReview: !0
                    }), t.jumpTimer = setTimeout(function() {
                        1 == i ? d.default.reviewUsingProp(i, t.game, {
                            quick: n,
                            musicScore: s
                        }) : t.game.touchEndAnim(o, a, n, s), t.index == t.actionList.length && (t.overTimeout = setTimeout(function() {
                            e();
                        }, 3e3));
                    }, 1 == i ? 0 : 1e3 * o), t._play(e), t._playCache = function() {
                        t._play(e);
                    });
                }, r);
            } else this.pause;
        }
    }, {
        key: "pausePlay",
        value: function() {
            if (this.pause = !0, this.reviewPage.stopAnimation(), this.timer && (clearTimeout(this.timer), 
            this.timer = null), this.timers) {
                for (var e = 0; e < this.timers.length; ++e) clearTimeout(this.timers[e]);
                this.timers = null;
            }
        }
    }, {
        key: "speedUpto",
        value: function(e, t, i) {
            var a = this;
            this._destroy();
            var s = t.seed, n = t.action, o = t.musicList, r = t.timestamp, u = t.version, c = t.use_wangzhe, h = t.mmpay_status, l = t.use_mmpaybase, m = t.skin_id, d = t.property, g = n, f = r, p = 0, _ = void 0;
            for (this.actionList = g, this.musicList = o, this.touchStartList = f, this.property = d, 
            this.index = 0, this.game.resetScene(s, {
                version: u,
                use_wangzhe: c,
                use_mmpaybase: l,
                mmpay_status: h,
                bottleSkin: this.skinResources || null,
                skinId: m || null
            }), _ = 0; _ < this.actionList.length - 1 && _ < e; _++) !function(e) {
                var t = a.actionList[e][3] || null, i = a.actionList[e][1], s = a.actionList[e][0], n = a.musicList[e + 1], o = a.actionList[e][2], r = void 0;
                1 == (r = 1 == t ? a.game.wellJump({
                    property_id: t,
                    item_id: 1,
                    noAnimation: !0,
                    quick: o,
                    musicScore: n
                }) : a.game.touchEndAnim(s, i, o, n, {
                    noAnimation: !0
                })) || 7 == r ? (a.game.succeed({
                    noAnimation: !0,
                    musicScore: n
                }), 1 === r ? (++a.game.doubleHit, a.game.UI.addScore(1, !0, o)) : (a.game.doubleHit = 0, 
                a.game.UI.addScore(1, !1, o)), a.game.doubleHit > p && (p = a.game.doubleHit)) : 2 == r && (a.game.bottle.obj.position.x = a.game.bottle.destination[0], 
                a.game.bottle.obj.position.z = a.game.bottle.destination[1]);
            }(_);
            this.index = _, i(p, this.game.succeedTime);
        }
    }, {
        key: "continue",
        value: function() {
            this.isInShareCardPage || (this.pause = !1, this._playCache());
        }
    }, {
        key: "play",
        value: function(e, t, i, a, s, n, o, r, u, c, h) {
            this.actionList = t, this.musicList = i, this.touchStartList = a, this.property = c, 
            this.index = 0, this.game.resetScene(e, {
                version: s,
                use_wangzhe: n,
                use_mmpaybase: r,
                mmpay_status: o,
                bottleSkin: this.skinResources || null,
                skinId: u || null
            }), this._play(h);
        }
    }, {
        key: "_destroy",
        value: function() {
            if (this.game.stopLoopMusic(), this.timer && (clearTimeout(this.timer), this.timer = null), 
            this.jumpTimer && (clearTimeout(this.jumpTimer), this.jumpTimer = null), this.game.deadTimeout && (clearTimeout(this.game.deadTimeout), 
            this.game.deadTimeout = null), this.overTimeout && (clearTimeout(this.overTimeout), 
            this.overTimeout = null), this.timers) {
                for (var e = 0; e < this.timers.length; ++e) clearTimeout(this.timers[e]);
                this.timers = null;
            }
        }
    } ]), e;
}();

exports.default = f;