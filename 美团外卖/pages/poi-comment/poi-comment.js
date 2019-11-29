function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, a) {
            function i(o, n) {
                try {
                    var d = t[o](n), s = d.value;
                } catch (e) {
                    return void a(e);
                }
                if (!d.done) return r.resolve(s).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(s);
            }
            return i("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../npm/promise-polyfill/promise.js"), i = require("../../api/index.js"), o = i.gocomment, n = i.commentsubmit, d = require("../base.js")({
    data: {
        poi_id: 0,
        hash_id: 0,
        gocomment_data: null,
        deliveryScore: -1,
        deliveryCurrent: 0,
        delivery_labels: {},
        productScore: -1,
        productCurrent: 0,
        product_labels: {},
        poi_comment_warn: "至少输入8个字",
        commentValue: "",
        food_comments: {},
        send_enable: !1,
        timepicker: !1,
        date_tabs: [],
        order_arrive_time: 0,
        manual_order_arrive_time: 0,
        manual_order_arrive_time_date: {},
        arrival_time_str: "",
        poi_comment_placeholder: "写下您对配送和商家的评价吧～",
        sender_labels: [],
        product_tab_labels: []
    },
    load: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.loading(!0), e.prev = 1, e.next = 4, o({
                        wm_poi_id: a.data.poi_id,
                        order_view_id: a.data.hash_id
                    });

                  case 4:
                    r = e.sent, a.setData({
                        gocomment_data: r
                    }), a.setData({
                        arrival_time_str: r.default_arrival_time_str,
                        order_arrive_time: 1e3 * r.defalut_arrival_time,
                        manual_order_arrive_time: 1e3 * r.defalut_arrival_time,
                        manual_order_arrive_time_date: {
                            year: new Date(1e3 * r.defalut_arrival_time).getFullYear(),
                            date: new Date(1e3 * r.defalut_arrival_time).getDate(),
                            month: new Date(1e3 * r.defalut_arrival_time).getMonth(),
                            hour: new Date(1e3 * r.defalut_arrival_time).getHours(),
                            minute: new Date(1e3 * r.defalut_arrival_time).getMinutes()
                        }
                    }), a.loading(!1), e.next = 15;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(1), i = e.t0.message, a.error({
                        message: i
                    }), a.loading(!1);

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 10 ] ]);
        }))();
    },
    onChangeSwiperDelivery: function(e) {
        var t = e.detail.current;
        this.setData({
            deliveryCurrent: t
        });
    },
    onChangeSwiperProduct: function(e) {
        var t = e.detail.current;
        this.setData({
            productCurrent: t
        });
    },
    onClickDeliveryLabel: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.delivery_labels;
        a[t] = !a[t], this.setData({
            delivery_labels: a
        });
    },
    onCommentInput: function(e) {
        var t = e.detail.value;
        if (this.setData({
            commentValue: t
        }), t.length < 8) {
            var a = 8 - t.length;
            this.setData({
                poi_comment_warn: "至少输入" + a + "个字"
            });
        } else this.setData({
            poi_comment_warn: t.length + "/500"
        });
        this.checkForm();
    },
    onClickProductLabel: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.product_labels;
        a[t] = !a[t], this.setData({
            product_labels: a
        });
    },
    onClickLikeButton: function(e) {
        var t = e.currentTarget.dataset, a = t.foodid, r = t.type, i = this.data.food_comments;
        i[a] = r, this.setData({
            food_comments: i
        });
    },
    onClickDeliveryScore: function(e) {
        var t = e.currentTarget.dataset.score;
        t !== this.data.deliveryScore && this.setData({
            delivery_labels: {}
        });
        for (var a = this.data.gocomment_data.sender_labels[t], r = [], i = 0; i < a.length; i += 6) r.push(a.slice(i, i + 6));
        this.setData({
            sender_labels: r
        }), this.setData({
            deliveryScore: t
        }), this.checkForm();
    },
    onClickProductScore: function(e) {
        var t = e.currentTarget.dataset.score;
        t !== this.data.productScore && this.setData({
            product_labels: {}
        }), this.setData({
            productScore: t
        });
        for (var a = this.data.gocomment_data.product_labels[t], r = [], i = 0; i < a.length; i += 6) r.push(a.slice(i, i + 6));
        this.setData({
            product_tab_labels: r
        }), this.checkForm();
    },
    onSubmitComment: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i, o, d, s, _, c, m, l, u, h, v, p;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!(r = a.checkForm(!0))) {
                        e.next = 30;
                        break;
                    }
                    for (a.loading(!0), e.prev = 3, i = void 0, i = a.data.manual_order_arrive_time_date.year, 
                    i += "/" + (a.data.manual_order_arrive_time_date.month + 1), i += "/" + a.data.manual_order_arrive_time_date.date, 
                    i += " " + a.data.manual_order_arrive_time_date.hour, i += ":" + a.data.manual_order_arrive_time_date.minute, 
                    i = new Date(i) / 1e3, o = [], d = 0; d < Object.keys(a.data.delivery_labels).length; d++) s = Object.keys(a.data.delivery_labels)[d], 
                    !0 === a.data.delivery_labels[s] && o.push(s);
                    for (_ = 0; _ < Object.keys(a.data.product_labels).length; _++) c = Object.keys(a.data.product_labels)[_], 
                    !0 === a.data.product_labels[c] && o.push(c);
                    for (o = o.join(","), m = [], l = 0; l < Object.keys(a.data.food_comments).length; l++) u = Object.keys(a.data.food_comments)[l], 
                    m.push({
                        id: u,
                        comment_type: a.data.food_comments[u]
                    });
                    return h = {
                        data: {
                            hash_id: a.data.hash_id,
                            comment: a.data.commentValue,
                            food_comment_score: a.data.productScore + 1,
                            delivery_comment_score: a.data.deliveryScore + 1,
                            order_comment_score: parseInt((a.data.productScore + a.data.deliveryScore) / 2, 0) + 1,
                            order_arrive_time: a.data.order_arrive_time / 1e3,
                            manual_order_arrive_time: i,
                            comment_label_ids: o,
                            food_scheme: [],
                            food_comments: m
                        }
                    }, e.next = 20, n(h);

                  case 20:
                    v = e.sent, a.loading(!1), a.alert({
                        message: v.success_tip,
                        ok: function() {
                            wx.navigateBack();
                        }
                    }), e.next = 30;
                    break;

                  case 25:
                    e.prev = 25, e.t0 = e.catch(3), p = e.t0.message, a.alert({
                        message: p
                    }), a.loading(!1);

                  case 30:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 3, 25 ] ]);
        }))();
    },
    onClickTimepicker: function() {
        this.initTimePickerDate(), this.setData({
            timepicker: !0
        });
    },
    initTimePickerDate: function() {
        for (var e = this.data.gocomment_data.confirm_arrival_timelist, t = 0, a = [], r = 0; r < e.length; r++) {
            var i = 0, o = 0;
            "今天" === e[r].date ? (i = new Date().getMonth(), o = new Date().getDate()) : (i = e[r].date.match(/\d+/g)[0] - 1, 
            o = e[r].date.match(/\d+/g)[1]), a.push({
                content: e[r].date,
                date: o,
                month: i
            }), this.data.manual_order_arrive_time_date.date === o && this.data.manual_order_arrive_time_date.month === i && (t = r);
        }
        this.setData({
            date_tabs: a
        }), this.initTimePickerHours(t);
    },
    initTimePickerHours: function(e) {
        for (var t = this.data.gocomment_data.confirm_arrival_timelist[e].timelist, a = [], r = 0; r < t.length; r++) a.push({
            content: t[r].view_time,
            minute: new Date(1e3 * t[r].unixtime).getMinutes(),
            hour: new Date(1e3 * t[r].unixtime).getHours()
        });
        this.setData({
            hour_tabs: a
        });
    },
    closePicker: function(e) {
        e.target.id === e.currentTarget.id && this.setData({
            timepicker: !1
        });
    },
    onClickPickerDate: function(e) {
        var t = e.currentTarget.dataset, a = t.month, r = t.date, i = t.index, o = this.data.manual_order_arrive_time_date;
        o.date === r && o.month === a || (o.date = r, o.month = a, o.hour = -1, o.minute = -1, 
        this.setData({
            manual_order_arrive_time_date: o
        }), this.initTimePickerHours(i)), console.log(o);
    },
    onClickPickerHour: function(e) {
        var t = e.currentTarget.dataset, a = t.hour, r = t.minute, i = this.data.manual_order_arrive_time_date;
        i.hour = a, i.minute = r, this.setData({
            manual_order_arrive_time_date: i
        });
        var o = this.data.manual_order_arrive_time_date.month + 1 + "月";
        o += this.data.manual_order_arrive_time_date.date + "日", o += this.data.manual_order_arrive_time_date.hour + ":", 
        o += this.data.manual_order_arrive_time_date.minute >= 10 ? this.data.manual_order_arrive_time_date.minute : "0" + this.data.manual_order_arrive_time_date.minute, 
        this.setData({
            arrival_time_str: o
        }), this.setData({
            timepicker: !1
        }), console.log(i);
    },
    checkForm: function(e) {
        var t = this.data.commentValue.length >= 8 || 0 === this.data.commentValue.length, a = this.data.deliveryScore >= 0, r = this.data.productScore >= 0;
        if (this.data.deliveryScore >= 3 && this.data.productScore >= 3 && this.setData({
            poi_comment_placeholder: "写下您对配送和商家的评价吧～"
        }), (this.data.deliveryScore < 3 && this.data.deliveryScore >= 0 || this.data.productScore < 3 && this.data.productScore >= 0) && this.setData({
            poi_comment_placeholder: "亲亲，哪里不满意吗，写评价告诉我们"
        }), t && a && r ? this.setData({
            send_enable: !0
        }) : this.setData({
            send_enable: !1
        }), e) {
            if (!t) return this.toast({
                message: "评价至少输入8个字"
            }), !1;
            if (!a) return this.toast({
                message: "请给配送打分"
            }), !1;
            if (!r) return this.toast({
                message: "请给商家打分"
            }), !1;
        }
        return t && a && r;
    },
    onLoad: function(e) {
        var t = e.poi_id, a = e.hash_id;
        this.setData({
            poi_id: t,
            hash_id: a
        }), this.load();
    }
});

(0, a.page)(d);