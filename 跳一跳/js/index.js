function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function i() {
    var t = Date.now(), e = t - H;
    H = t, requestAnimationFrame(i, !0), e > 100 || N.update(e / 1e3);
}

var o = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var o = e[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, i, o) {
        return i && t(e.prototype, i), o && t(e, o), e;
    };
}();

require("./weapp-adapter");

var s = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("./lib/three")), n = t(require("./block")), r = t(require("./ui")), a = t(require("./wave")), h = t(require("./ground")), l = t(require("./bottle")), c = require("./config"), d = t(require("./ui/audioManager")), u = t(require("./tailSystem")), m = t(require("./lib/point-in-polygon")), b = t(require("./network/network")), g = t(require("./store/storage")), p = t(require("./store/session")), k = t(require("./rankSystem")), v = t(require("./network/socket")), f = t(require("./pages/full2D")), y = (t(require("./pages/singleSettlementPage")), 
require("./shareApp")), x = t(require("./viewer")), w = require("./lib/animation"), B = t(require("./store/historyTimes")), T = t(require("./network/reporter")), S = t(require("./gameCtrl")), C = t(require("./gameView")), j = t(require("./gameModel")), L = require("./random"), M = t(require("./control/instructionCtrl")), O = t(require("./control/relayInstructionCtrl")), P = t(require("./lib/mue/eventcenter")), R = t(require("./control/onebyoneCtrl")), I = t(require("./control/bottleSkinBaseCtrl")), z = require("util/encryption"), E = t(require("./network/relayMoniter")), _ = t(require("./lib/mue/lookcenter")), A = t(require("./skin")), q = t(require("./control/propertyCtrl")), D = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, U = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, G = wx.getSystemInfoSync() || {}, F = "ios" == G.platform, V = G.model, K = function() {
    function t(i) {
        e(this, t), this.options = i, this.is_from_wn = 0, this.firstInit = !0, this.distance = 0, 
        this.heightestScore = 0, this.stage = "", this.succeedTime = 0, this.lastAddBonus = -2, 
        this.lastStage = "", this.deadTimeout = null, this.currentScore = 0, this.seq = 0, 
        this.thirdBlock = null, this.straight = !0, this.firstBlood = !1, this.lastHardLevel = 200, 
        this.guider = !1, this.hardDistances = [], this.socketFirstSync = !1, this.init(), 
        this.randomSeed = this.generateSeed(), (0, L.setRandomSeed)(this.randomSeed), this.actionList = [], 
        this.musicList = [], this.touchList = [], this.touchMoveList = [], this.onceTouchMoveList = [], 
        this.touchStartTime = [], this.blocks = [], this.liveTime = 0, this.eggBlocksCount = {}, 
        this.eggBlocksTriggerCount = {}, this.eggBlocksFailCount = {}, this.eggBlocksSucceedCount = {}, 
        wx.setKeepScreenOn && wx.setKeepScreenOn({
            keepScreenOn: !0
        }), _.default.smartStart();
    }
    return o(t, [ {
        key: "moveTo",
        value: function(t) {
            this.camera.position.x = this.camera.position.x + t.x, this.camera.position.z = this.camera.position.z + t.z;
        }
    }, {
        key: "moveGradually",
        value: function(t, e) {
            if (this.animating && !this.guider) {
                (0, w.TweenAnimation)(this.bottle.obj.position.x, this.bottle.obj.position.x - t.x, 500 * e, "Linear", function(t, e) {
                    void 0 !== t && (this.bottle.obj.position.x = t, e && (this.bottle.obj.position.x = -.098));
                }.bind(this));
                for (var i = 0, o = this.blocksInUse.length; i < o; ++i) (0, w.TweenAnimation)(this.blocksInUse[i].obj.position.x, this.blocksInUse[i].obj.position.x - t.x, 500 * e, "Linear", function(t) {
                    void 0 !== t && (this.obj.position.x = t);
                }.bind(this.blocksInUse[i]));
                this.blocks && this.blocks[0] && (0, w.TweenAnimation)(this.blocks[0].obj.position.x, this.blocks[0].obj.position.x - t.x, 500 * e, "Linear", function(t) {
                    void 0 !== t && (this.obj.position.x = t);
                }.bind(this.blocks[0]));
            } else this.camera.destination = [ this.camera.position.x + t.x, this.camera.position.z + t.z ], 
            (0, w.TweenAnimation)(this.camera.position.x, this.camera.position.x + t.x, 500 * e, "Quad.easeOut", function(t) {
                void 0 !== t && (this.camera.position.x = t);
            }.bind(this)), (0, w.TweenAnimation)(this.camera.position.z, this.camera.position.z + t.z, 500 * e, "Quad.easeOut", function(t) {
                void 0 !== t && (this.camera.position.z = t);
            }.bind(this));
        }
    }, {
        key: "update",
        value: function(t) {
            var e = this;
            this.tailSystem && this.tailSystem.update(1e3 * t), this.bottle.update(t), this.renderer.shadowMap.enabled && (this.shadowTarget.position.x = this.bottle.obj.position.x, 
            this.shadowTarget.position.z = this.bottle.obj.position.z, this.shadowLight.position.x = this.bottle.obj.position.x + 0, 
            this.shadowLight.position.z = this.bottle.obj.position.z + 10);
            for (var i = 0, o = this.blocksInUse.length; i < o; ++i) this.blocksInUse[i].update(t);
            if (this.blocks && this.blocks[0] && this.blocks[0].update(), ("forerake" === this.bottle.status || "hypsokinesis" === this.bottle.status) && 5 != this.hit) for (var s = this.bottle.getBox(), n = "forerake" === this.bottle.status ? this.nextBlock.getBox() : this.currentBlock.getBox(), i = 0, o = s.length; i < o; ++i) if (s[i].intersectsBox(n)) {
                0 == i ? (this.bottle.rotate(), this.suspendTimer && (clearTimeout(this.suspendTimer), 
                this.suspendTimer = null)) : 1 == i ? (this.bottle.suspend(), this.suspendTimer && (clearTimeout(this.suspendTimer), 
                this.suspendTimer = null)) : 2 != i || this.suspendTimer || (this.suspendTimer = setTimeout(function() {
                    e.bottle.suspend(), e.suspendTimer = null;
                }, 90 * this.distance));
                break;
            }
            if (this.bottle.obj.position.y <= c.BLOCK.height / 2 + .1 && "jump" === this.bottle.status && this.bottle.flyingTime > .3 && !this.pendingReset) {
                if (1 === this.hit || 7 === this.hit) {
                    if (this.bottle.stop(), this.bottle.changeScorePos(0), this.succeed(), this.animating) return;
                    1 === this.hit ? (this.audioManager["combo" + Math.min(this.doubleHit + 1, 8)].seek(0), 
                    this.audioManager["combo" + Math.min(this.doubleHit + 1, 8)].play(), ++this.doubleHit, 
                    this.addWave(Math.min(this.doubleHit, 4)), this.bottle.showAddScore(1, !0, this.quick), 
                    this.UI.addScore(1, !0, this.quick), this.currentScore = this.UI.score, "observe" != this.mode && this.showCombo()) : (this.doubleHit = 0, 
                    this.UI.addScore(1, !1, this.quick), this.currentScore = this.UI.score, this.bottle.showAddScore(1, !1, this.quick)), 
                    this.audioManager.success.seek(0), this.audioManager.success.play(), "observe" == this.mode || "relay" == this.mode || this.gameCtrl.reviewCtrl.isInThisPage || this.rankSystem.update();
                } else 2 === this.hit ? (this.bottle.stop(), this.bottle.obj.position.y = c.BLOCK.height / 2, 
                this.bottle.obj.position.x = this.bottle.destination[0], this.bottle.obj.position.z = this.bottle.destination[1]) : 3 === this.hit ? (this.bottle.hypsokinesis(), 
                this.audioManager.fall_2.play(), this.bottle.obj.position.y = c.BLOCK.height / 2) : 4 === this.hit || 5 === this.hit ? (this.bottle.forerake(), 
                this.audioManager.fall_2.play(), this.bottle.obj.position.y = c.BLOCK.height / 2) : 0 === this.hit ? (this.bottle.fall(), 
                this.audioManager.fall.play(), this.bottle.obj.position.y = c.BLOCK.height / 2) : 6 === this.hit ? (this.bottle.stop(), 
                this.audioManager.fall.play(), this.bottle.obj.position.y = c.BLOCK.height / 2) : -1 === this.hit && (this.bottle.stop(), 
                this.bottle.obj.position.y = c.BLOCK.height / 2, this.bottle.obj.position.x = 0);
                if (0 === this.hit || 3 === this.hit || 4 === this.hit || 5 === this.hit || 6 === this.hit) {
                    if (this.guider) if (this.UI.score > 0) this.guider = !1; else {
                        if (!(this.liveTime > 3)) return void this.live();
                        this.guider = !1, this.full2D.hide2DGradually();
                    }
                    this.pendingReset = !0, this.currentScore = this.UI.score, this.reporter.addEggBlockReport(this.eggBlocksCount, this.eggBlocksTriggerCount, this.eggBlocksFailCount, this.eggBlocksSucceedCount), 
                    this.gameCtrl.gameOver(this.currentScore);
                    var r = this.mode;
                    this.deadTimeout = setTimeout(function() {
                        e.pendingReset = !1, "relay" == r || e.gameCtrl.reviewCtrl.isInThisPage || (w.TweenAnimation.killAll(), 
                        e.gameCtrl.gameOverShowPage()), "observe" == e.mode && e.instructionCtrl.onCmdComplete();
                    }, 2e3);
                } else "observe" == this.mode && this.instructionCtrl.onCmdComplete();
                "relay" == this.mode && (this.relayHandleInterrupt ? this.relayHandleInterrupt = !1 : setTimeout(function() {
                    P.default.emitSync(c.EVENT.NOWPLAYEROVER, {
                        hit: e.hit
                    });
                }, 0 === this.hit || 3 === this.hit || 4 === this.hit || 5 === this.hit || 6 === this.hit ? 2e3 : 0));
            }
            this.renderer.render(this.scene, this.camera);
        }
    }, {
        key: "succeed",
        value: function(t) {
            var e = this;
            if (++this.succeedTime, this.musicScore = !1, this.lastSucceedTime = Date.now(), 
            this.succeedTime % 15 == 0 && (t && t.noAnimation || this.ground.changeColor()), 
            this.blocksInUse.length >= 9) {
                var i = this.blocksInUse.shift();
                i.obj.visible = !1, this.blocksPool.push(i);
            }
            var o = this.nextBlock.obj.position.clone().sub(this.currentBlock.obj.position);
            this.bottle.obj.position.x = this.bottle.destination[0], this.bottle.obj.position.z = this.bottle.destination[1];
            var s = this.thirdBlock;
            if (this.audioManager.setTimerFlag(!0), !this.firstAnimating) {
                if (this.guider && (this.guider = !1, this.full2D.hide2DGradually()), !this.animating) {
                    if (this.nextBlock.whenSucceed && this.nextBlock.whenSucceed(this.bottle.obj.position.clone()), 
                    !this.nextBlock.succeedTimer && void 0 === this.nextBlock.score && !this.nextBlock.musicName || t && t.noAnimation || "relay" == this.mode) t && t.musicScore && "relay" != this.mode && (31 == this.nextBlock.order && (this.nextBlock.score = this.mmpayScore), 
                    this.UI.addScore(this.nextBlock.score, !1, !1, !0), 32 == this.nextBlock.order && (this.relaxLeft += 2)); else {
                        var n = this.nextBlock;
                        this.musicTimer = setTimeout(function() {
                            void 0 !== n.score && (2 == e.reviewVersion && 15 == n.order || (e.musicScore = !0, 
                            31 == n.order && (n.score = e.mmpayScore), e.UI.addScore(n.score, !1, !1, !0), e.bottle.showAddScore(n.score, !1, !1, !0), 
                            P.default.emit(c.EVENT.TRIGGER_EGG, {
                                order: n.order,
                                block: n
                            }))), n.musicName && (e.audioManager[n.musicName].seek(0), e.audioManager[n.musicName].play(), 
                            n.registerAudio && e.audioManager.register(n.musicName, function() {
                                n.registerAudio();
                            }, function() {
                                n.registerEndAudio && n.registerEndAudio();
                            })), n.succeedTimer && n.succeedTimer(e.UI.score), 32 == n.order && (e.relaxLeft += 2);
                        }, 2e3), this.audioManager.pop.seek(0), this.audioManager.pop.play();
                    }
                    var r = this.nextBlock.obj.position.clone(), a = this.nextBlock.radius + this.distance + s.radius;
                    this.straight ? (r.x += a, this.bottle.lookAt("straight", r.clone())) : (r.z -= a, 
                    this.bottle.lookAt("left", r.clone())), s.obj.position.x = r.x, s.obj.position.z = r.z;
                }
                var h = s.obj.position.clone().sub(this.nextBlock.obj.position), l = o.add(h);
                l.x /= 2, l.z /= 2, this.scene.add(s.obj), this.currentBlock = this.nextBlock, this.nextBlock = s;
                var d = l.length() / 10;
                this.bottle.human.rotation.z = 0, this.bottle.human.rotation.x = 0, t && t.noAnimation ? (this.moveTo(l), 
                s.body.position.y = c.BLOCK.height / 2 - s.height / 2, s.obj.visible = !0) : (this.bottle.squeeze(), 
                s.popup(), c.GAME.canShadow && this.bottle.scatterParticles(), this.animating && (l.x = 19.8), 
                this.cameraMoveDuration = d, this.moveGradually(l, d));
            }
        }
    }, {
        key: "handleWxOnHideEvent",
        value: function() {
            this.show = !1, "prepare" == this.bottle.status && (this.touchObserve = !0), this.animateTimer && (clearTimeout(this.animateTimer), 
            this.animateTimer = null), this.onshowAnimateTimer && (clearTimeout(this.onshowAnimateTimer), 
            this.onshowAnimateTimer = null), this.gameCtrl.wxOnhide(), _.default.smartStop();
        }
    }, {
        key: "init",
        value: function() {
            var t = this, e = wx.getSystemInfoSync();
            console.log("getSystemInfo :", e), g.default.getFirstBlood() || this.options.query.mode || (this.guider = !0), 
            this.socketMonitor = new E.default({
                report: this.report.bind(this),
                duration: 13e3,
                logMaxLength: 5e3
            }), this.gameCtrl = new S.default(this), this.gameView = new C.default(this), this.gameModel = new j.default(this), 
            this.instructionCtrl = new M.default(this), this.relayInstructionCtrl = new O.default(this), 
            this.historyTimes = new B.default(this), this.reporter = new T.default(), this.audioManager = new d.default(this), 
            this.gameSocket = new v.default(this), this.scene = new s.Scene();
            var i = c.FRUSTUMSIZE, o = U / D;
            this.camera = new s.OrthographicCamera(i * o / -2, i * o / 2, i / 2, i / -2, -10, 85), 
            this.camera.position.set(-17, 30, 26), this.camera.lookAt(new s.Vector3(13, 0, -4)), 
            this.scene.add(this.camera), this.renderer = new s.WebGLRenderer({
                antialias: !0,
                canvas: canvas,
                preserveDrawingBuffer: !0
            }), window.renderer = this.renderer, this.blocksPool = [], this.blocksInUse = [], 
            this.blocksRemoved = {}, this.doubleHit = 0, F && (V.indexOf("iPhone 4") >= 0 || V.indexOf("iPhone 5") >= 0 || G.system.indexOf("iOS 9") >= 0 || G.system.indexOf("iOS 8") >= 0 || V.indexOf("iPhone 6") >= 0 && V.indexOf("iPhone 6s") < 0) ? (this.renderer.shadowMap.enabled = !1, 
            c.GAME.canShadow = !1, this.renderer.setPixelRatio(1.5)) : void 0 !== G.benchmarkLevel && G.benchmarkLevel < 5 && -1 != G.benchmarkLevel ? (c.GAME.canShadow = !1, 
            this.renderer.shadowMap.enabled = !1, this.renderer.setPixelRatio(window.devicePixelRatio ? F ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1)) : (this.renderer.setPixelRatio(window.devicePixelRatio ? F ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1), 
            this.renderer.shadowMap.enabled = !0), this.renderer.setSize(U, D), this.renderer.localClippingEnabled = !0, 
            this.ground = new h.default(), this.ground.obj.position.z = -84, this.camera.add(this.ground.obj), 
            this.waves = [];
            for (w = 0; w < 4; ++w) {
                var m = new a.default();
                this.waves.push(m), m.obj.visible = !1, this.scene.add(m.obj);
            }
            var p = new s.MeshBasicMaterial({
                color: 16119285
            });
            this.combo = new s.Mesh(new s.CircleGeometry(.6, 30), p), this.combo.name = "combo", 
            this.combo.position.x = -50, this.combo.rotation.x = -Math.PI / 2, this.scene.add(this.combo), 
            this.renderer.shadowMap.enabled && (this.shadowTarget = new s.Mesh(new s.PlaneGeometry(.1, .1), p), 
            this.shadowTarget.visible = !1, this.shadowTarget.name = "shadowTarget", this.scene.add(this.shadowTarget)), 
            this.currentBlock = new n.default(0), this.initNextBlock = this.nextBlock = new n.default(1), 
            this.nextBlock.obj.position.x = 20, this.bottle = new l.default({
                getSelectedBottleSkinResourceSync: I.default.getSelectedBottleSkinResourceSync
            }), this.bottle.obj.position.set(-10, -c.BLOCK.height / 2, 0), this.scene.add(this.bottle.obj), 
            this.guider && (this.bottle.obj.position.set(-11, 50, 0), this.camera.position.x -= 19, 
            setTimeout(function() {
                t.bottle.showup();
            }, 800), this.currentBlock.obj.position.x = -11, this.currentBlock.change(null, "gray", .7), 
            this.scene.add(this.currentBlock.obj), this.guiderTimer = setInterval(function() {
                t.bottle.velocity.vz = 0, t.bottle.velocity.vy = 150, t.direction = new s.Vector2(1, 0);
                var e = new s.Vector3(1, 0, 0);
                t.bottle.jump(e.normalize()), t.hit = t.checkHit2(t.bottle, t.currentBlock);
            }, 3e3)), this.blocksInUse.push(this.nextBlock), this.blocksInUse.push(this.currentBlock), 
            this.blocksId = c.LOCALBLOCK.slice(0), this.object_id_list = c.LOCALBLOCK.slice(0);
            for (var w = 2; w < this.blocksId.length; ++w) {
                var L = new n.default(this.blocksId[w]);
                this.blocksPool.push(L);
            }
            var P = wx.getStorageSync("current_skin");
            this.addToPool(P), this.removeFromPool({
                skinId: P
            }), this.showRelaxScore = 0, this.relaxLeft = 0, this.onebyoneCtrl = new R.default(this, this.camera), 
            this.full2D = new f.default({
                camera: this.camera,
                onClickRank: this.gameCtrl.clickRank.bind(this.gameCtrl),
                onClickReplay: this.gameCtrl.clickReplay.bind(this.gameCtrl),
                onClickShare: this.gameCtrl.shareBattleCard.bind(this.gameCtrl),
                onClickStart: this.gameCtrl.clickStart.bind(this.gameCtrl),
                onShowFriendRank: this.gameCtrl.showFriendRank.bind(this.gameCtrl),
                onBattlePlay: this.gameCtrl.onBattlePlay.bind(this.gameCtrl),
                onGroupShare: this.gameCtrl.shareGroupRank.bind(this.gameCtrl),
                friendRankReturn: this.gameCtrl.friendRankReturn.bind(this.gameCtrl),
                groupPlayGame: this.gameCtrl.groupPlayGame.bind(this.gameCtrl),
                onLookersStart: this.gameCtrl.onViewerStart.bind(this.gameCtrl),
                onReturnWechat: function() {
                    wx.exitMiniProgram();
                },
                onClickPureShare: function(e) {
                    (0, y.pureShare)(e, t.gameModel.currentScore), t.reporter.bestShare(e);
                },
                newRelay: this.gameCtrl.gotoRelayMode.bind(this.gameCtrl),
                outRelay1: this.gameCtrl.outRelay1.bind(this.gameCtrl),
                outRelay2: this.gameCtrl.outRelay2.bind(this.gameCtrl),
                startRelay: this.gameCtrl.startRelay.bind(this.gameCtrl),
                watchRelay: this.gameCtrl.watchRelay.bind(this.gameCtrl),
                replayRelay: this.gameCtrl.replayRelay.bind(this.gameCtrl),
                shareRelay: this.gameCtrl.shareRelay.bind(this.gameCtrl),
                quitRecord: this.gameCtrl.quitReview.bind(this.gameCtrl),
                goRecord: this.gameCtrl.initReview.bind(this.gameCtrl),
                skipRelayBeginner: this.gameCtrl.skipRelayBeginner.bind(this.gameCtrl)
            }), this.UI = new r.default(this.scene, this.camera, this.full2D, this), c.GAME.canShadow && (this.tailSystem = new u.default(this.scene, this.bottle)), 
            this.addLight(), this.bindEvent(), this.viewer = new x.default(this.camera), this.rankSystem = new k.default(this), 
            setTimeout(function() {
                t.audioManager.icon.play();
            }, 300), this.UI.hideScore(), this.skinManager = new A.default(this), this.gameModel.init(), 
            this.gameCtrl.init(), this.gameView.init(), wx.onShow(this.handleWxOnShowEvent.bind(this)), 
            wx.onHide(this.handleWxOnHideEvent.bind(this)), wx.onError(this.handleWxOnError.bind(this)), 
            wx.onAudioInterruptionBegin && wx.onAudioInterruptionBegin(this.handleInterrupt.bind(this)), 
            b.default.sceneLogin(function(t) {
                console.log("scene initresp : ", JSON.stringify(t)), wx.setStorage({
                    key: "ad",
                    data: {
                        ad_reward_quota: t.ad_reward_quota || 0,
                        ad_banner_quota: t.ad_banner_quota || 0,
                        t: +new Date()
                    }
                });
            }), this.gameCtrl.firstInitGame(this.options), wx.showShareMenu(), wx.onShareAppMessage(function() {
                return {
                    title: "一起来，跳一跳",
                    imageUrl: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJHS4AOib6MiaPhwEaqw1NPcZGtgAGTlVJ4lrBAGtchhnXanMyo7q7toRpD4DukV5F2TA/0?wx_fmt=png"
                };
            });
        }
    }, {
        key: "loopAnimate",
        value: function() {
            var t = this;
            if (this.animating) {
                this.touchStartAnim({
                    fromGuider: !0
                }), this.touchStartTimer = setTimeout(function() {
                    t.bottle.velocity.vz = Math.min(.719 * c.BOTTLE.velocityZIncrement, 180), t.bottle.velocity.vy = Math.min(c.BOTTLE.velocityY + .719 * c.BOTTLE.velocityYIncrement, 180);
                    var e = new s.Vector3(t.nextBlock.obj.position.x - t.bottle.obj.position.x, 0, t.nextBlock.obj.position.z - t.bottle.obj.position.z);
                    t.direction = new s.Vector2(t.nextBlock.obj.position.x - t.bottle.obj.position.x, t.nextBlock.obj.position.z - t.bottle.obj.position.z), 
                    t.hit = t.checkHit2(t.bottle, t.currentBlock, t.nextBlock), t.thirdBlock = t.generateNextBlock(), 
                    t.thirdBlock && t.thirdBlock.obj && (t.thirdBlock.obj.position.set(39.7, 0, 0), 
                    t.tailSystem && t.tailSystem.correctPosition(), w.TweenAnimation.kill("progress"), 
                    t.bottle.jump(e.normalize()), t.currentBlock.rebound(), t.animateTimer = setTimeout(function() {
                        t.loopAnimate();
                    }, 3e3));
                }, 719);
            }
        }
    }, {
        key: "animate",
        value: function() {
            var t = this;
            this.firstAnimating = !0;
            for (var e = this, i = 0; i < 7; ++i) setTimeout(function(t) {
                return function() {
                    if (("single" == e.mode && ("startPage" == e.stage || "friendRankList" == e.stage) || e.guider) && e.blocks && e.blocks.length < 7) {
                        var i = new n.default(-1, t);
                        i.showup(t), e.scene.add(i.obj), e.blocks.push(i), 0 == t && (this.nextBlock = i);
                    }
                };
            }(i), 200 * i);
            this.animateTimer = setTimeout(function() {
                if ("single" == e.mode && ("startPage" == e.stage || "friendRankList" == e.stage) || e.guider) {
                    t.bottle.velocity.vz = Math.min(.4 * c.BOTTLE.velocityZIncrement, 180), t.bottle.velocity.vy = Math.min(c.BOTTLE.velocityY + .4 * c.BOTTLE.velocityYIncrement, 180), 
                    t.direction = new s.Vector2(t.nextBlock.obj.position.x - t.bottle.obj.position.x, t.nextBlock.obj.position.z - t.bottle.obj.position.z);
                    var i = new s.Vector3(t.nextBlock.obj.position.x - t.bottle.obj.position.x, 0, t.nextBlock.obj.position.z - t.bottle.obj.position.z);
                    if (t.bottle.jump(i.normalize()), t.hit = -1, t.nextBlock = t.initNextBlock, t.blocks) {
                        for (var o = 0, n = t.blocks.length; o < n; ++o) w.customAnimation.to(t.blocks[o].hitObj.material, 1, {
                            opacity: 0,
                            delay: .2 * o + .5
                        });
                        for (var o = 1, n = t.blocks.length; o < n; ++o) w.customAnimation.to(t.blocks[o].obj.position, .5, {
                            z: o % 2 == 0 ? 60 : -60,
                            delay: .1 * o + 2.2
                        });
                        if (t.guider) {
                            w.customAnimation.to(t.currentBlock.obj.position, .5, {
                                z: -60,
                                delay: 2.1
                            });
                            var r = t.currentBlock;
                            setTimeout(function() {
                                r.obj.visible = !1;
                            }, 3e3);
                        }
                        t.currentBlock = t.blocks[0], t.beginnerTimer = setTimeout(function() {
                            if (("single" == e.mode && ("startPage" == e.stage || "friendRankList" == e.stage) || e.guider) && (e.guider && t.full2D.showBeginnerPage(), 
                            t.nextBlock.popup(), t.nextBlock.greenMaterial.color.setHex(6118749), t.nextBlock.whiteMaterial.color.setHex(11184810), 
                            t.scene.add(t.nextBlock.obj), t.blocks)) {
                                for (var i = 1, o = t.blocks.length; i < o; ++i) t.blocks[i].obj.visible = !1;
                                t.guider && (t.animating = !1), t.firstAnimating = !1;
                            }
                        }, 3e3), t.loopAnimateTimer = setTimeout(function() {
                            "single" != e.mode || "startPage" != e.stage && "friendRankList" != e.stage || e.show && t.loopAnimate();
                        }, 4500);
                    }
                }
            }, 1500);
        }
    }, {
        key: "handleWxOnShowEvent",
        value: function(t) {
            (t.query && t.query.mode || this.options.query && this.options.query.mode) && (this.guider = !1);
            var e = this;
            this.show = !0, this.reporter.enterReport(t.scene), this.guiderTimer && !this.guider && (clearInterval(this.guiderTimer), 
            this.guiderTimer = null), this.onshowAnimateTimer = setTimeout(function(t) {
                return function() {
                    "single" == e.mode && "startPage" == e.stage && !e.animateTimer && e.show && (e.blocks && e.blocks.length > 0 && !e.firstAnimating ? (this.animating = !0, 
                    e.loopAnimate()) : e.animating || !t || e.guider || (e.animating = !0, e.animate()));
                };
            }(this.firstInit), 1e3), this.firstInit ? this.firstInit = !1 : (this.gameCtrl.wxOnShow(t), 
            _.default.smartStart());
        }
    }, {
        key: "showCombo",
        value: function() {
            var t = this;
            setTimeout(function() {
                t.combo.position.set(t.nextBlock.obj.position.x, c.BLOCK.height / 2 + .15, t.nextBlock.obj.position.z);
            }, 200);
        }
    }, {
        key: "hideCombo",
        value: function() {
            this.combo.position.set(-30, 0, 0);
        }
    }, {
        key: "replayGame",
        value: function(t) {
            this.currentScore = 0, this.gameCtrl.onReplayGame(), this.audioManager.restart.seek(0), 
            this.audioManager.restart.play(), this.guider ? (this.guiderTimer && (clearInterval(this.guiderTimer), 
            this.guiderTimer = null), this.animating = !0, this.animate(), this.moveGradually(new s.Vector3(19, 0, 0), 3), 
            this.randomSeed = this.generateSeed(), (0, L.setRandomSeed)(this.randomSeed)) : (this.resetScene(t), 
            this.bottle.showup());
        }
    }, {
        key: "addWave",
        value: function(t) {
            for (var e = this, i = 0; i < t; ++i) setTimeout(function(t) {
                return function() {
                    e.waves[t].obj.visible = !0, e.waves[t].obj.position.set(e.bottle.obj.position.x, c.BLOCK.height / 2 + .1 * t + 1, e.bottle.obj.position.z), 
                    (0, w.TweenAnimation)(e.waves[t].obj.scale.x, 4, 2 / (t / 2.5 + 2) * 500, "Linear", function(i, o) {
                        void 0 !== i && (e.waves[t].obj.scale.x = i, e.waves[t].obj.scale.y = i, e.waves[t].obj.scale.z = i);
                    }), (0, w.TweenAnimation)(e.waves[t].obj.material.opacity, 0, 2 / (t / 2.5 + 2) * 500, "Linear", function(i, o, s) {
                        void 0 !== i && (e.waves[t].obj.material.opacity = i, s && e.waves[t].reset());
                    });
                };
            }(i), 200 * i);
        }
    }, {
        key: "addLight",
        value: function() {
            var t = new s.AmbientLight(16777215, .8);
            if (this.shadowLight = new s.DirectionalLight(16777215, .28), this.shadowLight.position.set(0, 15, 10), 
            this.renderer.shadowMap.enabled) {
                this.shadowLight.castShadow = !0, this.shadowLight.target = this.shadowTarget, this.shadowLight.shadow.camera.near = 5, 
                this.shadowLight.shadow.camera.far = 32, this.shadowLight.shadow.camera.left = -10, 
                this.shadowLight.shadow.camera.right = 10, this.shadowLight.shadow.camera.top = 10, 
                this.shadowLight.shadow.camera.bottom = -10, this.shadowLight.shadow.mapSize.width = 512, 
                this.shadowLight.shadow.mapSize.height = 512;
                var e = new s.PlaneGeometry(22, 25);
                this.shadowGround = new s.Mesh(e, new s.ShadowMaterial({
                    transparent: !0,
                    color: 0,
                    opacity: .3
                })), this.shadowGround.receiveShadow = !0, this.shadowGround.position.x = 0, this.shadowGround.position.y = -18, 
                this.shadowGround.position.z = -14, this.shadowGround.rotation.x = -Math.PI / 2, 
                this.shadowLight.add(this.shadowGround), this.shadowGround.renderOrder = 1;
            }
            this.scene.add(this.shadowLight), this.scene.add(t);
        }
    }, {
        key: "wellJump",
        value: function(t) {
            var e = t.property_id, i = void 0 === e ? "" : e, o = t.item_id, n = void 0 === o ? "" : o, r = t.quick, a = void 0 !== r && r, h = (t.musicScore, 
            t.noAnimation), l = void 0 !== h && h;
            this.stopBlockMusic(), this.bottle.velocity.vy = 160;
            var d = this.bottle.velocity.vy / c.GAME.gravity * 2;
            this.direction = new s.Vector2(this.nextBlock.obj.position.x - this.bottle.obj.position.x, this.nextBlock.obj.position.z - this.bottle.obj.position.z), 
            this.direction.x = +this.direction.x.toFixed(2), this.direction.y = +this.direction.y.toFixed(2);
            var u = new s.Vector3(this.direction.x, 0, this.direction.y);
            return this.bottle.velocity.vz = this.direction.length() / d, l || (this.bottle.jump(u.normalize()), 
            this.actionList.push([ !1, !1, this.quick, n, i ]), this.musicList.push(this.musicScore), 
            this.touchStartTime.push(Date.now()), this.touchMoveList.push([ !1, !1 ]), this.touchList.push([ !1, !1 ])), 
            this.hit = this.checkHit2(this.bottle, this.currentBlock, this.nextBlock), this.thirdBlock = this.generateNextBlock(), 
            this.distance = c.BLOCK.minDistance + (0, L.random)() * (c.BLOCK.maxDistance - c.BLOCK.minDistance), 
            this.distance = +this.distance.toFixed(2), this.quick = void 0 === a ? Date.now() - this.lastSucceedTime < 400 : a, 
            "player" === this.mode && (++this.seq, this.gameSocket.sendCommand(this.seq, {
                type: 1,
                c: {
                    x: this.currentBlock.obj.position.x,
                    z: this.currentBlock.obj.position.z,
                    order: this.currentBlock.order,
                    type: this.currentBlock.type,
                    r: this.currentBlock.radius,
                    rs: this.currentBlock.radiusScale
                },
                n: {
                    x: this.nextBlock.obj.position.x,
                    z: this.nextBlock.obj.position.z,
                    order: this.nextBlock.order,
                    type: this.nextBlock.type,
                    r: this.nextBlock.radius,
                    rs: this.nextBlock.radiusScale
                },
                d: this.duration,
                b: {
                    x: this.bottle.obj.position.x,
                    y: +this.bottle.obj.position.y.toFixed(2),
                    z: this.bottle.obj.position.z,
                    vy: this.bottle.velocity.vy,
                    vz: this.bottle.velocity.vz
                },
                t: 1 === this.hit || 7 === this.hit ? {
                    order: this.thirdBlock.order,
                    type: this.thirdBlock.type,
                    r: this.thirdBlock.radius,
                    rs: this.thirdBlock.radiusScale
                } : null,
                h: this.hit,
                di: this.distance,
                s: this.straight,
                q: this.quick,
                ca: {
                    x: this.camera.position.x,
                    y: this.camera.position.y,
                    z: this.camera.position.z
                },
                gd: {
                    x: this.ground.obj.position.x,
                    y: this.ground.obj.position.y,
                    z: this.ground.obj.position.z
                },
                score: this.UI.score,
                usingPropType: 1
            })), this.hit;
        }
    }, {
        key: "observeWellJump",
        value: function() {
            this.stopBlockMusic(), this.bottle.velocity.vy = 160;
            var t = this.bottle.velocity.vy / c.GAME.gravity * 2;
            this.direction = new s.Vector2(this.nextBlock.obj.position.x - this.bottle.obj.position.x, this.nextBlock.obj.position.z - this.bottle.obj.position.z), 
            this.direction.x = +this.direction.x.toFixed(2), this.direction.y = +this.direction.y.toFixed(2);
            var e = new s.Vector3(this.direction.x, 0, this.direction.y);
            this.bottle.velocity.vz = this.direction.length() / t, this.bottle.jump(e.normalize());
        }
    }, {
        key: "checkHit2",
        value: function(t, e, i, o) {
            var s = this.checkHit2Core(t, e, i, o);
            if ("relay" == this.mode && s && s.translate) {
                s.translate.x = s.translate.x.toFixed(2), s.translate.y = s.translate.y.toFixed(2);
                var n = "|cH:" + s.hit + ";fT:" + s.flyingTime + ",t:" + s.time + ",tsl:" + s.translate.x + "," + s.translate.y + ";dst:" + JSON.stringify(s.destination) + ",inY:" + s.initY + ",cb:" + this.currentBlock.order + "," + this.currentBlock.obj.position.x.toFixed(2) + "," + this.currentBlock.obj.position.z.toFixed(2) + ";nb:" + this.nextBlock.order + "," + this.nextBlock.obj.position.x.toFixed(2) + "," + this.nextBlock.obj.position.z.toFixed(2);
                this.socketMonitor.log(n);
            } else i && i.order >= 13 && (1 == s.hit || 7 == s.hit ? this.eggBlocksSucceedCount[i.order] = this.eggBlocksSucceedCount[i.order] ? this.eggBlocksSucceedCount[i.order] + 1 : 1 : 2 != s.hit && (this.eggBlocksFailCount[i.order] = this.eggBlocksFailCount[i.order] ? this.eggBlocksFailCount[i.order] + 1 : 1));
            return s.hit;
        }
    }, {
        key: "checkHit2Core",
        value: function(t, e, i, o) {
            var n = t.velocity.vy / c.GAME.gravity * 2;
            o = o || +t.obj.position.y.toFixed(2);
            var r = c.BLOCK.height / 2 - o, a = +((-t.velocity.vy + Math.sqrt(Math.pow(t.velocity.vy, 2) - 2 * c.GAME.gravity * r)) / -c.GAME.gravity).toFixed(2);
            n = +(n -= a).toFixed(2);
            var h = [], l = new s.Vector2(t.obj.position.x, t.obj.position.z), d = this.direction.setLength(t.velocity.vz * n);
            if (l.add(d), t.destination = [ +l.x.toFixed(2), +l.y.toFixed(2) ], h.push(+l.x.toFixed(2), +l.y.toFixed(2)), 
            this.animating) return {
                hit: 7
            };
            if (i) {
                var u, b = Math.pow(h[0] - i.obj.position.x, 2) + Math.pow(h[1] - i.obj.position.z, 2), g = i.getVertices();
                (0, m.default)(h, g) ? u = Math.abs(b) < .5 ? 1 : 7 : (0, m.default)([ h[0] - c.BOTTLE.bodyWidth / 2, h[1] ], g) || (0, 
                m.default)([ h[0], h[1] + c.BOTTLE.bodyDepth / 2 ], g) ? u = 5 : ((0, m.default)([ h[0], h[1] - c.BOTTLE.bodyDepth / 2 ], g) || (0, 
                m.default)([ h[0] + c.BOTTLE.bodyDepth / 2, h[1] ], g)) && (u = 3);
            }
            var p = e.getVertices();
            return (0, m.default)(h, p) ? u = 2 : ((0, m.default)([ h[0], h[1] + c.BOTTLE.bodyDepth / 2 ], p) || (0, 
            m.default)([ h[0] - c.BOTTLE.bodyWidth / 2, h[1] ], p)) && (u = u ? 6 : 4), {
                hit: u || 0,
                flyingTime: n,
                time: a,
                translate: d,
                destination: h,
                initY: o
            };
        }
    }, {
        key: "shuffleArray",
        value: function(t) {
            for (var e = t.length - 1; e > 0; e--) {
                var i = Math.floor((0, L.random)() * (e + 1)), o = t[e];
                t[e] = t[i], t[i] = o;
            }
        }
    }, {
        key: "useBlock",
        value: function(t) {
            for (var e, i = 0, o = t.length; i < o; ++i) for (var s = 0, n = this.blocksPool.length; s < n; ++s) if (this.blocksPool[s].order == t[i]) return this.blocksInUse.push(this.blocksPool[s]), 
            e = this.blocksPool[s], this.blocksPool.splice(s, 1), e;
            return !1;
        }
    }, {
        key: "generateNextBlock",
        value: function() {
            var t;
            if (2 === this.reviewVersion) ; else {
                if (this.relaxLeft && (--this.relaxLeft, t = this.useBlock([ 33, 34, 35 ]))) return t;
                if (this.UI.score - this.showRelaxScore >= 1e3 && (t = this.useBlock([ 32 ]), this.showRelaxScore = this.UI.score, 
                this.relaxLeft = 1, t)) return t;
            }
            var e = 5;
            this.UI.score > 1e3 ? e = 6 : this.succeedTime > 3e3 && (e = 7), this.animating || this.shuffleArray(this.blocksPool);
            for (var i = 0, o = this.blocksPool.length; i < o; ++i) if (this.succeedTime - this.lastAddBonus >= e && this.blocksPool[i].order >= 13 || this.succeedTime - this.lastAddBonus < e && this.blocksPool[i].order < 13) {
                if ((t = this.blocksPool[i]).order >= 13) {
                    if (this.lastBonusOrder && this.lastBonusOrder == t.order || this.UI.score < 100 && 29 == t.order || [ 32, 33, 34, 35 ].indexOf(t.order) >= 0) continue;
                    this.lastAddBonus = this.succeedTime, this.lastBonusOrder = t.order;
                }
                this.blocksInUse.push(t), this.blocksPool.splice(i, 1);
                break;
            }
            if (!t) {
                for (var s = this.blocksInUse.shift(); s.order >= 13; ) s.obj.visible = !1, this.blocksPool.push(s), 
                s = this.blocksInUse.shift();
                t = s, this.blocksInUse.push(t);
            }
            return t.obj.visible = !1, t.change(), t;
        }
    }, {
        key: "live",
        value: function() {
            var t = this;
            ++this.liveTime, setTimeout(function() {
                t.resetScene(null, {
                    bottleShowupAnimation: !0
                });
            }, 2e3);
        }
    }, {
        key: "clearTimer",
        value: function() {
            this.animateTimer && (clearTimeout(this.animateTimer), this.animateTimer = null), 
            this.loopAnimateTimer && (clearTimeout(this.loopAnimateTimer), this.loopAnimateTimer = null), 
            this.beginnerTimer && (clearTimeout(this.beginnerTimer), this.beginnerTimer = null), 
            this.touchStartTimer && (clearTimeout(this.touchStartTimer), this.touchStartTimer = null), 
            this.suspendTimer && (clearTimeout(this.suspendTimer), this.suspendTimer = null);
        }
    }, {
        key: "setSpecialBaseStatus",
        value: function(t) {
            "relay" == this.mode ? this.use_mmpaybase = this.mmpay_status = this.use_wangzhe = !0 : (this.use_mmpaybase = t && void 0 !== t.use_mmpaybase ? t.use_mmpaybase : g.default.getMmpayBaseStatus(), 
            this.mmpay_status = t && void 0 !== t.mmpay_status ? t.mmpay_status : g.default.getMmpayBonusStatus().status, 
            this.mmpayScore = this.mmpay_status ? 20 : 5, this.mmpay_checksum = g.default.getMmpayBonusStatus().checksum, 
            this.use_wangzhe = t && t.use_wangzhe || g.default.getWangZheBaseStatus());
        }
    }, {
        key: "addToPool",
        value: function(t) {
            var e = this, i = wx.getStorageSync("skins") || {};
            if (t && i[t]) {
                var o = i[t].skin_sn, s = i[t].object_id_list;
                this.object_id_list = s;
                for (var r = this.blocksId.concat(s).filter(function(t) {
                    return !e.blocksId.includes(t);
                }), a = wx.getStorageSync("blocks") || {
                    array: []
                }, h = a.array, l = !1, c = [], d = [], u = 0; u < r.length; ++u) this.blocksRemoved[r[u]] ? (c.push(this.blocksRemoved[r[u]]), 
                d.push(r[u]), this.blocksRemoved[r[u]] = null) : a[r[u]] ? (c.push(new n.default(r[u], a[r[u]])), 
                d.push(r[u])) : (l = !0, h.indexOf(r[u]) >= 0 && h.splice(h.indexOf(r[u]), 1));
                if (l) {
                    for (u = 0; u < c.length; ++u) this.blocksRemoved[c[u].order] = c[u];
                    a.array = h, wx.setStorage({
                        key: "blocks",
                        data: a
                    }), wx.setStorage({
                        key: "current_skin",
                        data: null
                    });
                } else this.skin_id = t, this.skin_sn = o, this.blocksPool = this.blocksPool.concat(c), 
                this.blocksId = this.blocksId.concat(d);
            }
        }
    }, {
        key: "removeFromPool",
        value: function(t) {
            this.setSpecialBaseStatus(t);
            var e, i = t && t.version || c.VERSION;
            e = 3 == i || 4 == i ? [ 24, 26, 27 ] : [ 30, 31, 32, 33, 34, 35 ], !this.use_mmpaybase && e.indexOf(31) < 0 && e.push(31), 
            !this.use_wangzhe && e.indexOf(30) < 0 && e.push(30), e.sort();
            for (s = e.length - 1; s >= 0; --s) for (var o = this.blocksPool.length - 1; o >= 0; --o) if (this.blocksPool[o].order === e[s]) {
                n = this.blocksPool.splice(o, 1);
                this.blocksRemoved[n[0].order] = n[0];
            }
            for (var s = this.blocksPool.length - 1; s >= 0; --s) if (this.object_id_list.indexOf(this.blocksPool[s].order) < 0) {
                var n = this.blocksPool.splice(s, 1);
                console.log("jahhahahahaha remove", n[0].order), this.blocksRemoved[n[0].order] = n[0];
            }
        }
    }, {
        key: "resetScene",
        value: function(t, e) {
            var i = this;
            if (this.reviewVersion = null, this.object_id_list = c.LOCALBLOCK.slice(0), this.skin_id = this.skin_sn = void 0, 
            e && e.version && (this.reviewVersion = e.version), this.touchObserve = !1, this.firstAnimating = !1, 
            this.myTurn = !1, this.clicked = !1, this.pendingReset = !1, this.blocks && this.blocks.length > 0) for (var o = 0, s = this.blocks.length; o < s; ++o) this.scene.remove(this.blocks[o].obj);
            this.blocks = null, "observe" == this.mode && this.audioManager.scale_intro && this.audioManager.scale_loop && (this.audioManager.scale_intro.stop(), 
            this.audioManager.scale_loop.stop()), this.randomSeed = t || this.generateSeed(), 
            (0, L.setRandomSeed)(this.randomSeed), this.actionList = [], this.musicList = [], 
            this.touchList = [], this.touchStartTime = [], this.touchMoveList = [], this.clearTimer(), 
            this.currentBlock && this.currentBlock.reset(), w.TweenAnimation.killAll(), this.animating = !1, 
            "relay" == this.mode && e && e.gameLevel ? 1 == e.gameLevel ? (c.BLOCK.minRadiusScale = .7, 
            c.BLOCK.maxRadiusScale = .9, c.BLOCK.minDistance = 1, c.BLOCK.maxDistance = 19) : 2 == e.gameLevel && (c.BLOCK.minRadiusScale = .6, 
            c.BLOCK.maxRadiusScale = .8, c.BLOCK.minDistance = 1, c.BLOCK.maxDistance = 20) : (c.BLOCK.minRadiusScale = .8, 
            c.BLOCK.maxRadiusScale = 1, c.BLOCK.minDistance = 1, c.BLOCK.maxDistance = 17);
            for (var o = 0, s = this.blocksInUse.length; o < s; ++o) {
                var n = this.blocksInUse.pop();
                n.obj.visible = !1, n.reset(), this.blocksPool.push(n);
            }
            Object.keys(this.blocksRemoved).forEach(function(t) {
                var e = i.blocksRemoved[t];
                e.obj.visible = !1, e.reset(), i.blocksPool.push(e);
            }), this.blocksRemoved = {};
            for (var o = 0, s = this.waves.length; o < s; ++o) this.waves[o].reset();
            this.blocksPool.sort(function(t, e) {
                return t.order - e.order;
            });
            var r;
            !e && "relay" != this.mode || e && void 0 === e.skinId ? (r = wx.getStorageSync("current_skin"), 
            (e = e || {}).skinId = r) : r = e && e.skinId, this.addToPool(r), this.removeFromPool(e), 
            this.currentBlock = this.blocksPool.shift(), this.currentBlock.obj.visible = !0, 
            this.scene.add(this.currentBlock.obj), this.blocksInUse.push(this.currentBlock), 
            this.shadowTarget && this.shadowTarget.position.set(0, 0, 0), this.nextBlock = this.blocksPool.shift(), 
            this.currentBlock.change(null, null, 1), this.nextBlock.change(null, null, 1), this.nextBlock.obj.position.set(20, 0, 0), 
            this.currentBlock.obj.position.set(0, 0, 0), this.nextBlock.obj.visible = !0, this.scene.add(this.nextBlock.obj), 
            this.blocksInUse.push(this.nextBlock), this.bottle.reset(e), this.thirdBlock = null, 
            this.UI.reset(), this.rankSystem.reset(), this.hit = null, this.lastAddBonus = -2, 
            this.lastBonusOrder = null, this.succeedTime = 0, this.doubleHit = 0, this.camera.position.set(-17, 30, 26), 
            this.shadowLight.position.set(0, 15, 10), e && e.bottleShowupAnimation && (this.bottle.showup(), 
            this.audioManager.restart.seek(0), this.audioManager.restart.play()), this.showRelaxScore = 0, 
            this.relaxLeft = 0, this.eggBlocksCount = {}, this.eggBlocksTriggerCount = {}, this.eggBlocksFailCount = {}, 
            this.eggBlocksSucceedCount = {}, this.straight = !0, wx.triggerGC && wx.triggerGC();
        }
    }, {
        key: "generateSeed",
        value: function() {
            var t = g.default.getMyUserInfo();
            if (t && t.open_id) {
                var e = Date.now();
                return this.time_seed = e, (0, z.encryptSeed)(e, t.open_id);
            }
            return b.default.sendServerError(7), null === t && b.default.sendServerError(8), 
            this.time_seed = void 0, Date.now();
        }
    }, {
        key: "stopLoopMusic",
        value: function() {
            this.audioManager.scale_intro && this.audioManager.scale_intro.stop(), this.audioManager.scale_loop && this.audioManager.scale_loop.stop(), 
            this.stopBlockMusic();
        }
    }, {
        key: "generateHardDistances",
        value: function() {
            for (var t = 2 + Math.floor(2 * (0, L.random)()), e = [], i = 0; i < t; ++i) i < t - 1 ? e.push(c.BLOCK.minDistance + 2 * (0, 
            L.random)()) : e.push(c.BLOCK.maxDistance - 2 * (0, L.random)());
            return e;
        }
    }, {
        key: "touchStartAnim",
        value: function(t) {
            "prepare" != this.bottle.status && (this.stopBlockMusic(), this.bottle.prepare(), 
            this.currentBlock.shrink(), t && t.fromGuider || (this.audioManager.scale_intro.seek(0), 
            this.audioManager.scale_intro.play(), this.mouseDownTime = Date.now(), this.onceTouchMoveList = []));
        }
    }, {
        key: "touchEndAnim",
        value: function(t, e, i, o, n) {
            "relay" == this.mode && w.TweenAnimation.kill("progress"), void 0 !== o && (this.musicScore = o), 
            this.duration = t || (Date.now() - this.mouseDownTime) / 1e3, this.bottle.velocity.vz = Math.min(this.duration * c.BOTTLE.velocityZIncrement, 150), 
            this.bottle.velocity.vz = +this.bottle.velocity.vz.toFixed(2), this.bottle.velocity.vy = Math.min(c.BOTTLE.velocityY + this.duration * c.BOTTLE.velocityYIncrement, 180), 
            this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2), this.direction = new s.Vector2(this.nextBlock.obj.position.x - this.bottle.obj.position.x, this.nextBlock.obj.position.z - this.bottle.obj.position.z), 
            this.direction.x = +this.direction.x.toFixed(2), this.direction.y = +this.direction.y.toFixed(2);
            var r = new s.Vector3(this.direction.x, 0, this.direction.y);
            if (this.hit = this.checkHit2(this.bottle, this.currentBlock, this.nextBlock, e), 
            this.distance = c.BLOCK.minDistance + (0, L.random)() * (c.BLOCK.maxDistance - c.BLOCK.minDistance), 
            this.distance = +this.distance.toFixed(2), this.straight = (0, L.random)() > .5 ? 1 : 0, 
            1 === this.hit || 7 === this.hit) {
                var a = this.generateNextBlock();
                a && a.order >= 13 && (this.eggBlocksCount[a.order] = this.eggBlocksCount[a.order] ? this.eggBlocksCount[a.order] + 1 : 1), 
                this.thirdBlock = a, this.quick = void 0 === i ? Date.now() - this.lastSucceedTime < 800 || !1 : i, 
                "relay" == this.mode && (this.quick = !1);
            }
            return n && n.noAnimation || (this.audioManager.scale_intro.stop(), this.audioManager.scale_loop.stop(), 
            this.currentBlock.rebound(), this.bottle.jump(r.normalize()), this.hideCombo()), 
            this.hit;
        }
    }, {
        key: "bindEvent",
        value: function() {
            var t = this, e = this;
            P.default.on(c.EVENT.GOTOSINGLESTARTPAGE, function(e, i) {
                t.animateTimer && (clearTimeout(t.animateTimer), t.animateTimer = null), t.animating = !0, 
                t.loopAnimate();
            }), P.default.on(c.EVENT.TRIGGER_EGG, function(e, i) {
                var o = i.order;
                t.eggBlocksTriggerCount[o] = t.eggBlocksTriggerCount[o] ? t.eggBlocksTriggerCount[o] + 1 : 1;
            }), e.instructionCtrl.bindCmdHandler(function(t) {
                if (-1 == t.type) return e.gameCtrl.showPlayerGG(t.s), void e.instructionCtrl.onCmdComplete();
                if (0 == t.type) return e.socketFirstSync = !0, e.bottle.resetPosition(), e.UI.scoreText.changeStyle({
                    textAlign: "center"
                }), e.UI.setScore(0), void e.instructionCtrl.onCmdComplete();
                if (e.gameCtrl.showPlayerWaiting(), t.score != e.UI.score && (e.UI.score = t.score, 
                e.UI.setScore(t.score)), t && t.b && t.b.vy) {
                    if (e.socketFirstSync && (e.socketFirstSync = !1, e.camera.position.set(t.ca.x, t.ca.y, t.ca.z), 
                    e.ground.obj.position.set(t.gd.x, t.gd.y, t.gd.z)), e.currentBlock.order != t.c.order || e.nextBlock.order != t.n.order) {
                        for (var i = 0, o = e.blocksInUse.length; i < o; ++i) {
                            var n = e.blocksInUse.pop();
                            e.scene.remove(n.obj), e.blocksPool.push(n);
                        }
                        var r = e.blocksPool.findIndex(function(e) {
                            return e.order == t.c.order;
                        });
                        e.currentBlock = e.blocksPool[r];
                        d = e.blocksPool.splice(r, 1);
                        e.blocksInUse.push(d[0]);
                        var a = e.blocksPool.findIndex(function(e) {
                            return e.order == t.n.order;
                        });
                        e.nextBlock = e.blocksPool[a];
                        d = e.blocksPool.splice(a, 1);
                        e.blocksInUse.push(d[0]);
                    }
                    e.scene.add(e.currentBlock.obj), e.scene.add(e.nextBlock.obj), e.currentBlock.obj.visible = !0, 
                    e.nextBlock.obj.visible = !0, e.currentBlock.obj.position.x = t.c.x, e.currentBlock.obj.position.z = t.c.z, 
                    e.currentBlock.change(t.c.r, t.c.type, t.c.rs), e.nextBlock.obj.position.x = t.n.x, 
                    e.nextBlock.obj.position.z = t.n.z, e.nextBlock.change(t.n.r, t.n.type, t.n.rs), 
                    e.bottle.obj.position.set(t.b.x, c.BLOCK.height / 2, t.b.z), e.bottle.velocity.vz = t.b.vz, 
                    e.bottle.velocity.vy = t.b.vy, e.distance = t.di, e.straight = t.s;
                    var h = new s.Vector3(e.nextBlock.obj.position.x - e.bottle.obj.position.x, 0, e.nextBlock.obj.position.z - e.bottle.obj.position.z);
                    if (e.direction = new s.Vector2(e.nextBlock.obj.position.x - e.bottle.obj.position.x, e.nextBlock.obj.position.z - e.bottle.obj.position.z), 
                    e.checkHit2(e.bottle, e.currentBlock, e.nextBlock, t.b.y), e.quick = t.q, t.t) {
                        var l = e.blocksPool.findIndex(function(e) {
                            return e.order == t.t.order;
                        });
                        if (l > -1) {
                            e.thirdBlock = e.blocksPool[l];
                            var d = e.blocksPool.splice(l, 1);
                            e.blocksInUse.push(e.thirdBlock);
                        } else e.thirdBlock = e.blocksInUse.find(function(e) {
                            return e.order == t.t.order;
                        }), e.thirdBlock && e.thirdBlock.obj && e.scene.remove(e.thirdBlock.obj);
                        e.thirdBlock.change(t.t.r, t.t.type, t.t.rs);
                    }
                    if (e.hit = t.h, e.tailSystem && e.tailSystem.correctPosition(), isNaN(t.usingPropType)) {
                        e.audioManager.scale_intro.seek(0), e.audioManager.scale_intro.play(), e.bottle.prepare(), 
                        e.currentBlock.shrink();
                        var u = {
                            x: t.ca.x,
                            y: t.ca.y,
                            z: t.ca.z
                        }, m = {
                            x: t.gd.x,
                            y: t.gd.y,
                            z: t.gd.z
                        };
                        e.instructionCtrl.icTimeout = setTimeout(function() {
                            e.audioManager.scale_intro.stop(), e.audioManager.scale_loop.stop(), 15 == e.currentBlock.order && e.currentBlock.hideGlow(), 
                            e.currentBlock.rebound(), e.camera.position.set(u.x, u.y, u.z), e.ground.obj.position.set(m.x, m.y, m.z), 
                            u = null, m = null, e.bottle.jump(h.normalize());
                        }, 1e3 * t.d);
                    } else q.default.observeUsingProp(t.usingPropType, e);
                    e.stopBlockMusic(), t = null;
                } else e.instructionCtrl.onCmdComplete();
            }), e.gameSocket.onReciveCommand(function(t, i) {
                "observe" == e.mode && e.instructionCtrl.onReceiveCommand(i, t);
            }), e.gameSocket.onPeopleCome(function(t) {
                e.gameCtrl.onPeopleCome(t);
            }), e.gameSocket.onPlayerOut(function() {
                e.gameCtrl.onPlayerOut();
            }), e.gameSocket.onJoinSuccess(function(t) {
                e.gameCtrl.socketJoinSuccess(t), "observe" == e.mode && (e.bottle.obj.position.set(8, -c.BLOCK.height / 2, 0), 
                e.camera.position.set(-17, 30, 26), e.shadowLight.position.set(0, 15, 10), e.currentBlock && (e.currentBlock.obj.visible = !1), 
                e.nextBlock && (e.nextBlock.obj.visible = !1));
            }), e.gameSocket.onRelayCmdCome(e.relayInstructionCtrl.cmdCome.bind(e.relayInstructionCtrl)), 
            canvas.addEventListener("touchstart", function(t) {
                if (t.touches.length >= 2) e.touchObserve = !0; else if ("relay" == e.mode && "game" == e.stage && e.full2D.doTouchStartEvent(t), 
                "relay" != e.mode || "game" != e.stage || !e.clicked && e.myTurn) if (e.gameCtrl.reviewCtrl.isInThisPage) e.gameCtrl.reviewCtrl.reviewPage.doTouchStartEvent(t); else {
                    if ("single" == e.mode || "player" == e.mode) {
                        var i = t.changedTouches[0].clientX, o = t.changedTouches[0].clientY;
                        if ("game" == e.stage && !e.is_from_wn && !e.guider) {
                            if (i < .13 * U && o > .88 * D) return "prepare" == e.bottle.status && (e.touchObserve = !0), 
                            void e.gameCtrl.shareObservCard();
                            if (e.UI.adBoard && i >= c.AD_BOARD.UI_left && i <= c.AD_BOARD.UI_right && o <= c.AD_BOARD.UI_bottom && o >= c.AD_BOARD.UI_top) return void P.default.emit(c.EVENT.TRIGGER_AD_JUMP, {});
                            if (e.UI.propBoard && i >= c.PROP_BOARD.p.UI_left && i <= c.PROP_BOARD.p.UI_right && o <= c.PROP_BOARD.p.UI_bottom && o >= c.PROP_BOARD.p.UI_top) return void ("stop" == e.bottle.status && P.default.emit(c.EVENT.TRIGGER_PROP, {}));
                        }
                    }
                    if ("friendRankList" != e.stage && "battlePage" != e.stage && "groupRankList" != e.stage && "singleSettlementPgae" != e.stage && "startPage" != e.stage) if ("viewerWaiting" != e.stage && "viewerGG" != e.stage && "viewerOut" != e.stage) if ("relayRoom" != e.stage) if ("getGiftPage" != e.mode) {
                        if ("game" == e.stage) {
                            if ("observe" === e.mode) return;
                            if (!("prepare" !== e.bottle.status || e.pendingReset || e.guider && e.animating) && 1 == t.targetTouches.length) return e.touchObserve ? void (e.touchObserve = !1) : void e.handleInterrupt();
                            "stop" !== e.bottle.status || e.pendingReset || e.guider && e.animating || e.touchStartAnim();
                        }
                    } else e.full2D.doTouchStartEvent(t); else e.full2D.doTouchStartEvent(t); else e.full2D.doTouchStartEvent(t); else e.full2D.doTouchStartEvent(t);
                }
            });
            canvas.addEventListener("touchcancel", function(t) {
                e.handleInterrupt();
            }), canvas.addEventListener("touchend", function(t) {
                t.changedTouches[0].clientX, t.changedTouches[0].clientY;
                if ("relay" == e.mode && "game" == e.stage && e.full2D.doTouchEndEvent(t), "relay" != e.mode || "game" != e.stage || !e.clicked && e.myTurn) if (e.gameCtrl.reviewCtrl.isInThisPage) e.gameCtrl.reviewCtrl.reviewPage.doTouchEndEvent(t); else if ("singleSettlementPgae" != e.stage && "startPage" != e.stage) if ("viewerWaiting" != e.stage && "viewerGG" != e.stage && "viewerOut" != e.stage) if ("friendRankList" != e.stage) if ("battlePage" != e.stage) if ("groupRankList" != e.stage) {
                    if ("getGiftPage" != e.mode) return "relayRoom" == e.stage ? (console.log(e.stage), 
                    void e.full2D.doTouchEndEvent(t)) : void ("game" == e.stage && ("prepare" !== e.bottle.status || e.pendingReset || e.guider && e.animating || (e.touchEndAnim(), 
                    "player" === e.mode && (++e.seq, e.gameSocket.sendCommand(e.seq, {
                        type: 1,
                        c: {
                            x: e.currentBlock.obj.position.x,
                            z: e.currentBlock.obj.position.z,
                            order: e.currentBlock.order,
                            type: e.currentBlock.type,
                            r: e.currentBlock.radius,
                            rs: e.currentBlock.radiusScale
                        },
                        n: {
                            x: e.nextBlock.obj.position.x,
                            z: e.nextBlock.obj.position.z,
                            order: e.nextBlock.order,
                            type: e.nextBlock.type,
                            r: e.nextBlock.radius,
                            rs: e.nextBlock.radiusScale
                        },
                        d: e.duration,
                        b: {
                            x: e.bottle.obj.position.x,
                            y: +e.bottle.obj.position.y.toFixed(2),
                            z: e.bottle.obj.position.z,
                            vy: e.bottle.velocity.vy,
                            vz: e.bottle.velocity.vz
                        },
                        t: 1 === e.hit || 7 === e.hit ? {
                            order: e.thirdBlock.order,
                            type: e.thirdBlock.type,
                            r: e.thirdBlock.radius,
                            rs: e.thirdBlock.radiusScale
                        } : null,
                        h: e.hit,
                        di: e.distance,
                        s: e.straight,
                        q: e.quick,
                        ca: {
                            x: e.camera.position.x,
                            y: e.camera.position.y,
                            z: e.camera.position.z
                        },
                        gd: {
                            x: e.ground.obj.position.x,
                            y: e.ground.obj.position.y,
                            z: e.ground.obj.position.z
                        },
                        score: e.UI.score
                    })), "observe" != e.mode && "review" != e.mode && (e.actionList.push([ e.duration, +e.bottle.obj.position.y.toFixed(2), e.quick ]), 
                    e.musicList.push(e.musicScore), "relay" == e.mode && !e.isObserver && e.onebyoneCtrl.data && (e.clicked = !0, 
                    P.default.emitSync(c.EVENT.NOWPLAYERJUMP, {
                        jump_succ: 1 == e.hit || 7 == e.hit || 2 == e.hit ? 1 : 0,
                        msginfo: JSON.stringify({
                            duration: e.duration,
                            initY: +e.bottle.obj.position.y.toFixed(2)
                        }),
                        msg_seq: e.onebyoneCtrl.data.msg_seq
                    })), e.touchStartTime.push(e.mouseDownTime), t.changedTouches && t.changedTouches[0] && (e.touchMoveList.push(e.onceTouchMoveList), 
                    e.touchList.push([ t.changedTouches[0].clientX, t.changedTouches[0].clientY ]))))));
                    e.full2D.doTouchEndEvent(t);
                } else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t); else e.full2D.doTouchEndEvent(t);
            }), canvas.addEventListener("touchmove", function(t) {
                if ("relay" == e.mode && "game" == e.stage && e.full2D.doTouchMoveEvent(t), "getGiftPage" != e.mode) {
                    if (e.gameCtrl.reviewCtrl.isInThisPage && e.gameCtrl.reviewCtrl.reviewPage.doTouchMoveEvent(t), 
                    "prepare" == e.bottle.status) {
                        if (e.onceTouchMoveList.length >= 10) return;
                        e.onceTouchMoveList.push(t.changedTouches[0].clientX, t.changedTouches[0].clientY);
                    }
                    "battlePage" != e.stage && "friendRankList" != e.stage && "groupRankList" != e.stage && "startPage" != e.stage ? e.stage : e.full2D.doTouchMoveEvent(t);
                } else e.full2D.doTouchMoveEvent(t);
            });
        }
    }, {
        key: "report",
        value: function(t) {
            Math.random() <= 1 && (console.log("日志上报：" + t), b.default.logReport("|SM|:" + t));
        }
    }, {
        key: "stopBlockMusic",
        value: function() {
            this.currentBlock.whenLeave && this.currentBlock.whenLeave(), this.currentBlock.musicName && this.audioManager[this.currentBlock.musicName].stop(), 
            this.currentBlock.registerEndAudio && this.currentBlock.registerEndAudio(), this.audioManager.clearTimer(), 
            this.audioManager.setTimerFlag(!1), this.musicTimer && (clearTimeout(this.musicTimer), 
            this.musicTimer = null);
        }
    }, {
        key: "handleNetworkFucked",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "网络异常,点击确定进入游戏";
            this.rollBackToSingle(), t && wx.showModal({
                title: "提示",
                content: e,
                showCancel: !1
            });
        }
    }, {
        key: "handleSocketFucked",
        value: function() {
            this.gameSocket.close(), "player" == this.mode && (this.shareObservCardFail(), this.updateUI()), 
            "observe" == this.mode && this.handleNetworkFucked(!0);
        }
    }, {
        key: "handleInterrupt",
        value: function() {
            "prepare" == this.bottle.status && (this.bottle.velocity.vz = 0, this.bottle.velocity.vy = 150, 
            this.bottle.jump(new s.Vector3(1, 0, 0).normalize()), this.currentBlock.rebound(), 
            this.audioManager.scale_loop.stop(), this.direction = new s.Vector2(1, 0), this.hit = this.checkHit2(this.bottle, this.currentBlock, this.nextBlock), 
            "relay" == this.mode && (P.default.emit(c.EVENT.SEND_REALTIME_MSG_TO_CTRL, {
                time: -1
            }), this.relayHandleInterrupt = !0));
        }
    }, {
        key: "relayBottleReset",
        value: function(t) {
            this.bottle.reset({
                preserveDirection: !0,
                bottleSkin: null
            }), this.bottle.obj.position.x = this.currentBlock.obj.position.x, this.bottle.obj.position.z = this.currentBlock.obj.position.z, 
            t && t.noAnimation || (this.bottle.showup(), this.audioManager.restart.seek(0), 
            this.audioManager.restart.play());
        }
    }, {
        key: "handleWxOnError",
        value: function(t) {
            var e = (void 0 == p.default.serverConfig.bad_js_ratio ? 1e6 : p.default.serverConfig.bad_js_ratio) / 1e6 || 1;
            Math.random() <= e && b.default.badReport(t.message, t.stack);
        }
    }, {
        key: "sendServerError",
        value: function(t) {
            b.default.sendServerError(t);
        }
    } ]), t;
}();

if (wx.getLaunchOptionsSync) N = new K(wx.getLaunchOptionsSync()); else var N = new K();

var H = Date.now();

i();