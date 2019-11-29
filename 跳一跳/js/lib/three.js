!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([ "exports" ], e) : e(t.THREE = t.THREE || {});
}(this, function(t) {
    "use strict";
    function e() {}
    void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Number.isInteger && (Number.isInteger = function(t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
    }), void 0 === Math.sign && (Math.sign = function(t) {
        return t < 0 ? -1 : t > 0 ? 1 : +t;
    }), "name" in Function.prototype == !1 && Object.defineProperty(Function.prototype, "name", {
        get: function() {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
        }
    }), void 0 === Object.assign && (Object.assign = function(t) {
        if (null == t) throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            if (null != n) for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }), Object.assign(e.prototype, {
        addEventListener: function(t, e) {
            void 0 === this._listeners && (this._listeners = {});
            var i = this._listeners;
            void 0 === i[t] && (i[t] = []), -1 === i[t].indexOf(e) && i[t].push(e);
        },
        hasEventListener: function(t, e) {
            if (void 0 === this._listeners) return !1;
            var i = this._listeners;
            return void 0 !== i[t] && -1 !== i[t].indexOf(e);
        },
        removeEventListener: function(t, e) {
            if (void 0 !== this._listeners) {
                var i = this._listeners[t];
                if (void 0 !== i) {
                    var n = i.indexOf(e);
                    -1 !== n && i.splice(n, 1);
                }
            }
        },
        dispatchEvent: function(t) {
            if (void 0 !== this._listeners) {
                var e = this._listeners[t.type];
                if (void 0 !== e) {
                    t.target = this;
                    for (var i = e.slice(0), n = 0, r = i.length; n < r; n++) i[n].call(this, t);
                }
            }
        }
    });
    var i, n, r, a, o, s, c, h, l, u, p, d, f, m = "88dev", g = 0, v = 1, y = 2, x = 0, b = 1, _ = 2, w = 0, M = 1, E = 2, T = 0, S = 1, A = 2, R = 0, L = 1, P = 2, C = 3, I = 4, U = 5, D = 100, O = 101, N = 102, F = 103, B = 104, z = 200, G = 201, H = 202, V = 203, k = 204, j = 205, W = 206, X = 207, q = 208, Y = 209, Z = 210, J = 0, Q = 1, K = 2, $ = 3, tt = 4, et = 5, it = 6, nt = 7, rt = 0, at = 1, ot = 2, st = 0, ct = 1, ht = 2, lt = 3, ut = 4, pt = 301, dt = 302, ft = 303, mt = 304, gt = 305, vt = 306, yt = 307, xt = 1e3, bt = 1001, _t = 1002, wt = 1003, Mt = 1004, Et = 1005, Tt = 1006, St = 1007, At = 1008, Rt = 1009, Lt = 1010, Pt = 1011, Ct = 1012, It = 1013, Ut = 1014, Dt = 1015, Ot = 1016, Nt = 1017, Ft = 1018, Bt = 1019, zt = 1020, Gt = 1021, Ht = 1022, Vt = 1023, kt = 1024, jt = 1025, Wt = Vt, Xt = 1026, qt = 1027, Yt = 2001, Zt = 2002, Jt = 2003, Qt = 2004, Kt = 2100, $t = 2101, te = 2102, ee = 2103, ie = 2151, ne = 2201, re = 2400, ae = 0, oe = 1, se = 2, ce = 3e3, he = 3001, le = 3007, ue = 3002, pe = 3004, de = 3005, fe = 3006, me = 3200, ge = 3201, ve = {
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
        generateUUID: (n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), 
        r = new Array(36), a = 0, function() {
            for (var t = 0; t < 36; t++) 8 === t || 13 === t || 18 === t || 23 === t ? r[t] = "-" : 14 === t ? r[t] = "4" : (a <= 2 && (a = 33554432 + 16777216 * Math.random() | 0), 
            i = 15 & a, a >>= 4, r[t] = n[19 === t ? 3 & i | 8 : i]);
            return r.join("");
        }),
        clamp: function(t, e, i) {
            return Math.max(e, Math.min(i, t));
        },
        euclideanModulo: function(t, e) {
            return (t % e + e) % e;
        },
        mapLinear: function(t, e, i, n, r) {
            return n + (t - e) * (r - n) / (i - e);
        },
        lerp: function(t, e, i) {
            return (1 - i) * t + i * e;
        },
        smoothstep: function(t, e, i) {
            return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e)) * t * (3 - 2 * t);
        },
        smootherstep: function(t, e, i) {
            return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e)) * t * t * (t * (6 * t - 15) + 10);
        },
        randInt: function(t, e) {
            return t + Math.floor(Math.random() * (e - t + 1));
        },
        randFloat: function(t, e) {
            return t + Math.random() * (e - t);
        },
        randFloatSpread: function(t) {
            return t * (.5 - Math.random());
        },
        degToRad: function(t) {
            return t * ve.DEG2RAD;
        },
        radToDeg: function(t) {
            return t * ve.RAD2DEG;
        },
        isPowerOfTwo: function(t) {
            return 0 == (t & t - 1) && 0 !== t;
        },
        ceilPowerOfTwo: function(t) {
            return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2));
        },
        floorPowerOfTwo: function(t) {
            return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
        }
    };
    function ye(t, e) {
        this.x = t || 0, this.y = e || 0;
    }
    function xe() {
        this.elements = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
    }
    function be(t, e, i, n) {
        this._x = t || 0, this._y = e || 0, this._z = i || 0, this._w = void 0 !== n ? n : 1;
    }
    function _e(t, e, i) {
        this.x = t || 0, this.y = e || 0, this.z = i || 0;
    }
    function we() {
        this.elements = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
    }
    Object.defineProperties(ye.prototype, {
        width: {
            get: function() {
                return this.x;
            },
            set: function(t) {
                this.x = t;
            }
        },
        height: {
            get: function() {
                return this.y;
            },
            set: function(t) {
                this.y = t;
            }
        }
    }), Object.assign(ye.prototype, {
        isVector2: !0,
        set: function(t, e) {
            return this.x = t, this.y = e, this;
        },
        setScalar: function(t) {
            return this.x = t, this.y = t, this;
        },
        setX: function(t) {
            return this.x = t, this;
        },
        setY: function(t) {
            return this.y = t, this;
        },
        setComponent: function(t, e) {
            switch (t) {
              case 0:
                this.x = e;
                break;

              case 1:
                this.y = e;
                break;

              default:
                throw new Error("index is out of range: " + t);
            }
            return this;
        },
        getComponent: function(t) {
            switch (t) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              default:
                throw new Error("index is out of range: " + t);
            }
        },
        clone: function() {
            return new this.constructor(this.x, this.y);
        },
        copy: function(t) {
            return this.x = t.x, this.y = t.y, this;
        },
        add: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this);
        },
        addScalar: function(t) {
            return this.x += t, this.y += t, this;
        },
        addVectors: function(t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this;
        },
        addScaledVector: function(t, e) {
            return this.x += t.x * e, this.y += t.y * e, this;
        },
        sub: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this);
        },
        subScalar: function(t) {
            return this.x -= t, this.y -= t, this;
        },
        subVectors: function(t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this;
        },
        multiply: function(t) {
            return this.x *= t.x, this.y *= t.y, this;
        },
        multiplyScalar: function(t) {
            return this.x *= t, this.y *= t, this;
        },
        divide: function(t) {
            return this.x /= t.x, this.y /= t.y, this;
        },
        divideScalar: function(t) {
            return this.multiplyScalar(1 / t);
        },
        applyMatrix3: function(t) {
            var e = this.x, i = this.y, n = t.elements;
            return this.x = n[0] * e + n[3] * i + n[6], this.y = n[1] * e + n[4] * i + n[7], 
            this;
        },
        min: function(t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
        },
        max: function(t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
        },
        clamp: function(t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), 
            this;
        },
        clampScalar: (o = new ye(), s = new ye(), function(t, e) {
            return o.set(t, t), s.set(e, e), this.clamp(o, s);
        }),
        clampLength: function(t, e) {
            var i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(t, Math.min(e, i)));
        },
        floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
        },
        ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
        },
        round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        },
        roundToZero: function() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), 
            this;
        },
        negate: function() {
            return this.x = -this.x, this.y = -this.y, this;
        },
        dot: function(t) {
            return this.x * t.x + this.y * t.y;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        manhattanLength: function() {
            return Math.abs(this.x) + Math.abs(this.y);
        },
        normalize: function() {
            return this.divideScalar(this.length() || 1);
        },
        angle: function() {
            var t = Math.atan2(this.y, this.x);
            return t < 0 && (t += 2 * Math.PI), t;
        },
        distanceTo: function(t) {
            return Math.sqrt(this.distanceToSquared(t));
        },
        distanceToSquared: function(t) {
            var e = this.x - t.x, i = this.y - t.y;
            return e * e + i * i;
        },
        manhattanDistanceTo: function(t) {
            return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
        },
        setLength: function(t) {
            return this.normalize().multiplyScalar(t);
        },
        lerp: function(t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
        },
        lerpVectors: function(t, e, i) {
            return this.subVectors(e, t).multiplyScalar(i).add(t);
        },
        equals: function(t) {
            return t.x === this.x && t.y === this.y;
        },
        fromArray: function(t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, 
            t;
        },
        fromBufferAttribute: function(t, e, i) {
            return void 0 !== i && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), 
            this.x = t.getX(e), this.y = t.getY(e), this;
        },
        rotateAround: function(t, e) {
            var i = Math.cos(e), n = Math.sin(e), r = this.x - t.x, a = this.y - t.y;
            return this.x = r * i - a * n + t.x, this.y = r * n + a * i + t.y, this;
        }
    }), Object.assign(xe.prototype, {
        isMatrix4: !0,
        set: function(t, e, i, n, r, a, o, s, c, h, l, u, p, d, f, m) {
            var g = this.elements;
            return g[0] = t, g[4] = e, g[8] = i, g[12] = n, g[1] = r, g[5] = a, g[9] = o, g[13] = s, 
            g[2] = c, g[6] = h, g[10] = l, g[14] = u, g[3] = p, g[7] = d, g[11] = f, g[15] = m, 
            this;
        },
        identity: function() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        },
        clone: function() {
            return new xe().fromArray(this.elements);
        },
        copy: function(t) {
            var e = this.elements, i = t.elements;
            return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], 
            e[6] = i[6], e[7] = i[7], e[8] = i[8], e[9] = i[9], e[10] = i[10], e[11] = i[11], 
            e[12] = i[12], e[13] = i[13], e[14] = i[14], e[15] = i[15], this;
        },
        copyPosition: function(t) {
            var e = this.elements, i = t.elements;
            return e[12] = i[12], e[13] = i[13], e[14] = i[14], this;
        },
        extractBasis: function(t, e, i) {
            return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), 
            this;
        },
        makeBasis: function(t, e, i) {
            return this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1), 
            this;
        },
        extractRotation: (d = new _e(), function(t) {
            var e = this.elements, i = t.elements, n = 1 / d.setFromMatrixColumn(t, 0).length(), r = 1 / d.setFromMatrixColumn(t, 1).length(), a = 1 / d.setFromMatrixColumn(t, 2).length();
            return e[0] = i[0] * n, e[1] = i[1] * n, e[2] = i[2] * n, e[4] = i[4] * r, e[5] = i[5] * r, 
            e[6] = i[6] * r, e[8] = i[8] * a, e[9] = i[9] * a, e[10] = i[10] * a, this;
        }),
        makeRotationFromEuler: function(t) {
            t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            var e = this.elements, i = t.x, n = t.y, r = t.z, a = Math.cos(i), o = Math.sin(i), s = Math.cos(n), c = Math.sin(n), h = Math.cos(r), l = Math.sin(r);
            if ("XYZ" === t.order) {
                var u = a * h, p = a * l, d = o * h, f = o * l;
                e[0] = s * h, e[4] = -s * l, e[8] = c, e[1] = p + d * c, e[5] = u - f * c, e[9] = -o * s, 
                e[2] = f - u * c, e[6] = d + p * c, e[10] = a * s;
            } else if ("YXZ" === t.order) {
                var m = s * h, g = s * l, v = c * h, y = c * l;
                e[0] = m + y * o, e[4] = v * o - g, e[8] = a * c, e[1] = a * l, e[5] = a * h, e[9] = -o, 
                e[2] = g * o - v, e[6] = y + m * o, e[10] = a * s;
            } else if ("ZXY" === t.order) {
                m = s * h, g = s * l, v = c * h, y = c * l;
                e[0] = m - y * o, e[4] = -a * l, e[8] = v + g * o, e[1] = g + v * o, e[5] = a * h, 
                e[9] = y - m * o, e[2] = -a * c, e[6] = o, e[10] = a * s;
            } else if ("ZYX" === t.order) {
                u = a * h, p = a * l, d = o * h, f = o * l;
                e[0] = s * h, e[4] = d * c - p, e[8] = u * c + f, e[1] = s * l, e[5] = f * c + u, 
                e[9] = p * c - d, e[2] = -c, e[6] = o * s, e[10] = a * s;
            } else if ("YZX" === t.order) {
                var x = a * s, b = a * c, _ = o * s, w = o * c;
                e[0] = s * h, e[4] = w - x * l, e[8] = _ * l + b, e[1] = l, e[5] = a * h, e[9] = -o * h, 
                e[2] = -c * h, e[6] = b * l + _, e[10] = x - w * l;
            } else if ("XZY" === t.order) {
                x = a * s, b = a * c, _ = o * s, w = o * c;
                e[0] = s * h, e[4] = -l, e[8] = c * h, e[1] = x * l + w, e[5] = a * h, e[9] = b * l - _, 
                e[2] = _ * l - b, e[6] = o * h, e[10] = w * l + x;
            }
            return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, 
            this;
        },
        makeRotationFromQuaternion: function(t) {
            var e = this.elements, i = t._x, n = t._y, r = t._z, a = t._w, o = i + i, s = n + n, c = r + r, h = i * o, l = i * s, u = i * c, p = n * s, d = n * c, f = r * c, m = a * o, g = a * s, v = a * c;
            return e[0] = 1 - (p + f), e[4] = l - v, e[8] = u + g, e[1] = l + v, e[5] = 1 - (h + f), 
            e[9] = d - m, e[2] = u - g, e[6] = d + m, e[10] = 1 - (h + p), e[3] = 0, e[7] = 0, 
            e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
        },
        lookAt: (l = new _e(), u = new _e(), p = new _e(), function(t, e, i) {
            var n = this.elements;
            return p.subVectors(t, e), 0 === p.lengthSq() && (p.z = 1), p.normalize(), l.crossVectors(i, p), 
            0 === l.lengthSq() && (1 === Math.abs(i.z) ? p.x += 1e-4 : p.z += 1e-4, p.normalize(), 
            l.crossVectors(i, p)), l.normalize(), u.crossVectors(p, l), n[0] = l.x, n[4] = u.x, 
            n[8] = p.x, n[1] = l.y, n[5] = u.y, n[9] = p.y, n[2] = l.z, n[6] = u.z, n[10] = p.z, 
            this;
        }),
        multiply: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), 
            this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t);
        },
        premultiply: function(t) {
            return this.multiplyMatrices(t, this);
        },
        multiplyMatrices: function(t, e) {
            var i = t.elements, n = e.elements, r = this.elements, a = i[0], o = i[4], s = i[8], c = i[12], h = i[1], l = i[5], u = i[9], p = i[13], d = i[2], f = i[6], m = i[10], g = i[14], v = i[3], y = i[7], x = i[11], b = i[15], _ = n[0], w = n[4], M = n[8], E = n[12], T = n[1], S = n[5], A = n[9], R = n[13], L = n[2], P = n[6], C = n[10], I = n[14], U = n[3], D = n[7], O = n[11], N = n[15];
            return r[0] = a * _ + o * T + s * L + c * U, r[4] = a * w + o * S + s * P + c * D, 
            r[8] = a * M + o * A + s * C + c * O, r[12] = a * E + o * R + s * I + c * N, r[1] = h * _ + l * T + u * L + p * U, 
            r[5] = h * w + l * S + u * P + p * D, r[9] = h * M + l * A + u * C + p * O, r[13] = h * E + l * R + u * I + p * N, 
            r[2] = d * _ + f * T + m * L + g * U, r[6] = d * w + f * S + m * P + g * D, r[10] = d * M + f * A + m * C + g * O, 
            r[14] = d * E + f * R + m * I + g * N, r[3] = v * _ + y * T + x * L + b * U, r[7] = v * w + y * S + x * P + b * D, 
            r[11] = v * M + y * A + x * C + b * O, r[15] = v * E + y * R + x * I + b * N, this;
        },
        multiplyScalar: function(t) {
            var e = this.elements;
            return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, 
            e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, 
            e[11] *= t, e[15] *= t, this;
        },
        applyToBufferAttribute: function() {
            var t = new _e();
            return function(e) {
                for (var i = 0, n = e.count; i < n; i++) t.x = e.getX(i), t.y = e.getY(i), t.z = e.getZ(i), 
                t.applyMatrix4(this), e.setXYZ(i, t.x, t.y, t.z);
                return e;
            };
        }(),
        determinant: function() {
            var t = this.elements, e = t[0], i = t[4], n = t[8], r = t[12], a = t[1], o = t[5], s = t[9], c = t[13], h = t[2], l = t[6], u = t[10], p = t[14];
            return t[3] * (+r * s * l - n * c * l - r * o * u + i * c * u + n * o * p - i * s * p) + t[7] * (+e * s * p - e * c * u + r * a * u - n * a * p + n * c * h - r * s * h) + t[11] * (+e * c * l - e * o * p - r * a * l + i * a * p + r * o * h - i * c * h) + t[15] * (-n * o * h - e * s * l + e * o * u + n * a * l - i * a * u + i * s * h);
        },
        transpose: function() {
            var t, e = this.elements;
            return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], 
            e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], 
            e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
        },
        setPosition: function(t) {
            var e = this.elements;
            return e[12] = t.x, e[13] = t.y, e[14] = t.z, this;
        },
        getInverse: function(t, e) {
            var i = this.elements, n = t.elements, r = n[0], a = n[1], o = n[2], s = n[3], c = n[4], h = n[5], l = n[6], u = n[7], p = n[8], d = n[9], f = n[10], m = n[11], g = n[12], v = n[13], y = n[14], x = n[15], b = d * y * u - v * f * u + v * l * m - h * y * m - d * l * x + h * f * x, _ = g * f * u - p * y * u - g * l * m + c * y * m + p * l * x - c * f * x, w = p * v * u - g * d * u + g * h * m - c * v * m - p * h * x + c * d * x, M = g * d * l - p * v * l - g * h * f + c * v * f + p * h * y - c * d * y, E = r * b + a * _ + o * w + s * M;
            if (0 === E) {
                var T = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
                if (!0 === e) throw new Error(T);
                return console.warn(T), this.identity();
            }
            var S = 1 / E;
            return i[0] = b * S, i[1] = (v * f * s - d * y * s - v * o * m + a * y * m + d * o * x - a * f * x) * S, 
            i[2] = (h * y * s - v * l * s + v * o * u - a * y * u - h * o * x + a * l * x) * S, 
            i[3] = (d * l * s - h * f * s - d * o * u + a * f * u + h * o * m - a * l * m) * S, 
            i[4] = _ * S, i[5] = (p * y * s - g * f * s + g * o * m - r * y * m - p * o * x + r * f * x) * S, 
            i[6] = (g * l * s - c * y * s - g * o * u + r * y * u + c * o * x - r * l * x) * S, 
            i[7] = (c * f * s - p * l * s + p * o * u - r * f * u - c * o * m + r * l * m) * S, 
            i[8] = w * S, i[9] = (g * d * s - p * v * s - g * a * m + r * v * m + p * a * x - r * d * x) * S, 
            i[10] = (c * v * s - g * h * s + g * a * u - r * v * u - c * a * x + r * h * x) * S, 
            i[11] = (p * h * s - c * d * s - p * a * u + r * d * u + c * a * m - r * h * m) * S, 
            i[12] = M * S, i[13] = (p * v * o - g * d * o + g * a * f - r * v * f - p * a * y + r * d * y) * S, 
            i[14] = (g * h * o - c * v * o - g * a * l + r * v * l + c * a * y - r * h * y) * S, 
            i[15] = (c * d * o - p * h * o + p * a * l - r * d * l - c * a * f + r * h * f) * S, 
            this;
        },
        scale: function(t) {
            var e = this.elements, i = t.x, n = t.y, r = t.z;
            return e[0] *= i, e[4] *= n, e[8] *= r, e[1] *= i, e[5] *= n, e[9] *= r, e[2] *= i, 
            e[6] *= n, e[10] *= r, e[3] *= i, e[7] *= n, e[11] *= r, this;
        },
        getMaxScaleOnAxis: function() {
            var t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
            return Math.sqrt(Math.max(e, i, n));
        },
        makeTranslation: function(t, e, i) {
            return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1), this;
        },
        makeRotationX: function(t) {
            var e = Math.cos(t), i = Math.sin(t);
            return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this;
        },
        makeRotationY: function(t) {
            var e = Math.cos(t), i = Math.sin(t);
            return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this;
        },
        makeRotationZ: function(t) {
            var e = Math.cos(t), i = Math.sin(t);
            return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        },
        makeRotationAxis: function(t, e) {
            var i = Math.cos(e), n = Math.sin(e), r = 1 - i, a = t.x, o = t.y, s = t.z, c = r * a, h = r * o;
            return this.set(c * a + i, c * o - n * s, c * s + n * o, 0, c * o + n * s, h * o + i, h * s - n * a, 0, c * s - n * o, h * s + n * a, r * s * s + i, 0, 0, 0, 0, 1), 
            this;
        },
        makeScale: function(t, e, i) {
            return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
        },
        makeShear: function(t, e, i) {
            return this.set(1, e, i, 0, t, 1, i, 0, t, e, 1, 0, 0, 0, 0, 1), this;
        },
        compose: function(t, e, i) {
            return this.makeRotationFromQuaternion(e), this.scale(i), this.setPosition(t), this;
        },
        decompose: (c = new _e(), h = new xe(), function(t, e, i) {
            var n = this.elements, r = c.set(n[0], n[1], n[2]).length(), a = c.set(n[4], n[5], n[6]).length(), o = c.set(n[8], n[9], n[10]).length();
            this.determinant() < 0 && (r = -r), t.x = n[12], t.y = n[13], t.z = n[14], h.copy(this);
            var s = 1 / r, l = 1 / a, u = 1 / o;
            return h.elements[0] *= s, h.elements[1] *= s, h.elements[2] *= s, h.elements[4] *= l, 
            h.elements[5] *= l, h.elements[6] *= l, h.elements[8] *= u, h.elements[9] *= u, 
            h.elements[10] *= u, e.setFromRotationMatrix(h), i.x = r, i.y = a, i.z = o, this;
        }),
        makePerspective: function(t, e, i, n, r, a) {
            void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            var o = this.elements, s = 2 * r / (e - t), c = 2 * r / (i - n), h = (e + t) / (e - t), l = (i + n) / (i - n), u = -(a + r) / (a - r), p = -2 * a * r / (a - r);
            return o[0] = s, o[4] = 0, o[8] = h, o[12] = 0, o[1] = 0, o[5] = c, o[9] = l, o[13] = 0, 
            o[2] = 0, o[6] = 0, o[10] = u, o[14] = p, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, 
            this;
        },
        makeOrthographic: function(t, e, i, n, r, a) {
            var o = this.elements, s = 1 / (e - t), c = 1 / (i - n), h = 1 / (a - r), l = (e + t) * s, u = (i + n) * c, p = (a + r) * h;
            return o[0] = 2 * s, o[4] = 0, o[8] = 0, o[12] = -l, o[1] = 0, o[5] = 2 * c, o[9] = 0, 
            o[13] = -u, o[2] = 0, o[6] = 0, o[10] = -2 * h, o[14] = -p, o[3] = 0, o[7] = 0, 
            o[11] = 0, o[15] = 1, this;
        },
        equals: function(t) {
            for (var e = this.elements, i = t.elements, n = 0; n < 16; n++) if (e[n] !== i[n]) return !1;
            return !0;
        },
        fromArray: function(t, e) {
            void 0 === e && (e = 0);
            for (var i = 0; i < 16; i++) this.elements[i] = t[i + e];
            return this;
        },
        toArray: function(t, e) {
            void 0 === t && (t = []), void 0 === e && (e = 0);
            var i = this.elements;
            return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], 
            t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t[e + 9] = i[9], 
            t[e + 10] = i[10], t[e + 11] = i[11], t[e + 12] = i[12], t[e + 13] = i[13], t[e + 14] = i[14], 
            t[e + 15] = i[15], t;
        }
    }), Object.assign(be, {
        slerp: function(t, e, i, n) {
            return i.copy(t).slerp(e, n);
        },
        slerpFlat: function(t, e, i, n, r, a, o) {
            var s = i[n + 0], c = i[n + 1], h = i[n + 2], l = i[n + 3], u = r[a + 0], p = r[a + 1], d = r[a + 2], f = r[a + 3];
            if (l !== f || s !== u || c !== p || h !== d) {
                var m = 1 - o, g = s * u + c * p + h * d + l * f, v = g >= 0 ? 1 : -1, y = 1 - g * g;
                if (y > Number.EPSILON) {
                    var x = Math.sqrt(y), b = Math.atan2(x, g * v);
                    m = Math.sin(m * b) / x, o = Math.sin(o * b) / x;
                }
                var _ = o * v;
                if (s = s * m + u * _, c = c * m + p * _, h = h * m + d * _, l = l * m + f * _, 
                m === 1 - o) {
                    var w = 1 / Math.sqrt(s * s + c * c + h * h + l * l);
                    s *= w, c *= w, h *= w, l *= w;
                }
            }
            t[e] = s, t[e + 1] = c, t[e + 2] = h, t[e + 3] = l;
        }
    }), Object.defineProperties(be.prototype, {
        x: {
            get: function() {
                return this._x;
            },
            set: function(t) {
                this._x = t, this.onChangeCallback();
            }
        },
        y: {
            get: function() {
                return this._y;
            },
            set: function(t) {
                this._y = t, this.onChangeCallback();
            }
        },
        z: {
            get: function() {
                return this._z;
            },
            set: function(t) {
                this._z = t, this.onChangeCallback();
            }
        },
        w: {
            get: function() {
                return this._w;
            },
            set: function(t) {
                this._w = t, this.onChangeCallback();
            }
        }
    }), Object.assign(be.prototype, {
        set: function(t, e, i, n) {
            return this._x = t, this._y = e, this._z = i, this._w = n, this.onChangeCallback(), 
            this;
        },
        clone: function() {
            return new this.constructor(this._x, this._y, this._z, this._w);
        },
        copy: function(t) {
            return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), 
            this;
        },
        setFromEuler: function(t, e) {
            if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            var i = t._x, n = t._y, r = t._z, a = t.order, o = Math.cos, s = Math.sin, c = o(i / 2), h = o(n / 2), l = o(r / 2), u = s(i / 2), p = s(n / 2), d = s(r / 2);
            return "XYZ" === a ? (this._x = u * h * l + c * p * d, this._y = c * p * l - u * h * d, 
            this._z = c * h * d + u * p * l, this._w = c * h * l - u * p * d) : "YXZ" === a ? (this._x = u * h * l + c * p * d, 
            this._y = c * p * l - u * h * d, this._z = c * h * d - u * p * l, this._w = c * h * l + u * p * d) : "ZXY" === a ? (this._x = u * h * l - c * p * d, 
            this._y = c * p * l + u * h * d, this._z = c * h * d + u * p * l, this._w = c * h * l - u * p * d) : "ZYX" === a ? (this._x = u * h * l - c * p * d, 
            this._y = c * p * l + u * h * d, this._z = c * h * d - u * p * l, this._w = c * h * l + u * p * d) : "YZX" === a ? (this._x = u * h * l + c * p * d, 
            this._y = c * p * l + u * h * d, this._z = c * h * d - u * p * l, this._w = c * h * l - u * p * d) : "XZY" === a && (this._x = u * h * l - c * p * d, 
            this._y = c * p * l - u * h * d, this._z = c * h * d + u * p * l, this._w = c * h * l + u * p * d), 
            !1 !== e && this.onChangeCallback(), this;
        },
        setFromAxisAngle: function(t, e) {
            var i = e / 2, n = Math.sin(i);
            return this._x = t.x * n, this._y = t.y * n, this._z = t.z * n, this._w = Math.cos(i), 
            this.onChangeCallback(), this;
        },
        setFromRotationMatrix: function(t) {
            var e, i = t.elements, n = i[0], r = i[4], a = i[8], o = i[1], s = i[5], c = i[9], h = i[2], l = i[6], u = i[10], p = n + s + u;
            return p > 0 ? (e = .5 / Math.sqrt(p + 1), this._w = .25 / e, this._x = (l - c) * e, 
            this._y = (a - h) * e, this._z = (o - r) * e) : n > s && n > u ? (e = 2 * Math.sqrt(1 + n - s - u), 
            this._w = (l - c) / e, this._x = .25 * e, this._y = (r + o) / e, this._z = (a + h) / e) : s > u ? (e = 2 * Math.sqrt(1 + s - n - u), 
            this._w = (a - h) / e, this._x = (r + o) / e, this._y = .25 * e, this._z = (c + l) / e) : (e = 2 * Math.sqrt(1 + u - n - s), 
            this._w = (o - r) / e, this._x = (a + h) / e, this._y = (c + l) / e, this._z = .25 * e), 
            this.onChangeCallback(), this;
        },
        setFromUnitVectors: function() {
            var t, e = new _e();
            return function(i, n) {
                return void 0 === e && (e = new _e()), (t = i.dot(n) + 1) < 1e-6 ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, n), 
                this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize();
            };
        }(),
        inverse: function() {
            return this.conjugate().normalize();
        },
        conjugate: function() {
            return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this;
        },
        dot: function(t) {
            return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
        },
        lengthSq: function() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        },
        length: function() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
        },
        normalize: function() {
            var t = this.length();
            return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, 
            this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), 
            this.onChangeCallback(), this;
        },
        multiply: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), 
            this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t);
        },
        premultiply: function(t) {
            return this.multiplyQuaternions(t, this);
        },
        multiplyQuaternions: function(t, e) {
            var i = t._x, n = t._y, r = t._z, a = t._w, o = e._x, s = e._y, c = e._z, h = e._w;
            return this._x = i * h + a * o + n * c - r * s, this._y = n * h + a * s + r * o - i * c, 
            this._z = r * h + a * c + i * s - n * o, this._w = a * h - i * o - n * s - r * c, 
            this.onChangeCallback(), this;
        },
        slerp: function(t, e) {
            if (0 === e) return this;
            if (1 === e) return this.copy(t);
            var i = this._x, n = this._y, r = this._z, a = this._w, o = a * t._w + i * t._x + n * t._y + r * t._z;
            if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, 
            o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = i, this._y = n, this._z = r, 
            this;
            var s = Math.sqrt(1 - o * o);
            if (Math.abs(s) < .001) return this._w = .5 * (a + this._w), this._x = .5 * (i + this._x), 
            this._y = .5 * (n + this._y), this._z = .5 * (r + this._z), this;
            var c = Math.atan2(s, o), h = Math.sin((1 - e) * c) / s, l = Math.sin(e * c) / s;
            return this._w = a * h + this._w * l, this._x = i * h + this._x * l, this._y = n * h + this._y * l, 
            this._z = r * h + this._z * l, this.onChangeCallback(), this;
        },
        equals: function(t) {
            return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
        },
        fromArray: function(t, e) {
            return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], 
            this._w = t[e + 3], this.onChangeCallback(), this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, 
            t[e + 2] = this._z, t[e + 3] = this._w, t;
        },
        onChange: function(t) {
            return this.onChangeCallback = t, this;
        },
        onChangeCallback: function() {}
    }), Object.assign(_e.prototype, {
        isVector3: !0,
        set: function(t, e, i) {
            return this.x = t, this.y = e, this.z = i, this;
        },
        setScalar: function(t) {
            return this.x = t, this.y = t, this.z = t, this;
        },
        setX: function(t) {
            return this.x = t, this;
        },
        setY: function(t) {
            return this.y = t, this;
        },
        setZ: function(t) {
            return this.z = t, this;
        },
        setComponent: function(t, e) {
            switch (t) {
              case 0:
                this.x = e;
                break;

              case 1:
                this.y = e;
                break;

              case 2:
                this.z = e;
                break;

              default:
                throw new Error("index is out of range: " + t);
            }
            return this;
        },
        getComponent: function(t) {
            switch (t) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              case 2:
                return this.z;

              default:
                throw new Error("index is out of range: " + t);
            }
        },
        clone: function() {
            return new this.constructor(this.x, this.y, this.z);
        },
        copy: function(t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this;
        },
        add: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this);
        },
        addScalar: function(t) {
            return this.x += t, this.y += t, this.z += t, this;
        },
        addVectors: function(t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
        },
        addScaledVector: function(t, e) {
            return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
        },
        sub: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this);
        },
        subScalar: function(t) {
            return this.x -= t, this.y -= t, this.z -= t, this;
        },
        subVectors: function(t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
        },
        multiply: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), 
            this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this);
        },
        multiplyScalar: function(t) {
            return this.x *= t, this.y *= t, this.z *= t, this;
        },
        multiplyVectors: function(t, e) {
            return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
        },
        applyEuler: (f = new be(), function(t) {
            return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), 
            this.applyQuaternion(f.setFromEuler(t));
        }),
        applyAxisAngle: function() {
            var t = new be();
            return function(e, i) {
                return this.applyQuaternion(t.setFromAxisAngle(e, i));
            };
        }(),
        applyMatrix3: function(t) {
            var e = this.x, i = this.y, n = this.z, r = t.elements;
            return this.x = r[0] * e + r[3] * i + r[6] * n, this.y = r[1] * e + r[4] * i + r[7] * n, 
            this.z = r[2] * e + r[5] * i + r[8] * n, this;
        },
        applyMatrix4: function(t) {
            var e = this.x, i = this.y, n = this.z, r = t.elements, a = 1 / (r[3] * e + r[7] * i + r[11] * n + r[15]);
            return this.x = (r[0] * e + r[4] * i + r[8] * n + r[12]) * a, this.y = (r[1] * e + r[5] * i + r[9] * n + r[13]) * a, 
            this.z = (r[2] * e + r[6] * i + r[10] * n + r[14]) * a, this;
        },
        applyQuaternion: function(t) {
            var e = this.x, i = this.y, n = this.z, r = t.x, a = t.y, o = t.z, s = t.w, c = s * e + a * n - o * i, h = s * i + o * e - r * n, l = s * n + r * i - a * e, u = -r * e - a * i - o * n;
            return this.x = c * s + u * -r + h * -o - l * -a, this.y = h * s + u * -a + l * -r - c * -o, 
            this.z = l * s + u * -o + c * -a - h * -r, this;
        },
        project: function() {
            var t = new xe();
            return function(e) {
                return t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)), this.applyMatrix4(t);
            };
        }(),
        unproject: function() {
            var t = new xe();
            return function(e) {
                return t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)), this.applyMatrix4(t);
            };
        }(),
        transformDirection: function(t) {
            var e = this.x, i = this.y, n = this.z, r = t.elements;
            return this.x = r[0] * e + r[4] * i + r[8] * n, this.y = r[1] * e + r[5] * i + r[9] * n, 
            this.z = r[2] * e + r[6] * i + r[10] * n, this.normalize();
        },
        divide: function(t) {
            return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
        },
        divideScalar: function(t) {
            return this.multiplyScalar(1 / t);
        },
        min: function(t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), 
            this;
        },
        max: function(t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), 
            this;
        },
        clamp: function(t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), 
            this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
        },
        clampScalar: function() {
            var t = new _e(), e = new _e();
            return function(i, n) {
                return t.set(i, i, i), e.set(n, n, n), this.clamp(t, e);
            };
        }(),
        clampLength: function(t, e) {
            var i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(t, Math.min(e, i)));
        },
        floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), 
            this;
        },
        ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), 
            this;
        },
        round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), 
            this;
        },
        roundToZero: function() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), 
            this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
        },
        negate: function() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
        },
        dot: function(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        manhattanLength: function() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        },
        normalize: function() {
            return this.divideScalar(this.length() || 1);
        },
        setLength: function(t) {
            return this.normalize().multiplyScalar(t);
        },
        lerp: function(t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, 
            this;
        },
        lerpVectors: function(t, e, i) {
            return this.subVectors(e, t).multiplyScalar(i).add(t);
        },
        cross: function(t, e) {
            if (void 0 !== e) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), 
            this.crossVectors(t, e);
            var i = this.x, n = this.y, r = this.z;
            return this.x = n * t.z - r * t.y, this.y = r * t.x - i * t.z, this.z = i * t.y - n * t.x, 
            this;
        },
        crossVectors: function(t, e) {
            var i = t.x, n = t.y, r = t.z, a = e.x, o = e.y, s = e.z;
            return this.x = n * s - r * o, this.y = r * a - i * s, this.z = i * o - n * a, this;
        },
        projectOnVector: function(t) {
            var e = t.dot(this) / t.lengthSq();
            return this.copy(t).multiplyScalar(e);
        },
        projectOnPlane: function() {
            var t = new _e();
            return function(e) {
                return t.copy(this).projectOnVector(e), this.sub(t);
            };
        }(),
        reflect: function() {
            var t = new _e();
            return function(e) {
                return this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)));
            };
        }(),
        angleTo: function(t) {
            var e = this.dot(t) / Math.sqrt(this.lengthSq() * t.lengthSq());
            return Math.acos(ve.clamp(e, -1, 1));
        },
        distanceTo: function(t) {
            return Math.sqrt(this.distanceToSquared(t));
        },
        distanceToSquared: function(t) {
            var e = this.x - t.x, i = this.y - t.y, n = this.z - t.z;
            return e * e + i * i + n * n;
        },
        manhattanDistanceTo: function(t) {
            return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
        },
        setFromSpherical: function(t) {
            var e = Math.sin(t.phi) * t.radius;
            return this.x = e * Math.sin(t.theta), this.y = Math.cos(t.phi) * t.radius, this.z = e * Math.cos(t.theta), 
            this;
        },
        setFromCylindrical: function(t) {
            return this.x = t.radius * Math.sin(t.theta), this.y = t.y, this.z = t.radius * Math.cos(t.theta), 
            this;
        },
        setFromMatrixPosition: function(t) {
            var e = t.elements;
            return this.x = e[12], this.y = e[13], this.z = e[14], this;
        },
        setFromMatrixScale: function(t) {
            var e = this.setFromMatrixColumn(t, 0).length(), i = this.setFromMatrixColumn(t, 1).length(), n = this.setFromMatrixColumn(t, 2).length();
            return this.x = e, this.y = i, this.z = n, this;
        },
        setFromMatrixColumn: function(t, e) {
            return this.fromArray(t.elements, 4 * e);
        },
        equals: function(t) {
            return t.x === this.x && t.y === this.y && t.z === this.z;
        },
        fromArray: function(t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], 
            this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, 
            t[e + 2] = this.z, t;
        },
        fromBufferAttribute: function(t, e, i) {
            return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), 
            this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
        }
    }), Object.assign(we.prototype, {
        isMatrix3: !0,
        set: function(t, e, i, n, r, a, o, s, c) {
            var h = this.elements;
            return h[0] = t, h[1] = n, h[2] = o, h[3] = e, h[4] = r, h[5] = s, h[6] = i, h[7] = a, 
            h[8] = c, this;
        },
        identity: function() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
        },
        clone: function() {
            return new this.constructor().fromArray(this.elements);
        },
        copy: function(t) {
            var e = this.elements, i = t.elements;
            return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], 
            e[6] = i[6], e[7] = i[7], e[8] = i[8], this;
        },
        setFromMatrix4: function(t) {
            var e = t.elements;
            return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
        },
        applyToBufferAttribute: function() {
            var t = new _e();
            return function(e) {
                for (var i = 0, n = e.count; i < n; i++) t.x = e.getX(i), t.y = e.getY(i), t.z = e.getZ(i), 
                t.applyMatrix3(this), e.setXYZ(i, t.x, t.y, t.z);
                return e;
            };
        }(),
        multiply: function(t) {
            return this.multiplyMatrices(this, t);
        },
        premultiply: function(t) {
            return this.multiplyMatrices(t, this);
        },
        multiplyMatrices: function(t, e) {
            var i = t.elements, n = e.elements, r = this.elements, a = i[0], o = i[3], s = i[6], c = i[1], h = i[4], l = i[7], u = i[2], p = i[5], d = i[8], f = n[0], m = n[3], g = n[6], v = n[1], y = n[4], x = n[7], b = n[2], _ = n[5], w = n[8];
            return r[0] = a * f + o * v + s * b, r[3] = a * m + o * y + s * _, r[6] = a * g + o * x + s * w, 
            r[1] = c * f + h * v + l * b, r[4] = c * m + h * y + l * _, r[7] = c * g + h * x + l * w, 
            r[2] = u * f + p * v + d * b, r[5] = u * m + p * y + d * _, r[8] = u * g + p * x + d * w, 
            this;
        },
        multiplyScalar: function(t) {
            var e = this.elements;
            return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, 
            e[5] *= t, e[8] *= t, this;
        },
        determinant: function() {
            var t = this.elements, e = t[0], i = t[1], n = t[2], r = t[3], a = t[4], o = t[5], s = t[6], c = t[7], h = t[8];
            return e * a * h - e * o * c - i * r * h + i * o * s + n * r * c - n * a * s;
        },
        getInverse: function(t, e) {
            t && t.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
            var i = t.elements, n = this.elements, r = i[0], a = i[1], o = i[2], s = i[3], c = i[4], h = i[5], l = i[6], u = i[7], p = i[8], d = p * c - h * u, f = h * l - p * s, m = u * s - c * l, g = r * d + a * f + o * m;
            if (0 === g) {
                var v = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
                if (!0 === e) throw new Error(v);
                return console.warn(v), this.identity();
            }
            var y = 1 / g;
            return n[0] = d * y, n[1] = (o * u - p * a) * y, n[2] = (h * a - o * c) * y, n[3] = f * y, 
            n[4] = (p * r - o * l) * y, n[5] = (o * s - h * r) * y, n[6] = m * y, n[7] = (a * l - u * r) * y, 
            n[8] = (c * r - a * s) * y, this;
        },
        transpose: function() {
            var t, e = this.elements;
            return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], 
            e[5] = e[7], e[7] = t, this;
        },
        getNormalMatrix: function(t) {
            return this.setFromMatrix4(t).getInverse(this).transpose();
        },
        transposeIntoArray: function(t) {
            var e = this.elements;
            return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], 
            t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
        },
        setUvTransform: function(t, e, i, n, r, a, o) {
            var s = Math.cos(r), c = Math.sin(r);
            this.set(i * s, i * c, -i * (s * a + c * o) + a + t, -n * c, n * s, -n * (-c * a + s * o) + o + e, 0, 0, 1);
        },
        scale: function(t, e) {
            var i = this.elements;
            return i[0] *= t, i[3] *= t, i[6] *= t, i[1] *= e, i[4] *= e, i[7] *= e, this;
        },
        rotate: function(t) {
            var e = Math.cos(t), i = Math.sin(t), n = this.elements, r = n[0], a = n[3], o = n[6], s = n[1], c = n[4], h = n[7];
            return n[0] = e * r + i * s, n[3] = e * a + i * c, n[6] = e * o + i * h, n[1] = -i * r + e * s, 
            n[4] = -i * a + e * c, n[7] = -i * o + e * h, this;
        },
        translate: function(t, e) {
            var i = this.elements;
            return i[0] += t * i[2], i[3] += t * i[5], i[6] += t * i[8], i[1] += e * i[2], i[4] += e * i[5], 
            i[7] += e * i[8], this;
        },
        equals: function(t) {
            for (var e = this.elements, i = t.elements, n = 0; n < 9; n++) if (e[n] !== i[n]) return !1;
            return !0;
        },
        fromArray: function(t, e) {
            void 0 === e && (e = 0);
            for (var i = 0; i < 9; i++) this.elements[i] = t[i + e];
            return this;
        },
        toArray: function(t, e) {
            void 0 === t && (t = []), void 0 === e && (e = 0);
            var i = this.elements;
            return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], 
            t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t;
        }
    });
    var Me = 0;
    function Ee(t, e, i, n, r, a, o, s, c, h) {
        Object.defineProperty(this, "id", {
            value: Me++
        }), this.uuid = ve.generateUUID(), this.name = "", this.image = void 0 !== t ? t : Ee.DEFAULT_IMAGE, 
        this.mipmaps = [], this.mapping = void 0 !== e ? e : Ee.DEFAULT_MAPPING, this.wrapS = void 0 !== i ? i : bt, 
        this.wrapT = void 0 !== n ? n : bt, this.magFilter = void 0 !== r ? r : Tt, this.minFilter = void 0 !== a ? a : At, 
        this.anisotropy = void 0 !== c ? c : 1, this.format = void 0 !== o ? o : Vt, this.type = void 0 !== s ? s : Rt, 
        this.offset = new ye(0, 0), this.repeat = new ye(1, 1), this.center = new ye(0, 0), 
        this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new we(), this.generateMipmaps = !0, 
        this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== h ? h : ce, 
        this.version = 0, this.onUpdate = null;
    }
    function Te(t, e, i, n) {
        this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = void 0 !== n ? n : 1;
    }
    function Se(t, e, i) {
        this.uuid = ve.generateUUID(), this.width = t, this.height = e, this.scissor = new Te(0, 0, t, e), 
        this.scissorTest = !1, this.viewport = new Te(0, 0, t, e), void 0 === (i = i || {}).minFilter && (i.minFilter = Tt), 
        this.texture = new Ee(void 0, void 0, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.encoding), 
        this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer, this.stencilBuffer = void 0 === i.stencilBuffer || i.stencilBuffer, 
        this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null;
    }
    function Ae(t, e, i) {
        Se.call(this, t, e, i), this.activeCubeFace = 0, this.activeMipMapLevel = 0;
    }
    function Re(t, e, i, n, r, a, o, s, c, h, l, u) {
        Ee.call(this, null, a, o, s, c, h, n, r, l, u), this.image = {
            data: t,
            width: e,
            height: i
        }, this.magFilter = void 0 !== c ? c : wt, this.minFilter = void 0 !== h ? h : wt, 
        this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
    }
    function Le(t, e, i, n, r, a, o, s, c, h) {
        t = void 0 !== t ? t : [], e = void 0 !== e ? e : pt, Ee.call(this, t, e, i, n, r, a, o, s, c, h), 
        this.flipY = !1;
    }
    Ee.DEFAULT_IMAGE = void 0, Ee.DEFAULT_MAPPING = 300, Object.defineProperty(Ee.prototype, "needsUpdate", {
        set: function(t) {
            !0 === t && this.version++;
        }
    }), Object.assign(Ee.prototype, e.prototype, {
        constructor: Ee,
        isTexture: !0,
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.name = t.name, this.image = t.image, this.mipmaps = t.mipmaps.slice(0), 
            this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, 
            this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, 
            this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), 
            this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), 
            this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, 
            this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, 
            this;
        },
        toJSON: function(t) {
            var e = void 0 === t || "string" == typeof t;
            if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
            var i = {
                metadata: {
                    version: 4.5,
                    type: "Texture",
                    generator: "Texture.toJSON"
                },
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [ this.repeat.x, this.repeat.y ],
                offset: [ this.offset.x, this.offset.y ],
                center: [ this.center.x, this.center.y ],
                rotation: this.rotation,
                wrap: [ this.wrapS, this.wrapT ],
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY
            };
            if (void 0 !== this.image) {
                var n = this.image;
                void 0 === n.uuid && (n.uuid = ve.generateUUID()), e || void 0 !== t.images[n.uuid] || (t.images[n.uuid] = {
                    uuid: n.uuid,
                    url: function(t) {
                        var e;
                        if (t instanceof HTMLCanvasElement) e = t; else {
                            (e = document.createElement("canvas")).width = t.width, e.height = t.height;
                            var i = e.getContext("2d");
                            t instanceof ImageData ? i.putImageData(t, 0, 0) : i.drawImage(t, 0, 0, t.width, t.height);
                        }
                        return e.width > 2048 || e.height > 2048 ? e.toDataURL("image/jpeg", .6) : e.toDataURL("image/png");
                    }(n)
                }), i.image = n.uuid;
            }
            return e || (t.textures[this.uuid] = i), i;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        },
        transformUv: function(t) {
            if (300 === this.mapping) {
                if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
                  case xt:
                    t.x = t.x - Math.floor(t.x);
                    break;

                  case bt:
                    t.x = t.x < 0 ? 0 : 1;
                    break;

                  case _t:
                    1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
                }
                if (t.y < 0 || t.y > 1) switch (this.wrapT) {
                  case xt:
                    t.y = t.y - Math.floor(t.y);
                    break;

                  case bt:
                    t.y = t.y < 0 ? 0 : 1;
                    break;

                  case _t:
                    1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
                }
                this.flipY && (t.y = 1 - t.y);
            }
        }
    }), Object.assign(Te.prototype, {
        isVector4: !0,
        set: function(t, e, i, n) {
            return this.x = t, this.y = e, this.z = i, this.w = n, this;
        },
        setScalar: function(t) {
            return this.x = t, this.y = t, this.z = t, this.w = t, this;
        },
        setX: function(t) {
            return this.x = t, this;
        },
        setY: function(t) {
            return this.y = t, this;
        },
        setZ: function(t) {
            return this.z = t, this;
        },
        setW: function(t) {
            return this.w = t, this;
        },
        setComponent: function(t, e) {
            switch (t) {
              case 0:
                this.x = e;
                break;

              case 1:
                this.y = e;
                break;

              case 2:
                this.z = e;
                break;

              case 3:
                this.w = e;
                break;

              default:
                throw new Error("index is out of range: " + t);
            }
            return this;
        },
        getComponent: function(t) {
            switch (t) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              case 2:
                return this.z;

              case 3:
                return this.w;

              default:
                throw new Error("index is out of range: " + t);
            }
        },
        clone: function() {
            return new this.constructor(this.x, this.y, this.z, this.w);
        },
        copy: function(t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, 
            this;
        },
        add: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, 
            this);
        },
        addScalar: function(t) {
            return this.x += t, this.y += t, this.z += t, this.w += t, this;
        },
        addVectors: function(t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, 
            this;
        },
        addScaledVector: function(t, e) {
            return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, 
            this;
        },
        sub: function(t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, 
            this);
        },
        subScalar: function(t) {
            return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
        },
        subVectors: function(t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, 
            this;
        },
        multiplyScalar: function(t) {
            return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
        },
        applyMatrix4: function(t) {
            var e = this.x, i = this.y, n = this.z, r = this.w, a = t.elements;
            return this.x = a[0] * e + a[4] * i + a[8] * n + a[12] * r, this.y = a[1] * e + a[5] * i + a[9] * n + a[13] * r, 
            this.z = a[2] * e + a[6] * i + a[10] * n + a[14] * r, this.w = a[3] * e + a[7] * i + a[11] * n + a[15] * r, 
            this;
        },
        divideScalar: function(t) {
            return this.multiplyScalar(1 / t);
        },
        setAxisAngleFromQuaternion: function(t) {
            this.w = 2 * Math.acos(t.w);
            var e = Math.sqrt(1 - t.w * t.w);
            return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, 
            this.z = t.z / e), this;
        },
        setAxisAngleFromRotationMatrix: function(t) {
            var e, i, n, r, a = t.elements, o = a[0], s = a[4], c = a[8], h = a[1], l = a[5], u = a[9], p = a[2], d = a[6], f = a[10];
            if (Math.abs(s - h) < .01 && Math.abs(c - p) < .01 && Math.abs(u - d) < .01) {
                if (Math.abs(s + h) < .1 && Math.abs(c + p) < .1 && Math.abs(u + d) < .1 && Math.abs(o + l + f - 3) < .1) return this.set(1, 0, 0, 0), 
                this;
                e = Math.PI;
                var m = (o + 1) / 2, g = (l + 1) / 2, v = (f + 1) / 2, y = (s + h) / 4, x = (c + p) / 4, b = (u + d) / 4;
                return m > g && m > v ? m < .01 ? (i = 0, n = .707106781, r = .707106781) : (n = y / (i = Math.sqrt(m)), 
                r = x / i) : g > v ? g < .01 ? (i = .707106781, n = 0, r = .707106781) : (i = y / (n = Math.sqrt(g)), 
                r = b / n) : v < .01 ? (i = .707106781, n = .707106781, r = 0) : (i = x / (r = Math.sqrt(v)), 
                n = b / r), this.set(i, n, r, e), this;
            }
            var _ = Math.sqrt((d - u) * (d - u) + (c - p) * (c - p) + (h - s) * (h - s));
            return Math.abs(_) < .001 && (_ = 1), this.x = (d - u) / _, this.y = (c - p) / _, 
            this.z = (h - s) / _, this.w = Math.acos((o + l + f - 1) / 2), this;
        },
        min: function(t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), 
            this.w = Math.min(this.w, t.w), this;
        },
        max: function(t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), 
            this.w = Math.max(this.w, t.w), this;
        },
        clamp: function(t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), 
            this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), 
            this;
        },
        clampScalar: function() {
            var t, e;
            return function(i, n) {
                return void 0 === t && (t = new Te(), e = new Te()), t.set(i, i, i, i), e.set(n, n, n, n), 
                this.clamp(t, e);
            };
        }(),
        clampLength: function(t, e) {
            var i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(t, Math.min(e, i)));
        },
        floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), 
            this.w = Math.floor(this.w), this;
        },
        ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), 
            this.w = Math.ceil(this.w), this;
        },
        round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), 
            this.w = Math.round(this.w), this;
        },
        roundToZero: function() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), 
            this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), 
            this;
        },
        negate: function() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
        },
        dot: function(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        manhattanLength: function() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
        },
        normalize: function() {
            return this.divideScalar(this.length() || 1);
        },
        setLength: function(t) {
            return this.normalize().multiplyScalar(t);
        },
        lerp: function(t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, 
            this.w += (t.w - this.w) * e, this;
        },
        lerpVectors: function(t, e, i) {
            return this.subVectors(e, t).multiplyScalar(i).add(t);
        },
        equals: function(t) {
            return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
        },
        fromArray: function(t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], 
            this.w = t[e + 3], this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, 
            t[e + 2] = this.z, t[e + 3] = this.w, t;
        },
        fromBufferAttribute: function(t, e, i) {
            return void 0 !== i && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), 
            this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), 
            this;
        }
    }), Object.assign(Se.prototype, e.prototype, {
        isWebGLRenderTarget: !0,
        setSize: function(t, e) {
            this.width === t && this.height === e || (this.width = t, this.height = e, this.dispose()), 
            this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.width = t.width, this.height = t.height, this.viewport.copy(t.viewport), 
            this.texture = t.texture.clone(), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, 
            this.depthTexture = t.depthTexture, this;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }), Ae.prototype = Object.create(Se.prototype), Ae.prototype.constructor = Ae, Ae.prototype.isWebGLRenderTargetCube = !0, 
    Re.prototype = Object.create(Ee.prototype), Re.prototype.constructor = Re, Re.prototype.isDataTexture = !0, 
    Le.prototype = Object.create(Ee.prototype), Le.prototype.constructor = Le, Le.prototype.isCubeTexture = !0, 
    Object.defineProperty(Le.prototype, "images", {
        get: function() {
            return this.image;
        },
        set: function(t) {
            this.image = t;
        }
    });
    var Pe = new Ee(), Ce = new Le();
    function Ie() {
        this.seq = [], this.map = {};
    }
    var Ue = [], De = [], Oe = new Float32Array(16), Ne = new Float32Array(9);
    function Fe(t, e, i) {
        var n = t[0];
        if (n <= 0 || n > 0) return t;
        var r = e * i, a = Ue[r];
        if (void 0 === a && (a = new Float32Array(r), Ue[r] = a), 0 !== e) {
            n.toArray(a, 0);
            for (var o = 1, s = 0; o !== e; ++o) s += i, t[o].toArray(a, s);
        }
        return a;
    }
    function Be(t, e) {
        var i = De[e];
        void 0 === i && (i = new Int32Array(e), De[e] = i);
        for (var n = 0; n !== e; ++n) i[n] = t.allocTextureUnit();
        return i;
    }
    function ze(t, e) {
        t.uniform1f(this.addr, e);
    }
    function Ge(t, e) {
        t.uniform1i(this.addr, e);
    }
    function He(t, e) {
        void 0 === e.x ? t.uniform2fv(this.addr, e) : t.uniform2f(this.addr, e.x, e.y);
    }
    function Ve(t, e) {
        void 0 !== e.x ? t.uniform3f(this.addr, e.x, e.y, e.z) : void 0 !== e.r ? t.uniform3f(this.addr, e.r, e.g, e.b) : t.uniform3fv(this.addr, e);
    }
    function ke(t, e) {
        void 0 === e.x ? t.uniform4fv(this.addr, e) : t.uniform4f(this.addr, e.x, e.y, e.z, e.w);
    }
    function je(t, e) {
        t.uniformMatrix2fv(this.addr, !1, e.elements || e);
    }
    function We(t, e) {
        void 0 === e.elements ? t.uniformMatrix3fv(this.addr, !1, e) : (Ne.set(e.elements), 
        t.uniformMatrix3fv(this.addr, !1, Ne));
    }
    function Xe(t, e) {
        void 0 === e.elements ? t.uniformMatrix4fv(this.addr, !1, e) : (Oe.set(e.elements), 
        t.uniformMatrix4fv(this.addr, !1, Oe));
    }
    function qe(t, e, i) {
        var n = i.allocTextureUnit();
        t.uniform1i(this.addr, n), i.setTexture2D(e || Pe, n);
    }
    function Ye(t, e, i) {
        var n = i.allocTextureUnit();
        t.uniform1i(this.addr, n), i.setTextureCube(e || Ce, n);
    }
    function Ze(t, e) {
        t.uniform2iv(this.addr, e);
    }
    function Je(t, e) {
        t.uniform3iv(this.addr, e);
    }
    function Qe(t, e) {
        t.uniform4iv(this.addr, e);
    }
    function Ke(t, e) {
        t.uniform1fv(this.addr, e);
    }
    function $e(t, e) {
        t.uniform1iv(this.addr, e);
    }
    function ti(t, e) {
        t.uniform2fv(this.addr, Fe(e, this.size, 2));
    }
    function ei(t, e) {
        t.uniform3fv(this.addr, Fe(e, this.size, 3));
    }
    function ii(t, e) {
        t.uniform4fv(this.addr, Fe(e, this.size, 4));
    }
    function ni(t, e) {
        t.uniformMatrix2fv(this.addr, !1, Fe(e, this.size, 4));
    }
    function ri(t, e) {
        t.uniformMatrix3fv(this.addr, !1, Fe(e, this.size, 9));
    }
    function ai(t, e) {
        t.uniformMatrix4fv(this.addr, !1, Fe(e, this.size, 16));
    }
    function oi(t, e, i) {
        var n = e.length, r = Be(i, n);
        t.uniform1iv(this.addr, r);
        for (var a = 0; a !== n; ++a) i.setTexture2D(e[a] || Pe, r[a]);
    }
    function si(t, e, i) {
        var n = e.length, r = Be(i, n);
        t.uniform1iv(this.addr, r);
        for (var a = 0; a !== n; ++a) i.setTextureCube(e[a] || Ce, r[a]);
    }
    function ci(t, e, i) {
        this.id = t, this.addr = i, this.setValue = function(t) {
            switch (t) {
              case 5126:
                return ze;

              case 35664:
                return He;

              case 35665:
                return Ve;

              case 35666:
                return ke;

              case 35674:
                return je;

              case 35675:
                return We;

              case 35676:
                return Xe;

              case 35678:
              case 36198:
                return qe;

              case 35680:
                return Ye;

              case 5124:
              case 35670:
                return Ge;

              case 35667:
              case 35671:
                return Ze;

              case 35668:
              case 35672:
                return Je;

              case 35669:
              case 35673:
                return Qe;
            }
        }(e.type);
    }
    function hi(t, e, i) {
        this.id = t, this.addr = i, this.size = e.size, this.setValue = function(t) {
            switch (t) {
              case 5126:
                return Ke;

              case 35664:
                return ti;

              case 35665:
                return ei;

              case 35666:
                return ii;

              case 35674:
                return ni;

              case 35675:
                return ri;

              case 35676:
                return ai;

              case 35678:
                return oi;

              case 35680:
                return si;

              case 5124:
              case 35670:
                return $e;

              case 35667:
              case 35671:
                return Ze;

              case 35668:
              case 35672:
                return Je;

              case 35669:
              case 35673:
                return Qe;
            }
        }(e.type);
    }
    function li(t) {
        this.id = t, Ie.call(this);
    }
    li.prototype.setValue = function(t, e) {
        for (var i = this.seq, n = 0, r = i.length; n !== r; ++n) {
            var a = i[n];
            a.setValue(t, e[a.id]);
        }
    };
    var ui = /([\w\d_]+)(\])?(\[|\.)?/g;
    function pi(t, e) {
        t.seq.push(e), t.map[e.id] = e;
    }
    function di(t, e, i) {
        var n = t.name, r = n.length;
        for (ui.lastIndex = 0; ;) {
            var a = ui.exec(n), o = ui.lastIndex, s = a[1], c = "]" === a[2], h = a[3];
            if (c && (s |= 0), void 0 === h || "[" === h && o + 2 === r) {
                pi(i, void 0 === h ? new ci(s, t, e) : new hi(s, t, e));
                break;
            }
            var l = i.map[s];
            void 0 === l && pi(i, l = new li(s)), i = l;
        }
    }
    function fi(t, e, i) {
        Ie.call(this), this.renderer = i;
        for (var n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), r = 0; r < n; ++r) {
            var a = t.getActiveUniform(e, r), o = a.name;
            di(a, t.getUniformLocation(e, o), this);
        }
    }
    fi.prototype.setValue = function(t, e, i) {
        var n = this.map[e];
        void 0 !== n && n.setValue(t, i, this.renderer);
    }, fi.prototype.setOptional = function(t, e, i) {
        var n = e[i];
        void 0 !== n && this.setValue(t, i, n);
    }, fi.upload = function(t, e, i, n) {
        for (var r = 0, a = e.length; r !== a; ++r) {
            var o = e[r], s = i[o.id];
            !1 !== s.needsUpdate && o.setValue(t, s.value, n);
        }
    }, fi.seqWithValue = function(t, e) {
        for (var i = [], n = 0, r = t.length; n !== r; ++n) {
            var a = t[n];
            a.id in e && i.push(a);
        }
        return i;
    };
    var mi = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };
    function gi(t, e, i) {
        return void 0 === e && void 0 === i ? this.set(t) : this.setRGB(t, e, i);
    }
    Object.assign(gi.prototype, {
        isColor: !0,
        r: 1,
        g: 1,
        b: 1,
        set: function(t) {
            return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), 
            this;
        },
        setScalar: function(t) {
            return this.r = t, this.g = t, this.b = t, this;
        },
        setHex: function(t) {
            return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, 
            this.b = (255 & t) / 255, this;
        },
        setRGB: function(t, e, i) {
            return this.r = t, this.g = e, this.b = i, this;
        },
        setHSL: function() {
            function t(t, e, i) {
                return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - i) : t;
            }
            return function(e, i, n) {
                if (e = ve.euclideanModulo(e, 1), i = ve.clamp(i, 0, 1), n = ve.clamp(n, 0, 1), 
                0 === i) this.r = this.g = this.b = n; else {
                    var r = n <= .5 ? n * (1 + i) : n + i - n * i, a = 2 * n - r;
                    this.r = t(a, r, e + 1 / 3), this.g = t(a, r, e), this.b = t(a, r, e - 1 / 3);
                }
                return this;
            };
        }(),
        setStyle: function(t) {
            function e(e) {
                void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
            }
            var i;
            if (i = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
                var n, r = i[1], a = i[2];
                switch (r) {
                  case "rgb":
                  case "rgba":
                    if (n = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(n[1], 10)) / 255, 
                    this.g = Math.min(255, parseInt(n[2], 10)) / 255, this.b = Math.min(255, parseInt(n[3], 10)) / 255, 
                    e(n[5]), this;
                    if (n = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(n[1], 10)) / 100, 
                    this.g = Math.min(100, parseInt(n[2], 10)) / 100, this.b = Math.min(100, parseInt(n[3], 10)) / 100, 
                    e(n[5]), this;
                    break;

                  case "hsl":
                  case "hsla":
                    if (n = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) {
                        var o = parseFloat(n[1]) / 360, s = parseInt(n[2], 10) / 100, c = parseInt(n[3], 10) / 100;
                        return e(n[5]), this.setHSL(o, s, c);
                    }
                }
            } else if (i = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
                var h, l = (h = i[1]).length;
                if (3 === l) return this.r = parseInt(h.charAt(0) + h.charAt(0), 16) / 255, this.g = parseInt(h.charAt(1) + h.charAt(1), 16) / 255, 
                this.b = parseInt(h.charAt(2) + h.charAt(2), 16) / 255, this;
                if (6 === l) return this.r = parseInt(h.charAt(0) + h.charAt(1), 16) / 255, this.g = parseInt(h.charAt(2) + h.charAt(3), 16) / 255, 
                this.b = parseInt(h.charAt(4) + h.charAt(5), 16) / 255, this;
            }
            t && t.length > 0 && (void 0 !== (h = mi[t]) ? this.setHex(h) : console.warn("THREE.Color: Unknown color " + t));
            return this;
        },
        clone: function() {
            return new this.constructor(this.r, this.g, this.b);
        },
        copy: function(t) {
            return this.r = t.r, this.g = t.g, this.b = t.b, this;
        },
        copyGammaToLinear: function(t, e) {
            return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), 
            this.b = Math.pow(t.b, e), this;
        },
        copyLinearToGamma: function(t, e) {
            void 0 === e && (e = 2);
            var i = e > 0 ? 1 / e : 1;
            return this.r = Math.pow(t.r, i), this.g = Math.pow(t.g, i), this.b = Math.pow(t.b, i), 
            this;
        },
        convertGammaToLinear: function() {
            var t = this.r, e = this.g, i = this.b;
            return this.r = t * t, this.g = e * e, this.b = i * i, this;
        },
        convertLinearToGamma: function() {
            return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), 
            this;
        },
        getHex: function() {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0;
        },
        getHexString: function() {
            return ("000000" + this.getHex().toString(16)).slice(-6);
        },
        getHSL: function(t) {
            var e, i, n = t || {
                h: 0,
                s: 0,
                l: 0
            }, r = this.r, a = this.g, o = this.b, s = Math.max(r, a, o), c = Math.min(r, a, o), h = (c + s) / 2;
            if (c === s) e = 0, i = 0; else {
                var l = s - c;
                switch (i = h <= .5 ? l / (s + c) : l / (2 - s - c), s) {
                  case r:
                    e = (a - o) / l + (a < o ? 6 : 0);
                    break;

                  case a:
                    e = (o - r) / l + 2;
                    break;

                  case o:
                    e = (r - a) / l + 4;
                }
                e /= 6;
            }
            return n.h = e, n.s = i, n.l = h, n;
        },
        getStyle: function() {
            return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")";
        },
        offsetHSL: function(t, e, i) {
            var n = this.getHSL();
            return n.h += t, n.s += e, n.l += i, this.setHSL(n.h, n.s, n.l), this;
        },
        add: function(t) {
            return this.r += t.r, this.g += t.g, this.b += t.b, this;
        },
        addColors: function(t, e) {
            return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
        },
        addScalar: function(t) {
            return this.r += t, this.g += t, this.b += t, this;
        },
        sub: function(t) {
            return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), 
            this;
        },
        multiply: function(t) {
            return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
        },
        multiplyScalar: function(t) {
            return this.r *= t, this.g *= t, this.b *= t, this;
        },
        lerp: function(t, e) {
            return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, 
            this;
        },
        equals: function(t) {
            return t.r === this.r && t.g === this.g && t.b === this.b;
        },
        fromArray: function(t, e) {
            return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], 
            this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, 
            t[e + 2] = this.b, t;
        },
        toJSON: function() {
            return this.getHex();
        }
    });
    var vi = {
        common: {
            diffuse: {
                value: new gi(15658734)
            },
            opacity: {
                value: 1
            },
            map: {
                value: null
            },
            uvTransform: {
                value: new we()
            },
            alphaMap: {
                value: null
            }
        },
        specularmap: {
            specularMap: {
                value: null
            }
        },
        envmap: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            },
            reflectivity: {
                value: 1
            },
            refractionRatio: {
                value: .98
            }
        },
        aomap: {
            aoMap: {
                value: null
            },
            aoMapIntensity: {
                value: 1
            }
        },
        lightmap: {
            lightMap: {
                value: null
            },
            lightMapIntensity: {
                value: 1
            }
        },
        emissivemap: {
            emissiveMap: {
                value: null
            }
        },
        bumpmap: {
            bumpMap: {
                value: null
            },
            bumpScale: {
                value: 1
            }
        },
        normalmap: {
            normalMap: {
                value: null
            },
            normalScale: {
                value: new ye(1, 1)
            }
        },
        displacementmap: {
            displacementMap: {
                value: null
            },
            displacementScale: {
                value: 1
            },
            displacementBias: {
                value: 0
            }
        },
        roughnessmap: {
            roughnessMap: {
                value: null
            }
        },
        metalnessmap: {
            metalnessMap: {
                value: null
            }
        },
        gradientmap: {
            gradientMap: {
                value: null
            }
        },
        fog: {
            fogDensity: {
                value: 25e-5
            },
            fogNear: {
                value: 1
            },
            fogFar: {
                value: 2e3
            },
            fogColor: {
                value: new gi(16777215)
            }
        },
        lights: {
            ambientLightColor: {
                value: []
            },
            directionalLights: {
                value: [],
                properties: {
                    direction: {},
                    color: {},
                    shadow: {},
                    shadowBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            directionalShadowMap: {
                value: []
            },
            directionalShadowMatrix: {
                value: []
            },
            spotLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    direction: {},
                    distance: {},
                    coneCos: {},
                    penumbraCos: {},
                    decay: {},
                    shadow: {},
                    shadowBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            spotShadowMap: {
                value: []
            },
            spotShadowMatrix: {
                value: []
            },
            pointLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    decay: {},
                    distance: {},
                    shadow: {},
                    shadowBias: {},
                    shadowRadius: {},
                    shadowMapSize: {},
                    shadowCameraNear: {},
                    shadowCameraFar: {}
                }
            },
            pointShadowMap: {
                value: []
            },
            pointShadowMatrix: {
                value: []
            },
            hemisphereLights: {
                value: [],
                properties: {
                    direction: {},
                    skyColor: {},
                    groundColor: {}
                }
            },
            rectAreaLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    width: {},
                    height: {}
                }
            }
        },
        points: {
            diffuse: {
                value: new gi(15658734)
            },
            opacity: {
                value: 1
            },
            size: {
                value: 1
            },
            scale: {
                value: 1
            },
            map: {
                value: null
            },
            uvTransform: {
                value: new we()
            }
        }
    }, yi = {
        merge: function(t) {
            for (var e = {}, i = 0; i < t.length; i++) {
                var n = this.clone(t[i]);
                for (var r in n) e[r] = n[r];
            }
            return e;
        },
        clone: function(t) {
            var e = {};
            for (var i in t) for (var n in e[i] = {}, t[i]) {
                var r = t[i][n];
                r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? e[i][n] = r.clone() : Array.isArray(r) ? e[i][n] = r.slice() : e[i][n] = r;
            }
            return e;
        }
    }, xi = {
        alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
        alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
        alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
        aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
        aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
        begin_vertex: "\nvec3 transformed = vec3( position );\n",
        beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
        bsdfs: "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.86267 + (0.49788 + 0.01436 * y ) * y;\n\tfloat b = 3.45068 + (4.18814 + y) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = (x > 0.0) ? v : 0.5 * inversesqrt( 1.0 - x * x ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tvec3 result = vec3( LTC_ClippedSphereFormFactor( vectorFormFactor ) );\n\treturn result;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
        bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
        clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",
        clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
        clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
        clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
        color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
        color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
        color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
        color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
        common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",
        cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
        defaultnormal_vertex: "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",
        displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
        displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
        emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
        emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
        encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
        encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",
        envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
        envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
        envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
        envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
        fog_vertex: "\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",
        fog_pars_vertex: "#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",
        fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
        fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
        gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
        lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
        lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
        lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
        lights_pars: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
        lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
        lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
        lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
        lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tfloat norm = texture2D( ltcMag, uv ).a;\n\t\tvec4 t = texture2D( ltcMat, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3(   1,   0, t.y ),\n\t\t\tvec3(   0, t.z,   0 ),\n\t\t\tvec3( t.w,   0, t.x )\n\t\t);\n\t\treflectedLight.directSpecular += lightColor * material.specularColor * norm * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
        lights_template: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
        logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
        logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
        logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
        logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",
        map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
        map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
        map_particle_fragment: "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
        map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",
        metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",
        metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
        morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
        morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
        morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
        normal_fragment: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
        normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
        packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
        premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
        project_vertex: "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",
        dithering_fragment: "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",
        dithering_pars_fragment: "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
        roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",
        roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
        shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
        shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
        shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
        shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
        skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
        skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
        skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",
        skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
        specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
        specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
        tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
        tonemapping_pars_fragment: "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
        uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
        uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",
        uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
        uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
        uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
        uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
        worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",
        cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
        cube_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",
        depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
        depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
        distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",
        distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",
        equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
        equirect_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
        linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
        meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
        meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
        meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
        meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
        normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
        points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",
        shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n"
    }, bi = {
        basic: {
            uniforms: yi.merge([ vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.fog ]),
            vertexShader: xi.meshbasic_vert,
            fragmentShader: xi.meshbasic_frag
        },
        lambert: {
            uniforms: yi.merge([ vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.fog, vi.lights, {
                emissive: {
                    value: new gi(0)
                }
            } ]),
            vertexShader: xi.meshlambert_vert,
            fragmentShader: xi.meshlambert_frag
        },
        phong: {
            uniforms: yi.merge([ vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.gradientmap, vi.fog, vi.lights, {
                emissive: {
                    value: new gi(0)
                },
                specular: {
                    value: new gi(1118481)
                },
                shininess: {
                    value: 30
                }
            } ]),
            vertexShader: xi.meshphong_vert,
            fragmentShader: xi.meshphong_frag
        },
        standard: {
            uniforms: yi.merge([ vi.common, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.roughnessmap, vi.metalnessmap, vi.fog, vi.lights, {
                emissive: {
                    value: new gi(0)
                },
                roughness: {
                    value: .5
                },
                metalness: {
                    value: .5
                },
                envMapIntensity: {
                    value: 1
                }
            } ]),
            vertexShader: xi.meshphysical_vert,
            fragmentShader: xi.meshphysical_frag
        },
        points: {
            uniforms: yi.merge([ vi.points, vi.fog ]),
            vertexShader: xi.points_vert,
            fragmentShader: xi.points_frag
        },
        dashed: {
            uniforms: yi.merge([ vi.common, vi.fog, {
                scale: {
                    value: 1
                },
                dashSize: {
                    value: 1
                },
                totalSize: {
                    value: 2
                }
            } ]),
            vertexShader: xi.linedashed_vert,
            fragmentShader: xi.linedashed_frag
        },
        depth: {
            uniforms: yi.merge([ vi.common, vi.displacementmap ]),
            vertexShader: xi.depth_vert,
            fragmentShader: xi.depth_frag
        },
        normal: {
            uniforms: yi.merge([ vi.common, vi.bumpmap, vi.normalmap, vi.displacementmap, {
                opacity: {
                    value: 1
                }
            } ]),
            vertexShader: xi.normal_vert,
            fragmentShader: xi.normal_frag
        },
        cube: {
            uniforms: {
                tCube: {
                    value: null
                },
                tFlip: {
                    value: -1
                },
                opacity: {
                    value: 1
                }
            },
            vertexShader: xi.cube_vert,
            fragmentShader: xi.cube_frag
        },
        equirect: {
            uniforms: {
                tEquirect: {
                    value: null
                }
            },
            vertexShader: xi.equirect_vert,
            fragmentShader: xi.equirect_frag
        },
        distanceRGBA: {
            uniforms: yi.merge([ vi.common, vi.displacementmap, {
                referencePosition: {
                    value: new _e()
                },
                nearDistance: {
                    value: 1
                },
                farDistance: {
                    value: 1e3
                }
            } ]),
            vertexShader: xi.distanceRGBA_vert,
            fragmentShader: xi.distanceRGBA_frag
        },
        shadow: {
            uniforms: yi.merge([ vi.lights, vi.fog, {
                color: {
                    value: new gi(0)
                },
                opacity: {
                    value: 1
                }
            } ]),
            vertexShader: xi.shadow_vert,
            fragmentShader: xi.shadow_frag
        }
    };
    function _i(t, e) {
        this.min = void 0 !== t ? t : new ye(1 / 0, 1 / 0), this.max = void 0 !== e ? e : new ye(-1 / 0, -1 / 0);
    }
    function wi(t, e, i, n, r) {
        var a, o, s, c, h, l, u, p;
        function d() {
            var t = new Float32Array([ -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1 ]), n = new Uint16Array([ 0, 1, 2, 0, 2, 3 ]);
            a = e.createBuffer(), o = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, a), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW), 
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o), e.bufferData(e.ELEMENT_ARRAY_BUFFER, n, e.STATIC_DRAW), 
            u = e.createTexture(), p = e.createTexture(), i.bindTexture(e.TEXTURE_2D, u), e.texImage2D(e.TEXTURE_2D, 0, e.RGB, 16, 16, 0, e.RGB, e.UNSIGNED_BYTE, null), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), 
            i.bindTexture(e.TEXTURE_2D, p), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 16, 16, 0, e.RGBA, e.UNSIGNED_BYTE, null), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), 
            s = {
                vertexShader: [ "uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "\tvUV = uv;", "\tvec2 pos = position;", "\tif ( renderType == 2 ) {", "\t\tvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "\t\tvVisibility =        visibility.r / 9.0;", "\t\tvVisibility *= 1.0 - visibility.g / 9.0;", "\t\tvVisibility *=       visibility.b / 9.0;", "\t\tvVisibility *= 1.0 - visibility.a / 9.0;", "\t\tpos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "\t\tpos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "\t}", "\tgl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}" ].join("\n"),
                fragmentShader: [ "uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "\tif ( renderType == 0 ) {", "\t\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "\t} else if ( renderType == 1 ) {", "\t\tgl_FragColor = texture2D( map, vUV );", "\t} else {", "\t\tvec4 texture = texture2D( map, vUV );", "\t\ttexture.a *= opacity * vVisibility;", "\t\tgl_FragColor = texture;", "\t\tgl_FragColor.rgb *= color;", "\t}", "}" ].join("\n")
            }, c = function(t) {
                var i = e.createProgram(), n = e.createShader(e.FRAGMENT_SHADER), a = e.createShader(e.VERTEX_SHADER), o = "precision " + r.precision + " float;\n";
                return e.shaderSource(n, o + t.fragmentShader), e.shaderSource(a, o + t.vertexShader), 
                e.compileShader(n), e.compileShader(a), e.attachShader(i, n), e.attachShader(i, a), 
                e.linkProgram(i), i;
            }(s), h = {
                vertex: e.getAttribLocation(c, "position"),
                uv: e.getAttribLocation(c, "uv")
            }, l = {
                renderType: e.getUniformLocation(c, "renderType"),
                map: e.getUniformLocation(c, "map"),
                occlusionMap: e.getUniformLocation(c, "occlusionMap"),
                opacity: e.getUniformLocation(c, "opacity"),
                color: e.getUniformLocation(c, "color"),
                scale: e.getUniformLocation(c, "scale"),
                rotation: e.getUniformLocation(c, "rotation"),
                screenPosition: e.getUniformLocation(c, "screenPosition")
            };
        }
        this.render = function(t, r, s, f) {
            if (0 !== t.length) {
                var m = new _e(), g = f.w / f.z, v = .5 * f.z, y = .5 * f.w, x = 16 / f.w, b = new ye(x * g, x), _ = new _e(1, 1, 0), w = new ye(1, 1), M = new _i();
                M.min.set(f.x, f.y), M.max.set(f.x + (f.z - 16), f.y + (f.w - 16)), void 0 === c && d(), 
                i.useProgram(c), i.initAttributes(), i.enableAttribute(h.vertex), i.enableAttribute(h.uv), 
                i.disableUnusedAttributes(), e.uniform1i(l.occlusionMap, 0), e.uniform1i(l.map, 1), 
                e.bindBuffer(e.ARRAY_BUFFER, a), e.vertexAttribPointer(h.vertex, 2, e.FLOAT, !1, 16, 0), 
                e.vertexAttribPointer(h.uv, 2, e.FLOAT, !1, 16, 8), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o), 
                i.disable(e.CULL_FACE), i.buffers.depth.setMask(!1);
                for (var E = 0, T = t.length; E < T; E++) {
                    x = 16 / f.w, b.set(x * g, x);
                    var S = t[E];
                    if (m.set(S.matrixWorld.elements[12], S.matrixWorld.elements[13], S.matrixWorld.elements[14]), 
                    m.applyMatrix4(s.matrixWorldInverse), m.applyMatrix4(s.projectionMatrix), _.copy(m), 
                    w.x = f.x + _.x * v + v - 8, w.y = f.y + _.y * y + y - 8, !0 === M.containsPoint(w)) {
                        i.activeTexture(e.TEXTURE0), i.bindTexture(e.TEXTURE_2D, null), i.activeTexture(e.TEXTURE1), 
                        i.bindTexture(e.TEXTURE_2D, u), e.copyTexImage2D(e.TEXTURE_2D, 0, e.RGB, w.x, w.y, 16, 16, 0), 
                        e.uniform1i(l.renderType, 0), e.uniform2f(l.scale, b.x, b.y), e.uniform3f(l.screenPosition, _.x, _.y, _.z), 
                        i.disable(e.BLEND), i.enable(e.DEPTH_TEST), e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0), 
                        i.activeTexture(e.TEXTURE0), i.bindTexture(e.TEXTURE_2D, p), e.copyTexImage2D(e.TEXTURE_2D, 0, e.RGBA, w.x, w.y, 16, 16, 0), 
                        e.uniform1i(l.renderType, 1), i.disable(e.DEPTH_TEST), i.activeTexture(e.TEXTURE1), 
                        i.bindTexture(e.TEXTURE_2D, u), e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0), 
                        S.positionScreen.copy(_), S.customUpdateCallback ? S.customUpdateCallback(S) : S.updateLensFlares(), 
                        e.uniform1i(l.renderType, 2), i.enable(e.BLEND);
                        for (var A = 0, R = S.lensFlares.length; A < R; A++) {
                            var L = S.lensFlares[A];
                            L.opacity > .001 && L.scale > .001 && (_.x = L.x, _.y = L.y, _.z = L.z, x = L.size * L.scale / f.w, 
                            b.x = x * g, b.y = x, e.uniform3f(l.screenPosition, _.x, _.y, _.z), e.uniform2f(l.scale, b.x, b.y), 
                            e.uniform1f(l.rotation, L.rotation), e.uniform1f(l.opacity, L.opacity), e.uniform3f(l.color, L.color.r, L.color.g, L.color.b), 
                            i.setBlending(L.blending, L.blendEquation, L.blendSrc, L.blendDst), n.setTexture2D(L.texture, 1), 
                            e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0));
                        }
                    }
                }
                i.enable(e.CULL_FACE), i.enable(e.DEPTH_TEST), i.buffers.depth.setMask(!0), i.reset();
            }
        };
    }
    function Mi(t, e, i, n, r, a, o, s, c) {
        Ee.call(this, t, e, i, n, r, a, o, s, c), this.needsUpdate = !0;
    }
    function Ei(t, e, i, n, r) {
        var a, o, s, c, h, l, u = new _e(), p = new be(), d = new _e();
        function f() {
            var t = new Float32Array([ -.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1 ]), i = new Uint16Array([ 0, 1, 2, 0, 2, 3 ]);
            a = e.createBuffer(), o = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, a), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW), 
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o), e.bufferData(e.ELEMENT_ARRAY_BUFFER, i, e.STATIC_DRAW), 
            s = function() {
                var t = e.createProgram(), i = e.createShader(e.VERTEX_SHADER), n = e.createShader(e.FRAGMENT_SHADER);
                return e.shaderSource(i, [ "precision " + r.precision + " float;", "#define SHADER_NAME SpriteMaterial", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float fogDepth;", "void main() {", "\tvUV = uvOffset + uv * uvScale;", "\tvec2 alignedPosition = position * scale;", "\tvec2 rotatedPosition;", "\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "\tvec4 mvPosition;", "\tmvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "\tmvPosition.xy += rotatedPosition;", "\tgl_Position = projectionMatrix * mvPosition;", "\tfogDepth = - mvPosition.z;", "}" ].join("\n")), 
                e.shaderSource(n, [ "precision " + r.precision + " float;", "#define SHADER_NAME SpriteMaterial", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "varying float fogDepth;", "void main() {", "\tvec4 texture = texture2D( map, vUV );", "\tgl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "\tif ( gl_FragColor.a < alphaTest ) discard;", "\tif ( fogType > 0 ) {", "\t\tfloat fogFactor = 0.0;", "\t\tif ( fogType == 1 ) {", "\t\t\tfogFactor = smoothstep( fogNear, fogFar, fogDepth );", "\t\t} else {", "\t\t\tconst float LOG2 = 1.442695;", "\t\t\tfogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );", "\t\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "\t\t}", "\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );", "\t}", "}" ].join("\n")), 
                e.compileShader(i), e.compileShader(n), e.attachShader(t, i), e.attachShader(t, n), 
                e.linkProgram(t), t;
            }(), c = {
                position: e.getAttribLocation(s, "position"),
                uv: e.getAttribLocation(s, "uv")
            }, h = {
                uvOffset: e.getUniformLocation(s, "uvOffset"),
                uvScale: e.getUniformLocation(s, "uvScale"),
                rotation: e.getUniformLocation(s, "rotation"),
                scale: e.getUniformLocation(s, "scale"),
                color: e.getUniformLocation(s, "color"),
                map: e.getUniformLocation(s, "map"),
                opacity: e.getUniformLocation(s, "opacity"),
                modelViewMatrix: e.getUniformLocation(s, "modelViewMatrix"),
                projectionMatrix: e.getUniformLocation(s, "projectionMatrix"),
                fogType: e.getUniformLocation(s, "fogType"),
                fogDensity: e.getUniformLocation(s, "fogDensity"),
                fogNear: e.getUniformLocation(s, "fogNear"),
                fogFar: e.getUniformLocation(s, "fogFar"),
                fogColor: e.getUniformLocation(s, "fogColor"),
                fogDepth: e.getUniformLocation(s, "fogDepth"),
                alphaTest: e.getUniformLocation(s, "alphaTest")
            };
            var n = document.createElement("canvas");
            n.width = 8, n.height = 8;
            var u = n.getContext("2d");
            u.fillStyle = "white", u.fillRect(0, 0, 8, 8), l = new Mi(n);
        }
        function m(t, e) {
            return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : e.id - t.id;
        }
        this.render = function(r, g, v) {
            if (0 !== r.length) {
                void 0 === s && f(), i.useProgram(s), i.initAttributes(), i.enableAttribute(c.position), 
                i.enableAttribute(c.uv), i.disableUnusedAttributes(), i.disable(e.CULL_FACE), i.enable(e.BLEND), 
                e.bindBuffer(e.ARRAY_BUFFER, a), e.vertexAttribPointer(c.position, 2, e.FLOAT, !1, 16, 0), 
                e.vertexAttribPointer(c.uv, 2, e.FLOAT, !1, 16, 8), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o), 
                e.uniformMatrix4fv(h.projectionMatrix, !1, v.projectionMatrix.elements), i.activeTexture(e.TEXTURE0), 
                e.uniform1i(h.map, 0);
                var y = 0, x = 0, b = g.fog;
                b ? (e.uniform3f(h.fogColor, b.color.r, b.color.g, b.color.b), b.isFog ? (e.uniform1f(h.fogNear, b.near), 
                e.uniform1f(h.fogFar, b.far), e.uniform1i(h.fogType, 1), y = 1, x = 1) : b.isFogExp2 && (e.uniform1f(h.fogDensity, b.density), 
                e.uniform1i(h.fogType, 2), y = 2, x = 2)) : (e.uniform1i(h.fogType, 0), y = 0, x = 0);
                for (var _ = 0, w = r.length; _ < w; _++) {
                    (E = r[_]).modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, E.matrixWorld), 
                    E.z = -E.modelViewMatrix.elements[14];
                }
                r.sort(m);
                var M = [];
                for (_ = 0, w = r.length; _ < w; _++) {
                    var E, T = (E = r[_]).material;
                    if (!1 !== T.visible) {
                        E.onBeforeRender(t, g, v, void 0, T, void 0), e.uniform1f(h.alphaTest, T.alphaTest), 
                        e.uniformMatrix4fv(h.modelViewMatrix, !1, E.modelViewMatrix.elements), E.matrixWorld.decompose(u, p, d), 
                        M[0] = d.x, M[1] = d.y;
                        var S = 0;
                        g.fog && T.fog && (S = x), y !== S && (e.uniform1i(h.fogType, S), y = S), null !== T.map ? (e.uniform2f(h.uvOffset, T.map.offset.x, T.map.offset.y), 
                        e.uniform2f(h.uvScale, T.map.repeat.x, T.map.repeat.y)) : (e.uniform2f(h.uvOffset, 0, 0), 
                        e.uniform2f(h.uvScale, 1, 1)), e.uniform1f(h.opacity, T.opacity), e.uniform3f(h.color, T.color.r, T.color.g, T.color.b), 
                        e.uniform1f(h.rotation, T.rotation), e.uniform2fv(h.scale, M), i.setBlending(T.blending, T.blendEquation, T.blendSrc, T.blendDst, T.blendEquationAlpha, T.blendSrcAlpha, T.blendDstAlpha, T.premultipliedAlpha), 
                        i.buffers.depth.setTest(T.depthTest), i.buffers.depth.setMask(T.depthWrite), i.buffers.color.setMask(T.colorWrite), 
                        n.setTexture2D(T.map || l, 0), e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0), 
                        E.onAfterRender(t, g, v, void 0, T, void 0);
                    }
                }
                i.enable(e.CULL_FACE), i.reset();
            }
        };
    }
    bi.physical = {
        uniforms: yi.merge([ bi.standard.uniforms, {
            clearCoat: {
                value: 0
            },
            clearCoatRoughness: {
                value: 0
            }
        } ]),
        vertexShader: xi.meshphysical_vert,
        fragmentShader: xi.meshphysical_frag
    }, Object.assign(_i.prototype, {
        set: function(t, e) {
            return this.min.copy(t), this.max.copy(e), this;
        },
        setFromPoints: function(t) {
            this.makeEmpty();
            for (var e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
            return this;
        },
        setFromCenterAndSize: function() {
            var t = new ye();
            return function(e, i) {
                var n = t.copy(i).multiplyScalar(.5);
                return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
            };
        }(),
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.min.copy(t.min), this.max.copy(t.max), this;
        },
        makeEmpty: function() {
            return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this;
        },
        isEmpty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y;
        },
        getCenter: function(t) {
            var e = t || new ye();
            return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
        },
        getSize: function(t) {
            var e = t || new ye();
            return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min);
        },
        expandByPoint: function(t) {
            return this.min.min(t), this.max.max(t), this;
        },
        expandByVector: function(t) {
            return this.min.sub(t), this.max.add(t), this;
        },
        expandByScalar: function(t) {
            return this.min.addScalar(-t), this.max.addScalar(t), this;
        },
        containsPoint: function(t) {
            return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y);
        },
        containsBox: function(t) {
            return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y;
        },
        getParameter: function(t, e) {
            return (e || new ye()).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y));
        },
        intersectsBox: function(t) {
            return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y);
        },
        clampPoint: function(t, e) {
            return (e || new ye()).copy(t).clamp(this.min, this.max);
        },
        distanceToPoint: function() {
            var t = new ye();
            return function(e) {
                return t.copy(e).clamp(this.min, this.max).sub(e).length();
            };
        }(),
        intersect: function(t) {
            return this.min.max(t.min), this.max.min(t.max), this;
        },
        union: function(t) {
            return this.min.min(t.min), this.max.max(t.max), this;
        },
        translate: function(t) {
            return this.min.add(t), this.max.add(t), this;
        },
        equals: function(t) {
            return t.min.equals(this.min) && t.max.equals(this.max);
        }
    }), Mi.prototype = Object.create(Ee.prototype), Mi.prototype.constructor = Mi;
    var Ti, Si, Ai, Ri, Li, Pi, Ci, Ii = 0;
    function Ui() {
        Object.defineProperty(this, "id", {
            value: Ii++
        }), this.uuid = ve.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, 
        this.lights = !0, this.blending = L, this.side = w, this.flatShading = !1, this.vertexColors = T, 
        this.opacity = 1, this.transparent = !1, this.blendSrc = k, this.blendDst = j, this.blendEquation = D, 
        this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, 
        this.depthFunc = $, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, 
        this.clipIntersection = !1, this.clipShadows = !1, this.colorWrite = !0, this.precision = null, 
        this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, 
        this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.overdraw = 0, 
        this.visible = !0, this.userData = {}, this.needsUpdate = !0;
    }
    function Di(t) {
        Ui.call(this), this.type = "MeshDepthMaterial", this.depthPacking = me, this.skinning = !1, 
        this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, 
        this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.fog = !1, this.lights = !1, this.setValues(t);
    }
    function Oi(t) {
        Ui.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new _e(), 
        this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, 
        this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, 
        this.displacementBias = 0, this.fog = !1, this.lights = !1, this.setValues(t);
    }
    function Ni(t, e) {
        this.min = void 0 !== t ? t : new _e(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== e ? e : new _e(-1 / 0, -1 / 0, -1 / 0);
    }
    function Fi(t, e) {
        this.center = void 0 !== t ? t : new _e(), this.radius = void 0 !== e ? e : 0;
    }
    function Bi(t, e) {
        this.normal = void 0 !== t ? t : new _e(1, 0, 0), this.constant = void 0 !== e ? e : 0;
    }
    function zi(t, e, i, n, r, a) {
        this.planes = [ void 0 !== t ? t : new Bi(), void 0 !== e ? e : new Bi(), void 0 !== i ? i : new Bi(), void 0 !== n ? n : new Bi(), void 0 !== r ? r : new Bi(), void 0 !== a ? a : new Bi() ];
    }
    function Gi(t, e, i) {
        for (var n = new zi(), r = new xe(), a = new ye(), o = new ye(i, i), s = new _e(), c = new _e(), h = 1, l = 2, u = 1 + (h | l), p = new Array(u), d = new Array(u), f = {}, m = [ new _e(1, 0, 0), new _e(-1, 0, 0), new _e(0, 0, 1), new _e(0, 0, -1), new _e(0, 1, 0), new _e(0, -1, 0) ], g = [ new _e(0, 1, 0), new _e(0, 1, 0), new _e(0, 1, 0), new _e(0, 1, 0), new _e(0, 0, 1), new _e(0, 0, -1) ], v = [ new Te(), new Te(), new Te(), new Te(), new Te(), new Te() ], y = 0; y !== u; ++y) {
            var x = 0 != (y & h), _ = 0 != (y & l), T = new Di({
                depthPacking: ge,
                morphTargets: x,
                skinning: _
            });
            p[y] = T;
            var S = new Oi({
                morphTargets: x,
                skinning: _
            });
            d[y] = S;
        }
        var A = this;
        function R(e, i, n, r, a, o) {
            var s = e.geometry, c = null, u = p, m = e.customDepthMaterial;
            if (n && (u = d, m = e.customDistanceMaterial), m) c = m; else {
                var g = !1;
                i.morphTargets && (s && s.isBufferGeometry ? g = s.morphAttributes && s.morphAttributes.position && s.morphAttributes.position.length > 0 : s && s.isGeometry && (g = s.morphTargets && s.morphTargets.length > 0)), 
                e.isSkinnedMesh && !1 === i.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", e);
                var v = e.isSkinnedMesh && i.skinning, y = 0;
                g && (y |= h), v && (y |= l), c = u[y];
            }
            if (t.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length) {
                var x = c.uuid, b = i.uuid, _ = f[x];
                void 0 === _ && (_ = {}, f[x] = _);
                var T = _[b];
                void 0 === T && (T = c.clone(), _[b] = T), c = T;
            }
            c.visible = i.visible, c.wireframe = i.wireframe;
            var S = i.side;
            return A.renderSingleSided && S == E && (S = w), A.renderReverseSided && (S === w ? S = M : S === M && (S = w)), 
            c.side = S, c.clipShadows = i.clipShadows, c.clippingPlanes = i.clippingPlanes, 
            c.clipIntersection = i.clipIntersection, c.wireframeLinewidth = i.wireframeLinewidth, 
            c.linewidth = i.linewidth, n && c.isMeshDistanceMaterial && (c.referencePosition.copy(r), 
            c.nearDistance = a, c.farDistance = o), c;
        }
        function L(i, r, a, o) {
            if (!1 !== i.visible) {
                if (i.layers.test(r.layers) && (i.isMesh || i.isLine || i.isPoints) && i.castShadow && (!i.frustumCulled || n.intersectsObject(i))) {
                    i.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, i.matrixWorld);
                    var s = e.update(i), h = i.material;
                    if (Array.isArray(h)) for (var l = s.groups, u = 0, p = l.length; u < p; u++) {
                        var d = l[u], f = h[d.materialIndex];
                        if (f && f.visible) {
                            var m = R(i, f, o, c, a.near, a.far);
                            t.renderBufferDirect(a, null, s, m, i, d);
                        }
                    } else if (h.visible) {
                        m = R(i, h, o, c, a.near, a.far);
                        t.renderBufferDirect(a, null, s, m, i, null);
                    }
                }
                for (var g = i.children, v = 0, y = g.length; v < y; v++) L(g[v], r, a, o);
            }
        }
        this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = b, this.renderReverseSided = !0, 
        this.renderSingleSided = !0, this.render = function(e, i, h) {
            if (!1 !== A.enabled && (!1 !== A.autoUpdate || !1 !== A.needsUpdate) && 0 !== e.length) {
                var l, u = t.context, p = t.state;
                p.disable(u.BLEND), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), 
                p.setScissorTest(!1);
                for (var d = 0, f = e.length; d < f; d++) {
                    var y = e[d], x = y.shadow, b = y && y.isPointLight;
                    if (void 0 !== x) {
                        var _ = x.camera;
                        if (a.copy(x.mapSize), a.min(o), b) {
                            var w = a.x, M = a.y;
                            v[0].set(2 * w, M, w, M), v[1].set(0, M, w, M), v[2].set(3 * w, M, w, M), v[3].set(w, M, w, M), 
                            v[4].set(3 * w, 0, w, M), v[5].set(w, 0, w, M), a.x *= 4, a.y *= 2;
                        }
                        if (null === x.map) {
                            var E = {
                                minFilter: wt,
                                magFilter: wt,
                                format: Vt
                            };
                            x.map = new Se(a.x, a.y, E), x.map.texture.name = y.name + ".shadowMap", _.updateProjectionMatrix();
                        }
                        x.isSpotLightShadow && x.update(y);
                        var T = x.map, S = x.matrix;
                        c.setFromMatrixPosition(y.matrixWorld), _.position.copy(c), b ? (l = 6, S.makeTranslation(-c.x, -c.y, -c.z)) : (l = 1, 
                        s.setFromMatrixPosition(y.target.matrixWorld), _.lookAt(s), _.updateMatrixWorld(), 
                        S.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), S.multiply(_.projectionMatrix), 
                        S.multiply(_.matrixWorldInverse)), t.setRenderTarget(T), t.clear();
                        for (var R = 0; R < l; R++) {
                            if (b) {
                                s.copy(_.position), s.add(m[R]), _.up.copy(g[R]), _.lookAt(s), _.updateMatrixWorld();
                                var P = v[R];
                                p.viewport(P);
                            }
                            r.multiplyMatrices(_.projectionMatrix, _.matrixWorldInverse), n.setFromMatrix(r), 
                            L(i, h, _, b);
                        }
                    } else console.warn("THREE.WebGLShadowMap:", y, "has no shadow.");
                }
                A.needsUpdate = !1;
            }
        };
    }
    function Hi(t) {
        var e = {};
        return {
            get: function(t) {
                return t.isInterleavedBufferAttribute && (t = t.data), e[t.uuid];
            },
            remove: function(i) {
                i.isInterleavedBufferAttribute && (i = i.data);
                var n = e[i.uuid];
                n && (t.deleteBuffer(n.buffer), delete e[i.uuid]);
            },
            update: function(i, n) {
                i.isInterleavedBufferAttribute && (i = i.data);
                var r = e[i.uuid];
                void 0 === r ? e[i.uuid] = function(e, i) {
                    var n = e.array, r = e.dynamic ? t.DYNAMIC_DRAW : t.STATIC_DRAW, a = t.createBuffer();
                    t.bindBuffer(i, a), t.bufferData(i, n, r), e.onUploadCallback();
                    var o = t.FLOAT;
                    return n instanceof Float32Array ? o = t.FLOAT : n instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : n instanceof Uint16Array ? o = t.UNSIGNED_SHORT : n instanceof Int16Array ? o = t.SHORT : n instanceof Uint32Array ? o = t.UNSIGNED_INT : n instanceof Int32Array ? o = t.INT : n instanceof Int8Array ? o = t.BYTE : n instanceof Uint8Array && (o = t.UNSIGNED_BYTE), 
                    {
                        buffer: a,
                        type: o,
                        bytesPerElement: n.BYTES_PER_ELEMENT,
                        version: e.version
                    };
                }(i, n) : r.version < i.version && (function(e, i, n) {
                    var r = i.array, a = i.updateRange;
                    t.bindBuffer(n, e), !1 === i.dynamic ? t.bufferData(n, r, t.STATIC_DRAW) : -1 === a.count ? t.bufferSubData(n, 0, r) : 0 === a.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(n, a.offset * r.BYTES_PER_ELEMENT, r.subarray(a.offset, a.offset + a.count)), 
                    a.count = -1);
                }(r.buffer, i, n), r.version = i.version);
            }
        };
    }
    function Vi(t, e, i, n) {
        this._x = t || 0, this._y = e || 0, this._z = i || 0, this._order = n || Vi.DefaultOrder;
    }
    function ki() {
        this.mask = 1;
    }
    Object.assign(Ui.prototype, e.prototype, {
        isMaterial: !0,
        onBeforeCompile: function() {},
        setValues: function(t) {
            if (void 0 !== t) for (var e in t) {
                var i = t[e];
                if (void 0 !== i) if ("shading" !== e) {
                    var n = this[e];
                    void 0 !== n ? n && n.isColor ? n.set(i) : n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[e] = "overdraw" === e ? Number(i) : i : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.");
                } else console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), 
                this.flatShading = 1 === i; else console.warn("THREE.Material: '" + e + "' parameter is undefined.");
            }
        },
        toJSON: function(t) {
            var e = void 0 === t || "string" == typeof t;
            e && (t = {
                textures: {},
                images: {}
            });
            var i = {
                metadata: {
                    version: 4.5,
                    type: "Material",
                    generator: "Material.toJSON"
                }
            };
            function n(t) {
                var e = [];
                for (var i in t) {
                    var n = t[i];
                    delete n.metadata, e.push(n);
                }
                return e;
            }
            if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), 
            this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), 
            void 0 !== this.metalness && (i.metalness = this.metalness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), 
            1 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity), 
            this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), 
            void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearCoat && (i.clearCoat = this.clearCoat), 
            void 0 !== this.clearCoatRoughness && (i.clearCoatRoughness = this.clearCoatRoughness), 
            this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(t).uuid), 
            this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(t).uuid), 
            this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(t).uuid, 
            i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(t).uuid, 
            i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(t).uuid, 
            i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), 
            this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(t).uuid), 
            this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(t).uuid), 
            this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(t).uuid), 
            this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(t).uuid), 
            this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(t).uuid, 
            i.reflectivity = this.reflectivity), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(t).uuid), 
            void 0 !== this.size && (i.size = this.size), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), 
            this.blending !== L && (i.blending = this.blending), !0 === this.flatShading && (i.flatShading = this.flatShading), 
            this.side !== w && (i.side = this.side), this.vertexColors !== T && (i.vertexColors = this.vertexColors), 
            this.opacity < 1 && (i.opacity = this.opacity), !0 === this.transparent && (i.transparent = this.transparent), 
            i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, 
            0 !== this.rotation && (i.rotation = this.rotation), 1 !== this.linewidth && (i.linewidth = this.linewidth), 
            void 0 !== this.dashSize && (i.dashSize = this.dashSize), void 0 !== this.gapSize && (i.gapSize = this.gapSize), 
            void 0 !== this.scale && (i.scale = this.scale), !0 === this.dithering && (i.dithering = !0), 
            this.alphaTest > 0 && (i.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha), 
            !0 === this.wireframe && (i.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), 
            "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), 
            "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), 
            !0 === this.morphTargets && (i.morphTargets = !0), !0 === this.skinning && (i.skinning = !0), 
            !1 === this.visible && (i.visible = !1), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), 
            e) {
                var r = n(t.textures), a = n(t.images);
                r.length > 0 && (i.textures = r), a.length > 0 && (i.images = a);
            }
            return i;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            this.name = t.name, this.fog = t.fog, this.lights = t.lights, this.blending = t.blending, 
            this.side = t.side, this.flatShading = t.flatShading, this.vertexColors = t.vertexColors, 
            this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, 
            this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, 
            this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, 
            this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, 
            this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, 
            this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, 
            this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.premultipliedAlpha = t.premultipliedAlpha, 
            this.overdraw = t.overdraw, this.visible = t.visible, this.userData = JSON.parse(JSON.stringify(t.userData)), 
            this.clipShadows = t.clipShadows, this.clipIntersection = t.clipIntersection;
            var e = t.clippingPlanes, i = null;
            if (null !== e) {
                var n = e.length;
                i = new Array(n);
                for (var r = 0; r !== n; ++r) i[r] = e[r].clone();
            }
            return this.clippingPlanes = i, this;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }), Di.prototype = Object.create(Ui.prototype), Di.prototype.constructor = Di, Di.prototype.isMeshDepthMaterial = !0, 
    Di.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.depthPacking = t.depthPacking, this.skinning = t.skinning, 
        this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, 
        this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, 
        this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, 
        this;
    }, Oi.prototype = Object.create(Ui.prototype), Oi.prototype.constructor = Oi, Oi.prototype.isMeshDistanceMaterial = !0, 
    Oi.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.referencePosition.copy(t.referencePosition), 
        this.nearDistance = t.nearDistance, this.farDistance = t.farDistance, this.skinning = t.skinning, 
        this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, 
        this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, 
        this.displacementBias = t.displacementBias, this;
    }, Object.assign(Ni.prototype, {
        isBox3: !0,
        set: function(t, e) {
            return this.min.copy(t), this.max.copy(e), this;
        },
        setFromArray: function(t) {
            for (var e = 1 / 0, i = 1 / 0, n = 1 / 0, r = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = t.length; s < c; s += 3) {
                var h = t[s], l = t[s + 1], u = t[s + 2];
                h < e && (e = h), l < i && (i = l), u < n && (n = u), h > r && (r = h), l > a && (a = l), 
                u > o && (o = u);
            }
            return this.min.set(e, i, n), this.max.set(r, a, o), this;
        },
        setFromBufferAttribute: function(t) {
            for (var e = 1 / 0, i = 1 / 0, n = 1 / 0, r = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = t.count; s < c; s++) {
                var h = t.getX(s), l = t.getY(s), u = t.getZ(s);
                h < e && (e = h), l < i && (i = l), u < n && (n = u), h > r && (r = h), l > a && (a = l), 
                u > o && (o = u);
            }
            return this.min.set(e, i, n), this.max.set(r, a, o), this;
        },
        setFromPoints: function(t) {
            this.makeEmpty();
            for (var e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
            return this;
        },
        setFromCenterAndSize: function() {
            var t = new _e();
            return function(e, i) {
                var n = t.copy(i).multiplyScalar(.5);
                return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
            };
        }(),
        setFromObject: function(t) {
            return this.makeEmpty(), this.expandByObject(t);
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.min.copy(t.min), this.max.copy(t.max), this;
        },
        makeEmpty: function() {
            return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, 
            this;
        },
        isEmpty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
        },
        getCenter: function(t) {
            var e = t || new _e();
            return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
        },
        getSize: function(t) {
            var e = t || new _e();
            return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
        },
        expandByPoint: function(t) {
            return this.min.min(t), this.max.max(t), this;
        },
        expandByVector: function(t) {
            return this.min.sub(t), this.max.add(t), this;
        },
        expandByScalar: function(t) {
            return this.min.addScalar(-t), this.max.addScalar(t), this;
        },
        expandByObject: function() {
            var t, e, i, n = new _e();
            function r(r) {
                var a = r.geometry;
                if (void 0 !== a) if (a.isGeometry) {
                    var o = a.vertices;
                    for (e = 0, i = o.length; e < i; e++) n.copy(o[e]), n.applyMatrix4(r.matrixWorld), 
                    t.expandByPoint(n);
                } else if (a.isBufferGeometry) {
                    var s = a.attributes.position;
                    if (void 0 !== s) for (e = 0, i = s.count; e < i; e++) n.fromBufferAttribute(s, e).applyMatrix4(r.matrixWorld), 
                    t.expandByPoint(n);
                }
            }
            return function(e) {
                return t = this, e.updateMatrixWorld(!0), e.traverse(r), this;
            };
        }(),
        containsPoint: function(t) {
            return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z);
        },
        containsBox: function(t) {
            return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
        },
        getParameter: function(t, e) {
            return (e || new _e()).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
        },
        intersectsBox: function(t) {
            return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z);
        },
        intersectsSphere: (Si = new _e(), function(t) {
            return this.clampPoint(t.center, Si), Si.distanceToSquared(t.center) <= t.radius * t.radius;
        }),
        intersectsPlane: function(t) {
            var e, i;
            return t.normal.x > 0 ? (e = t.normal.x * this.min.x, i = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, 
            i = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, i += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, 
            i += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, i += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, 
            i += t.normal.z * this.min.z), e <= t.constant && i >= t.constant;
        },
        clampPoint: function(t, e) {
            return (e || new _e()).copy(t).clamp(this.min, this.max);
        },
        distanceToPoint: function() {
            var t = new _e();
            return function(e) {
                return t.copy(e).clamp(this.min, this.max).sub(e).length();
            };
        }(),
        getBoundingSphere: function() {
            var t = new _e();
            return function(e) {
                var i = e || new Fi();
                return this.getCenter(i.center), i.radius = .5 * this.getSize(t).length(), i;
            };
        }(),
        intersect: function(t) {
            return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), 
            this;
        },
        union: function(t) {
            return this.min.min(t.min), this.max.max(t.max), this;
        },
        applyMatrix4: (Ti = [ new _e(), new _e(), new _e(), new _e(), new _e(), new _e(), new _e(), new _e() ], 
        function(t) {
            return this.isEmpty() ? this : (Ti[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), 
            Ti[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Ti[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), 
            Ti[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Ti[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), 
            Ti[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Ti[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), 
            Ti[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Ti), 
            this);
        }),
        translate: function(t) {
            return this.min.add(t), this.max.add(t), this;
        },
        equals: function(t) {
            return t.min.equals(this.min) && t.max.equals(this.max);
        }
    }), Object.assign(Fi.prototype, {
        set: function(t, e) {
            return this.center.copy(t), this.radius = e, this;
        },
        setFromPoints: (Ai = new Ni(), function(t, e) {
            var i = this.center;
            void 0 !== e ? i.copy(e) : Ai.setFromPoints(t).getCenter(i);
            for (var n = 0, r = 0, a = t.length; r < a; r++) n = Math.max(n, i.distanceToSquared(t[r]));
            return this.radius = Math.sqrt(n), this;
        }),
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.center.copy(t.center), this.radius = t.radius, this;
        },
        empty: function() {
            return this.radius <= 0;
        },
        containsPoint: function(t) {
            return t.distanceToSquared(this.center) <= this.radius * this.radius;
        },
        distanceToPoint: function(t) {
            return t.distanceTo(this.center) - this.radius;
        },
        intersectsSphere: function(t) {
            var e = this.radius + t.radius;
            return t.center.distanceToSquared(this.center) <= e * e;
        },
        intersectsBox: function(t) {
            return t.intersectsSphere(this);
        },
        intersectsPlane: function(t) {
            return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
        },
        clampPoint: function(t, e) {
            var i = this.center.distanceToSquared(t), n = e || new _e();
            return n.copy(t), i > this.radius * this.radius && (n.sub(this.center).normalize(), 
            n.multiplyScalar(this.radius).add(this.center)), n;
        },
        getBoundingBox: function(t) {
            var e = t || new Ni();
            return e.set(this.center, this.center), e.expandByScalar(this.radius), e;
        },
        applyMatrix4: function(t) {
            return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), 
            this;
        },
        translate: function(t) {
            return this.center.add(t), this;
        },
        equals: function(t) {
            return t.center.equals(this.center) && t.radius === this.radius;
        }
    }), Object.assign(Bi.prototype, {
        set: function(t, e) {
            return this.normal.copy(t), this.constant = e, this;
        },
        setComponents: function(t, e, i, n) {
            return this.normal.set(t, e, i), this.constant = n, this;
        },
        setFromNormalAndCoplanarPoint: function(t, e) {
            return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
        },
        setFromCoplanarPoints: function() {
            var t = new _e(), e = new _e();
            return function(i, n, r) {
                var a = t.subVectors(r, n).cross(e.subVectors(i, n)).normalize();
                return this.setFromNormalAndCoplanarPoint(a, i), this;
            };
        }(),
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.normal.copy(t.normal), this.constant = t.constant, this;
        },
        normalize: function() {
            var t = 1 / this.normal.length();
            return this.normal.multiplyScalar(t), this.constant *= t, this;
        },
        negate: function() {
            return this.constant *= -1, this.normal.negate(), this;
        },
        distanceToPoint: function(t) {
            return this.normal.dot(t) + this.constant;
        },
        distanceToSphere: function(t) {
            return this.distanceToPoint(t.center) - t.radius;
        },
        projectPoint: function(t, e) {
            return (e || new _e()).copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t);
        },
        intersectLine: function() {
            var t = new _e();
            return function(e, i) {
                var n = i || new _e(), r = e.delta(t), a = this.normal.dot(r);
                if (0 === a) return 0 === this.distanceToPoint(e.start) ? n.copy(e.start) : void 0;
                var o = -(e.start.dot(this.normal) + this.constant) / a;
                return o < 0 || o > 1 ? void 0 : n.copy(r).multiplyScalar(o).add(e.start);
            };
        }(),
        intersectsLine: function(t) {
            var e = this.distanceToPoint(t.start), i = this.distanceToPoint(t.end);
            return e < 0 && i > 0 || i < 0 && e > 0;
        },
        intersectsBox: function(t) {
            return t.intersectsPlane(this);
        },
        intersectsSphere: function(t) {
            return t.intersectsPlane(this);
        },
        coplanarPoint: function(t) {
            return (t || new _e()).copy(this.normal).multiplyScalar(-this.constant);
        },
        applyMatrix4: function() {
            var t = new _e(), e = new we();
            return function(i, n) {
                var r = n || e.getNormalMatrix(i), a = this.coplanarPoint(t).applyMatrix4(i), o = this.normal.applyMatrix3(r).normalize();
                return this.constant = -a.dot(o), this;
            };
        }(),
        translate: function(t) {
            return this.constant -= t.dot(this.normal), this;
        },
        equals: function(t) {
            return t.normal.equals(this.normal) && t.constant === this.constant;
        }
    }), Object.assign(zi.prototype, {
        set: function(t, e, i, n, r, a) {
            var o = this.planes;
            return o[0].copy(t), o[1].copy(e), o[2].copy(i), o[3].copy(n), o[4].copy(r), o[5].copy(a), 
            this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            for (var e = this.planes, i = 0; i < 6; i++) e[i].copy(t.planes[i]);
            return this;
        },
        setFromMatrix: function(t) {
            var e = this.planes, i = t.elements, n = i[0], r = i[1], a = i[2], o = i[3], s = i[4], c = i[5], h = i[6], l = i[7], u = i[8], p = i[9], d = i[10], f = i[11], m = i[12], g = i[13], v = i[14], y = i[15];
            return e[0].setComponents(o - n, l - s, f - u, y - m).normalize(), e[1].setComponents(o + n, l + s, f + u, y + m).normalize(), 
            e[2].setComponents(o + r, l + c, f + p, y + g).normalize(), e[3].setComponents(o - r, l - c, f - p, y - g).normalize(), 
            e[4].setComponents(o - a, l - h, f - d, y - v).normalize(), e[5].setComponents(o + a, l + h, f + d, y + v).normalize(), 
            this;
        },
        intersectsObject: (Pi = new Fi(), function(t) {
            var e = t.geometry;
            return null === e.boundingSphere && e.computeBoundingSphere(), Pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), 
            this.intersectsSphere(Pi);
        }),
        intersectsSprite: function() {
            var t = new Fi();
            return function(e) {
                return t.center.set(0, 0, 0), t.radius = .7071067811865476, t.applyMatrix4(e.matrixWorld), 
                this.intersectsSphere(t);
            };
        }(),
        intersectsSphere: function(t) {
            for (var e = this.planes, i = t.center, n = -t.radius, r = 0; r < 6; r++) {
                if (e[r].distanceToPoint(i) < n) return !1;
            }
            return !0;
        },
        intersectsBox: (Ri = new _e(), Li = new _e(), function(t) {
            for (var e = this.planes, i = 0; i < 6; i++) {
                var n = e[i];
                Ri.x = n.normal.x > 0 ? t.min.x : t.max.x, Li.x = n.normal.x > 0 ? t.max.x : t.min.x, 
                Ri.y = n.normal.y > 0 ? t.min.y : t.max.y, Li.y = n.normal.y > 0 ? t.max.y : t.min.y, 
                Ri.z = n.normal.z > 0 ? t.min.z : t.max.z, Li.z = n.normal.z > 0 ? t.max.z : t.min.z;
                var r = n.distanceToPoint(Ri), a = n.distanceToPoint(Li);
                if (r < 0 && a < 0) return !1;
            }
            return !0;
        }),
        containsPoint: function(t) {
            for (var e = this.planes, i = 0; i < 6; i++) if (e[i].distanceToPoint(t) < 0) return !1;
            return !0;
        }
    }), Vi.RotationOrders = [ "XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX" ], Vi.DefaultOrder = "XYZ", 
    Object.defineProperties(Vi.prototype, {
        x: {
            get: function() {
                return this._x;
            },
            set: function(t) {
                this._x = t, this.onChangeCallback();
            }
        },
        y: {
            get: function() {
                return this._y;
            },
            set: function(t) {
                this._y = t, this.onChangeCallback();
            }
        },
        z: {
            get: function() {
                return this._z;
            },
            set: function(t) {
                this._z = t, this.onChangeCallback();
            }
        },
        order: {
            get: function() {
                return this._order;
            },
            set: function(t) {
                this._order = t, this.onChangeCallback();
            }
        }
    }), Object.assign(Vi.prototype, {
        isEuler: !0,
        set: function(t, e, i, n) {
            return this._x = t, this._y = e, this._z = i, this._order = n || this._order, this.onChangeCallback(), 
            this;
        },
        clone: function() {
            return new this.constructor(this._x, this._y, this._z, this._order);
        },
        copy: function(t) {
            return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), 
            this;
        },
        setFromRotationMatrix: function(t, e, i) {
            var n = ve.clamp, r = t.elements, a = r[0], o = r[4], s = r[8], c = r[1], h = r[5], l = r[9], u = r[2], p = r[6], d = r[10];
            return "XYZ" === (e = e || this._order) ? (this._y = Math.asin(n(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-l, d), 
            this._z = Math.atan2(-o, a)) : (this._x = Math.atan2(p, h), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-n(l, -1, 1)), 
            Math.abs(l) < .99999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(c, h)) : (this._y = Math.atan2(-u, a), 
            this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(n(p, -1, 1)), Math.abs(p) < .99999 ? (this._y = Math.atan2(-u, d), 
            this._z = Math.atan2(-o, h)) : (this._y = 0, this._z = Math.atan2(c, a))) : "ZYX" === e ? (this._y = Math.asin(-n(u, -1, 1)), 
            Math.abs(u) < .99999 ? (this._x = Math.atan2(p, d), this._z = Math.atan2(c, a)) : (this._x = 0, 
            this._z = Math.atan2(-o, h))) : "YZX" === e ? (this._z = Math.asin(n(c, -1, 1)), 
            Math.abs(c) < .99999 ? (this._x = Math.atan2(-l, h), this._y = Math.atan2(-u, a)) : (this._x = 0, 
            this._y = Math.atan2(s, d))) : "XZY" === e ? (this._z = Math.asin(-n(o, -1, 1)), 
            Math.abs(o) < .99999 ? (this._x = Math.atan2(p, h), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-l, d), 
            this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), 
            this._order = e, !1 !== i && this.onChangeCallback(), this;
        },
        setFromQuaternion: function() {
            var t = new xe();
            return function(e, i, n) {
                return t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, i, n);
            };
        }(),
        setFromVector3: function(t, e) {
            return this.set(t.x, t.y, t.z, e || this._order);
        },
        reorder: (Ci = new be(), function(t) {
            return Ci.setFromEuler(this), this.setFromQuaternion(Ci, t);
        }),
        equals: function(t) {
            return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
        },
        fromArray: function(t) {
            return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), 
            this.onChangeCallback(), this;
        },
        toArray: function(t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, 
            t[e + 2] = this._z, t[e + 3] = this._order, t;
        },
        toVector3: function(t) {
            return t ? t.set(this._x, this._y, this._z) : new _e(this._x, this._y, this._z);
        },
        onChange: function(t) {
            return this.onChangeCallback = t, this;
        },
        onChangeCallback: function() {}
    }), Object.assign(ki.prototype, {
        set: function(t) {
            this.mask = 1 << t | 0;
        },
        enable: function(t) {
            this.mask |= 1 << t | 0;
        },
        toggle: function(t) {
            this.mask ^= 1 << t | 0;
        },
        disable: function(t) {
            this.mask &= ~(1 << t | 0);
        },
        test: function(t) {
            return 0 != (this.mask & t.mask);
        }
    });
    var ji, Wi, Xi, qi, Yi = 0;
    function Zi() {
        Object.defineProperty(this, "id", {
            value: Yi++
        }), this.uuid = ve.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, 
        this.children = [], this.up = Zi.DefaultUp.clone();
        var t = new _e(), e = new Vi(), i = new be(), n = new _e(1, 1, 1);
        e.onChange(function() {
            i.setFromEuler(e, !1);
        }), i.onChange(function() {
            e.setFromQuaternion(i, void 0, !1);
        }), Object.defineProperties(this, {
            position: {
                enumerable: !0,
                value: t
            },
            rotation: {
                enumerable: !0,
                value: e
            },
            quaternion: {
                enumerable: !0,
                value: i
            },
            scale: {
                enumerable: !0,
                value: n
            },
            modelViewMatrix: {
                value: new xe()
            },
            normalMatrix: {
                value: new we()
            }
        }), this.matrix = new xe(), this.matrixWorld = new xe(), this.matrixAutoUpdate = Zi.DefaultMatrixAutoUpdate, 
        this.matrixWorldNeedsUpdate = !1, this.layers = new ki(), this.visible = !0, this.castShadow = !1, 
        this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {};
    }
    function Ji() {
        Zi.call(this), this.type = "Camera", this.matrixWorldInverse = new xe(), this.projectionMatrix = new xe();
    }
    function Qi(t, e, i, n, r, a) {
        Ji.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, 
        this.left = t, this.right = e, this.top = i, this.bottom = n, this.near = void 0 !== r ? r : .1, 
        this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix();
    }
    function Ki(t, e, i, n, r, a) {
        this.a = t, this.b = e, this.c = i, this.normal = n && n.isVector3 ? n : new _e(), 
        this.vertexNormals = Array.isArray(n) ? n : [], this.color = r && r.isColor ? r : new gi(), 
        this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 !== a ? a : 0;
    }
    Zi.DefaultUp = new _e(0, 1, 0), Zi.DefaultMatrixAutoUpdate = !0, Object.assign(Zi.prototype, e.prototype, {
        isObject3D: !0,
        onBeforeRender: function() {},
        onAfterRender: function() {},
        applyMatrix: function(t) {
            this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale);
        },
        applyQuaternion: function(t) {
            return this.quaternion.premultiply(t), this;
        },
        setRotationFromAxisAngle: function(t, e) {
            this.quaternion.setFromAxisAngle(t, e);
        },
        setRotationFromEuler: function(t) {
            this.quaternion.setFromEuler(t, !0);
        },
        setRotationFromMatrix: function(t) {
            this.quaternion.setFromRotationMatrix(t);
        },
        setRotationFromQuaternion: function(t) {
            this.quaternion.copy(t);
        },
        rotateOnAxis: (qi = new be(), function(t, e) {
            return qi.setFromAxisAngle(t, e), this.quaternion.multiply(qi), this;
        }),
        rotateOnWorldAxis: function() {
            var t = new be();
            return function(e, i) {
                return t.setFromAxisAngle(e, i), this.quaternion.premultiply(t), this;
            };
        }(),
        rotateX: function() {
            var t = new _e(1, 0, 0);
            return function(e) {
                return this.rotateOnAxis(t, e);
            };
        }(),
        rotateY: function() {
            var t = new _e(0, 1, 0);
            return function(e) {
                return this.rotateOnAxis(t, e);
            };
        }(),
        rotateZ: function() {
            var t = new _e(0, 0, 1);
            return function(e) {
                return this.rotateOnAxis(t, e);
            };
        }(),
        translateOnAxis: function() {
            var t = new _e();
            return function(e, i) {
                return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(i)), 
                this;
            };
        }(),
        translateX: function() {
            var t = new _e(1, 0, 0);
            return function(e) {
                return this.translateOnAxis(t, e);
            };
        }(),
        translateY: function() {
            var t = new _e(0, 1, 0);
            return function(e) {
                return this.translateOnAxis(t, e);
            };
        }(),
        translateZ: function() {
            var t = new _e(0, 0, 1);
            return function(e) {
                return this.translateOnAxis(t, e);
            };
        }(),
        localToWorld: function(t) {
            return t.applyMatrix4(this.matrixWorld);
        },
        worldToLocal: (Xi = new xe(), function(t) {
            return t.applyMatrix4(Xi.getInverse(this.matrixWorld));
        }),
        lookAt: function() {
            var t = new xe(), e = new _e();
            return function(i, n, r) {
                i.isVector3 ? e.copy(i) : e.set(i, n, r), this.isCamera ? t.lookAt(this.position, e, this.up) : t.lookAt(e, this.position, this.up), 
                this.quaternion.setFromRotationMatrix(t);
            };
        }(),
        add: function(t) {
            if (arguments.length > 1) {
                for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                return this;
            }
            return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), 
            this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, 
            t.dispatchEvent({
                type: "added"
            }), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), 
            this);
        },
        remove: function(t) {
            if (arguments.length > 1) {
                for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                return this;
            }
            var i = this.children.indexOf(t);
            return -1 !== i && (t.parent = null, t.dispatchEvent({
                type: "removed"
            }), this.children.splice(i, 1)), this;
        },
        getObjectById: function(t) {
            return this.getObjectByProperty("id", t);
        },
        getObjectByName: function(t) {
            return this.getObjectByProperty("name", t);
        },
        getObjectByProperty: function(t, e) {
            if (this[t] === e) return this;
            for (var i = 0, n = this.children.length; i < n; i++) {
                var r = this.children[i].getObjectByProperty(t, e);
                if (void 0 !== r) return r;
            }
        },
        getWorldPosition: function(t) {
            var e = t || new _e();
            return this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld);
        },
        getWorldQuaternion: (ji = new _e(), Wi = new _e(), function(t) {
            var e = t || new be();
            return this.updateMatrixWorld(!0), this.matrixWorld.decompose(ji, e, Wi), e;
        }),
        getWorldRotation: function() {
            var t = new be();
            return function(e) {
                var i = e || new Vi();
                return this.getWorldQuaternion(t), i.setFromQuaternion(t, this.rotation.order, !1);
            };
        }(),
        getWorldScale: function() {
            var t = new _e(), e = new be();
            return function(i) {
                var n = i || new _e();
                return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, n), n;
            };
        }(),
        getWorldDirection: function() {
            var t = new be();
            return function(e) {
                var i = e || new _e();
                return this.getWorldQuaternion(t), i.set(0, 0, 1).applyQuaternion(t);
            };
        }(),
        raycast: function() {},
        traverse: function(t) {
            t(this);
            for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].traverse(t);
        },
        traverseVisible: function(t) {
            if (!1 !== this.visible) {
                t(this);
                for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].traverseVisible(t);
            }
        },
        traverseAncestors: function(t) {
            var e = this.parent;
            null !== e && (t(e), e.traverseAncestors(t));
        },
        updateMatrix: function() {
            this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
        },
        updateMatrixWorld: function(t) {
            this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), 
            this.matrixWorldNeedsUpdate = !1, t = !0);
            for (var e = this.children, i = 0, n = e.length; i < n; i++) e[i].updateMatrixWorld(t);
        },
        toJSON: function(t) {
            var e = void 0 === t || "string" == typeof t, i = {};
            e && (t = {
                geometries: {},
                materials: {},
                textures: {},
                images: {}
            }, i.metadata = {
                version: 4.5,
                type: "Object",
                generator: "Object3D.toJSON"
            });
            var n = {};
            function r(e, i) {
                return void 0 === e[i.uuid] && (e[i.uuid] = i.toJSON(t)), i.uuid;
            }
            if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), 
            !0 === this.castShadow && (n.castShadow = !0), !0 === this.receiveShadow && (n.receiveShadow = !0), 
            !1 === this.visible && (n.visible = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), 
            n.matrix = this.matrix.toArray(), void 0 !== this.geometry && (n.geometry = r(t.geometries, this.geometry)), 
            void 0 !== this.material) if (Array.isArray(this.material)) {
                for (var a = [], o = 0, s = this.material.length; o < s; o++) a.push(r(t.materials, this.material[o]));
                n.material = a;
            } else n.material = r(t.materials, this.material);
            if (this.children.length > 0) {
                n.children = [];
                for (o = 0; o < this.children.length; o++) n.children.push(this.children[o].toJSON(t).object);
            }
            if (e) {
                var c = p(t.geometries), h = p(t.materials), l = p(t.textures), u = p(t.images);
                c.length > 0 && (i.geometries = c), h.length > 0 && (i.materials = h), l.length > 0 && (i.textures = l), 
                u.length > 0 && (i.images = u);
            }
            return i.object = n, i;
            function p(t) {
                var e = [];
                for (var i in t) {
                    var n = t[i];
                    delete n.metadata, e.push(n);
                }
                return e;
            }
        },
        clone: function(t) {
            return new this.constructor().copy(this, t);
        },
        copy: function(t, e) {
            if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), 
            this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), 
            this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, 
            this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, 
            this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, 
            this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), 
            !0 === e) for (var i = 0; i < t.children.length; i++) {
                var n = t.children[i];
                this.add(n.clone());
            }
            return this;
        }
    }), Ji.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: Ji,
        isCamera: !0,
        copy: function(t, e) {
            return Zi.prototype.copy.call(this, t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), 
            this.projectionMatrix.copy(t.projectionMatrix), this;
        },
        getWorldDirection: function() {
            var t = new be();
            return function(e) {
                var i = e || new _e();
                return this.getWorldQuaternion(t), i.set(0, 0, -1).applyQuaternion(t);
            };
        }(),
        updateMatrixWorld: function(t) {
            Zi.prototype.updateMatrixWorld.call(this, t), this.matrixWorldInverse.getInverse(this.matrixWorld);
        },
        clone: function() {
            return new this.constructor().copy(this);
        }
    }), Qi.prototype = Object.assign(Object.create(Ji.prototype), {
        constructor: Qi,
        isOrthographicCamera: !0,
        copy: function(t, e) {
            return Ji.prototype.copy.call(this, t, e), this.left = t.left, this.right = t.right, 
            this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, 
            this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), 
            this;
        },
        setViewOffset: function(t, e, i, n, r, a) {
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = i, 
            this.view.offsetY = n, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
        },
        clearViewOffset: function() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
        },
        updateProjectionMatrix: function() {
            var t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, n = (this.top + this.bottom) / 2, r = i - t, a = i + t, o = n + e, s = n - e;
            if (null !== this.view && this.view.enabled) {
                var c = this.zoom / (this.view.width / this.view.fullWidth), h = this.zoom / (this.view.height / this.view.fullHeight), l = (this.right - this.left) / this.view.width, u = (this.top - this.bottom) / this.view.height;
                a = (r += l * (this.view.offsetX / c)) + l * (this.view.width / c), s = (o -= u * (this.view.offsetY / h)) - u * (this.view.height / h);
            }
            this.projectionMatrix.makeOrthographic(r, a, o, s, this.near, this.far);
        },
        toJSON: function(t) {
            var e = Zi.prototype.toJSON.call(this, t);
            return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, 
            e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, 
            e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), 
            e;
        }
    }), Object.assign(Ki.prototype, {
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            this.a = t.a, this.b = t.b, this.c = t.c, this.normal.copy(t.normal), this.color.copy(t.color), 
            this.materialIndex = t.materialIndex;
            for (var e = 0, i = t.vertexNormals.length; e < i; e++) this.vertexNormals[e] = t.vertexNormals[e].clone();
            for (e = 0, i = t.vertexColors.length; e < i; e++) this.vertexColors[e] = t.vertexColors[e].clone();
            return this;
        }
    });
    var $i, tn = 0;
    function en() {
        Object.defineProperty(this, "id", {
            value: tn += 2
        }), this.uuid = ve.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], 
        this.colors = [], this.faces = [], this.faceVertexUvs = [ [] ], this.morphTargets = [], 
        this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], 
        this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, 
        this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, 
        this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1;
    }
    function nn(t, e, i) {
        if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.uuid = ve.generateUUID(), this.name = "", this.array = t, this.itemSize = e, 
        this.count = void 0 !== t ? t.length / e : 0, this.normalized = !0 === i, this.dynamic = !1, 
        this.updateRange = {
            offset: 0,
            count: -1
        }, this.onUploadCallback = function() {}, this.version = 0;
    }
    function rn(t, e, i) {
        nn.call(this, new Int8Array(t), e, i);
    }
    function an(t, e, i) {
        nn.call(this, new Uint8Array(t), e, i);
    }
    function on(t, e, i) {
        nn.call(this, new Uint8ClampedArray(t), e, i);
    }
    function sn(t, e, i) {
        nn.call(this, new Int16Array(t), e, i);
    }
    function cn(t, e, i) {
        nn.call(this, new Uint16Array(t), e, i);
    }
    function hn(t, e, i) {
        nn.call(this, new Int32Array(t), e, i);
    }
    function ln(t, e, i) {
        nn.call(this, new Uint32Array(t), e, i);
    }
    function un(t, e, i) {
        nn.call(this, new Float32Array(t), e, i);
    }
    function pn(t, e, i) {
        nn.call(this, new Float64Array(t), e, i);
    }
    function dn() {
        this.indices = [], this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], 
        this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], 
        this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, 
        this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, 
        this.groupsNeedUpdate = !1;
    }
    function fn(t) {
        if (0 === t.length) return -1 / 0;
        for (var e = t[0], i = 1, n = t.length; i < n; ++i) t[i] > e && (e = t[i]);
        return e;
    }
    Object.assign(en.prototype, e.prototype, {
        isGeometry: !0,
        applyMatrix: function(t) {
            for (var e = new we().getNormalMatrix(t), i = 0, n = this.vertices.length; i < n; i++) {
                this.vertices[i].applyMatrix4(t);
            }
            for (i = 0, n = this.faces.length; i < n; i++) {
                var r = this.faces[i];
                r.normal.applyMatrix3(e).normalize();
                for (var a = 0, o = r.vertexNormals.length; a < o; a++) r.vertexNormals[a].applyMatrix3(e).normalize();
            }
            return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), 
            this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this;
        },
        rotateX: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationX(e), this.applyMatrix(t), this;
            };
        }(),
        rotateY: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationY(e), this.applyMatrix(t), this;
            };
        }(),
        rotateZ: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationZ(e), this.applyMatrix(t), this;
            };
        }(),
        translate: function() {
            var t = new xe();
            return function(e, i, n) {
                return t.makeTranslation(e, i, n), this.applyMatrix(t), this;
            };
        }(),
        scale: function() {
            var t = new xe();
            return function(e, i, n) {
                return t.makeScale(e, i, n), this.applyMatrix(t), this;
            };
        }(),
        lookAt: ($i = new Zi(), function(t) {
            $i.lookAt(t), $i.updateMatrix(), this.applyMatrix($i.matrix);
        }),
        fromBufferGeometry: function(t) {
            var e = this, i = null !== t.index ? t.index.array : void 0, n = t.attributes, r = n.position.array, a = void 0 !== n.normal ? n.normal.array : void 0, o = void 0 !== n.color ? n.color.array : void 0, s = void 0 !== n.uv ? n.uv.array : void 0, c = void 0 !== n.uv2 ? n.uv2.array : void 0;
            void 0 !== c && (this.faceVertexUvs[1] = []);
            for (var h = [], l = [], u = [], p = 0, d = 0; p < r.length; p += 3, d += 2) e.vertices.push(new _e(r[p], r[p + 1], r[p + 2])), 
            void 0 !== a && h.push(new _e(a[p], a[p + 1], a[p + 2])), void 0 !== o && e.colors.push(new gi(o[p], o[p + 1], o[p + 2])), 
            void 0 !== s && l.push(new ye(s[d], s[d + 1])), void 0 !== c && u.push(new ye(c[d], c[d + 1]));
            function f(t, i, n, r) {
                var p = new Ki(t, i, n, void 0 !== a ? [ h[t].clone(), h[i].clone(), h[n].clone() ] : [], void 0 !== o ? [ e.colors[t].clone(), e.colors[i].clone(), e.colors[n].clone() ] : [], r);
                e.faces.push(p), void 0 !== s && e.faceVertexUvs[0].push([ l[t].clone(), l[i].clone(), l[n].clone() ]), 
                void 0 !== c && e.faceVertexUvs[1].push([ u[t].clone(), u[i].clone(), u[n].clone() ]);
            }
            var m = t.groups;
            if (m.length > 0) for (p = 0; p < m.length; p++) for (var g = m[p], v = g.start, y = (d = v, 
            v + g.count); d < y; d += 3) void 0 !== i ? f(i[d], i[d + 1], i[d + 2], g.materialIndex) : f(d, d + 1, d + 2, g.materialIndex); else if (void 0 !== i) for (p = 0; p < i.length; p += 3) f(i[p], i[p + 1], i[p + 2]); else for (p = 0; p < r.length / 3; p += 3) f(p, p + 1, p + 2);
            return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), 
            null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this;
        },
        center: function() {
            this.computeBoundingBox();
            var t = this.boundingBox.getCenter().negate();
            return this.translate(t.x, t.y, t.z), t;
        },
        normalize: function() {
            this.computeBoundingSphere();
            var t = this.boundingSphere.center, e = this.boundingSphere.radius, i = 0 === e ? 1 : 1 / e, n = new xe();
            return n.set(i, 0, 0, -i * t.x, 0, i, 0, -i * t.y, 0, 0, i, -i * t.z, 0, 0, 0, 1), 
            this.applyMatrix(n), this;
        },
        computeFaceNormals: function() {
            for (var t = new _e(), e = new _e(), i = 0, n = this.faces.length; i < n; i++) {
                var r = this.faces[i], a = this.vertices[r.a], o = this.vertices[r.b], s = this.vertices[r.c];
                t.subVectors(s, o), e.subVectors(a, o), t.cross(e), t.normalize(), r.normal.copy(t);
            }
        },
        computeVertexNormals: function(t) {
            var e, i, n, r, a, o;
            for (void 0 === t && (t = !0), o = new Array(this.vertices.length), e = 0, i = this.vertices.length; e < i; e++) o[e] = new _e();
            if (t) {
                var s, c, h, l = new _e(), u = new _e();
                for (n = 0, r = this.faces.length; n < r; n++) a = this.faces[n], s = this.vertices[a.a], 
                c = this.vertices[a.b], h = this.vertices[a.c], l.subVectors(h, c), u.subVectors(s, c), 
                l.cross(u), o[a.a].add(l), o[a.b].add(l), o[a.c].add(l);
            } else for (this.computeFaceNormals(), n = 0, r = this.faces.length; n < r; n++) o[(a = this.faces[n]).a].add(a.normal), 
            o[a.b].add(a.normal), o[a.c].add(a.normal);
            for (e = 0, i = this.vertices.length; e < i; e++) o[e].normalize();
            for (n = 0, r = this.faces.length; n < r; n++) {
                var p = (a = this.faces[n]).vertexNormals;
                3 === p.length ? (p[0].copy(o[a.a]), p[1].copy(o[a.b]), p[2].copy(o[a.c])) : (p[0] = o[a.a].clone(), 
                p[1] = o[a.b].clone(), p[2] = o[a.c].clone());
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0);
        },
        computeFlatVertexNormals: function() {
            var t, e, i;
            for (this.computeFaceNormals(), t = 0, e = this.faces.length; t < e; t++) {
                var n = (i = this.faces[t]).vertexNormals;
                3 === n.length ? (n[0].copy(i.normal), n[1].copy(i.normal), n[2].copy(i.normal)) : (n[0] = i.normal.clone(), 
                n[1] = i.normal.clone(), n[2] = i.normal.clone());
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0);
        },
        computeMorphNormals: function() {
            var t, e, i, n, r;
            for (i = 0, n = this.faces.length; i < n; i++) for ((r = this.faces[i]).__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), 
            r.__originalVertexNormals || (r.__originalVertexNormals = []), t = 0, e = r.vertexNormals.length; t < e; t++) r.__originalVertexNormals[t] ? r.__originalVertexNormals[t].copy(r.vertexNormals[t]) : r.__originalVertexNormals[t] = r.vertexNormals[t].clone();
            var a = new en();
            for (a.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
                if (!this.morphNormals[t]) {
                    this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
                    var o = this.morphNormals[t].faceNormals, s = this.morphNormals[t].vertexNormals;
                    for (i = 0, n = this.faces.length; i < n; i++) c = new _e(), h = {
                        a: new _e(),
                        b: new _e(),
                        c: new _e()
                    }, o.push(c), s.push(h);
                }
                var c, h, l = this.morphNormals[t];
                for (a.vertices = this.morphTargets[t].vertices, a.computeFaceNormals(), a.computeVertexNormals(), 
                i = 0, n = this.faces.length; i < n; i++) r = this.faces[i], c = l.faceNormals[i], 
                h = l.vertexNormals[i], c.copy(r.normal), h.a.copy(r.vertexNormals[0]), h.b.copy(r.vertexNormals[1]), 
                h.c.copy(r.vertexNormals[2]);
            }
            for (i = 0, n = this.faces.length; i < n; i++) (r = this.faces[i]).normal = r.__originalFaceNormal, 
            r.vertexNormals = r.__originalVertexNormals;
        },
        computeLineDistances: function() {
            for (var t = 0, e = this.vertices, i = 0, n = e.length; i < n; i++) i > 0 && (t += e[i].distanceTo(e[i - 1])), 
            this.lineDistances[i] = t;
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new Ni()), this.boundingBox.setFromPoints(this.vertices);
        },
        computeBoundingSphere: function() {
            null === this.boundingSphere && (this.boundingSphere = new Fi()), this.boundingSphere.setFromPoints(this.vertices);
        },
        merge: function(t, e, i) {
            if (t && t.isGeometry) {
                var n, r = this.vertices.length, a = this.vertices, o = t.vertices, s = this.faces, c = t.faces, h = this.faceVertexUvs[0], l = t.faceVertexUvs[0], u = this.colors, p = t.colors;
                void 0 === i && (i = 0), void 0 !== e && (n = new we().getNormalMatrix(e));
                for (var d = 0, f = o.length; d < f; d++) {
                    var m = o[d].clone();
                    void 0 !== e && m.applyMatrix4(e), a.push(m);
                }
                for (d = 0, f = p.length; d < f; d++) u.push(p[d].clone());
                for (d = 0, f = c.length; d < f; d++) {
                    var g, v, y, x = c[d], b = x.vertexNormals, _ = x.vertexColors;
                    (g = new Ki(x.a + r, x.b + r, x.c + r)).normal.copy(x.normal), void 0 !== n && g.normal.applyMatrix3(n).normalize();
                    for (var w = 0, M = b.length; w < M; w++) v = b[w].clone(), void 0 !== n && v.applyMatrix3(n).normalize(), 
                    g.vertexNormals.push(v);
                    g.color.copy(x.color);
                    for (w = 0, M = _.length; w < M; w++) y = _[w], g.vertexColors.push(y.clone());
                    g.materialIndex = x.materialIndex + i, s.push(g);
                }
                for (d = 0, f = l.length; d < f; d++) {
                    var E = l[d], T = [];
                    if (void 0 !== E) {
                        for (w = 0, M = E.length; w < M; w++) T.push(E[w].clone());
                        h.push(T);
                    }
                }
            } else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t);
        },
        mergeMesh: function(t) {
            t && t.isMesh ? (t.matrixAutoUpdate && t.updateMatrix(), this.merge(t.geometry, t.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t);
        },
        mergeVertices: function() {
            var t, e, i, n, r, a, o, s, c = {}, h = [], l = [], u = Math.pow(10, 4);
            for (i = 0, n = this.vertices.length; i < n; i++) t = this.vertices[i], void 0 === c[e = Math.round(t.x * u) + "_" + Math.round(t.y * u) + "_" + Math.round(t.z * u)] ? (c[e] = i, 
            h.push(this.vertices[i]), l[i] = h.length - 1) : l[i] = l[c[e]];
            var p = [];
            for (i = 0, n = this.faces.length; i < n; i++) {
                (r = this.faces[i]).a = l[r.a], r.b = l[r.b], r.c = l[r.c], a = [ r.a, r.b, r.c ];
                for (var d = 0; d < 3; d++) if (a[d] === a[(d + 1) % 3]) {
                    p.push(i);
                    break;
                }
            }
            for (i = p.length - 1; i >= 0; i--) {
                var f = p[i];
                for (this.faces.splice(f, 1), o = 0, s = this.faceVertexUvs.length; o < s; o++) this.faceVertexUvs[o].splice(f, 1);
            }
            var m = this.vertices.length - h.length;
            return this.vertices = h, m;
        },
        setFromPoints: function(t) {
            this.vertices = [];
            for (var e = 0, i = t.length; e < i; e++) {
                var n = t[e];
                this.vertices.push(new _e(n.x, n.y, n.z || 0));
            }
            return this;
        },
        sortFacesByMaterialIndex: function() {
            for (var t = this.faces, e = t.length, i = 0; i < e; i++) t[i]._id = i;
            t.sort(function(t, e) {
                return t.materialIndex - e.materialIndex;
            });
            var n, r, a = this.faceVertexUvs[0], o = this.faceVertexUvs[1];
            a && a.length === e && (n = []), o && o.length === e && (r = []);
            for (i = 0; i < e; i++) {
                var s = t[i]._id;
                n && n.push(a[s]), r && r.push(o[s]);
            }
            n && (this.faceVertexUvs[0] = n), r && (this.faceVertexUvs[1] = r);
        },
        toJSON: function() {
            var t = {
                metadata: {
                    version: 4.5,
                    type: "Geometry",
                    generator: "Geometry.toJSON"
                }
            };
            if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), 
            void 0 !== this.parameters) {
                var e = this.parameters;
                for (var i in e) void 0 !== e[i] && (t[i] = e[i]);
                return t;
            }
            for (var n = [], r = 0; r < this.vertices.length; r++) {
                var a = this.vertices[r];
                n.push(a.x, a.y, a.z);
            }
            var o = [], s = [], c = {}, h = [], l = {}, u = [], p = {};
            for (r = 0; r < this.faces.length; r++) {
                var d = this.faces[r], f = void 0 !== this.faceVertexUvs[0][r], m = d.normal.length() > 0, g = d.vertexNormals.length > 0, v = 1 !== d.color.r || 1 !== d.color.g || 1 !== d.color.b, y = d.vertexColors.length > 0, x = 0;
                if (x = M(x = M(x = M(x = M(x = M(x = M(x = M(x = M(x, 0, 0), 1, !0), 2, !1), 3, f), 4, m), 5, g), 6, v), 7, y), 
                o.push(x), o.push(d.a, d.b, d.c), o.push(d.materialIndex), f) {
                    var b = this.faceVertexUvs[0][r];
                    o.push(S(b[0]), S(b[1]), S(b[2]));
                }
                if (m && o.push(E(d.normal)), g) {
                    var _ = d.vertexNormals;
                    o.push(E(_[0]), E(_[1]), E(_[2]));
                }
                if (v && o.push(T(d.color)), y) {
                    var w = d.vertexColors;
                    o.push(T(w[0]), T(w[1]), T(w[2]));
                }
            }
            function M(t, e, i) {
                return i ? t | 1 << e : t & ~(1 << e);
            }
            function E(t) {
                var e = t.x.toString() + t.y.toString() + t.z.toString();
                return void 0 !== c[e] ? c[e] : (c[e] = s.length / 3, s.push(t.x, t.y, t.z), c[e]);
            }
            function T(t) {
                var e = t.r.toString() + t.g.toString() + t.b.toString();
                return void 0 !== l[e] ? l[e] : (l[e] = h.length, h.push(t.getHex()), l[e]);
            }
            function S(t) {
                var e = t.x.toString() + t.y.toString();
                return void 0 !== p[e] ? p[e] : (p[e] = u.length / 2, u.push(t.x, t.y), p[e]);
            }
            return t.data = {}, t.data.vertices = n, t.data.normals = s, h.length > 0 && (t.data.colors = h), 
            u.length > 0 && (t.data.uvs = [ u ]), t.data.faces = o, t;
        },
        clone: function() {
            return new en().copy(this);
        },
        copy: function(t) {
            var e, i, n, r, a, o;
            this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [ [] ], 
            this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], 
            this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
            var s = t.vertices;
            for (e = 0, i = s.length; e < i; e++) this.vertices.push(s[e].clone());
            var c = t.colors;
            for (e = 0, i = c.length; e < i; e++) this.colors.push(c[e].clone());
            var h = t.faces;
            for (e = 0, i = h.length; e < i; e++) this.faces.push(h[e].clone());
            for (e = 0, i = t.faceVertexUvs.length; e < i; e++) {
                var l = t.faceVertexUvs[e];
                for (void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []), n = 0, r = l.length; n < r; n++) {
                    var u = l[n], p = [];
                    for (a = 0, o = u.length; a < o; a++) {
                        var d = u[a];
                        p.push(d.clone());
                    }
                    this.faceVertexUvs[e].push(p);
                }
            }
            var f = t.morphTargets;
            for (e = 0, i = f.length; e < i; e++) {
                var m = {};
                if (m.name = f[e].name, void 0 !== f[e].vertices) for (m.vertices = [], n = 0, r = f[e].vertices.length; n < r; n++) m.vertices.push(f[e].vertices[n].clone());
                if (void 0 !== f[e].normals) for (m.normals = [], n = 0, r = f[e].normals.length; n < r; n++) m.normals.push(f[e].normals[n].clone());
                this.morphTargets.push(m);
            }
            var g = t.morphNormals;
            for (e = 0, i = g.length; e < i; e++) {
                var v = {};
                if (void 0 !== g[e].vertexNormals) for (v.vertexNormals = [], n = 0, r = g[e].vertexNormals.length; n < r; n++) {
                    var y = g[e].vertexNormals[n], x = {};
                    x.a = y.a.clone(), x.b = y.b.clone(), x.c = y.c.clone(), v.vertexNormals.push(x);
                }
                if (void 0 !== g[e].faceNormals) for (v.faceNormals = [], n = 0, r = g[e].faceNormals.length; n < r; n++) v.faceNormals.push(g[e].faceNormals[n].clone());
                this.morphNormals.push(v);
            }
            var b = t.skinWeights;
            for (e = 0, i = b.length; e < i; e++) this.skinWeights.push(b[e].clone());
            var _ = t.skinIndices;
            for (e = 0, i = _.length; e < i; e++) this.skinIndices.push(_[e].clone());
            var w = t.lineDistances;
            for (e = 0, i = w.length; e < i; e++) this.lineDistances.push(w[e]);
            var M = t.boundingBox;
            null !== M && (this.boundingBox = M.clone());
            var E = t.boundingSphere;
            return null !== E && (this.boundingSphere = E.clone()), this.elementsNeedUpdate = t.elementsNeedUpdate, 
            this.verticesNeedUpdate = t.verticesNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, 
            this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, 
            this.lineDistancesNeedUpdate = t.lineDistancesNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, 
            this;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }), Object.defineProperty(nn.prototype, "needsUpdate", {
        set: function(t) {
            !0 === t && this.version++;
        }
    }), Object.assign(nn.prototype, {
        isBufferAttribute: !0,
        setArray: function(t) {
            if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== t ? t.length / this.itemSize : 0, this.array = t;
        },
        setDynamic: function(t) {
            return this.dynamic = t, this;
        },
        copy: function(t) {
            return this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, 
            this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, 
            this;
        },
        copyAt: function(t, e, i) {
            t *= this.itemSize, i *= e.itemSize;
            for (var n = 0, r = this.itemSize; n < r; n++) this.array[t + n] = e.array[i + n];
            return this;
        },
        copyArray: function(t) {
            return this.array.set(t), this;
        },
        copyColorsArray: function(t) {
            for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", n), 
                a = new gi()), e[i++] = a.r, e[i++] = a.g, e[i++] = a.b;
            }
            return this;
        },
        copyIndicesArray: function(t) {
            for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                e[i++] = a.a, e[i++] = a.b, e[i++] = a.c;
            }
            return this;
        },
        copyVector2sArray: function(t) {
            for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", n), 
                a = new ye()), e[i++] = a.x, e[i++] = a.y;
            }
            return this;
        },
        copyVector3sArray: function(t) {
            for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", n), 
                a = new _e()), e[i++] = a.x, e[i++] = a.y, e[i++] = a.z;
            }
            return this;
        },
        copyVector4sArray: function(t) {
            for (var e = this.array, i = 0, n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", n), 
                a = new Te()), e[i++] = a.x, e[i++] = a.y, e[i++] = a.z, e[i++] = a.w;
            }
            return this;
        },
        set: function(t, e) {
            return void 0 === e && (e = 0), this.array.set(t, e), this;
        },
        getX: function(t) {
            return this.array[t * this.itemSize];
        },
        setX: function(t, e) {
            return this.array[t * this.itemSize] = e, this;
        },
        getY: function(t) {
            return this.array[t * this.itemSize + 1];
        },
        setY: function(t, e) {
            return this.array[t * this.itemSize + 1] = e, this;
        },
        getZ: function(t) {
            return this.array[t * this.itemSize + 2];
        },
        setZ: function(t, e) {
            return this.array[t * this.itemSize + 2] = e, this;
        },
        getW: function(t) {
            return this.array[t * this.itemSize + 3];
        },
        setW: function(t, e) {
            return this.array[t * this.itemSize + 3] = e, this;
        },
        setXY: function(t, e, i) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this;
        },
        setXYZ: function(t, e, i, n) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = n, 
            this;
        },
        setXYZW: function(t, e, i, n, r) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = n, 
            this.array[t + 3] = r, this;
        },
        onUpload: function(t) {
            return this.onUploadCallback = t, this;
        },
        clone: function() {
            return new this.constructor(this.array, this.itemSize).copy(this);
        }
    }), rn.prototype = Object.create(nn.prototype), rn.prototype.constructor = rn, an.prototype = Object.create(nn.prototype), 
    an.prototype.constructor = an, on.prototype = Object.create(nn.prototype), on.prototype.constructor = on, 
    sn.prototype = Object.create(nn.prototype), sn.prototype.constructor = sn, cn.prototype = Object.create(nn.prototype), 
    cn.prototype.constructor = cn, hn.prototype = Object.create(nn.prototype), hn.prototype.constructor = hn, 
    ln.prototype = Object.create(nn.prototype), ln.prototype.constructor = ln, un.prototype = Object.create(nn.prototype), 
    un.prototype.constructor = un, pn.prototype = Object.create(nn.prototype), pn.prototype.constructor = pn, 
    Object.assign(dn.prototype, {
        computeGroups: function(t) {
            for (var e, i = [], n = void 0, r = t.faces, a = 0; a < r.length; a++) {
                var o = r[a];
                o.materialIndex !== n && (n = o.materialIndex, void 0 !== e && (e.count = 3 * a - e.start, 
                i.push(e)), e = {
                    start: 3 * a,
                    materialIndex: n
                });
            }
            void 0 !== e && (e.count = 3 * a - e.start, i.push(e)), this.groups = i;
        },
        fromGeometry: function(t) {
            var e, i = t.faces, n = t.vertices, r = t.faceVertexUvs, a = r[0] && r[0].length > 0, o = r[1] && r[1].length > 0, s = t.morphTargets, c = s.length;
            if (c > 0) {
                e = [];
                for (var h = 0; h < c; h++) e[h] = [];
                this.morphTargets.position = e;
            }
            var l, u = t.morphNormals, p = u.length;
            if (p > 0) {
                l = [];
                for (h = 0; h < p; h++) l[h] = [];
                this.morphTargets.normal = l;
            }
            var d = t.skinIndices, f = t.skinWeights, m = d.length === n.length, g = f.length === n.length;
            for (h = 0; h < i.length; h++) {
                var v = i[h];
                this.vertices.push(n[v.a], n[v.b], n[v.c]);
                var y = v.vertexNormals;
                if (3 === y.length) this.normals.push(y[0], y[1], y[2]); else {
                    var x = v.normal;
                    this.normals.push(x, x, x);
                }
                var b, _ = v.vertexColors;
                if (3 === _.length) this.colors.push(_[0], _[1], _[2]); else {
                    var w = v.color;
                    this.colors.push(w, w, w);
                }
                if (!0 === a) void 0 !== (b = r[0][h]) ? this.uvs.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", h), 
                this.uvs.push(new ye(), new ye(), new ye()));
                if (!0 === o) void 0 !== (b = r[1][h]) ? this.uvs2.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", h), 
                this.uvs2.push(new ye(), new ye(), new ye()));
                for (var M = 0; M < c; M++) {
                    var E = s[M].vertices;
                    e[M].push(E[v.a], E[v.b], E[v.c]);
                }
                for (M = 0; M < p; M++) {
                    var T = u[M].vertexNormals[h];
                    l[M].push(T.a, T.b, T.c);
                }
                m && this.skinIndices.push(d[v.a], d[v.b], d[v.c]), g && this.skinWeights.push(f[v.a], f[v.b], f[v.c]);
            }
            return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, 
            this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, 
            this.groupsNeedUpdate = t.groupsNeedUpdate, this;
        }
    });
    var mn, gn, vn, yn, xn, bn, _n, wn = 1;
    function Mn() {
        Object.defineProperty(this, "id", {
            value: wn += 2
        }), this.uuid = ve.generateUUID(), this.name = "", this.type = "BufferGeometry", 
        this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], 
        this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
            start: 0,
            count: 1 / 0
        };
    }
    function En(t, e, i, n, r, a) {
        en.call(this), this.type = "BoxGeometry", this.parameters = {
            width: t,
            height: e,
            depth: i,
            widthSegments: n,
            heightSegments: r,
            depthSegments: a
        }, this.fromBufferGeometry(new Tn(t, e, i, n, r, a)), this.mergeVertices();
    }
    function Tn(t, e, i, n, r, a) {
        Mn.call(this), this.type = "BoxBufferGeometry", this.parameters = {
            width: t,
            height: e,
            depth: i,
            widthSegments: n,
            heightSegments: r,
            depthSegments: a
        };
        var o = this;
        t = t || 1, e = e || 1, i = i || 1, n = Math.floor(n) || 1, r = Math.floor(r) || 1, 
        a = Math.floor(a) || 1;
        var s = [], c = [], h = [], l = [], u = 0, p = 0;
        function d(t, e, i, n, r, a, d, f, m, g, v) {
            var y, x, b = a / m, _ = d / g, w = a / 2, M = d / 2, E = f / 2, T = m + 1, S = g + 1, A = 0, R = 0, L = new _e();
            for (x = 0; x < S; x++) {
                var P = x * _ - M;
                for (y = 0; y < T; y++) {
                    var C = y * b - w;
                    L[t] = C * n, L[e] = P * r, L[i] = E, c.push(L.x, L.y, L.z), L[t] = 0, L[e] = 0, 
                    L[i] = f > 0 ? 1 : -1, h.push(L.x, L.y, L.z), l.push(y / m), l.push(1 - x / g), 
                    A += 1;
                }
            }
            for (x = 0; x < g; x++) for (y = 0; y < m; y++) {
                var I = u + y + T * x, U = u + y + T * (x + 1), D = u + (y + 1) + T * (x + 1), O = u + (y + 1) + T * x;
                s.push(I, U, O), s.push(U, D, O), R += 6;
            }
            o.addGroup(p, R, v), p += R, u += A;
        }
        d("z", "y", "x", -1, -1, i, e, t, a, r, 0), d("z", "y", "x", 1, -1, i, e, -t, a, r, 1), 
        d("x", "z", "y", 1, 1, t, i, e, n, a, 2), d("x", "z", "y", 1, -1, t, i, -e, n, a, 3), 
        d("x", "y", "z", 1, -1, t, e, i, n, r, 4), d("x", "y", "z", -1, -1, t, e, -i, n, r, 5), 
        this.setIndex(s), this.addAttribute("position", new un(c, 3)), this.addAttribute("normal", new un(h, 3)), 
        this.addAttribute("uv", new un(l, 2));
    }
    function Sn(t, e, i, n) {
        en.call(this), this.type = "PlaneGeometry", this.parameters = {
            width: t,
            height: e,
            widthSegments: i,
            heightSegments: n
        }, this.fromBufferGeometry(new An(t, e, i, n)), this.mergeVertices();
    }
    function An(t, e, i, n) {
        Mn.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
            width: t,
            height: e,
            widthSegments: i,
            heightSegments: n
        };
        var r, a, o = (t = t || 1) / 2, s = (e = e || 1) / 2, c = Math.floor(i) || 1, h = Math.floor(n) || 1, l = c + 1, u = h + 1, p = t / c, d = e / h, f = [], m = [], g = [], v = [];
        for (a = 0; a < u; a++) {
            var y = a * d - s;
            for (r = 0; r < l; r++) {
                var x = r * p - o;
                m.push(x, -y, 0), g.push(0, 0, 1), v.push(r / c), v.push(1 - a / h);
            }
        }
        for (a = 0; a < h; a++) for (r = 0; r < c; r++) {
            var b = r + l * a, _ = r + l * (a + 1), w = r + 1 + l * (a + 1), M = r + 1 + l * a;
            f.push(b, _, M), f.push(_, w, M);
        }
        this.setIndex(f), this.addAttribute("position", new un(m, 3)), this.addAttribute("normal", new un(g, 3)), 
        this.addAttribute("uv", new un(v, 2));
    }
    function Rn(t) {
        Ui.call(this), this.type = "MeshBasicMaterial", this.color = new gi(16777215), this.map = null, 
        this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, 
        this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = rt, 
        this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, 
        this.morphTargets = !1, this.lights = !1, this.setValues(t);
    }
    function Ln(t) {
        Ui.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, 
        this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", 
        this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", 
        this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, 
        this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, 
        this.morphNormals = !1, this.extensions = {
            derivatives: !1,
            fragDepth: !1,
            drawBuffers: !1,
            shaderTextureLOD: !1
        }, this.defaultAttributeValues = {
            color: [ 1, 1, 1 ],
            uv: [ 0, 0 ],
            uv2: [ 0, 0 ]
        }, this.index0AttributeName = void 0, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), 
        this.setValues(t));
    }
    function Pn(t, e) {
        this.origin = void 0 !== t ? t : new _e(), this.direction = void 0 !== e ? e : new _e();
    }
    function Cn(t, e) {
        this.start = void 0 !== t ? t : new _e(), this.end = void 0 !== e ? e : new _e();
    }
    function In(t, e, i) {
        this.a = void 0 !== t ? t : new _e(), this.b = void 0 !== e ? e : new _e(), this.c = void 0 !== i ? i : new _e();
    }
    function Un(t, e) {
        Zi.call(this), this.type = "Mesh", this.geometry = void 0 !== t ? t : new Mn(), 
        this.material = void 0 !== e ? e : new Rn({
            color: 16777215 * Math.random()
        }), this.drawMode = ae, this.updateMorphTargets();
    }
    function Dn(t, e) {
        return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program && e.program && t.program !== e.program ? t.program.id - e.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id;
    }
    function On(t, e) {
        return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id;
    }
    function Nn() {
        var t = {};
        return {
            get: function(e, i) {
                var n = e.id + "," + i.id, r = t[n];
                return void 0 === r && (r = new function() {
                    var t = [], e = 0, i = [], n = [];
                    return {
                        opaque: i,
                        transparent: n,
                        init: function() {
                            e = 0, i.length = 0, n.length = 0;
                        },
                        push: function(r, a, o, s, c) {
                            var h = t[e];
                            void 0 === h ? (h = {
                                id: r.id,
                                object: r,
                                geometry: a,
                                material: o,
                                program: o.program,
                                renderOrder: r.renderOrder,
                                z: s,
                                group: c
                            }, t[e] = h) : (h.id = r.id, h.object = r, h.geometry = a, h.material = o, h.program = o.program, 
                            h.renderOrder = r.renderOrder, h.z = s, h.group = c), (!0 === o.transparent ? n : i).push(h), 
                            e++;
                        },
                        sort: function() {
                            i.length > 1 && i.sort(Dn), n.length > 1 && n.sort(On);
                        }
                    };
                }(), t[n] = r), r;
            },
            dispose: function() {
                t = {};
            }
        };
    }
    function Fn(t, e) {
        return Math.abs(e[1]) - Math.abs(t[1]);
    }
    function Bn() {
        var t = new function() {
            var t = {};
            return {
                get: function(e) {
                    if (void 0 !== t[e.id]) return t[e.id];
                    var i;
                    switch (e.type) {
                      case "DirectionalLight":
                        i = {
                            direction: new _e(),
                            color: new gi(),
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new ye()
                        };
                        break;

                      case "SpotLight":
                        i = {
                            position: new _e(),
                            direction: new _e(),
                            color: new gi(),
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new ye()
                        };
                        break;

                      case "PointLight":
                        i = {
                            position: new _e(),
                            color: new gi(),
                            distance: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new ye(),
                            shadowCameraNear: 1,
                            shadowCameraFar: 1e3
                        };
                        break;

                      case "HemisphereLight":
                        i = {
                            direction: new _e(),
                            skyColor: new gi(),
                            groundColor: new gi()
                        };
                        break;

                      case "RectAreaLight":
                        i = {
                            color: new gi(),
                            position: new _e(),
                            halfWidth: new _e(),
                            halfHeight: new _e()
                        };
                    }
                    return t[e.id] = i, i;
                }
            };
        }(), e = {
            hash: "",
            ambient: [ 0, 0, 0 ],
            directional: [],
            directionalShadowMap: [],
            directionalShadowMatrix: [],
            spot: [],
            spotShadowMap: [],
            spotShadowMatrix: [],
            rectArea: [],
            point: [],
            pointShadowMap: [],
            pointShadowMatrix: [],
            hemi: []
        }, i = new _e(), n = new xe(), r = new xe();
        return {
            setup: function(a, o, s) {
                for (var c = 0, h = 0, l = 0, u = 0, p = 0, d = 0, f = 0, m = 0, g = s.matrixWorldInverse, v = 0, y = a.length; v < y; v++) {
                    var x = a[v], b = x.color, _ = x.intensity, w = x.distance, M = x.shadow && x.shadow.map ? x.shadow.map.texture : null;
                    if (x.isAmbientLight) c += b.r * _, h += b.g * _, l += b.b * _; else if (x.isDirectionalLight) {
                        if ((T = t.get(x)).color.copy(x.color).multiplyScalar(x.intensity), T.direction.setFromMatrixPosition(x.matrixWorld), 
                        i.setFromMatrixPosition(x.target.matrixWorld), T.direction.sub(i), T.direction.transformDirection(g), 
                        T.shadow = x.castShadow, x.castShadow) {
                            var E = x.shadow;
                            T.shadowBias = E.bias, T.shadowRadius = E.radius, T.shadowMapSize = E.mapSize;
                        }
                        e.directionalShadowMap[u] = M, e.directionalShadowMatrix[u] = x.shadow.matrix, e.directional[u] = T, 
                        u++;
                    } else if (x.isSpotLight) (T = t.get(x)).position.setFromMatrixPosition(x.matrixWorld), 
                    T.position.applyMatrix4(g), T.color.copy(b).multiplyScalar(_), T.distance = w, T.direction.setFromMatrixPosition(x.matrixWorld), 
                    i.setFromMatrixPosition(x.target.matrixWorld), T.direction.sub(i), T.direction.transformDirection(g), 
                    T.coneCos = Math.cos(x.angle), T.penumbraCos = Math.cos(x.angle * (1 - x.penumbra)), 
                    T.decay = 0 === x.distance ? 0 : x.decay, T.shadow = x.castShadow, x.castShadow && (E = x.shadow, 
                    T.shadowBias = E.bias, T.shadowRadius = E.radius, T.shadowMapSize = E.mapSize), 
                    e.spotShadowMap[d] = M, e.spotShadowMatrix[d] = x.shadow.matrix, e.spot[d] = T, 
                    d++; else if (x.isRectAreaLight) (T = t.get(x)).color.copy(b).multiplyScalar(_ / (x.width * x.height)), 
                    T.position.setFromMatrixPosition(x.matrixWorld), T.position.applyMatrix4(g), r.identity(), 
                    n.copy(x.matrixWorld), n.premultiply(g), r.extractRotation(n), T.halfWidth.set(.5 * x.width, 0, 0), 
                    T.halfHeight.set(0, .5 * x.height, 0), T.halfWidth.applyMatrix4(r), T.halfHeight.applyMatrix4(r), 
                    e.rectArea[f] = T, f++; else if (x.isPointLight) (T = t.get(x)).position.setFromMatrixPosition(x.matrixWorld), 
                    T.position.applyMatrix4(g), T.color.copy(x.color).multiplyScalar(x.intensity), T.distance = x.distance, 
                    T.decay = 0 === x.distance ? 0 : x.decay, T.shadow = x.castShadow, x.castShadow && (E = x.shadow, 
                    T.shadowBias = E.bias, T.shadowRadius = E.radius, T.shadowMapSize = E.mapSize, T.shadowCameraNear = E.camera.near, 
                    T.shadowCameraFar = E.camera.far), e.pointShadowMap[p] = M, e.pointShadowMatrix[p] = x.shadow.matrix, 
                    e.point[p] = T, p++; else if (x.isHemisphereLight) {
                        var T;
                        (T = t.get(x)).direction.setFromMatrixPosition(x.matrixWorld), T.direction.transformDirection(g), 
                        T.direction.normalize(), T.skyColor.copy(x.color).multiplyScalar(_), T.groundColor.copy(x.groundColor).multiplyScalar(_), 
                        e.hemi[m] = T, m++;
                    }
                }
                e.ambient[0] = c, e.ambient[1] = h, e.ambient[2] = l, e.directional.length = u, 
                e.spot.length = d, e.rectArea.length = f, e.point.length = p, e.hemi.length = m, 
                e.hash = u + "," + p + "," + d + "," + f + "," + m + "," + o.length;
            },
            state: e
        };
    }
    function zn(t, e, i) {
        var n = t.createShader(e);
        return t.shaderSource(n, i), t.compileShader(n), !1 === t.getShaderParameter(n, t.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile."), 
        "" !== t.getShaderInfoLog(n) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e === t.VERTEX_SHADER ? "vertex" : "fragment", t.getShaderInfoLog(n), function(t) {
            for (var e = t.split("\n"), i = 0; i < e.length; i++) e[i] = i + 1 + ": " + e[i];
            return e.join("\n");
        }(i)), n;
    }
    Object.assign(Mn.prototype, e.prototype, {
        isBufferGeometry: !0,
        getIndex: function() {
            return this.index;
        },
        setIndex: function(t) {
            Array.isArray(t) ? this.index = new (fn(t) > 65535 ? ln : cn)(t, 1) : this.index = t;
        },
        addAttribute: function(t, e) {
            return e && e.isBufferAttribute || e && e.isInterleavedBufferAttribute ? "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), 
            void this.setIndex(e)) : (this.attributes[t] = e, this) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), 
            void this.addAttribute(t, new nn(arguments[1], arguments[2])));
        },
        getAttribute: function(t) {
            return this.attributes[t];
        },
        removeAttribute: function(t) {
            return delete this.attributes[t], this;
        },
        addGroup: function(t, e, i) {
            this.groups.push({
                start: t,
                count: e,
                materialIndex: void 0 !== i ? i : 0
            });
        },
        clearGroups: function() {
            this.groups = [];
        },
        setDrawRange: function(t, e) {
            this.drawRange.start = t, this.drawRange.count = e;
        },
        applyMatrix: function(t) {
            var e = this.attributes.position;
            void 0 !== e && (t.applyToBufferAttribute(e), e.needsUpdate = !0);
            var i = this.attributes.normal;
            void 0 !== i && (new we().getNormalMatrix(t).applyToBufferAttribute(i), i.needsUpdate = !0);
            return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), 
            this;
        },
        rotateX: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationX(e), this.applyMatrix(t), this;
            };
        }(),
        rotateY: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationY(e), this.applyMatrix(t), this;
            };
        }(),
        rotateZ: function() {
            var t = new xe();
            return function(e) {
                return t.makeRotationZ(e), this.applyMatrix(t), this;
            };
        }(),
        translate: function() {
            var t = new xe();
            return function(e, i, n) {
                return t.makeTranslation(e, i, n), this.applyMatrix(t), this;
            };
        }(),
        scale: function() {
            var t = new xe();
            return function(e, i, n) {
                return t.makeScale(e, i, n), this.applyMatrix(t), this;
            };
        }(),
        lookAt: function() {
            var t = new Zi();
            return function(e) {
                t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix);
            };
        }(),
        center: function() {
            this.computeBoundingBox();
            var t = this.boundingBox.getCenter().negate();
            return this.translate(t.x, t.y, t.z), t;
        },
        setFromObject: function(t) {
            var e = t.geometry;
            if (t.isPoints || t.isLine) {
                var i = new un(3 * e.vertices.length, 3), n = new un(3 * e.colors.length, 3);
                if (this.addAttribute("position", i.copyVector3sArray(e.vertices)), this.addAttribute("color", n.copyColorsArray(e.colors)), 
                e.lineDistances && e.lineDistances.length === e.vertices.length) {
                    var r = new un(e.lineDistances.length, 1);
                    this.addAttribute("lineDistance", r.copyArray(e.lineDistances));
                }
                null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone());
            } else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
            return this;
        },
        setFromPoints: function(t) {
            for (var e = [], i = 0, n = t.length; i < n; i++) {
                var r = t[i];
                e.push(r.x, r.y, r.z || 0);
            }
            return this.addAttribute("position", new un(e, 3)), this;
        },
        updateFromObject: function(t) {
            var e, i = t.geometry;
            if (t.isMesh) {
                var n = i.__directGeometry;
                if (!0 === i.elementsNeedUpdate && (n = void 0, i.elementsNeedUpdate = !1), void 0 === n) return this.fromGeometry(i);
                n.verticesNeedUpdate = i.verticesNeedUpdate, n.normalsNeedUpdate = i.normalsNeedUpdate, 
                n.colorsNeedUpdate = i.colorsNeedUpdate, n.uvsNeedUpdate = i.uvsNeedUpdate, n.groupsNeedUpdate = i.groupsNeedUpdate, 
                i.verticesNeedUpdate = !1, i.normalsNeedUpdate = !1, i.colorsNeedUpdate = !1, i.uvsNeedUpdate = !1, 
                i.groupsNeedUpdate = !1, i = n;
            }
            return !0 === i.verticesNeedUpdate && (void 0 !== (e = this.attributes.position) && (e.copyVector3sArray(i.vertices), 
            e.needsUpdate = !0), i.verticesNeedUpdate = !1), !0 === i.normalsNeedUpdate && (void 0 !== (e = this.attributes.normal) && (e.copyVector3sArray(i.normals), 
            e.needsUpdate = !0), i.normalsNeedUpdate = !1), !0 === i.colorsNeedUpdate && (void 0 !== (e = this.attributes.color) && (e.copyColorsArray(i.colors), 
            e.needsUpdate = !0), i.colorsNeedUpdate = !1), i.uvsNeedUpdate && (void 0 !== (e = this.attributes.uv) && (e.copyVector2sArray(i.uvs), 
            e.needsUpdate = !0), i.uvsNeedUpdate = !1), i.lineDistancesNeedUpdate && (void 0 !== (e = this.attributes.lineDistance) && (e.copyArray(i.lineDistances), 
            e.needsUpdate = !0), i.lineDistancesNeedUpdate = !1), i.groupsNeedUpdate && (i.computeGroups(t.geometry), 
            this.groups = i.groups, i.groupsNeedUpdate = !1), this;
        },
        fromGeometry: function(t) {
            return t.__directGeometry = new dn().fromGeometry(t), this.fromDirectGeometry(t.__directGeometry);
        },
        fromDirectGeometry: function(t) {
            var e = new Float32Array(3 * t.vertices.length);
            if (this.addAttribute("position", new nn(e, 3).copyVector3sArray(t.vertices)), t.normals.length > 0) {
                var i = new Float32Array(3 * t.normals.length);
                this.addAttribute("normal", new nn(i, 3).copyVector3sArray(t.normals));
            }
            if (t.colors.length > 0) {
                var n = new Float32Array(3 * t.colors.length);
                this.addAttribute("color", new nn(n, 3).copyColorsArray(t.colors));
            }
            if (t.uvs.length > 0) {
                var r = new Float32Array(2 * t.uvs.length);
                this.addAttribute("uv", new nn(r, 2).copyVector2sArray(t.uvs));
            }
            if (t.uvs2.length > 0) {
                var a = new Float32Array(2 * t.uvs2.length);
                this.addAttribute("uv2", new nn(a, 2).copyVector2sArray(t.uvs2));
            }
            if (t.indices.length > 0) {
                var o = new (fn(t.indices) > 65535 ? Uint32Array : Uint16Array)(3 * t.indices.length);
                this.setIndex(new nn(o, 1).copyIndicesArray(t.indices));
            }
            for (var s in this.groups = t.groups, t.morphTargets) {
                for (var c = [], h = t.morphTargets[s], l = 0, u = h.length; l < u; l++) {
                    var p = h[l], d = new un(3 * p.length, 3);
                    c.push(d.copyVector3sArray(p));
                }
                this.morphAttributes[s] = c;
            }
            if (t.skinIndices.length > 0) {
                var f = new un(4 * t.skinIndices.length, 4);
                this.addAttribute("skinIndex", f.copyVector4sArray(t.skinIndices));
            }
            if (t.skinWeights.length > 0) {
                var m = new un(4 * t.skinWeights.length, 4);
                this.addAttribute("skinWeight", m.copyVector4sArray(t.skinWeights));
            }
            return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), 
            null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this;
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new Ni());
            var t = this.attributes.position;
            void 0 !== t ? this.boundingBox.setFromBufferAttribute(t) : this.boundingBox.makeEmpty(), 
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
        },
        computeBoundingSphere: function() {
            var t = new Ni(), e = new _e();
            return function() {
                null === this.boundingSphere && (this.boundingSphere = new Fi());
                var i = this.attributes.position;
                if (i) {
                    var n = this.boundingSphere.center;
                    t.setFromBufferAttribute(i), t.getCenter(n);
                    for (var r = 0, a = 0, o = i.count; a < o; a++) e.x = i.getX(a), e.y = i.getY(a), 
                    e.z = i.getZ(a), r = Math.max(r, n.distanceToSquared(e));
                    this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
                }
            };
        }(),
        computeFaceNormals: function() {},
        computeVertexNormals: function() {
            var t = this.index, e = this.attributes, i = this.groups;
            if (e.position) {
                var n = e.position.array;
                if (void 0 === e.normal) this.addAttribute("normal", new nn(new Float32Array(n.length), 3)); else for (var r = e.normal.array, a = 0, o = r.length; a < o; a++) r[a] = 0;
                var s, c, h, l = e.normal.array, u = new _e(), p = new _e(), d = new _e(), f = new _e(), m = new _e();
                if (t) {
                    var g = t.array;
                    0 === i.length && this.addGroup(0, g.length);
                    for (var v = 0, y = i.length; v < y; ++v) {
                        var x = i[v], b = x.start;
                        for (a = b, o = b + x.count; a < o; a += 3) s = 3 * g[a + 0], c = 3 * g[a + 1], 
                        h = 3 * g[a + 2], u.fromArray(n, s), p.fromArray(n, c), d.fromArray(n, h), f.subVectors(d, p), 
                        m.subVectors(u, p), f.cross(m), l[s] += f.x, l[s + 1] += f.y, l[s + 2] += f.z, l[c] += f.x, 
                        l[c + 1] += f.y, l[c + 2] += f.z, l[h] += f.x, l[h + 1] += f.y, l[h + 2] += f.z;
                    }
                } else for (a = 0, o = n.length; a < o; a += 9) u.fromArray(n, a), p.fromArray(n, a + 3), 
                d.fromArray(n, a + 6), f.subVectors(d, p), m.subVectors(u, p), f.cross(m), l[a] = f.x, 
                l[a + 1] = f.y, l[a + 2] = f.z, l[a + 3] = f.x, l[a + 4] = f.y, l[a + 5] = f.z, 
                l[a + 6] = f.x, l[a + 7] = f.y, l[a + 8] = f.z;
                this.normalizeNormals(), e.normal.needsUpdate = !0;
            }
        },
        merge: function(t, e) {
            if (t && t.isBufferGeometry) {
                void 0 === e && (e = 0);
                var i = this.attributes;
                for (var n in i) if (void 0 !== t.attributes[n]) for (var r = i[n].array, a = t.attributes[n], o = a.array, s = 0, c = a.itemSize * e; s < o.length; s++, 
                c++) r[c] = o[s];
                return this;
            }
            console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
        },
        normalizeNormals: function() {
            var t = new _e();
            return function() {
                for (var e = this.attributes.normal, i = 0, n = e.count; i < n; i++) t.x = e.getX(i), 
                t.y = e.getY(i), t.z = e.getZ(i), t.normalize(), e.setXYZ(i, t.x, t.y, t.z);
            };
        }(),
        toNonIndexed: function() {
            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), 
            this;
            var t = new Mn(), e = this.index.array, i = this.attributes;
            for (var n in i) {
                for (var r = i[n], a = r.array, o = r.itemSize, s = new a.constructor(e.length * o), c = 0, h = 0, l = 0, u = e.length; l < u; l++) {
                    c = e[l] * o;
                    for (var p = 0; p < o; p++) s[h++] = a[c++];
                }
                t.addAttribute(n, new nn(s, o));
            }
            return t;
        },
        toJSON: function() {
            var t = {
                metadata: {
                    version: 4.5,
                    type: "BufferGeometry",
                    generator: "BufferGeometry.toJSON"
                }
            };
            if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), 
            void 0 !== this.parameters) {
                var e = this.parameters;
                for (var i in e) void 0 !== e[i] && (t[i] = e[i]);
                return t;
            }
            t.data = {
                attributes: {}
            };
            var n = this.index;
            if (null !== n) {
                var r = Array.prototype.slice.call(n.array);
                t.data.index = {
                    type: n.array.constructor.name,
                    array: r
                };
            }
            var a = this.attributes;
            for (var i in a) {
                var o = a[i];
                r = Array.prototype.slice.call(o.array);
                t.data.attributes[i] = {
                    itemSize: o.itemSize,
                    type: o.array.constructor.name,
                    array: r,
                    normalized: o.normalized
                };
            }
            var s = this.groups;
            s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
            var c = this.boundingSphere;
            return null !== c && (t.data.boundingSphere = {
                center: c.center.toArray(),
                radius: c.radius
            }), t;
        },
        clone: function() {
            return new Mn().copy(this);
        },
        copy: function(t) {
            var e, i, n;
            this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], 
            this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
            var r = t.index;
            null !== r && this.setIndex(r.clone());
            var a = t.attributes;
            for (e in a) {
                var o = a[e];
                this.addAttribute(e, o.clone());
            }
            var s = t.morphAttributes;
            for (e in s) {
                var c = [], h = s[e];
                for (i = 0, n = h.length; i < n; i++) c.push(h[i].clone());
                this.morphAttributes[e] = c;
            }
            var l = t.groups;
            for (i = 0, n = l.length; i < n; i++) {
                var u = l[i];
                this.addGroup(u.start, u.count, u.materialIndex);
            }
            var p = t.boundingBox;
            null !== p && (this.boundingBox = p.clone());
            var d = t.boundingSphere;
            return null !== d && (this.boundingSphere = d.clone()), this.drawRange.start = t.drawRange.start, 
            this.drawRange.count = t.drawRange.count, this;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }), En.prototype = Object.create(en.prototype), En.prototype.constructor = En, Tn.prototype = Object.create(Mn.prototype), 
    Tn.prototype.constructor = Tn, Sn.prototype = Object.create(en.prototype), Sn.prototype.constructor = Sn, 
    An.prototype = Object.create(Mn.prototype), An.prototype.constructor = An, Rn.prototype = Object.create(Ui.prototype), 
    Rn.prototype.constructor = Rn, Rn.prototype.isMeshBasicMaterial = !0, Rn.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, 
        this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, 
        this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, 
        this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, 
        this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, 
        this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, 
        this.skinning = t.skinning, this.morphTargets = t.morphTargets, this;
    }, Ln.prototype = Object.create(Ui.prototype), Ln.prototype.constructor = Ln, Ln.prototype.isShaderMaterial = !0, 
    Ln.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.fragmentShader = t.fragmentShader, 
        this.vertexShader = t.vertexShader, this.uniforms = yi.clone(t.uniforms), this.defines = t.defines, 
        this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, 
        this.clipping = t.clipping, this.skinning = t.skinning, this.morphTargets = t.morphTargets, 
        this.morphNormals = t.morphNormals, this.extensions = t.extensions, this;
    }, Ln.prototype.toJSON = function(t) {
        var e = Ui.prototype.toJSON.call(this, t);
        return e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, 
        e;
    }, Object.assign(Pn.prototype, {
        set: function(t, e) {
            return this.origin.copy(t), this.direction.copy(e), this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
        },
        at: function(t, e) {
            return (e || new _e()).copy(this.direction).multiplyScalar(t).add(this.origin);
        },
        lookAt: function(t) {
            return this.direction.copy(t).sub(this.origin).normalize(), this;
        },
        recast: function() {
            var t = new _e();
            return function(e) {
                return this.origin.copy(this.at(e, t)), this;
            };
        }(),
        closestPointToPoint: function(t, e) {
            var i = e || new _e();
            i.subVectors(t, this.origin);
            var n = i.dot(this.direction);
            return n < 0 ? i.copy(this.origin) : i.copy(this.direction).multiplyScalar(n).add(this.origin);
        },
        distanceToPoint: function(t) {
            return Math.sqrt(this.distanceSqToPoint(t));
        },
        distanceSqToPoint: function() {
            var t = new _e();
            return function(e) {
                var i = t.subVectors(e, this.origin).dot(this.direction);
                return i < 0 ? this.origin.distanceToSquared(e) : (t.copy(this.direction).multiplyScalar(i).add(this.origin), 
                t.distanceToSquared(e));
            };
        }(),
        distanceSqToSegment: (gn = new _e(), vn = new _e(), yn = new _e(), function(t, e, i, n) {
            gn.copy(t).add(e).multiplyScalar(.5), vn.copy(e).sub(t).normalize(), yn.copy(this.origin).sub(gn);
            var r, a, o, s, c = .5 * t.distanceTo(e), h = -this.direction.dot(vn), l = yn.dot(this.direction), u = -yn.dot(vn), p = yn.lengthSq(), d = Math.abs(1 - h * h);
            if (d > 0) if (a = h * l - u, s = c * d, (r = h * u - l) >= 0) if (a >= -s) if (a <= s) {
                var f = 1 / d;
                o = (r *= f) * (r + h * (a *= f) + 2 * l) + a * (h * r + a + 2 * u) + p;
            } else a = c, o = -(r = Math.max(0, -(h * a + l))) * r + a * (a + 2 * u) + p; else a = -c, 
            o = -(r = Math.max(0, -(h * a + l))) * r + a * (a + 2 * u) + p; else a <= -s ? o = -(r = Math.max(0, -(-h * c + l))) * r + (a = r > 0 ? -c : Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p : a <= s ? (r = 0, 
            o = (a = Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p) : o = -(r = Math.max(0, -(h * c + l))) * r + (a = r > 0 ? c : Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p; else a = h > 0 ? -c : c, 
            o = -(r = Math.max(0, -(h * a + l))) * r + a * (a + 2 * u) + p;
            return i && i.copy(this.direction).multiplyScalar(r).add(this.origin), n && n.copy(vn).multiplyScalar(a).add(gn), 
            o;
        }),
        intersectSphere: function() {
            var t = new _e();
            return function(e, i) {
                t.subVectors(e.center, this.origin);
                var n = t.dot(this.direction), r = t.dot(t) - n * n, a = e.radius * e.radius;
                if (r > a) return null;
                var o = Math.sqrt(a - r), s = n - o, c = n + o;
                return s < 0 && c < 0 ? null : s < 0 ? this.at(c, i) : this.at(s, i);
            };
        }(),
        intersectsSphere: function(t) {
            return this.distanceToPoint(t.center) <= t.radius;
        },
        distanceToPlane: function(t) {
            var e = t.normal.dot(this.direction);
            if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
            var i = -(this.origin.dot(t.normal) + t.constant) / e;
            return i >= 0 ? i : null;
        },
        intersectPlane: function(t, e) {
            var i = this.distanceToPlane(t);
            return null === i ? null : this.at(i, e);
        },
        intersectsPlane: function(t) {
            var e = t.distanceToPoint(this.origin);
            return 0 === e || t.normal.dot(this.direction) * e < 0;
        },
        intersectBox: function(t, e) {
            var i, n, r, a, o, s, c = 1 / this.direction.x, h = 1 / this.direction.y, l = 1 / this.direction.z, u = this.origin;
            return c >= 0 ? (i = (t.min.x - u.x) * c, n = (t.max.x - u.x) * c) : (i = (t.max.x - u.x) * c, 
            n = (t.min.x - u.x) * c), h >= 0 ? (r = (t.min.y - u.y) * h, a = (t.max.y - u.y) * h) : (r = (t.max.y - u.y) * h, 
            a = (t.min.y - u.y) * h), i > a || r > n ? null : ((r > i || i != i) && (i = r), 
            (a < n || n != n) && (n = a), l >= 0 ? (o = (t.min.z - u.z) * l, s = (t.max.z - u.z) * l) : (o = (t.max.z - u.z) * l, 
            s = (t.min.z - u.z) * l), i > s || o > n ? null : ((o > i || i != i) && (i = o), 
            (s < n || n != n) && (n = s), n < 0 ? null : this.at(i >= 0 ? i : n, e)));
        },
        intersectsBox: (mn = new _e(), function(t) {
            return null !== this.intersectBox(t, mn);
        }),
        intersectTriangle: function() {
            var t = new _e(), e = new _e(), i = new _e(), n = new _e();
            return function(r, a, o, s, c) {
                e.subVectors(a, r), i.subVectors(o, r), n.crossVectors(e, i);
                var h, l = this.direction.dot(n);
                if (l > 0) {
                    if (s) return null;
                    h = 1;
                } else {
                    if (!(l < 0)) return null;
                    h = -1, l = -l;
                }
                t.subVectors(this.origin, r);
                var u = h * this.direction.dot(i.crossVectors(t, i));
                if (u < 0) return null;
                var p = h * this.direction.dot(e.cross(t));
                if (p < 0) return null;
                if (u + p > l) return null;
                var d = -h * t.dot(n);
                return d < 0 ? null : this.at(d / l, c);
            };
        }(),
        applyMatrix4: function(t) {
            return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
        },
        equals: function(t) {
            return t.origin.equals(this.origin) && t.direction.equals(this.direction);
        }
    }), Object.assign(Cn.prototype, {
        set: function(t, e) {
            return this.start.copy(t), this.end.copy(e), this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.start.copy(t.start), this.end.copy(t.end), this;
        },
        getCenter: function(t) {
            return (t || new _e()).addVectors(this.start, this.end).multiplyScalar(.5);
        },
        delta: function(t) {
            return (t || new _e()).subVectors(this.end, this.start);
        },
        distanceSq: function() {
            return this.start.distanceToSquared(this.end);
        },
        distance: function() {
            return this.start.distanceTo(this.end);
        },
        at: function(t, e) {
            var i = e || new _e();
            return this.delta(i).multiplyScalar(t).add(this.start);
        },
        closestPointToPointParameter: (xn = new _e(), bn = new _e(), function(t, e) {
            xn.subVectors(t, this.start), bn.subVectors(this.end, this.start);
            var i = bn.dot(bn), n = bn.dot(xn) / i;
            return e && (n = ve.clamp(n, 0, 1)), n;
        }),
        closestPointToPoint: function(t, e, i) {
            var n = this.closestPointToPointParameter(t, e), r = i || new _e();
            return this.delta(r).multiplyScalar(n).add(this.start);
        },
        applyMatrix4: function(t) {
            return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this;
        },
        equals: function(t) {
            return t.start.equals(this.start) && t.end.equals(this.end);
        }
    }), Object.assign(In, {
        normal: (_n = new _e(), function(t, e, i, n) {
            var r = n || new _e();
            r.subVectors(i, e), _n.subVectors(t, e), r.cross(_n);
            var a = r.lengthSq();
            return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0);
        }),
        barycoordFromPoint: function() {
            var t = new _e(), e = new _e(), i = new _e();
            return function(n, r, a, o, s) {
                t.subVectors(o, r), e.subVectors(a, r), i.subVectors(n, r);
                var c = t.dot(t), h = t.dot(e), l = t.dot(i), u = e.dot(e), p = e.dot(i), d = c * u - h * h, f = s || new _e();
                if (0 === d) return f.set(-2, -1, -1);
                var m = 1 / d, g = (u * l - h * p) * m, v = (c * p - h * l) * m;
                return f.set(1 - g - v, v, g);
            };
        }(),
        containsPoint: function() {
            var t = new _e();
            return function(e, i, n, r) {
                var a = In.barycoordFromPoint(e, i, n, r, t);
                return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1;
            };
        }()
    }), Object.assign(In.prototype, {
        set: function(t, e, i) {
            return this.a.copy(t), this.b.copy(e), this.c.copy(i), this;
        },
        setFromPointsAndIndices: function(t, e, i, n) {
            return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[n]), this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
        },
        area: function() {
            var t = new _e(), e = new _e();
            return function() {
                return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length();
            };
        }(),
        midpoint: function(t) {
            return (t || new _e()).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        },
        normal: function(t) {
            return In.normal(this.a, this.b, this.c, t);
        },
        plane: function(t) {
            return (t || new Bi()).setFromCoplanarPoints(this.a, this.b, this.c);
        },
        barycoordFromPoint: function(t, e) {
            return In.barycoordFromPoint(t, this.a, this.b, this.c, e);
        },
        containsPoint: function(t) {
            return In.containsPoint(t, this.a, this.b, this.c);
        },
        closestPointToPoint: function() {
            var t = new Bi(), e = [ new Cn(), new Cn(), new Cn() ], i = new _e(), n = new _e();
            return function(r, a) {
                var o = a || new _e(), s = 1 / 0;
                if (t.setFromCoplanarPoints(this.a, this.b, this.c), t.projectPoint(r, i), !0 === this.containsPoint(i)) o.copy(i); else {
                    e[0].set(this.a, this.b), e[1].set(this.b, this.c), e[2].set(this.c, this.a);
                    for (var c = 0; c < e.length; c++) {
                        e[c].closestPointToPoint(i, !0, n);
                        var h = i.distanceToSquared(n);
                        h < s && (s = h, o.copy(n));
                    }
                }
                return o;
            };
        }(),
        equals: function(t) {
            return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
        }
    }), Un.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: Un,
        isMesh: !0,
        setDrawMode: function(t) {
            this.drawMode = t;
        },
        copy: function(t) {
            return Zi.prototype.copy.call(this, t), this.drawMode = t.drawMode, void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), 
            void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), 
            this;
        },
        updateMorphTargets: function() {
            var t, e, i, n = this.geometry;
            if (n.isBufferGeometry) {
                var r = n.morphAttributes, a = Object.keys(r);
                if (a.length > 0) {
                    var o = r[a[0]];
                    if (void 0 !== o) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, 
                    t = 0, e = o.length; t < e; t++) i = o[t].name || String(t), this.morphTargetInfluences.push(0), 
                    this.morphTargetDictionary[i] = t;
                }
            } else {
                var s = n.morphTargets;
                if (void 0 !== s && s.length > 0) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, 
                t = 0, e = s.length; t < e; t++) i = s[t].name || String(t), this.morphTargetInfluences.push(0), 
                this.morphTargetDictionary[i] = t;
            }
        },
        raycast: function() {
            var t = new xe(), e = new Pn(), i = new Fi(), n = new _e(), r = new _e(), a = new _e(), o = new _e(), s = new _e(), c = new _e(), h = new ye(), l = new ye(), u = new ye(), p = new _e(), d = new _e(), f = new _e();
            function m(t, e, i, n, r, a, o) {
                return In.barycoordFromPoint(t, e, i, n, p), r.multiplyScalar(p.x), a.multiplyScalar(p.y), 
                o.multiplyScalar(p.z), r.add(a).add(o), r.clone();
            }
            function g(t, e, i, n, r, a, o, s) {
                if (null === (e.side === M ? n.intersectTriangle(o, a, r, !0, s) : n.intersectTriangle(r, a, o, e.side !== E, s))) return null;
                f.copy(s), f.applyMatrix4(t.matrixWorld);
                var c = i.ray.origin.distanceTo(f);
                return c < i.near || c > i.far ? null : {
                    distance: c,
                    point: f.clone(),
                    object: t
                };
            }
            function v(t, e, i, o, s, c, p, f) {
                n.fromBufferAttribute(o, c), r.fromBufferAttribute(o, p), a.fromBufferAttribute(o, f);
                var v = g(t, t.material, e, i, n, r, a, d);
                return v && (s && (h.fromBufferAttribute(s, c), l.fromBufferAttribute(s, p), u.fromBufferAttribute(s, f), 
                v.uv = m(d, n, r, a, h, l, u)), v.face = new Ki(c, p, f, In.normal(n, r, a)), v.faceIndex = c), 
                v;
            }
            return function(p, f) {
                var y, x = this.geometry, b = this.material, _ = this.matrixWorld;
                if (void 0 !== b && (null === x.boundingSphere && x.computeBoundingSphere(), i.copy(x.boundingSphere), 
                i.applyMatrix4(_), !1 !== p.ray.intersectsSphere(i) && (t.getInverse(_), e.copy(p.ray).applyMatrix4(t), 
                null === x.boundingBox || !1 !== e.intersectsBox(x.boundingBox)))) if (x.isBufferGeometry) {
                    var w, M, E, T, S, A = x.index, R = x.attributes.position, L = x.attributes.uv;
                    if (null !== A) for (T = 0, S = A.count; T < S; T += 3) w = A.getX(T), M = A.getX(T + 1), 
                    E = A.getX(T + 2), (y = v(this, p, e, R, L, w, M, E)) && (y.faceIndex = Math.floor(T / 3), 
                    f.push(y)); else if (void 0 !== R) for (T = 0, S = R.count; T < S; T += 3) (y = v(this, p, e, R, L, w = T, M = T + 1, E = T + 2)) && (y.index = w, 
                    f.push(y));
                } else if (x.isGeometry) {
                    var P, C, I, U, D = Array.isArray(b), O = x.vertices, N = x.faces, F = x.faceVertexUvs[0];
                    F.length > 0 && (U = F);
                    for (var B = 0, z = N.length; B < z; B++) {
                        var G = N[B], H = D ? b[G.materialIndex] : b;
                        if (void 0 !== H) {
                            if (P = O[G.a], C = O[G.b], I = O[G.c], !0 === H.morphTargets) {
                                var V = x.morphTargets, k = this.morphTargetInfluences;
                                n.set(0, 0, 0), r.set(0, 0, 0), a.set(0, 0, 0);
                                for (var j = 0, W = V.length; j < W; j++) {
                                    var X = k[j];
                                    if (0 !== X) {
                                        var q = V[j].vertices;
                                        n.addScaledVector(o.subVectors(q[G.a], P), X), r.addScaledVector(s.subVectors(q[G.b], C), X), 
                                        a.addScaledVector(c.subVectors(q[G.c], I), X);
                                    }
                                }
                                n.add(P), r.add(C), a.add(I), P = n, C = r, I = a;
                            }
                            if (y = g(this, H, p, e, P, C, I, d)) {
                                if (U && U[B]) {
                                    var Y = U[B];
                                    h.copy(Y[0]), l.copy(Y[1]), u.copy(Y[2]), y.uv = m(d, P, C, I, h, l, u);
                                }
                                y.face = G, y.faceIndex = B, f.push(y);
                            }
                        }
                    }
                }
            };
        }(),
        clone: function() {
            return new this.constructor(this.geometry, this.material).copy(this);
        }
    });
    var Gn, Hn, Vn, kn, jn, Wn, Xn = 0;
    function qn(t) {
        switch (t) {
          case ce:
            return [ "Linear", "( value )" ];

          case he:
            return [ "sRGB", "( value )" ];

          case ue:
            return [ "RGBE", "( value )" ];

          case pe:
            return [ "RGBM", "( value, 7.0 )" ];

          case de:
            return [ "RGBM", "( value, 16.0 )" ];

          case fe:
            return [ "RGBD", "( value, 256.0 )" ];

          case le:
            return [ "Gamma", "( value, float( GAMMA_FACTOR ) )" ];

          default:
            throw new Error("unsupported encoding: " + t);
        }
    }
    function Yn(t, e) {
        var i = qn(e);
        return "vec4 " + t + "( vec4 value ) { return " + i[0] + "ToLinear" + i[1] + "; }";
    }
    function Zn(t) {
        return "" !== t;
    }
    function Jn(t, e) {
        return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights);
    }
    function Qn(t) {
        return t.replace(/^[ \t]*#include +<([\w\d.]+)>/gm, function(t, e) {
            var i = xi[e];
            if (void 0 === i) throw new Error("Can not resolve #include <" + e + ">");
            return Qn(i);
        });
    }
    function Kn(t) {
        return t.replace(/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g, function(t, e, i, n) {
            for (var r = "", a = parseInt(e); a < parseInt(i); a++) r += n.replace(/\[ i \]/g, "[ " + a + " ]");
            return r;
        });
    }
    function $n(t, e, i, n, r, a) {
        var o = t.context, s = n.defines, c = r.vertexShader, h = r.fragmentShader, l = "SHADOWMAP_TYPE_BASIC";
        a.shadowMapType === b ? l = "SHADOWMAP_TYPE_PCF" : a.shadowMapType === _ && (l = "SHADOWMAP_TYPE_PCF_SOFT");
        var u = "ENVMAP_TYPE_CUBE", p = "ENVMAP_MODE_REFLECTION", d = "ENVMAP_BLENDING_MULTIPLY";
        if (a.envMap) {
            switch (n.envMap.mapping) {
              case pt:
              case dt:
                u = "ENVMAP_TYPE_CUBE";
                break;

              case vt:
              case yt:
                u = "ENVMAP_TYPE_CUBE_UV";
                break;

              case ft:
              case mt:
                u = "ENVMAP_TYPE_EQUIREC";
                break;

              case gt:
                u = "ENVMAP_TYPE_SPHERE";
            }
            switch (n.envMap.mapping) {
              case dt:
              case mt:
                p = "ENVMAP_MODE_REFRACTION";
            }
            switch (n.combine) {
              case rt:
                d = "ENVMAP_BLENDING_MULTIPLY";
                break;

              case at:
                d = "ENVMAP_BLENDING_MIX";
                break;

              case ot:
                d = "ENVMAP_BLENDING_ADD";
            }
        }
        var f, m, g, v, y, x = t.gammaFactor > 0 ? t.gammaFactor : 1, w = function(t, e, i) {
            return [ (t = t || {}).derivatives || e.envMapCubeUV || e.bumpMap || e.normalMap || e.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (t.fragDepth || e.logarithmicDepthBuffer) && i.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", t.drawBuffers && i.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (t.shaderTextureLOD || e.envMap) && i.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : "" ].filter(Zn).join("\n");
        }(n.extensions, a, e), M = function(t) {
            var e = [];
            for (var i in t) {
                var n = t[i];
                !1 !== n && e.push("#define " + i + " " + n);
            }
            return e.join("\n");
        }(s), E = o.createProgram();
        n.isRawShaderMaterial ? ((f = [ M ].filter(Zn).join("\n")).length > 0 && (f += "\n"), 
        (m = [ w, M ].filter(Zn).join("\n")).length > 0 && (m += "\n")) : (f = [ "precision " + a.precision + " float;", "precision " + a.precision + " int;", "#define SHADER_NAME " + r.name, M, a.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + x, "#define MAX_BONES " + a.maxBones, a.useFog && a.fog ? "#define USE_FOG" : "", a.useFog && a.fogExp ? "#define FOG_EXP2" : "", a.map ? "#define USE_MAP" : "", a.envMap ? "#define USE_ENVMAP" : "", a.envMap ? "#define " + p : "", a.lightMap ? "#define USE_LIGHTMAP" : "", a.aoMap ? "#define USE_AOMAP" : "", a.emissiveMap ? "#define USE_EMISSIVEMAP" : "", a.bumpMap ? "#define USE_BUMPMAP" : "", a.normalMap ? "#define USE_NORMALMAP" : "", a.displacementMap && a.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", a.specularMap ? "#define USE_SPECULARMAP" : "", a.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", a.metalnessMap ? "#define USE_METALNESSMAP" : "", a.alphaMap ? "#define USE_ALPHAMAP" : "", a.vertexColors ? "#define USE_COLOR" : "", a.flatShading ? "#define FLAT_SHADED" : "", a.skinning ? "#define USE_SKINNING" : "", a.useVertexTexture ? "#define BONE_TEXTURE" : "", a.morphTargets ? "#define USE_MORPHTARGETS" : "", a.morphNormals && !1 === a.flatShading ? "#define USE_MORPHNORMALS" : "", a.doubleSided ? "#define DOUBLE_SIDED" : "", a.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + a.numClippingPlanes, a.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", a.shadowMapEnabled ? "#define " + l : "", a.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", a.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", a.logarithmicDepthBuffer && e.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n" ].filter(Zn).join("\n"), 
        m = [ w, "precision " + a.precision + " float;", "precision " + a.precision + " int;", "#define SHADER_NAME " + r.name, M, a.alphaTest ? "#define ALPHATEST " + a.alphaTest : "", "#define GAMMA_FACTOR " + x, a.useFog && a.fog ? "#define USE_FOG" : "", a.useFog && a.fogExp ? "#define FOG_EXP2" : "", a.map ? "#define USE_MAP" : "", a.envMap ? "#define USE_ENVMAP" : "", a.envMap ? "#define " + u : "", a.envMap ? "#define " + p : "", a.envMap ? "#define " + d : "", a.lightMap ? "#define USE_LIGHTMAP" : "", a.aoMap ? "#define USE_AOMAP" : "", a.emissiveMap ? "#define USE_EMISSIVEMAP" : "", a.bumpMap ? "#define USE_BUMPMAP" : "", a.normalMap ? "#define USE_NORMALMAP" : "", a.specularMap ? "#define USE_SPECULARMAP" : "", a.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", a.metalnessMap ? "#define USE_METALNESSMAP" : "", a.alphaMap ? "#define USE_ALPHAMAP" : "", a.vertexColors ? "#define USE_COLOR" : "", a.gradientMap ? "#define USE_GRADIENTMAP" : "", a.flatShading ? "#define FLAT_SHADED" : "", a.doubleSided ? "#define DOUBLE_SIDED" : "", a.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + a.numClippingPlanes, "#define UNION_CLIPPING_PLANES " + (a.numClippingPlanes - a.numClipIntersection), a.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", a.shadowMapEnabled ? "#define " + l : "", a.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", a.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", a.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", a.logarithmicDepthBuffer && e.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", a.envMap && e.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", a.toneMapping !== st ? "#define TONE_MAPPING" : "", a.toneMapping !== st ? xi.tonemapping_pars_fragment : "", a.toneMapping !== st ? function(t, e) {
            var i;
            switch (e) {
              case ct:
                i = "Linear";
                break;

              case ht:
                i = "Reinhard";
                break;

              case lt:
                i = "Uncharted2";
                break;

              case ut:
                i = "OptimizedCineon";
                break;

              default:
                throw new Error("unsupported toneMapping: " + e);
            }
            return "vec3 " + t + "( vec3 color ) { return " + i + "ToneMapping( color ); }";
        }("toneMapping", a.toneMapping) : "", a.dithering ? "#define DITHERING" : "", a.outputEncoding || a.mapEncoding || a.envMapEncoding || a.emissiveMapEncoding ? xi.encodings_pars_fragment : "", a.mapEncoding ? Yn("mapTexelToLinear", a.mapEncoding) : "", a.envMapEncoding ? Yn("envMapTexelToLinear", a.envMapEncoding) : "", a.emissiveMapEncoding ? Yn("emissiveMapTexelToLinear", a.emissiveMapEncoding) : "", a.outputEncoding ? (g = "linearToOutputTexel", 
        v = a.outputEncoding, y = qn(v), "vec4 " + g + "( vec4 value ) { return LinearTo" + y[0] + y[1] + "; }") : "", a.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n" ].filter(Zn).join("\n")), 
        c = Jn(c = Qn(c), a), h = Jn(h = Qn(h), a), n.isShaderMaterial || (c = Kn(c), h = Kn(h));
        var T = f + c, S = m + h, A = zn(o, o.VERTEX_SHADER, T), R = zn(o, o.FRAGMENT_SHADER, S);
        o.attachShader(E, A), o.attachShader(E, R), void 0 !== n.index0AttributeName ? o.bindAttribLocation(E, 0, n.index0AttributeName) : !0 === a.morphTargets && o.bindAttribLocation(E, 0, "position"), 
        o.linkProgram(E);
        var L, P, C = o.getProgramInfoLog(E), I = o.getShaderInfoLog(A), U = o.getShaderInfoLog(R), D = !0, O = !0;
        return !1 === o.getProgramParameter(E, o.LINK_STATUS) ? (D = !1, console.error("THREE.WebGLProgram: shader error: ", o.getError(), "gl.VALIDATE_STATUS", o.getProgramParameter(E, o.VALIDATE_STATUS), "gl.getProgramInfoLog", C, I, U)) : "" !== C ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", C) : "" !== I && "" !== U || (O = !1), 
        O && (this.diagnostics = {
            runnable: D,
            material: n,
            programLog: C,
            vertexShader: {
                log: I,
                prefix: f
            },
            fragmentShader: {
                log: U,
                prefix: m
            }
        }), o.deleteShader(A), o.deleteShader(R), this.getUniforms = function() {
            return void 0 === L && (L = new fi(o, E, t)), L;
        }, this.getAttributes = function() {
            return void 0 === P && (P = function(t, e) {
                for (var i = {}, n = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), r = 0; r < n; r++) {
                    var a = t.getActiveAttrib(e, r).name;
                    i[a] = t.getAttribLocation(e, a);
                }
                return i;
            }(o, E)), P;
        }, this.destroy = function() {
            o.deleteProgram(E), this.program = void 0;
        }, Object.defineProperties(this, {
            uniforms: {
                get: function() {
                    return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms();
                }
            },
            attributes: {
                get: function() {
                    return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), 
                    this.getAttributes();
                }
            }
        }), this.id = Xn++, this.code = i, this.usedTimes = 1, this.program = E, this.vertexShader = A, 
        this.fragmentShader = R, this;
    }
    function tr(t, e, i) {
        var n = [], r = {
            MeshDepthMaterial: "depth",
            MeshDistanceMaterial: "distanceRGBA",
            MeshNormalMaterial: "normal",
            MeshBasicMaterial: "basic",
            MeshLambertMaterial: "lambert",
            MeshPhongMaterial: "phong",
            MeshToonMaterial: "phong",
            MeshStandardMaterial: "physical",
            MeshPhysicalMaterial: "physical",
            LineBasicMaterial: "basic",
            LineDashedMaterial: "dashed",
            PointsMaterial: "points",
            ShadowMaterial: "shadow"
        }, a = [ "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering" ];
        function o(t, e) {
            var i;
            return t ? t.isTexture ? i = t.encoding : t.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), 
            i = t.texture.encoding) : i = ce, i === ce && e && (i = le), i;
        }
        this.getParameters = function(e, n, a, s, c, h, l) {
            var u = r[e.type], p = l.isSkinnedMesh ? function(t) {
                var e = t.skeleton.bones;
                if (i.floatVertexTextures) return 1024;
                var n = i.maxVertexUniforms, r = Math.floor((n - 20) / 4), a = Math.min(r, e.length);
                return a < e.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + e.length + " bones. This GPU supports " + a + "."), 
                0) : a;
            }(l) : 0, d = i.precision;
            null !== e.precision && (d = i.getMaxPrecision(e.precision)) !== e.precision && console.warn("THREE.WebGLProgram.getParameters:", e.precision, "not supported, using", d, "instead.");
            var f = t.getRenderTarget();
            return {
                shaderID: u,
                precision: d,
                supportsVertexTextures: i.vertexTextures,
                outputEncoding: o(f ? f.texture : null, t.gammaOutput),
                map: !!e.map,
                mapEncoding: o(e.map, t.gammaInput),
                envMap: !!e.envMap,
                envMapMode: e.envMap && e.envMap.mapping,
                envMapEncoding: o(e.envMap, t.gammaInput),
                envMapCubeUV: !!e.envMap && (e.envMap.mapping === vt || e.envMap.mapping === yt),
                lightMap: !!e.lightMap,
                aoMap: !!e.aoMap,
                emissiveMap: !!e.emissiveMap,
                emissiveMapEncoding: o(e.emissiveMap, t.gammaInput),
                bumpMap: !!e.bumpMap,
                normalMap: !!e.normalMap,
                displacementMap: !!e.displacementMap,
                roughnessMap: !!e.roughnessMap,
                metalnessMap: !!e.metalnessMap,
                specularMap: !!e.specularMap,
                alphaMap: !!e.alphaMap,
                gradientMap: !!e.gradientMap,
                combine: e.combine,
                vertexColors: e.vertexColors,
                fog: !!s,
                useFog: e.fog,
                fogExp: s && s.isFogExp2,
                flatShading: e.flatShading,
                sizeAttenuation: e.sizeAttenuation,
                logarithmicDepthBuffer: i.logarithmicDepthBuffer,
                skinning: e.skinning && p > 0,
                maxBones: p,
                useVertexTexture: i.floatVertexTextures,
                morphTargets: e.morphTargets,
                morphNormals: e.morphNormals,
                maxMorphTargets: t.maxMorphTargets,
                maxMorphNormals: t.maxMorphNormals,
                numDirLights: n.directional.length,
                numPointLights: n.point.length,
                numSpotLights: n.spot.length,
                numRectAreaLights: n.rectArea.length,
                numHemiLights: n.hemi.length,
                numClippingPlanes: c,
                numClipIntersection: h,
                dithering: e.dithering,
                shadowMapEnabled: t.shadowMap.enabled && l.receiveShadow && a.length > 0,
                shadowMapType: t.shadowMap.type,
                toneMapping: t.toneMapping,
                physicallyCorrectLights: t.physicallyCorrectLights,
                premultipliedAlpha: e.premultipliedAlpha,
                alphaTest: e.alphaTest,
                doubleSided: e.side === E,
                flipSided: e.side === M,
                depthPacking: void 0 !== e.depthPacking && e.depthPacking
            };
        }, this.getProgramCode = function(e, i) {
            var n = [];
            if (i.shaderID ? n.push(i.shaderID) : (n.push(e.fragmentShader), n.push(e.vertexShader)), 
            void 0 !== e.defines) for (var r in e.defines) n.push(r), n.push(e.defines[r]);
            for (var o = 0; o < a.length; o++) n.push(i[a[o]]);
            return n.push(e.onBeforeCompile.toString()), n.push(t.gammaOutput), n.join();
        }, this.acquireProgram = function(i, r, a, o) {
            for (var s, c = 0, h = n.length; c < h; c++) {
                var l = n[c];
                if (l.code === o) {
                    ++(s = l).usedTimes;
                    break;
                }
            }
            return void 0 === s && (s = new $n(t, e, o, i, r, a), n.push(s)), s;
        }, this.releaseProgram = function(t) {
            if (0 == --t.usedTimes) {
                var e = n.indexOf(t);
                n[e] = n[n.length - 1], n.pop(), t.destroy();
            }
        }, this.programs = n;
    }
    function er(t, e, i, n, r, a, o) {
        var s = "undefined" != typeof WebGL2RenderingContext && t instanceof window.WebGL2RenderingContext;
        function c(t, e) {
            if (t.width > e || t.height > e) {
                var i = e / Math.max(t.width, t.height), n = document.createElement("canvas");
                return n.width = Math.floor(t.width * i), n.height = Math.floor(t.height * i), n.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, n.width, n.height), 
                console.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + n.width + "x" + n.height, t), 
                n;
            }
            return t;
        }
        function h(t) {
            return ve.isPowerOfTwo(t.width) && ve.isPowerOfTwo(t.height);
        }
        function l(t, e) {
            return t.generateMipmaps && e && t.minFilter !== wt && t.minFilter !== Tt;
        }
        function u(e) {
            return e === wt || e === Mt || e === Et ? t.NEAREST : t.LINEAR;
        }
        function p(e) {
            var i = e.target;
            i.removeEventListener("dispose", p), function(e) {
                var i = n.get(e);
                if (e.image && i.__image__webglTextureCube) t.deleteTexture(i.__image__webglTextureCube); else {
                    if (void 0 === i.__webglInit) return;
                    t.deleteTexture(i.__webglTexture);
                }
                n.remove(e);
            }(i), o.textures--;
        }
        function d(e) {
            var i = e.target;
            i.removeEventListener("dispose", d), function(e) {
                var i = n.get(e), r = n.get(e.texture);
                if (!e) return;
                void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture);
                e.depthTexture && e.depthTexture.dispose();
                if (e.isWebGLRenderTargetCube) for (var a = 0; a < 6; a++) t.deleteFramebuffer(i.__webglFramebuffer[a]), 
                i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer[a]); else t.deleteFramebuffer(i.__webglFramebuffer), 
                i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer);
                n.remove(e.texture), n.remove(e);
            }(i), o.textures--;
        }
        function f(e, u) {
            var d = n.get(e);
            if (e.version > 0 && d.__version !== e.version) {
                var f = e.image;
                if (void 0 === f) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", e); else {
                    if (!1 !== f.complete) return void function(e, n, u) {
                        void 0 === e.__webglInit && (e.__webglInit = !0, n.addEventListener("dispose", p), 
                        e.__webglTexture = t.createTexture(), o.textures++);
                        i.activeTexture(t.TEXTURE0 + u), i.bindTexture(t.TEXTURE_2D, e.__webglTexture), 
                        t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, n.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), 
                        t.pixelStorei(t.UNPACK_ALIGNMENT, n.unpackAlignment);
                        var d = c(n.image, r.maxTextureSize);
                        (function(t) {
                            return t.wrapS !== bt || t.wrapT !== bt || t.minFilter !== wt && t.minFilter !== Tt;
                        })(n) && !1 === h(d) && (d = function(t) {
                            if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
                                var e = document.createElement("canvas");
                                return e.width = ve.floorPowerOfTwo(t.width), e.height = ve.floorPowerOfTwo(t.height), 
                                e.getContext("2d").drawImage(t, 0, 0, e.width, e.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + t.width + "x" + t.height + "). Resized to " + e.width + "x" + e.height, t), 
                                e;
                            }
                            return t;
                        }(d));
                        var f = h(d), g = a.convert(n.format), v = a.convert(n.type);
                        m(t.TEXTURE_2D, n, f);
                        var y, x = n.mipmaps;
                        if (n.isDepthTexture) {
                            var b = t.DEPTH_COMPONENT;
                            if (n.type === Dt) {
                                if (!s) throw new Error("Float Depth Texture only supported in WebGL2.0");
                                b = t.DEPTH_COMPONENT32F;
                            } else s && (b = t.DEPTH_COMPONENT16);
                            n.format === Xt && b === t.DEPTH_COMPONENT && n.type !== Ct && n.type !== Ut && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), 
                            n.type = Ct, v = a.convert(n.type)), n.format === qt && (b = t.DEPTH_STENCIL, n.type !== zt && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), 
                            n.type = zt, v = a.convert(n.type))), i.texImage2D(t.TEXTURE_2D, 0, b, d.width, d.height, 0, g, v, null);
                        } else if (n.isDataTexture) if (x.length > 0 && f) {
                            for (var _ = 0, w = x.length; _ < w; _++) y = x[_], i.texImage2D(t.TEXTURE_2D, _, g, y.width, y.height, 0, g, v, y.data);
                            n.generateMipmaps = !1;
                        } else i.texImage2D(t.TEXTURE_2D, 0, g, d.width, d.height, 0, g, v, d.data); else if (n.isCompressedTexture) for (var _ = 0, w = x.length; _ < w; _++) y = x[_], 
                        n.format !== Vt && n.format !== Ht ? i.getCompressedTextureFormats().indexOf(g) > -1 ? i.compressedTexImage2D(t.TEXTURE_2D, _, g, y.width, y.height, 0, y.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : i.texImage2D(t.TEXTURE_2D, _, g, y.width, y.height, 0, g, v, y.data); else if (x.length > 0 && f) {
                            for (var _ = 0, w = x.length; _ < w; _++) y = x[_], i.texImage2D(t.TEXTURE_2D, _, g, g, v, y);
                            n.generateMipmaps = !1;
                        } else i.texImage2D(t.TEXTURE_2D, 0, g, g, v, d);
                        l(n, f) && t.generateMipmap(t.TEXTURE_2D);
                        e.__version = n.version, n.onUpdate && n.onUpdate(n);
                    }(d, e, u);
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", e);
                }
            }
            i.activeTexture(t.TEXTURE0 + u), i.bindTexture(t.TEXTURE_2D, d.__webglTexture);
        }
        function m(i, o, s) {
            var c;
            if (s ? (t.texParameteri(i, t.TEXTURE_WRAP_S, a.convert(o.wrapS)), t.texParameteri(i, t.TEXTURE_WRAP_T, a.convert(o.wrapT)), 
            t.texParameteri(i, t.TEXTURE_MAG_FILTER, a.convert(o.magFilter)), t.texParameteri(i, t.TEXTURE_MIN_FILTER, a.convert(o.minFilter))) : (t.texParameteri(i, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), 
            t.texParameteri(i, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), o.wrapS === bt && o.wrapT === bt || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", o), 
            t.texParameteri(i, t.TEXTURE_MAG_FILTER, u(o.magFilter)), t.texParameteri(i, t.TEXTURE_MIN_FILTER, u(o.minFilter)), 
            o.minFilter !== wt && o.minFilter !== Tt && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", o)), 
            c = e.get("EXT_texture_filter_anisotropic")) {
                if (o.type === Dt && null === e.get("OES_texture_float_linear")) return;
                if (o.type === Ot && null === e.get("OES_texture_half_float_linear")) return;
                (o.anisotropy > 1 || n.get(o).__currentAnisotropy) && (t.texParameterf(i, c.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(o.anisotropy, r.getMaxAnisotropy())), 
                n.get(o).__currentAnisotropy = o.anisotropy);
            }
        }
        function g(e, r, o, s) {
            var c = a.convert(r.texture.format), h = a.convert(r.texture.type);
            i.texImage2D(s, 0, c, r.width, r.height, 0, c, h, null), t.bindFramebuffer(t.FRAMEBUFFER, e), 
            t.framebufferTexture2D(t.FRAMEBUFFER, o, s, n.get(r.texture).__webglTexture, 0), 
            t.bindFramebuffer(t.FRAMEBUFFER, null);
        }
        function v(e, i) {
            t.bindRenderbuffer(t.RENDERBUFFER, e), i.depthBuffer && !i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, i.width, i.height), 
            t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, e)) : i.depthBuffer && i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, i.width, i.height), 
            t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, e)) : t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i.width, i.height), 
            t.bindRenderbuffer(t.RENDERBUFFER, null);
        }
        function y(e) {
            var i = n.get(e), r = !0 === e.isWebGLRenderTargetCube;
            if (e.depthTexture) {
                if (r) throw new Error("target.depthTexture not supported in Cube render targets");
                !function(e, i) {
                    if (i && i.isWebGLRenderTargetCube) throw new Error("Depth Texture with cube render targets is not supported");
                    if (t.bindFramebuffer(t.FRAMEBUFFER, e), !i.depthTexture || !i.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    n.get(i.depthTexture).__webglTexture && i.depthTexture.image.width === i.width && i.depthTexture.image.height === i.height || (i.depthTexture.image.width = i.width, 
                    i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), f(i.depthTexture, 0);
                    var r = n.get(i.depthTexture).__webglTexture;
                    if (i.depthTexture.format === Xt) t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, r, 0); else {
                        if (i.depthTexture.format !== qt) throw new Error("Unknown depthTexture format");
                        t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, r, 0);
                    }
                }(i.__webglFramebuffer, e);
            } else if (r) {
                i.__webglDepthbuffer = [];
                for (var a = 0; a < 6; a++) t.bindFramebuffer(t.FRAMEBUFFER, i.__webglFramebuffer[a]), 
                i.__webglDepthbuffer[a] = t.createRenderbuffer(), v(i.__webglDepthbuffer[a], e);
            } else t.bindFramebuffer(t.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer = t.createRenderbuffer(), 
            v(i.__webglDepthbuffer, e);
            t.bindFramebuffer(t.FRAMEBUFFER, null);
        }
        this.setTexture2D = f, this.setTextureCube = function(e, s) {
            var u = n.get(e);
            if (6 === e.image.length) if (e.version > 0 && u.__version !== e.version) {
                u.__image__webglTextureCube || (e.addEventListener("dispose", p), u.__image__webglTextureCube = t.createTexture(), 
                o.textures++), i.activeTexture(t.TEXTURE0 + s), i.bindTexture(t.TEXTURE_CUBE_MAP, u.__image__webglTextureCube), 
                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY);
                for (var d = e && e.isCompressedTexture, f = e.image[0] && e.image[0].isDataTexture, g = [], v = 0; v < 6; v++) g[v] = d || f ? f ? e.image[v].image : e.image[v] : c(e.image[v], r.maxCubemapSize);
                var y = h(g[0]), x = a.convert(e.format), b = a.convert(e.type);
                for (m(t.TEXTURE_CUBE_MAP, e, y), v = 0; v < 6; v++) if (d) for (var _, w = g[v].mipmaps, M = 0, E = w.length; M < E; M++) _ = w[M], 
                e.format !== Vt && e.format !== Ht ? i.getCompressedTextureFormats().indexOf(x) > -1 ? i.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + v, M, x, _.width, _.height, 0, _.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + v, M, x, _.width, _.height, 0, x, b, _.data); else f ? i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + v, 0, x, g[v].width, g[v].height, 0, x, b, g[v].data) : i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + v, 0, x, x, b, g[v]);
                l(e, y) && t.generateMipmap(t.TEXTURE_CUBE_MAP), u.__version = e.version, e.onUpdate && e.onUpdate(e);
            } else i.activeTexture(t.TEXTURE0 + s), i.bindTexture(t.TEXTURE_CUBE_MAP, u.__image__webglTextureCube);
        }, this.setTextureCubeDynamic = function(e, r) {
            i.activeTexture(t.TEXTURE0 + r), i.bindTexture(t.TEXTURE_CUBE_MAP, n.get(e).__webglTexture);
        }, this.setupRenderTarget = function(e) {
            var r = n.get(e), a = n.get(e.texture);
            e.addEventListener("dispose", d), a.__webglTexture = t.createTexture(), o.textures++;
            var s = !0 === e.isWebGLRenderTargetCube, c = h(e);
            if (s) {
                r.__webglFramebuffer = [];
                for (var u = 0; u < 6; u++) r.__webglFramebuffer[u] = t.createFramebuffer();
            } else r.__webglFramebuffer = t.createFramebuffer();
            if (s) {
                for (i.bindTexture(t.TEXTURE_CUBE_MAP, a.__webglTexture), m(t.TEXTURE_CUBE_MAP, e.texture, c), 
                u = 0; u < 6; u++) g(r.__webglFramebuffer[u], e, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + u);
                l(e.texture, c) && t.generateMipmap(t.TEXTURE_CUBE_MAP), i.bindTexture(t.TEXTURE_CUBE_MAP, null);
            } else i.bindTexture(t.TEXTURE_2D, a.__webglTexture), m(t.TEXTURE_2D, e.texture, c), 
            g(r.__webglFramebuffer, e, t.COLOR_ATTACHMENT0, t.TEXTURE_2D), l(e.texture, c) && t.generateMipmap(t.TEXTURE_2D), 
            i.bindTexture(t.TEXTURE_2D, null);
            e.depthBuffer && y(e);
        }, this.updateRenderTargetMipmap = function(e) {
            var r = e.texture;
            if (l(r, h(e))) {
                var a = e.isWebGLRenderTargetCube ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D, o = n.get(r).__webglTexture;
                i.bindTexture(a, o), t.generateMipmap(a), i.bindTexture(a, null);
            }
        };
    }
    function ir(t, e, i, n) {
        Ji.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== t ? t : 50, 
        this.zoom = 1, this.near = void 0 !== i ? i : .1, this.far = void 0 !== n ? n : 2e3, 
        this.focus = 10, this.aspect = void 0 !== e ? e : 1, this.view = null, this.filmGauge = 35, 
        this.filmOffset = 0, this.updateProjectionMatrix();
    }
    function nr(t) {
        ir.call(this), this.cameras = t || [];
    }
    function rr(t, e) {
        return {
            convert: function(i) {
                var n;
                if (i === xt) return t.REPEAT;
                if (i === bt) return t.CLAMP_TO_EDGE;
                if (i === _t) return t.MIRRORED_REPEAT;
                if (i === wt) return t.NEAREST;
                if (i === Mt) return t.NEAREST_MIPMAP_NEAREST;
                if (i === Et) return t.NEAREST_MIPMAP_LINEAR;
                if (i === Tt) return t.LINEAR;
                if (i === St) return t.LINEAR_MIPMAP_NEAREST;
                if (i === At) return t.LINEAR_MIPMAP_LINEAR;
                if (i === Rt) return t.UNSIGNED_BYTE;
                if (i === Nt) return t.UNSIGNED_SHORT_4_4_4_4;
                if (i === Ft) return t.UNSIGNED_SHORT_5_5_5_1;
                if (i === Bt) return t.UNSIGNED_SHORT_5_6_5;
                if (i === Lt) return t.BYTE;
                if (i === Pt) return t.SHORT;
                if (i === Ct) return t.UNSIGNED_SHORT;
                if (i === It) return t.INT;
                if (i === Ut) return t.UNSIGNED_INT;
                if (i === Dt) return t.FLOAT;
                if (i === Ot && null !== (n = e.get("OES_texture_half_float"))) return n.HALF_FLOAT_OES;
                if (i === Gt) return t.ALPHA;
                if (i === Ht) return t.RGB;
                if (i === Vt) return t.RGBA;
                if (i === kt) return t.LUMINANCE;
                if (i === jt) return t.LUMINANCE_ALPHA;
                if (i === Xt) return t.DEPTH_COMPONENT;
                if (i === qt) return t.DEPTH_STENCIL;
                if (i === D) return t.FUNC_ADD;
                if (i === O) return t.FUNC_SUBTRACT;
                if (i === N) return t.FUNC_REVERSE_SUBTRACT;
                if (i === z) return t.ZERO;
                if (i === G) return t.ONE;
                if (i === H) return t.SRC_COLOR;
                if (i === V) return t.ONE_MINUS_SRC_COLOR;
                if (i === k) return t.SRC_ALPHA;
                if (i === j) return t.ONE_MINUS_SRC_ALPHA;
                if (i === W) return t.DST_ALPHA;
                if (i === X) return t.ONE_MINUS_DST_ALPHA;
                if (i === q) return t.DST_COLOR;
                if (i === Y) return t.ONE_MINUS_DST_COLOR;
                if (i === Z) return t.SRC_ALPHA_SATURATE;
                if ((i === Yt || i === Zt || i === Jt || i === Qt) && null !== (n = e.get("WEBGL_compressed_texture_s3tc"))) {
                    if (i === Yt) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (i === Zt) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (i === Jt) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (i === Qt) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                }
                if ((i === Kt || i === $t || i === te || i === ee) && null !== (n = e.get("WEBGL_compressed_texture_pvrtc"))) {
                    if (i === Kt) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (i === $t) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (i === te) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (i === ee) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                }
                if (i === ie && null !== (n = e.get("WEBGL_compressed_texture_etc1"))) return n.COMPRESSED_RGB_ETC1_WEBGL;
                if ((i === F || i === B) && null !== (n = e.get("EXT_blend_minmax"))) {
                    if (i === F) return n.MIN_EXT;
                    if (i === B) return n.MAX_EXT;
                }
                return i === zt && null !== (n = e.get("WEBGL_depth_texture")) ? n.UNSIGNED_INT_24_8_WEBGL : 0;
            }
        };
    }
    function ar(t) {
        console.log("THREE.WebGLRenderer", m);
        var e = void 0 !== (t = t || {}).canvas ? t.canvas : document.createElement("canvas"), i = void 0 !== t.context ? t.context : null, n = void 0 !== t.alpha && t.alpha, r = void 0 === t.depth || t.depth, a = void 0 === t.stencil || t.stencil, o = void 0 !== t.antialias && t.antialias, s = void 0 === t.premultipliedAlpha || t.premultipliedAlpha, c = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer, h = [], l = [], u = null, p = [], d = [];
        this.domElement = e, this.context = null, this.autoClear = !0, this.autoClearColor = !0, 
        this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], 
        this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, 
        this.physicallyCorrectLights = !1, this.toneMapping = ct, this.toneMappingExposure = 1, 
        this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
        var f, b, _, w, S, A, D, O, N, F, B, z, G, H, V, k, j, W, X, q = this, Y = !1, Z = null, rt = null, at = -1, ot = "", st = null, ht = null, lt = new Te(), ut = new Te(), pt = null, dt = 0, ft = e.width, mt = e.height, gt = 1, vt = new Te(0, 0, ft, mt), yt = new Te(0, 0, ft, mt), xt = !1, bt = new zi(), _t = new function() {
            var t = this, e = null, i = 0, n = !1, r = !1, a = new Bi(), o = new we(), s = {
                value: null,
                needsUpdate: !1
            };
            function c() {
                s.value !== e && (s.value = e, s.needsUpdate = i > 0), t.numPlanes = i, t.numIntersection = 0;
            }
            function h(e, i, n, r) {
                var c = null !== e ? e.length : 0, h = null;
                if (0 !== c) {
                    if (h = s.value, !0 !== r || null === h) {
                        var l = n + 4 * c, u = i.matrixWorldInverse;
                        o.getNormalMatrix(u), (null === h || h.length < l) && (h = new Float32Array(l));
                        for (var p = 0, d = n; p !== c; ++p, d += 4) a.copy(e[p]).applyMatrix4(u, o), a.normal.toArray(h, d), 
                        h[d + 3] = a.constant;
                    }
                    s.value = h, s.needsUpdate = !0;
                }
                return t.numPlanes = c, h;
            }
            this.uniform = s, this.numPlanes = 0, this.numIntersection = 0, this.init = function(t, r, a) {
                var o = 0 !== t.length || r || 0 !== i || n;
                return n = r, e = h(t, a, 0), i = t.length, o;
            }, this.beginShadows = function() {
                r = !0, h(null);
            }, this.endShadows = function() {
                r = !1, c();
            }, this.setState = function(t, a, o, l, u, p) {
                if (!n || null === t || 0 === t.length || r && !o) r ? h(null) : c(); else {
                    var d = r ? 0 : i, f = 4 * d, m = u.clippingState || null;
                    s.value = m, m = h(t, l, f, p);
                    for (var g = 0; g !== f; ++g) m[g] = e[g];
                    u.clippingState = m, this.numIntersection = a ? this.numPlanes : 0, this.numPlanes += d;
                }
            };
        }(), wt = !1, Mt = !1, Et = new xe(), Tt = new _e(), St = {
            geometries: 0,
            textures: 0
        }, At = {
            frame: 0,
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        };
        function Lt() {
            return null === Z ? gt : 1;
        }
        this.info = {
            render: At,
            memory: St,
            programs: null
        };
        try {
            var Pt = {
                alpha: n,
                depth: r,
                stencil: a,
                antialias: o,
                premultipliedAlpha: s,
                preserveDrawingBuffer: c
            };
            if (null === (f = i || e.getContext("webgl", Pt) || e.getContext("experimental-webgl", Pt))) throw null !== e.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
            void 0 === f.getShaderPrecisionFormat && (f.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                };
            }), e.addEventListener("webglcontextlost", Nt, !1), e.addEventListener("webglcontextrestored", Ft, !1);
        } catch (t) {
            console.error("THREE.WebGLRenderer: " + t);
        }
        function Ct() {
            (b = new function(t) {
                var e = {};
                return {
                    get: function(i) {
                        if (void 0 !== e[i]) return e[i];
                        var n;
                        switch (i) {
                          case "WEBGL_depth_texture":
                            n = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
                            break;

                          case "EXT_texture_filter_anisotropic":
                            n = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                            break;

                          case "WEBGL_compressed_texture_s3tc":
                            n = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                            break;

                          case "WEBGL_compressed_texture_pvrtc":
                            n = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                            break;

                          case "WEBGL_compressed_texture_etc1":
                            n = t.getExtension("WEBGL_compressed_texture_etc1");
                            break;

                          default:
                            n = t.getExtension(i);
                        }
                        return null === n && console.warn("THREE.WebGLRenderer: " + i + " extension not supported."), 
                        e[i] = n, n;
                    }
                };
            }(f)).get("WEBGL_depth_texture"), b.get("OES_texture_float"), b.get("OES_texture_float_linear"), 
            b.get("OES_texture_half_float"), b.get("OES_texture_half_float_linear"), b.get("OES_standard_derivatives"), 
            b.get("OES_element_index_uint"), b.get("ANGLE_instanced_arrays"), X = new rr(f, b), 
            _ = new function(t, e, i) {
                var n;
                function r(e) {
                    if ("highp" === e) {
                        if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0) return "highp";
                        e = "mediump";
                    }
                    return "mediump" === e && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
                }
                var a = void 0 !== i.precision ? i.precision : "highp", o = r(a);
                o !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", o, "instead."), 
                a = o);
                var s = !0 === i.logarithmicDepthBuffer, c = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), h = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS), l = t.getParameter(t.MAX_TEXTURE_SIZE), u = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE), p = t.getParameter(t.MAX_VERTEX_ATTRIBS), d = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS), f = t.getParameter(t.MAX_VARYING_VECTORS), m = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS), g = h > 0, v = !!e.get("OES_texture_float");
                return {
                    getMaxAnisotropy: function() {
                        if (void 0 !== n) return n;
                        var i = e.get("EXT_texture_filter_anisotropic");
                        return n = null !== i ? t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
                    },
                    getMaxPrecision: r,
                    precision: a,
                    logarithmicDepthBuffer: s,
                    maxTextures: c,
                    maxVertexTextures: h,
                    maxTextureSize: l,
                    maxCubemapSize: u,
                    maxAttributes: p,
                    maxVertexUniforms: d,
                    maxVaryings: f,
                    maxFragmentUniforms: m,
                    vertexTextures: g,
                    floatFragmentTextures: v,
                    floatVertexTextures: g && v
                };
            }(f, b, t), (w = new function(t, e, i) {
                var n = new function() {
                    var e = !1, i = new Te(), n = null, r = new Te(0, 0, 0, 0);
                    return {
                        setMask: function(i) {
                            n === i || e || (t.colorMask(i, i, i, i), n = i);
                        },
                        setLocked: function(t) {
                            e = t;
                        },
                        setClear: function(e, n, a, o, s) {
                            !0 === s && (e *= o, n *= o, a *= o), i.set(e, n, a, o), !1 === r.equals(i) && (t.clearColor(e, n, a, o), 
                            r.copy(i));
                        },
                        reset: function() {
                            e = !1, n = null, r.set(-1, 0, 0, 0);
                        }
                    };
                }(), r = new function() {
                    var e = !1, i = null, n = null, r = null;
                    return {
                        setTest: function(e) {
                            e ? W(t.DEPTH_TEST) : X(t.DEPTH_TEST);
                        },
                        setMask: function(n) {
                            i === n || e || (t.depthMask(n), i = n);
                        },
                        setFunc: function(e) {
                            if (n !== e) {
                                if (e) switch (e) {
                                  case J:
                                    t.depthFunc(t.NEVER);
                                    break;

                                  case Q:
                                    t.depthFunc(t.ALWAYS);
                                    break;

                                  case K:
                                    t.depthFunc(t.LESS);
                                    break;

                                  case $:
                                    t.depthFunc(t.LEQUAL);
                                    break;

                                  case tt:
                                    t.depthFunc(t.EQUAL);
                                    break;

                                  case et:
                                    t.depthFunc(t.GEQUAL);
                                    break;

                                  case it:
                                    t.depthFunc(t.GREATER);
                                    break;

                                  case nt:
                                    t.depthFunc(t.NOTEQUAL);
                                    break;

                                  default:
                                    t.depthFunc(t.LEQUAL);
                                } else t.depthFunc(t.LEQUAL);
                                n = e;
                            }
                        },
                        setLocked: function(t) {
                            e = t;
                        },
                        setClear: function(e) {
                            r !== e && (t.clearDepth(e), r = e);
                        },
                        reset: function() {
                            e = !1, i = null, n = null, r = null;
                        }
                    };
                }(), a = new function() {
                    var e = !1, i = null, n = null, r = null, a = null, o = null, s = null, c = null, h = null;
                    return {
                        setTest: function(e) {
                            e ? W(t.STENCIL_TEST) : X(t.STENCIL_TEST);
                        },
                        setMask: function(n) {
                            i === n || e || (t.stencilMask(n), i = n);
                        },
                        setFunc: function(e, i, o) {
                            n === e && r === i && a === o || (t.stencilFunc(e, i, o), n = e, r = i, a = o);
                        },
                        setOp: function(e, i, n) {
                            o === e && s === i && c === n || (t.stencilOp(e, i, n), o = e, s = i, c = n);
                        },
                        setLocked: function(t) {
                            e = t;
                        },
                        setClear: function(e) {
                            h !== e && (t.clearStencil(e), h = e);
                        },
                        reset: function() {
                            e = !1, i = null, n = null, r = null, a = null, o = null, s = null, c = null, h = null;
                        }
                    };
                }(), o = t.getParameter(t.MAX_VERTEX_ATTRIBS), s = new Uint8Array(o), c = new Uint8Array(o), h = new Uint8Array(o), l = {}, u = null, p = null, d = null, f = null, m = null, x = null, b = null, _ = null, w = null, T = !1, S = null, A = null, D = null, O = null, N = null, F = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS), B = !0, z = null, G = {}, H = new Te(), V = new Te();
                function k(e, i, n) {
                    var r = new Uint8Array(4), a = t.createTexture();
                    t.bindTexture(e, a), t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
                    for (var o = 0; o < n; o++) t.texImage2D(i + o, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, r);
                    return a;
                }
                var j = {};
                function W(e) {
                    !0 !== l[e] && (t.enable(e), l[e] = !0);
                }
                function X(e) {
                    !1 !== l[e] && (t.disable(e), l[e] = !1);
                }
                function q(e, n, r, a, o, s, c, h) {
                    if (e !== R ? W(t.BLEND) : X(t.BLEND), e !== U) {
                        if (e !== d || h !== T) switch (e) {
                          case P:
                            h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE, t.ONE, t.ONE)) : (t.blendEquation(t.FUNC_ADD), 
                            t.blendFunc(t.SRC_ALPHA, t.ONE));
                            break;

                          case C:
                            h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), 
                            t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR));
                            break;

                          case I:
                            h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), 
                            t.blendFunc(t.ZERO, t.SRC_COLOR));
                            break;

                          default:
                            h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), 
                            t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA));
                        }
                        f = null, m = null, x = null, b = null, _ = null, w = null;
                    } else o = o || n, s = s || r, c = c || a, n === f && o === b || (t.blendEquationSeparate(i.convert(n), i.convert(o)), 
                    f = n, b = o), r === m && a === x && s === _ && c === w || (t.blendFuncSeparate(i.convert(r), i.convert(a), i.convert(s), i.convert(c)), 
                    m = r, x = a, _ = s, w = c);
                    d = e, T = h;
                }
                function Y(e) {
                    S !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), S = e);
                }
                function Z(e) {
                    e !== g ? (W(t.CULL_FACE), e !== A && (e === v ? t.cullFace(t.BACK) : e === y ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))) : X(t.CULL_FACE), 
                    A = e;
                }
                function rt(e, i, n) {
                    e ? (W(t.POLYGON_OFFSET_FILL), O === i && N === n || (t.polygonOffset(i, n), O = i, 
                    N = n)) : X(t.POLYGON_OFFSET_FILL);
                }
                function at(e) {
                    void 0 === e && (e = t.TEXTURE0 + F - 1), z !== e && (t.activeTexture(e), z = e);
                }
                return j[t.TEXTURE_2D] = k(t.TEXTURE_2D, t.TEXTURE_2D, 1), j[t.TEXTURE_CUBE_MAP] = k(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), 
                n.setClear(0, 0, 0, 1), r.setClear(1), a.setClear(0), W(t.DEPTH_TEST), r.setFunc($), 
                Y(!1), Z(v), W(t.CULL_FACE), W(t.BLEND), q(L), {
                    buffers: {
                        color: n,
                        depth: r,
                        stencil: a
                    },
                    initAttributes: function() {
                        for (var t = 0, e = s.length; t < e; t++) s[t] = 0;
                    },
                    enableAttribute: function(i) {
                        s[i] = 1, 0 === c[i] && (t.enableVertexAttribArray(i), c[i] = 1), 0 !== h[i] && (e.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(i, 0), 
                        h[i] = 0);
                    },
                    enableAttributeAndDivisor: function(i, n) {
                        s[i] = 1, 0 === c[i] && (t.enableVertexAttribArray(i), c[i] = 1), h[i] !== n && (e.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(i, n), 
                        h[i] = n);
                    },
                    disableUnusedAttributes: function() {
                        for (var e = 0, i = c.length; e !== i; ++e) c[e] !== s[e] && (t.disableVertexAttribArray(e), 
                        c[e] = 0);
                    },
                    enable: W,
                    disable: X,
                    getCompressedTextureFormats: function() {
                        if (null === u && (u = [], e.get("WEBGL_compressed_texture_pvrtc") || e.get("WEBGL_compressed_texture_s3tc") || e.get("WEBGL_compressed_texture_etc1"))) for (var i = t.getParameter(t.COMPRESSED_TEXTURE_FORMATS), n = 0; n < i.length; n++) u.push(i[n]);
                        return u;
                    },
                    useProgram: function(e) {
                        return p !== e && (t.useProgram(e), p = e, !0);
                    },
                    setBlending: q,
                    setMaterial: function(e) {
                        e.side === E ? X(t.CULL_FACE) : W(t.CULL_FACE), Y(e.side === M), !0 === e.transparent ? q(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha) : q(R), 
                        r.setFunc(e.depthFunc), r.setTest(e.depthTest), r.setMask(e.depthWrite), n.setMask(e.colorWrite), 
                        rt(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits);
                    },
                    setFlipSided: Y,
                    setCullFace: Z,
                    setLineWidth: function(e) {
                        e !== D && (B && t.lineWidth(e), D = e);
                    },
                    setPolygonOffset: rt,
                    setScissorTest: function(e) {
                        e ? W(t.SCISSOR_TEST) : X(t.SCISSOR_TEST);
                    },
                    activeTexture: at,
                    bindTexture: function(e, i) {
                        null === z && at();
                        var n = G[z];
                        void 0 === n && (n = {
                            type: void 0,
                            texture: void 0
                        }, G[z] = n), n.type === e && n.texture === i || (t.bindTexture(e, i || j[e]), n.type = e, 
                        n.texture = i);
                    },
                    compressedTexImage2D: function() {
                        try {
                            t.compressedTexImage2D.apply(t, arguments);
                        } catch (t) {
                            console.error("THREE.WebGLState:", t);
                        }
                    },
                    texImage2D: function() {
                        try {
                            t.texImage2D.apply(t, arguments);
                        } catch (t) {
                            console.error("THREE.WebGLState:", t);
                        }
                    },
                    scissor: function(e) {
                        !1 === H.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), H.copy(e));
                    },
                    viewport: function(e) {
                        !1 === V.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), V.copy(e));
                    },
                    reset: function() {
                        for (var e = 0; e < c.length; e++) 1 === c[e] && (t.disableVertexAttribArray(e), 
                        c[e] = 0);
                        l = {}, u = null, z = null, G = {}, p = null, d = null, S = null, A = null, n.reset(), 
                        r.reset(), a.reset();
                    }
                };
            }(f, b, X)).scissor(ut.copy(yt).multiplyScalar(gt)), w.viewport(lt.copy(vt).multiplyScalar(gt)), 
            S = new function() {
                var t = {};
                return {
                    get: function(e) {
                        var i = e.uuid, n = t[i];
                        return void 0 === n && (n = {}, t[i] = n), n;
                    },
                    remove: function(e) {
                        delete t[e.uuid];
                    },
                    clear: function() {
                        t = {};
                    }
                };
            }(), A = new er(f, b, w, S, _, X, St), D = new Hi(f), O = new function(t, e, i) {
                var n = {}, r = {};
                function a(t) {
                    var o = t.target, s = n[o.id];
                    for (var c in null !== s.index && e.remove(s.index), s.attributes) e.remove(s.attributes[c]);
                    o.removeEventListener("dispose", a), delete n[o.id];
                    var h = r[o.id];
                    h && (e.remove(h), delete r[o.id]), (h = r[s.id]) && (e.remove(h), delete r[s.id]), 
                    i.geometries--;
                }
                return {
                    get: function(t, e) {
                        var r = n[e.id];
                        return r || (e.addEventListener("dispose", a), e.isBufferGeometry ? r = e : e.isGeometry && (void 0 === e._bufferGeometry && (e._bufferGeometry = new Mn().setFromObject(t)), 
                        r = e._bufferGeometry), n[e.id] = r, i.geometries++, r);
                    },
                    update: function(i) {
                        var n = i.index, r = i.attributes;
                        for (var a in null !== n && e.update(n, t.ELEMENT_ARRAY_BUFFER), r) e.update(r[a], t.ARRAY_BUFFER);
                        var o = i.morphAttributes;
                        for (var a in o) for (var s = o[a], c = 0, h = s.length; c < h; c++) e.update(s[c], t.ARRAY_BUFFER);
                    },
                    getWireframeAttribute: function(i) {
                        var n = r[i.id];
                        if (n) return n;
                        var a, o = [], s = i.index, c = i.attributes;
                        if (null !== s) for (var h = 0, l = (a = s.array).length; h < l; h += 3) {
                            var u = a[h + 0], p = a[h + 1], d = a[h + 2];
                            o.push(u, p, p, d, d, u);
                        } else for (h = 0, l = (a = c.position.array).length / 3 - 1; h < l; h += 3) u = h + 0, 
                        p = h + 1, d = h + 2, o.push(u, p, p, d, d, u);
                        return n = new (fn(o) > 65535 ? ln : cn)(o, 1), e.update(n, t.ELEMENT_ARRAY_BUFFER), 
                        r[i.id] = n, n;
                    }
                };
            }(f, D, St), N = new function(t, e) {
                var i = {};
                return {
                    update: function(n) {
                        var r = e.frame, a = n.geometry, o = t.get(n, a);
                        return i[o.id] !== r && (a.isGeometry && o.updateFromObject(n), t.update(o), i[o.id] = r), 
                        o;
                    },
                    clear: function() {
                        i = {};
                    }
                };
            }(O, At), H = new function(t) {
                var e = {}, i = new Float32Array(8);
                return {
                    update: function(n, r, a, o) {
                        var s = n.morphTargetInfluences, c = s.length, h = e[r.id];
                        if (void 0 === h) {
                            h = [];
                            for (var l = 0; l < c; l++) h[l] = [ l, 0 ];
                            e[r.id] = h;
                        }
                        var u = a.morphTargets && r.morphAttributes.position, p = a.morphNormals && r.morphAttributes.normal;
                        for (l = 0; l < c; l++) 0 !== (d = h[l])[1] && (u && r.removeAttribute("morphTarget" + l), 
                        p && r.removeAttribute("morphNormal" + l));
                        for (l = 0; l < c; l++) (d = h[l])[0] = l, d[1] = s[l];
                        for (h.sort(Fn), l = 0; l < 8; l++) {
                            var d;
                            if (d = h[l]) {
                                var f = d[0], m = d[1];
                                if (m) {
                                    u && r.addAttribute("morphTarget" + l, u[f]), p && r.addAttribute("morphNormal" + l, p[f]), 
                                    i[l] = m;
                                    continue;
                                }
                            }
                            i[l] = 0;
                        }
                        o.getUniforms().setValue(t, "morphTargetInfluences", i);
                    }
                };
            }(f), B = new tr(q, b, _), F = new Bn(), z = new Nn(), G = new function(t, e, i, n) {
                var r, a, o, s = new gi(0), c = 0;
                function h(t, i) {
                    e.buffers.color.setClear(t.r, t.g, t.b, i, n);
                }
                return {
                    getClearColor: function() {
                        return s;
                    },
                    setClearColor: function(t, e) {
                        s.set(t), h(s, c = void 0 !== e ? e : 1);
                    },
                    getClearAlpha: function() {
                        return c;
                    },
                    setClearAlpha: function(t) {
                        h(s, c = t);
                    },
                    render: function(e, n, l, u) {
                        var p = n.background;
                        null === p ? h(s, c) : p && p.isColor && (h(p, 1), u = !0), (t.autoClear || u) && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), 
                        p && p.isCubeTexture ? (void 0 === o && ((o = new Un(new Tn(1, 1, 1), new Ln({
                            uniforms: bi.cube.uniforms,
                            vertexShader: bi.cube.vertexShader,
                            fragmentShader: bi.cube.fragmentShader,
                            side: M,
                            depthTest: !0,
                            depthWrite: !1,
                            fog: !1
                        }))).geometry.removeAttribute("normal"), o.geometry.removeAttribute("uv"), o.onBeforeRender = function(t, e, i) {
                            this.matrixWorld.copyPosition(i.matrixWorld);
                        }, i.update(o.geometry)), o.material.uniforms.tCube.value = p, e.push(o, o.geometry, o.material, 0, null)) : p && p.isTexture && (void 0 === r && (r = new Qi(-1, 1, 1, -1, 0, 1), 
                        a = new Un(new An(2, 2), new Rn({
                            depthTest: !1,
                            depthWrite: !1,
                            fog: !1
                        })), i.update(a.geometry)), a.material.map = p, t.renderBufferDirect(r, null, a.geometry, a.material, a, null));
                    }
                };
            }(q, w, O, s), V = new function(t, e, i) {
                var n;
                this.setMode = function(t) {
                    n = t;
                }, this.render = function(e, r) {
                    t.drawArrays(n, e, r), i.calls++, i.vertices += r, n === t.TRIANGLES ? i.faces += r / 3 : n === t.POINTS && (i.points += r);
                }, this.renderInstances = function(r, a, o) {
                    var s = e.get("ANGLE_instanced_arrays");
                    if (null !== s) {
                        var c = r.attributes.position;
                        c.isInterleavedBufferAttribute ? (o = c.data.count, s.drawArraysInstancedANGLE(n, 0, o, r.maxInstancedCount)) : s.drawArraysInstancedANGLE(n, a, o, r.maxInstancedCount), 
                        i.calls++, i.vertices += o * r.maxInstancedCount, n === t.TRIANGLES ? i.faces += r.maxInstancedCount * o / 3 : n === t.POINTS && (i.points += r.maxInstancedCount * o);
                    } else console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                };
            }(f, b, At), k = new function(t, e, i) {
                var n, r, a;
                this.setMode = function(t) {
                    n = t;
                }, this.setIndex = function(t) {
                    r = t.type, a = t.bytesPerElement;
                }, this.render = function(e, o) {
                    t.drawElements(n, o, r, e * a), i.calls++, i.vertices += o, n === t.TRIANGLES ? i.faces += o / 3 : n === t.POINTS && (i.points += o);
                }, this.renderInstances = function(o, s, c) {
                    var h = e.get("ANGLE_instanced_arrays");
                    null !== h ? (h.drawElementsInstancedANGLE(n, c, r, s * a, o.maxInstancedCount), 
                    i.calls++, i.vertices += c * o.maxInstancedCount, n === t.TRIANGLES ? i.faces += o.maxInstancedCount * c / 3 : n === t.POINTS && (i.points += o.maxInstancedCount * c)) : console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                };
            }(f, b, At), j = new wi(q, f, w, A, _), W = new Ei(q, f, w, A, _), q.info.programs = B.programs, 
            q.context = f, q.capabilities = _, q.extensions = b, q.properties = S, q.renderLists = z, 
            q.state = w;
        }
        Ct();
        var It = new function(t) {
            var e = this, i = null, n = null;
            "undefined" != typeof window && "VRFrameData" in window && (n = new window.VRFrameData());
            var r = new xe(), a = new xe(), o = new xe(), s = new ir();
            s.bounds = new Te(0, 0, .5, 1), s.layers.enable(1);
            var c = new ir();
            c.bounds = new Te(.5, 0, .5, 1), c.layers.enable(2);
            var h, l, u = new nr([ s, c ]);
            function p() {
                if (null !== i && i.isPresenting) {
                    var n = i.getEyeParameters("left"), r = n.renderWidth, a = n.renderHeight;
                    l = t.getPixelRatio(), h = t.getSize(), t.setDrawingBufferSize(2 * r, a, 1);
                } else e.enabled && t.setDrawingBufferSize(h.width, h.height, l);
            }
            u.layers.enable(1), u.layers.enable(2), "undefined" != typeof window && window.addEventListener("vrdisplaypresentchange", p, !1), 
            this.enabled = !1, this.standing = !1, this.getDevice = function() {
                return i;
            }, this.setDevice = function(t) {
                void 0 !== t && (i = t);
            }, this.getCamera = function(t) {
                if (null === i) return t;
                i.depthNear = t.near, i.depthFar = t.far, i.getFrameData(n);
                var e = n.pose;
                null !== e.position ? t.position.fromArray(e.position) : t.position.set(0, 0, 0), 
                null !== e.orientation && t.quaternion.fromArray(e.orientation), t.updateMatrixWorld();
                var h = i.stageParameters;
                if (this.standing && h && (a.fromArray(h.sittingToStandingTransform), o.getInverse(a), 
                t.matrixWorld.multiply(a), t.matrixWorldInverse.multiply(o)), !1 === i.isPresenting) return t;
                s.near = t.near, c.near = t.near, s.far = t.far, c.far = t.far, u.matrixWorld.copy(t.matrixWorld), 
                u.matrixWorldInverse.copy(t.matrixWorldInverse), s.matrixWorldInverse.fromArray(n.leftViewMatrix), 
                c.matrixWorldInverse.fromArray(n.rightViewMatrix), this.standing && h && (s.matrixWorldInverse.multiply(o), 
                c.matrixWorldInverse.multiply(o));
                var l = t.parent;
                null !== l && (r.getInverse(l.matrixWorld), s.matrixWorldInverse.multiply(r), c.matrixWorldInverse.multiply(r)), 
                s.matrixWorld.getInverse(s.matrixWorldInverse), c.matrixWorld.getInverse(c.matrixWorldInverse), 
                s.projectionMatrix.fromArray(n.leftProjectionMatrix), c.projectionMatrix.fromArray(n.rightProjectionMatrix), 
                u.projectionMatrix.copy(s.projectionMatrix);
                var p = i.getLayers();
                if (p.length) {
                    var d = p[0];
                    null !== d.leftBounds && 4 === d.leftBounds.length && s.bounds.fromArray(d.leftBounds), 
                    null !== d.rightBounds && 4 === d.rightBounds.length && c.bounds.fromArray(d.rightBounds);
                }
                return u;
            }, this.getStandingMatrix = function() {
                return a;
            }, this.submitFrame = function() {
                i && i.isPresenting && i.submitFrame();
            }, this.dispose = function() {
                window.removeEventListener("vrdisplaypresentchange", p);
            };
        }(q);
        this.vr = It;
        var Ut = new Gi(q, N, _.maxTextureSize);
        function Nt(t) {
            t.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), Y = !0;
        }
        function Ft() {
            console.log("THREE.WebGLRenderer: Context Restored."), Y = !1, Ct();
        }
        function Bt(t) {
            var e = t.target;
            e.removeEventListener("dispose", Bt), function(t) {
                zt(t), S.remove(t);
            }(e);
        }
        function zt(t) {
            var e = S.get(t).program;
            t.program = void 0, void 0 !== e && B.releaseProgram(e);
        }
        this.shadowMap = Ut, this.getContext = function() {
            return f;
        }, this.getContextAttributes = function() {
            return f.getContextAttributes();
        }, this.forceContextLoss = function() {
            var t = b.get("WEBGL_lose_context");
            t && t.loseContext();
        }, this.forceContextRestore = function() {
            var t = b.get("WEBGL_lose_context");
            t && t.restoreContext();
        }, this.getPixelRatio = function() {
            return gt;
        }, this.setPixelRatio = function(t) {
            void 0 !== t && (gt = t, this.setSize(ft, mt, !1));
        }, this.getSize = function() {
            return {
                width: ft,
                height: mt
            };
        }, this.setSize = function(t, i, n) {
            var r = It.getDevice();
            r && r.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (ft = t, 
            mt = i, e.width = t * gt, e.height = i * gt, !1 !== n && (e.style.width = t + "px", 
            e.style.height = i + "px"), this.setViewport(0, 0, t, i));
        }, this.getDrawingBufferSize = function() {
            return {
                width: ft * gt,
                height: mt * gt
            };
        }, this.setDrawingBufferSize = function(t, i, n) {
            ft = t, mt = i, gt = n, e.width = t * n, e.height = i * n, this.setViewport(0, 0, t, i);
        }, this.setViewport = function(t, e, i, n) {
            vt.set(t, mt - e - n, i, n), w.viewport(lt.copy(vt).multiplyScalar(gt));
        }, this.setScissor = function(t, e, i, n) {
            yt.set(t, mt - e - n, i, n), w.scissor(ut.copy(yt).multiplyScalar(gt));
        }, this.setScissorTest = function(t) {
            w.setScissorTest(xt = t);
        }, this.getClearColor = function() {
            return G.getClearColor();
        }, this.setClearColor = function() {
            G.setClearColor.apply(G, arguments);
        }, this.getClearAlpha = function() {
            return G.getClearAlpha();
        }, this.setClearAlpha = function() {
            G.setClearAlpha.apply(G, arguments);
        }, this.clear = function(t, e, i) {
            var n = 0;
            (void 0 === t || t) && (n |= f.COLOR_BUFFER_BIT), (void 0 === e || e) && (n |= f.DEPTH_BUFFER_BIT), 
            (void 0 === i || i) && (n |= f.STENCIL_BUFFER_BIT), f.clear(n);
        }, this.clearColor = function() {
            this.clear(!0, !1, !1);
        }, this.clearDepth = function() {
            this.clear(!1, !0, !1);
        }, this.clearStencil = function() {
            this.clear(!1, !1, !0);
        }, this.clearTarget = function(t, e, i, n) {
            this.setRenderTarget(t), this.clear(e, i, n);
        }, this.dispose = function() {
            e.removeEventListener("webglcontextlost", Nt, !1), e.removeEventListener("webglcontextrestored", Ft, !1), 
            z.dispose(), It.dispose();
        }, this.renderBufferImmediate = function(t, e, i) {
            w.initAttributes();
            var n = S.get(t);
            t.hasPositions && !n.position && (n.position = f.createBuffer()), t.hasNormals && !n.normal && (n.normal = f.createBuffer()), 
            t.hasUvs && !n.uv && (n.uv = f.createBuffer()), t.hasColors && !n.color && (n.color = f.createBuffer());
            var r = e.getAttributes();
            if (t.hasPositions && (f.bindBuffer(f.ARRAY_BUFFER, n.position), f.bufferData(f.ARRAY_BUFFER, t.positionArray, f.DYNAMIC_DRAW), 
            w.enableAttribute(r.position), f.vertexAttribPointer(r.position, 3, f.FLOAT, !1, 0, 0)), 
            t.hasNormals) {
                if (f.bindBuffer(f.ARRAY_BUFFER, n.normal), !i.isMeshPhongMaterial && !i.isMeshStandardMaterial && !i.isMeshNormalMaterial && !0 === i.flatShading) for (var a = 0, o = 3 * t.count; a < o; a += 9) {
                    var s = t.normalArray, c = (s[a + 0] + s[a + 3] + s[a + 6]) / 3, h = (s[a + 1] + s[a + 4] + s[a + 7]) / 3, l = (s[a + 2] + s[a + 5] + s[a + 8]) / 3;
                    s[a + 0] = c, s[a + 1] = h, s[a + 2] = l, s[a + 3] = c, s[a + 4] = h, s[a + 5] = l, 
                    s[a + 6] = c, s[a + 7] = h, s[a + 8] = l;
                }
                f.bufferData(f.ARRAY_BUFFER, t.normalArray, f.DYNAMIC_DRAW), w.enableAttribute(r.normal), 
                f.vertexAttribPointer(r.normal, 3, f.FLOAT, !1, 0, 0);
            }
            t.hasUvs && i.map && (f.bindBuffer(f.ARRAY_BUFFER, n.uv), f.bufferData(f.ARRAY_BUFFER, t.uvArray, f.DYNAMIC_DRAW), 
            w.enableAttribute(r.uv), f.vertexAttribPointer(r.uv, 2, f.FLOAT, !1, 0, 0)), t.hasColors && i.vertexColors !== T && (f.bindBuffer(f.ARRAY_BUFFER, n.color), 
            f.bufferData(f.ARRAY_BUFFER, t.colorArray, f.DYNAMIC_DRAW), w.enableAttribute(r.color), 
            f.vertexAttribPointer(r.color, 3, f.FLOAT, !1, 0, 0)), w.disableUnusedAttributes(), 
            f.drawArrays(f.TRIANGLES, 0, t.count), t.count = 0;
        }, this.renderBufferDirect = function(t, e, i, n, r, a) {
            w.setMaterial(n);
            var o = Yt(t, e, n, r), s = i.id + "_" + o.id + "_" + (!0 === n.wireframe), c = !1;
            s !== ot && (ot = s, c = !0), r.morphTargetInfluences && (H.update(r, i, n, o), 
            c = !0);
            var h, l = i.index, u = i.attributes.position, p = 1;
            !0 === n.wireframe && (l = O.getWireframeAttribute(i), p = 2);
            var d = V;
            null !== l && (h = D.get(l), (d = k).setIndex(h)), c && (!function(t, e, i, n) {
                if (i && i.isInstancedBufferGeometry && null === b.get("ANGLE_instanced_arrays")) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                void 0 === n && (n = 0);
                w.initAttributes();
                var r = i.attributes, a = e.getAttributes(), o = t.defaultAttributeValues;
                for (var s in a) {
                    var c = a[s];
                    if (c >= 0) {
                        var h = r[s];
                        if (void 0 !== h) {
                            var l = h.normalized, u = h.itemSize, p = D.get(h);
                            if (void 0 === p) continue;
                            var d = p.buffer, m = p.type, g = p.bytesPerElement;
                            if (h.isInterleavedBufferAttribute) {
                                var v = h.data, y = v.stride, x = h.offset;
                                v && v.isInstancedInterleavedBuffer ? (w.enableAttributeAndDivisor(c, v.meshPerAttribute), 
                                void 0 === i.maxInstancedCount && (i.maxInstancedCount = v.meshPerAttribute * v.count)) : w.enableAttribute(c), 
                                f.bindBuffer(f.ARRAY_BUFFER, d), f.vertexAttribPointer(c, u, m, l, y * g, (n * y + x) * g);
                            } else h.isInstancedBufferAttribute ? (w.enableAttributeAndDivisor(c, h.meshPerAttribute), 
                            void 0 === i.maxInstancedCount && (i.maxInstancedCount = h.meshPerAttribute * h.count)) : w.enableAttribute(c), 
                            f.bindBuffer(f.ARRAY_BUFFER, d), f.vertexAttribPointer(c, u, m, l, 0, n * u * g);
                        } else if (void 0 !== o) {
                            var _ = o[s];
                            if (void 0 !== _) switch (_.length) {
                              case 2:
                                f.vertexAttrib2fv(c, _);
                                break;

                              case 3:
                                f.vertexAttrib3fv(c, _);
                                break;

                              case 4:
                                f.vertexAttrib4fv(c, _);
                                break;

                              default:
                                f.vertexAttrib1fv(c, _);
                            }
                        }
                    }
                }
                w.disableUnusedAttributes();
            }(n, o, i), null !== l && f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, h.buffer));
            var m = 0;
            null !== l ? m = l.count : void 0 !== u && (m = u.count);
            var g = i.drawRange.start * p, v = i.drawRange.count * p, y = null !== a ? a.start * p : 0, x = null !== a ? a.count * p : 1 / 0, _ = Math.max(g, y), M = Math.min(m, g + v, y + x) - 1, E = Math.max(0, M - _ + 1);
            if (0 !== E) {
                if (r.isMesh) if (!0 === n.wireframe) w.setLineWidth(n.wireframeLinewidth * Lt()), 
                d.setMode(f.LINES); else switch (r.drawMode) {
                  case ae:
                    d.setMode(f.TRIANGLES);
                    break;

                  case oe:
                    d.setMode(f.TRIANGLE_STRIP);
                    break;

                  case se:
                    d.setMode(f.TRIANGLE_FAN);
                } else if (r.isLine) {
                    var T = n.linewidth;
                    void 0 === T && (T = 1), w.setLineWidth(T * Lt()), r.isLineSegments ? d.setMode(f.LINES) : r.isLineLoop ? d.setMode(f.LINE_LOOP) : d.setMode(f.LINE_STRIP);
                } else r.isPoints && d.setMode(f.POINTS);
                i && i.isInstancedBufferGeometry ? i.maxInstancedCount > 0 && d.renderInstances(i, _, E) : d.render(_, E);
            }
        }, this.compile = function(t, e) {
            h.length = 0, l.length = 0, t.traverse(function(t) {
                t.isLight && (h.push(t), t.castShadow && l.push(t));
            }), F.setup(h, l, e), t.traverse(function(e) {
                if (e.material) if (Array.isArray(e.material)) for (var i = 0; i < e.material.length; i++) qt(e.material[i], t.fog, e); else qt(e.material, t.fog, e);
            });
        };
        var Gt, Ht = !1, kt = null;
        function jt(t) {
            null !== kt && kt(t), (It.getDevice() || window).requestAnimationFrame(jt);
        }
        function Wt(t, e, i, n) {
            for (var r = 0, a = t.length; r < a; r++) {
                var o = t[r], s = o.object, c = o.geometry, h = void 0 === n ? o.material : n, l = o.group;
                if (i.isArrayCamera) {
                    ht = i;
                    for (var u = i.cameras, p = 0, d = u.length; p < d; p++) {
                        var f = u[p];
                        if (s.layers.test(f.layers)) {
                            var m = f.bounds, g = m.x * ft, v = m.y * mt, y = m.z * ft, x = m.w * mt;
                            w.viewport(lt.set(g, v, y, x).multiplyScalar(gt)), Xt(s, e, f, c, h, l);
                        }
                    }
                } else ht = null, Xt(s, e, i, c, h, l);
            }
        }
        function Xt(t, e, i, n, r, a) {
            if (t.onBeforeRender(q, e, i, n, r, a), t.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), 
            t.normalMatrix.getNormalMatrix(t.modelViewMatrix), t.isImmediateRenderObject) {
                w.setMaterial(r);
                var o = Yt(i, e.fog, r, t);
                ot = "", function(t, e, i) {
                    t.render(function(t) {
                        q.renderBufferImmediate(t, e, i);
                    });
                }(t, o, r);
            } else q.renderBufferDirect(i, e.fog, n, r, t, a);
            t.onAfterRender(q, e, i, n, r, a);
        }
        function qt(t, e, i) {
            var n = S.get(t), r = B.getParameters(t, F.state, l, e, _t.numPlanes, _t.numIntersection, i), a = B.getProgramCode(t, r), o = n.program, s = !0;
            if (void 0 === o) t.addEventListener("dispose", Bt); else if (o.code !== a) zt(t); else {
                if (void 0 !== r.shaderID) return;
                s = !1;
            }
            if (s) {
                if (r.shaderID) {
                    var c = bi[r.shaderID];
                    n.shader = {
                        name: t.type,
                        uniforms: yi.clone(c.uniforms),
                        vertexShader: c.vertexShader,
                        fragmentShader: c.fragmentShader
                    };
                } else n.shader = {
                    name: t.type,
                    uniforms: t.uniforms,
                    vertexShader: t.vertexShader,
                    fragmentShader: t.fragmentShader
                };
                t.onBeforeCompile(n.shader), o = B.acquireProgram(t, n.shader, r, a), n.program = o, 
                t.program = o;
            }
            var h = o.getAttributes();
            if (t.morphTargets) {
                t.numSupportedMorphTargets = 0;
                for (var u = 0; u < q.maxMorphTargets; u++) h["morphTarget" + u] >= 0 && t.numSupportedMorphTargets++;
            }
            if (t.morphNormals) {
                t.numSupportedMorphNormals = 0;
                for (u = 0; u < q.maxMorphNormals; u++) h["morphNormal" + u] >= 0 && t.numSupportedMorphNormals++;
            }
            var p = n.shader.uniforms;
            (t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (n.numClippingPlanes = _t.numPlanes, 
            n.numIntersection = _t.numIntersection, p.clippingPlanes = _t.uniform), n.fog = e, 
            n.lightsHash = F.state.hash, t.lights && (p.ambientLightColor.value = F.state.ambient, 
            p.directionalLights.value = F.state.directional, p.spotLights.value = F.state.spot, 
            p.rectAreaLights.value = F.state.rectArea, p.pointLights.value = F.state.point, 
            p.hemisphereLights.value = F.state.hemi, p.directionalShadowMap.value = F.state.directionalShadowMap, 
            p.directionalShadowMatrix.value = F.state.directionalShadowMatrix, p.spotShadowMap.value = F.state.spotShadowMap, 
            p.spotShadowMatrix.value = F.state.spotShadowMatrix, p.pointShadowMap.value = F.state.pointShadowMap, 
            p.pointShadowMatrix.value = F.state.pointShadowMatrix);
            var d = n.program.getUniforms(), f = fi.seqWithValue(d.seq, p);
            n.uniformsList = f;
        }
        function Yt(t, e, i, n) {
            dt = 0;
            var r = S.get(i);
            if (wt && (Mt || t !== st)) {
                var a = t === st && i.id === at;
                _t.setState(i.clippingPlanes, i.clipIntersection, i.clipShadows, t, r, a);
            }
            !1 === i.needsUpdate && (void 0 === r.program ? i.needsUpdate = !0 : i.fog && r.fog !== e ? i.needsUpdate = !0 : i.lights && r.lightsHash !== F.state.hash ? i.needsUpdate = !0 : void 0 === r.numClippingPlanes || r.numClippingPlanes === _t.numPlanes && r.numIntersection === _t.numIntersection || (i.needsUpdate = !0)), 
            i.needsUpdate && (qt(i, e, n), i.needsUpdate = !1);
            var o, s, c = !1, h = !1, l = !1, u = r.program, p = u.getUniforms(), d = r.shader.uniforms;
            if (w.useProgram(u.program) && (c = !0, h = !0, l = !0), i.id !== at && (at = i.id, 
            h = !0), c || t !== st) {
                if (p.setValue(f, "projectionMatrix", t.projectionMatrix), _.logarithmicDepthBuffer && p.setValue(f, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), 
                st !== (ht || t) && (st = ht || t, h = !0, l = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.envMap) {
                    var m = p.map.cameraPosition;
                    void 0 !== m && m.setValue(f, Tt.setFromMatrixPosition(t.matrixWorld));
                }
                (i.isMeshPhongMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.skinning) && p.setValue(f, "viewMatrix", t.matrixWorldInverse);
            }
            if (i.skinning) {
                p.setOptional(f, n, "bindMatrix"), p.setOptional(f, n, "bindMatrixInverse");
                var g = n.skeleton;
                if (g) {
                    var v = g.bones;
                    if (_.floatVertexTextures) {
                        if (void 0 === g.boneTexture) {
                            var y = Math.sqrt(4 * v.length);
                            y = ve.ceilPowerOfTwo(y), y = Math.max(y, 4);
                            var x = new Float32Array(y * y * 4);
                            x.set(g.boneMatrices);
                            var b = new Re(x, y, y, Vt, Dt);
                            g.boneMatrices = x, g.boneTexture = b, g.boneTextureSize = y;
                        }
                        p.setValue(f, "boneTexture", g.boneTexture), p.setValue(f, "boneTextureSize", g.boneTextureSize);
                    } else p.setOptional(f, g, "boneMatrices");
                }
            }
            return h && (p.setValue(f, "toneMappingExposure", q.toneMappingExposure), p.setValue(f, "toneMappingWhitePoint", q.toneMappingWhitePoint), 
            i.lights && (s = l, (o = d).ambientLightColor.needsUpdate = s, o.directionalLights.needsUpdate = s, 
            o.pointLights.needsUpdate = s, o.spotLights.needsUpdate = s, o.rectAreaLights.needsUpdate = s, 
            o.hemisphereLights.needsUpdate = s), e && i.fog && function(t, e) {
                t.fogColor.value = e.color, e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density);
            }(d, e), i.isMeshBasicMaterial ? Zt(d, i) : i.isMeshLambertMaterial ? (Zt(d, i), 
            function(t, e) {
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
            }(d, i)) : i.isMeshPhongMaterial ? (Zt(d, i), i.isMeshToonMaterial ? function(t, e) {
                Jt(t, e), e.gradientMap && (t.gradientMap.value = e.gradientMap);
            }(d, i) : Jt(d, i)) : i.isMeshStandardMaterial ? (Zt(d, i), i.isMeshPhysicalMaterial ? function(t, e) {
                t.clearCoat.value = e.clearCoat, t.clearCoatRoughness.value = e.clearCoatRoughness, 
                Qt(t, e);
            }(d, i) : Qt(d, i)) : i.isMeshDepthMaterial ? (Zt(d, i), function(t, e) {
                e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, 
                t.displacementBias.value = e.displacementBias);
            }(d, i)) : i.isMeshDistanceMaterial ? (Zt(d, i), function(t, e) {
                e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, 
                t.displacementBias.value = e.displacementBias);
                t.referencePosition.value.copy(e.referencePosition), t.nearDistance.value = e.nearDistance, 
                t.farDistance.value = e.farDistance;
            }(d, i)) : i.isMeshNormalMaterial ? (Zt(d, i), function(t, e) {
                e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale);
                e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale));
                e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, 
                t.displacementBias.value = e.displacementBias);
            }(d, i)) : i.isLineBasicMaterial ? (function(t, e) {
                t.diffuse.value = e.color, t.opacity.value = e.opacity;
            }(d, i), i.isLineDashedMaterial && function(t, e) {
                t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale;
            }(d, i)) : i.isPointsMaterial ? function(t, e) {
                if (t.diffuse.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size * gt, 
                t.scale.value = .5 * mt, t.map.value = e.map, null !== e.map) {
                    if (!0 === e.map.matrixAutoUpdate) {
                        var i = e.map.offset, n = e.map.repeat, r = e.map.rotation, a = e.map.center;
                        e.map.matrix.setUvTransform(i.x, i.y, n.x, n.y, r, a.x, a.y);
                    }
                    t.uvTransform.value.copy(e.map.matrix);
                }
            }(d, i) : i.isShadowMaterial && (d.color.value = i.color, d.opacity.value = i.opacity), 
            void 0 !== d.ltcMat && (d.ltcMat.value = vi.LTC_MAT_TEXTURE), void 0 !== d.ltcMag && (d.ltcMag.value = vi.LTC_MAG_TEXTURE), 
            fi.upload(f, r.uniformsList, d, q)), p.setValue(f, "modelViewMatrix", n.modelViewMatrix), 
            p.setValue(f, "normalMatrix", n.normalMatrix), p.setValue(f, "modelMatrix", n.matrixWorld), 
            u;
        }
        function Zt(t, e) {
            var i;
            if (t.opacity.value = e.opacity, e.color && (t.diffuse.value = e.color), e.emissive && t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity), 
            e.map && (t.map.value = e.map), e.alphaMap && (t.alphaMap.value = e.alphaMap), e.specularMap && (t.specularMap.value = e.specularMap), 
            e.envMap && (t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1, 
            t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio), 
            e.lightMap && (t.lightMap.value = e.lightMap, t.lightMapIntensity.value = e.lightMapIntensity), 
            e.aoMap && (t.aoMap.value = e.aoMap, t.aoMapIntensity.value = e.aoMapIntensity), 
            e.map ? i = e.map : e.specularMap ? i = e.specularMap : e.displacementMap ? i = e.displacementMap : e.normalMap ? i = e.normalMap : e.bumpMap ? i = e.bumpMap : e.roughnessMap ? i = e.roughnessMap : e.metalnessMap ? i = e.metalnessMap : e.alphaMap ? i = e.alphaMap : e.emissiveMap && (i = e.emissiveMap), 
            void 0 !== i) {
                if (i.isWebGLRenderTarget && (i = i.texture), !0 === i.matrixAutoUpdate) {
                    var n = i.offset, r = i.repeat, a = i.rotation, o = i.center;
                    i.matrix.setUvTransform(n.x, n.y, r.x, r.y, a, o.x, o.y);
                }
                t.uvTransform.value.copy(i.matrix);
            }
        }
        function Jt(t, e) {
            t.specular.value = e.specular, t.shininess.value = Math.max(e.shininess, 1e-4), 
            e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, 
            t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, 
            t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, 
            t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }
        function Qt(t, e) {
            t.roughness.value = e.roughness, t.metalness.value = e.metalness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap), 
            e.metalnessMap && (t.metalnessMap.value = e.metalnessMap), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), 
            e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, 
            t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, 
            t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias), 
            e.envMap && (t.envMapIntensity.value = e.envMapIntensity);
        }
        this.animate = function(t) {
            kt = t, Ht || ((It.getDevice() || window).requestAnimationFrame(jt), Ht = !0);
        }, this.render = function(t, e, i, n) {
            if (e && e.isCamera) {
                if (!Y) {
                    ot = "", at = -1, st = null, !0 === t.autoUpdate && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), 
                    It.enabled && (e = It.getCamera(e)), Et.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), 
                    bt.setFromMatrix(Et), h.length = 0, l.length = 0, p.length = 0, d.length = 0, Mt = this.localClippingEnabled, 
                    wt = _t.init(this.clippingPlanes, Mt, e), (u = z.get(t, e)).init(), function t(e, i, n) {
                        if (!1 === e.visible) return;
                        var r = e.layers.test(i.layers);
                        if (r) if (e.isLight) h.push(e), e.castShadow && l.push(e); else if (e.isSprite) e.frustumCulled && !bt.intersectsSprite(e) || p.push(e); else if (e.isLensFlare) d.push(e); else if (e.isImmediateRenderObject) n && Tt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Et), 
                        u.push(e, null, e.material, Tt.z, null); else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.update(), 
                        !e.frustumCulled || bt.intersectsObject(e))) {
                            n && Tt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Et);
                            var a = N.update(e), o = e.material;
                            if (Array.isArray(o)) for (var s = a.groups, c = 0, f = s.length; c < f; c++) {
                                var m = s[c], g = o[m.materialIndex];
                                g && g.visible && u.push(e, a, g, Tt.z, m);
                            } else o.visible && u.push(e, a, o, Tt.z, null);
                        }
                        var v = e.children;
                        for (var c = 0, f = v.length; c < f; c++) t(v[c], i, n);
                    }(t, e, q.sortObjects), !0 === q.sortObjects && u.sort(), wt && _t.beginShadows(), 
                    Ut.render(l, t, e), F.setup(h, l, e), wt && _t.endShadows(), At.frame++, At.calls = 0, 
                    At.vertices = 0, At.faces = 0, At.points = 0, void 0 === i && (i = null), this.setRenderTarget(i), 
                    G.render(u, t, e, n);
                    var r = u.opaque, a = u.transparent;
                    if (t.overrideMaterial) {
                        var o = t.overrideMaterial;
                        r.length && Wt(r, t, e, o), a.length && Wt(a, t, e, o);
                    } else r.length && Wt(r, t, e), a.length && Wt(a, t, e);
                    W.render(p, t, e), j.render(d, t, e, lt), i && A.updateRenderTargetMipmap(i), w.buffers.depth.setTest(!0), 
                    w.buffers.depth.setMask(!0), w.buffers.color.setMask(!0), w.setPolygonOffset(!1), 
                    It.enabled && It.submitFrame();
                }
            } else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        }, this.setFaceCulling = function(t, e) {
            w.setCullFace(t), w.setFlipSided(e === x);
        }, this.allocTextureUnit = function() {
            var t = dt;
            return t >= _.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + t + " texture units while this GPU supports only " + _.maxTextures), 
            dt += 1, t;
        }, this.setTexture2D = (Gt = !1, function(t, e) {
            t && t.isWebGLRenderTarget && (Gt || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), 
            Gt = !0), t = t.texture), A.setTexture2D(t, e);
        }), this.setTexture = function() {
            var t = !1;
            return function(e, i) {
                t || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), 
                t = !0), A.setTexture2D(e, i);
            };
        }(), this.setTextureCube = function() {
            var t = !1;
            return function(e, i) {
                e && e.isWebGLRenderTargetCube && (t || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), 
                t = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? A.setTextureCube(e, i) : A.setTextureCubeDynamic(e, i);
            };
        }(), this.getRenderTarget = function() {
            return Z;
        }, this.setRenderTarget = function(t) {
            Z = t, t && void 0 === S.get(t).__webglFramebuffer && A.setupRenderTarget(t);
            var e = null, i = !1;
            if (t) {
                var n = S.get(t).__webglFramebuffer;
                t.isWebGLRenderTargetCube ? (e = n[t.activeCubeFace], i = !0) : e = n, lt.copy(t.viewport), 
                ut.copy(t.scissor), pt = t.scissorTest;
            } else lt.copy(vt).multiplyScalar(gt), ut.copy(yt).multiplyScalar(gt), pt = xt;
            if (rt !== e && (f.bindFramebuffer(f.FRAMEBUFFER, e), rt = e), w.viewport(lt), w.scissor(ut), 
            w.setScissorTest(pt), i) {
                var r = S.get(t.texture);
                f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_CUBE_MAP_POSITIVE_X + t.activeCubeFace, r.__webglTexture, t.activeMipMapLevel);
            }
        }, this.readRenderTargetPixels = function(t, e, i, n, r, a) {
            if (t && t.isWebGLRenderTarget) {
                var o = S.get(t).__webglFramebuffer;
                if (o) {
                    var s = !1;
                    o !== rt && (f.bindFramebuffer(f.FRAMEBUFFER, o), s = !0);
                    try {
                        var c = t.texture, h = c.format, l = c.type;
                        if (h !== Vt && X.convert(h) !== f.getParameter(f.IMPLEMENTATION_COLOR_READ_FORMAT)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                        if (!(l === Rt || X.convert(l) === f.getParameter(f.IMPLEMENTATION_COLOR_READ_TYPE) || l === Dt && (b.get("OES_texture_float") || b.get("WEBGL_color_buffer_float")) || l === Ot && b.get("EXT_color_buffer_half_float"))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                        f.checkFramebufferStatus(f.FRAMEBUFFER) === f.FRAMEBUFFER_COMPLETE ? e >= 0 && e <= t.width - n && i >= 0 && i <= t.height - r && f.readPixels(e, i, n, r, X.convert(h), X.convert(l), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
                    } finally {
                        s && f.bindFramebuffer(f.FRAMEBUFFER, rt);
                    }
                }
            } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        };
    }
    function or(t, e) {
        this.name = "", this.color = new gi(t), this.density = void 0 !== e ? e : 25e-5;
    }
    function sr(t, e, i) {
        this.name = "", this.color = new gi(t), this.near = void 0 !== e ? e : 1, this.far = void 0 !== i ? i : 1e3;
    }
    function cr() {
        Zi.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, 
        this.autoUpdate = !0;
    }
    function hr(t, e, i, n, r) {
        Zi.call(this), this.lensFlares = [], this.positionScreen = new _e(), this.customUpdateCallback = void 0, 
        void 0 !== t && this.add(t, e, i, n, r);
    }
    function lr(t) {
        Ui.call(this), this.type = "SpriteMaterial", this.color = new gi(16777215), this.map = null, 
        this.rotation = 0, this.fog = !1, this.lights = !1, this.setValues(t);
    }
    function ur(t) {
        Zi.call(this), this.type = "Sprite", this.material = void 0 !== t ? t : new lr();
    }
    function pr() {
        Zi.call(this), this.type = "LOD", Object.defineProperties(this, {
            levels: {
                enumerable: !0,
                value: []
            }
        });
    }
    function dr(t, e) {
        if (t = t || [], this.bones = t.slice(0), this.boneMatrices = new Float32Array(16 * this.bones.length), 
        void 0 === e) this.calculateInverses(); else if (this.bones.length === e.length) this.boneInverses = e.slice(0); else {
            console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = [];
            for (var i = 0, n = this.bones.length; i < n; i++) this.boneInverses.push(new xe());
        }
    }
    function fr() {
        Zi.call(this), this.type = "Bone";
    }
    function mr(t, e) {
        Un.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new xe(), 
        this.bindMatrixInverse = new xe();
        var i = new dr(this.initBones());
        this.bind(i, this.matrixWorld), this.normalizeSkinWeights();
    }
    function gr(t) {
        Ui.call(this), this.type = "LineBasicMaterial", this.color = new gi(16777215), this.linewidth = 1, 
        this.linecap = "round", this.linejoin = "round", this.lights = !1, this.setValues(t);
    }
    function vr(t, e, i) {
        if (1 === i) return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), 
        new yr(t, e);
        Zi.call(this), this.type = "Line", this.geometry = void 0 !== t ? t : new Mn(), 
        this.material = void 0 !== e ? e : new gr({
            color: 16777215 * Math.random()
        });
    }
    function yr(t, e) {
        vr.call(this, t, e), this.type = "LineSegments";
    }
    function xr(t, e) {
        vr.call(this, t, e), this.type = "LineLoop";
    }
    function br(t) {
        Ui.call(this), this.type = "PointsMaterial", this.color = new gi(16777215), this.map = null, 
        this.size = 1, this.sizeAttenuation = !0, this.lights = !1, this.setValues(t);
    }
    function _r(t, e) {
        Zi.call(this), this.type = "Points", this.geometry = void 0 !== t ? t : new Mn(), 
        this.material = void 0 !== e ? e : new br({
            color: 16777215 * Math.random()
        });
    }
    function wr() {
        Zi.call(this), this.type = "Group";
    }
    function Mr(t, e, i, n, r, a, o, s, c) {
        Ee.call(this, t, e, i, n, r, a, o, s, c), this.generateMipmaps = !1;
        var h = this;
        requestAnimationFrame(function e() {
            t.readyState >= t.HAVE_CURRENT_DATA && (h.needsUpdate = !0), requestAnimationFrame(e);
        });
    }
    function Er(t, e, i, n, r, a, o, s, c, h, l, u) {
        Ee.call(this, null, a, o, s, c, h, n, r, l, u), this.image = {
            width: e,
            height: i
        }, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1;
    }
    function Tr(t, e, i, n, r, a, o, s, c, h) {
        if ((h = void 0 !== h ? h : Xt) !== Xt && h !== qt) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        void 0 === i && h === Xt && (i = Ct), void 0 === i && h === qt && (i = zt), Ee.call(this, null, n, r, a, o, s, h, i, c), 
        this.image = {
            width: t,
            height: e
        }, this.magFilter = void 0 !== o ? o : wt, this.minFilter = void 0 !== s ? s : wt, 
        this.flipY = !1, this.generateMipmaps = !1;
    }
    function Sr(t) {
        Mn.call(this), this.type = "WireframeGeometry";
        var e, i, n, r, a, o, s, c, h, l, u = [], p = [ 0, 0 ], d = {}, f = [ "a", "b", "c" ];
        if (t && t.isGeometry) {
            var m = t.faces;
            for (e = 0, n = m.length; e < n; e++) {
                var g = m[e];
                for (i = 0; i < 3; i++) s = g[f[i]], c = g[f[(i + 1) % 3]], p[0] = Math.min(s, c), 
                p[1] = Math.max(s, c), void 0 === d[h = p[0] + "," + p[1]] && (d[h] = {
                    index1: p[0],
                    index2: p[1]
                });
            }
            for (h in d) o = d[h], l = t.vertices[o.index1], u.push(l.x, l.y, l.z), l = t.vertices[o.index2], 
            u.push(l.x, l.y, l.z);
        } else if (t && t.isBufferGeometry) {
            var v, y, x, b, _, w, M;
            if (l = new _e(), null !== t.index) {
                for (v = t.attributes.position, y = t.index, 0 === (x = t.groups).length && (x = [ {
                    start: 0,
                    count: y.count,
                    materialIndex: 0
                } ]), r = 0, a = x.length; r < a; ++r) for (e = _ = (b = x[r]).start, n = _ + b.count; e < n; e += 3) for (i = 0; i < 3; i++) s = y.getX(e + i), 
                c = y.getX(e + (i + 1) % 3), p[0] = Math.min(s, c), p[1] = Math.max(s, c), void 0 === d[h = p[0] + "," + p[1]] && (d[h] = {
                    index1: p[0],
                    index2: p[1]
                });
                for (h in d) o = d[h], l.fromBufferAttribute(v, o.index1), u.push(l.x, l.y, l.z), 
                l.fromBufferAttribute(v, o.index2), u.push(l.x, l.y, l.z);
            } else for (e = 0, n = (v = t.attributes.position).count / 3; e < n; e++) for (i = 0; i < 3; i++) w = 3 * e + i, 
            l.fromBufferAttribute(v, w), u.push(l.x, l.y, l.z), M = 3 * e + (i + 1) % 3, l.fromBufferAttribute(v, M), 
            u.push(l.x, l.y, l.z);
        }
        this.addAttribute("position", new un(u, 3));
    }
    function Ar(t, e, i) {
        en.call(this), this.type = "ParametricGeometry", this.parameters = {
            func: t,
            slices: e,
            stacks: i
        }, this.fromBufferGeometry(new Rr(t, e, i)), this.mergeVertices();
    }
    function Rr(t, e, i) {
        Mn.call(this), this.type = "ParametricBufferGeometry", this.parameters = {
            func: t,
            slices: e,
            stacks: i
        };
        var n, r, a = [], o = [], s = [], c = [], h = new _e(), l = new _e(), u = new _e(), p = new _e(), d = new _e(), f = e + 1;
        for (n = 0; n <= i; n++) {
            var m = n / i;
            for (r = 0; r <= e; r++) {
                var g = r / e;
                l = t(g, m, l), o.push(l.x, l.y, l.z), g - 1e-5 >= 0 ? (u = t(g - 1e-5, m, u), p.subVectors(l, u)) : (u = t(g + 1e-5, m, u), 
                p.subVectors(u, l)), m - 1e-5 >= 0 ? (u = t(g, m - 1e-5, u), d.subVectors(l, u)) : (u = t(g, m + 1e-5, u), 
                d.subVectors(u, l)), h.crossVectors(p, d).normalize(), s.push(h.x, h.y, h.z), c.push(g, m);
            }
        }
        for (n = 0; n < i; n++) for (r = 0; r < e; r++) {
            var v = n * f + r, y = n * f + r + 1, x = (n + 1) * f + r + 1, b = (n + 1) * f + r;
            a.push(v, y, b), a.push(y, x, b);
        }
        this.setIndex(a), this.addAttribute("position", new un(o, 3)), this.addAttribute("normal", new un(s, 3)), 
        this.addAttribute("uv", new un(c, 2));
    }
    function Lr(t, e, i, n) {
        en.call(this), this.type = "PolyhedronGeometry", this.parameters = {
            vertices: t,
            indices: e,
            radius: i,
            detail: n
        }, this.fromBufferGeometry(new Pr(t, e, i, n)), this.mergeVertices();
    }
    function Pr(t, e, i, n) {
        Mn.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = {
            vertices: t,
            indices: e,
            radius: i,
            detail: n
        }, i = i || 1;
        var r = [], a = [];
        function o(t, e, i, n) {
            var r, a, o = Math.pow(2, n), c = [];
            for (r = 0; r <= o; r++) {
                c[r] = [];
                var h = t.clone().lerp(i, r / o), l = e.clone().lerp(i, r / o), u = o - r;
                for (a = 0; a <= u; a++) c[r][a] = 0 === a && r === o ? h : h.clone().lerp(l, a / u);
            }
            for (r = 0; r < o; r++) for (a = 0; a < 2 * (o - r) - 1; a++) {
                var p = Math.floor(a / 2);
                a % 2 == 0 ? (s(c[r][p + 1]), s(c[r + 1][p]), s(c[r][p])) : (s(c[r][p + 1]), s(c[r + 1][p + 1]), 
                s(c[r + 1][p]));
            }
        }
        function s(t) {
            r.push(t.x, t.y, t.z);
        }
        function c(e, i) {
            var n = 3 * e;
            i.x = t[n + 0], i.y = t[n + 1], i.z = t[n + 2];
        }
        function h(t, e, i, n) {
            n < 0 && 1 === t.x && (a[e] = t.x - 1), 0 === i.x && 0 === i.z && (a[e] = n / 2 / Math.PI + .5);
        }
        function l(t) {
            return Math.atan2(t.z, -t.x);
        }
        !function(t) {
            for (var i = new _e(), n = new _e(), r = new _e(), a = 0; a < e.length; a += 3) c(e[a + 0], i), 
            c(e[a + 1], n), c(e[a + 2], r), o(i, n, r, t);
        }(n = n || 0), function(t) {
            for (var e = new _e(), i = 0; i < r.length; i += 3) e.x = r[i + 0], e.y = r[i + 1], 
            e.z = r[i + 2], e.normalize().multiplyScalar(t), r[i + 0] = e.x, r[i + 1] = e.y, 
            r[i + 2] = e.z;
        }(i), function() {
            for (var t = new _e(), e = 0; e < r.length; e += 3) {
                t.x = r[e + 0], t.y = r[e + 1], t.z = r[e + 2];
                var i = l(t) / 2 / Math.PI + .5, n = (o = t, Math.atan2(-o.y, Math.sqrt(o.x * o.x + o.z * o.z)) / Math.PI + .5);
                a.push(i, 1 - n);
            }
            var o;
            (function() {
                for (var t = new _e(), e = new _e(), i = new _e(), n = new _e(), o = new ye(), s = new ye(), c = new ye(), u = 0, p = 0; u < r.length; u += 9, 
                p += 6) {
                    t.set(r[u + 0], r[u + 1], r[u + 2]), e.set(r[u + 3], r[u + 4], r[u + 5]), i.set(r[u + 6], r[u + 7], r[u + 8]), 
                    o.set(a[p + 0], a[p + 1]), s.set(a[p + 2], a[p + 3]), c.set(a[p + 4], a[p + 5]), 
                    n.copy(t).add(e).add(i).divideScalar(3);
                    var d = l(n);
                    h(o, p + 0, t, d), h(s, p + 2, e, d), h(c, p + 4, i, d);
                }
            })(), function() {
                for (var t = 0; t < a.length; t += 6) {
                    var e = a[t + 0], i = a[t + 2], n = a[t + 4], r = Math.max(e, i, n), o = Math.min(e, i, n);
                    r > .9 && o < .1 && (e < .2 && (a[t + 0] += 1), i < .2 && (a[t + 2] += 1), n < .2 && (a[t + 4] += 1));
                }
            }();
        }(), this.addAttribute("position", new un(r, 3)), this.addAttribute("normal", new un(r.slice(), 3)), 
        this.addAttribute("uv", new un(a, 2)), 0 === n ? this.computeVertexNormals() : this.normalizeNormals();
    }
    function Cr(t, e) {
        en.call(this), this.type = "TetrahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Ir(t, e)), this.mergeVertices();
    }
    function Ir(t, e) {
        Pr.call(this, [ 1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1 ], [ 2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1 ], t, e), 
        this.type = "TetrahedronBufferGeometry", this.parameters = {
            radius: t,
            detail: e
        };
    }
    function Ur(t, e) {
        en.call(this), this.type = "OctahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Dr(t, e)), this.mergeVertices();
    }
    function Dr(t, e) {
        Pr.call(this, [ 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1 ], [ 0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2 ], t, e), 
        this.type = "OctahedronBufferGeometry", this.parameters = {
            radius: t,
            detail: e
        };
    }
    function Or(t, e) {
        en.call(this), this.type = "IcosahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Nr(t, e)), this.mergeVertices();
    }
    function Nr(t, e) {
        var i = (1 + Math.sqrt(5)) / 2, n = [ -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1 ];
        Pr.call(this, n, [ 0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1 ], t, e), 
        this.type = "IcosahedronBufferGeometry", this.parameters = {
            radius: t,
            detail: e
        };
    }
    function Fr(t, e) {
        en.call(this), this.type = "DodecahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Br(t, e)), this.mergeVertices();
    }
    function Br(t, e) {
        var i = (1 + Math.sqrt(5)) / 2, n = 1 / i, r = [ -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, 0, -i, 0, -n, i, 0, -n, -i, 0, n, i, 0, n ];
        Pr.call(this, r, [ 3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9 ], t, e), 
        this.type = "DodecahedronBufferGeometry", this.parameters = {
            radius: t,
            detail: e
        };
    }
    function zr(t, e, i, n, r, a) {
        en.call(this), this.type = "TubeGeometry", this.parameters = {
            path: t,
            tubularSegments: e,
            radius: i,
            radialSegments: n,
            closed: r
        }, void 0 !== a && console.warn("THREE.TubeGeometry: taper has been removed.");
        var o = new Gr(t, e, i, n, r);
        this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals, 
        this.fromBufferGeometry(o), this.mergeVertices();
    }
    function Gr(t, e, i, n, r) {
        Mn.call(this), this.type = "TubeBufferGeometry", this.parameters = {
            path: t,
            tubularSegments: e,
            radius: i,
            radialSegments: n,
            closed: r
        }, e = e || 64, i = i || 1, n = n || 8, r = r || !1;
        var a = t.computeFrenetFrames(e, r);
        this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
        var o, s, c = new _e(), h = new _e(), l = new ye(), u = new _e(), p = [], d = [], f = [], m = [];
        function g(r) {
            u = t.getPointAt(r / e, u);
            var o = a.normals[r], l = a.binormals[r];
            for (s = 0; s <= n; s++) {
                var f = s / n * Math.PI * 2, m = Math.sin(f), g = -Math.cos(f);
                h.x = g * o.x + m * l.x, h.y = g * o.y + m * l.y, h.z = g * o.z + m * l.z, h.normalize(), 
                d.push(h.x, h.y, h.z), c.x = u.x + i * h.x, c.y = u.y + i * h.y, c.z = u.z + i * h.z, 
                p.push(c.x, c.y, c.z);
            }
        }
        !function() {
            for (o = 0; o < e; o++) g(o);
            g(!1 === r ? e : 0), function() {
                for (o = 0; o <= e; o++) for (s = 0; s <= n; s++) l.x = o / e, l.y = s / n, f.push(l.x, l.y);
            }(), function() {
                for (s = 1; s <= e; s++) for (o = 1; o <= n; o++) {
                    var t = (n + 1) * (s - 1) + (o - 1), i = (n + 1) * s + (o - 1), r = (n + 1) * s + o, a = (n + 1) * (s - 1) + o;
                    m.push(t, i, a), m.push(i, r, a);
                }
            }();
        }(), this.setIndex(m), this.addAttribute("position", new un(p, 3)), this.addAttribute("normal", new un(d, 3)), 
        this.addAttribute("uv", new un(f, 2));
    }
    function Hr(t, e, i, n, r, a, o) {
        en.call(this), this.type = "TorusKnotGeometry", this.parameters = {
            radius: t,
            tube: e,
            tubularSegments: i,
            radialSegments: n,
            p: r,
            q: a
        }, void 0 !== o && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), 
        this.fromBufferGeometry(new Vr(t, e, i, n, r, a)), this.mergeVertices();
    }
    function Vr(t, e, i, n, r, a) {
        Mn.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = {
            radius: t,
            tube: e,
            tubularSegments: i,
            radialSegments: n,
            p: r,
            q: a
        }, t = t || 1, e = e || .4, i = Math.floor(i) || 64, n = Math.floor(n) || 8, r = r || 2, 
        a = a || 3;
        var o, s, c = [], h = [], l = [], u = [], p = new _e(), d = new _e(), f = new _e(), m = new _e(), g = new _e(), v = new _e(), y = new _e();
        for (o = 0; o <= i; ++o) {
            var x = o / i * r * Math.PI * 2;
            for (A(x, r, a, t, f), A(x + .01, r, a, t, m), v.subVectors(m, f), y.addVectors(m, f), 
            g.crossVectors(v, y), y.crossVectors(g, v), g.normalize(), y.normalize(), s = 0; s <= n; ++s) {
                var b = s / n * Math.PI * 2, _ = -e * Math.cos(b), w = e * Math.sin(b);
                p.x = f.x + (_ * y.x + w * g.x), p.y = f.y + (_ * y.y + w * g.y), p.z = f.z + (_ * y.z + w * g.z), 
                h.push(p.x, p.y, p.z), d.subVectors(p, f).normalize(), l.push(d.x, d.y, d.z), u.push(o / i), 
                u.push(s / n);
            }
        }
        for (s = 1; s <= i; s++) for (o = 1; o <= n; o++) {
            var M = (n + 1) * (s - 1) + (o - 1), E = (n + 1) * s + (o - 1), T = (n + 1) * s + o, S = (n + 1) * (s - 1) + o;
            c.push(M, E, S), c.push(E, T, S);
        }
        function A(t, e, i, n, r) {
            var a = Math.cos(t), o = Math.sin(t), s = i / e * t, c = Math.cos(s);
            r.x = n * (2 + c) * .5 * a, r.y = n * (2 + c) * o * .5, r.z = n * Math.sin(s) * .5;
        }
        this.setIndex(c), this.addAttribute("position", new un(h, 3)), this.addAttribute("normal", new un(l, 3)), 
        this.addAttribute("uv", new un(u, 2));
    }
    function kr(t, e, i, n, r) {
        en.call(this), this.type = "TorusGeometry", this.parameters = {
            radius: t,
            tube: e,
            radialSegments: i,
            tubularSegments: n,
            arc: r
        }, this.fromBufferGeometry(new jr(t, e, i, n, r)), this.mergeVertices();
    }
    function jr(t, e, i, n, r) {
        Mn.call(this), this.type = "TorusBufferGeometry", this.parameters = {
            radius: t,
            tube: e,
            radialSegments: i,
            tubularSegments: n,
            arc: r
        }, t = t || 1, e = e || .4, i = Math.floor(i) || 8, n = Math.floor(n) || 6, r = r || 2 * Math.PI;
        var a, o, s = [], c = [], h = [], l = [], u = new _e(), p = new _e(), d = new _e();
        for (a = 0; a <= i; a++) for (o = 0; o <= n; o++) {
            var f = o / n * r, m = a / i * Math.PI * 2;
            p.x = (t + e * Math.cos(m)) * Math.cos(f), p.y = (t + e * Math.cos(m)) * Math.sin(f), 
            p.z = e * Math.sin(m), c.push(p.x, p.y, p.z), u.x = t * Math.cos(f), u.y = t * Math.sin(f), 
            d.subVectors(p, u).normalize(), h.push(d.x, d.y, d.z), l.push(o / n), l.push(a / i);
        }
        for (a = 1; a <= i; a++) for (o = 1; o <= n; o++) {
            var g = (n + 1) * a + o - 1, v = (n + 1) * (a - 1) + o - 1, y = (n + 1) * (a - 1) + o, x = (n + 1) * a + o;
            s.push(g, v, x), s.push(v, y, x);
        }
        this.setIndex(s), this.addAttribute("position", new un(c, 3)), this.addAttribute("normal", new un(h, 3)), 
        this.addAttribute("uv", new un(l, 2));
    }
    ir.prototype = Object.assign(Object.create(Ji.prototype), {
        constructor: ir,
        isPerspectiveCamera: !0,
        copy: function(t, e) {
            return Ji.prototype.copy.call(this, t, e), this.fov = t.fov, this.zoom = t.zoom, 
            this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, 
            this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, 
            this.filmOffset = t.filmOffset, this;
        },
        setFocalLength: function(t) {
            var e = .5 * this.getFilmHeight() / t;
            this.fov = 2 * ve.RAD2DEG * Math.atan(e), this.updateProjectionMatrix();
        },
        getFocalLength: function() {
            var t = Math.tan(.5 * ve.DEG2RAD * this.fov);
            return .5 * this.getFilmHeight() / t;
        },
        getEffectiveFOV: function() {
            return 2 * ve.RAD2DEG * Math.atan(Math.tan(.5 * ve.DEG2RAD * this.fov) / this.zoom);
        },
        getFilmWidth: function() {
            return this.filmGauge * Math.min(this.aspect, 1);
        },
        getFilmHeight: function() {
            return this.filmGauge / Math.max(this.aspect, 1);
        },
        setViewOffset: function(t, e, i, n, r, a) {
            this.aspect = t / e, null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = i, 
            this.view.offsetY = n, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
        },
        clearViewOffset: function() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
        },
        updateProjectionMatrix: function() {
            var t = this.near, e = t * Math.tan(.5 * ve.DEG2RAD * this.fov) / this.zoom, i = 2 * e, n = this.aspect * i, r = -.5 * n, a = this.view;
            if (null !== this.view && this.view.enabled) {
                var o = a.fullWidth, s = a.fullHeight;
                r += a.offsetX * n / o, e -= a.offsetY * i / s, n *= a.width / o, i *= a.height / s;
            }
            var c = this.filmOffset;
            0 !== c && (r += t * c / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + n, e, e - i, t, this.far);
        },
        toJSON: function(t) {
            var e = Zi.prototype.toJSON.call(this, t);
            return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, 
            e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, 
            null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, 
            e.object.filmOffset = this.filmOffset, e;
        }
    }), nr.prototype = Object.assign(Object.create(ir.prototype), {
        constructor: nr,
        isArrayCamera: !0
    }), or.prototype.isFogExp2 = !0, or.prototype.clone = function() {
        return new or(this.color.getHex(), this.density);
    }, or.prototype.toJSON = function() {
        return {
            type: "FogExp2",
            color: this.color.getHex(),
            density: this.density
        };
    }, sr.prototype.isFog = !0, sr.prototype.clone = function() {
        return new sr(this.color.getHex(), this.near, this.far);
    }, sr.prototype.toJSON = function() {
        return {
            type: "Fog",
            color: this.color.getHex(),
            near: this.near,
            far: this.far
        };
    }, cr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: cr,
        copy: function(t, e) {
            return Zi.prototype.copy.call(this, t, e), null !== t.background && (this.background = t.background.clone()), 
            null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), 
            this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this;
        },
        toJSON: function(t) {
            var e = Zi.prototype.toJSON.call(this, t);
            return null !== this.background && (e.object.background = this.background.toJSON(t)), 
            null !== this.fog && (e.object.fog = this.fog.toJSON()), e;
        }
    }), hr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: hr,
        isLensFlare: !0,
        copy: function(t) {
            Zi.prototype.copy.call(this, t), this.positionScreen.copy(t.positionScreen), this.customUpdateCallback = t.customUpdateCallback;
            for (var e = 0, i = t.lensFlares.length; e < i; e++) this.lensFlares.push(t.lensFlares[e]);
            return this;
        },
        add: function(t, e, i, n, r, a) {
            void 0 === e && (e = -1), void 0 === i && (i = 0), void 0 === a && (a = 1), void 0 === r && (r = new gi(16777215)), 
            void 0 === n && (n = L), i = Math.min(i, Math.max(0, i)), this.lensFlares.push({
                texture: t,
                size: e,
                distance: i,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 0,
                opacity: a,
                color: r,
                blending: n
            });
        },
        updateLensFlares: function() {
            var t, e, i = this.lensFlares.length, n = 2 * -this.positionScreen.x, r = 2 * -this.positionScreen.y;
            for (t = 0; t < i; t++) (e = this.lensFlares[t]).x = this.positionScreen.x + n * e.distance, 
            e.y = this.positionScreen.y + r * e.distance, e.wantedRotation = e.x * Math.PI * .25, 
            e.rotation += .25 * (e.wantedRotation - e.rotation);
        }
    }), lr.prototype = Object.create(Ui.prototype), lr.prototype.constructor = lr, lr.prototype.isSpriteMaterial = !0, 
    lr.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, 
        this.rotation = t.rotation, this;
    }, ur.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: ur,
        isSprite: !0,
        raycast: (Gn = new _e(), Hn = new _e(), Vn = new _e(), function(t, e) {
            Hn.setFromMatrixPosition(this.matrixWorld), t.ray.closestPointToPoint(Hn, Gn), Vn.setFromMatrixScale(this.matrixWorld);
            var i = Vn.x * Vn.y / 4;
            if (!(Hn.distanceToSquared(Gn) > i)) {
                var n = t.ray.origin.distanceTo(Gn);
                n < t.near || n > t.far || e.push({
                    distance: n,
                    point: Gn.clone(),
                    face: null,
                    object: this
                });
            }
        }),
        clone: function() {
            return new this.constructor(this.material).copy(this);
        }
    }), pr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: pr,
        copy: function(t) {
            Zi.prototype.copy.call(this, t, !1);
            for (var e = t.levels, i = 0, n = e.length; i < n; i++) {
                var r = e[i];
                this.addLevel(r.object.clone(), r.distance);
            }
            return this;
        },
        addLevel: function(t, e) {
            void 0 === e && (e = 0), e = Math.abs(e);
            for (var i = this.levels, n = 0; n < i.length && !(e < i[n].distance); n++) ;
            i.splice(n, 0, {
                distance: e,
                object: t
            }), this.add(t);
        },
        getObjectForDistance: function(t) {
            for (var e = this.levels, i = 1, n = e.length; i < n && !(t < e[i].distance); i++) ;
            return e[i - 1].object;
        },
        raycast: (kn = new _e(), function(t, e) {
            kn.setFromMatrixPosition(this.matrixWorld);
            var i = t.ray.origin.distanceTo(kn);
            this.getObjectForDistance(i).raycast(t, e);
        }),
        update: function() {
            var t = new _e(), e = new _e();
            return function(i) {
                var n = this.levels;
                if (n.length > 1) {
                    t.setFromMatrixPosition(i.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
                    var r = t.distanceTo(e);
                    n[0].object.visible = !0;
                    for (var a = 1, o = n.length; a < o && r >= n[a].distance; a++) n[a - 1].object.visible = !1, 
                    n[a].object.visible = !0;
                    for (;a < o; a++) n[a].object.visible = !1;
                }
            };
        }(),
        toJSON: function(t) {
            var e = Zi.prototype.toJSON.call(this, t);
            e.object.levels = [];
            for (var i = this.levels, n = 0, r = i.length; n < r; n++) {
                var a = i[n];
                e.object.levels.push({
                    object: a.object.uuid,
                    distance: a.distance
                });
            }
            return e;
        }
    }), Object.assign(dr.prototype, {
        calculateInverses: function() {
            this.boneInverses = [];
            for (var t = 0, e = this.bones.length; t < e; t++) {
                var i = new xe();
                this.bones[t] && i.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(i);
            }
        },
        pose: function() {
            var t, e, i;
            for (e = 0, i = this.bones.length; e < i; e++) (t = this.bones[e]) && t.matrixWorld.getInverse(this.boneInverses[e]);
            for (e = 0, i = this.bones.length; e < i; e++) (t = this.bones[e]) && (t.parent && t.parent.isBone ? (t.matrix.getInverse(t.parent.matrixWorld), 
            t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale));
        },
        update: (jn = new xe(), Wn = new xe(), function() {
            for (var t = this.bones, e = this.boneInverses, i = this.boneMatrices, n = this.boneTexture, r = 0, a = t.length; r < a; r++) {
                var o = t[r] ? t[r].matrixWorld : Wn;
                jn.multiplyMatrices(o, e[r]), jn.toArray(i, 16 * r);
            }
            void 0 !== n && (n.needsUpdate = !0);
        }),
        clone: function() {
            return new dr(this.bones, this.boneInverses);
        }
    }), fr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: fr,
        isBone: !0
    }), mr.prototype = Object.assign(Object.create(Un.prototype), {
        constructor: mr,
        isSkinnedMesh: !0,
        initBones: function() {
            var t, e, i, n, r = [];
            if (this.geometry && void 0 !== this.geometry.bones) {
                for (i = 0, n = this.geometry.bones.length; i < n; i++) e = this.geometry.bones[i], 
                t = new fr(), r.push(t), t.name = e.name, t.position.fromArray(e.pos), t.quaternion.fromArray(e.rotq), 
                void 0 !== e.scl && t.scale.fromArray(e.scl);
                for (i = 0, n = this.geometry.bones.length; i < n; i++) -1 !== (e = this.geometry.bones[i]).parent && null !== e.parent && void 0 !== r[e.parent] ? r[e.parent].add(r[i]) : this.add(r[i]);
            }
            return this.updateMatrixWorld(!0), r;
        },
        bind: function(t, e) {
            this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), 
            e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e);
        },
        pose: function() {
            this.skeleton.pose();
        },
        normalizeSkinWeights: function() {
            var t, e;
            if (this.geometry && this.geometry.isGeometry) for (e = 0; e < this.geometry.skinWeights.length; e++) {
                var i = this.geometry.skinWeights[e];
                (t = 1 / i.manhattanLength()) !== 1 / 0 ? i.multiplyScalar(t) : i.set(1, 0, 0, 0);
            } else if (this.geometry && this.geometry.isBufferGeometry) {
                var n = new Te(), r = this.geometry.attributes.skinWeight;
                for (e = 0; e < r.count; e++) n.x = r.getX(e), n.y = r.getY(e), n.z = r.getZ(e), 
                n.w = r.getW(e), (t = 1 / n.manhattanLength()) !== 1 / 0 ? n.multiplyScalar(t) : n.set(1, 0, 0, 0), 
                r.setXYZW(e, n.x, n.y, n.z, n.w);
            }
        },
        updateMatrixWorld: function(t) {
            Un.prototype.updateMatrixWorld.call(this, t), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
        },
        clone: function() {
            return new this.constructor(this.geometry, this.material).copy(this);
        }
    }), gr.prototype = Object.create(Ui.prototype), gr.prototype.constructor = gr, gr.prototype.isLineBasicMaterial = !0, 
    gr.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, 
        this.linecap = t.linecap, this.linejoin = t.linejoin, this;
    }, vr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: vr,
        isLine: !0,
        raycast: function() {
            var t = new xe(), e = new Pn(), i = new Fi();
            return function(n, r) {
                var a = n.linePrecision, o = a * a, s = this.geometry, c = this.matrixWorld;
                if (null === s.boundingSphere && s.computeBoundingSphere(), i.copy(s.boundingSphere), 
                i.applyMatrix4(c), !1 !== n.ray.intersectsSphere(i)) {
                    t.getInverse(c), e.copy(n.ray).applyMatrix4(t);
                    var h = new _e(), l = new _e(), u = new _e(), p = new _e(), d = this && this.isLineSegments ? 2 : 1;
                    if (s.isBufferGeometry) {
                        var f = s.index, m = s.attributes.position.array;
                        if (null !== f) for (var g = f.array, v = 0, y = g.length - 1; v < y; v += d) {
                            var x = g[v], b = g[v + 1];
                            if (h.fromArray(m, 3 * x), l.fromArray(m, 3 * b), !(e.distanceSqToSegment(h, l, p, u) > o)) p.applyMatrix4(this.matrixWorld), 
                            (M = n.ray.origin.distanceTo(p)) < n.near || M > n.far || r.push({
                                distance: M,
                                point: u.clone().applyMatrix4(this.matrixWorld),
                                index: v,
                                face: null,
                                faceIndex: null,
                                object: this
                            });
                        } else for (v = 0, y = m.length / 3 - 1; v < y; v += d) {
                            if (h.fromArray(m, 3 * v), l.fromArray(m, 3 * v + 3), !(e.distanceSqToSegment(h, l, p, u) > o)) p.applyMatrix4(this.matrixWorld), 
                            (M = n.ray.origin.distanceTo(p)) < n.near || M > n.far || r.push({
                                distance: M,
                                point: u.clone().applyMatrix4(this.matrixWorld),
                                index: v,
                                face: null,
                                faceIndex: null,
                                object: this
                            });
                        }
                    } else if (s.isGeometry) {
                        var _ = s.vertices, w = _.length;
                        for (v = 0; v < w - 1; v += d) {
                            var M;
                            if (!(e.distanceSqToSegment(_[v], _[v + 1], p, u) > o)) p.applyMatrix4(this.matrixWorld), 
                            (M = n.ray.origin.distanceTo(p)) < n.near || M > n.far || r.push({
                                distance: M,
                                point: u.clone().applyMatrix4(this.matrixWorld),
                                index: v,
                                face: null,
                                faceIndex: null,
                                object: this
                            });
                        }
                    }
                }
            };
        }(),
        clone: function() {
            return new this.constructor(this.geometry, this.material).copy(this);
        }
    }), yr.prototype = Object.assign(Object.create(vr.prototype), {
        constructor: yr,
        isLineSegments: !0
    }), xr.prototype = Object.assign(Object.create(vr.prototype), {
        constructor: xr,
        isLineLoop: !0
    }), br.prototype = Object.create(Ui.prototype), br.prototype.constructor = br, br.prototype.isPointsMaterial = !0, 
    br.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, 
        this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this;
    }, _r.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: _r,
        isPoints: !0,
        raycast: function() {
            var t = new xe(), e = new Pn(), i = new Fi();
            return function(n, r) {
                var a = this, o = this.geometry, s = this.matrixWorld, c = n.params.Points.threshold;
                if (null === o.boundingSphere && o.computeBoundingSphere(), i.copy(o.boundingSphere), 
                i.applyMatrix4(s), i.radius += c, !1 !== n.ray.intersectsSphere(i)) {
                    t.getInverse(s), e.copy(n.ray).applyMatrix4(t);
                    var h = c / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = h * h, u = new _e();
                    if (o.isBufferGeometry) {
                        var p = o.index, d = o.attributes.position.array;
                        if (null !== p) for (var f = p.array, m = 0, g = f.length; m < g; m++) {
                            var v = f[m];
                            u.fromArray(d, 3 * v), b(u, v);
                        } else {
                            m = 0;
                            for (var y = d.length / 3; m < y; m++) u.fromArray(d, 3 * m), b(u, m);
                        }
                    } else {
                        var x = o.vertices;
                        for (m = 0, y = x.length; m < y; m++) b(x[m], m);
                    }
                }
                function b(t, i) {
                    var o = e.distanceSqToPoint(t);
                    if (o < l) {
                        var c = e.closestPointToPoint(t);
                        c.applyMatrix4(s);
                        var h = n.ray.origin.distanceTo(c);
                        if (h < n.near || h > n.far) return;
                        r.push({
                            distance: h,
                            distanceToRay: Math.sqrt(o),
                            point: c.clone(),
                            index: i,
                            face: null,
                            object: a
                        });
                    }
                }
            };
        }(),
        clone: function() {
            return new this.constructor(this.geometry, this.material).copy(this);
        }
    }), wr.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: wr
    }), Mr.prototype = Object.create(Ee.prototype), Mr.prototype.constructor = Mr, Er.prototype = Object.create(Ee.prototype), 
    Er.prototype.constructor = Er, Er.prototype.isCompressedTexture = !0, Tr.prototype = Object.create(Ee.prototype), 
    Tr.prototype.constructor = Tr, Tr.prototype.isDepthTexture = !0, Sr.prototype = Object.create(Mn.prototype), 
    Sr.prototype.constructor = Sr, Ar.prototype = Object.create(en.prototype), Ar.prototype.constructor = Ar, 
    Rr.prototype = Object.create(Mn.prototype), Rr.prototype.constructor = Rr, Lr.prototype = Object.create(en.prototype), 
    Lr.prototype.constructor = Lr, Pr.prototype = Object.create(Mn.prototype), Pr.prototype.constructor = Pr, 
    Cr.prototype = Object.create(en.prototype), Cr.prototype.constructor = Cr, Ir.prototype = Object.create(Pr.prototype), 
    Ir.prototype.constructor = Ir, Ur.prototype = Object.create(en.prototype), Ur.prototype.constructor = Ur, 
    Dr.prototype = Object.create(Pr.prototype), Dr.prototype.constructor = Dr, Or.prototype = Object.create(en.prototype), 
    Or.prototype.constructor = Or, Nr.prototype = Object.create(Pr.prototype), Nr.prototype.constructor = Nr, 
    Fr.prototype = Object.create(en.prototype), Fr.prototype.constructor = Fr, Br.prototype = Object.create(Pr.prototype), 
    Br.prototype.constructor = Br, zr.prototype = Object.create(en.prototype), zr.prototype.constructor = zr, 
    Gr.prototype = Object.create(Mn.prototype), Gr.prototype.constructor = Gr, Hr.prototype = Object.create(en.prototype), 
    Hr.prototype.constructor = Hr, Vr.prototype = Object.create(Mn.prototype), Vr.prototype.constructor = Vr, 
    kr.prototype = Object.create(en.prototype), kr.prototype.constructor = kr, jr.prototype = Object.create(Mn.prototype), 
    jr.prototype.constructor = jr;
    var Wr = {
        area: function(t) {
            for (var e = t.length, i = 0, n = e - 1, r = 0; r < e; n = r++) i += t[n].x * t[r].y - t[r].x * t[n].y;
            return .5 * i;
        },
        triangulate: function() {
            function t(t, e, i, n, r, a) {
                var o, s, c, h, l, u, p, d, f, m, g, v, y, x, b, _, w;
                if (s = t[a[e]].x, c = t[a[e]].y, h = t[a[i]].x, l = t[a[i]].y, u = t[a[n]].x, (h - s) * ((p = t[a[n]].y) - c) - (l - c) * (u - s) <= 0) return !1;
                for (m = u - h, g = p - l, v = s - u, y = c - p, x = h - s, b = l - c, o = 0; o < r; o++) if (d = t[a[o]].x, 
                f = t[a[o]].y, !(d === s && f === c || d === h && f === l || d === u && f === p) && (_ = x * (f - c) - b * (d - s), 
                w = v * (f - p) - y * (d - u), m * (f - l) - g * (d - h) >= -Number.EPSILON && w >= -Number.EPSILON && _ >= -Number.EPSILON)) return !1;
                return !0;
            }
            return function(e, i) {
                var n = e.length;
                if (n < 3) return null;
                var r, a, o, s = [], c = [], h = [];
                if (Wr.area(e) > 0) for (a = 0; a < n; a++) c[a] = a; else for (a = 0; a < n; a++) c[a] = n - 1 - a;
                var l = n, u = 2 * l;
                for (a = l - 1; l > 2; ) {
                    if (u-- <= 0) return console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"), 
                    i ? h : s;
                    if (l <= (r = a) && (r = 0), l <= (a = r + 1) && (a = 0), l <= (o = a + 1) && (o = 0), 
                    t(e, r, a, o, l, c)) {
                        var p, d, f, m, g;
                        for (p = c[r], d = c[a], f = c[o], s.push([ e[p], e[d], e[f] ]), h.push([ c[r], c[a], c[o] ]), 
                        m = a, g = a + 1; g < l; m++, g++) c[m] = c[g];
                        u = 2 * --l;
                    }
                }
                return i ? h : s;
            };
        }(),
        triangulateShape: function(t, e) {
            function i(t) {
                var e = t.length;
                e > 2 && t[e - 1].equals(t[0]) && t.pop();
            }
            function n(t, e, i) {
                return t.x !== e.x ? t.x < e.x ? t.x <= i.x && i.x <= e.x : e.x <= i.x && i.x <= t.x : t.y < e.y ? t.y <= i.y && i.y <= e.y : e.y <= i.y && i.y <= t.y;
            }
            function r(t, e, i, r, a) {
                var o = e.x - t.x, s = e.y - t.y, c = r.x - i.x, h = r.y - i.y, l = t.x - i.x, u = t.y - i.y, p = s * c - o * h, d = s * l - o * u;
                if (Math.abs(p) > Number.EPSILON) {
                    var f;
                    if (p > 0) {
                        if (d < 0 || d > p) return [];
                        if ((f = h * l - c * u) < 0 || f > p) return [];
                    } else {
                        if (d > 0 || d < p) return [];
                        if ((f = h * l - c * u) > 0 || f < p) return [];
                    }
                    if (0 === f) return !a || 0 !== d && d !== p ? [ t ] : [];
                    if (f === p) return !a || 0 !== d && d !== p ? [ e ] : [];
                    if (0 === d) return [ i ];
                    if (d === p) return [ r ];
                    var m = f / p;
                    return [ {
                        x: t.x + m * o,
                        y: t.y + m * s
                    } ];
                }
                if (0 !== d || h * l != c * u) return [];
                var g, v, y, x, b, _, w, M, E = 0 === o && 0 === s, T = 0 === c && 0 === h;
                return E && T ? t.x !== i.x || t.y !== i.y ? [] : [ t ] : E ? n(i, r, t) ? [ t ] : [] : T ? n(t, e, i) ? [ i ] : [] : (0 !== o ? (t.x < e.x ? (g = t, 
                y = t.x, v = e, x = e.x) : (g = e, y = e.x, v = t, x = t.x), i.x < r.x ? (b = i, 
                w = i.x, _ = r, M = r.x) : (b = r, w = r.x, _ = i, M = i.x)) : (t.y < e.y ? (g = t, 
                y = t.y, v = e, x = e.y) : (g = e, y = e.y, v = t, x = t.y), i.y < r.y ? (b = i, 
                w = i.y, _ = r, M = r.y) : (b = r, w = r.y, _ = i, M = i.y)), y <= w ? x < w ? [] : x === w ? a ? [] : [ b ] : x <= M ? [ b, v ] : [ b, _ ] : y > M ? [] : y === M ? a ? [] : [ g ] : x <= M ? [ g, v ] : [ g, _ ]);
            }
            function a(t, e, i, n) {
                var r = e.x - t.x, a = e.y - t.y, o = i.x - t.x, s = i.y - t.y, c = n.x - t.x, h = n.y - t.y, l = r * s - a * o, u = r * h - a * c;
                if (Math.abs(l) > Number.EPSILON) {
                    var p = c * s - h * o;
                    return l > 0 ? u >= 0 && p >= 0 : u >= 0 || p >= 0;
                }
                return u > 0;
            }
            i(t), e.forEach(i);
            for (var o, s, c, h, l, u, p = {}, d = t.concat(), f = 0, m = e.length; f < m; f++) Array.prototype.push.apply(d, e[f]);
            for (o = 0, s = d.length; o < s; o++) void 0 !== p[l = d[o].x + ":" + d[o].y] && console.warn("THREE.ShapeUtils: Duplicate point", l, o), 
            p[l] = o;
            var g = function(t, e) {
                var i, n = t.concat();
                function o(t, e) {
                    var r = n.length - 1, o = t - 1;
                    o < 0 && (o = r);
                    var s = t + 1;
                    s > r && (s = 0);
                    var c = a(n[t], n[o], n[s], i[e]);
                    if (!c) return !1;
                    var h = i.length - 1, l = e - 1;
                    l < 0 && (l = h);
                    var u = e + 1;
                    return u > h && (u = 0), !!(c = a(i[e], i[l], i[u], n[t]));
                }
                function s(t, e) {
                    var i, a;
                    for (i = 0; i < n.length; i++) if (a = i + 1, a %= n.length, r(t, e, n[i], n[a], !0).length > 0) return !0;
                    return !1;
                }
                var c = [];
                function h(t, i) {
                    var n, a, o, s;
                    for (n = 0; n < c.length; n++) for (a = e[c[n]], o = 0; o < a.length; o++) if (s = o + 1, 
                    s %= a.length, r(t, i, a[o], a[s], !0).length > 0) return !0;
                    return !1;
                }
                for (var l, u, p, d, f, m, g, v, y, x, b = [], _ = 0, w = e.length; _ < w; _++) c.push(_);
                for (var M = 0, E = 2 * c.length; c.length > 0; ) {
                    if (--E < 0) {
                        console.log('THREE.ShapeUtils: Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!');
                        break;
                    }
                    for (u = M; u < n.length; u++) {
                        for (p = n[u], l = -1, _ = 0; _ < c.length; _++) if (f = c[_], void 0 === b[m = p.x + ":" + p.y + ":" + f]) {
                            i = e[f];
                            for (var T = 0; T < i.length; T++) if (d = i[T], o(u, T) && !s(p, d) && !h(p, d)) {
                                l = T, c.splice(_, 1), g = n.slice(0, u + 1), v = n.slice(u), y = i.slice(l), x = i.slice(0, l + 1), 
                                n = g.concat(y).concat(x).concat(v), M = u;
                                break;
                            }
                            if (l >= 0) break;
                            b[m] = !0;
                        }
                        if (l >= 0) break;
                    }
                }
                return n;
            }(t, e), v = Wr.triangulate(g, !1);
            for (o = 0, s = v.length; o < s; o++) for (h = v[o], c = 0; c < 3; c++) void 0 !== (u = p[l = h[c].x + ":" + h[c].y]) && (h[c] = u);
            return v.concat();
        },
        isClockWise: function(t) {
            return Wr.area(t) < 0;
        }
    };
    function Xr(t, e) {
        en.call(this), this.type = "ExtrudeGeometry", this.parameters = {
            shapes: t,
            options: e
        }, this.fromBufferGeometry(new qr(t, e)), this.mergeVertices();
    }
    function qr(t, e) {
        void 0 !== t && (Mn.call(this), this.type = "ExtrudeBufferGeometry", t = Array.isArray(t) ? t : [ t ], 
        this.addShapeList(t, e), this.computeVertexNormals());
    }
    function Yr(t, e) {
        en.call(this), this.type = "TextGeometry", this.parameters = {
            text: t,
            parameters: e
        }, this.fromBufferGeometry(new Zr(t, e)), this.mergeVertices();
    }
    function Zr(t, e) {
        var i = (e = e || {}).font;
        if (!i || !i.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), 
        new en();
        var n = i.generateShapes(t, e.size, e.curveSegments);
        e.amount = void 0 !== e.height ? e.height : 50, void 0 === e.bevelThickness && (e.bevelThickness = 10), 
        void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), 
        qr.call(this, n, e), this.type = "TextBufferGeometry";
    }
    function Jr(t, e, i, n, r, a, o) {
        en.call(this), this.type = "SphereGeometry", this.parameters = {
            radius: t,
            widthSegments: e,
            heightSegments: i,
            phiStart: n,
            phiLength: r,
            thetaStart: a,
            thetaLength: o
        }, this.fromBufferGeometry(new Qr(t, e, i, n, r, a, o)), this.mergeVertices();
    }
    function Qr(t, e, i, n, r, a, o) {
        Mn.call(this), this.type = "SphereBufferGeometry", this.parameters = {
            radius: t,
            widthSegments: e,
            heightSegments: i,
            phiStart: n,
            phiLength: r,
            thetaStart: a,
            thetaLength: o
        }, t = t || 1, e = Math.max(3, Math.floor(e) || 8), i = Math.max(2, Math.floor(i) || 6), 
        n = void 0 !== n ? n : 0, r = void 0 !== r ? r : 2 * Math.PI;
        var s, c, h = (a = void 0 !== a ? a : 0) + (o = void 0 !== o ? o : Math.PI), l = 0, u = [], p = new _e(), d = new _e(), f = [], m = [], g = [], v = [];
        for (c = 0; c <= i; c++) {
            var y = [], x = c / i;
            for (s = 0; s <= e; s++) {
                var b = s / e;
                p.x = -t * Math.cos(n + b * r) * Math.sin(a + x * o), p.y = t * Math.cos(a + x * o), 
                p.z = t * Math.sin(n + b * r) * Math.sin(a + x * o), m.push(p.x, p.y, p.z), d.set(p.x, p.y, p.z).normalize(), 
                g.push(d.x, d.y, d.z), v.push(b, 1 - x), y.push(l++);
            }
            u.push(y);
        }
        for (c = 0; c < i; c++) for (s = 0; s < e; s++) {
            var _ = u[c][s + 1], w = u[c][s], M = u[c + 1][s], E = u[c + 1][s + 1];
            (0 !== c || a > 0) && f.push(_, w, E), (c !== i - 1 || h < Math.PI) && f.push(w, M, E);
        }
        this.setIndex(f), this.addAttribute("position", new un(m, 3)), this.addAttribute("normal", new un(g, 3)), 
        this.addAttribute("uv", new un(v, 2));
    }
    function Kr(t, e, i, n, r, a) {
        en.call(this), this.type = "RingGeometry", this.parameters = {
            innerRadius: t,
            outerRadius: e,
            thetaSegments: i,
            phiSegments: n,
            thetaStart: r,
            thetaLength: a
        }, this.fromBufferGeometry(new $r(t, e, i, n, r, a)), this.mergeVertices();
    }
    function $r(t, e, i, n, r, a) {
        Mn.call(this), this.type = "RingBufferGeometry", this.parameters = {
            innerRadius: t,
            outerRadius: e,
            thetaSegments: i,
            phiSegments: n,
            thetaStart: r,
            thetaLength: a
        }, t = t || .5, e = e || 1, r = void 0 !== r ? r : 0, a = void 0 !== a ? a : 2 * Math.PI, 
        i = void 0 !== i ? Math.max(3, i) : 8;
        var o, s, c, h = [], l = [], u = [], p = [], d = t, f = (e - t) / (n = void 0 !== n ? Math.max(1, n) : 1), m = new _e(), g = new ye();
        for (s = 0; s <= n; s++) {
            for (c = 0; c <= i; c++) o = r + c / i * a, m.x = d * Math.cos(o), m.y = d * Math.sin(o), 
            l.push(m.x, m.y, m.z), u.push(0, 0, 1), g.x = (m.x / e + 1) / 2, g.y = (m.y / e + 1) / 2, 
            p.push(g.x, g.y);
            d += f;
        }
        for (s = 0; s < n; s++) {
            var v = s * (i + 1);
            for (c = 0; c < i; c++) {
                var y = o = c + v, x = o + i + 1, b = o + i + 2, _ = o + 1;
                h.push(y, x, _), h.push(x, b, _);
            }
        }
        this.setIndex(h), this.addAttribute("position", new un(l, 3)), this.addAttribute("normal", new un(u, 3)), 
        this.addAttribute("uv", new un(p, 2));
    }
    function ta(t, e, i, n) {
        en.call(this), this.type = "LatheGeometry", this.parameters = {
            points: t,
            segments: e,
            phiStart: i,
            phiLength: n
        }, this.fromBufferGeometry(new ea(t, e, i, n)), this.mergeVertices();
    }
    function ea(t, e, i, n) {
        Mn.call(this), this.type = "LatheBufferGeometry", this.parameters = {
            points: t,
            segments: e,
            phiStart: i,
            phiLength: n
        }, e = Math.floor(e) || 12, i = i || 0, n = n || 2 * Math.PI, n = ve.clamp(n, 0, 2 * Math.PI);
        var r, a, o, s = [], c = [], h = [], l = 1 / e, u = new _e(), p = new ye();
        for (a = 0; a <= e; a++) {
            var d = i + a * l * n, f = Math.sin(d), m = Math.cos(d);
            for (o = 0; o <= t.length - 1; o++) u.x = t[o].x * f, u.y = t[o].y, u.z = t[o].x * m, 
            c.push(u.x, u.y, u.z), p.x = a / e, p.y = o / (t.length - 1), h.push(p.x, p.y);
        }
        for (a = 0; a < e; a++) for (o = 0; o < t.length - 1; o++) {
            var g = r = o + a * t.length, v = r + t.length, y = r + t.length + 1, x = r + 1;
            s.push(g, v, x), s.push(v, y, x);
        }
        if (this.setIndex(s), this.addAttribute("position", new un(c, 3)), this.addAttribute("uv", new un(h, 2)), 
        this.computeVertexNormals(), n === 2 * Math.PI) {
            var b = this.attributes.normal.array, _ = new _e(), w = new _e(), M = new _e();
            for (r = e * t.length * 3, a = 0, o = 0; a < t.length; a++, o += 3) _.x = b[o + 0], 
            _.y = b[o + 1], _.z = b[o + 2], w.x = b[r + o + 0], w.y = b[r + o + 1], w.z = b[r + o + 2], 
            M.addVectors(_, w).normalize(), b[o + 0] = b[r + o + 0] = M.x, b[o + 1] = b[r + o + 1] = M.y, 
            b[o + 2] = b[r + o + 2] = M.z;
        }
    }
    function ia(t, e) {
        en.call(this), this.type = "ShapeGeometry", "object" == typeof e && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), 
        e = e.curveSegments), this.parameters = {
            shapes: t,
            curveSegments: e
        }, this.fromBufferGeometry(new na(t, e)), this.mergeVertices();
    }
    function na(t, e) {
        Mn.call(this), this.type = "ShapeBufferGeometry", this.parameters = {
            shapes: t,
            curveSegments: e
        }, e = e || 12;
        var i = [], n = [], r = [], a = [], o = 0, s = 0;
        if (!1 === Array.isArray(t)) h(t); else for (var c = 0; c < t.length; c++) h(t[c]), 
        this.addGroup(o, s, c), o += s, s = 0;
        function h(t) {
            var o, c, h, l = n.length / 3, u = t.extractPoints(e), p = u.shape, d = u.holes;
            if (!1 === Wr.isClockWise(p)) for (p = p.reverse(), o = 0, c = d.length; o < c; o++) h = d[o], 
            !0 === Wr.isClockWise(h) && (d[o] = h.reverse());
            var f = Wr.triangulateShape(p, d);
            for (o = 0, c = d.length; o < c; o++) h = d[o], p = p.concat(h);
            for (o = 0, c = p.length; o < c; o++) {
                var m = p[o];
                n.push(m.x, m.y, 0), r.push(0, 0, 1), a.push(m.x, m.y);
            }
            for (o = 0, c = f.length; o < c; o++) {
                var g = f[o], v = g[0] + l, y = g[1] + l, x = g[2] + l;
                i.push(v, y, x), s += 3;
            }
        }
        this.setIndex(i), this.addAttribute("position", new un(n, 3)), this.addAttribute("normal", new un(r, 3)), 
        this.addAttribute("uv", new un(a, 2));
    }
    function ra(t, e) {
        Mn.call(this), this.type = "EdgesGeometry", this.parameters = {
            thresholdAngle: e
        }, e = void 0 !== e ? e : 1;
        var i, n, r, a, o = [], s = Math.cos(ve.DEG2RAD * e), c = [ 0, 0 ], h = {}, l = [ "a", "b", "c" ];
        t.isBufferGeometry ? (a = new en()).fromBufferGeometry(t) : a = t.clone(), a.mergeVertices(), 
        a.computeFaceNormals();
        for (var u = a.vertices, p = a.faces, d = 0, f = p.length; d < f; d++) for (var m = p[d], g = 0; g < 3; g++) i = m[l[g]], 
        n = m[l[(g + 1) % 3]], c[0] = Math.min(i, n), c[1] = Math.max(i, n), void 0 === h[r = c[0] + "," + c[1]] ? h[r] = {
            index1: c[0],
            index2: c[1],
            face1: d,
            face2: void 0
        } : h[r].face2 = d;
        for (r in h) {
            var v = h[r];
            if (void 0 === v.face2 || p[v.face1].normal.dot(p[v.face2].normal) <= s) {
                var y = u[v.index1];
                o.push(y.x, y.y, y.z), y = u[v.index2], o.push(y.x, y.y, y.z);
            }
        }
        this.addAttribute("position", new un(o, 3));
    }
    function aa(t, e, i, n, r, a, o, s) {
        en.call(this), this.type = "CylinderGeometry", this.parameters = {
            radiusTop: t,
            radiusBottom: e,
            height: i,
            radialSegments: n,
            heightSegments: r,
            openEnded: a,
            thetaStart: o,
            thetaLength: s
        }, this.fromBufferGeometry(new oa(t, e, i, n, r, a, o, s)), this.mergeVertices();
    }
    function oa(t, e, i, n, r, a, o, s) {
        Mn.call(this), this.type = "CylinderBufferGeometry", this.parameters = {
            radiusTop: t,
            radiusBottom: e,
            height: i,
            radialSegments: n,
            heightSegments: r,
            openEnded: a,
            thetaStart: o,
            thetaLength: s
        };
        var c = this;
        t = void 0 !== t ? t : 1, e = void 0 !== e ? e : 1, i = i || 1, n = Math.floor(n) || 8, 
        r = Math.floor(r) || 1, a = void 0 !== a && a, o = void 0 !== o ? o : 0, s = void 0 !== s ? s : 2 * Math.PI;
        var h = [], l = [], u = [], p = [], d = 0, f = [], m = i / 2, g = 0;
        function v(i) {
            var r, a, f, v = new ye(), y = new _e(), x = 0, b = !0 === i ? t : e, _ = !0 === i ? 1 : -1;
            for (a = d, r = 1; r <= n; r++) l.push(0, m * _, 0), u.push(0, _, 0), p.push(.5, .5), 
            d++;
            for (f = d, r = 0; r <= n; r++) {
                var w = r / n * s + o, M = Math.cos(w), E = Math.sin(w);
                y.x = b * E, y.y = m * _, y.z = b * M, l.push(y.x, y.y, y.z), u.push(0, _, 0), v.x = .5 * M + .5, 
                v.y = .5 * E * _ + .5, p.push(v.x, v.y), d++;
            }
            for (r = 0; r < n; r++) {
                var T = a + r, S = f + r;
                !0 === i ? h.push(S, S + 1, T) : h.push(S + 1, S, T), x += 3;
            }
            c.addGroup(g, x, !0 === i ? 1 : 2), g += x;
        }
        !function() {
            var a, v, y = new _e(), x = new _e(), b = 0, _ = (e - t) / i;
            for (v = 0; v <= r; v++) {
                var w = [], M = v / r, E = M * (e - t) + t;
                for (a = 0; a <= n; a++) {
                    var T = a / n, S = T * s + o, A = Math.sin(S), R = Math.cos(S);
                    x.x = E * A, x.y = -M * i + m, x.z = E * R, l.push(x.x, x.y, x.z), y.set(A, _, R).normalize(), 
                    u.push(y.x, y.y, y.z), p.push(T, 1 - M), w.push(d++);
                }
                f.push(w);
            }
            for (a = 0; a < n; a++) for (v = 0; v < r; v++) {
                var L = f[v][a], P = f[v + 1][a], C = f[v + 1][a + 1], I = f[v][a + 1];
                h.push(L, P, I), h.push(P, C, I), b += 6;
            }
            c.addGroup(g, b, 0), g += b;
        }(), !1 === a && (t > 0 && v(!0), e > 0 && v(!1)), this.setIndex(h), this.addAttribute("position", new un(l, 3)), 
        this.addAttribute("normal", new un(u, 3)), this.addAttribute("uv", new un(p, 2));
    }
    function sa(t, e, i, n, r, a, o) {
        aa.call(this, 0, t, e, i, n, r, a, o), this.type = "ConeGeometry", this.parameters = {
            radius: t,
            height: e,
            radialSegments: i,
            heightSegments: n,
            openEnded: r,
            thetaStart: a,
            thetaLength: o
        };
    }
    function ca(t, e, i, n, r, a, o) {
        oa.call(this, 0, t, e, i, n, r, a, o), this.type = "ConeBufferGeometry", this.parameters = {
            radius: t,
            height: e,
            radialSegments: i,
            heightSegments: n,
            openEnded: r,
            thetaStart: a,
            thetaLength: o
        };
    }
    function ha(t, e, i, n) {
        en.call(this), this.type = "CircleGeometry", this.parameters = {
            radius: t,
            segments: e,
            thetaStart: i,
            thetaLength: n
        }, this.fromBufferGeometry(new la(t, e, i, n)), this.mergeVertices();
    }
    function la(t, e, i, n) {
        Mn.call(this), this.type = "CircleBufferGeometry", this.parameters = {
            radius: t,
            segments: e,
            thetaStart: i,
            thetaLength: n
        }, t = t || 1, e = void 0 !== e ? Math.max(3, e) : 8, i = void 0 !== i ? i : 0, 
        n = void 0 !== n ? n : 2 * Math.PI;
        var r, a, o = [], s = [], c = [], h = [], l = new _e(), u = new ye();
        for (s.push(0, 0, 0), c.push(0, 0, 1), h.push(.5, .5), a = 0, r = 3; a <= e; a++, 
        r += 3) {
            var p = i + a / e * n;
            l.x = t * Math.cos(p), l.y = t * Math.sin(p), s.push(l.x, l.y, l.z), c.push(0, 0, 1), 
            u.x = (s[r] / t + 1) / 2, u.y = (s[r + 1] / t + 1) / 2, h.push(u.x, u.y);
        }
        for (r = 1; r <= e; r++) o.push(r, r + 1, 0);
        this.setIndex(o), this.addAttribute("position", new un(s, 3)), this.addAttribute("normal", new un(c, 3)), 
        this.addAttribute("uv", new un(h, 2));
    }
    Xr.prototype = Object.create(en.prototype), Xr.prototype.constructor = Xr, qr.prototype = Object.create(Mn.prototype), 
    qr.prototype.constructor = qr, qr.prototype.getArrays = function() {
        var t = this.getAttribute("position"), e = t ? Array.prototype.slice.call(t.array) : [], i = this.getAttribute("uv"), n = i ? Array.prototype.slice.call(i.array) : [], r = this.index;
        return {
            position: e,
            uv: n,
            index: r ? Array.prototype.slice.call(r.array) : []
        };
    }, qr.prototype.addShapeList = function(t, e) {
        var i = t.length;
        e.arrays = this.getArrays();
        for (var n = 0; n < i; n++) {
            var r = t[n];
            this.addShape(r, e);
        }
        this.setIndex(e.arrays.index), this.addAttribute("position", new un(e.arrays.position, 3)), 
        this.addAttribute("uv", new un(e.arrays.uv, 2));
    }, qr.prototype.addShape = function(t, e) {
        var i, n, r, a, o, s, c, h, l = e.arrays ? e.arrays : this.getArrays(), u = l.position, p = l.index, d = l.uv, f = [], m = void 0 !== e.amount ? e.amount : 100, g = void 0 !== e.bevelThickness ? e.bevelThickness : 6, v = void 0 !== e.bevelSize ? e.bevelSize : g - 2, y = void 0 !== e.bevelSegments ? e.bevelSegments : 3, x = void 0 === e.bevelEnabled || e.bevelEnabled, b = void 0 !== e.curveSegments ? e.curveSegments : 12, _ = void 0 !== e.steps ? e.steps : 1, w = e.extrudePath, M = !1, E = void 0 !== e.UVGenerator ? e.UVGenerator : Xr.WorldUVGenerator;
        w && (i = w.getSpacedPoints(_), M = !0, x = !1, n = void 0 !== e.frames ? e.frames : w.computeFrenetFrames(_, !1), 
        r = new _e(), a = new _e(), o = new _e()), x || (y = 0, g = 0, v = 0);
        var T = this, S = t.extractPoints(b), A = S.shape, R = S.holes;
        if (!Wr.isClockWise(A)) for (A = A.reverse(), c = 0, h = R.length; c < h; c++) s = R[c], 
        Wr.isClockWise(s) && (R[c] = s.reverse());
        var L = Wr.triangulateShape(A, R), P = A;
        for (c = 0, h = R.length; c < h; c++) s = R[c], A = A.concat(s);
        function C(t, e, i) {
            return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(i).add(t);
        }
        var I, U, D, O, N, F, B = A.length, z = L.length;
        function G(t, e, i) {
            var n, r, a, o = t.x - e.x, s = t.y - e.y, c = i.x - t.x, h = i.y - t.y, l = o * o + s * s, u = o * h - s * c;
            if (Math.abs(u) > Number.EPSILON) {
                var p = Math.sqrt(l), d = Math.sqrt(c * c + h * h), f = e.x - s / p, m = e.y + o / p, g = ((i.x - h / d - f) * h - (i.y + c / d - m) * c) / (o * h - s * c), v = (n = f + o * g - t.x) * n + (r = m + s * g - t.y) * r;
                if (v <= 2) return new ye(n, r);
                a = Math.sqrt(v / 2);
            } else {
                var y = !1;
                o > Number.EPSILON ? c > Number.EPSILON && (y = !0) : o < -Number.EPSILON ? c < -Number.EPSILON && (y = !0) : Math.sign(s) === Math.sign(h) && (y = !0), 
                y ? (n = -s, r = o, a = Math.sqrt(l)) : (n = o, r = s, a = Math.sqrt(l / 2));
            }
            return new ye(n / a, r / a);
        }
        for (var H = [], V = 0, k = P.length, j = k - 1, W = V + 1; V < k; V++, j++, W++) j === k && (j = 0), 
        W === k && (W = 0), H[V] = G(P[V], P[j], P[W]);
        var X, q, Y = [], Z = H.concat();
        for (c = 0, h = R.length; c < h; c++) {
            for (s = R[c], X = [], V = 0, j = (k = s.length) - 1, W = V + 1; V < k; V++, j++, 
            W++) j === k && (j = 0), W === k && (W = 0), X[V] = G(s[V], s[j], s[W]);
            Y.push(X), Z = Z.concat(X);
        }
        for (I = 0; I < y; I++) {
            for (D = I / y, O = g * Math.cos(D * Math.PI / 2), U = v * Math.sin(D * Math.PI / 2), 
            V = 0, k = P.length; V < k; V++) Q((N = C(P[V], H[V], U)).x, N.y, -O);
            for (c = 0, h = R.length; c < h; c++) for (s = R[c], X = Y[c], V = 0, k = s.length; V < k; V++) Q((N = C(s[V], X[V], U)).x, N.y, -O);
        }
        for (U = v, V = 0; V < B; V++) N = x ? C(A[V], Z[V], U) : A[V], M ? (a.copy(n.normals[0]).multiplyScalar(N.x), 
        r.copy(n.binormals[0]).multiplyScalar(N.y), o.copy(i[0]).add(a).add(r), Q(o.x, o.y, o.z)) : Q(N.x, N.y, 0);
        for (q = 1; q <= _; q++) for (V = 0; V < B; V++) N = x ? C(A[V], Z[V], U) : A[V], 
        M ? (a.copy(n.normals[q]).multiplyScalar(N.x), r.copy(n.binormals[q]).multiplyScalar(N.y), 
        o.copy(i[q]).add(a).add(r), Q(o.x, o.y, o.z)) : Q(N.x, N.y, m / _ * q);
        for (I = y - 1; I >= 0; I--) {
            for (D = I / y, O = g * Math.cos(D * Math.PI / 2), U = v * Math.sin(D * Math.PI / 2), 
            V = 0, k = P.length; V < k; V++) Q((N = C(P[V], H[V], U)).x, N.y, m + O);
            for (c = 0, h = R.length; c < h; c++) for (s = R[c], X = Y[c], V = 0, k = s.length; V < k; V++) N = C(s[V], X[V], U), 
            M ? Q(N.x, N.y + i[_ - 1].y, i[_ - 1].x + O) : Q(N.x, N.y, m + O);
        }
        function J(t, e) {
            var i, n;
            for (V = t.length; --V >= 0; ) {
                i = V, (n = V - 1) < 0 && (n = t.length - 1);
                var r = 0, a = _ + 2 * y;
                for (r = 0; r < a; r++) {
                    var o = B * r, s = B * (r + 1);
                    $(e + i + o, e + n + o, e + n + s, e + i + s);
                }
            }
        }
        function Q(t, e, i) {
            f.push(t), f.push(e), f.push(i);
        }
        function K(t, e, i) {
            tt(t), tt(e), tt(i);
            var n = u.length / 3, r = E.generateTopUV(T, u, n - 3, n - 2, n - 1);
            et(r[0]), et(r[1]), et(r[2]);
        }
        function $(t, e, i, n) {
            tt(t), tt(e), tt(n), tt(e), tt(i), tt(n);
            var r = u.length / 3, a = E.generateSideWallUV(T, u, r - 6, r - 3, r - 2, r - 1);
            et(a[0]), et(a[1]), et(a[3]), et(a[1]), et(a[2]), et(a[3]);
        }
        function tt(t) {
            p.push(u.length / 3), u.push(f[3 * t + 0]), u.push(f[3 * t + 1]), u.push(f[3 * t + 2]);
        }
        function et(t) {
            d.push(t.x), d.push(t.y);
        }
        !function() {
            var t = u.length / 3;
            if (x) {
                var i = 0, n = B * i;
                for (V = 0; V < z; V++) K((F = L[V])[2] + n, F[1] + n, F[0] + n);
                for (n = B * (i = _ + 2 * y), V = 0; V < z; V++) K((F = L[V])[0] + n, F[1] + n, F[2] + n);
            } else {
                for (V = 0; V < z; V++) K((F = L[V])[2], F[1], F[0]);
                for (V = 0; V < z; V++) K((F = L[V])[0] + B * _, F[1] + B * _, F[2] + B * _);
            }
            T.addGroup(t, u.length / 3 - t, void 0 !== e.material ? e.material : 0);
        }(), function() {
            var t = u.length / 3, i = 0;
            for (J(P, i), i += P.length, c = 0, h = R.length; c < h; c++) J(s = R[c], i), i += s.length;
            T.addGroup(t, u.length / 3 - t, void 0 !== e.extrudeMaterial ? e.extrudeMaterial : 1);
        }(), e.arrays || (this.setIndex(p), this.addAttribute("position", new un(u, 3)), 
        this.addAttribute("uv", new un(e.arrays.uv, 2)));
    }, Xr.WorldUVGenerator = {
        generateTopUV: function(t, e, i, n, r) {
            var a = e[3 * i], o = e[3 * i + 1], s = e[3 * n], c = e[3 * n + 1], h = e[3 * r], l = e[3 * r + 1];
            return [ new ye(a, o), new ye(s, c), new ye(h, l) ];
        },
        generateSideWallUV: function(t, e, i, n, r, a) {
            var o = e[3 * i], s = e[3 * i + 1], c = e[3 * i + 2], h = e[3 * n], l = e[3 * n + 1], u = e[3 * n + 2], p = e[3 * r], d = e[3 * r + 1], f = e[3 * r + 2], m = e[3 * a], g = e[3 * a + 1], v = e[3 * a + 2];
            return Math.abs(s - l) < .01 ? [ new ye(o, 1 - c), new ye(h, 1 - u), new ye(p, 1 - f), new ye(m, 1 - v) ] : [ new ye(s, 1 - c), new ye(l, 1 - u), new ye(d, 1 - f), new ye(g, 1 - v) ];
        }
    }, Yr.prototype = Object.create(en.prototype), Yr.prototype.constructor = Yr, Zr.prototype = Object.create(qr.prototype), 
    Zr.prototype.constructor = Zr, Jr.prototype = Object.create(en.prototype), Jr.prototype.constructor = Jr, 
    Qr.prototype = Object.create(Mn.prototype), Qr.prototype.constructor = Qr, Kr.prototype = Object.create(en.prototype), 
    Kr.prototype.constructor = Kr, $r.prototype = Object.create(Mn.prototype), $r.prototype.constructor = $r, 
    ta.prototype = Object.create(en.prototype), ta.prototype.constructor = ta, ea.prototype = Object.create(Mn.prototype), 
    ea.prototype.constructor = ea, ia.prototype = Object.create(en.prototype), ia.prototype.constructor = ia, 
    na.prototype = Object.create(Mn.prototype), na.prototype.constructor = na, ra.prototype = Object.create(Mn.prototype), 
    ra.prototype.constructor = ra, aa.prototype = Object.create(en.prototype), aa.prototype.constructor = aa, 
    oa.prototype = Object.create(Mn.prototype), oa.prototype.constructor = oa, sa.prototype = Object.create(aa.prototype), 
    sa.prototype.constructor = sa, ca.prototype = Object.create(oa.prototype), ca.prototype.constructor = ca, 
    ha.prototype = Object.create(en.prototype), ha.prototype.constructor = ha, la.prototype = Object.create(Mn.prototype), 
    la.prototype.constructor = la;
    var ua = Object.freeze({
        WireframeGeometry: Sr,
        ParametricGeometry: Ar,
        ParametricBufferGeometry: Rr,
        TetrahedronGeometry: Cr,
        TetrahedronBufferGeometry: Ir,
        OctahedronGeometry: Ur,
        OctahedronBufferGeometry: Dr,
        IcosahedronGeometry: Or,
        IcosahedronBufferGeometry: Nr,
        DodecahedronGeometry: Fr,
        DodecahedronBufferGeometry: Br,
        PolyhedronGeometry: Lr,
        PolyhedronBufferGeometry: Pr,
        TubeGeometry: zr,
        TubeBufferGeometry: Gr,
        TorusKnotGeometry: Hr,
        TorusKnotBufferGeometry: Vr,
        TorusGeometry: kr,
        TorusBufferGeometry: jr,
        TextGeometry: Yr,
        TextBufferGeometry: Zr,
        SphereGeometry: Jr,
        SphereBufferGeometry: Qr,
        RingGeometry: Kr,
        RingBufferGeometry: $r,
        PlaneGeometry: Sn,
        PlaneBufferGeometry: An,
        LatheGeometry: ta,
        LatheBufferGeometry: ea,
        ShapeGeometry: ia,
        ShapeBufferGeometry: na,
        ExtrudeGeometry: Xr,
        ExtrudeBufferGeometry: qr,
        EdgesGeometry: ra,
        ConeGeometry: sa,
        ConeBufferGeometry: ca,
        CylinderGeometry: aa,
        CylinderBufferGeometry: oa,
        CircleGeometry: ha,
        CircleBufferGeometry: la,
        BoxGeometry: En,
        BoxBufferGeometry: Tn
    });
    function pa(t) {
        Ui.call(this), this.type = "ShadowMaterial", this.color = new gi(0), this.opacity = 1, 
        this.lights = !0, this.transparent = !0, this.setValues(t);
    }
    function da(t) {
        Ln.call(this, t), this.type = "RawShaderMaterial";
    }
    function fa(t) {
        Ui.call(this), this.defines = {
            STANDARD: ""
        }, this.type = "MeshStandardMaterial", this.color = new gi(16777215), this.roughness = .5, 
        this.metalness = .5, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, 
        this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new gi(0), this.emissiveIntensity = 1, 
        this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, 
        this.normalScale = new ye(1, 1), this.displacementMap = null, this.displacementScale = 1, 
        this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, 
        this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, 
        this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", 
        this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t);
    }
    function ma(t) {
        fa.call(this), this.defines = {
            PHYSICAL: ""
        }, this.type = "MeshPhysicalMaterial", this.reflectivity = .5, this.clearCoat = 0, 
        this.clearCoatRoughness = 0, this.setValues(t);
    }
    function ga(t) {
        Ui.call(this), this.type = "MeshPhongMaterial", this.color = new gi(16777215), this.specular = new gi(1118481), 
        this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, 
        this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new gi(0), this.emissiveIntensity = 1, 
        this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, 
        this.normalScale = new ye(1, 1), this.displacementMap = null, this.displacementScale = 1, 
        this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, 
        this.combine = rt, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, 
        this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", 
        this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t);
    }
    function va(t) {
        ga.call(this), this.defines = {
            TOON: ""
        }, this.type = "MeshToonMaterial", this.gradientMap = null, this.setValues(t);
    }
    function ya(t) {
        Ui.call(this), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, 
        this.normalMap = null, this.normalScale = new ye(1, 1), this.displacementMap = null, 
        this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.fog = !1, this.lights = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, 
        this.setValues(t);
    }
    function xa(t) {
        Ui.call(this), this.type = "MeshLambertMaterial", this.color = new gi(16777215), 
        this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, 
        this.aoMapIntensity = 1, this.emissive = new gi(0), this.emissiveIntensity = 1, 
        this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, 
        this.combine = rt, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, 
        this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", 
        this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t);
    }
    function ba(t) {
        gr.call(this), this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, 
        this.gapSize = 1, this.setValues(t);
    }
    pa.prototype = Object.create(Ui.prototype), pa.prototype.constructor = pa, pa.prototype.isShadowMaterial = !0, 
    da.prototype = Object.create(Ln.prototype), da.prototype.constructor = da, da.prototype.isRawShaderMaterial = !0, 
    fa.prototype = Object.create(Ui.prototype), fa.prototype.constructor = fa, fa.prototype.isMeshStandardMaterial = !0, 
    fa.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.defines = {
            STANDARD: ""
        }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, 
        this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, 
        this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), 
        this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, 
        this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, 
        this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, 
        this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, 
        this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, 
        this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, 
        this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, 
        this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, 
        this.morphNormals = t.morphNormals, this;
    }, ma.prototype = Object.create(fa.prototype), ma.prototype.constructor = ma, ma.prototype.isMeshPhysicalMaterial = !0, 
    ma.prototype.copy = function(t) {
        return fa.prototype.copy.call(this, t), this.defines = {
            PHYSICAL: ""
        }, this.reflectivity = t.reflectivity, this.clearCoat = t.clearCoat, this.clearCoatRoughness = t.clearCoatRoughness, 
        this;
    }, ga.prototype = Object.create(Ui.prototype), ga.prototype.constructor = ga, ga.prototype.isMeshPhongMaterial = !0, 
    ga.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.specular.copy(t.specular), 
        this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, 
        this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), 
        this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, 
        this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, 
        this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, 
        this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, 
        this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, 
        this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, 
        this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, 
        this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, 
        this.morphNormals = t.morphNormals, this;
    }, va.prototype = Object.create(ga.prototype), va.prototype.constructor = va, va.prototype.isMeshToonMaterial = !0, 
    va.prototype.copy = function(t) {
        return ga.prototype.copy.call(this, t), this.gradientMap = t.gradientMap, this;
    }, ya.prototype = Object.create(Ui.prototype), ya.prototype.constructor = ya, ya.prototype.isMeshNormalMaterial = !0, 
    ya.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, 
        this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, 
        this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, 
        this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.skinning = t.skinning, 
        this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this;
    }, xa.prototype = Object.create(Ui.prototype), xa.prototype.constructor = xa, xa.prototype.isMeshLambertMaterial = !0, 
    xa.prototype.copy = function(t) {
        return Ui.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, 
        this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, 
        this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, 
        this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, 
        this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, 
        this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, 
        this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, 
        this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, 
        this;
    }, ba.prototype = Object.create(gr.prototype), ba.prototype.constructor = ba, ba.prototype.isLineDashedMaterial = !0, 
    ba.prototype.copy = function(t) {
        return gr.prototype.copy.call(this, t), this.scale = t.scale, this.dashSize = t.dashSize, 
        this.gapSize = t.gapSize, this;
    };
    var _a = Object.freeze({
        ShadowMaterial: pa,
        SpriteMaterial: lr,
        RawShaderMaterial: da,
        ShaderMaterial: Ln,
        PointsMaterial: br,
        MeshPhysicalMaterial: ma,
        MeshStandardMaterial: fa,
        MeshPhongMaterial: ga,
        MeshToonMaterial: va,
        MeshNormalMaterial: ya,
        MeshLambertMaterial: xa,
        MeshDepthMaterial: Di,
        MeshDistanceMaterial: Oi,
        MeshBasicMaterial: Rn,
        LineDashedMaterial: ba,
        LineBasicMaterial: gr,
        Material: Ui
    }), wa = {
        enabled: !1,
        files: {},
        add: function(t, e) {
            !1 !== this.enabled && (this.files[t] = e);
        },
        get: function(t) {
            if (!1 !== this.enabled) return this.files[t];
        },
        remove: function(t) {
            delete this.files[t];
        },
        clear: function() {
            this.files = {};
        }
    };
    function Ma(t, e, i) {
        var n = this, r = !1, a = 0, o = 0;
        this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = i, this.itemStart = function(t) {
            o++, !1 === r && void 0 !== n.onStart && n.onStart(t, a, o), r = !0;
        }, this.itemEnd = function(t) {
            a++, void 0 !== n.onProgress && n.onProgress(t, a, o), a === o && (r = !1, void 0 !== n.onLoad && n.onLoad());
        }, this.itemError = function(t) {
            void 0 !== n.onError && n.onError(t);
        };
    }
    var Ea = new Ma(), Ta = {};
    function Sa(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    function Aa(t) {
        this.manager = void 0 !== t ? t : Ea, this._parser = null;
    }
    function Ra(t) {
        this.manager = void 0 !== t ? t : Ea, this._parser = null;
    }
    function La(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    function Pa(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    function Ca(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    function Ia(t, e) {
        Zi.call(this), this.type = "Light", this.color = new gi(t), this.intensity = void 0 !== e ? e : 1, 
        this.receiveShadow = void 0;
    }
    function Ua(t, e, i) {
        Ia.call(this, t, i), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(Zi.DefaultUp), 
        this.updateMatrix(), this.groundColor = new gi(e);
    }
    function Da(t) {
        this.camera = t, this.bias = 0, this.radius = 1, this.mapSize = new ye(512, 512), 
        this.map = null, this.matrix = new xe();
    }
    function Oa() {
        Da.call(this, new ir(50, 1, .5, 500));
    }
    function Na(t, e, i, n, r, a) {
        Ia.call(this, t, e), this.type = "SpotLight", this.position.copy(Zi.DefaultUp), 
        this.updateMatrix(), this.target = new Zi(), Object.defineProperty(this, "power", {
            get: function() {
                return this.intensity * Math.PI;
            },
            set: function(t) {
                this.intensity = t / Math.PI;
            }
        }), this.distance = void 0 !== i ? i : 0, this.angle = void 0 !== n ? n : Math.PI / 3, 
        this.penumbra = void 0 !== r ? r : 0, this.decay = void 0 !== a ? a : 1, this.shadow = new Oa();
    }
    function Fa(t, e, i, n) {
        Ia.call(this, t, e), this.type = "PointLight", Object.defineProperty(this, "power", {
            get: function() {
                return 4 * this.intensity * Math.PI;
            },
            set: function(t) {
                this.intensity = t / (4 * Math.PI);
            }
        }), this.distance = void 0 !== i ? i : 0, this.decay = void 0 !== n ? n : 1, this.shadow = new Da(new ir(90, 1, .5, 500));
    }
    function Ba() {
        Da.call(this, new Qi(-5, 5, 5, -5, .5, 500));
    }
    function za(t, e) {
        Ia.call(this, t, e), this.type = "DirectionalLight", this.position.copy(Zi.DefaultUp), 
        this.updateMatrix(), this.target = new Zi(), this.shadow = new Ba();
    }
    function Ga(t, e) {
        Ia.call(this, t, e), this.type = "AmbientLight", this.castShadow = void 0;
    }
    function Ha(t, e, i, n) {
        Ia.call(this, t, e), this.type = "RectAreaLight", this.position.set(0, 1, 0), this.updateMatrix(), 
        this.width = void 0 !== i ? i : 10, this.height = void 0 !== n ? n : 10;
    }
    Object.assign(Sa.prototype, {
        load: function(t, e, i, n) {
            void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
            var r = this, a = wa.get(t);
            if (void 0 !== a) return r.manager.itemStart(t), setTimeout(function() {
                e && e(a), r.manager.itemEnd(t);
            }, 0), a;
            if (void 0 === Ta[t]) {
                var o = t.match(/^data:(.*?)(;base64)?,(.*)$/);
                if (o) {
                    var s = o[1], c = !!o[2], h = o[3];
                    h = window.decodeURIComponent(h), c && (h = window.atob(h));
                    try {
                        var l, u = (this.responseType || "").toLowerCase();
                        switch (u) {
                          case "arraybuffer":
                          case "blob":
                            for (var p = new Uint8Array(h.length), d = 0; d < h.length; d++) p[d] = h.charCodeAt(d);
                            l = "blob" === u ? new Blob([ p.buffer ], {
                                type: s
                            }) : p.buffer;
                            break;

                          case "document":
                            var f = new DOMParser();
                            l = f.parseFromString(h, s);
                            break;

                          case "json":
                            l = JSON.parse(h);
                            break;

                          default:
                            l = h;
                        }
                        window.setTimeout(function() {
                            e && e(l), r.manager.itemEnd(t);
                        }, 0);
                    } catch (e) {
                        window.setTimeout(function() {
                            n && n(e), r.manager.itemEnd(t), r.manager.itemError(t);
                        }, 0);
                    }
                } else {
                    Ta[t] = [], Ta[t].push({
                        onLoad: e,
                        onProgress: i,
                        onError: n
                    });
                    var m = new XMLHttpRequest();
                    for (var g in m.open("GET", t, !0), m.addEventListener("load", function(e) {
                        var i = e.target.response;
                        wa.add(t, i);
                        var n = Ta[t];
                        if (delete Ta[t], 200 === this.status) {
                            for (var a = 0, o = n.length; a < o; a++) {
                                (s = n[a]).onLoad && s.onLoad(i);
                            }
                            r.manager.itemEnd(t);
                        } else if (0 === this.status) {
                            console.warn("THREE.FileLoader: HTTP Status 0 received.");
                            for (a = 0, o = n.length; a < o; a++) {
                                (s = n[a]).onLoad && s.onLoad(i);
                            }
                            r.manager.itemEnd(t);
                        } else {
                            for (a = 0, o = n.length; a < o; a++) {
                                var s;
                                (s = n[a]).onError && s.onError(e);
                            }
                            r.manager.itemEnd(t), r.manager.itemError(t);
                        }
                    }, !1), m.addEventListener("progress", function(e) {
                        for (var i = Ta[t], n = 0, r = i.length; n < r; n++) {
                            var a = i[n];
                            a.onProgress && a.onProgress(e);
                        }
                    }, !1), m.addEventListener("error", function(e) {
                        for (var i = Ta[t], n = 0, a = i.length; n < a; n++) {
                            var o = i[n];
                            o.onError && o.onError(e);
                        }
                        r.manager.itemEnd(t), r.manager.itemError(t);
                    }, !1), void 0 !== this.responseType && (m.responseType = this.responseType), void 0 !== this.withCredentials && (m.withCredentials = this.withCredentials), 
                    m.overrideMimeType && m.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), 
                    this.requestHeader) m.setRequestHeader(g, this.requestHeader[g]);
                    m.send(null);
                }
                return r.manager.itemStart(t), m;
            }
            Ta[t].push({
                onLoad: e,
                onProgress: i,
                onError: n
            });
        },
        setPath: function(t) {
            return this.path = t, this;
        },
        setResponseType: function(t) {
            return this.responseType = t, this;
        },
        setWithCredentials: function(t) {
            return this.withCredentials = t, this;
        },
        setMimeType: function(t) {
            return this.mimeType = t, this;
        },
        setRequestHeader: function(t) {
            return this.requestHeader = t, this;
        }
    }), Object.assign(Aa.prototype, {
        load: function(t, e, i, n) {
            var r = this, a = [], o = new Er();
            o.image = a;
            var s = new Sa(this.manager);
            function c(c) {
                s.load(t[c], function(t) {
                    var i = r._parser(t, !0);
                    a[c] = {
                        width: i.width,
                        height: i.height,
                        format: i.format,
                        mipmaps: i.mipmaps
                    }, 6 === (h += 1) && (1 === i.mipmapCount && (o.minFilter = Tt), o.format = i.format, 
                    o.needsUpdate = !0, e && e(o));
                }, i, n);
            }
            if (s.setPath(this.path), s.setResponseType("arraybuffer"), Array.isArray(t)) for (var h = 0, l = 0, u = t.length; l < u; ++l) c(l); else s.load(t, function(t) {
                var i = r._parser(t, !0);
                if (i.isCubemap) for (var n = i.mipmaps.length / i.mipmapCount, s = 0; s < n; s++) {
                    a[s] = {
                        mipmaps: []
                    };
                    for (var c = 0; c < i.mipmapCount; c++) a[s].mipmaps.push(i.mipmaps[s * i.mipmapCount + c]), 
                    a[s].format = i.format, a[s].width = i.width, a[s].height = i.height;
                } else o.image.width = i.width, o.image.height = i.height, o.mipmaps = i.mipmaps;
                1 === i.mipmapCount && (o.minFilter = Tt), o.format = i.format, o.needsUpdate = !0, 
                e && e(o);
            }, i, n);
            return o;
        },
        setPath: function(t) {
            return this.path = t, this;
        }
    }), Object.assign(Ra.prototype, {
        load: function(t, e, i, n) {
            var r = this, a = new Re(), o = new Sa(this.manager);
            return o.setResponseType("arraybuffer"), o.load(t, function(t) {
                var i = r._parser(t);
                i && (void 0 !== i.image ? a.image = i.image : void 0 !== i.data && (a.image.width = i.width, 
                a.image.height = i.height, a.image.data = i.data), a.wrapS = void 0 !== i.wrapS ? i.wrapS : bt, 
                a.wrapT = void 0 !== i.wrapT ? i.wrapT : bt, a.magFilter = void 0 !== i.magFilter ? i.magFilter : Tt, 
                a.minFilter = void 0 !== i.minFilter ? i.minFilter : At, a.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1, 
                void 0 !== i.format && (a.format = i.format), void 0 !== i.type && (a.type = i.type), 
                void 0 !== i.mipmaps && (a.mipmaps = i.mipmaps), 1 === i.mipmapCount && (a.minFilter = Tt), 
                a.needsUpdate = !0, e && e(a, i));
            }, i, n), a;
        }
    }), Object.assign(La.prototype, {
        crossOrigin: "Anonymous",
        load: function(t, e, i, n) {
            void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
            var r = this, a = wa.get(t);
            if (void 0 !== a) return r.manager.itemStart(t), setTimeout(function() {
                e && e(a), r.manager.itemEnd(t);
            }, 0), a;
            var o = document.createElement("img");
            return o.addEventListener("load", function() {
                wa.add(t, this), e && e(this), r.manager.itemEnd(t);
            }, !1), o.addEventListener("error", function(e) {
                n && n(e), r.manager.itemEnd(t), r.manager.itemError(t);
            }, !1), "data:" !== t.substr(0, 5) && void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), 
            r.manager.itemStart(t), o.src = t, o;
        },
        setCrossOrigin: function(t) {
            return this.crossOrigin = t, this;
        },
        setPath: function(t) {
            return this.path = t, this;
        }
    }), Object.assign(Pa.prototype, {
        crossOrigin: "Anonymous",
        load: function(t, e, i, n) {
            var r = new Le(), a = new La(this.manager);
            a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
            var o = 0;
            function s(i) {
                a.load(t[i], function(t) {
                    r.images[i] = t, 6 === ++o && (r.needsUpdate = !0, e && e(r));
                }, void 0, n);
            }
            for (var c = 0; c < t.length; ++c) s(c);
            return r;
        },
        setCrossOrigin: function(t) {
            return this.crossOrigin = t, this;
        },
        setPath: function(t) {
            return this.path = t, this;
        }
    }), Object.assign(Ca.prototype, {
        crossOrigin: "Anonymous",
        load: function(t, e, i, n) {
            var r = new La(this.manager);
            r.setCrossOrigin(this.crossOrigin), r.setPath(this.path);
            var a = new Ee();
            return a.image = r.load(t, function() {
                var i = t.search(/\.(jpg|jpeg)$/) > 0 || 0 === t.search(/^data\:image\/jpeg/);
                a.format = i ? Ht : Vt, a.needsUpdate = !0, void 0 !== e && e(a);
            }, i, n), a;
        },
        setCrossOrigin: function(t) {
            return this.crossOrigin = t, this;
        },
        setPath: function(t) {
            return this.path = t, this;
        }
    }), Ia.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: Ia,
        isLight: !0,
        copy: function(t) {
            return Zi.prototype.copy.call(this, t), this.color.copy(t.color), this.intensity = t.intensity, 
            this;
        },
        toJSON: function(t) {
            var e = Zi.prototype.toJSON.call(this, t);
            return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, 
            void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), 
            void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), 
            void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), 
            void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e;
        }
    }), Ua.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: Ua,
        isHemisphereLight: !0,
        copy: function(t) {
            return Ia.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this;
        }
    }), Object.assign(Da.prototype, {
        copy: function(t) {
            return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, 
            this.mapSize.copy(t.mapSize), this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        toJSON: function() {
            var t = {};
            return 0 !== this.bias && (t.bias = this.bias), 1 !== this.radius && (t.radius = this.radius), 
            512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), 
            t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
        }
    }), Oa.prototype = Object.assign(Object.create(Da.prototype), {
        constructor: Oa,
        isSpotLightShadow: !0,
        update: function(t) {
            var e = this.camera, i = 2 * ve.RAD2DEG * t.angle, n = this.mapSize.width / this.mapSize.height, r = t.distance || e.far;
            i === e.fov && n === e.aspect && r === e.far || (e.fov = i, e.aspect = n, e.far = r, 
            e.updateProjectionMatrix());
        }
    }), Na.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: Na,
        isSpotLight: !0,
        copy: function(t) {
            return Ia.prototype.copy.call(this, t), this.distance = t.distance, this.angle = t.angle, 
            this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), 
            this.shadow = t.shadow.clone(), this;
        }
    }), Fa.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: Fa,
        isPointLight: !0,
        copy: function(t) {
            return Ia.prototype.copy.call(this, t), this.distance = t.distance, this.decay = t.decay, 
            this.shadow = t.shadow.clone(), this;
        }
    }), Ba.prototype = Object.assign(Object.create(Da.prototype), {
        constructor: Ba
    }), za.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: za,
        isDirectionalLight: !0,
        copy: function(t) {
            return Ia.prototype.copy.call(this, t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), 
            this;
        }
    }), Ga.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: Ga,
        isAmbientLight: !0
    }), Ha.prototype = Object.assign(Object.create(Ia.prototype), {
        constructor: Ha,
        isRectAreaLight: !0,
        copy: function(t) {
            return Ia.prototype.copy.call(this, t), this.width = t.width, this.height = t.height, 
            this;
        },
        toJSON: function(t) {
            var e = Ia.prototype.toJSON.call(this, t);
            return e.object.width = this.width, e.object.height = this.height, e;
        }
    });
    var Va, ka = {
        arraySlice: function(t, e, i) {
            return ka.isTypedArray(t) ? new t.constructor(t.subarray(e, void 0 !== i ? i : t.length)) : t.slice(e, i);
        },
        convertArray: function(t, e, i) {
            return !t || !i && t.constructor === e ? t : "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t);
        },
        isTypedArray: function(t) {
            return ArrayBuffer.isView(t) && !(t instanceof DataView);
        },
        getKeyframeOrder: function(t) {
            for (var e = t.length, i = new Array(e), n = 0; n !== e; ++n) i[n] = n;
            return i.sort(function(e, i) {
                return t[e] - t[i];
            }), i;
        },
        sortedArray: function(t, e, i) {
            for (var n = t.length, r = new t.constructor(n), a = 0, o = 0; o !== n; ++a) for (var s = i[a] * e, c = 0; c !== e; ++c) r[o++] = t[s + c];
            return r;
        },
        flattenJSON: function(t, e, i, n) {
            for (var r = 1, a = t[0]; void 0 !== a && void 0 === a[n]; ) a = t[r++];
            if (void 0 !== a) {
                var o = a[n];
                if (void 0 !== o) if (Array.isArray(o)) do {
                    void 0 !== (o = a[n]) && (e.push(a.time), i.push.apply(i, o)), a = t[r++];
                } while (void 0 !== a); else if (void 0 !== o.toArray) do {
                    void 0 !== (o = a[n]) && (e.push(a.time), o.toArray(i, i.length)), a = t[r++];
                } while (void 0 !== a); else do {
                    void 0 !== (o = a[n]) && (e.push(a.time), i.push(o)), a = t[r++];
                } while (void 0 !== a);
            }
        }
    };
    function ja(t, e, i, n) {
        this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== n ? n : new e.constructor(i), 
        this.sampleValues = e, this.valueSize = i;
    }
    function Wa(t, e, i, n) {
        ja.call(this, t, e, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, 
        this._offsetNext = -0;
    }
    function Xa(t, e, i, n) {
        ja.call(this, t, e, i, n);
    }
    function qa(t, e, i, n) {
        ja.call(this, t, e, i, n);
    }
    function Ya(t, e, i, n) {
        if (void 0 === t) throw new Error("track name is undefined");
        if (void 0 === e || 0 === e.length) throw new Error("no keyframes in track named " + t);
        this.name = t, this.times = ka.convertArray(e, this.TimeBufferType), this.values = ka.convertArray(i, this.ValueBufferType), 
        this.setInterpolation(n || this.DefaultInterpolation), this.validate(), this.optimize();
    }
    function Za(t, e, i, n) {
        Ya.call(this, t, e, i, n);
    }
    function Ja(t, e, i, n) {
        ja.call(this, t, e, i, n);
    }
    function Qa(t, e, i, n) {
        Ya.call(this, t, e, i, n);
    }
    function Ka(t, e, i, n) {
        Ya.call(this, t, e, i, n);
    }
    function $a(t, e, i, n) {
        Ya.call(this, t, e, i, n);
    }
    function to(t, e, i) {
        Ya.call(this, t, e, i);
    }
    function eo(t, e, i, n) {
        Ya.call(this, t, e, i, n);
    }
    function io(t, e, i, n) {
        Ya.apply(this, t, e, i, n);
    }
    function no(t, e, i) {
        this.name = t, this.tracks = i, this.duration = void 0 !== e ? e : -1, this.uuid = ve.generateUUID(), 
        this.duration < 0 && this.resetDuration(), this.optimize();
    }
    function ro(t) {
        this.manager = void 0 !== t ? t : Ea, this.textures = {};
    }
    function ao(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    Object.assign(ja.prototype, {
        evaluate: function(t) {
            var e = this.parameterPositions, i = this._cachedIndex, n = e[i], r = e[i - 1];
            t: {
                e: {
                    var a;
                    i: {
                        n: if (!(t < n)) {
                            for (var o = i + 2; ;) {
                                if (void 0 === n) {
                                    if (t < r) break n;
                                    return i = e.length, this._cachedIndex = i, this.afterEnd_(i - 1, t, r);
                                }
                                if (i === o) break;
                                if (r = n, t < (n = e[++i])) break e;
                            }
                            a = e.length;
                            break i;
                        }
                        if (t >= r) break t;
                        var s = e[1];
                        t < s && (i = 2, r = s);
                        for (o = i - 2; ;) {
                            if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, n);
                            if (i === o) break;
                            if (n = r, t >= (r = e[--i - 1])) break e;
                        }
                        a = i, i = 0;
                    }
                    for (;i < a; ) {
                        var c = i + a >>> 1;
                        t < e[c] ? a = c : i = c + 1;
                    }
                    if (n = e[i], void 0 === (r = e[i - 1])) return this._cachedIndex = 0, this.beforeStart_(0, t, n);
                    if (void 0 === n) return i = e.length, this._cachedIndex = i, this.afterEnd_(i - 1, r, t);
                }
                this._cachedIndex = i, this.intervalChanged_(i, r, n);
            }
            return this.interpolate_(i, r, t, n);
        },
        settings: null,
        DefaultSettings_: {},
        getSettings_: function() {
            return this.settings || this.DefaultSettings_;
        },
        copySampleValue_: function(t) {
            for (var e = this.resultBuffer, i = this.sampleValues, n = this.valueSize, r = t * n, a = 0; a !== n; ++a) e[a] = i[r + a];
            return e;
        },
        interpolate_: function() {
            throw new Error("call to abstract method");
        },
        intervalChanged_: function() {}
    }), 
    //!\ DECLARE ALIAS AFTER assign prototype !
    Object.assign(ja.prototype, {
        beforeStart_: ja.prototype.copySampleValue_,
        afterEnd_: ja.prototype.copySampleValue_
    }), Wa.prototype = Object.assign(Object.create(ja.prototype), {
        constructor: Wa,
        DefaultSettings_: {
            endingStart: re,
            endingEnd: re
        },
        intervalChanged_: function(t, e, i) {
            var n = this.parameterPositions, r = t - 2, a = t + 1, o = n[r], s = n[a];
            if (void 0 === o) switch (this.getSettings_().endingStart) {
              case 2401:
                r = t, o = 2 * e - i;
                break;

              case 2402:
                o = e + n[r = n.length - 2] - n[r + 1];
                break;

              default:
                r = t, o = i;
            }
            if (void 0 === s) switch (this.getSettings_().endingEnd) {
              case 2401:
                a = t, s = 2 * i - e;
                break;

              case 2402:
                a = 1, s = i + n[1] - n[0];
                break;

              default:
                a = t - 1, s = e;
            }
            var c = .5 * (i - e), h = this.valueSize;
            this._weightPrev = c / (e - o), this._weightNext = c / (s - i), this._offsetPrev = r * h, 
            this._offsetNext = a * h;
        },
        interpolate_: function(t, e, i, n) {
            for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = t * o, c = s - o, h = this._offsetPrev, l = this._offsetNext, u = this._weightPrev, p = this._weightNext, d = (i - e) / (n - e), f = d * d, m = f * d, g = -u * m + 2 * u * f - u * d, v = (1 + u) * m + (-1.5 - 2 * u) * f + (-.5 + u) * d + 1, y = (-1 - p) * m + (1.5 + p) * f + .5 * d, x = p * m - p * f, b = 0; b !== o; ++b) r[b] = g * a[h + b] + v * a[c + b] + y * a[s + b] + x * a[l + b];
            return r;
        }
    }), Xa.prototype = Object.assign(Object.create(ja.prototype), {
        constructor: Xa,
        interpolate_: function(t, e, i, n) {
            for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = t * o, c = s - o, h = (i - e) / (n - e), l = 1 - h, u = 0; u !== o; ++u) r[u] = a[c + u] * l + a[s + u] * h;
            return r;
        }
    }), qa.prototype = Object.assign(Object.create(ja.prototype), {
        constructor: qa,
        interpolate_: function(t) {
            return this.copySampleValue_(t - 1);
        }
    }), Va = {
        TimeBufferType: Float32Array,
        ValueBufferType: Float32Array,
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodDiscrete: function(t) {
            return new qa(this.times, this.values, this.getValueSize(), t);
        },
        InterpolantFactoryMethodLinear: function(t) {
            return new Xa(this.times, this.values, this.getValueSize(), t);
        },
        InterpolantFactoryMethodSmooth: function(t) {
            return new Wa(this.times, this.values, this.getValueSize(), t);
        },
        setInterpolation: function(t) {
            var e;
            switch (t) {
              case 2300:
                e = this.InterpolantFactoryMethodDiscrete;
                break;

              case 2301:
                e = this.InterpolantFactoryMethodLinear;
                break;

              case 2302:
                e = this.InterpolantFactoryMethodSmooth;
            }
            if (void 0 !== e) this.createInterpolant = e; else {
                var i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                if (void 0 === this.createInterpolant) {
                    if (t === this.DefaultInterpolation) throw new Error(i);
                    this.setInterpolation(this.DefaultInterpolation);
                }
                console.warn("THREE.KeyframeTrackPrototype:", i);
            }
        },
        getInterpolation: function() {
            switch (this.createInterpolant) {
              case this.InterpolantFactoryMethodDiscrete:
                return 2300;

              case this.InterpolantFactoryMethodLinear:
                return 2301;

              case this.InterpolantFactoryMethodSmooth:
                return 2302;
            }
        },
        getValueSize: function() {
            return this.values.length / this.times.length;
        },
        shift: function(t) {
            if (0 !== t) for (var e = this.times, i = 0, n = e.length; i !== n; ++i) e[i] += t;
            return this;
        },
        scale: function(t) {
            if (1 !== t) for (var e = this.times, i = 0, n = e.length; i !== n; ++i) e[i] *= t;
            return this;
        },
        trim: function(t, e) {
            for (var i = this.times, n = i.length, r = 0, a = n - 1; r !== n && i[r] < t; ) ++r;
            for (;-1 !== a && i[a] > e; ) --a;
            if (++a, 0 !== r || a !== n) {
                r >= a && (r = (a = Math.max(a, 1)) - 1);
                var o = this.getValueSize();
                this.times = ka.arraySlice(i, r, a), this.values = ka.arraySlice(this.values, r * o, a * o);
            }
            return this;
        },
        validate: function() {
            var t = !0, e = this.getValueSize();
            e - Math.floor(e) != 0 && (console.error("THREE.KeyframeTrackPrototype: Invalid value size in track.", this), 
            t = !1);
            var i = this.times, n = this.values, r = i.length;
            0 === r && (console.error("THREE.KeyframeTrackPrototype: Track is empty.", this), 
            t = !1);
            for (var a = null, o = 0; o !== r; o++) {
                var s = i[o];
                if ("number" == typeof s && isNaN(s)) {
                    console.error("THREE.KeyframeTrackPrototype: Time is not a valid number.", this, o, s), 
                    t = !1;
                    break;
                }
                if (null !== a && a > s) {
                    console.error("THREE.KeyframeTrackPrototype: Out of order keys.", this, o, s, a), 
                    t = !1;
                    break;
                }
                a = s;
            }
            if (void 0 !== n && ka.isTypedArray(n)) {
                o = 0;
                for (var c = n.length; o !== c; ++o) {
                    var h = n[o];
                    if (isNaN(h)) {
                        console.error("THREE.KeyframeTrackPrototype: Value is not a valid number.", this, o, h), 
                        t = !1;
                        break;
                    }
                }
            }
            return t;
        },
        optimize: function() {
            for (var t = this.times, e = this.values, i = this.getValueSize(), n = 2302 === this.getInterpolation(), r = 1, a = t.length - 1, o = 1; o < a; ++o) {
                var s = !1, c = t[o];
                if (c !== t[o + 1] && (1 !== o || c !== c[0])) if (n) s = !0; else for (var h = o * i, l = h - i, u = h + i, p = 0; p !== i; ++p) {
                    var d = e[h + p];
                    if (d !== e[l + p] || d !== e[u + p]) {
                        s = !0;
                        break;
                    }
                }
                if (s) {
                    if (o !== r) {
                        t[r] = t[o];
                        var f = o * i, m = r * i;
                        for (p = 0; p !== i; ++p) e[m + p] = e[f + p];
                    }
                    ++r;
                }
            }
            if (a > 0) {
                t[r] = t[a];
                for (f = a * i, m = r * i, p = 0; p !== i; ++p) e[m + p] = e[f + p];
                ++r;
            }
            return r !== t.length && (this.times = ka.arraySlice(t, 0, r), this.values = ka.arraySlice(e, 0, r * i)), 
            this;
        }
    }, Za.prototype = Object.assign(Object.create(Va), {
        constructor: Za,
        ValueTypeName: "vector"
    }), Ja.prototype = Object.assign(Object.create(ja.prototype), {
        constructor: Ja,
        interpolate_: function(t, e, i, n) {
            for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = t * o, c = (i - e) / (n - e), h = s + o; s !== h; s += 4) be.slerpFlat(r, 0, a, s - o, a, s, c);
            return r;
        }
    }), Qa.prototype = Object.assign(Object.create(Va), {
        constructor: Qa,
        ValueTypeName: "quaternion",
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodLinear: function(t) {
            return new Ja(this.times, this.values, this.getValueSize(), t);
        },
        InterpolantFactoryMethodSmooth: void 0
    }), Ka.prototype = Object.assign(Object.create(Va), {
        constructor: Ka,
        ValueTypeName: "number"
    }), $a.prototype = Object.assign(Object.create(Va), {
        constructor: $a,
        ValueTypeName: "string",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    }), to.prototype = Object.assign(Object.create(Va), {
        constructor: to,
        ValueTypeName: "bool",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    }), eo.prototype = Object.assign(Object.create(Va), {
        constructor: eo,
        ValueTypeName: "color"
    }), io.prototype = Va, Va.constructor = io, Object.assign(io, {
        parse: function(t) {
            if (void 0 === t.type) throw new Error("track type undefined, can not parse");
            var e = io._getTrackTypeForValueTypeName(t.type);
            if (void 0 === t.times) {
                var i = [], n = [];
                ka.flattenJSON(t.keys, i, n, "value"), t.times = i, t.values = n;
            }
            return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation);
        },
        toJSON: function(t) {
            var e, i = t.constructor;
            if (void 0 !== i.toJSON) e = i.toJSON(t); else {
                e = {
                    name: t.name,
                    times: ka.convertArray(t.times, Array),
                    values: ka.convertArray(t.values, Array)
                };
                var n = t.getInterpolation();
                n !== t.DefaultInterpolation && (e.interpolation = n);
            }
            return e.type = t.ValueTypeName, e;
        },
        _getTrackTypeForValueTypeName: function(t) {
            switch (t.toLowerCase()) {
              case "scalar":
              case "double":
              case "float":
              case "number":
              case "integer":
                return Ka;

              case "vector":
              case "vector2":
              case "vector3":
              case "vector4":
                return Za;

              case "color":
                return eo;

              case "quaternion":
                return Qa;

              case "bool":
              case "boolean":
                return to;

              case "string":
                return $a;
            }
            throw new Error("Unsupported typeName: " + t);
        }
    }), Object.assign(no, {
        parse: function(t) {
            for (var e = [], i = t.tracks, n = 1 / (t.fps || 1), r = 0, a = i.length; r !== a; ++r) e.push(io.parse(i[r]).scale(n));
            return new no(t.name, t.duration, e);
        },
        toJSON: function(t) {
            for (var e = [], i = t.tracks, n = {
                name: t.name,
                duration: t.duration,
                tracks: e
            }, r = 0, a = i.length; r !== a; ++r) e.push(io.toJSON(i[r]));
            return n;
        },
        CreateFromMorphTargetSequence: function(t, e, i, n) {
            for (var r = e.length, a = [], o = 0; o < r; o++) {
                var s = [], c = [];
                s.push((o + r - 1) % r, o, (o + 1) % r), c.push(0, 1, 0);
                var h = ka.getKeyframeOrder(s);
                s = ka.sortedArray(s, 1, h), c = ka.sortedArray(c, 1, h), n || 0 !== s[0] || (s.push(r), 
                c.push(c[0])), a.push(new Ka(".morphTargetInfluences[" + e[o].name + "]", s, c).scale(1 / i));
            }
            return new no(t, -1, a);
        },
        findByName: function(t, e) {
            var i = t;
            if (!Array.isArray(t)) {
                var n = t;
                i = n.geometry && n.geometry.animations || n.animations;
            }
            for (var r = 0; r < i.length; r++) if (i[r].name === e) return i[r];
            return null;
        },
        CreateClipsFromMorphTargetSequences: function(t, e, i) {
            for (var n = {}, r = /^([\w-]*?)([\d]+)$/, a = 0, o = t.length; a < o; a++) {
                var s = t[a], c = s.name.match(r);
                if (c && c.length > 1) {
                    var h = n[u = c[1]];
                    h || (n[u] = h = []), h.push(s);
                }
            }
            var l = [];
            for (var u in n) l.push(no.CreateFromMorphTargetSequence(u, n[u], e, i));
            return l;
        },
        parseAnimation: function(t, e) {
            if (!t) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), 
            null;
            for (var i = function(t, e, i, n, r) {
                if (0 !== i.length) {
                    var a = [], o = [];
                    ka.flattenJSON(i, a, o, n), 0 !== a.length && r.push(new t(e, a, o));
                }
            }, n = [], r = t.name || "default", a = t.length || -1, o = t.fps || 30, s = t.hierarchy || [], c = 0; c < s.length; c++) {
                var h = s[c].keys;
                if (h && 0 !== h.length) if (h[0].morphTargets) {
                    for (var l = {}, u = 0; u < h.length; u++) if (h[u].morphTargets) for (var p = 0; p < h[u].morphTargets.length; p++) l[h[u].morphTargets[p]] = -1;
                    for (var d in l) {
                        var f = [], m = [];
                        for (p = 0; p !== h[u].morphTargets.length; ++p) {
                            var g = h[u];
                            f.push(g.time), m.push(g.morphTarget === d ? 1 : 0);
                        }
                        n.push(new Ka(".morphTargetInfluence[" + d + "]", f, m));
                    }
                    a = l.length * (o || 1);
                } else {
                    var v = ".bones[" + e[c].name + "]";
                    i(Za, v + ".position", h, "pos", n), i(Qa, v + ".quaternion", h, "rot", n), i(Za, v + ".scale", h, "scl", n);
                }
            }
            return 0 === n.length ? null : new no(r, a, n);
        }
    }), Object.assign(no.prototype, {
        resetDuration: function() {
            for (var t = 0, e = 0, i = this.tracks.length; e !== i; ++e) {
                var n = this.tracks[e];
                t = Math.max(t, n.times[n.times.length - 1]);
            }
            this.duration = t;
        },
        trim: function() {
            for (var t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
            return this;
        },
        optimize: function() {
            for (var t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
            return this;
        }
    }), Object.assign(ro.prototype, {
        load: function(t, e, i, n) {
            var r = this;
            new Sa(r.manager).load(t, function(t) {
                e(r.parse(JSON.parse(t)));
            }, i, n);
        },
        setTextures: function(t) {
            this.textures = t;
        },
        parse: function(t) {
            var e = this.textures;
            function i(t) {
                return void 0 === e[t] && console.warn("THREE.MaterialLoader: Undefined texture", t), 
                e[t];
            }
            var n = new _a[t.type]();
            if (void 0 !== t.uuid && (n.uuid = t.uuid), void 0 !== t.name && (n.name = t.name), 
            void 0 !== t.color && n.color.setHex(t.color), void 0 !== t.roughness && (n.roughness = t.roughness), 
            void 0 !== t.metalness && (n.metalness = t.metalness), void 0 !== t.emissive && n.emissive.setHex(t.emissive), 
            void 0 !== t.specular && n.specular.setHex(t.specular), void 0 !== t.shininess && (n.shininess = t.shininess), 
            void 0 !== t.clearCoat && (n.clearCoat = t.clearCoat), void 0 !== t.clearCoatRoughness && (n.clearCoatRoughness = t.clearCoatRoughness), 
            void 0 !== t.uniforms && (n.uniforms = t.uniforms), void 0 !== t.vertexShader && (n.vertexShader = t.vertexShader), 
            void 0 !== t.fragmentShader && (n.fragmentShader = t.fragmentShader), void 0 !== t.vertexColors && (n.vertexColors = t.vertexColors), 
            void 0 !== t.fog && (n.fog = t.fog), void 0 !== t.flatShading && (n.flatShading = t.flatShading), 
            void 0 !== t.blending && (n.blending = t.blending), void 0 !== t.side && (n.side = t.side), 
            void 0 !== t.opacity && (n.opacity = t.opacity), void 0 !== t.transparent && (n.transparent = t.transparent), 
            void 0 !== t.alphaTest && (n.alphaTest = t.alphaTest), void 0 !== t.depthTest && (n.depthTest = t.depthTest), 
            void 0 !== t.depthWrite && (n.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (n.colorWrite = t.colorWrite), 
            void 0 !== t.wireframe && (n.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (n.wireframeLinewidth = t.wireframeLinewidth), 
            void 0 !== t.wireframeLinecap && (n.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (n.wireframeLinejoin = t.wireframeLinejoin), 
            void 0 !== t.rotation && (n.rotation = t.rotation), 1 !== t.linewidth && (n.linewidth = t.linewidth), 
            void 0 !== t.dashSize && (n.dashSize = t.dashSize), void 0 !== t.gapSize && (n.gapSize = t.gapSize), 
            void 0 !== t.scale && (n.scale = t.scale), void 0 !== t.skinning && (n.skinning = t.skinning), 
            void 0 !== t.morphTargets && (n.morphTargets = t.morphTargets), void 0 !== t.dithering && (n.dithering = t.dithering), 
            void 0 !== t.visible && (n.visible = t.visible), void 0 !== t.userData && (n.userData = t.userData), 
            void 0 !== t.shading && (n.flatShading = 1 === t.shading), void 0 !== t.size && (n.size = t.size), 
            void 0 !== t.sizeAttenuation && (n.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (n.map = i(t.map)), 
            void 0 !== t.alphaMap && (n.alphaMap = i(t.alphaMap), n.transparent = !0), void 0 !== t.bumpMap && (n.bumpMap = i(t.bumpMap)), 
            void 0 !== t.bumpScale && (n.bumpScale = t.bumpScale), void 0 !== t.normalMap && (n.normalMap = i(t.normalMap)), 
            void 0 !== t.normalScale) {
                var r = t.normalScale;
                !1 === Array.isArray(r) && (r = [ r, r ]), n.normalScale = new ye().fromArray(r);
            }
            return void 0 !== t.displacementMap && (n.displacementMap = i(t.displacementMap)), 
            void 0 !== t.displacementScale && (n.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (n.displacementBias = t.displacementBias), 
            void 0 !== t.roughnessMap && (n.roughnessMap = i(t.roughnessMap)), void 0 !== t.metalnessMap && (n.metalnessMap = i(t.metalnessMap)), 
            void 0 !== t.emissiveMap && (n.emissiveMap = i(t.emissiveMap)), void 0 !== t.emissiveIntensity && (n.emissiveIntensity = t.emissiveIntensity), 
            void 0 !== t.specularMap && (n.specularMap = i(t.specularMap)), void 0 !== t.envMap && (n.envMap = i(t.envMap)), 
            void 0 !== t.reflectivity && (n.reflectivity = t.reflectivity), void 0 !== t.lightMap && (n.lightMap = i(t.lightMap)), 
            void 0 !== t.lightMapIntensity && (n.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (n.aoMap = i(t.aoMap)), 
            void 0 !== t.aoMapIntensity && (n.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (n.gradientMap = i(t.gradientMap)), 
            n;
        }
    }), Object.assign(ao.prototype, {
        load: function(t, e, i, n) {
            var r = this;
            new Sa(r.manager).load(t, function(t) {
                e(r.parse(JSON.parse(t)));
            }, i, n);
        },
        parse: function(t) {
            var e = new Mn(), i = t.data.index;
            if (void 0 !== i) {
                var n = new lo[i.type](i.array);
                e.setIndex(new nn(n, 1));
            }
            var r = t.data.attributes;
            for (var a in r) {
                var o = r[a];
                n = new lo[o.type](o.array);
                e.addAttribute(a, new nn(n, o.itemSize, o.normalized));
            }
            var s = t.data.groups || t.data.drawcalls || t.data.offsets;
            if (void 0 !== s) for (var c = 0, h = s.length; c !== h; ++c) {
                var l = s[c];
                e.addGroup(l.start, l.count, l.materialIndex);
            }
            var u = t.data.boundingSphere;
            if (void 0 !== u) {
                var p = new _e();
                void 0 !== u.center && p.fromArray(u.center), e.boundingSphere = new Fi(p, u.radius);
            }
            return e;
        }
    });
    var oo, so, co, ho, lo = {
        Int8Array: Int8Array,
        Uint8Array: Uint8Array,
        Uint8ClampedArray: "undefined" != typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
        Int16Array: Int16Array,
        Uint16Array: Uint16Array,
        Int32Array: Int32Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array
    };
    function uo() {
        this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {};
    }
    function po(t) {
        "boolean" == typeof t && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), 
        t = void 0), this.manager = void 0 !== t ? t : Ea, this.withCredentials = !1;
    }
    function fo(t) {
        this.manager = void 0 !== t ? t : Ea, this.texturePath = "";
    }
    uo.Handlers = {
        handlers: [],
        add: function(t, e) {
            this.handlers.push(t, e);
        },
        get: function(t) {
            for (var e = this.handlers, i = 0, n = e.length; i < n; i += 2) {
                var r = e[i], a = e[i + 1];
                if (r.test(t)) return a;
            }
            return null;
        }
    }, Object.assign(uo.prototype, {
        crossOrigin: void 0,
        extractUrlBase: function(t) {
            var e = t.split("/");
            return 1 === e.length ? "./" : (e.pop(), e.join("/") + "/");
        },
        initMaterials: function(t, e, i) {
            for (var n = [], r = 0; r < t.length; ++r) n[r] = this.createMaterial(t[r], e, i);
            return n;
        },
        createMaterial: (oo = {
            NoBlending: R,
            NormalBlending: L,
            AdditiveBlending: P,
            SubtractiveBlending: C,
            MultiplyBlending: I,
            CustomBlending: U
        }, so = new gi(), co = new Ca(), ho = new ro(), function(t, e, i) {
            var n = {};
            function r(t, r, a, o, s) {
                var c, h = e + t, l = uo.Handlers.get(h);
                null !== l ? c = l.load(h) : (co.setCrossOrigin(i), c = co.load(h)), void 0 !== r && (c.repeat.fromArray(r), 
                1 !== r[0] && (c.wrapS = xt), 1 !== r[1] && (c.wrapT = xt)), void 0 !== a && c.offset.fromArray(a), 
                void 0 !== o && ("repeat" === o[0] && (c.wrapS = xt), "mirror" === o[0] && (c.wrapS = _t), 
                "repeat" === o[1] && (c.wrapT = xt), "mirror" === o[1] && (c.wrapT = _t)), void 0 !== s && (c.anisotropy = s);
                var u = ve.generateUUID();
                return n[u] = c, u;
            }
            var a = {
                uuid: ve.generateUUID(),
                type: "MeshLambertMaterial"
            };
            for (var o in t) {
                var s = t[o];
                switch (o) {
                  case "DbgColor":
                  case "DbgIndex":
                  case "opticalDensity":
                  case "illumination":
                    break;

                  case "DbgName":
                    a.name = s;
                    break;

                  case "blending":
                    a.blending = oo[s];
                    break;

                  case "colorAmbient":
                  case "mapAmbient":
                    console.warn("THREE.Loader.createMaterial:", o, "is no longer supported.");
                    break;

                  case "colorDiffuse":
                    a.color = so.fromArray(s).getHex();
                    break;

                  case "colorSpecular":
                    a.specular = so.fromArray(s).getHex();
                    break;

                  case "colorEmissive":
                    a.emissive = so.fromArray(s).getHex();
                    break;

                  case "specularCoef":
                    a.shininess = s;
                    break;

                  case "shading":
                    "basic" === s.toLowerCase() && (a.type = "MeshBasicMaterial"), "phong" === s.toLowerCase() && (a.type = "MeshPhongMaterial"), 
                    "standard" === s.toLowerCase() && (a.type = "MeshStandardMaterial");
                    break;

                  case "mapDiffuse":
                    a.map = r(s, t.mapDiffuseRepeat, t.mapDiffuseOffset, t.mapDiffuseWrap, t.mapDiffuseAnisotropy);
                    break;

                  case "mapDiffuseRepeat":
                  case "mapDiffuseOffset":
                  case "mapDiffuseWrap":
                  case "mapDiffuseAnisotropy":
                    break;

                  case "mapEmissive":
                    a.emissiveMap = r(s, t.mapEmissiveRepeat, t.mapEmissiveOffset, t.mapEmissiveWrap, t.mapEmissiveAnisotropy);
                    break;

                  case "mapEmissiveRepeat":
                  case "mapEmissiveOffset":
                  case "mapEmissiveWrap":
                  case "mapEmissiveAnisotropy":
                    break;

                  case "mapLight":
                    a.lightMap = r(s, t.mapLightRepeat, t.mapLightOffset, t.mapLightWrap, t.mapLightAnisotropy);
                    break;

                  case "mapLightRepeat":
                  case "mapLightOffset":
                  case "mapLightWrap":
                  case "mapLightAnisotropy":
                    break;

                  case "mapAO":
                    a.aoMap = r(s, t.mapAORepeat, t.mapAOOffset, t.mapAOWrap, t.mapAOAnisotropy);
                    break;

                  case "mapAORepeat":
                  case "mapAOOffset":
                  case "mapAOWrap":
                  case "mapAOAnisotropy":
                    break;

                  case "mapBump":
                    a.bumpMap = r(s, t.mapBumpRepeat, t.mapBumpOffset, t.mapBumpWrap, t.mapBumpAnisotropy);
                    break;

                  case "mapBumpScale":
                    a.bumpScale = s;
                    break;

                  case "mapBumpRepeat":
                  case "mapBumpOffset":
                  case "mapBumpWrap":
                  case "mapBumpAnisotropy":
                    break;

                  case "mapNormal":
                    a.normalMap = r(s, t.mapNormalRepeat, t.mapNormalOffset, t.mapNormalWrap, t.mapNormalAnisotropy);
                    break;

                  case "mapNormalFactor":
                    a.normalScale = [ s, s ];
                    break;

                  case "mapNormalRepeat":
                  case "mapNormalOffset":
                  case "mapNormalWrap":
                  case "mapNormalAnisotropy":
                    break;

                  case "mapSpecular":
                    a.specularMap = r(s, t.mapSpecularRepeat, t.mapSpecularOffset, t.mapSpecularWrap, t.mapSpecularAnisotropy);
                    break;

                  case "mapSpecularRepeat":
                  case "mapSpecularOffset":
                  case "mapSpecularWrap":
                  case "mapSpecularAnisotropy":
                    break;

                  case "mapMetalness":
                    a.metalnessMap = r(s, t.mapMetalnessRepeat, t.mapMetalnessOffset, t.mapMetalnessWrap, t.mapMetalnessAnisotropy);
                    break;

                  case "mapMetalnessRepeat":
                  case "mapMetalnessOffset":
                  case "mapMetalnessWrap":
                  case "mapMetalnessAnisotropy":
                    break;

                  case "mapRoughness":
                    a.roughnessMap = r(s, t.mapRoughnessRepeat, t.mapRoughnessOffset, t.mapRoughnessWrap, t.mapRoughnessAnisotropy);
                    break;

                  case "mapRoughnessRepeat":
                  case "mapRoughnessOffset":
                  case "mapRoughnessWrap":
                  case "mapRoughnessAnisotropy":
                    break;

                  case "mapAlpha":
                    a.alphaMap = r(s, t.mapAlphaRepeat, t.mapAlphaOffset, t.mapAlphaWrap, t.mapAlphaAnisotropy);
                    break;

                  case "mapAlphaRepeat":
                  case "mapAlphaOffset":
                  case "mapAlphaWrap":
                  case "mapAlphaAnisotropy":
                    break;

                  case "flipSided":
                    a.side = M;
                    break;

                  case "doubleSided":
                    a.side = E;
                    break;

                  case "transparency":
                    console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"), 
                    a.opacity = s;
                    break;

                  case "depthTest":
                  case "depthWrite":
                  case "colorWrite":
                  case "opacity":
                  case "reflectivity":
                  case "transparent":
                  case "visible":
                  case "wireframe":
                    a[o] = s;
                    break;

                  case "vertexColors":
                    !0 === s && (a.vertexColors = A), "face" === s && (a.vertexColors = S);
                    break;

                  default:
                    console.error("THREE.Loader.createMaterial: Unsupported", o, s);
                }
            }
            return "MeshBasicMaterial" === a.type && delete a.emissive, "MeshPhongMaterial" !== a.type && delete a.specular, 
            a.opacity < 1 && (a.transparent = !0), ho.setTextures(n), ho.parse(a);
        })
    }), Object.assign(po.prototype, {
        load: function(t, e, i, n) {
            var r = this, a = this.texturePath && "string" == typeof this.texturePath ? this.texturePath : uo.prototype.extractUrlBase(t), o = new Sa(this.manager);
            o.setWithCredentials(this.withCredentials), o.load(t, function(i) {
                var n = JSON.parse(i), o = n.metadata;
                if (void 0 !== o) {
                    var s = o.type;
                    if (void 0 !== s) {
                        if ("object" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                        if ("scene" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.SceneLoader instead.");
                    }
                }
                var c = r.parse(n, a);
                e(c.geometry, c.materials);
            }, i, n);
        },
        setTexturePath: function(t) {
            this.texturePath = t;
        },
        parse: function() {
            return function(t, e) {
                void 0 !== t.data && (t = t.data), void 0 !== t.scale ? t.scale = 1 / t.scale : t.scale = 1;
                var i = new en();
                return function(t, e) {
                    function i(t, e) {
                        return t & 1 << e;
                    }
                    var n, r, a, o, s, c, h, l, u, p, d, f, m, g, v, y, x, b, _, w, M, E, T, S, A, R = t.faces, L = t.vertices, P = t.normals, C = t.colors, I = t.scale, U = 0;
                    if (void 0 !== t.uvs) {
                        for (n = 0; n < t.uvs.length; n++) t.uvs[n].length && U++;
                        for (n = 0; n < U; n++) e.faceVertexUvs[n] = [];
                    }
                    for (o = 0, s = L.length; o < s; ) (b = new _e()).x = L[o++] * I, b.y = L[o++] * I, 
                    b.z = L[o++] * I, e.vertices.push(b);
                    for (o = 0, s = R.length; o < s; ) if (d = i(p = R[o++], 0), f = i(p, 1), m = i(p, 3), 
                    g = i(p, 4), v = i(p, 5), y = i(p, 6), x = i(p, 7), d) {
                        if ((w = new Ki()).a = R[o], w.b = R[o + 1], w.c = R[o + 3], (M = new Ki()).a = R[o + 1], 
                        M.b = R[o + 2], M.c = R[o + 3], o += 4, f && (u = R[o++], w.materialIndex = u, M.materialIndex = u), 
                        a = e.faces.length, m) for (n = 0; n < U; n++) for (S = t.uvs[n], e.faceVertexUvs[n][a] = [], 
                        e.faceVertexUvs[n][a + 1] = [], r = 0; r < 4; r++) A = new ye(S[2 * (l = R[o++])], S[2 * l + 1]), 
                        2 !== r && e.faceVertexUvs[n][a].push(A), 0 !== r && e.faceVertexUvs[n][a + 1].push(A);
                        if (g && (h = 3 * R[o++], w.normal.set(P[h++], P[h++], P[h]), M.normal.copy(w.normal)), 
                        v) for (n = 0; n < 4; n++) h = 3 * R[o++], T = new _e(P[h++], P[h++], P[h]), 2 !== n && w.vertexNormals.push(T), 
                        0 !== n && M.vertexNormals.push(T);
                        if (y && (E = C[c = R[o++]], w.color.setHex(E), M.color.setHex(E)), x) for (n = 0; n < 4; n++) E = C[c = R[o++]], 
                        2 !== n && w.vertexColors.push(new gi(E)), 0 !== n && M.vertexColors.push(new gi(E));
                        e.faces.push(w), e.faces.push(M);
                    } else {
                        if ((_ = new Ki()).a = R[o++], _.b = R[o++], _.c = R[o++], f && (u = R[o++], _.materialIndex = u), 
                        a = e.faces.length, m) for (n = 0; n < U; n++) for (S = t.uvs[n], e.faceVertexUvs[n][a] = [], 
                        r = 0; r < 3; r++) A = new ye(S[2 * (l = R[o++])], S[2 * l + 1]), e.faceVertexUvs[n][a].push(A);
                        if (g && (h = 3 * R[o++], _.normal.set(P[h++], P[h++], P[h])), v) for (n = 0; n < 3; n++) h = 3 * R[o++], 
                        T = new _e(P[h++], P[h++], P[h]), _.vertexNormals.push(T);
                        if (y && (c = R[o++], _.color.setHex(C[c])), x) for (n = 0; n < 3; n++) c = R[o++], 
                        _.vertexColors.push(new gi(C[c]));
                        e.faces.push(_);
                    }
                }(t, i), function(t, e) {
                    var i = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
                    if (t.skinWeights) for (var n = 0, r = t.skinWeights.length; n < r; n += i) {
                        var a = t.skinWeights[n], o = i > 1 ? t.skinWeights[n + 1] : 0, s = i > 2 ? t.skinWeights[n + 2] : 0, c = i > 3 ? t.skinWeights[n + 3] : 0;
                        e.skinWeights.push(new Te(a, o, s, c));
                    }
                    if (t.skinIndices) for (n = 0, r = t.skinIndices.length; n < r; n += i) {
                        var h = t.skinIndices[n], l = i > 1 ? t.skinIndices[n + 1] : 0, u = i > 2 ? t.skinIndices[n + 2] : 0, p = i > 3 ? t.skinIndices[n + 3] : 0;
                        e.skinIndices.push(new Te(h, l, u, p));
                    }
                    e.bones = t.bones, e.bones && e.bones.length > 0 && (e.skinWeights.length !== e.skinIndices.length || e.skinIndices.length !== e.vertices.length) && console.warn("When skinning, number of vertices (" + e.vertices.length + "), skinIndices (" + e.skinIndices.length + "), and skinWeights (" + e.skinWeights.length + ") should match.");
                }(t, i), function(t, e) {
                    var i = t.scale;
                    if (void 0 !== t.morphTargets) for (var n = 0, r = t.morphTargets.length; n < r; n++) {
                        e.morphTargets[n] = {}, e.morphTargets[n].name = t.morphTargets[n].name, e.morphTargets[n].vertices = [];
                        for (var a = e.morphTargets[n].vertices, o = t.morphTargets[n].vertices, s = 0, c = o.length; s < c; s += 3) {
                            var h = new _e();
                            h.x = o[s] * i, h.y = o[s + 1] * i, h.z = o[s + 2] * i, a.push(h);
                        }
                    }
                    if (void 0 !== t.morphColors && t.morphColors.length > 0) {
                        console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');
                        var l = e.faces, u = t.morphColors[0].colors;
                        for (n = 0, r = l.length; n < r; n++) l[n].color.fromArray(u, 3 * n);
                    }
                }(t, i), function(t, e) {
                    var i = [], n = [];
                    void 0 !== t.animation && n.push(t.animation), void 0 !== t.animations && (t.animations.length ? n = n.concat(t.animations) : n.push(t.animations));
                    for (var r = 0; r < n.length; r++) {
                        var a = no.parseAnimation(n[r], e.bones);
                        a && i.push(a);
                    }
                    if (e.morphTargets) {
                        var o = no.CreateClipsFromMorphTargetSequences(e.morphTargets, 10);
                        i = i.concat(o);
                    }
                    i.length > 0 && (e.animations = i);
                }(t, i), i.computeFaceNormals(), i.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length ? {
                    geometry: i
                } : {
                    geometry: i,
                    materials: uo.prototype.initMaterials(t.materials, e, this.crossOrigin)
                };
            };
        }()
    }), Object.assign(fo.prototype, {
        load: function(t, e, i, n) {
            "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
            var r = this;
            new Sa(r.manager).load(t, function(i) {
                var a = null;
                try {
                    a = JSON.parse(i);
                } catch (e) {
                    return void 0 !== n && n(e), void console.error("THREE:ObjectLoader: Can't parse " + t + ".", e.message);
                }
                var o = a.metadata;
                void 0 !== o && void 0 !== o.type && "geometry" !== o.type.toLowerCase() ? r.parse(a, e) : console.error("THREE.ObjectLoader: Can't load " + t + ". Use THREE.JSONLoader instead.");
            }, i, n);
        },
        setTexturePath: function(t) {
            this.texturePath = t;
        },
        setCrossOrigin: function(t) {
            this.crossOrigin = t;
        },
        parse: function(t, e) {
            var i = this.parseGeometries(t.geometries), n = this.parseImages(t.images, function() {
                void 0 !== e && e(o);
            }), r = this.parseTextures(t.textures, n), a = this.parseMaterials(t.materials, r), o = this.parseObject(t.object, i, a);
            return t.animations && (o.animations = this.parseAnimations(t.animations)), void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(o), 
            o;
        },
        parseGeometries: function(t) {
            var e = {};
            if (void 0 !== t) for (var i = new po(), n = new ao(), r = 0, a = t.length; r < a; r++) {
                var o, s = t[r];
                switch (s.type) {
                  case "PlaneGeometry":
                  case "PlaneBufferGeometry":
                    o = new ua[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                    break;

                  case "BoxGeometry":
                  case "BoxBufferGeometry":
                  case "CubeGeometry":
                    o = new ua[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                    break;

                  case "CircleGeometry":
                  case "CircleBufferGeometry":
                    o = new ua[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
                    break;

                  case "CylinderGeometry":
                  case "CylinderBufferGeometry":
                    o = new ua[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                    break;

                  case "ConeGeometry":
                  case "ConeBufferGeometry":
                    o = new ua[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                    break;

                  case "SphereGeometry":
                  case "SphereBufferGeometry":
                    o = new ua[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                    break;

                  case "DodecahedronGeometry":
                  case "DodecahedronBufferGeometry":
                  case "IcosahedronGeometry":
                  case "IcosahedronBufferGeometry":
                  case "OctahedronGeometry":
                  case "OctahedronBufferGeometry":
                  case "TetrahedronGeometry":
                  case "TetrahedronBufferGeometry":
                    o = new ua[s.type](s.radius, s.detail);
                    break;

                  case "RingGeometry":
                  case "RingBufferGeometry":
                    o = new ua[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
                    break;

                  case "TorusGeometry":
                  case "TorusBufferGeometry":
                    o = new ua[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                    break;

                  case "TorusKnotGeometry":
                  case "TorusKnotBufferGeometry":
                    o = new ua[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
                    break;

                  case "LatheGeometry":
                  case "LatheBufferGeometry":
                    o = new ua[s.type](s.points, s.segments, s.phiStart, s.phiLength);
                    break;

                  case "PolyhedronGeometry":
                  case "PolyhedronBufferGeometry":
                    o = new ua[s.type](s.vertices, s.indices, s.radius, s.details);
                    break;

                  case "BufferGeometry":
                    o = n.parse(s);
                    break;

                  case "Geometry":
                    o = i.parse(s, this.texturePath).geometry;
                    break;

                  default:
                    console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
                    continue;
                }
                o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), e[s.uuid] = o;
            }
            return e;
        },
        parseMaterials: function(t, e) {
            var i = {};
            if (void 0 !== t) {
                var n = new ro();
                n.setTextures(e);
                for (var r = 0, a = t.length; r < a; r++) {
                    var o = t[r];
                    if ("MultiMaterial" === o.type) {
                        for (var s = [], c = 0; c < o.materials.length; c++) s.push(n.parse(o.materials[c]));
                        i[o.uuid] = s;
                    } else i[o.uuid] = n.parse(o);
                }
            }
            return i;
        },
        parseAnimations: function(t) {
            for (var e = [], i = 0; i < t.length; i++) {
                var n = no.parse(t[i]);
                e.push(n);
            }
            return e;
        },
        parseImages: function(t, e) {
            var i = this, n = {};
            function r(t) {
                return i.manager.itemStart(t), a.load(t, function() {
                    i.manager.itemEnd(t);
                }, void 0, function() {
                    i.manager.itemEnd(t), i.manager.itemError(t);
                });
            }
            if (void 0 !== t && t.length > 0) {
                var a = new La(new Ma(e));
                a.setCrossOrigin(this.crossOrigin);
                for (var o = 0, s = t.length; o < s; o++) {
                    var c = t[o], h = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : i.texturePath + c.url;
                    n[c.uuid] = r(h);
                }
            }
            return n;
        },
        parseTextures: function(t, e) {
            function i(t, e) {
                return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), 
                e[t]);
            }
            var n = {};
            if (void 0 !== t) for (var r = 0, a = t.length; r < a; r++) {
                var o = t[r];
                void 0 === o.image && console.warn('THREE.ObjectLoader: No "image" specified for', o.uuid), 
                void 0 === e[o.image] && console.warn("THREE.ObjectLoader: Undefined image", o.image);
                var s = new Ee(e[o.image]);
                s.needsUpdate = !0, s.uuid = o.uuid, void 0 !== o.name && (s.name = o.name), void 0 !== o.mapping && (s.mapping = i(o.mapping, mo)), 
                void 0 !== o.offset && s.offset.fromArray(o.offset), void 0 !== o.repeat && s.repeat.fromArray(o.repeat), 
                void 0 !== o.center && s.center.fromArray(o.center), void 0 !== o.rotation && (s.rotation = o.rotation), 
                void 0 !== o.wrap && (s.wrapS = i(o.wrap[0], go), s.wrapT = i(o.wrap[1], go)), void 0 !== o.minFilter && (s.minFilter = i(o.minFilter, vo)), 
                void 0 !== o.magFilter && (s.magFilter = i(o.magFilter, vo)), void 0 !== o.anisotropy && (s.anisotropy = o.anisotropy), 
                void 0 !== o.flipY && (s.flipY = o.flipY), n[o.uuid] = s;
            }
            return n;
        },
        parseObject: function() {
            var t = new xe();
            return function(e, i, n) {
                var r;
                function a(t) {
                    return void 0 === i[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), 
                    i[t];
                }
                function o(t) {
                    if (void 0 !== t) {
                        if (Array.isArray(t)) {
                            for (var e = [], i = 0, r = t.length; i < r; i++) {
                                var a = t[i];
                                void 0 === n[a] && console.warn("THREE.ObjectLoader: Undefined material", a), e.push(n[a]);
                            }
                            return e;
                        }
                        return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined material", t), 
                        n[t];
                    }
                }
                switch (e.type) {
                  case "Scene":
                    r = new cr(), void 0 !== e.background && Number.isInteger(e.background) && (r.background = new gi(e.background)), 
                    void 0 !== e.fog && ("Fog" === e.fog.type ? r.fog = new sr(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (r.fog = new or(e.fog.color, e.fog.density)));
                    break;

                  case "PerspectiveCamera":
                    r = new ir(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (r.focus = e.focus), 
                    void 0 !== e.zoom && (r.zoom = e.zoom), void 0 !== e.filmGauge && (r.filmGauge = e.filmGauge), 
                    void 0 !== e.filmOffset && (r.filmOffset = e.filmOffset), void 0 !== e.view && (r.view = Object.assign({}, e.view));
                    break;

                  case "OrthographicCamera":
                    r = new Qi(e.left, e.right, e.top, e.bottom, e.near, e.far);
                    break;

                  case "AmbientLight":
                    r = new Ga(e.color, e.intensity);
                    break;

                  case "DirectionalLight":
                    r = new za(e.color, e.intensity);
                    break;

                  case "PointLight":
                    r = new Fa(e.color, e.intensity, e.distance, e.decay);
                    break;

                  case "RectAreaLight":
                    r = new Ha(e.color, e.intensity, e.width, e.height);
                    break;

                  case "SpotLight":
                    r = new Na(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
                    break;

                  case "HemisphereLight":
                    r = new Ua(e.color, e.groundColor, e.intensity);
                    break;

                  case "SkinnedMesh":
                    console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");

                  case "Mesh":
                    var s = a(e.geometry), c = o(e.material);
                    r = s.bones && s.bones.length > 0 ? new mr(s, c) : new Un(s, c);
                    break;

                  case "LOD":
                    r = new pr();
                    break;

                  case "Line":
                    r = new vr(a(e.geometry), o(e.material), e.mode);
                    break;

                  case "LineLoop":
                    r = new xr(a(e.geometry), o(e.material));
                    break;

                  case "LineSegments":
                    r = new yr(a(e.geometry), o(e.material));
                    break;

                  case "PointCloud":
                  case "Points":
                    r = new _r(a(e.geometry), o(e.material));
                    break;

                  case "Sprite":
                    r = new ur(o(e.material));
                    break;

                  case "Group":
                    r = new wr();
                    break;

                  default:
                    r = new Zi();
                }
                if (r.uuid = e.uuid, void 0 !== e.name && (r.name = e.name), void 0 !== e.matrix ? (t.fromArray(e.matrix), 
                t.decompose(r.position, r.quaternion, r.scale)) : (void 0 !== e.position && r.position.fromArray(e.position), 
                void 0 !== e.rotation && r.rotation.fromArray(e.rotation), void 0 !== e.quaternion && r.quaternion.fromArray(e.quaternion), 
                void 0 !== e.scale && r.scale.fromArray(e.scale)), void 0 !== e.castShadow && (r.castShadow = e.castShadow), 
                void 0 !== e.receiveShadow && (r.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (r.shadow.bias = e.shadow.bias), 
                void 0 !== e.shadow.radius && (r.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && r.shadow.mapSize.fromArray(e.shadow.mapSize), 
                void 0 !== e.shadow.camera && (r.shadow.camera = this.parseObject(e.shadow.camera))), 
                void 0 !== e.visible && (r.visible = e.visible), void 0 !== e.userData && (r.userData = e.userData), 
                void 0 !== e.children) for (var h = e.children, l = 0; l < h.length; l++) r.add(this.parseObject(h[l], i, n));
                if ("LOD" === e.type) for (var u = e.levels, p = 0; p < u.length; p++) {
                    var d = u[p], f = r.getObjectByProperty("uuid", d.object);
                    void 0 !== f && r.addLevel(f, d.distance);
                }
                return r;
            };
        }()
    });
    var mo = {
        UVMapping: 300,
        CubeReflectionMapping: pt,
        CubeRefractionMapping: dt,
        EquirectangularReflectionMapping: ft,
        EquirectangularRefractionMapping: mt,
        SphericalReflectionMapping: gt,
        CubeUVReflectionMapping: vt,
        CubeUVRefractionMapping: yt
    }, go = {
        RepeatWrapping: xt,
        ClampToEdgeWrapping: bt,
        MirroredRepeatWrapping: _t
    }, vo = {
        NearestFilter: wt,
        NearestMipMapNearestFilter: Mt,
        NearestMipMapLinearFilter: Et,
        LinearFilter: Tt,
        LinearMipMapNearestFilter: St,
        LinearMipMapLinearFilter: At
    };
    function yo(t, e, i, n, r) {
        var a = .5 * (n - e), o = .5 * (r - i), s = t * t;
        return (2 * i - 2 * n + a + o) * (t * s) + (-3 * i + 3 * n - 2 * a - o) * s + a * t + i;
    }
    function xo(t, e, i, n) {
        return function(t, e) {
            var i = 1 - t;
            return i * i * e;
        }(t, e) + function(t, e) {
            return 2 * (1 - t) * t * e;
        }(t, i) + function(t, e) {
            return t * t * e;
        }(t, n);
    }
    function bo(t, e, i, n, r) {
        return function(t, e) {
            var i = 1 - t;
            return i * i * i * e;
        }(t, e) + function(t, e) {
            var i = 1 - t;
            return 3 * i * i * t * e;
        }(t, i) + function(t, e) {
            return 3 * (1 - t) * t * t * e;
        }(t, n) + function(t, e) {
            return t * t * t * e;
        }(t, r);
    }
    function _o() {
        this.arcLengthDivisions = 200;
    }
    function wo(t, e) {
        _o.call(this), this.v1 = t, this.v2 = e;
    }
    function Mo() {
        _o.call(this), this.curves = [], this.autoClose = !1;
    }
    function Eo(t, e, i, n, r, a, o, s) {
        _o.call(this), this.aX = t, this.aY = e, this.xRadius = i, this.yRadius = n, this.aStartAngle = r, 
        this.aEndAngle = a, this.aClockwise = o, this.aRotation = s || 0;
    }
    function To(t) {
        _o.call(this), this.points = void 0 === t ? [] : t;
    }
    function So(t, e, i, n) {
        _o.call(this), this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = n;
    }
    function Ao(t, e, i) {
        _o.call(this), this.v0 = t, this.v1 = e, this.v2 = i;
    }
    Object.assign(_o.prototype, {
        getPoint: function() {
            return console.warn("THREE.Curve: .getPoint() not implemented."), null;
        },
        getPointAt: function(t, e) {
            var i = this.getUtoTmapping(t);
            return this.getPoint(i, e);
        },
        getPoints: function(t) {
            void 0 === t && (t = 5);
            for (var e = [], i = 0; i <= t; i++) e.push(this.getPoint(i / t));
            return e;
        },
        getSpacedPoints: function(t) {
            void 0 === t && (t = 5);
            for (var e = [], i = 0; i <= t; i++) e.push(this.getPointAt(i / t));
            return e;
        },
        getLength: function() {
            var t = this.getLengths();
            return t[t.length - 1];
        },
        getLengths: function(t) {
            if (void 0 === t && (t = this.arcLengthDivisions), this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
            this.needsUpdate = !1;
            var e, i, n = [], r = this.getPoint(0), a = 0;
            for (n.push(0), i = 1; i <= t; i++) a += (e = this.getPoint(i / t)).distanceTo(r), 
            n.push(a), r = e;
            return this.cacheArcLengths = n, n;
        },
        updateArcLengths: function() {
            this.needsUpdate = !0, this.getLengths();
        },
        getUtoTmapping: function(t, e) {
            var i, n = this.getLengths(), r = 0, a = n.length;
            i = e || t * n[a - 1];
            for (var o, s = 0, c = a - 1; s <= c; ) if ((o = n[r = Math.floor(s + (c - s) / 2)] - i) < 0) s = r + 1; else {
                if (!(o > 0)) {
                    c = r;
                    break;
                }
                c = r - 1;
            }
            if (n[r = c] === i) return r / (a - 1);
            var h = n[r];
            return (r + (i - h) / (n[r + 1] - h)) / (a - 1);
        },
        getTangent: function(t) {
            var e = t - 1e-4, i = t + 1e-4;
            e < 0 && (e = 0), i > 1 && (i = 1);
            var n = this.getPoint(e);
            return this.getPoint(i).clone().sub(n).normalize();
        },
        getTangentAt: function(t) {
            var e = this.getUtoTmapping(t);
            return this.getTangent(e);
        },
        computeFrenetFrames: function(t, e) {
            var i, n, r, a = new _e(), o = [], s = [], c = [], h = new _e(), l = new xe();
            for (i = 0; i <= t; i++) n = i / t, o[i] = this.getTangentAt(n), o[i].normalize();
            s[0] = new _e(), c[0] = new _e();
            var u = Number.MAX_VALUE, p = Math.abs(o[0].x), d = Math.abs(o[0].y), f = Math.abs(o[0].z);
            for (p <= u && (u = p, a.set(1, 0, 0)), d <= u && (u = d, a.set(0, 1, 0)), f <= u && a.set(0, 0, 1), 
            h.crossVectors(o[0], a).normalize(), s[0].crossVectors(o[0], h), c[0].crossVectors(o[0], s[0]), 
            i = 1; i <= t; i++) s[i] = s[i - 1].clone(), c[i] = c[i - 1].clone(), h.crossVectors(o[i - 1], o[i]), 
            h.length() > Number.EPSILON && (h.normalize(), r = Math.acos(ve.clamp(o[i - 1].dot(o[i]), -1, 1)), 
            s[i].applyMatrix4(l.makeRotationAxis(h, r))), c[i].crossVectors(o[i], s[i]);
            if (!0 === e) for (r = Math.acos(ve.clamp(s[0].dot(s[t]), -1, 1)), r /= t, o[0].dot(h.crossVectors(s[0], s[t])) > 0 && (r = -r), 
            i = 1; i <= t; i++) s[i].applyMatrix4(l.makeRotationAxis(o[i], r * i)), c[i].crossVectors(o[i], s[i]);
            return {
                tangents: o,
                normals: s,
                binormals: c
            };
        }
    }), wo.prototype = Object.create(_o.prototype), wo.prototype.constructor = wo, wo.prototype.isLineCurve = !0, 
    wo.prototype.getPoint = function(t, e) {
        var i = e || new ye();
        return 1 === t ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), 
        i;
    }, wo.prototype.getPointAt = function(t, e) {
        return this.getPoint(t, e);
    }, wo.prototype.getTangent = function() {
        return this.v2.clone().sub(this.v1).normalize();
    }, Mo.prototype = Object.assign(Object.create(_o.prototype), {
        constructor: Mo,
        add: function(t) {
            this.curves.push(t);
        },
        closePath: function() {
            var t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
            t.equals(e) || this.curves.push(new wo(e, t));
        },
        getPoint: function(t) {
            for (var e = t * this.getLength(), i = this.getCurveLengths(), n = 0; n < i.length; ) {
                if (i[n] >= e) {
                    var r = i[n] - e, a = this.curves[n], o = a.getLength(), s = 0 === o ? 0 : 1 - r / o;
                    return a.getPointAt(s);
                }
                n++;
            }
            return null;
        },
        getLength: function() {
            var t = this.getCurveLengths();
            return t[t.length - 1];
        },
        updateArcLengths: function() {
            this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
        },
        getCurveLengths: function() {
            if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
            for (var t = [], e = 0, i = 0, n = this.curves.length; i < n; i++) e += this.curves[i].getLength(), 
            t.push(e);
            return this.cacheLengths = t, t;
        },
        getSpacedPoints: function(t) {
            void 0 === t && (t = 40);
            for (var e = [], i = 0; i <= t; i++) e.push(this.getPoint(i / t));
            return this.autoClose && e.push(e[0]), e;
        },
        getPoints: function(t) {
            t = t || 12;
            for (var e, i = [], n = 0, r = this.curves; n < r.length; n++) for (var a = r[n], o = a && a.isEllipseCurve ? 2 * t : a && a.isLineCurve ? 1 : a && a.isSplineCurve ? t * a.points.length : t, s = a.getPoints(o), c = 0; c < s.length; c++) {
                var h = s[c];
                e && e.equals(h) || (i.push(h), e = h);
            }
            return this.autoClose && i.length > 1 && !i[i.length - 1].equals(i[0]) && i.push(i[0]), 
            i;
        }
    }), Eo.prototype = Object.create(_o.prototype), Eo.prototype.constructor = Eo, Eo.prototype.isEllipseCurve = !0, 
    Eo.prototype.getPoint = function(t, e) {
        for (var i = e || new ye(), n = 2 * Math.PI, r = this.aEndAngle - this.aStartAngle, a = Math.abs(r) < Number.EPSILON; r < 0; ) r += n;
        for (;r > n; ) r -= n;
        r < Number.EPSILON && (r = a ? 0 : n), !0 !== this.aClockwise || a || (r === n ? r = -n : r -= n);
        var o = this.aStartAngle + t * r, s = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
        if (0 !== this.aRotation) {
            var h = Math.cos(this.aRotation), l = Math.sin(this.aRotation), u = s - this.aX, p = c - this.aY;
            s = u * h - p * l + this.aX, c = u * l + p * h + this.aY;
        }
        return i.set(s, c);
    }, To.prototype = Object.create(_o.prototype), To.prototype.constructor = To, To.prototype.isSplineCurve = !0, 
    To.prototype.getPoint = function(t, e) {
        var i = e || new ye(), n = this.points, r = (n.length - 1) * t, a = Math.floor(r), o = r - a, s = n[0 === a ? a : a - 1], c = n[a], h = n[a > n.length - 2 ? n.length - 1 : a + 1], l = n[a > n.length - 3 ? n.length - 1 : a + 2];
        return i.set(yo(o, s.x, c.x, h.x, l.x), yo(o, s.y, c.y, h.y, l.y)), i;
    }, So.prototype = Object.create(_o.prototype), So.prototype.constructor = So, So.prototype.isCubicBezierCurve = !0, 
    So.prototype.getPoint = function(t, e) {
        var i = e || new ye(), n = this.v0, r = this.v1, a = this.v2, o = this.v3;
        return i.set(bo(t, n.x, r.x, a.x, o.x), bo(t, n.y, r.y, a.y, o.y)), i;
    }, Ao.prototype = Object.create(_o.prototype), Ao.prototype.constructor = Ao, Ao.prototype.isQuadraticBezierCurve = !0, 
    Ao.prototype.getPoint = function(t, e) {
        var i = e || new ye(), n = this.v0, r = this.v1, a = this.v2;
        return i.set(xo(t, n.x, r.x, a.x), xo(t, n.y, r.y, a.y)), i;
    };
    var Ro, Lo = Object.assign(Object.create(Mo.prototype), {
        fromPoints: function(t) {
            this.moveTo(t[0].x, t[0].y);
            for (var e = 1, i = t.length; e < i; e++) this.lineTo(t[e].x, t[e].y);
        },
        moveTo: function(t, e) {
            this.currentPoint.set(t, e);
        },
        lineTo: function(t, e) {
            var i = new wo(this.currentPoint.clone(), new ye(t, e));
            this.curves.push(i), this.currentPoint.set(t, e);
        },
        quadraticCurveTo: function(t, e, i, n) {
            var r = new Ao(this.currentPoint.clone(), new ye(t, e), new ye(i, n));
            this.curves.push(r), this.currentPoint.set(i, n);
        },
        bezierCurveTo: function(t, e, i, n, r, a) {
            var o = new So(this.currentPoint.clone(), new ye(t, e), new ye(i, n), new ye(r, a));
            this.curves.push(o), this.currentPoint.set(r, a);
        },
        splineThru: function(t) {
            var e = new To([ this.currentPoint.clone() ].concat(t));
            this.curves.push(e), this.currentPoint.copy(t[t.length - 1]);
        },
        arc: function(t, e, i, n, r, a) {
            var o = this.currentPoint.x, s = this.currentPoint.y;
            this.absarc(t + o, e + s, i, n, r, a);
        },
        absarc: function(t, e, i, n, r, a) {
            this.absellipse(t, e, i, i, n, r, a);
        },
        ellipse: function(t, e, i, n, r, a, o, s) {
            var c = this.currentPoint.x, h = this.currentPoint.y;
            this.absellipse(t + c, e + h, i, n, r, a, o, s);
        },
        absellipse: function(t, e, i, n, r, a, o, s) {
            var c = new Eo(t, e, i, n, r, a, o, s);
            if (this.curves.length > 0) {
                var h = c.getPoint(0);
                h.equals(this.currentPoint) || this.lineTo(h.x, h.y);
            }
            this.curves.push(c);
            var l = c.getPoint(1);
            this.currentPoint.copy(l);
        }
    });
    function Po(t) {
        Mo.call(this), this.currentPoint = new ye(), t && this.fromPoints(t);
    }
    function Co() {
        Po.apply(this, arguments), this.holes = [];
    }
    function Io() {
        this.subPaths = [], this.currentPath = null;
    }
    function Uo(t) {
        this.data = t;
    }
    function Do(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    Po.prototype = Lo, Lo.constructor = Po, Co.prototype = Object.assign(Object.create(Lo), {
        constructor: Co,
        getPointsHoles: function(t) {
            for (var e = [], i = 0, n = this.holes.length; i < n; i++) e[i] = this.holes[i].getPoints(t);
            return e;
        },
        extractAllPoints: function(t) {
            return {
                shape: this.getPoints(t),
                holes: this.getPointsHoles(t)
            };
        },
        extractPoints: function(t) {
            return this.extractAllPoints(t);
        }
    }), Object.assign(Io.prototype, {
        moveTo: function(t, e) {
            this.currentPath = new Po(), this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e);
        },
        lineTo: function(t, e) {
            this.currentPath.lineTo(t, e);
        },
        quadraticCurveTo: function(t, e, i, n) {
            this.currentPath.quadraticCurveTo(t, e, i, n);
        },
        bezierCurveTo: function(t, e, i, n, r, a) {
            this.currentPath.bezierCurveTo(t, e, i, n, r, a);
        },
        splineThru: function(t) {
            this.currentPath.splineThru(t);
        },
        toShapes: function(t, e) {
            function i(t) {
                for (var e = [], i = 0, n = t.length; i < n; i++) {
                    var r = t[i], a = new Co();
                    a.curves = r.curves, e.push(a);
                }
                return e;
            }
            function n(t, e) {
                for (var i = e.length, n = !1, r = i - 1, a = 0; a < i; r = a++) {
                    var o = e[r], s = e[a], c = s.x - o.x, h = s.y - o.y;
                    if (Math.abs(h) > Number.EPSILON) {
                        if (h < 0 && (o = e[a], c = -c, s = e[r], h = -h), t.y < o.y || t.y > s.y) continue;
                        if (t.y === o.y) {
                            if (t.x === o.x) return !0;
                        } else {
                            var l = h * (t.x - o.x) - c * (t.y - o.y);
                            if (0 === l) return !0;
                            if (l < 0) continue;
                            n = !n;
                        }
                    } else {
                        if (t.y !== o.y) continue;
                        if (s.x <= t.x && t.x <= o.x || o.x <= t.x && t.x <= s.x) return !0;
                    }
                }
                return n;
            }
            var r = Wr.isClockWise, a = this.subPaths;
            if (0 === a.length) return [];
            if (!0 === e) return i(a);
            var o, s, c, h = [];
            if (1 === a.length) return s = a[0], (c = new Co()).curves = s.curves, h.push(c), 
            h;
            var l = !r(a[0].getPoints());
            l = t ? !l : l;
            var u, p, d = [], f = [], m = [], g = 0;
            f[g] = void 0, m[g] = [];
            for (var v = 0, y = a.length; v < y; v++) o = r(u = (s = a[v]).getPoints()), (o = t ? !o : o) ? (!l && f[g] && g++, 
            f[g] = {
                s: new Co(),
                p: u
            }, f[g].s.curves = s.curves, l && g++, m[g] = []) : m[g].push({
                h: s,
                p: u[0]
            });
            if (!f[0]) return i(a);
            if (f.length > 1) {
                for (var x = !1, b = [], _ = 0, w = f.length; _ < w; _++) d[_] = [];
                for (_ = 0, w = f.length; _ < w; _++) for (var M = m[_], E = 0; E < M.length; E++) {
                    for (var T = M[E], S = !0, A = 0; A < f.length; A++) n(T.p, f[A].p) && (_ !== A && b.push({
                        froms: _,
                        tos: A,
                        hole: E
                    }), S ? (S = !1, d[A].push(T)) : x = !0);
                    S && d[_].push(T);
                }
                b.length > 0 && (x || (m = d));
            }
            v = 0;
            for (var R = f.length; v < R; v++) {
                c = f[v].s, h.push(c);
                for (var L = 0, P = (p = m[v]).length; L < P; L++) c.holes.push(p[L].h);
            }
            return h;
        }
    }), Object.assign(Uo.prototype, {
        isFont: !0,
        generateShapes: function(t, e, i) {
            function n(t, e, n, a) {
                var o = r.glyphs[t] || r.glyphs["?"];
                if (o) {
                    var s, c, h, l, u, p, d, f, m, g, v, y = new Io(), x = [];
                    if (o.o) for (var b = o._cachedOutline || (o._cachedOutline = o.o.split(" ")), _ = 0, w = b.length; _ < w; ) {
                        switch (b[_++]) {
                          case "m":
                            s = b[_++] * e + n, c = b[_++] * e + a, y.moveTo(s, c);
                            break;

                          case "l":
                            s = b[_++] * e + n, c = b[_++] * e + a, y.lineTo(s, c);
                            break;

                          case "q":
                            if (h = b[_++] * e + n, l = b[_++] * e + a, d = b[_++] * e + n, f = b[_++] * e + a, 
                            y.quadraticCurveTo(d, f, h, l), v = x[x.length - 1]) {
                                u = v.x, p = v.y;
                                for (var M = 1; M <= i; M++) {
                                    xo(E = M / i, u, d, h), xo(E, p, f, l);
                                }
                            }
                            break;

                          case "b":
                            if (h = b[_++] * e + n, l = b[_++] * e + a, d = b[_++] * e + n, f = b[_++] * e + a, 
                            m = b[_++] * e + n, g = b[_++] * e + a, y.bezierCurveTo(d, f, m, g, h, l), v = x[x.length - 1]) {
                                u = v.x, p = v.y;
                                for (M = 1; M <= i; M++) {
                                    var E;
                                    bo(E = M / i, u, d, m, h), bo(E, p, f, g, l);
                                }
                            }
                        }
                    }
                    return {
                        offsetX: o.ha * e,
                        path: y
                    };
                }
            }
            void 0 === e && (e = 100), void 0 === i && (i = 4);
            for (var r = this.data, a = function(t) {
                for (var i = String(t).split(""), a = e / r.resolution, o = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * a, s = 0, c = 0, h = [], l = 0; l < i.length; l++) {
                    var u = i[l];
                    if ("\n" === u) s = 0, c -= o; else {
                        var p = n(u, a, s, c);
                        s += p.offsetX, h.push(p.path);
                    }
                }
                return h;
            }(t), o = [], s = 0, c = a.length; s < c; s++) Array.prototype.push.apply(o, a[s].toShapes());
            return o;
        }
    }), Object.assign(Do.prototype, {
        load: function(t, e, i, n) {
            var r;
            new Sa(this.manager);
            try {
                r = JSON.parse(t);
            } catch (e) {
                console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), 
                r = JSON.parse(t.substring(65, t.length - 2));
            }
            var a = this.parse(r);
            e && e(a);
        },
        parse: function(t) {
            return new Uo(t);
        },
        setPath: function(t) {
            return this.path = t, this;
        }
    });
    var Oo, No, Fo, Bo, zo, Go, Ho, Vo, ko, jo, Wo, Xo, qo, Yo, Zo, Jo, Qo = {
        getContext: function() {
            return void 0 === Ro && (Ro = new (window.AudioContext || window.webkitAudioContext)()), 
            Ro;
        },
        setContext: function(t) {
            Ro = t;
        }
    };
    function Ko(t) {
        this.manager = void 0 !== t ? t : Ea;
    }
    function $o() {
        this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new ir(), 
        this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new ir(), 
        this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1;
    }
    function ts(t, e, i) {
        Zi.call(this), this.type = "CubeCamera";
        var n = new ir(90, 1, t, e);
        n.up.set(0, -1, 0), n.lookAt(new _e(1, 0, 0)), this.add(n);
        var r = new ir(90, 1, t, e);
        r.up.set(0, -1, 0), r.lookAt(new _e(-1, 0, 0)), this.add(r);
        var a = new ir(90, 1, t, e);
        a.up.set(0, 0, 1), a.lookAt(new _e(0, 1, 0)), this.add(a);
        var o = new ir(90, 1, t, e);
        o.up.set(0, 0, -1), o.lookAt(new _e(0, -1, 0)), this.add(o);
        var s = new ir(90, 1, t, e);
        s.up.set(0, -1, 0), s.lookAt(new _e(0, 0, 1)), this.add(s);
        var c = new ir(90, 1, t, e);
        c.up.set(0, -1, 0), c.lookAt(new _e(0, 0, -1)), this.add(c);
        var h = {
            format: Ht,
            magFilter: Tt,
            minFilter: Tt
        };
        this.renderTarget = new Ae(i, i, h), this.renderTarget.texture.name = "CubeCamera", 
        this.update = function(t, e) {
            null === this.parent && this.updateMatrixWorld();
            var i = this.renderTarget, h = i.texture.generateMipmaps;
            i.texture.generateMipmaps = !1, i.activeCubeFace = 0, t.render(e, n, i), i.activeCubeFace = 1, 
            t.render(e, r, i), i.activeCubeFace = 2, t.render(e, a, i), i.activeCubeFace = 3, 
            t.render(e, o, i), i.activeCubeFace = 4, t.render(e, s, i), i.texture.generateMipmaps = h, 
            i.activeCubeFace = 5, t.render(e, c, i), t.setRenderTarget(null);
        }, this.clear = function(t, e, i, n) {
            for (var r = this.renderTarget, a = 0; a < 6; a++) r.activeCubeFace = a, t.setRenderTarget(r), 
            t.clear(e, i, n);
            t.setRenderTarget(null);
        };
    }
    function es() {
        Zi.call(this), this.type = "AudioListener", this.context = Qo.getContext(), this.gain = this.context.createGain(), 
        this.gain.connect(this.context.destination), this.filter = null;
    }
    function is(t) {
        Zi.call(this), this.type = "Audio", this.context = t.context, this.gain = this.context.createGain(), 
        this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.loop = !1, 
        this.startTime = 0, this.offset = 0, this.playbackRate = 1, this.isPlaying = !1, 
        this.hasPlaybackControl = !0, this.sourceType = "empty", this.filters = [];
    }
    function ns(t) {
        is.call(this, t), this.panner = this.context.createPanner(), this.panner.connect(this.gain);
    }
    function rs(t, e) {
        this.analyser = t.context.createAnalyser(), this.analyser.fftSize = void 0 !== e ? e : 2048, 
        this.data = new Uint8Array(this.analyser.frequencyBinCount), t.getOutput().connect(this.analyser);
    }
    function as(t, e, i) {
        this.binding = t, this.valueSize = i;
        var n, r = Float64Array;
        switch (e) {
          case "quaternion":
            n = this._slerp;
            break;

          case "string":
          case "bool":
            r = Array, n = this._select;
            break;

          default:
            n = this._lerp;
        }
        this.buffer = new r(4 * i), this._mixBufferRegion = n, this.cumulativeWeight = 0, 
        this.useCount = 0, this.referenceCount = 0;
    }
    function os(t, e, i) {
        var n = i || ss.parseTrackName(e);
        this._targetGroup = t, this._bindings = t.subscribe_(e, n);
    }
    function ss(t, e, i) {
        this.path = e, this.parsedPath = i || ss.parseTrackName(e), this.node = ss.findNode(t, this.parsedPath.nodeName) || t, 
        this.rootNode = t;
    }
    function cs() {
        this.uuid = ve.generateUUID(), this._objects = Array.prototype.slice.call(arguments), 
        this.nCachedObjects_ = 0;
        var t = {};
        this._indicesByUUID = t;
        for (var e = 0, i = arguments.length; e !== i; ++e) t[arguments[e].uuid] = e;
        this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
        var n = this;
        this.stats = {
            objects: {
                get total() {
                    return n._objects.length;
                },
                get inUse() {
                    return this.total - n.nCachedObjects_;
                }
            },
            get bindingsPerObject() {
                return n._bindings.length;
            }
        };
    }
    function hs(t, e, i) {
        this._mixer = t, this._clip = e, this._localRoot = i || null;
        for (var n = e.tracks, r = n.length, a = new Array(r), o = {
            endingStart: re,
            endingEnd: re
        }, s = 0; s !== r; ++s) {
            var c = n[s].createInterpolant(null);
            a[s] = c, c.settings = o;
        }
        this._interpolantSettings = o, this._interpolants = a, this._propertyBindings = new Array(r), 
        this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, 
        this._weightInterpolant = null, this.loop = ne, this._loopCount = -1, this._startTime = null, 
        this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, 
        this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, 
        this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0;
    }
    function ls(t) {
        this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1;
    }
    function us(t) {
        "string" == typeof t && (console.warn("THREE.Uniform: Type parameter is no longer needed."), 
        t = arguments[1]), this.value = t;
    }
    function ps() {
        Mn.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0;
    }
    function ds(t, e, i, n) {
        this.uuid = ve.generateUUID(), this.data = t, this.itemSize = e, this.offset = i, 
        this.normalized = !0 === n;
    }
    function fs(t, e) {
        this.uuid = ve.generateUUID(), this.array = t, this.stride = e, this.count = void 0 !== t ? t.length / e : 0, 
        this.dynamic = !1, this.updateRange = {
            offset: 0,
            count: -1
        }, this.onUploadCallback = function() {}, this.version = 0;
    }
    function ms(t, e, i) {
        fs.call(this, t, e), this.meshPerAttribute = i || 1;
    }
    function gs(t, e, i) {
        nn.call(this, t, e), this.meshPerAttribute = i || 1;
    }
    function vs(t, e, i, n) {
        this.ray = new Pn(t, e), this.near = i || 0, this.far = n || 1 / 0, this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        }, Object.defineProperties(this.params, {
            PointCloud: {
                get: function() {
                    return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), 
                    this.Points;
                }
            }
        });
    }
    function ys(t, e) {
        return t.distance - e.distance;
    }
    function xs(t, e, i, n) {
        if (!1 !== t.visible && (t.raycast(e, i), !0 === n)) for (var r = t.children, a = 0, o = r.length; a < o; a++) xs(r[a], e, i, !0);
    }
    function bs(t) {
        this.autoStart = void 0 === t || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, 
        this.running = !1;
    }
    function _s(t, e, i) {
        return this.radius = void 0 !== t ? t : 1, this.phi = void 0 !== e ? e : 0, this.theta = void 0 !== i ? i : 0, 
        this;
    }
    function ws(t, e, i) {
        return this.radius = void 0 !== t ? t : 1, this.theta = void 0 !== e ? e : 0, this.y = void 0 !== i ? i : 0, 
        this;
    }
    function Ms(t) {
        Zi.call(this), this.material = t, this.render = function() {};
    }
    function Es(t, e, i, n) {
        this.object = t, this.size = void 0 !== e ? e : 1;
        var r = void 0 !== i ? i : 16711680, a = void 0 !== n ? n : 1, o = 0, s = this.object.geometry;
        s && s.isGeometry ? o = 3 * s.faces.length : s && s.isBufferGeometry && (o = s.attributes.normal.count);
        var c = new Mn(), h = new un(2 * o * 3, 3);
        c.addAttribute("position", h), yr.call(this, c, new gr({
            color: r,
            linewidth: a
        })), this.matrixAutoUpdate = !1, this.update();
    }
    function Ts(t, e) {
        Zi.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, 
        this.matrixAutoUpdate = !1, this.color = e;
        for (var i = new Mn(), n = [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1 ], r = 0, a = 1; r < 32; r++, 
        a++) {
            var o = r / 32 * Math.PI * 2, s = a / 32 * Math.PI * 2;
            n.push(Math.cos(o), Math.sin(o), 1, Math.cos(s), Math.sin(s), 1);
        }
        i.addAttribute("position", new un(n, 3));
        var c = new gr({
            fog: !1
        });
        this.cone = new yr(i, c), this.add(this.cone), this.update();
    }
    function Ss(t) {
        for (var e = function t(e) {
            var i = [];
            e && e.isBone && i.push(e);
            for (var n = 0; n < e.children.length; n++) i.push.apply(i, t(e.children[n]));
            return i;
        }(t), i = new Mn(), n = [], r = [], a = new gi(0, 0, 1), o = new gi(0, 1, 0), s = 0; s < e.length; s++) {
            var c = e[s];
            c.parent && c.parent.isBone && (n.push(0, 0, 0), n.push(0, 0, 0), r.push(a.r, a.g, a.b), 
            r.push(o.r, o.g, o.b));
        }
        i.addAttribute("position", new un(n, 3)), i.addAttribute("color", new un(r, 3));
        var h = new gr({
            vertexColors: A,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0
        });
        yr.call(this, i, h), this.root = t, this.bones = e, this.matrix = t.matrixWorld, 
        this.matrixAutoUpdate = !1;
    }
    function As(t, e, i) {
        this.light = t, this.light.updateMatrixWorld(), this.color = i;
        var n = new Qr(e, 4, 2), r = new Rn({
            wireframe: !0,
            fog: !1
        });
        Un.call(this, n, r), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, 
        this.update();
    }
    function Rs(t, e) {
        Zi.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, 
        this.matrixAutoUpdate = !1, this.color = e;
        var i = new gr({
            fog: !1
        }), n = new Mn();
        n.addAttribute("position", new nn(new Float32Array(15), 3)), this.line = new vr(n, i), 
        this.add(this.line), this.update();
    }
    function Ls(t, e, i) {
        Zi.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, 
        this.matrixAutoUpdate = !1, this.color = i;
        var n = new Dr(e);
        n.rotateY(.5 * Math.PI), this.material = new Rn({
            wireframe: !0,
            fog: !1
        }), void 0 === this.color && (this.material.vertexColors = A);
        var r = n.getAttribute("position"), a = new Float32Array(3 * r.count);
        n.addAttribute("color", new nn(a, 3)), this.add(new Un(n, this.material)), this.update();
    }
    function Ps(t, e, i, n) {
        t = t || 10, e = e || 10, i = new gi(void 0 !== i ? i : 4473924), n = new gi(void 0 !== n ? n : 8947848);
        for (var r = e / 2, a = t / e, o = t / 2, s = [], c = [], h = 0, l = 0, u = -o; h <= e; h++, 
        u += a) {
            s.push(-o, 0, u, o, 0, u), s.push(u, 0, -o, u, 0, o);
            var p = h === r ? i : n;
            p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), 
            l += 3;
        }
        var d = new Mn();
        d.addAttribute("position", new un(s, 3)), d.addAttribute("color", new un(c, 3));
        var f = new gr({
            vertexColors: A
        });
        yr.call(this, d, f);
    }
    function Cs(t, e, i, n, r, a) {
        t = t || 10, e = e || 16, i = i || 8, n = n || 64, r = new gi(void 0 !== r ? r : 4473924), 
        a = new gi(void 0 !== a ? a : 8947848);
        var o, s, c, h, l, u, p, d = [], f = [];
        for (h = 0; h <= e; h++) c = h / e * (2 * Math.PI), o = Math.sin(c) * t, s = Math.cos(c) * t, 
        d.push(0, 0, 0), d.push(o, 0, s), p = 1 & h ? r : a, f.push(p.r, p.g, p.b), f.push(p.r, p.g, p.b);
        for (h = 0; h <= i; h++) for (p = 1 & h ? r : a, u = t - t / i * h, l = 0; l < n; l++) c = l / n * (2 * Math.PI), 
        o = Math.sin(c) * u, s = Math.cos(c) * u, d.push(o, 0, s), f.push(p.r, p.g, p.b), 
        c = (l + 1) / n * (2 * Math.PI), o = Math.sin(c) * u, s = Math.cos(c) * u, d.push(o, 0, s), 
        f.push(p.r, p.g, p.b);
        var m = new Mn();
        m.addAttribute("position", new un(d, 3)), m.addAttribute("color", new un(f, 3));
        var g = new gr({
            vertexColors: A
        });
        yr.call(this, m, g);
    }
    function Is(t, e, i, n) {
        this.object = t, this.size = void 0 !== e ? e : 1;
        var r = void 0 !== i ? i : 16776960, a = void 0 !== n ? n : 1, o = 0, s = this.object.geometry;
        s && s.isGeometry ? o = s.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
        var c = new Mn(), h = new un(2 * o * 3, 3);
        c.addAttribute("position", h), yr.call(this, c, new gr({
            color: r,
            linewidth: a
        })), this.matrixAutoUpdate = !1, this.update();
    }
    function Us(t, e, i) {
        Zi.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, 
        this.matrixAutoUpdate = !1, this.color = i, void 0 === e && (e = 1);
        var n = new Mn();
        n.addAttribute("position", new un([ -e, e, 0, e, e, 0, e, -e, 0, -e, -e, 0, -e, e, 0 ], 3));
        var r = new gr({
            fog: !1
        });
        this.lightPlane = new vr(n, r), this.add(this.lightPlane), (n = new Mn()).addAttribute("position", new un([ 0, 0, 0, 0, 0, 1 ], 3)), 
        this.targetLine = new vr(n, r), this.add(this.targetLine), this.update();
    }
    function Ds(t) {
        var e = new Mn(), i = new gr({
            color: 16777215,
            vertexColors: S
        }), n = [], r = [], a = {}, o = new gi(16755200), s = new gi(16711680), c = new gi(43775), h = new gi(16777215), l = new gi(3355443);
        function u(t, e, i) {
            p(t, i), p(e, i);
        }
        function p(t, e) {
            n.push(0, 0, 0), r.push(e.r, e.g, e.b), void 0 === a[t] && (a[t] = []), a[t].push(n.length / 3 - 1);
        }
        u("n1", "n2", o), u("n2", "n4", o), u("n4", "n3", o), u("n3", "n1", o), u("f1", "f2", o), 
        u("f2", "f4", o), u("f4", "f3", o), u("f3", "f1", o), u("n1", "f1", o), u("n2", "f2", o), 
        u("n3", "f3", o), u("n4", "f4", o), u("p", "n1", s), u("p", "n2", s), u("p", "n3", s), 
        u("p", "n4", s), u("u1", "u2", c), u("u2", "u3", c), u("u3", "u1", c), u("c", "t", h), 
        u("p", "c", l), u("cn1", "cn2", l), u("cn3", "cn4", l), u("cf1", "cf2", l), u("cf3", "cf4", l), 
        e.addAttribute("position", new un(n, 3)), e.addAttribute("color", new un(r, 3)), 
        yr.call(this, e, i), this.camera = t, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), 
        this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update();
    }
    function Os(t, e) {
        this.object = t, void 0 === e && (e = 16776960);
        var i = new Uint16Array([ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ]), n = new Float32Array(24), r = new Mn();
        r.setIndex(new nn(i, 1)), r.addAttribute("position", new nn(n, 3)), yr.call(this, r, new gr({
            color: e
        })), this.matrixAutoUpdate = !1, this.update();
    }
    function Ns(t, e) {
        this.type = "Box3Helper", this.box = t;
        var i = void 0 !== e ? e : 16776960, n = new Uint16Array([ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ]), r = new Mn();
        r.setIndex(new nn(n, 1)), r.addAttribute("position", new un([ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1 ], 3)), 
        yr.call(this, r, new gr({
            color: i
        })), this.geometry.computeBoundingSphere();
    }
    function Fs(t, e, i) {
        this.type = "PlaneHelper", this.plane = t, this.size = void 0 === e ? 1 : e;
        var n = void 0 !== i ? i : 16776960, r = new Mn();
        r.addAttribute("position", new un([ 1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0 ], 3)), 
        r.computeBoundingSphere(), vr.call(this, r, new gr({
            color: n
        }));
        var a = new Mn();
        a.addAttribute("position", new un([ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1 ], 3)), 
        a.computeBoundingSphere(), this.add(new Un(a, new Rn({
            color: n,
            opacity: .2,
            transparent: !0,
            depthWrite: !1
        })));
    }
    function Bs(t, e, i, n, r, a) {
        Zi.call(this), void 0 === n && (n = 16776960), void 0 === i && (i = 1), void 0 === r && (r = .2 * i), 
        void 0 === a && (a = .2 * r), void 0 === qo && ((qo = new Mn()).addAttribute("position", new un([ 0, 0, 0, 0, 1, 0 ], 3)), 
        (Yo = new oa(0, .5, 1, 5, 1)).translate(0, -.5, 0)), this.position.copy(e), this.line = new vr(qo, new gr({
            color: n
        })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Un(Yo, new Rn({
            color: n
        })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(t), 
        this.setLength(i, r, a);
    }
    function zs(t) {
        var e = [ 0, 0, 0, t = t || 1, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t ], i = new Mn();
        i.addAttribute("position", new un(e, 3)), i.addAttribute("color", new un([ 1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1 ], 3));
        var n = new gr({
            vertexColors: A
        });
        yr.call(this, i, n);
    }
    function Gs() {
        var t = 0, e = 0, i = 0, n = 0;
        function r(r, a, o, s) {
            t = r, e = o, i = -3 * r + 3 * a - 2 * o - s, n = 2 * r - 2 * a + o + s;
        }
        return {
            initCatmullRom: function(t, e, i, n, a) {
                r(e, i, a * (i - t), a * (n - e));
            },
            initNonuniformCatmullRom: function(t, e, i, n, a, o, s) {
                var c = (e - t) / a - (i - t) / (a + o) + (i - e) / o, h = (i - e) / o - (n - e) / (o + s) + (n - i) / s;
                r(e, i, c *= o, h *= o);
            },
            calc: function(r) {
                var a = r * r;
                return t + e * r + i * a + n * (a * r);
            }
        };
    }
    Object.assign(Ko.prototype, {
        load: function(t, e, i, n) {
            var r = new Sa(this.manager);
            r.setResponseType("arraybuffer"), r.load(t, function(t) {
                Qo.getContext().decodeAudioData(t, function(t) {
                    e(t);
                });
            }, i, n);
        }
    }), Object.assign($o.prototype, {
        update: (ko = new xe(), jo = new xe(), function(t) {
            if (Oo !== this || No !== t.focus || Fo !== t.fov || Bo !== t.aspect * this.aspect || zo !== t.near || Go !== t.far || Ho !== t.zoom || Vo !== this.eyeSep) {
                Oo = this, No = t.focus, Fo = t.fov, Bo = t.aspect * this.aspect, zo = t.near, Go = t.far, 
                Ho = t.zoom;
                var e, i, n = t.projectionMatrix.clone(), r = (Vo = this.eyeSep / 2) * zo / No, a = zo * Math.tan(ve.DEG2RAD * Fo * .5) / Ho;
                jo.elements[12] = -Vo, ko.elements[12] = Vo, e = -a * Bo + r, i = a * Bo + r, n.elements[0] = 2 * zo / (i - e), 
                n.elements[8] = (i + e) / (i - e), this.cameraL.projectionMatrix.copy(n), e = -a * Bo - r, 
                i = a * Bo - r, n.elements[0] = 2 * zo / (i - e), n.elements[8] = (i + e) / (i - e), 
                this.cameraR.projectionMatrix.copy(n);
            }
            this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(jo), this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(ko);
        })
    }), ts.prototype = Object.create(Zi.prototype), ts.prototype.constructor = ts, es.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: es,
        getInput: function() {
            return this.gain;
        },
        removeFilter: function() {
            null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), 
            this.gain.connect(this.context.destination), this.filter = null);
        },
        getFilter: function() {
            return this.filter;
        },
        setFilter: function(t) {
            null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), 
            this.filter = t, this.gain.connect(this.filter), this.filter.connect(this.context.destination);
        },
        getMasterVolume: function() {
            return this.gain.gain.value;
        },
        setMasterVolume: function(t) {
            this.gain.gain.value = t;
        },
        updateMatrixWorld: function() {
            var t = new _e(), e = new be(), i = new _e(), n = new _e();
            return function(r) {
                Zi.prototype.updateMatrixWorld.call(this, r);
                var a = this.context.listener, o = this.up;
                this.matrixWorld.decompose(t, e, i), n.set(0, 0, -1).applyQuaternion(e), a.positionX ? (a.positionX.setValueAtTime(t.x, this.context.currentTime), 
                a.positionY.setValueAtTime(t.y, this.context.currentTime), a.positionZ.setValueAtTime(t.z, this.context.currentTime), 
                a.forwardX.setValueAtTime(n.x, this.context.currentTime), a.forwardY.setValueAtTime(n.y, this.context.currentTime), 
                a.forwardZ.setValueAtTime(n.z, this.context.currentTime), a.upX.setValueAtTime(o.x, this.context.currentTime), 
                a.upY.setValueAtTime(o.y, this.context.currentTime), a.upZ.setValueAtTime(o.z, this.context.currentTime)) : (a.setPosition(t.x, t.y, t.z), 
                a.setOrientation(n.x, n.y, n.z, o.x, o.y, o.z));
            };
        }()
    }), is.prototype = Object.assign(Object.create(Zi.prototype), {
        constructor: is,
        getOutput: function() {
            return this.gain;
        },
        setNodeSource: function(t) {
            return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, 
            this.connect(), this;
        },
        setBuffer: function(t) {
            return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), 
            this;
        },
        play: function() {
            if (!0 !== this.isPlaying) {
                if (!1 !== this.hasPlaybackControl) {
                    var t = this.context.createBufferSource();
                    return t.buffer = this.buffer, t.loop = this.loop, t.onended = this.onEnded.bind(this), 
                    t.playbackRate.setValueAtTime(this.playbackRate, this.startTime), this.startTime = this.context.currentTime, 
                    t.start(this.startTime, this.offset), this.isPlaying = !0, this.source = t, this.connect();
                }
                console.warn("THREE.Audio: this Audio has no playback control.");
            } else console.warn("THREE.Audio: Audio is already playing.");
        },
        pause: function() {
            if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this.source.stop(), 
            this.offset += (this.context.currentTime - this.startTime) * this.playbackRate, 
            this.isPlaying = !1), this;
            console.warn("THREE.Audio: this Audio has no playback control.");
        },
        stop: function() {
            if (!1 !== this.hasPlaybackControl) return this.source.stop(), this.offset = 0, 
            this.isPlaying = !1, this;
            console.warn("THREE.Audio: this Audio has no playback control.");
        },
        connect: function() {
            if (this.filters.length > 0) {
                this.source.connect(this.filters[0]);
                for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
                this.filters[this.filters.length - 1].connect(this.getOutput());
            } else this.source.connect(this.getOutput());
            return this;
        },
        disconnect: function() {
            if (this.filters.length > 0) {
                this.source.disconnect(this.filters[0]);
                for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
                this.filters[this.filters.length - 1].disconnect(this.getOutput());
            } else this.source.disconnect(this.getOutput());
            return this;
        },
        getFilters: function() {
            return this.filters;
        },
        setFilters: function(t) {
            return t || (t = []), !0 === this.isPlaying ? (this.disconnect(), this.filters = t, 
            this.connect()) : this.filters = t, this;
        },
        getFilter: function() {
            return this.getFilters()[0];
        },
        setFilter: function(t) {
            return this.setFilters(t ? [ t ] : []);
        },
        setPlaybackRate: function(t) {
            if (!1 !== this.hasPlaybackControl) return this.playbackRate = t, !0 === this.isPlaying && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), 
            this;
            console.warn("THREE.Audio: this Audio has no playback control.");
        },
        getPlaybackRate: function() {
            return this.playbackRate;
        },
        onEnded: function() {
            this.isPlaying = !1;
        },
        getLoop: function() {
            return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), 
            !1) : this.loop;
        },
        setLoop: function(t) {
            if (!1 !== this.hasPlaybackControl) return this.loop = t, !0 === this.isPlaying && (this.source.loop = this.loop), 
            this;
            console.warn("THREE.Audio: this Audio has no playback control.");
        },
        getVolume: function() {
            return this.gain.gain.value;
        },
        setVolume: function(t) {
            return this.gain.gain.value = t, this;
        }
    }), ns.prototype = Object.assign(Object.create(is.prototype), {
        constructor: ns,
        getOutput: function() {
            return this.panner;
        },
        getRefDistance: function() {
            return this.panner.refDistance;
        },
        setRefDistance: function(t) {
            this.panner.refDistance = t;
        },
        getRolloffFactor: function() {
            return this.panner.rolloffFactor;
        },
        setRolloffFactor: function(t) {
            this.panner.rolloffFactor = t;
        },
        getDistanceModel: function() {
            return this.panner.distanceModel;
        },
        setDistanceModel: function(t) {
            this.panner.distanceModel = t;
        },
        getMaxDistance: function() {
            return this.panner.maxDistance;
        },
        setMaxDistance: function(t) {
            this.panner.maxDistance = t;
        },
        updateMatrixWorld: function() {
            var t = new _e();
            return function(e) {
                Zi.prototype.updateMatrixWorld.call(this, e), t.setFromMatrixPosition(this.matrixWorld), 
                this.panner.setPosition(t.x, t.y, t.z);
            };
        }()
    }), Object.assign(rs.prototype, {
        getFrequencyData: function() {
            return this.analyser.getByteFrequencyData(this.data), this.data;
        },
        getAverageFrequency: function() {
            for (var t = 0, e = this.getFrequencyData(), i = 0; i < e.length; i++) t += e[i];
            return t / e.length;
        }
    }), Object.assign(as.prototype, {
        accumulate: function(t, e) {
            var i = this.buffer, n = this.valueSize, r = t * n + n, a = this.cumulativeWeight;
            if (0 === a) {
                for (var o = 0; o !== n; ++o) i[r + o] = i[o];
                a = e;
            } else {
                var s = e / (a += e);
                this._mixBufferRegion(i, r, 0, s, n);
            }
            this.cumulativeWeight = a;
        },
        apply: function(t) {
            var e = this.valueSize, i = this.buffer, n = t * e + e, r = this.cumulativeWeight, a = this.binding;
            if (this.cumulativeWeight = 0, r < 1) {
                var o = 3 * e;
                this._mixBufferRegion(i, n, o, 1 - r, e);
            }
            for (var s = e, c = e + e; s !== c; ++s) if (i[s] !== i[s + e]) {
                a.setValue(i, n);
                break;
            }
        },
        saveOriginalState: function() {
            var t = this.binding, e = this.buffer, i = this.valueSize, n = 3 * i;
            t.getValue(e, n);
            for (var r = i, a = n; r !== a; ++r) e[r] = e[n + r % i];
            this.cumulativeWeight = 0;
        },
        restoreOriginalState: function() {
            var t = 3 * this.valueSize;
            this.binding.setValue(this.buffer, t);
        },
        _select: function(t, e, i, n, r) {
            if (n >= .5) for (var a = 0; a !== r; ++a) t[e + a] = t[i + a];
        },
        _slerp: function(t, e, i, n) {
            be.slerpFlat(t, e, t, e, t, i, n);
        },
        _lerp: function(t, e, i, n, r) {
            for (var a = 1 - n, o = 0; o !== r; ++o) {
                var s = e + o;
                t[s] = t[s] * a + t[i + o] * n;
            }
        }
    }), Object.assign(os.prototype, {
        getValue: function(t, e) {
            this.bind();
            var i = this._targetGroup.nCachedObjects_, n = this._bindings[i];
            void 0 !== n && n.getValue(t, e);
        },
        setValue: function(t, e) {
            for (var i = this._bindings, n = this._targetGroup.nCachedObjects_, r = i.length; n !== r; ++n) i[n].setValue(t, e);
        },
        bind: function() {
            for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].bind();
        },
        unbind: function() {
            for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].unbind();
        }
    }), Object.assign(ss, {
        Composite: os,
        create: function(t, e, i) {
            return t && t.isAnimationObjectGroup ? new ss.Composite(t, e, i) : new ss(t, e, i);
        },
        sanitizeNodeName: function(t) {
            return t.replace(/\s/g, "_").replace(/[^\w-]/g, "");
        },
        parseTrackName: (Wo = new RegExp("^" + /((?:[\w-]+[\/:])*)/.source + /([\w-\.]+)?/.source + /(?:\.([\w-]+)(?:\[(.+)\])?)?/.source + /\.([\w-]+)(?:\[(.+)\])?/.source + "$"), 
        Xo = [ "material", "materials", "bones" ], function(t) {
            var e = Wo.exec(t);
            if (!e) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
            var i = {
                nodeName: e[2],
                objectName: e[3],
                objectIndex: e[4],
                propertyName: e[5],
                propertyIndex: e[6]
            }, n = i.nodeName && i.nodeName.lastIndexOf(".");
            if (void 0 !== n && -1 !== n) {
                var r = i.nodeName.substring(n + 1);
                -1 !== Xo.indexOf(r) && (i.nodeName = i.nodeName.substring(0, n), i.objectName = r);
            }
            if (null === i.propertyName || 0 === i.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
            return i;
        }),
        findNode: function(t, e) {
            if (!e || "" === e || "root" === e || "." === e || -1 === e || e === t.name || e === t.uuid) return t;
            if (t.skeleton) {
                var i = function(t) {
                    for (var i = 0; i < t.bones.length; i++) {
                        var n = t.bones[i];
                        if (n.name === e) return n;
                    }
                    return null;
                }(t.skeleton);
                if (i) return i;
            }
            if (t.children) {
                var n = function(t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        if (r.name === e || r.uuid === e) return r;
                        var a = n(r.children);
                        if (a) return a;
                    }
                    return null;
                }, r = n(t.children);
                if (r) return r;
            }
            return null;
        }
    }), Object.assign(ss.prototype, {
        _getValue_unavailable: function() {},
        _setValue_unavailable: function() {},
        BindingType: {
            Direct: 0,
            EntireArray: 1,
            ArrayElement: 2,
            HasFromToArray: 3
        },
        Versioning: {
            None: 0,
            NeedsUpdate: 1,
            MatrixWorldNeedsUpdate: 2
        },
        GetterByBindingType: [ function(t, e) {
            t[e] = this.node[this.propertyName];
        }, function(t, e) {
            for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) t[e++] = i[n];
        }, function(t, e) {
            t[e] = this.resolvedProperty[this.propertyIndex];
        }, function(t, e) {
            this.resolvedProperty.toArray(t, e);
        } ],
        SetterByBindingTypeAndVersioning: [ [ function(t, e) {
            this.targetObject[this.propertyName] = t[e];
        }, function(t, e) {
            this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = !0;
        }, function(t, e) {
            this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0;
        } ], [ function(t, e) {
            for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
        }, function(t, e) {
            for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
            this.targetObject.needsUpdate = !0;
        }, function(t, e) {
            for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
            this.targetObject.matrixWorldNeedsUpdate = !0;
        } ], [ function(t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e];
        }, function(t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0;
        }, function(t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0;
        } ], [ function(t, e) {
            this.resolvedProperty.fromArray(t, e);
        }, function(t, e) {
            this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0;
        }, function(t, e) {
            this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0;
        } ] ],
        getValue: function(t, e) {
            this.bind(), this.getValue(t, e);
        },
        setValue: function(t, e) {
            this.bind(), this.setValue(t, e);
        },
        bind: function() {
            var t = this.node, e = this.parsedPath, i = e.objectName, n = e.propertyName, r = e.propertyIndex;
            if (t || (t = ss.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), 
            this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, 
            t) {
                if (i) {
                    var a = e.objectIndex;
                    switch (i) {
                      case "materials":
                        if (!t.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!t.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                        t = t.material.materials;
                        break;

                      case "bones":
                        if (!t.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                        t = t.skeleton.bones;
                        for (var o = 0; o < t.length; o++) if (t[o].name === a) {
                            a = o;
                            break;
                        }
                        break;

                      default:
                        if (void 0 === t[i]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                        t = t[i];
                    }
                    if (void 0 !== a) {
                        if (void 0 === t[a]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
                        t = t[a];
                    }
                }
                var s = t[n];
                if (void 0 !== s) {
                    var c = this.Versioning.None;
                    void 0 !== t.needsUpdate ? (c = this.Versioning.NeedsUpdate, this.targetObject = t) : void 0 !== t.matrixWorldNeedsUpdate && (c = this.Versioning.MatrixWorldNeedsUpdate, 
                    this.targetObject = t);
                    var h = this.BindingType.Direct;
                    if (void 0 !== r) {
                        if ("morphTargetInfluences" === n) {
                            if (!t.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                            if (t.geometry.isBufferGeometry) {
                                if (!t.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                                for (o = 0; o < this.node.geometry.morphAttributes.position.length; o++) if (t.geometry.morphAttributes.position[o].name === r) {
                                    r = o;
                                    break;
                                }
                            } else {
                                if (!t.geometry.morphTargets) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
                                for (o = 0; o < this.node.geometry.morphTargets.length; o++) if (t.geometry.morphTargets[o].name === r) {
                                    r = o;
                                    break;
                                }
                            }
                        }
                        h = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r;
                    } else void 0 !== s.fromArray && void 0 !== s.toArray ? (h = this.BindingType.HasFromToArray, 
                    this.resolvedProperty = s) : Array.isArray(s) ? (h = this.BindingType.EntireArray, 
                    this.resolvedProperty = s) : this.propertyName = n;
                    this.getValue = this.GetterByBindingType[h], this.setValue = this.SetterByBindingTypeAndVersioning[h][c];
                } else {
                    var l = e.nodeName;
                    console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + n + " but it wasn't found.", t);
                }
            } else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
        },
        unbind: function() {
            this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
        }
    }), 
    //!\ DECLARE ALIAS AFTER assign prototype !
    Object.assign(ss.prototype, {
        _getValue_unbound: ss.prototype.getValue,
        _setValue_unbound: ss.prototype.setValue
    }), Object.assign(cs.prototype, {
        isAnimationObjectGroup: !0,
        add: function() {
            for (var t = this._objects, e = t.length, i = this.nCachedObjects_, n = this._indicesByUUID, r = this._paths, a = this._parsedPaths, o = this._bindings, s = o.length, c = 0, h = arguments.length; c !== h; ++c) {
                var l = arguments[c], u = l.uuid, p = n[u], d = void 0;
                if (void 0 === p) {
                    p = e++, n[u] = p, t.push(l);
                    for (var f = 0, m = s; f !== m; ++f) o[f].push(new ss(l, r[f], a[f]));
                } else if (p < i) {
                    d = t[p];
                    var g = --i, v = t[g];
                    n[v.uuid] = p, t[p] = v, n[u] = g, t[g] = l;
                    for (f = 0, m = s; f !== m; ++f) {
                        var y = o[f], x = y[g], b = y[p];
                        y[p] = x, void 0 === b && (b = new ss(l, r[f], a[f])), y[g] = b;
                    }
                } else t[p] !== d && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.");
            }
            this.nCachedObjects_ = i;
        },
        remove: function() {
            for (var t = this._objects, e = this.nCachedObjects_, i = this._indicesByUUID, n = this._bindings, r = n.length, a = 0, o = arguments.length; a !== o; ++a) {
                var s = arguments[a], c = s.uuid, h = i[c];
                if (void 0 !== h && h >= e) {
                    var l = e++, u = t[l];
                    i[u.uuid] = h, t[h] = u, i[c] = l, t[l] = s;
                    for (var p = 0, d = r; p !== d; ++p) {
                        var f = n[p], m = f[l], g = f[h];
                        f[h] = m, f[l] = g;
                    }
                }
            }
            this.nCachedObjects_ = e;
        },
        uncache: function() {
            for (var t = this._objects, e = t.length, i = this.nCachedObjects_, n = this._indicesByUUID, r = this._bindings, a = r.length, o = 0, s = arguments.length; o !== s; ++o) {
                var c = arguments[o].uuid, h = n[c];
                if (void 0 !== h) if (delete n[c], h < i) {
                    var l = --i, u = t[l], p = t[v = --e];
                    n[u.uuid] = h, t[h] = u, n[p.uuid] = l, t[l] = p, t.pop();
                    for (var d = 0, f = a; d !== f; ++d) {
                        var m = (y = r[d])[l], g = y[v];
                        y[h] = m, y[l] = g, y.pop();
                    }
                } else {
                    var v;
                    n[(p = t[v = --e]).uuid] = h, t[h] = p, t.pop();
                    for (d = 0, f = a; d !== f; ++d) {
                        var y;
                        (y = r[d])[h] = y[v], y.pop();
                    }
                }
            }
            this.nCachedObjects_ = i;
        },
        subscribe_: function(t, e) {
            var i = this._bindingsIndicesByPath, n = i[t], r = this._bindings;
            if (void 0 !== n) return r[n];
            var a = this._paths, o = this._parsedPaths, s = this._objects, c = s.length, h = this.nCachedObjects_, l = new Array(c);
            n = r.length, i[t] = n, a.push(t), o.push(e), r.push(l);
            for (var u = h, p = s.length; u !== p; ++u) {
                var d = s[u];
                l[u] = new ss(d, t, e);
            }
            return l;
        },
        unsubscribe_: function(t) {
            var e = this._bindingsIndicesByPath, i = e[t];
            if (void 0 !== i) {
                var n = this._paths, r = this._parsedPaths, a = this._bindings, o = a.length - 1, s = a[o];
                e[t[o]] = i, a[i] = s, a.pop(), r[i] = r[o], r.pop(), n[i] = n[o], n.pop();
            }
        }
    }), Object.assign(hs.prototype, {
        play: function() {
            return this._mixer._activateAction(this), this;
        },
        stop: function() {
            return this._mixer._deactivateAction(this), this.reset();
        },
        reset: function() {
            return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, 
            this._startTime = null, this.stopFading().stopWarping();
        },
        isRunning: function() {
            return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
        },
        isScheduled: function() {
            return this._mixer._isActiveAction(this);
        },
        startAt: function(t) {
            return this._startTime = t, this;
        },
        setLoop: function(t, e) {
            return this.loop = t, this.repetitions = e, this;
        },
        setEffectiveWeight: function(t) {
            return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading();
        },
        getEffectiveWeight: function() {
            return this._effectiveWeight;
        },
        fadeIn: function(t) {
            return this._scheduleFading(t, 0, 1);
        },
        fadeOut: function(t) {
            return this._scheduleFading(t, 1, 0);
        },
        crossFadeFrom: function(t, e, i) {
            if (t.fadeOut(e), this.fadeIn(e), i) {
                var n = this._clip.duration, r = t._clip.duration, a = r / n, o = n / r;
                t.warp(1, a, e), this.warp(o, 1, e);
            }
            return this;
        },
        crossFadeTo: function(t, e, i) {
            return t.crossFadeFrom(this, e, i);
        },
        stopFading: function() {
            var t = this._weightInterpolant;
            return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), 
            this;
        },
        setEffectiveTimeScale: function(t) {
            return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping();
        },
        getEffectiveTimeScale: function() {
            return this._effectiveTimeScale;
        },
        setDuration: function(t) {
            return this.timeScale = this._clip.duration / t, this.stopWarping();
        },
        syncWith: function(t) {
            return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping();
        },
        halt: function(t) {
            return this.warp(this._effectiveTimeScale, 0, t);
        },
        warp: function(t, e, i) {
            var n = this._mixer, r = n.time, a = this._timeScaleInterpolant, o = this.timeScale;
            null === a && (a = n._lendControlInterpolant(), this._timeScaleInterpolant = a);
            var s = a.parameterPositions, c = a.sampleValues;
            return s[0] = r, s[1] = r + i, c[0] = t / o, c[1] = e / o, this;
        },
        stopWarping: function() {
            var t = this._timeScaleInterpolant;
            return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), 
            this;
        },
        getMixer: function() {
            return this._mixer;
        },
        getClip: function() {
            return this._clip;
        },
        getRoot: function() {
            return this._localRoot || this._mixer._root;
        },
        _update: function(t, e, i, n) {
            if (this.enabled) {
                var r = this._startTime;
                if (null !== r) {
                    var a = (t - r) * i;
                    if (a < 0 || 0 === i) return;
                    this._startTime = null, e = i * a;
                }
                e *= this._updateTimeScale(t);
                var o = this._updateTime(e), s = this._updateWeight(t);
                if (s > 0) for (var c = this._interpolants, h = this._propertyBindings, l = 0, u = c.length; l !== u; ++l) c[l].evaluate(o), 
                h[l].accumulate(n, s);
            } else this._updateWeight(t);
        },
        _updateWeight: function(t) {
            var e = 0;
            if (this.enabled) {
                e = this.weight;
                var i = this._weightInterpolant;
                if (null !== i) {
                    var n = i.evaluate(t)[0];
                    e *= n, t > i.parameterPositions[1] && (this.stopFading(), 0 === n && (this.enabled = !1));
                }
            }
            return this._effectiveWeight = e, e;
        },
        _updateTimeScale: function(t) {
            var e = 0;
            if (!this.paused) {
                e = this.timeScale;
                var i = this._timeScaleInterpolant;
                if (null !== i) e *= i.evaluate(t)[0], t > i.parameterPositions[1] && (this.stopWarping(), 
                0 === e ? this.paused = !0 : this.timeScale = e);
            }
            return this._effectiveTimeScale = e, e;
        },
        _updateTime: function(t) {
            var e = this.time + t;
            if (0 === t) return e;
            var i = this._clip.duration, n = this.loop, r = this._loopCount;
            if (2200 === n) {
                -1 === r && (this._loopCount = 0, this._setEndings(!0, !0, !1));
                t: {
                    if (e >= i) e = i; else {
                        if (!(e < 0)) break t;
                        e = 0;
                    }
                    this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: t < 0 ? -1 : 1
                    });
                }
            } else {
                var a = 2202 === n;
                if (-1 === r && (t >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), 
                e >= i || e < 0) {
                    var o = Math.floor(e / i);
                    e -= i * o, r += Math.abs(o);
                    var s = this.repetitions - r;
                    if (s < 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, e = t > 0 ? i : 0, 
                    this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: t > 0 ? 1 : -1
                    }); else {
                        if (0 === s) {
                            var c = t < 0;
                            this._setEndings(c, !c, a);
                        } else this._setEndings(!1, !1, a);
                        this._loopCount = r, this._mixer.dispatchEvent({
                            type: "loop",
                            action: this,
                            loopDelta: o
                        });
                    }
                }
                if (a && 1 == (1 & r)) return this.time = e, i - e;
            }
            return this.time = e, e;
        },
        _setEndings: function(t, e, i) {
            var n = this._interpolantSettings;
            i ? (n.endingStart = 2401, n.endingEnd = 2401) : (n.endingStart = t ? this.zeroSlopeAtStart ? 2401 : re : 2402, 
            n.endingEnd = e ? this.zeroSlopeAtEnd ? 2401 : re : 2402);
        },
        _scheduleFading: function(t, e, i) {
            var n = this._mixer, r = n.time, a = this._weightInterpolant;
            null === a && (a = n._lendControlInterpolant(), this._weightInterpolant = a);
            var o = a.parameterPositions, s = a.sampleValues;
            return o[0] = r, s[0] = e, o[1] = r + t, s[1] = i, this;
        }
    }), Object.assign(ls.prototype, e.prototype, {
        _bindAction: function(t, e) {
            var i = t._localRoot || this._root, n = t._clip.tracks, r = n.length, a = t._propertyBindings, o = t._interpolants, s = i.uuid, c = this._bindingsByRootAndName, h = c[s];
            void 0 === h && (h = {}, c[s] = h);
            for (var l = 0; l !== r; ++l) {
                var u = n[l], p = u.name, d = h[p];
                if (void 0 !== d) a[l] = d; else {
                    if (void 0 !== (d = a[l])) {
                        null === d._cacheIndex && (++d.referenceCount, this._addInactiveBinding(d, s, p));
                        continue;
                    }
                    var f = e && e._propertyBindings[l].binding.parsedPath;
                    ++(d = new as(ss.create(i, p, f), u.ValueTypeName, u.getValueSize())).referenceCount, 
                    this._addInactiveBinding(d, s, p), a[l] = d;
                }
                o[l].resultBuffer = d.buffer;
            }
        },
        _activateAction: function(t) {
            if (!this._isActiveAction(t)) {
                if (null === t._cacheIndex) {
                    var e = (t._localRoot || this._root).uuid, i = t._clip.uuid, n = this._actionsByClip[i];
                    this._bindAction(t, n && n.knownActions[0]), this._addInactiveAction(t, i, e);
                }
                for (var r = t._propertyBindings, a = 0, o = r.length; a !== o; ++a) {
                    var s = r[a];
                    0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState());
                }
                this._lendAction(t);
            }
        },
        _deactivateAction: function(t) {
            if (this._isActiveAction(t)) {
                for (var e = t._propertyBindings, i = 0, n = e.length; i !== n; ++i) {
                    var r = e[i];
                    0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r));
                }
                this._takeBackAction(t);
            }
        },
        _initMemoryManager: function() {
            this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], 
            this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], 
            this._nActiveControlInterpolants = 0;
            var t = this;
            this.stats = {
                actions: {
                    get total() {
                        return t._actions.length;
                    },
                    get inUse() {
                        return t._nActiveActions;
                    }
                },
                bindings: {
                    get total() {
                        return t._bindings.length;
                    },
                    get inUse() {
                        return t._nActiveBindings;
                    }
                },
                controlInterpolants: {
                    get total() {
                        return t._controlInterpolants.length;
                    },
                    get inUse() {
                        return t._nActiveControlInterpolants;
                    }
                }
            };
        },
        _isActiveAction: function(t) {
            var e = t._cacheIndex;
            return null !== e && e < this._nActiveActions;
        },
        _addInactiveAction: function(t, e, i) {
            var n = this._actions, r = this._actionsByClip, a = r[e];
            if (void 0 === a) a = {
                knownActions: [ t ],
                actionByRoot: {}
            }, t._byClipCacheIndex = 0, r[e] = a; else {
                var o = a.knownActions;
                t._byClipCacheIndex = o.length, o.push(t);
            }
            t._cacheIndex = n.length, n.push(t), a.actionByRoot[i] = t;
        },
        _removeInactiveAction: function(t) {
            var e = this._actions, i = e[e.length - 1], n = t._cacheIndex;
            i._cacheIndex = n, e[n] = i, e.pop(), t._cacheIndex = null;
            var r = t._clip.uuid, a = this._actionsByClip, o = a[r], s = o.knownActions, c = s[s.length - 1], h = t._byClipCacheIndex;
            c._byClipCacheIndex = h, s[h] = c, s.pop(), t._byClipCacheIndex = null, delete o.actionByRoot[(t._localRoot || this._root).uuid], 
            0 === s.length && delete a[r], this._removeInactiveBindingsForAction(t);
        },
        _removeInactiveBindingsForAction: function(t) {
            for (var e = t._propertyBindings, i = 0, n = e.length; i !== n; ++i) {
                var r = e[i];
                0 == --r.referenceCount && this._removeInactiveBinding(r);
            }
        },
        _lendAction: function(t) {
            var e = this._actions, i = t._cacheIndex, n = this._nActiveActions++, r = e[n];
            t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r;
        },
        _takeBackAction: function(t) {
            var e = this._actions, i = t._cacheIndex, n = --this._nActiveActions, r = e[n];
            t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r;
        },
        _addInactiveBinding: function(t, e, i) {
            var n = this._bindingsByRootAndName, r = n[e], a = this._bindings;
            void 0 === r && (r = {}, n[e] = r), r[i] = t, t._cacheIndex = a.length, a.push(t);
        },
        _removeInactiveBinding: function(t) {
            var e = this._bindings, i = t.binding, n = i.rootNode.uuid, r = i.path, a = this._bindingsByRootAndName, o = a[n], s = e[e.length - 1], c = t._cacheIndex;
            s._cacheIndex = c, e[c] = s, e.pop(), delete o[r];
            t: {
                for (var h in o) break t;
                delete a[n];
            }
        },
        _lendBinding: function(t) {
            var e = this._bindings, i = t._cacheIndex, n = this._nActiveBindings++, r = e[n];
            t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r;
        },
        _takeBackBinding: function(t) {
            var e = this._bindings, i = t._cacheIndex, n = --this._nActiveBindings, r = e[n];
            t._cacheIndex = n, e[n] = t, r._cacheIndex = i, e[i] = r;
        },
        _lendControlInterpolant: function() {
            var t = this._controlInterpolants, e = this._nActiveControlInterpolants++, i = t[e];
            return void 0 === i && ((i = new Xa(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer)).__cacheIndex = e, 
            t[e] = i), i;
        },
        _takeBackControlInterpolant: function(t) {
            var e = this._controlInterpolants, i = t.__cacheIndex, n = --this._nActiveControlInterpolants, r = e[n];
            t.__cacheIndex = n, e[n] = t, r.__cacheIndex = i, e[i] = r;
        },
        _controlInterpolantsResultBuffer: new Float32Array(1),
        clipAction: function(t, e) {
            var i = e || this._root, n = i.uuid, r = "string" == typeof t ? no.findByName(i, t) : t, a = null !== r ? r.uuid : t, o = this._actionsByClip[a], s = null;
            if (void 0 !== o) {
                var c = o.actionByRoot[n];
                if (void 0 !== c) return c;
                s = o.knownActions[0], null === r && (r = s._clip);
            }
            if (null === r) return null;
            var h = new hs(this, r, e);
            return this._bindAction(h, s), this._addInactiveAction(h, a, n), h;
        },
        existingAction: function(t, e) {
            var i = e || this._root, n = i.uuid, r = "string" == typeof t ? no.findByName(i, t) : t, a = r ? r.uuid : t, o = this._actionsByClip[a];
            return void 0 !== o && o.actionByRoot[n] || null;
        },
        stopAllAction: function() {
            var t = this._actions, e = this._nActiveActions, i = this._bindings, n = this._nActiveBindings;
            this._nActiveActions = 0, this._nActiveBindings = 0;
            for (var r = 0; r !== e; ++r) t[r].reset();
            for (r = 0; r !== n; ++r) i[r].useCount = 0;
            return this;
        },
        update: function(t) {
            t *= this.timeScale;
            for (var e = this._actions, i = this._nActiveActions, n = this.time += t, r = Math.sign(t), a = this._accuIndex ^= 1, o = 0; o !== i; ++o) {
                e[o]._update(n, t, r, a);
            }
            var s = this._bindings, c = this._nActiveBindings;
            for (o = 0; o !== c; ++o) s[o].apply(a);
            return this;
        },
        getRoot: function() {
            return this._root;
        },
        uncacheClip: function(t) {
            var e = this._actions, i = t.uuid, n = this._actionsByClip, r = n[i];
            if (void 0 !== r) {
                for (var a = r.knownActions, o = 0, s = a.length; o !== s; ++o) {
                    var c = a[o];
                    this._deactivateAction(c);
                    var h = c._cacheIndex, l = e[e.length - 1];
                    c._cacheIndex = null, c._byClipCacheIndex = null, l._cacheIndex = h, e[h] = l, e.pop(), 
                    this._removeInactiveBindingsForAction(c);
                }
                delete n[i];
            }
        },
        uncacheRoot: function(t) {
            var e = t.uuid, i = this._actionsByClip;
            for (var n in i) {
                var r = i[n].actionByRoot[e];
                void 0 !== r && (this._deactivateAction(r), this._removeInactiveAction(r));
            }
            var a = this._bindingsByRootAndName[e];
            if (void 0 !== a) for (var o in a) {
                var s = a[o];
                s.restoreOriginalState(), this._removeInactiveBinding(s);
            }
        },
        uncacheAction: function(t, e) {
            var i = this.existingAction(t, e);
            null !== i && (this._deactivateAction(i), this._removeInactiveAction(i));
        }
    }), us.prototype.clone = function() {
        return new us(void 0 === this.value.clone ? this.value : this.value.clone());
    }, ps.prototype = Object.assign(Object.create(Mn.prototype), {
        constructor: ps,
        isInstancedBufferGeometry: !0,
        copy: function(t) {
            return Mn.prototype.copy.call(this, t), this.maxInstancedCount = t.maxInstancedCount, 
            this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        }
    }), Object.defineProperties(ds.prototype, {
        count: {
            get: function() {
                return this.data.count;
            }
        },
        array: {
            get: function() {
                return this.data.array;
            }
        }
    }), Object.assign(ds.prototype, {
        isInterleavedBufferAttribute: !0,
        setX: function(t, e) {
            return this.data.array[t * this.data.stride + this.offset] = e, this;
        },
        setY: function(t, e) {
            return this.data.array[t * this.data.stride + this.offset + 1] = e, this;
        },
        setZ: function(t, e) {
            return this.data.array[t * this.data.stride + this.offset + 2] = e, this;
        },
        setW: function(t, e) {
            return this.data.array[t * this.data.stride + this.offset + 3] = e, this;
        },
        getX: function(t) {
            return this.data.array[t * this.data.stride + this.offset];
        },
        getY: function(t) {
            return this.data.array[t * this.data.stride + this.offset + 1];
        },
        getZ: function(t) {
            return this.data.array[t * this.data.stride + this.offset + 2];
        },
        getW: function(t) {
            return this.data.array[t * this.data.stride + this.offset + 3];
        },
        setXY: function(t, e, i) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, 
            this;
        },
        setXYZ: function(t, e, i, n) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, 
            this.data.array[t + 2] = n, this;
        },
        setXYZW: function(t, e, i, n, r) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = i, 
            this.data.array[t + 2] = n, this.data.array[t + 3] = r, this;
        }
    }), Object.defineProperty(fs.prototype, "needsUpdate", {
        set: function(t) {
            !0 === t && this.version++;
        }
    }), Object.assign(fs.prototype, {
        isInterleavedBuffer: !0,
        setArray: function(t) {
            if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== t ? t.length / this.stride : 0, this.array = t;
        },
        setDynamic: function(t) {
            return this.dynamic = t, this;
        },
        copy: function(t) {
            return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, 
            this.dynamic = t.dynamic, this;
        },
        copyAt: function(t, e, i) {
            t *= this.stride, i *= e.stride;
            for (var n = 0, r = this.stride; n < r; n++) this.array[t + n] = e.array[i + n];
            return this;
        },
        set: function(t, e) {
            return void 0 === e && (e = 0), this.array.set(t, e), this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        onUpload: function(t) {
            return this.onUploadCallback = t, this;
        }
    }), ms.prototype = Object.assign(Object.create(fs.prototype), {
        constructor: ms,
        isInstancedInterleavedBuffer: !0,
        copy: function(t) {
            return fs.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, 
            this;
        }
    }), gs.prototype = Object.assign(Object.create(nn.prototype), {
        constructor: gs,
        isInstancedBufferAttribute: !0,
        copy: function(t) {
            return nn.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, 
            this;
        }
    }), Object.assign(vs.prototype, {
        linePrecision: 1,
        set: function(t, e) {
            this.ray.set(t, e);
        },
        setFromCamera: function(t, e) {
            e && e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), 
            this.ray.direction.set(t.x, t.y, .5).unproject(e).sub(this.ray.origin).normalize()) : e && e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), 
            this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.");
        },
        intersectObject: function(t, e) {
            var i = [];
            return xs(t, this, i, e), i.sort(ys), i;
        },
        intersectObjects: function(t, e) {
            var i = [];
            if (!1 === Array.isArray(t)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), 
            i;
            for (var n = 0, r = t.length; n < r; n++) xs(t[n], this, i, e);
            return i.sort(ys), i;
        }
    }), Object.assign(bs.prototype, {
        start: function() {
            this.startTime = ("undefined" == typeof performance ? Date : performance).now(), 
            this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
        },
        stop: function() {
            this.getElapsedTime(), this.running = !1, this.autoStart = !1;
        },
        getElapsedTime: function() {
            return this.getDelta(), this.elapsedTime;
        },
        getDelta: function() {
            var t = 0;
            if (this.autoStart && !this.running) return this.start(), 0;
            if (this.running) {
                var e = ("undefined" == typeof performance ? Date : performance).now();
                t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
            }
            return t;
        }
    }), Object.assign(_s.prototype, {
        set: function(t, e, i) {
            return this.radius = t, this.phi = e, this.theta = i, this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
        },
        makeSafe: function() {
            return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
        },
        setFromVector3: function(t) {
            return this.radius = t.length(), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t.x, t.z), 
            this.phi = Math.acos(ve.clamp(t.y / this.radius, -1, 1))), this;
        }
    }), Object.assign(ws.prototype, {
        set: function(t, e, i) {
            return this.radius = t, this.theta = e, this.y = i, this;
        },
        clone: function() {
            return new this.constructor().copy(this);
        },
        copy: function(t) {
            return this.radius = t.radius, this.theta = t.theta, this.y = t.y, this;
        },
        setFromVector3: function(t) {
            return this.radius = Math.sqrt(t.x * t.x + t.z * t.z), this.theta = Math.atan2(t.x, t.z), 
            this.y = t.y, this;
        }
    }), Ms.prototype = Object.create(Zi.prototype), Ms.prototype.constructor = Ms, Ms.prototype.isImmediateRenderObject = !0, 
    Es.prototype = Object.create(yr.prototype), Es.prototype.constructor = Es, Es.prototype.update = function() {
        var t = new _e(), e = new _e(), i = new we();
        return function() {
            var n = [ "a", "b", "c" ];
            this.object.updateMatrixWorld(!0), i.getNormalMatrix(this.object.matrixWorld);
            var r = this.object.matrixWorld, a = this.geometry.attributes.position, o = this.object.geometry;
            if (o && o.isGeometry) for (var s = o.vertices, c = o.faces, h = 0, l = 0, u = c.length; l < u; l++) for (var p = c[l], d = 0, f = p.vertexNormals.length; d < f; d++) {
                var m = s[p[n[d]]], g = p.vertexNormals[d];
                t.copy(m).applyMatrix4(r), e.copy(g).applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), 
                a.setXYZ(h, t.x, t.y, t.z), h += 1, a.setXYZ(h, e.x, e.y, e.z), h += 1;
            } else if (o && o.isBufferGeometry) {
                var v = o.attributes.position, y = o.attributes.normal;
                for (h = 0, d = 0, f = v.count; d < f; d++) t.set(v.getX(d), v.getY(d), v.getZ(d)).applyMatrix4(r), 
                e.set(y.getX(d), y.getY(d), y.getZ(d)), e.applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), 
                a.setXYZ(h, t.x, t.y, t.z), h += 1, a.setXYZ(h, e.x, e.y, e.z), h += 1;
            }
            a.needsUpdate = !0;
        };
    }(), Ts.prototype = Object.create(Zi.prototype), Ts.prototype.constructor = Ts, 
    Ts.prototype.dispose = function() {
        this.cone.geometry.dispose(), this.cone.material.dispose();
    }, Ts.prototype.update = function() {
        var t = new _e(), e = new _e();
        return function() {
            this.light.updateMatrixWorld();
            var i = this.light.distance ? this.light.distance : 1e3, n = i * Math.tan(this.light.angle);
            this.cone.scale.set(n, n, i), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), 
            this.cone.lookAt(e.sub(t)), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color);
        };
    }(), Ss.prototype = Object.create(yr.prototype), Ss.prototype.constructor = Ss, 
    Ss.prototype.updateMatrixWorld = function() {
        var t = new _e(), e = new xe(), i = new xe();
        return function(n) {
            var r = this.bones, a = this.geometry, o = a.getAttribute("position");
            i.getInverse(this.root.matrixWorld);
            for (var s = 0, c = 0; s < r.length; s++) {
                var h = r[s];
                h.parent && h.parent.isBone && (e.multiplyMatrices(i, h.matrixWorld), t.setFromMatrixPosition(e), 
                o.setXYZ(c, t.x, t.y, t.z), e.multiplyMatrices(i, h.parent.matrixWorld), t.setFromMatrixPosition(e), 
                o.setXYZ(c + 1, t.x, t.y, t.z), c += 2);
            }
            a.getAttribute("position").needsUpdate = !0, Zi.prototype.updateMatrixWorld.call(this, n);
        };
    }(), As.prototype = Object.create(Un.prototype), As.prototype.constructor = As, 
    As.prototype.dispose = function() {
        this.geometry.dispose(), this.material.dispose();
    }, As.prototype.update = function() {
        void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color);
    }, Rs.prototype = Object.create(Zi.prototype), Rs.prototype.constructor = Rs, Rs.prototype.dispose = function() {
        this.children[0].geometry.dispose(), this.children[0].material.dispose();
    }, Rs.prototype.update = function() {
        var t = .5 * this.light.width, e = .5 * this.light.height, i = this.line.geometry.attributes.position, n = i.array;
        n[0] = t, n[1] = -e, n[2] = 0, n[3] = t, n[4] = e, n[5] = 0, n[6] = -t, n[7] = e, 
        n[8] = 0, n[9] = -t, n[10] = -e, n[11] = 0, n[12] = t, n[13] = -e, n[14] = 0, i.needsUpdate = !0, 
        void 0 !== this.color ? this.line.material.color.set(this.color) : this.line.material.color.copy(this.light.color);
    }, Ls.prototype = Object.create(Zi.prototype), Ls.prototype.constructor = Ls, Ls.prototype.dispose = function() {
        this.children[0].geometry.dispose(), this.children[0].material.dispose();
    }, Ls.prototype.update = function() {
        var t = new _e(), e = new gi(), i = new gi();
        return function() {
            var n = this.children[0];
            if (void 0 !== this.color) this.material.color.set(this.color); else {
                var r = n.geometry.getAttribute("color");
                e.copy(this.light.color), i.copy(this.light.groundColor);
                for (var a = 0, o = r.count; a < o; a++) {
                    var s = a < o / 2 ? e : i;
                    r.setXYZ(a, s.r, s.g, s.b);
                }
                r.needsUpdate = !0;
            }
            n.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate());
        };
    }(), Ps.prototype = Object.create(yr.prototype), Ps.prototype.constructor = Ps, 
    Cs.prototype = Object.create(yr.prototype), Cs.prototype.constructor = Cs, Is.prototype = Object.create(yr.prototype), 
    Is.prototype.constructor = Is, Is.prototype.update = function() {
        var t = new _e(), e = new _e(), i = new we();
        return function() {
            this.object.updateMatrixWorld(!0), i.getNormalMatrix(this.object.matrixWorld);
            for (var n = this.object.matrixWorld, r = this.geometry.attributes.position, a = this.object.geometry, o = a.vertices, s = a.faces, c = 0, h = 0, l = s.length; h < l; h++) {
                var u = s[h], p = u.normal;
                t.copy(o[u.a]).add(o[u.b]).add(o[u.c]).divideScalar(3).applyMatrix4(n), e.copy(p).applyMatrix3(i).normalize().multiplyScalar(this.size).add(t), 
                r.setXYZ(c, t.x, t.y, t.z), c += 1, r.setXYZ(c, e.x, e.y, e.z), c += 1;
            }
            r.needsUpdate = !0;
        };
    }(), Us.prototype = Object.create(Zi.prototype), Us.prototype.constructor = Us, 
    Us.prototype.dispose = function() {
        this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), 
        this.targetLine.material.dispose();
    }, Us.prototype.update = function() {
        var t = new _e(), e = new _e(), i = new _e();
        return function() {
            t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), 
            i.subVectors(e, t), this.lightPlane.lookAt(i), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), 
            this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), 
            this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(i), 
            this.targetLine.scale.z = i.length();
        };
    }(), Ds.prototype = Object.create(yr.prototype), Ds.prototype.constructor = Ds, 
    Ds.prototype.update = function() {
        var t, e, i = new _e(), n = new Ji();
        function r(r, a, o, s) {
            i.set(a, o, s).unproject(n);
            var c = e[r];
            if (void 0 !== c) for (var h = t.getAttribute("position"), l = 0, u = c.length; l < u; l++) h.setXYZ(c[l], i.x, i.y, i.z);
        }
        return function() {
            t = this.geometry, e = this.pointMap;
            n.projectionMatrix.copy(this.camera.projectionMatrix), r("c", 0, 0, -1), r("t", 0, 0, 1), 
            r("n1", -1, -1, -1), r("n2", 1, -1, -1), r("n3", -1, 1, -1), r("n4", 1, 1, -1), 
            r("f1", -1, -1, 1), r("f2", 1, -1, 1), r("f3", -1, 1, 1), r("f4", 1, 1, 1), r("u1", .7, 1.1, -1), 
            r("u2", -.7, 1.1, -1), r("u3", 0, 2, -1), r("cf1", -1, 0, 1), r("cf2", 1, 0, 1), 
            r("cf3", 0, -1, 1), r("cf4", 0, 1, 1), r("cn1", -1, 0, -1), r("cn2", 1, 0, -1), 
            r("cn3", 0, -1, -1), r("cn4", 0, 1, -1), t.getAttribute("position").needsUpdate = !0;
        };
    }(), Os.prototype = Object.create(yr.prototype), Os.prototype.constructor = Os, 
    Os.prototype.update = function() {
        var t = new Ni();
        return function(e) {
            if (void 0 !== e && console.warn("THREE.BoxHelper: .update() has no longer arguments."), 
            void 0 !== this.object && t.setFromObject(this.object), !t.isEmpty()) {
                var i = t.min, n = t.max, r = this.geometry.attributes.position, a = r.array;
                a[0] = n.x, a[1] = n.y, a[2] = n.z, a[3] = i.x, a[4] = n.y, a[5] = n.z, a[6] = i.x, 
                a[7] = i.y, a[8] = n.z, a[9] = n.x, a[10] = i.y, a[11] = n.z, a[12] = n.x, a[13] = n.y, 
                a[14] = i.z, a[15] = i.x, a[16] = n.y, a[17] = i.z, a[18] = i.x, a[19] = i.y, a[20] = i.z, 
                a[21] = n.x, a[22] = i.y, a[23] = i.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere();
            }
        };
    }(), Os.prototype.setFromObject = function(t) {
        return this.object = t, this.update(), this;
    }, Ns.prototype = Object.create(yr.prototype), Ns.prototype.constructor = Ns, Ns.prototype.updateMatrixWorld = function(t) {
        var e = this.box;
        e.isEmpty() || (e.getCenter(this.position), e.getSize(this.scale), this.scale.multiplyScalar(.5), 
        Zi.prototype.updateMatrixWorld.call(this, t));
    }, Fs.prototype = Object.create(vr.prototype), Fs.prototype.constructor = Fs, Fs.prototype.updateMatrixWorld = function(t) {
        var e = -this.plane.constant;
        Math.abs(e) < 1e-8 && (e = 1e-8), this.scale.set(.5 * this.size, .5 * this.size, e), 
        this.lookAt(this.plane.normal), Zi.prototype.updateMatrixWorld.call(this, t);
    }, Bs.prototype = Object.create(Zi.prototype), Bs.prototype.constructor = Bs, Bs.prototype.setDirection = (Jo = new _e(), 
    function(t) {
        t.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : t.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (Jo.set(t.z, 0, -t.x).normalize(), 
        Zo = Math.acos(t.y), this.quaternion.setFromAxisAngle(Jo, Zo));
    }), Bs.prototype.setLength = function(t, e, i) {
        void 0 === e && (e = .2 * t), void 0 === i && (i = .2 * e), this.line.scale.set(1, Math.max(0, t - e), 1), 
        this.line.updateMatrix(), this.cone.scale.set(i, e, i), this.cone.position.y = t, 
        this.cone.updateMatrix();
    }, Bs.prototype.setColor = function(t) {
        this.line.material.color.copy(t), this.cone.material.color.copy(t);
    }, zs.prototype = Object.create(yr.prototype), zs.prototype.constructor = zs;
    var Hs = new _e(), Vs = new Gs(), ks = new Gs(), js = new Gs();
    function Ws(t) {
        _o.call(this), t.length < 2 && console.warn("THREE.CatmullRomCurve3: Points array needs at least two entries."), 
        this.points = t || [], this.closed = !1;
    }
    function Xs(t, e, i, n) {
        _o.call(this), this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = n;
    }
    function qs(t, e, i) {
        _o.call(this), this.v0 = t, this.v1 = e, this.v2 = i;
    }
    function Ys(t, e) {
        _o.call(this), this.v1 = t, this.v2 = e;
    }
    function Zs(t, e, i, n, r, a) {
        Eo.call(this, t, e, i, i, n, r, a);
    }
    Ws.prototype = Object.create(_o.prototype), Ws.prototype.constructor = Ws, Ws.prototype.isCatmullRomCurve3 = !0, 
    Ws.prototype.getPoint = function(t, e) {
        var i, n, r, a, o = e || new _e(), s = this.points, c = s.length, h = (c - (this.closed ? 0 : 1)) * t, l = Math.floor(h), u = h - l;
        if (this.closed ? l += l > 0 ? 0 : (Math.floor(Math.abs(l) / s.length) + 1) * s.length : 0 === u && l === c - 1 && (l = c - 2, 
        u = 1), this.closed || l > 0 ? i = s[(l - 1) % c] : (Hs.subVectors(s[0], s[1]).add(s[0]), 
        i = Hs), n = s[l % c], r = s[(l + 1) % c], this.closed || l + 2 < c ? a = s[(l + 2) % c] : (Hs.subVectors(s[c - 1], s[c - 2]).add(s[c - 1]), 
        a = Hs), void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
            var p = "chordal" === this.type ? .5 : .25, d = Math.pow(i.distanceToSquared(n), p), f = Math.pow(n.distanceToSquared(r), p), m = Math.pow(r.distanceToSquared(a), p);
            f < 1e-4 && (f = 1), d < 1e-4 && (d = f), m < 1e-4 && (m = f), Vs.initNonuniformCatmullRom(i.x, n.x, r.x, a.x, d, f, m), 
            ks.initNonuniformCatmullRom(i.y, n.y, r.y, a.y, d, f, m), js.initNonuniformCatmullRom(i.z, n.z, r.z, a.z, d, f, m);
        } else if ("catmullrom" === this.type) {
            var g = void 0 !== this.tension ? this.tension : .5;
            Vs.initCatmullRom(i.x, n.x, r.x, a.x, g), ks.initCatmullRom(i.y, n.y, r.y, a.y, g), 
            js.initCatmullRom(i.z, n.z, r.z, a.z, g);
        }
        return o.set(Vs.calc(u), ks.calc(u), js.calc(u)), o;
    }, Xs.prototype = Object.create(_o.prototype), Xs.prototype.constructor = Xs, Xs.prototype.isCubicBezierCurve3 = !0, 
    Xs.prototype.getPoint = function(t, e) {
        var i = e || new _e(), n = this.v0, r = this.v1, a = this.v2, o = this.v3;
        return i.set(bo(t, n.x, r.x, a.x, o.x), bo(t, n.y, r.y, a.y, o.y), bo(t, n.z, r.z, a.z, o.z)), 
        i;
    }, qs.prototype = Object.create(_o.prototype), qs.prototype.constructor = qs, qs.prototype.isQuadraticBezierCurve3 = !0, 
    qs.prototype.getPoint = function(t, e) {
        var i = e || new _e(), n = this.v0, r = this.v1, a = this.v2;
        return i.set(xo(t, n.x, r.x, a.x), xo(t, n.y, r.y, a.y), xo(t, n.z, r.z, a.z)), 
        i;
    }, Ys.prototype = Object.create(_o.prototype), Ys.prototype.constructor = Ys, Ys.prototype.isLineCurve3 = !0, 
    Ys.prototype.getPoint = function(t, e) {
        var i = e || new _e();
        return 1 === t ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), 
        i;
    }, Ys.prototype.getPointAt = function(t, e) {
        return this.getPoint(t, e);
    }, Zs.prototype = Object.create(Eo.prototype), Zs.prototype.constructor = Zs, Zs.prototype.isArcCurve = !0;
    var Js = {
        createMultiMaterialObject: function(t, e) {
            for (var i = new wr(), n = 0, r = e.length; n < r; n++) i.add(new Un(t, e[n]));
            return i;
        },
        detach: function(t, e, i) {
            t.applyMatrix(e.matrixWorld), e.remove(t), i.add(t);
        },
        attach: function(t, e, i) {
            t.applyMatrix(new xe().getInverse(i.matrixWorld)), e.remove(t), i.add(t);
        }
    };
    function Qs(t) {
        console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), 
        Ws.call(this, t), this.type = "catmullrom", this.closed = !0;
    }
    function Ks(t) {
        console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), 
        Ws.call(this, t), this.type = "catmullrom";
    }
    function $s(t) {
        console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."), 
        Ws.call(this, t), this.type = "catmullrom";
    }
    _o.create = function(t, e) {
        return console.log("THREE.Curve.create() has been deprecated"), t.prototype = Object.create(_o.prototype), 
        t.prototype.constructor = t, t.prototype.getPoint = e, t;
    }, Object.assign(Mo.prototype, {
        createPointsGeometry: function(t) {
            console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            var e = this.getPoints(t);
            return this.createGeometry(e);
        },
        createSpacedPointsGeometry: function(t) {
            console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            var e = this.getSpacedPoints(t);
            return this.createGeometry(e);
        },
        createGeometry: function(t) {
            console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            for (var e = new en(), i = 0, n = t.length; i < n; i++) {
                var r = t[i];
                e.vertices.push(new _e(r.x, r.y, r.z || 0));
            }
            return e;
        }
    }), Qs.prototype = Object.create(Ws.prototype), Ks.prototype = Object.create(Ws.prototype), 
    $s.prototype = Object.create(Ws.prototype), Object.assign($s.prototype, {
        initFromArray: function() {
            console.error("THREE.Spline: .initFromArray() has been removed.");
        },
        getControlPointsArray: function() {
            console.error("THREE.Spline: .getControlPointsArray() has been removed.");
        },
        reparametrizeByArcLength: function() {
            console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.");
        }
    }), Ps.prototype.setColors = function() {
        console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.");
    }, Ss.prototype.update = function() {
        console.error("THREE.SkeletonHelper: update() no longer needs to be called.");
    }, Object.assign(_i.prototype, {
        center: function(t) {
            return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), 
            this.getCenter(t);
        },
        empty: function() {
            return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty();
        },
        isIntersectionBox: function(t) {
            return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), 
            this.intersectsBox(t);
        },
        size: function(t) {
            return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(t);
        }
    }), Object.assign(Ni.prototype, {
        center: function(t) {
            return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), 
            this.getCenter(t);
        },
        empty: function() {
            return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty();
        },
        isIntersectionBox: function(t) {
            return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), 
            this.intersectsBox(t);
        },
        isIntersectionSphere: function(t) {
            return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), 
            this.intersectsSphere(t);
        },
        size: function(t) {
            return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t);
        }
    }), Cn.prototype.center = function(t) {
        return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), 
        this.getCenter(t);
    }, Object.assign(ve, {
        random16: function() {
            return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."), 
            Math.random();
        },
        nearestPowerOfTwo: function(t) {
            return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."), 
            ve.floorPowerOfTwo(t);
        },
        nextPowerOfTwo: function(t) {
            return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."), 
            ve.ceilPowerOfTwo(t);
        }
    }), Object.assign(we.prototype, {
        flattenToArrayOffset: function(t, e) {
            return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), 
            this.toArray(t, e);
        },
        multiplyVector3: function(t) {
            return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), 
            t.applyMatrix3(this);
        },
        multiplyVector3Array: function() {
            console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.");
        },
        applyToBuffer: function(t) {
            return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), 
            this.applyToBufferAttribute(t);
        },
        applyToVector3Array: function() {
            console.error("THREE.Matrix3: .applyToVector3Array() has been removed.");
        }
    }), Object.assign(xe.prototype, {
        extractPosition: function(t) {
            return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), 
            this.copyPosition(t);
        },
        flattenToArrayOffset: function(t, e) {
            return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), 
            this.toArray(t, e);
        },
        getPosition: function() {
            var t;
            return function() {
                return void 0 === t && (t = new _e()), console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), 
                t.setFromMatrixColumn(this, 3);
            };
        }(),
        setRotationFromQuaternion: function(t) {
            return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), 
            this.makeRotationFromQuaternion(t);
        },
        multiplyToArray: function() {
            console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
        },
        multiplyVector3: function(t) {
            return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), 
            t.applyMatrix4(this);
        },
        multiplyVector4: function(t) {
            return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), 
            t.applyMatrix4(this);
        },
        multiplyVector3Array: function() {
            console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.");
        },
        rotateAxis: function(t) {
            console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), 
            t.transformDirection(this);
        },
        crossVector: function(t) {
            return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), 
            t.applyMatrix4(this);
        },
        translate: function() {
            console.error("THREE.Matrix4: .translate() has been removed.");
        },
        rotateX: function() {
            console.error("THREE.Matrix4: .rotateX() has been removed.");
        },
        rotateY: function() {
            console.error("THREE.Matrix4: .rotateY() has been removed.");
        },
        rotateZ: function() {
            console.error("THREE.Matrix4: .rotateZ() has been removed.");
        },
        rotateByAxis: function() {
            console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
        },
        applyToBuffer: function(t) {
            return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), 
            this.applyToBufferAttribute(t);
        },
        applyToVector3Array: function() {
            console.error("THREE.Matrix4: .applyToVector3Array() has been removed.");
        },
        makeFrustum: function(t, e, i, n, r, a) {
            return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), 
            this.makePerspective(t, e, n, i, r, a);
        }
    }), Bi.prototype.isIntersectionLine = function(t) {
        return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), 
        this.intersectsLine(t);
    }, be.prototype.multiplyVector3 = function(t) {
        return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), 
        t.applyQuaternion(this);
    }, Object.assign(Pn.prototype, {
        isIntersectionBox: function(t) {
            return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), 
            this.intersectsBox(t);
        },
        isIntersectionPlane: function(t) {
            return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), 
            this.intersectsPlane(t);
        },
        isIntersectionSphere: function(t) {
            return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), 
            this.intersectsSphere(t);
        }
    }), Object.assign(Co.prototype, {
        extrude: function(t) {
            return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), 
            new Xr(this, t);
        },
        makeGeometry: function(t) {
            return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), 
            new ia(this, t);
        }
    }), Object.assign(ye.prototype, {
        fromAttribute: function(t, e, i) {
            return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), 
            this.fromBufferAttribute(t, e, i);
        },
        distanceToManhattan: function(t) {
            return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), 
            this.manhattanDistanceTo(t);
        },
        lengthManhattan: function() {
            return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), 
            this.manhattanLength();
        }
    }), Object.assign(_e.prototype, {
        setEulerFromRotationMatrix: function() {
            console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.");
        },
        setEulerFromQuaternion: function() {
            console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.");
        },
        getPositionFromMatrix: function(t) {
            return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), 
            this.setFromMatrixPosition(t);
        },
        getScaleFromMatrix: function(t) {
            return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), 
            this.setFromMatrixScale(t);
        },
        getColumnFromMatrix: function(t, e) {
            return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), 
            this.setFromMatrixColumn(e, t);
        },
        applyProjection: function(t) {
            return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), 
            this.applyMatrix4(t);
        },
        fromAttribute: function(t, e, i) {
            return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), 
            this.fromBufferAttribute(t, e, i);
        },
        distanceToManhattan: function(t) {
            return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), 
            this.manhattanDistanceTo(t);
        },
        lengthManhattan: function() {
            return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), 
            this.manhattanLength();
        }
    }), Object.assign(Te.prototype, {
        fromAttribute: function(t, e, i) {
            return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), 
            this.fromBufferAttribute(t, e, i);
        },
        lengthManhattan: function() {
            return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), 
            this.manhattanLength();
        }
    }), en.prototype.computeTangents = function() {
        console.warn("THREE.Geometry: .computeTangents() has been removed.");
    }, Object.assign(Zi.prototype, {
        getChildByName: function(t) {
            return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), 
            this.getObjectByName(t);
        },
        renderDepth: function() {
            console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.");
        },
        translate: function(t, e) {
            return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), 
            this.translateOnAxis(e, t);
        }
    }), Object.defineProperties(Zi.prototype, {
        eulerOrder: {
            get: function() {
                return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order;
            },
            set: function(t) {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t;
            }
        },
        useQuaternion: {
            get: function() {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
            },
            set: function() {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
            }
        }
    }), Object.defineProperties(pr.prototype, {
        objects: {
            get: function() {
                return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels;
            }
        }
    }), Object.defineProperty(dr.prototype, "useVertexTexture", {
        get: function() {
            console.warn("THREE.Skeleton: useVertexTexture has been removed.");
        },
        set: function() {
            console.warn("THREE.Skeleton: useVertexTexture has been removed.");
        }
    }), Object.defineProperty(_o.prototype, "__arcLengthDivisions", {
        get: function() {
            return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), 
            this.arcLengthDivisions;
        },
        set: function(t) {
            console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), 
            this.arcLengthDivisions = t;
        }
    }), ir.prototype.setLens = function(t, e) {
        console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), 
        void 0 !== e && (this.filmGauge = e), this.setFocalLength(t);
    }, Object.defineProperties(Ia.prototype, {
        onlyShadow: {
            set: function() {
                console.warn("THREE.Light: .onlyShadow has been removed.");
            }
        },
        shadowCameraFov: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = t;
            }
        },
        shadowCameraLeft: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t;
            }
        },
        shadowCameraRight: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t;
            }
        },
        shadowCameraTop: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t;
            }
        },
        shadowCameraBottom: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), 
                this.shadow.camera.bottom = t;
            }
        },
        shadowCameraNear: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t;
            }
        },
        shadowCameraFar: {
            set: function(t) {
                console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t;
            }
        },
        shadowCameraVisible: {
            set: function() {
                console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.");
            }
        },
        shadowBias: {
            set: function(t) {
                console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t;
            }
        },
        shadowDarkness: {
            set: function() {
                console.warn("THREE.Light: .shadowDarkness has been removed.");
            }
        },
        shadowMapWidth: {
            set: function(t) {
                console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t;
            }
        },
        shadowMapHeight: {
            set: function(t) {
                console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t;
            }
        }
    }), Object.defineProperties(nn.prototype, {
        length: {
            get: function() {
                return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), 
                this.array.length;
            }
        }
    }), Object.assign(Mn.prototype, {
        addIndex: function(t) {
            console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), 
            this.setIndex(t);
        },
        addDrawCall: function(t, e, i) {
            void 0 !== i && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), 
            console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e);
        },
        clearDrawCalls: function() {
            console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), 
            this.clearGroups();
        },
        computeTangents: function() {
            console.warn("THREE.BufferGeometry: .computeTangents() has been removed.");
        },
        computeOffsets: function() {
            console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.");
        }
    }), Object.defineProperties(Mn.prototype, {
        drawcalls: {
            get: function() {
                return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), 
                this.groups;
            }
        },
        offsets: {
            get: function() {
                return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), 
                this.groups;
            }
        }
    }), Object.defineProperties(us.prototype, {
        dynamic: {
            set: function() {
                console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.");
            }
        },
        onUpdate: {
            value: function() {
                return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), 
                this;
            }
        }
    }), Object.defineProperties(Ui.prototype, {
        wrapAround: {
            get: function() {
                console.warn("THREE.Material: .wrapAround has been removed.");
            },
            set: function() {
                console.warn("THREE.Material: .wrapAround has been removed.");
            }
        },
        wrapRGB: {
            get: function() {
                return console.warn("THREE.Material: .wrapRGB has been removed."), new gi();
            }
        },
        shading: {
            get: function() {
                console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.");
            },
            set: function(t) {
                console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), 
                this.flatShading = 1 === t;
            }
        }
    }), Object.defineProperties(ga.prototype, {
        metal: {
            get: function() {
                return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), 
                !1;
            },
            set: function() {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead");
            }
        }
    }), Object.defineProperties(Ln.prototype, {
        derivatives: {
            get: function() {
                return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), 
                this.extensions.derivatives;
            },
            set: function(t) {
                console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), 
                this.extensions.derivatives = t;
            }
        }
    }), Object.assign(ar.prototype, {
        getCurrentRenderTarget: function() {
            return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), 
            this.getRenderTarget();
        },
        getMaxAnisotropy: function() {
            return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), 
            this.capabilities.getMaxAnisotropy();
        },
        getPrecision: function() {
            return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), 
            this.capabilities.precision;
        },
        resetGLState: function() {
            return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), 
            this.state.reset();
        },
        supportsFloatTextures: function() {
            return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), 
            this.extensions.get("OES_texture_float");
        },
        supportsHalfFloatTextures: function() {
            return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), 
            this.extensions.get("OES_texture_half_float");
        },
        supportsStandardDerivatives: function() {
            return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), 
            this.extensions.get("OES_standard_derivatives");
        },
        supportsCompressedTextureS3TC: function() {
            return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), 
            this.extensions.get("WEBGL_compressed_texture_s3tc");
        },
        supportsCompressedTexturePVRTC: function() {
            return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), 
            this.extensions.get("WEBGL_compressed_texture_pvrtc");
        },
        supportsBlendMinMax: function() {
            return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), 
            this.extensions.get("EXT_blend_minmax");
        },
        supportsVertexTextures: function() {
            return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), 
            this.capabilities.vertexTextures;
        },
        supportsInstancedArrays: function() {
            return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), 
            this.extensions.get("ANGLE_instanced_arrays");
        },
        enableScissorTest: function(t) {
            console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), 
            this.setScissorTest(t);
        },
        initMaterial: function() {
            console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
        },
        addPrePlugin: function() {
            console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
        },
        addPostPlugin: function() {
            console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
        },
        updateShadowMap: function() {
            console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.");
        }
    }), Object.defineProperties(ar.prototype, {
        shadowMapEnabled: {
            get: function() {
                return this.shadowMap.enabled;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), 
                this.shadowMap.enabled = t;
            }
        },
        shadowMapType: {
            get: function() {
                return this.shadowMap.type;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t;
            }
        },
        shadowMapCullFace: {
            get: function() {
                return this.shadowMap.cullFace;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace."), 
                this.shadowMap.cullFace = t;
            }
        }
    }), Object.defineProperties(Gi.prototype, {
        cullFace: {
            get: function() {
                return this.renderReverseSided ? y : v;
            },
            set: function(t) {
                var e = t !== v;
                console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to " + e + "."), 
                this.renderReverseSided = e;
            }
        }
    }), Object.defineProperties(Se.prototype, {
        wrapS: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t;
            }
        },
        wrapT: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t;
            }
        },
        magFilter: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), 
                this.texture.magFilter;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), 
                this.texture.magFilter = t;
            }
        },
        minFilter: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), 
                this.texture.minFilter;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), 
                this.texture.minFilter = t;
            }
        },
        anisotropy: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), 
                this.texture.anisotropy;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), 
                this.texture.anisotropy = t;
            }
        },
        offset: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), 
                this.texture.offset;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t;
            }
        },
        repeat: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), 
                this.texture.repeat;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t;
            }
        },
        format: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), 
                this.texture.format;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t;
            }
        },
        type: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t;
            }
        },
        generateMipmaps: {
            get: function() {
                return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), 
                this.texture.generateMipmaps;
            },
            set: function(t) {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), 
                this.texture.generateMipmaps = t;
            }
        }
    }), is.prototype.load = function(t) {
        console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
        var e = this;
        return new Ko().load(t, function(t) {
            e.setBuffer(t);
        }), this;
    }, rs.prototype.getData = function() {
        return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), 
        this.getFrequencyData();
    }, ts.prototype.updateCubeMap = function(t, e) {
        return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(t, e);
    };
    var tc = {
        merge: function(t, e, i) {
            var n;
            console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead."), 
            e.isMesh && (e.matrixAutoUpdate && e.updateMatrix(), n = e.matrix, e = e.geometry), 
            t.merge(e, n, i);
        },
        center: function(t) {
            return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), 
            t.center();
        }
    }, ec = {
        crossOrigin: void 0,
        loadTexture: function(t, e, i, n) {
            console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
            var r = new Ca();
            r.setCrossOrigin(this.crossOrigin);
            var a = r.load(t, i, void 0, n);
            return e && (a.mapping = e), a;
        },
        loadTextureCube: function(t, e, i, n) {
            console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
            var r = new Pa();
            r.setCrossOrigin(this.crossOrigin);
            var a = r.load(t, i, void 0, n);
            return e && (a.mapping = e), a;
        },
        loadCompressedTexture: function() {
            console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.");
        },
        loadCompressedTextureCube: function() {
            console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.");
        }
    };
    t.WebGLRenderTargetCube = Ae, t.WebGLRenderTarget = Se, t.WebGLRenderer = ar, t.ShaderLib = bi, 
    t.UniformsLib = vi, t.UniformsUtils = yi, t.ShaderChunk = xi, t.FogExp2 = or, t.Fog = sr, 
    t.Scene = cr, t.LensFlare = hr, t.Sprite = ur, t.LOD = pr, t.SkinnedMesh = mr, t.Skeleton = dr, 
    t.Bone = fr, t.Mesh = Un, t.LineSegments = yr, t.LineLoop = xr, t.Line = vr, t.Points = _r, 
    t.Group = wr, t.VideoTexture = Mr, t.DataTexture = Re, t.CompressedTexture = Er, 
    t.CubeTexture = Le, t.CanvasTexture = Mi, t.DepthTexture = Tr, t.Texture = Ee, t.CompressedTextureLoader = Aa, 
    t.DataTextureLoader = Ra, t.CubeTextureLoader = Pa, t.TextureLoader = Ca, t.ObjectLoader = fo, 
    t.MaterialLoader = ro, t.BufferGeometryLoader = ao, t.DefaultLoadingManager = Ea, 
    t.LoadingManager = Ma, t.JSONLoader = po, t.ImageLoader = La, t.FontLoader = Do, 
    t.FileLoader = Sa, t.Loader = uo, t.Cache = wa, t.AudioLoader = Ko, t.SpotLightShadow = Oa, 
    t.SpotLight = Na, t.PointLight = Fa, t.RectAreaLight = Ha, t.HemisphereLight = Ua, 
    t.DirectionalLightShadow = Ba, t.DirectionalLight = za, t.AmbientLight = Ga, t.LightShadow = Da, 
    t.Light = Ia, t.StereoCamera = $o, t.PerspectiveCamera = ir, t.OrthographicCamera = Qi, 
    t.CubeCamera = ts, t.ArrayCamera = nr, t.Camera = Ji, t.AudioListener = es, t.PositionalAudio = ns, 
    t.AudioContext = Qo, t.AudioAnalyser = rs, t.Audio = is, t.VectorKeyframeTrack = Za, 
    t.StringKeyframeTrack = $a, t.QuaternionKeyframeTrack = Qa, t.NumberKeyframeTrack = Ka, 
    t.ColorKeyframeTrack = eo, t.BooleanKeyframeTrack = to, t.PropertyMixer = as, t.PropertyBinding = ss, 
    t.KeyframeTrack = io, t.AnimationUtils = ka, t.AnimationObjectGroup = cs, t.AnimationMixer = ls, 
    t.AnimationClip = no, t.Uniform = us, t.InstancedBufferGeometry = ps, t.BufferGeometry = Mn, 
    t.Geometry = en, t.InterleavedBufferAttribute = ds, t.InstancedInterleavedBuffer = ms, 
    t.InterleavedBuffer = fs, t.InstancedBufferAttribute = gs, t.Face3 = Ki, t.Object3D = Zi, 
    t.Raycaster = vs, t.Layers = ki, t.EventDispatcher = e, t.Clock = bs, t.QuaternionLinearInterpolant = Ja, 
    t.LinearInterpolant = Xa, t.DiscreteInterpolant = qa, t.CubicInterpolant = Wa, t.Interpolant = ja, 
    t.Triangle = In, t.Math = ve, t.Spherical = _s, t.Cylindrical = ws, t.Plane = Bi, 
    t.Frustum = zi, t.Sphere = Fi, t.Ray = Pn, t.Matrix4 = xe, t.Matrix3 = we, t.Box3 = Ni, 
    t.Box2 = _i, t.Line3 = Cn, t.Euler = Vi, t.Vector4 = Te, t.Vector3 = _e, t.Vector2 = ye, 
    t.Quaternion = be, t.Color = gi, t.ImmediateRenderObject = Ms, t.VertexNormalsHelper = Es, 
    t.SpotLightHelper = Ts, t.SkeletonHelper = Ss, t.PointLightHelper = As, t.RectAreaLightHelper = Rs, 
    t.HemisphereLightHelper = Ls, t.GridHelper = Ps, t.PolarGridHelper = Cs, t.FaceNormalsHelper = Is, 
    t.DirectionalLightHelper = Us, t.CameraHelper = Ds, t.BoxHelper = Os, t.Box3Helper = Ns, 
    t.PlaneHelper = Fs, t.ArrowHelper = Bs, t.AxesHelper = zs, t.CatmullRomCurve3 = Ws, 
    t.CubicBezierCurve3 = Xs, t.QuadraticBezierCurve3 = qs, t.LineCurve3 = Ys, t.ArcCurve = Zs, 
    t.EllipseCurve = Eo, t.SplineCurve = To, t.CubicBezierCurve = So, t.QuadraticBezierCurve = Ao, 
    t.LineCurve = wo, t.Shape = Co, t.Path = Po, t.ShapePath = Io, t.Font = Uo, t.CurvePath = Mo, 
    t.Curve = _o, t.ShapeUtils = Wr, t.SceneUtils = Js, t.WebGLUtils = rr, t.WireframeGeometry = Sr, 
    t.ParametricGeometry = Ar, t.ParametricBufferGeometry = Rr, t.TetrahedronGeometry = Cr, 
    t.TetrahedronBufferGeometry = Ir, t.OctahedronGeometry = Ur, t.OctahedronBufferGeometry = Dr, 
    t.IcosahedronGeometry = Or, t.IcosahedronBufferGeometry = Nr, t.DodecahedronGeometry = Fr, 
    t.DodecahedronBufferGeometry = Br, t.PolyhedronGeometry = Lr, t.PolyhedronBufferGeometry = Pr, 
    t.TubeGeometry = zr, t.TubeBufferGeometry = Gr, t.TorusKnotGeometry = Hr, t.TorusKnotBufferGeometry = Vr, 
    t.TorusGeometry = kr, t.TorusBufferGeometry = jr, t.TextGeometry = Yr, t.TextBufferGeometry = Zr, 
    t.SphereGeometry = Jr, t.SphereBufferGeometry = Qr, t.RingGeometry = Kr, t.RingBufferGeometry = $r, 
    t.PlaneGeometry = Sn, t.PlaneBufferGeometry = An, t.LatheGeometry = ta, t.LatheBufferGeometry = ea, 
    t.ShapeGeometry = ia, t.ShapeBufferGeometry = na, t.ExtrudeGeometry = Xr, t.ExtrudeBufferGeometry = qr, 
    t.EdgesGeometry = ra, t.ConeGeometry = sa, t.ConeBufferGeometry = ca, t.CylinderGeometry = aa, 
    t.CylinderBufferGeometry = oa, t.CircleGeometry = ha, t.CircleBufferGeometry = la, 
    t.BoxGeometry = En, t.BoxBufferGeometry = Tn, t.ShadowMaterial = pa, t.SpriteMaterial = lr, 
    t.RawShaderMaterial = da, t.ShaderMaterial = Ln, t.PointsMaterial = br, t.MeshPhysicalMaterial = ma, 
    t.MeshStandardMaterial = fa, t.MeshPhongMaterial = ga, t.MeshToonMaterial = va, 
    t.MeshNormalMaterial = ya, t.MeshLambertMaterial = xa, t.MeshDepthMaterial = Di, 
    t.MeshDistanceMaterial = Oi, t.MeshBasicMaterial = Rn, t.LineDashedMaterial = ba, 
    t.LineBasicMaterial = gr, t.Material = Ui, t.Float64BufferAttribute = pn, t.Float32BufferAttribute = un, 
    t.Uint32BufferAttribute = ln, t.Int32BufferAttribute = hn, t.Uint16BufferAttribute = cn, 
    t.Int16BufferAttribute = sn, t.Uint8ClampedBufferAttribute = on, t.Uint8BufferAttribute = an, 
    t.Int8BufferAttribute = rn, t.BufferAttribute = nn, t.REVISION = m, t.MOUSE = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    }, t.CullFaceNone = g, t.CullFaceBack = v, t.CullFaceFront = y, t.CullFaceFrontBack = 3, 
    t.FrontFaceDirectionCW = x, t.FrontFaceDirectionCCW = 1, t.BasicShadowMap = 0, t.PCFShadowMap = b, 
    t.PCFSoftShadowMap = _, t.FrontSide = w, t.BackSide = M, t.DoubleSide = E, t.FlatShading = 1, 
    t.SmoothShading = 2, t.NoColors = T, t.FaceColors = S, t.VertexColors = A, t.NoBlending = R, 
    t.NormalBlending = L, t.AdditiveBlending = P, t.SubtractiveBlending = C, t.MultiplyBlending = I, 
    t.CustomBlending = U, t.AddEquation = D, t.SubtractEquation = O, t.ReverseSubtractEquation = N, 
    t.MinEquation = F, t.MaxEquation = B, t.ZeroFactor = z, t.OneFactor = G, t.SrcColorFactor = H, 
    t.OneMinusSrcColorFactor = V, t.SrcAlphaFactor = k, t.OneMinusSrcAlphaFactor = j, 
    t.DstAlphaFactor = W, t.OneMinusDstAlphaFactor = X, t.DstColorFactor = q, t.OneMinusDstColorFactor = Y, 
    t.SrcAlphaSaturateFactor = Z, t.NeverDepth = J, t.AlwaysDepth = Q, t.LessDepth = K, 
    t.LessEqualDepth = $, t.EqualDepth = tt, t.GreaterEqualDepth = et, t.GreaterDepth = it, 
    t.NotEqualDepth = nt, t.MultiplyOperation = rt, t.MixOperation = at, t.AddOperation = ot, 
    t.NoToneMapping = st, t.LinearToneMapping = ct, t.ReinhardToneMapping = ht, t.Uncharted2ToneMapping = lt, 
    t.CineonToneMapping = ut, t.UVMapping = 300, t.CubeReflectionMapping = pt, t.CubeRefractionMapping = dt, 
    t.EquirectangularReflectionMapping = ft, t.EquirectangularRefractionMapping = mt, 
    t.SphericalReflectionMapping = gt, t.CubeUVReflectionMapping = vt, t.CubeUVRefractionMapping = yt, 
    t.RepeatWrapping = xt, t.ClampToEdgeWrapping = bt, t.MirroredRepeatWrapping = _t, 
    t.NearestFilter = wt, t.NearestMipMapNearestFilter = Mt, t.NearestMipMapLinearFilter = Et, 
    t.LinearFilter = Tt, t.LinearMipMapNearestFilter = St, t.LinearMipMapLinearFilter = At, 
    t.UnsignedByteType = Rt, t.ByteType = Lt, t.ShortType = Pt, t.UnsignedShortType = Ct, 
    t.IntType = It, t.UnsignedIntType = Ut, t.FloatType = Dt, t.HalfFloatType = Ot, 
    t.UnsignedShort4444Type = Nt, t.UnsignedShort5551Type = Ft, t.UnsignedShort565Type = Bt, 
    t.UnsignedInt248Type = zt, t.AlphaFormat = Gt, t.RGBFormat = Ht, t.RGBAFormat = Vt, 
    t.LuminanceFormat = kt, t.LuminanceAlphaFormat = jt, t.RGBEFormat = Wt, t.DepthFormat = Xt, 
    t.DepthStencilFormat = qt, t.RGB_S3TC_DXT1_Format = Yt, t.RGBA_S3TC_DXT1_Format = Zt, 
    t.RGBA_S3TC_DXT3_Format = Jt, t.RGBA_S3TC_DXT5_Format = Qt, t.RGB_PVRTC_4BPPV1_Format = Kt, 
    t.RGB_PVRTC_2BPPV1_Format = $t, t.RGBA_PVRTC_4BPPV1_Format = te, t.RGBA_PVRTC_2BPPV1_Format = ee, 
    t.RGB_ETC1_Format = ie, t.LoopOnce = 2200, t.LoopRepeat = ne, t.LoopPingPong = 2202, 
    t.InterpolateDiscrete = 2300, t.InterpolateLinear = 2301, t.InterpolateSmooth = 2302, 
    t.ZeroCurvatureEnding = re, t.ZeroSlopeEnding = 2401, t.WrapAroundEnding = 2402, 
    t.TrianglesDrawMode = ae, t.TriangleStripDrawMode = oe, t.TriangleFanDrawMode = se, 
    t.LinearEncoding = ce, t.sRGBEncoding = he, t.GammaEncoding = le, t.RGBEEncoding = ue, 
    t.LogLuvEncoding = 3003, t.RGBM7Encoding = pe, t.RGBM16Encoding = de, t.RGBDEncoding = fe, 
    t.BasicDepthPacking = me, t.RGBADepthPacking = ge, t.CubeGeometry = En, t.Face4 = function(t, e, i, n, r, a, o) {
        return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), 
        new Ki(t, e, i, r, a, o);
    }, t.LineStrip = 0, t.LinePieces = 1, t.MeshFaceMaterial = function(t) {
        return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."), 
        t;
    }, t.MultiMaterial = function(t) {
        return void 0 === t && (t = []), console.warn("THREE.MultiMaterial has been removed. Use an Array instead."), 
        t.isMultiMaterial = !0, t.materials = t, t.clone = function() {
            return t.slice();
        }, t;
    }, t.PointCloud = function(t, e) {
        return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new _r(t, e);
    }, t.Particle = function(t) {
        return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new ur(t);
    }, t.ParticleSystem = function(t, e) {
        return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new _r(t, e);
    }, t.PointCloudMaterial = function(t) {
        return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), 
        new br(t);
    }, t.ParticleBasicMaterial = function(t) {
        return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), 
        new br(t);
    }, t.ParticleSystemMaterial = function(t) {
        return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), 
        new br(t);
    }, t.Vertex = function(t, e, i) {
        return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), 
        new _e(t, e, i);
    }, t.DynamicBufferAttribute = function(t, e) {
        return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."), 
        new nn(t, e).setDynamic(!0);
    }, t.Int8Attribute = function(t, e) {
        return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), 
        new rn(t, e);
    }, t.Uint8Attribute = function(t, e) {
        return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), 
        new an(t, e);
    }, t.Uint8ClampedAttribute = function(t, e) {
        return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), 
        new on(t, e);
    }, t.Int16Attribute = function(t, e) {
        return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), 
        new sn(t, e);
    }, t.Uint16Attribute = function(t, e) {
        return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), 
        new cn(t, e);
    }, t.Int32Attribute = function(t, e) {
        return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), 
        new hn(t, e);
    }, t.Uint32Attribute = function(t, e) {
        return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), 
        new ln(t, e);
    }, t.Float32Attribute = function(t, e) {
        return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), 
        new un(t, e);
    }, t.Float64Attribute = function(t, e) {
        return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), 
        new pn(t, e);
    }, t.ClosedSplineCurve3 = Qs, t.SplineCurve3 = Ks, t.Spline = $s, t.AxisHelper = function(t) {
        return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."), new zs(t);
    }, t.BoundingBoxHelper = function(t, e) {
        return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), 
        new Os(t, e);
    }, t.EdgesHelper = function(t, e) {
        return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), 
        new yr(new ra(t.geometry), new gr({
            color: void 0 !== e ? e : 16777215
        }));
    }, t.WireframeHelper = function(t, e) {
        return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), 
        new yr(new Sr(t.geometry), new gr({
            color: void 0 !== e ? e : 16777215
        }));
    }, t.XHRLoader = function(t) {
        return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new Sa(t);
    }, t.BinaryTextureLoader = function(t) {
        return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."), 
        new Ra(t);
    }, t.GeometryUtils = tc, t.ImageUtils = ec, t.Projector = function() {
        console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), 
        this.projectVector = function(t, e) {
            console.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e);
        }, this.unprojectVector = function(t, e) {
            console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), 
            t.unproject(e);
        }, this.pickingRay = function() {
            console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().");
        };
    }, t.CanvasRenderer = function() {
        console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), 
        this.domElement = document.createElement("canvas"), this.clear = function() {}, 
        this.render = function() {}, this.setClearColor = function() {}, this.setSize = function() {};
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    });
});