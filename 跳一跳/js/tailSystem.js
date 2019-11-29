function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var o = i[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(i, e, o) {
        return e && t(i.prototype, e), o && t(i, o), i;
    };
}(), e = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("./lib/three.js")), o = {
    duration: 100,
    height: 2,
    width: .5,
    distance: .5
}, s = function() {
    function s(i, e) {
        t(this, s), this.scene = i, this.bottle = e, this.tailsRemainPool = [], this.tailsUsingPool = [], 
        this.lastDotPosition = this.bottle.obj.position.clone(), this.nowPosition = this.bottle.obj.position.clone(), 
        this.distance = o.distance, this.init();
    }
    return i(s, [ {
        key: "init",
        value: function() {
            var t = o.width, i = o.height;
            this.geometry = new e.PlaneBufferGeometry(t, i), this.material = new e.MeshBasicMaterial({
                color: 16777215,
                side: e.DoubleSide,
                transparent: !0,
                opacity: .3
            });
            for (var s = 0; s < 20; s++) {
                var a = new n(this.geometry, this.material);
                this.scene.add(a.mesh), this.tailsRemainPool.push(a);
            }
        }
    }, {
        key: "update",
        value: function(t) {
            if (this.updateActiveCell(t), "prepare" == this.bottle.status && (this.nowPosition = this.bottle.obj.position.clone(), 
            this.lastDotPosition = this.bottle.obj.position.clone()), "jump" == this.bottle.status) {
                var i = void 0;
                if (this.nowPosition = this.bottle.obj.position.clone(), (i = this.nowPosition.clone().distanceTo(this.lastDotPosition.clone())) < 5) {
                    if (i >= this.distance) for (var e = i / this.distance, s = Math.floor(e), n = this.lastDotPosition.clone(), a = this.nowPosition.clone(), l = t / o.duration, h = 1; h <= s; h++) {
                        a = this.lastDotPosition.clone().lerp(this.nowPosition.clone(), h / e);
                        var r = 1 + l * (h / e - 1);
                        r = r <= 0 ? 0 : r, this.layEgg(n.clone(), a.clone(), r), n = a.clone(), h == s && (this.lastDotPosition = a.clone());
                    }
                } else this.lastDotPosition = this.nowPosition.clone();
            }
        }
    }, {
        key: "updateActiveCell",
        value: function(t) {
            for (var i = this.tailsUsingPool, e = 1 / o.duration, s = (o.duration, 0); s < i.length; s++) {
                i[s].tickTime += t;
                var n = i[s].mesh.scale.y - e * t;
                if (n > 0) {
                    if (i[s].mesh.scale.y = n > 0 ? n : 0, i[s].tickTime >= o.duration) {
                        i[s].reset();
                        var a = i.shift();
                        this.tailsRemainPool.push(a), s--;
                    }
                } else {
                    i[s].reset();
                    var l = i.shift();
                    this.tailsRemainPool.push(l), s--;
                }
            }
        }
    }, {
        key: "correctPosition",
        value: function() {
            this.lastDotPosition = this.bottle.obj.position.clone();
        }
    }, {
        key: "layEgg",
        value: function(t, i) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, o = this.getMesh();
            this.tailsUsingPool.push(o), o.mesh.position.set(i.x, i.y, i.z), o.mesh.scale.y = e, 
            o.mesh.lookAt(t), o.mesh.rotateY(Math.PI / 2), o.mesh.visible = !0;
        }
    }, {
        key: "getMesh",
        value: function() {
            var t = this.tailsRemainPool.shift();
            return t || (t = new n(this.geometry, this.material), this.scene.add(t.mesh)), t;
        }
    }, {
        key: "allReset",
        value: function() {
            this.tailsRemainPool.forEach(function(t) {
                t.reset();
            });
        }
    } ]), s;
}();

exports.default = s;

var n = function() {
    function o(i, s) {
        t(this, o), this.tickTime = 0, this.mesh = new e.Mesh(i, s), this.mesh.visible = !1, 
        this.mesh.name = "tail";
    }
    return i(o, [ {
        key: "reset",
        value: function() {
            this.tickTime = 0, this.mesh.scale.set(1, 1, 1), this.mesh.visible = !1;
        }
    } ]), o;
}();