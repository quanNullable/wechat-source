function i(i, e) {
    if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function i(i, e) {
        for (var t = 0; t < e.length; t++) {
            var s = e[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(i, s.key, s);
        }
    }
    return function(e, t, s) {
        return t && i(e.prototype, t), s && i(e, s), e;
    };
}(), t = require("../pages2d/base"), s = require("../../lib/animation"), o = (require("../../config"), 
function(i) {
    if (i && i.__esModule) return i;
    var e = {};
    if (null != i) for (var t in i) Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t]);
    return e.default = i, e;
}(require("../../lib/three"))), n = function() {
    function n(e) {
        var t = e.game, s = e.onChangeProgress, o = e.onHide, r = e.onShare, a = e.week_best_score, h = e.onSave, c = e.is_self, g = e.is_from_share, u = e.onOpenSharePage, l = e.onCloseSharePage, d = e.maxBonusScore, P = void 0 === d ? 1 : d, p = e.succeedTime, f = void 0 === p ? 0 : p;
        i(this, n), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.onHide = o, this.onShare = r, this.onSave = h, this.onChangeProgress = s, 
        this.week_best_score = a, this.is_self = c, this.is_from_share = g, this.onOpenSharePage = u, 
        this.onCloseSharePage = l, this.name = "reviewPage", this.maxBonusScore = P, this.succeedTime = f;
        var m = this.changePositionPixel2DTo3D(31, 610);
        this.progressY = m.y, this.leftPositionStartX = m.x, this.rightPositionEndX = -m.x, 
        this.barPositionCenter = this.leftPositionStartX + (Math.abs(this.leftPositionStartX) + this.rightPositionEndX) / 2, 
        this.PositionRange = this.rightPositionEndX + Math.abs(this.leftPositionStartX);
    }
    return e(n, [ {
        key: "changePositionPixel2DTo3D",
        value: function(i, e) {
            var s = (0, t.cx)(i), o = (0, t.cy)(e);
            return {
                x: (s - t.WIDTH / 2) / t.WIDTH * t.frustumSizeWidth,
                y: (t.HEIGHT / 2 - o) / t.HEIGHT * t.frustumSizeHeight
            };
        }
    }, {
        key: "changePositionCSS2DTo3D",
        value: function(i, e) {
            return {
                x: (i - t.W / 2) / t.W * t.frustumSizeWidth,
                y: (t.H / 2 - e) / t.H * t.frustumSizeHeight
            };
        }
    }, {
        key: "setScorePostion",
        value: function() {
            var i = this.changePositionPixel2DTo3D(40, 201);
            this.UI.scoreText.obj.position.x = i.x, this.UI.scoreText.obj.position.y = i.y, 
            this.UI.scoreText.changeStyle({
                textAlign: "left"
            }), this.UI.showScore();
        }
    }, {
        key: "addProgressBar",
        value: function() {
            var i = new o.PlaneBufferGeometry(this.PositionRange, .3, 30);
            this.progress = new o.Object3D();
            var e = new o.CircleGeometry(.6, 40, 0, 2 * Math.PI), t = new o.CircleGeometry(.15, 15, 0, Math.PI);
            this.roundCircle = new o.Mesh(e, new o.MeshBasicMaterial({})), this.roundCircleBack = new o.Mesh(t, new o.MeshBasicMaterial({
                transparent: !0,
                opacity: .25,
                color: 16777215
            })), this.secondRoundCircle = new o.Mesh(t, new o.MeshBasicMaterial({})), this.secondRoundCircleBack = this.roundCircleBack.clone(), 
            this.backgroundBar = new o.Mesh(i, new o.MeshBasicMaterial({
                transparent: !0,
                opacity: .15,
                color: 16777215
            })), this.progressBar = new o.Object3D(), this.progressBar.add(new o.Mesh(i, new o.MeshBasicMaterial({
                transparent: !0
            }))), this.progressShadow = new o.Mesh(new o.PlaneGeometry(this.PositionRange, .15), new o.MeshBasicMaterial({
                transparent: !0,
                color: 16777215,
                opacity: .08
            })), this.progressShadow.position.set(0, .19, .1), this.progressBar.add(this.progressShadow), 
            this.progress.add(this.roundCircleBack), this.secondRoundCircleBack.position.z = this.roundCircleBack.position.z = this.backgroundBar.position.z = -.1, 
            this.progress.add(this.secondRoundCircleBack), this.progress.add(this.backgroundBar), 
            this.progress.add(this.progressBar), this.roundCircle.rotation.z = this.roundCircleBack.rotation.z = -Math.PI / 2, 
            this.roundCircleBack.position.x = this.rightPositionEndX, this.roundCircle.position.x = this.leftPositionStartX, 
            this.secondRoundCircle.rotation.z = this.secondRoundCircleBack.rotation.z = Math.PI / 2, 
            this.secondRoundCircle.position.x = this.secondRoundCircleBack.position.x = this.leftPositionStartX, 
            this.progress.add(this.roundCircle), this.progress.add(this.secondRoundCircle), 
            this.progress.position.set(0, this.progressY, 0), this.progressBar.scale.x = .01, 
            this.progressBar.position.x = this.leftPositionStartX, this.backgroundBar.position.x = this.barPositionCenter, 
            this.secondRoundCircle.position.x = this.leftPositionStartX, this.game.camera.add(this.progress);
        }
    }, {
        key: "getDataByPercent",
        value: function(i) {
            var e = this.totalGameTime, t = .01, s = this.leftPositionStartX, o = e, n = this.leftPositionStartX;
            return e && (o = e - e * i, t = i, s += this.PositionRange * i / 2, n = this.PositionRange * i + this.leftPositionStartX), 
            {
                restTime: o,
                roundPositionX: n,
                scaleX: t,
                positionX: s
            };
        }
    }, {
        key: "startProgressBarFrom",
        value: function() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .01, e = this.getDataByPercent(i), t = e.restTime, o = e.scaleX, n = e.positionX, r = e.roundPositionX;
            this.progressBar.scale.x = o, this.progressBar.position.x = n, this.roundCircle.position.x = r, 
            this.stopAnimation(), s.customAnimation.to(this.progressBar.scale, t / 1e3, {
                x: 1,
                name: "progress",
                onComplete: function() {}
            }), s.customAnimation.to(this.progressBar.position, t / 1e3, {
                x: this.barPositionCenter,
                name: "progress"
            }), s.customAnimation.to(this.roundCircle.position, t / 1e3, {
                x: this.rightPositionEndX,
                name: "progress"
            });
        }
    }, {
        key: "setProgressBarPostionByPercent",
        value: function() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .01, e = this.getDataByPercent(i), t = (e.restTime, 
            e.scaleX), s = e.positionX, o = e.roundPositionX;
            this.progressBar.scale.x = t, this.progressBar.position.x = s, this.roundCircle.position.x = o;
        }
    }, {
        key: "stopAnimation",
        value: function() {
            s.TweenAnimation.kill("progress");
        }
    }, {
        key: "inPositionRange",
        value: function(i, e, t, s) {
            return t - 3 < i && i < t + 3 && s - 3 < e && e < s + 3;
        }
    }, {
        key: "onStartChangeProgress",
        value: function() {
            this.stopAnimation(), this.isChangingProgress = !0;
        }
    }, {
        key: "onMoveProgress",
        value: function(i) {
            if (this.isChangingProgress) {
                var e = i.changedTouches[0].pageX, t = i.changedTouches[0].pageY, s = this.changePositionCSS2DTo3D(e, t);
                this.leftPositionStartX < s.x && s.x < this.rightPositionEndX && this.setProgressBarPostionByPercent((s.x + Math.abs(this.leftPositionStartX)) / this.PositionRange);
            }
        }
    }, {
        key: "onEndChangeProgress",
        value: function() {
            if (this.isChangingProgress) {
                this.isChangingProgress = !1;
                var i = (this.roundCircle.position.x + Math.abs(this.leftPositionStartX)) / this.PositionRange;
                this.onChangeProgress(i);
            }
        }
    }, {
        key: "doTouchStartEvent",
        value: function(i) {
            var e = i.changedTouches[0].pageX, t = i.changedTouches[0].pageY, s = this.changePositionCSS2DTo3D(e, t);
            this.inPositionRange(s.x, s.y, this.roundCircle.position.x, this.roundCircle.position.y + this.progressY) && this.onStartChangeProgress(), 
            this.full2D.doTouchStartEvent(i);
        }
    }, {
        key: "doTouchMoveEvent",
        value: function(i) {
            this.isChangingProgress && this.onMoveProgress(i);
        }
    }, {
        key: "doTouchEndEvent",
        value: function(i) {
            this.onEndChangeProgress(), this.isChangingProgress = !1, this.full2D.doTouchEndEvent(i);
        }
    }, {
        key: "show",
        value: function(i, e) {
            var t = this, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .01, o = this;
            this.totalGameTime = e, this.setScorePostion(), this.showRecordPage = function() {
                t.game.full2D.showRecordPage({
                    headimg: i.headimg,
                    is_self: o.is_self,
                    is_from_share: o.is_from_share,
                    onShare: function() {
                        o.onOpenSharePage();
                    }
                });
            }, this.showRecordPage(), this.addProgressBar(), this.startProgressBarFrom(s);
        }
    }, {
        key: "onClickHide",
        value: function() {
            this.onHide();
        }
    }, {
        key: "pause",
        value: function() {
            this.game.full2D.hide2D(), this.hide3D();
        }
    }, {
        key: "continue",
        value: function() {
            this.showRecordPage(), this.addProgressBar(), this.setScorePostion();
        }
    }, {
        key: "hide3D",
        value: function() {
            this.game.UI.hideScore(), this.game.UI.scoreText.obj.position.y = 21, this.game.UI.scoreText.obj.position.x = this.leftPositionStartX, 
            this.game.camera.remove(this.progress);
        }
    }, {
        key: "hide",
        value: function() {
            this.stopAnimation(), this.game.full2D.hide2D(), this.hide3D();
        }
    } ]), n;
}();

exports.default = n;