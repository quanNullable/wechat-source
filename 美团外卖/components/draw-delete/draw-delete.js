function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var a = {
    touchS: function(a) {
        1 === a.touches.length && (this.data.tmpStartx = a.touches[0].clientX, this.data.tmpStarty = a.touches[0].clientY);
        var i = a.currentTarget.dataset.index, e = this.data[this.listDataName];
        e.map(function(t, a) {
            return a !== i && (t.right = 0, t.isDelShow = !1), t;
        }), this.setData(t({}, this.listDataName, e));
    },
    touchM: function(t) {
        var a = t.currentTarget.dataset.index, i = this.data.tmpStartx - t.touches[0].clientX, e = this.data[this.listDataName][a];
        if (i > 5 && this.setData({
            scroll: !1
        }), i >= 0) {
            if (e.isDelShow) return;
            e.right = i > this.data.btnWidth ? this.data.btnWidth : i, this.setDrawListData(a, e);
        } else e.isDelShow && (e.right = this.data.btnWidth + i > 0 ? this.data.btnWidth + i : 0, 
        this.setDrawListData(a, e));
    },
    touchE: function(t) {
        var a = t.currentTarget.dataset.index, i = this.data.tmpStartx - t.changedTouches[0].clientX, e = this.data[this.listDataName][a];
        i >= 0 ? e.isDelShow || (i >= this.data.btnWidth / 2 ? (e.right = this.data.btnWidth, 
        e.isDelShow = !0) : (e.right = 0, e.isDelShow = !1), this.setDrawListData(a, e)) : e.isDelShow ? (Math.abs(i) >= this.data.btnWidth / 2 ? (e.right = 0, 
        e.isDelShow = !1) : (e.right = this.data.btnWidth, e.isDelShow = !0), this.setDrawListData(a, e)) : (e.right = 0, 
        e.isDelShow = !1, this.setDrawListData(a, e)), this.setData({
            scroll: !0
        });
    },
    deleteItem: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data[this.listDataName].splice(a, 1);
    },
    getDelBtnWidth: function() {
        return 130 * wx.getSystemInfoSync().windowWidth / 750;
    },
    deleteInit: function(a) {
        this.listDataName = a, this.data.btnWidth = this.getDelBtnWidth();
        var i = this.data[a];
        i && i.length && (i.forEach(function(t) {
            t.right = 0, t.isDelShow = !1;
        }), this.setData(t({}, a, i)));
    },
    setDrawListData: function(t, a) {
        var i = {}, e = this.listDataName;
        Object.keys(a).forEach(function(s) {
            i[e + "[" + t + "]." + s] = a[s];
        }), this.setData(i);
    }
};

module.exports = function(t) {
    var i = t.data;
    i.tmpStartx = 0, i.tmpStarty = 0, i.btnWidth = 0, t.listDataName = "", Object.keys(a).forEach(function(i) {
        t[i] = a[i];
    });
};