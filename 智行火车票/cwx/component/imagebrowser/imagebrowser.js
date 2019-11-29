function t(t) {
    return t && "string" == typeof t && t.length > 0 ? t : "";
}

var i = require("../../cwx.js");

(0, i.CPage)({
    pageId: "10320654343",
    data: {
        images: null,
        count: 0,
        bu: null,
        title: "图片浏览",
        index: 0,
        indexTitle: "",
        indexDescription: ""
    },
    onLoad: function(i) {
        if (i.data && i.data.images) {
            var e = i.data.images || [], a = i.data.bu || "", n = i.data.title || "图片浏览";
            this.setData({
                images: e,
                count: e.length,
                bu: a,
                title: n,
                index: 0,
                indexTitle: t(e[0].title),
                indexDescription: t(e[0].description)
            });
        }
    },
    onShow: function() {
        i.cwx.setNavigationBarTitle({
            title: this.data.title
        });
    },
    imageError: function(t) {
        console.log("imageError = ", t.detail);
        var i = t.detail.errMsg || "未知错误", e = null;
        i.split(" ").forEach(function(t) {
            -1 != t.indexOf("http") && (e = t);
        }), this.ubtTrace({
            bu: this.data.bu,
            error: i
        });
    },
    imageLoad: function(t) {},
    swiperChange: function(i) {
        console.log(i.detail);
        var e = i.detail.current, a = this.data.images;
        this.setData({
            index: e,
            indexTitle: t(a[e].title),
            indexDescription: t(a[e].description)
        });
    }
});