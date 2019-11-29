function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function r(n, s) {
                try {
                    var i = t[n](s), o = i.value;
                } catch (e) {
                    return void a(e);
                }
                if (!i.done) return Promise.resolve(o).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(o);
            }
            return r("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../base.js"), n = require("../../utils/format-price.js"), s = require("../../api/index.js"), i = s.refundApplyPreview, o = s.refundApplySubmit, c = s.refundApplyCalculate, u = r({
    pageName: "refund-apply",
    data: {
        page_show: !1,
        poi_info: [],
        refund_type: [],
        refund_way_list: [],
        shipping: {},
        has_box_fee: 0,
        refund_shipping_tip: "",
        maxImageCount: 6,
        uploading: !1,
        fakePictures: [],
        pictures: [],
        refund_way: 0,
        foods: [],
        box_desc: "",
        refund_money: 0,
        refund_money_format: 0,
        refund_rule_desc: "",
        refund_reasons: [],
        picker_index: -1,
        select_all: !0,
        support_part_refund: 0,
        food_selected_available: 0,
        food_selected: 0,
        reason_text: "",
        insurance: {},
        insurance_show: !1,
        refund_category: 0
    },
    bindPickerChange: function(e) {
        var t = this.data, a = t.refund_reasons, r = t.refund_without_picture_tip, n = e.detail.value;
        a[n].need_upload_picture && this.toast({
            message: r
        }), this.setData({
            picker_index: n
        });
    },
    view_id: 0,
    onLoad: function(e) {
        var t = e.view_id, a = void 0 === t ? 0 : t;
        this.view_id = a, this.loadPage();
    },
    loadPage: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, s, o, c, u, d, f, l, _, p, h, v, g, m, k, y, x, b, w, P, D, S, C, T, A, j, E, I, R, U, q, O, z, F, K, N, W, L, B, J, M, G, H, Q, V, X, Y, Z, $, ee;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, r = a.view_id, e.next = 4, i({
                        view_id: r
                    });

                  case 4:
                    for (s = e.sent, o = s.poi_info, c = s.refund_type, u = s.refund_way, d = s.foodlist, 
                    f = s.box_desc, l = s.refund_money, _ = s.refund_rule_desc, p = s.type_reasons, 
                    h = void 0 === p ? [] : p, v = s.support_part_refund, g = s.insurance, m = s.refund_without_picture_tip, 
                    k = s.shipping, y = s.bucket, x = s.clientid, a.setData({
                        page_show: !0
                    }), b = [], w = 0, P = h.length; w < P; w++) for (D = h[w], S = D.reasons, C = 0, 
                    T = S.length; C < T; C++) A = S[C], (j = A).reason_type = D.reason_type, b.push(j);
                    E = [], I = 0, R = 0, U = d.length;

                  case 26:
                    if (!(R < U)) {
                        e.next = 58;
                        break;
                    }
                    for (q = d[R], O = q.attrs, z = [], F = !0, K = !1, N = void 0, e.prev = 33, W = O[Symbol.iterator](); !(F = (L = W.next()).done); F = !0) B = L.value, 
                    z.push(B.value);
                    e.next = 41;
                    break;

                  case 37:
                    e.prev = 37, e.t0 = e.catch(33), K = !0, N = e.t0;

                  case 41:
                    e.prev = 41, e.prev = 42, !F && W.return && W.return();

                  case 44:
                    if (e.prev = 44, !K) {
                        e.next = 47;
                        break;
                    }
                    throw N;

                  case 47:
                    return e.finish(44);

                  case 48:
                    return e.finish(41);

                  case 49:
                    z = z.join(" + "), q.attr_info = z, q.selected_count = q.count, q.checked = 0 === q.refund_status_code, 
                    E.push(q), 0 === q.refund_status_code && (I += q.count);

                  case 55:
                    R++, e.next = 26;
                    break;

                  case 58:
                    J = I, M = n(100 * l), a.handleRefundWay(u), a.setData({
                        bucket: y,
                        clientid: x,
                        poi_info: o,
                        shipping: k,
                        refund_without_picture_tip: m,
                        refund_type: c,
                        refund_way_list: u,
                        foods: E,
                        box_desc: f,
                        refund_money: M,
                        refund_money_format: M,
                        refund_rule_desc: _,
                        refund_reasons: b,
                        support_part_refund: v,
                        food_selected_available: I,
                        food_selected: J,
                        insurance: g,
                        insurance_show: !!g
                    }), e.next = 78;
                    break;

                  case 64:
                    if (e.prev = 64, e.t1 = e.catch(0), G = e.t1.code, H = e.t1.data, Q = void 0 === H ? {} : H, 
                    V = e.t1.message, a.loading(!1), 2 !== G) {
                        e.next = 77;
                        break;
                    }
                    if (X = Q || {}, Y = X.failure_description, Z = void 0 === Y ? "" : Y, $ = X.poi_phone, 
                    ee = void 0 === $ ? "" : $, !Z || !ee) {
                        e.next = 77;
                        break;
                    }
                    return a.confirm({
                        message: Z,
                        cancel: function() {
                            wx.makePhoneCall({
                                phoneNumber: ee
                            });
                        },
                        textCancel: "联系商家",
                        textOK: "再等等"
                    }), e.abrupt("return");

                  case 77:
                    a.toast({
                        message: V
                    });

                  case 78:
                    a.loading(!1);

                  case 79:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 64 ], [ 33, 37, 41, 49 ], [ 42, , 44, 48 ] ]);
        }))();
    },
    filterPictures: function(e) {
        var t = [];
        if (Array.isArray(e)) {
            for (var a = 0; a < e.length; a += 1) e[a] && t.push(e[a]);
            return t;
        }
        return e;
    },
    onClickDeleteImage: function(e) {
        var t = e.currentTarget.dataset.index, a = void 0 === t ? 0 : t, r = this.data, n = r.pictures, s = r.fakePictures, i = s[a];
        i.percent < 100 && !i.reload ? this.toast({
            message: "图片正在上传中，请稍后重试"
        }) : (n.splice(a, 1), s.splice(a, 1), this.setData({
            fakePictures: s,
            pictures: n
        }));
    },
    onClickRetryUpload: function(e) {
        var t = this, a = e.currentTarget.dataset, r = a.index, n = void 0 === r ? 0 : r, s = a.path, i = void 0 === s ? "" : s, o = this.data.fakePictures;
        o[n].reload = !1, this.setData({
            fakePictures: o
        }, function() {
            t.upload(i, n);
        });
    },
    checkUploadState: function() {
        var e = this.data.fakePictures, t = void 0 === e ? [] : e, a = t.length && t.some(function(e) {
            return 100 !== e.percent;
        });
        this.setData({
            uploading: a
        });
    },
    upload: function(e, t) {
        var a = this.data, r = a.bucket, n = a.clientid, s = this;
        s.uploadFile({
            bucket: r,
            clientid: n,
            filePath: e,
            progress: function(e) {
                var a = e.progress, r = void 0 === a ? 0 : a, n = s.data.fakePictures;
                n[t].percent = r, s.setData({
                    fakePictures: n
                });
            },
            callback: function(e) {
                var a = s.data, r = a.pictures, n = a.fakePictures, i = e.originalLink;
                n[t].reload = !1, r[t] = i, s.checkUploadState(), s.setData({
                    pictures: r,
                    fakePictures: n
                });
            },
            fallback: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = s.data.fakePictures;
                a[t].percent = 0, a[t].reload = !0, console.log(e && e.message ? e.message : e), 
                s.checkUploadState(), s.setData({
                    fakePictures: a
                });
            }
        });
    },
    onClickChooseImage: function() {
        var e = this, t = this.data, a = t.fakePictures, r = void 0 === a ? [] : a, n = t.maxImageCount, s = r.length;
        wx.chooseImage({
            count: n - s,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = s || 0, i = t.tempFilePaths, o = void 0 === i ? [] : i, c = t.tempFiles;
                e.checkUploadState(), e.setData({
                    fakePictures: r.concat(o.map(function(e) {
                        return {
                            path: e,
                            percent: 0,
                            reload: !1
                        };
                    })).slice(0, n)
                }, function() {
                    o.forEach(function(t, r) {
                        var s = a + r, i = c[r].size, o = void 0 === i ? 0 : i;
                        s >= n || (e.matchUploadSize(o) ? e.upload(t, s) : e.toast({
                            message: "第" + r + "张图片体积过大，请重新上传"
                        }));
                    });
                });
            }
        });
    },
    onClickShowInstruction: function(e) {
        var t = e.currentTarget.dataset, a = t.title, r = void 0 === a ? "" : a, n = t.instructions, s = void 0 === n ? [] : n;
        this.alert({
            title: r,
            textOK: "知道了",
            messagelist: s
        });
    },
    handleRefundWay: function(e) {
        if (e && e.length) {
            var t = e.filter(function(e) {
                return 1 === e.is_selected;
            });
            if (!t || !t.length) return;
            this.setData({
                refund_way: t[0].type || 0
            });
        }
    },
    onClickToggleRefundWay: function(e) {
        var t = e.currentTarget.dataset, a = t.type, r = void 0 === a ? 0 : a, n = t.disabled, s = void 0 !== n && n, i = t.index, o = void 0 === i ? 0 : i;
        if (!s) {
            var c = this.data, u = c.refund_way_list, d = void 0 === u ? [] : u;
            c.refund_way !== r && (d.forEach(function(e, t) {
                -1 !== e.is_selected && (e.is_selected = t === o ? 1 : 0);
            }), r && this.chooseAll(!0), this.setData({
                refund_way_list: d,
                refund_way: r
            }));
        }
    },
    chooseAll: function(e) {
        if (e = "boolean" == typeof e && e, 0 === this.data.support_part_refund) this.toast({
            message: "仅支持全单退哦~"
        }); else {
            var t = this.data, a = t.select_all, r = t.food_selected, n = t.refund_category, s = this.data.foods;
            a && !e ? (s.forEach(function(e) {
                e.selected_count = 0, e.checked = !1;
            }), r = 0, a = !1, n = 1) : (s.forEach(function(e) {
                e.selected_count = e.count, e.checked = !0;
            }), r = this.data.food_selected_available, a = !0, n = 0), this.setData({
                select_all: a,
                refund_category: n,
                foods: s,
                food_selected: r
            }), this.calculatePrice();
        }
    },
    chooseSingle: function(e) {
        var t = e.currentTarget.dataset, a = t.checked, r = t.clickable, n = t.index;
        if (r) if (0 === this.data.support_part_refund) this.toast({
            message: "仅支持全单退哦~"
        }); else {
            var s = this.data, i = s.food_selected, o = s.select_all, c = s.refund_category, u = this.data.foods, d = u[n];
            !0 === a ? (d.checked = !1, i -= d.selected_count, d.selected_count = 0, o = !1, 
            c = 1) : (d.checked = !0, i += d.count, d.selected_count = d.count, i === this.data.food_selected_available && (o = !0, 
            c = 0)), this.setData({
                select_all: o,
                refund_category: c,
                foods: u,
                food_selected: i
            }), this.calculatePrice();
        }
    },
    refundAdd: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.food_selected, r = this.data.foods, n = r[t];
        n.selected_count < n.count && (a += 1, n.selected_count += 1, n.checked = !0, this.setData({
            foods: r,
            food_selected: a
        }), a === this.data.food_selected_available && n.selected_count === n.count && this.setData({
            select_all: !0,
            refund_category: 0
        }), this.calculatePrice());
    },
    refundRemove: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.food_selected, r = this.data.foods, n = r[t];
        n.selected_count > 0 && (a -= 1, n.selected_count -= 1, 0 === n.selected_count && (n.checked = !1), 
        this.setData({
            foods: r,
            food_selected: a,
            select_all: !1,
            refund_category: 1
        }), this.calculatePrice());
    },
    updateRefundText: function(e) {
        var t = e.detail.value;
        return t && t.length >= 200 && (this.toast({
            message: "最多200字哦~"
        }), t.length > 200) ? t.substring(0, t.length - 1) : (this.setData({
            reason_text: t.trim()
        }), t);
    },
    calculatePrice: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, s, i, o, u, d, f, l, _, p;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, r = a.view_id, s = a.data.foods, i = [], s.forEach(function(e) {
                        if (e.selected_count) {
                            var t = {
                                item_id: e.item_id,
                                wm_food_id: e.wm_food_id,
                                count: e.selected_count
                            };
                            i.push(t);
                        }
                    }), e.next = 6, c({
                        data: {
                            order_view_id: r,
                            foodlist: i
                        }
                    });

                  case 6:
                    o = e.sent, u = o.refund_money, d = o.refund_tip, f = o.insurance, l = o.has_box_fee, 
                    _ = o.refund_shipping_tip, a.setData({
                        refund_money: n(100 * u),
                        box_desc: d,
                        insurance: f,
                        insurance_show: !!f,
                        has_box_fee: l,
                        refund_shipping_tip: _
                    }), e.next = 19;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(0), p = e.t0.message, a.toast({
                        message: p
                    });

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 15 ] ]);
        }))();
    },
    toSubmit: function() {
        this.applySubmit();
    },
    applySubmit: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, n, s, i, c, u, d, f, l, _, p, h, v, g, m, k;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, r = a.view_id, n = a.data, s = n.foods, i = n.food_selected, c = n.refund_reasons, 
                    u = n.picker_index, d = n.reason_text, f = n.refund_category, l = n.refund_way, 
                    _ = n.pictures, 0 !== i) {
                        e.next = 5;
                        break;
                    }
                    return a.toast({
                        message: "请选择要退款的商品"
                    }), e.abrupt("return", !1);

                  case 5:
                    if (-1 !== u) {
                        e.next = 8;
                        break;
                    }
                    return a.toast({
                        message: "请选择退款原因"
                    }), e.abrupt("return", !1);

                  case 8:
                    if (p = c[u], h = p.reason_type, v = p.reason_id, 4 !== h || "" !== d) {
                        e.next = 12;
                        break;
                    }
                    return a.toast({
                        message: "请描述退款原因"
                    }), e.abrupt("return", !1);

                  case 12:
                    return g = [], s.forEach(function(e) {
                        if (e.selected_count) {
                            var t = {
                                item_id: e.item_id,
                                wm_food_id: e.wm_food_id,
                                count: e.selected_count
                            };
                            g.push(t);
                        }
                    }), e.next = 16, o({
                        view_id: r,
                        refund_reason_id: v,
                        refund_reason_type: h,
                        private_reason: d,
                        refund_type: 2,
                        part_refund_data: JSON.stringify({
                            refund_category: f,
                            foodlist: g,
                            pictures: a.filterPictures(_),
                            refund_way: l
                        })
                    });

                  case 16:
                    a.toast({
                        message: "提交成功"
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3), e.next = 25;
                    break;

                  case 20:
                    e.prev = 20, e.t0 = e.catch(0), m = e.t0.code, k = e.t0.message, m ? a.alert({
                        message: k,
                        textOK: "知道了",
                        ok: function() {
                            this.loadPage();
                        }
                    }) : a.toast({
                        message: k
                    });

                  case 25:
                    return e.abrupt("return", !1);

                  case 26:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 20 ] ]);
        }))();
    }
});

(0, a.page)(u);