Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawBeginnerPage = function(r) {
    var t = (r = Object.assign({}, {
        self: {}
    }, r)).self;
    (0, e.routeCanvas)(t, "beginner"), (0, e.createPlane)(t);
    var a = t.context.bg;
    a.clearRect(0, 0, e.WIDTH, e.HEIGHT), a.fillStyle = "rgba(255,255,255,0.3)", a.fillRect((0, 
    e.cx)(103), (0, e.cy)(134), (0, e.cwh)(206), (0, e.cwh)(115)), (0, e.drawText)({
        t: "长按屏幕并释放",
        self: t,
        size: 17,
        pos: [ 207, 172 ],
        color: "black"
    }), (0, e.drawText)({
        t: "控制",
        self: t,
        size: 17,
        pos: [ 149, 213 ],
        color: "black",
        align: "left"
    }), (0, e.drawText)({
        t: "向前跳",
        self: t,
        size: 17,
        pos: [ 265, 213 ],
        color: "black",
        align: "right"
    }), (0, e.drawImageCenter)({
        self: t,
        src: "res/i.png",
        pos: [ 198, 211, 13.2, 35.6 ],
        type: "bg",
        imgid: t.imgid.bg
    }), (0, e.updatePlane)({
        self: t,
        type: "bg"
    });
};

var e = require("./base");