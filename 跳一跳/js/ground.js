function o(o, r) {
    if (!(o instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function o(o, r) {
        for (var t = 0; t < r.length; t++) {
            var e = r[t];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(o, e.key, e);
        }
    }
    return function(r, t, e) {
        return t && o(r.prototype, t), e && o(r, e), r;
    };
}(), t = function(o) {
    if (o && o.__esModule) return o;
    var r = {};
    if (null != o) for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (r[t] = o[t]);
    return r.default = o, r;
}(require("./lib/three")), e = require("./config"), n = require("./lib/animation"), i = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, l = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, a = function() {
    function a() {
        o(this, a);
        var r = [ "varying vec2 vUv;", "void main()", "{", "  vUv = uv;", "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ].join("\n"), n = [ "uniform vec3 topColor;", "uniform vec3 bottomColor;", "varying vec2 vUv;", "void main()", "{", "  float h = vUv.y;", "  gl_FragColor = vec4(mix(bottomColor, topColor, min(max(h, 0.0), 1.0)), 1.0);", "}" ].join("\n"), u = {
            topColor: {
                type: "c",
                value: new t.Color("rgb(215, 219, 230)")
            },
            bottomColor: {
                type: "c",
                value: new t.Color("rgb(188, 190, 199)")
            }
        }, s = new t.PlaneGeometry(l / i * e.FRUSTUMSIZE, e.FRUSTUMSIZE);
        this.obj = new t.Object3D();
        var m = new t.ShaderMaterial({
            uniforms: u,
            vertexShader: r,
            fragmentShader: n
        });
        this.ground = new t.Mesh(s, m), this.obj.add(this.ground), this.colors = [ {
            topColor: [ 215, 219, 230 ],
            bottomColor: [ 188, 190, 199 ]
        }, {
            topColor: [ 252, 235, 227 ],
            bottomColor: [ 227, 190, 195 ]
        }, {
            topColor: [ 217, 237, 245 ],
            bottomColor: [ 188, 218, 191 ]
        }, {
            topColor: [ 248, 228, 189 ],
            bottomColor: [ 231, 192, 136 ]
        }, {
            topColor: [ 214, 230, 249 ],
            bottomColor: [ 153, 183, 208 ]
        }, {
            topColor: [ 255, 250, 204 ],
            bottomColor: [ 239, 232, 152 ]
        }, {
            topColor: [ 217, 218, 246 ],
            bottomColor: [ 164, 172, 212 ]
        } ], this.current = 0;
    }
    return r(a, [ {
        key: "changeColor",
        value: function() {
            var o = this, r = this.current + 1 > 6 ? 0 : this.current + 1, e = [ 255 * this.ground.material.uniforms.topColor.value.r, 255 * this.ground.material.uniforms.topColor.value.g, 255 * this.ground.material.uniforms.topColor.value.b ], i = [ 255 * this.ground.material.uniforms.bottomColor.value.r, 255 * this.ground.material.uniforms.bottomColor.value.g, 255 * this.ground.material.uniforms.bottomColor.value.b ], l = e.concat(i), a = this.colors[r].topColor.concat(this.colors[r].bottomColor);
            (0, n.TweenAnimation)(l, a, 5e3, "Linear", function(e, n) {
                if (void 0 !== e) {
                    for (var i = 0; i < 6; ++i) e[i] = parseInt(e[i]);
                    var l = e.slice(0, 3), a = e.slice(3);
                    o.ground.material.uniforms.topColor.value = new t.Color("rgb(" + l.join(",") + ")"), 
                    o.ground.material.uniforms.bottomColor.value = new t.Color("rgb(" + a.join(",") + ")"), 
                    o.current = r;
                }
            });
        }
    } ]), a;
}();

exports.default = a;