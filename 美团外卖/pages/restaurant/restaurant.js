function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, o) {
            function a(i, n) {
                try {
                    var r = e[i](n), s = r.value;
                } catch (t) {
                    return void o(t);
                }
                if (!r.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }
            return a("next");
        });
    };
}

var o = t(require("../../npm/babel-runtime/regenerator/index.js")), a = function() {
    function t(t, e) {
        var o = [], a = !0, i = !1, n = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(a = (r = s.next()).done) && (o.push(r.value), 
            !e || o.length !== e); a = !0) ;
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (i) throw n;
            }
        }
        return o;
    }
    return function(e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, n = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../actions/poi.js"), s = require("../../actions/purchase.js"), c = require("../../actions/cart.js"), u = t(require("../loginV2/login-api.js")), d = require("./log.js"), p = require("../../utils/image-scale.js"), l = require("../base.js"), h = require("../../utils/mix.js"), f = require("../../utils/random-item.js"), g = require("../../utils/object-assign.js"), m = require("../../components/rohr/rohr.js"), _ = require("./modal-food/modal-food.js"), v = require("./spuItem-template/spuShowRange.js"), S = require("./product-info/product-info.js"), y = require("../../constants.js").SHARE_MESSAGES_RESTAURANT, T = require("../../constants.js"), x = T.ACTION_CLICK, w = T.P_POI, C = T.P_SUBMIT_ORDER, D = T.B_FOOD, b = T.B_PREORDER, I = T.B_PREVIEW, k = function(t) {
    return t.missingfoods || (t.length ? t : []);
}, L = require("../../api/index.js"), M = L.poiFood, A = L.orderPreview, P = L.grabPoiCoupon, F = L.poiInfo, E = L.poiCommentInfo, O = L.getThisCoupon, j = L.poiFoodCollect, H = require("../../api/analytics.js").event, B = require("../../weapp-redux/index.js").connect, N = require("../../reducers/selectors/cart.js"), q = require("../../utils/format-price.js"), V = require("../../utils/find.js"), U = require("../../utils/throttle.js"), R = function(t, e) {
    if (e) for (var o = e.spu_id, a = 0, i = t.length; a < i; a++) for (var n = t[a], r = n.spus, s = n.tag, c = 0, u = r.length; c < u; c++) if ("" + r[c].id === o) return [ a, c, s ];
    return [ -1, -1 ];
}, G = {
    normal: 1,
    busy: 2,
    closed: 3,
    offline: 4
}, W = {
    hasAlreadyBeTop: !1,
    hasAlreadyBeBottom: !1,
    currentRightSrollTop: 0,
    isScollFunctionActived: !0,
    isAlreadyBeTopGoTop: "",
    isAlreadyBeTopGoDown: "",
    isStarted: !1,
    touchStartPosition: 0,
    scrollTopRecord: 0
}, K = !1, X = [ {
    up: "scrollScrollUp",
    down: "scrollScrollDown"
}, {
    up: "scrollScrollUpWithCoupon",
    down: "scrollScrollDownWithCoupon"
} ], z = [ "164rpx", "224rpx" ], Y = {
    up: "",
    down: "",
    scrollTop: ""
}, J = {
    pageName: "restaurant",
    data: {
        dataIsLoaded: !1,
        isFirstLoadShouldPrevent: !0,
        modalShown: !1,
        scrollToChooseType: "",
        activeTypeIndex: 0,
        activityTag: 0,
        resetScrollTop: 0,
        isHiddenCart: !0,
        activePanel: 0,
        poiInfo: null,
        commentInfo: null,
        discountIndex: 0,
        couponModalShown: !1,
        couponlistBlocking: !1,
        couponlist: null,
        poi_coupon_list: [],
        currentCategorieType: 0,
        poiCommentOffset: 0,
        poiCommentTotal: null,
        label_id: 0,
        loadingLogo: !0,
        menuTabs: [],
        menuData: [],
        qualificationShown: !0,
        onLoadTagIndex: 0,
        onLoadSpuIndex: 0,
        onLoadFocusSpu: "",
        scrollScrollAnimation: "",
        mainScrollTop: "",
        ifCouponModalShouldShow: !1,
        couponAnimation: "",
        cartTipShow: !1,
        cartTip: null,
        addMoreShow: !1,
        addMoreSpuHistoryList: [],
        addMoreSpuList: null,
        addMoreScrollShow: !1,
        hasEmptySolt: !1,
        emptySoltHeight: 0,
        offlineMessage: "",
        isHiddenGetMore: !0,
        cartTipAnimation: "",
        container_type: "",
        collect_type: 0,
        ableToScroll: !0,
        isIpx: /iPhone X/.test(wx.getSystemInfoSync().model),
        hasUserInfo: !(!wx.canIUse || !wx.canIUse("button.open-type.getUserInfo")),
        throttleDelay: /iPhone/.test(wx.getSystemInfoSync().model) && !/iPhone 5/.test(wx.getSystemInfoSync().model) ? 0 : 300,
        showRange: 1,
        spuTagEachHeight: [],
        tagView: "",
        headerInfoAnimation: "",
        spuScrollHeight: 0,
        spuTagPositionList: []
    },
    poiID: 0,
    onLoadFocus: null,
    couponGoodsAddCnt: 0,
    onClickPanelHeader: function(t) {
        var e = t.currentTarget.dataset.index, o = parseInt(e, 10) || 0;
        this.setData({
            activePanel: o
        }), 1 === o ? this.loadCommentInfo(!0) : 2 === o && this.loadPoiInfo();
    },
    LogWhenChangeTabHeader: function(t) {
        var e = this.poiID, o = this.data.container_type, a = this.data.activeTypeIndex, i = this.store.getState().poi.food_spu_tags;
        void 0 === i[a] && this.lxLogWXAppError("UNDEFINED ", void 0, {
            food_spu_tags: i,
            activeTypeIndex: a,
            source: "LogWhenChangeTabHeader"
        });
        var n = {
            poi_id: e,
            container_type: o,
            targetIndex: t,
            cat_id: i[a].tag
        };
        this.lxClickSwiperTabHeader(n);
    },
    swiperTo: -1,
    onChangeSwiper: function(t) {
        var e = this, o = t.detail.current;
        this.setData({
            activePanel: o
        }), this.LogWhenChangeTabHeader(o), 1 === o ? (this.clearTimeout(this.swiperTo), 
        this.swiperTo = setTimeout(function() {
            e.loadCommentInfo(!0);
        }, 500)) : 2 === o && (this.clearTimeout(this.swiperTo), this.swiperTo = setTimeout(function() {
            e.loadPoiInfo();
        }, 500));
    },
    modalChange: function(t) {
        var e = this;
        if (this.data.modalShown) {
            var o = this;
            this.setData({
                headerInfoAnimation: "openCouponAnimationClass"
            }, function() {
                setTimeout(function() {
                    o.setData({
                        modalShown: !e.data.modalShown
                    });
                }, 200);
            });
        } else {
            var a = this.data.poiData.poi_info, i = this.data.container_type, n = {
                poi_id: a.id,
                container_type: i
            };
            a.discounts2.length > 0 && t.currentTarget.dataset.isdiscount && this.lxClickDiscounts(n), 
            this.setData({
                modalShown: !this.data.modalShown,
                headerInfoAnimation: "closeCouponAnimationClass"
            });
        }
    },
    onClickRefreshPage: function() {
        this.reload();
    },
    onClickChooseFood: function(t) {
        var e = t.currentTarget.dataset, o = e.id, a = e.item, n = this.store.getState().poi.spuMap[o];
        this.data.productInfo && this.data.productInfo.show && this.hideProductInfo();
        var r = i({}, n, {
            id: o,
            tag: a.tag
        });
        this.showModalFood(r);
    },
    onClickDelFood: function(t) {
        var e = t.currentTarget.dataset, o = e.id, a = e.attrs, i = e.foodid, n = this.store.getState().poi.skuMap[o].min_order_count;
        if (this.delFood({
            poiID: this.poiID,
            skuID: o,
            attrs: a || [],
            min: n
        }), this.closeCartIfEmpty(), this.data.addMoreScrollShow) {
            for (var r = this.data.addMoreSpuList, s = 0; s < r.length; s++) if (r[s].skuid === o && r[s].count > 0) {
                r[s].minOrderCount >= 2 && r[s].count === r[s].minOrderCount ? r[s].count -= r[s].minOrderCount : r[s].count -= 1, 
                r[s].totalPrice = q(r[s].count * r[s].price * 100);
                break;
            }
            this.setData({
                addMoreSpuList: r
            });
        }
        if (this.couponGoodsAddCnt >= 1) {
            for (var c = this.store.getState().poi.food_spu_tags, u = !1, d = 0; d < c.length; d++) {
                for (var p = 0; p < c[d].spus.length; p++) if (i === c[d].spus[p].id && [ 1, 2 ].indexOf(c[d].spus[p].activity_type) > -1) {
                    u = !0;
                    break;
                }
                if (u) break;
            }
            u && (this.couponGoodsAddCnt -= 1);
        }
        this.addMoreProcess(this.data.poiData);
    },
    onClickClearCart: function() {
        this.clearFood({
            poiID: this.poiID
        }), this.closeCartIfEmpty(), this.couponGoodsAddCnt = 0;
        var t = this.data.poiData.shopping_cart;
        t && t.activity_info && t.activity_info.content ? this.newCustomerProcess(t.activity_info.content) : this.setData({
            cartTipShow: !1,
            cartTip: null,
            addMoreShow: !1
        });
    },
    onClickAddFood: function(t, e) {
        var o = t.currentTarget.dataset, a = o.id, i = o.foodid, n = o.attrs, r = void 0 === n ? [] : n, s = o.item, c = this.data.cart, u = V(c, function(t) {
            var e = t.id;
            return a === e;
        }), d = u ? u.count : 0, p = this.store.getState().poi.skuMap[a];
        void 0 === p && this.lxLogWXAppError("UNDEFINED", void 0, {
            sku: p,
            id: a,
            source: "onClickAddFood"
        });
        var l = p.min_order_count, h = p.real_stock;
        if (-1 !== h && (l > h || d >= h)) this.toast({
            message: "商品已达库存上限"
        }); else {
            l > 1 && 0 === d && this.toast({
                message: "至少购买" + l + "份"
            }), e || this.LogWhenAddFood(s), this.addFood({
                poiID: this.poiID,
                skuID: a,
                attrs: r || [],
                real_stock: h,
                min: l,
                foodid: i
            });
            var f = this.data.cart, g = V(f, function(t) {
                return t.id === a;
            });
            null === g && this.lxLogWXAppError("NULL", void 0, {
                id: a,
                cart: f,
                source: "onClickAddFood"
            });
            var m = g.activity_type, _ = g.name, v = g.actvStock, S = g.restrict, y = g.needToast, T = g.count;
            if (1 === m || 2 === m) {
                this.couponGoodsAddCnt += 1;
                var x = this.data.poiData.shopping_cart;
                1 === this.couponGoodsAddCnt && x && x.activity_info && x.activity_info.policy && this.toast({
                    message: "满减与折扣/第二份半价商品不同享"
                });
            }
            if (y && 1 === m && (S < v && 0 !== S ? this.toast({
                message: "折扣菜品限购" + S + "份，超过" + S + "份恢复原价"
            }) : (0 === S && v !== 1 / 0 || 0 !== S && S > v) && this.toast({
                message: _ + "活动库存不足，部分已恢复原价"
            })), 2 === m && T === 2 * (v + 1) && this.toast({
                message: "可优惠份数不足，超过数量恢复原价"
            }), this.data.addMoreScrollShow) {
                for (var w = this.data.addMoreSpuList, C = 0; C < w.length; C++) if (w[C].skuid === a) {
                    w[C].minOrderCount >= 2 && 0 === w[C].count ? w[C].count += w[C].minOrderCount : w[C].count += 1, 
                    w[C].totalPrice = q(w[C].count * w[C].price * 100);
                    break;
                }
                this.setData({
                    addMoreSpuList: w
                });
            }
            this.addMoreProcess(this.data.poiData);
        }
    },
    LogWhenAddFood: function(t) {
        var e = this.data, o = e.poiData.poi_info, a = e.activeTypeIndex, i = this.store.getState().poi.food_spu_tags, n = this.data.container_type, r = void 0, s = !1;
        void 0 === i[a] && this.lxLogWXAppError("UNDEFINED ", void 0, {
            food_spu_tags: i,
            activeTypeIndex: a,
            source: "LogWhenAddFood"
        }), i[a].spus.forEach(function(e, o) {
            e.id === t.id && (r = o, s = !0);
        });
        var c = {
            poi_id: o.id,
            spu_id: t.id,
            category_id: i[a].tag,
            category_index: a,
            category_type: i[a].type,
            container_type: n,
            friend_praise: t.friends_praise_content ? 1 : 0,
            product_index: r
        };
        s && this.lxClickAddFood(c);
    },
    addMoreProcess: function(t) {
        var e = this, o = this.data, a = o.cartFoodCount, i = o.cartFoodPrice, n = o.addMoreScrollShow, r = t.poi_info.min_price, s = t.shopping_cart, c = parseFloat(i), u = !1;
        if (parseFloat(r) >= 10 && s && c >= s.min_fee_cart_tip && c < r && (this.setData({
            cartTipShow: !0,
            cartTip: [ "还差", q(100 * (r - c)) + "元", "就能起送" ]
        }), u = !0, n || this.fetchAddMoreList(r, c).then(function(t) {
            t && t.length > 0 && (e.setData({
                addMoreShow: !0,
                collect_type: 1
            }), e.lxAddMoreView({
                container_type: e.data.container_type,
                poi_id: e.poiID,
                collect_type: 1
            }));
        })), !u) {
            var d = this;
            setTimeout(function() {
                return d.addFullProcess(c, a, s);
            }, 0);
        }
    },
    addFullProcess: function(t, e, o) {
        var a = this, i = !1, n = this.data.addMoreScrollShow;
        !this.couponGoodsAddCnt || o.activity_info && o.activity_info.content ? e > 0 && o.activity_info && o.activity_info.policy && !o.activity_info.content && function() {
            var e = JSON.parse(o.activity_info.policy);
            if (Array.isArray(e)) for (var r = e.length, s = 0; s < r && "break" !== function(s) {
                var c = e[s], u = c.priceHigher, d = c.priceLower, p = c.reduce;
                return 0 === s && t < d ? (a.setData({
                    cartTipShow: !0,
                    cartTip: [ "再买", q(100 * (d - t)) + "元", "可减", p + "元" ]
                }), n || a.fetchAddMoreList(d, t).then(function(e) {
                    var i = d >= 10 && t < d && t >= o.full_minus_grad * d && !!e && e.length > 0;
                    a.setData({
                        addMoreShow: i,
                        collect_type: i ? 2 : 0
                    });
                }), i = !0, "break") : t >= d && t < u && s < r - 1 ? (a.setData({
                    cartTipShow: !0,
                    cartTip: [ "已减" + p + "元，再买", q(100 * (e[s + 1].priceLower - t)) + "元", "可减", e[s + 1].reduce + "元" ],
                    addMoreShow: !1
                }), n || a.fetchAddMoreList(u, t).then(function(i) {
                    var n = e[s + 1] && e[s + 1].priceLower >= 10 && t < e[s + 1].priceLower && t >= o.full_minus_grad * e[s + 1].priceLower && !!i && i.length > 0;
                    a.setData({
                        addMoreShow: n,
                        collect_type: n ? 2 : 0
                    });
                }), i = !0, "break") : void (s === r - 1 && t >= d && (a.setData({
                    cartTipShow: !0,
                    cartTip: [ "已满", d + "元", "可减", p + "元" ],
                    addMoreShow: !1
                }), i = !0));
            }(s); s++) ;
            var c = a;
            setTimeout(function() {
                var t = c.data, e = t.addMoreShow, o = t.collect_type, i = t.container_type;
                !t.addMoreScrollShow && e && 2 === o && a.lxAddMoreView({
                    container_type: i,
                    poi_id: a.poiID,
                    collect_type: o
                });
            }, 0);
        }() : this.setData({
            cartTip: null
        }), o.activity_info && o.activity_info.content ? this.newCustomerProcess(o.activity_info.content) : !i && 0 === this.couponGoodsAddCnt && o && o.prompt_text ? this.setData({
            cartTipShow: !0,
            cartTip: [ o.prompt_text ],
            addMoreShow: !1
        }) : i || this.setData({
            cartTip: null,
            addMoreShow: !1
        });
    },
    newCustomerProcess: function(t) {
        this.setData({
            cartTipShow: !0,
            cartTip: [ t ],
            addMoreShow: !1
        });
    },
    onAddMoreClick: function() {
        this.setData({
            addMoreScrollShow: !0,
            isHiddenGetMore: !1,
            cartTipAnimation: "openCartTipAnimationClass",
            isHiddenCart: !0
        });
        var t = this.data, e = t.collect_type, o = t.container_type;
        this.lxAddMoreClick({
            collect_type: e,
            container_type: o,
            poi_id: this.poiID
        });
    },
    closeAddMore: function() {
        this.setData({
            isHiddenGetMore: !0,
            cartTipAnimation: "closeCartTipAnimationClass",
            addMoreScrollShow: !1
        }), this.addMoreProcess(this.data.poiData);
    },
    fetchAddMoreList: function(t, a) {
        var i = this;
        return e(o.default.mark(function e() {
            var n, r, s, c, u, d, p, l;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!((n = i.data.addMoreSpuHistoryList).length > 0)) {
                        e.next = 11;
                        break;
                    }
                    r = 0;

                  case 3:
                    if (!(r < n.length)) {
                        e.next = 11;
                        break;
                    }
                    if (s = n[r], c = s.tp, u = s.op, d = s.spuList, c !== t || u !== a) {
                        e.next = 8;
                        break;
                    }
                    return i.setData({
                        addMoreListIndex: r,
                        addMoreSpuList: i.generateSpuList(d)
                    }), e.abrupt("return", d);

                  case 8:
                    r++, e.next = 3;
                    break;

                  case 11:
                    return i.loading(!0), e.prev = 12, e.next = 15, j({
                        wm_poi_id: i.poiID,
                        poi_min_price: t,
                        order_price: a
                    });

                  case 15:
                    return p = e.sent, i.setData({
                        addMoreSpuHistoryList: i.data.addMoreSpuHistoryList.concat({
                            tp: t,
                            op: a,
                            spuList: p
                        }),
                        addMoreListIndex: i.data.addMoreSpuHistoryList.length,
                        addMoreSpuList: i.generateSpuList(p)
                    }), i.loading(!1), i.data.isSuperMarket && i.productsCollect(p), e.abrupt("return", p);

                  case 22:
                    e.prev = 22, e.t0 = e.catch(12), l = e.t0.message, i.setData({
                        addMoreListIndex: -1
                    }), console.log("请求凑一凑商品列表error：", l);

                  case 27:
                    return i.loading(!1), e.abrupt("return", null);

                  case 29:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 12, 22 ] ]);
        }))();
    },
    generateSpuList: function(t) {
        var e = this, o = this.store.getState().cart, a = [];
        return t.forEach(function(t) {
            var i = o[e.poiID] && o[e.poiID].find(function(e) {
                return e.id === t.skus[0].id;
            }), n = i && i.count || 0;
            a.push({
                spuid: t.id,
                skuid: t.skus[0].id,
                name: t.name,
                price: t.min_price,
                minOrderCount: parseInt(t.skus[0].min_order_count, 10),
                count: n,
                totalPrice: q(n * t.min_price * 100)
            });
        }), a;
    },
    onClickGetCoupon: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var a, i, n, r, s, c, u, d, p, l;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t.loading(!0), a = t.store.getState(), i = a.user.token) {
                        e.next = 5;
                        break;
                    }
                    return t.navigateToLogin("coupon"), e.abrupt("return");

                  case 5:
                    return e.prev = 5, e.next = 8, P({
                        poi_id: t.poiID,
                        load_type: 1
                    });

                  case 8:
                    n = e.sent, r = "去领取", s = 0, n.wmEPoiCouponInfos && n.wmEPoiCouponInfos.forEach(function(t) {
                        s += t.price;
                    }), n.statusText2 = "快去下单吧", c = n.status, 0 === n.status ? (n.statusText = s, c = 1, 
                    r = "已领取") : 1 === n.status ? (n.limitNewCustom ? n.statusText = "不要贪心哦，您已领过券啦" : n.statusText = "您已领过券啦", 
                    r = "已领取") : 2 === n.status ? (n.statusText = "仅限本店新用户专享", n.statusText2 = "看看其他优惠吧") : (n.statusText = "券已抢光啦", 
                    n.statusText2 = "下次早点来哦", r = "已抢光"), u = t.data.poi_coupon_list.map(function(t) {
                        return g({}, t, {
                            status: c,
                            get_button_content: r
                        });
                    }), d = {
                        couponlist: n,
                        poi_coupon_list: u
                    }, t.setData(d), t.changeCoupon(), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(5), p = e.t0.code, l = e.t0.message, 401 === p ? t.alert({
                        message: l,
                        ok: function() {
                            t.navigateToLogin("coupon");
                        }
                    }) : t.alert({
                        message: l
                    });

                  case 26:
                    t.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 5, 21 ] ]);
        }))();
    },
    scrollProductsTime: 0,
    onScrollToupperProducts: function() {
        this.data.isSuperMarket || (W.hasAlreadyBeTop = !0, W.currentRightSrollTop = 0, 
        W.isAlreadyBeTopGoTop = "");
    },
    LogAllTagSpus: function(t, e, o) {
        e || (e = this.data.container_type), o || (o = this.poiID);
        var a = this;
        setTimeout(function() {
            var i = [];
            t.forEach(function(t, e) {
                t.spus.forEach(function(o) {
                    o.category_index = e, o.category_type = t.type;
                }), i = i.concat(t.spus);
            }), i.forEach(function(t, i) {
                var n = {
                    spu_id: t.id,
                    poi_id: o,
                    container_type: e,
                    friend_praise: t.friends_praise_content ? 1 : 0,
                    category_index: t.category_index,
                    product_index: i,
                    product_tag: t.tag
                };
                a.lxViewSpu(n);
            });
        }, 0);
    },
    LogViewTagSpus: function(t, e, o, a) {
        o || (o = this.data.container_type), a || (a = this.poiID);
        var i = this;
        setTimeout(function() {
            var n = t.type;
            0 !== t.spus.length && t.spus.forEach(function(r, s) {
                var c = {
                    spu_id: r.id,
                    poi_id: a,
                    container_type: o,
                    category_type: n,
                    friend_praise: r.friends_praise_content ? 1 : 0,
                    category_index: e,
                    product_index: s,
                    product_tag: t.tag
                };
                i.lxViewSpu(c);
            });
        }, 0);
    },
    onScrollBottomProducts: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var a, i, n, r, s, c, u, d, p, l, h, f;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, t.data.isSuperMarket) {
                        e.next = 6;
                        break;
                    }
                    W.hasAlreadyBeBottom = !1, t.data.isUnderSpuMaxNumber && (a = t.data, i = a.isUnderSpuMaxNumber, 
                    n = a.spuTagShouldShow, i && t.setData({
                        spuTagShouldShow: n.map(function() {
                            return !0;
                        })
                    })), e.next = 21;
                    break;

                  case 6:
                    if (r = t.store.getState(), s = r.poi.food_spu_tags, c = t.data.activeTypeIndex, 
                    !(u = s[c]).has_next_page) {
                        e.next = 21;
                        break;
                    }
                    if (d = Date.now(), !(Math.abs(d - t.scrollProductsTime) < 500)) {
                        e.next = 13;
                        break;
                    }
                    return e.abrupt("return");

                  case 13:
                    return t.loading(!0), t.scrollProductsTime = d, e.next = 17, t.api.spuTagProducts({
                        wm_poi_id: t.poiID,
                        spu_tag_id: u.tag,
                        tag_type: u.type,
                        page_index: u.current_page + 1
                    });

                  case 17:
                    p = e.sent, t.setProducts(p), l = t.store.getState(), h = l.poi.food_spu_tags, t.setData({
                        menuData: h[c]
                    });

                  case 21:
                    e.next = 27;
                    break;

                  case 23:
                    e.prev = 23, e.t0 = e.catch(0), f = e.t0.message, t.toast({
                        message: f
                    });

                  case 27:
                    t.loading(!1);

                  case 28:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 23 ] ]);
        }))();
    },
    chooseType: function(t) {
        var a = this, i = t.currentTarget.dataset.index;
        return e(o.default.mark(function t() {
            var e, n, r, s, c, u, d, p, l, h, f, g, m, _, v, S, y, T, x, w;
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, e = a.store.getState(), n = e.poi.food_spu_tags, r = n[i], s = a.data.poiData.poi_info, 
                    c = a.data.container_type, u = {
                        poi_id: s.id,
                        container_type: c,
                        category_index: i,
                        category_name: r.name,
                        category_type: r.type,
                        category_id: n[i].tag
                    }, a.lxClickLeftTab(u), !a.data.isSuperMarket || 0 !== r.spus.length) {
                        t.next = 29;
                        break;
                    }
                    return a.loading(!0), t.prev = 9, t.next = 12, a.api.spuTagProducts({
                        wm_poi_id: a.poiID,
                        spu_tag_id: r.tag,
                        tag_type: r.type,
                        page_index: 0
                    });

                  case 12:
                    d = t.sent, a.setProducts(d), p = a.store.getState(), l = p.poi.food_spu_tags, h = "", 
                    (f = l && l[i]) instanceof Object && f.spus[0] instanceof Object && (h = "spu-" + f.tag + "-" + f.spus[0].id), 
                    a.setData({
                        tagView: h,
                        activeTypeIndex: parseInt(i, 10) || 0,
                        menuData: f || {
                            name: (n[i] || {}).name,
                            spus: []
                        },
                        onLoadSpuIndex: -1
                    }), t.next = 24;
                    break;

                  case 21:
                    throw t.prev = 21, t.t0 = t.catch(9), t.t0;

                  case 24:
                    return t.prev = 24, a.loading(!1), t.finish(24);

                  case 27:
                    t.next = 30;
                    break;

                  case 29:
                    if (a.data.isUnderSpuMaxNumber) if (g = a.data.spuTagShouldShow, m = a.checkCurrentIfNeedToLoadMore(i), 
                    _ = a.data.spuTagPositionList, v = a.data.spuScrollHeight, g && _) {
                        if (S = g.map(function(t, e) {
                            return e <= i + m || t;
                        }), y = !0, _[_.length - 2] - _[i] < v && (y = !1), T = i, !y) for (x = _.length - 3; _[_.length - 2] - _[x] < v; x--) T = x - 1;
                        a.setData({
                            tagView: "spu-" + r.tag + "-" + r.spus[0].id,
                            tagViewName: y ? r.name : n[T].name,
                            tagViewDes: y ? r.description : n[T].description,
                            activeTypeIndex: i,
                            spuTagShouldShow: S,
                            onLoadSpuIndex: -1
                        });
                    } else a.toast({
                        message: "手速太快了，请稍后再试"
                    }); else a.loadTagFood("CHOOSE_TYPE", i);

                  case 30:
                    t.next = 36;
                    break;

                  case 32:
                    t.prev = 32, t.t1 = t.catch(0), w = t.t1.message, a.toast({
                        message: w
                    });

                  case 36:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 0, 32 ], [ 9, 21, 24, 27 ] ]);
        }))();
    },
    changeCart: function() {
        var t = this.data, e = t.isHiddenCart, o = t.cartFoodCount;
        if (!e || 0 !== o) {
            this.lxToggleCart({
                poi_id: this.poiID,
                container_type: this.data.container_type,
                shopcart_status: e ? 1 : 0
            });
            var a = {
                close: this.data.isIpx ? "closeCartAnimationClassOnIphoneX" : "closeCartAnimationClass",
                open: this.data.isIpx ? "openCartAnimationClassOnIphoneX" : "openCartAnimationClass"
            };
            if (e) this.setData({
                isHiddenCart: !e,
                cartAnimation: e ? a.open : a.close,
                isHiddenGetMore: !0,
                addMoreScrollShow: !1
            }); else {
                this.setData({
                    cartAnimation: e ? a.open : a.close,
                    addMoreScrollShow: !1,
                    isHiddenGetMore: !0
                });
                var i = this;
                setTimeout(function() {
                    i.setData({
                        isHiddenCart: !e
                    });
                }, 250);
            }
            this.addMoreProcess(this.data.poiData);
        }
    },
    changeCoupon: function() {
        var t = this.data.couponModalShown;
        this.setData({
            couponModalShown: !t
        });
    },
    submitTouchPoint: "",
    onClickCartFooter: function(t) {
        var a = this, i = t.target.dataset.action, n = t.detail, r = n.x, s = n.y;
        return e(o.default.mark(function t() {
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if ("submit" !== i) {
                        t.next = 7;
                        break;
                    }
                    return a.submitTouchPoint = r + "," + s, a.lxSubmitCart({
                        poi_id: a.poiID,
                        container_type: a.data.container_type
                    }), t.next = 5, a.onClickSubmit();

                  case 5:
                    t.next = 8;
                    break;

                  case 7:
                    "notsubmit" !== i && a.changeCart();

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    navigateToLogin: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.initLoginSDK({
            type: 1,
            afterLoginAction: t
        });
    },
    toggleCouponLayer: function() {
        var t = this, e = void 0;
        if ("closeCouponAnimationClass" === this.data.couponAnimation) {
            e = "openCouponAnimationClass";
            var o = this;
            this.setData({
                couponAnimation: e
            }, function() {
                setTimeout(function() {
                    o.setData({
                        ifCouponModalShouldShow: !t.data.ifCouponModalShouldShow
                    });
                }, 200);
            });
        } else e = "closeCouponAnimationClass", this.setData({
            ifCouponModalShouldShow: !this.data.ifCouponModalShouldShow,
            couponAnimation: e
        });
    },
    onClickSubmit: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var a, i, n, r, s, c, u, d, p, l, h, f, m;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (H({
                        event_type: "click",
                        val_bid: "b_oZO0D"
                    }), a = t.store, i = t.submitTouchPoint, n = a.getState(), r = n.user.token) {
                        e.next = 6;
                        break;
                    }
                    return t.navigateToLogin("submit"), e.abrupt("return");

                  case 6:
                    return t.loading(!0), e.prev = 7, s = t.poiID, c = t.hash_id, t.traceTagStart({
                        src_page: w,
                        src_page_object_id: s,
                        src_block: b,
                        tgt_page: C,
                        extra: {
                            poi_id: s
                        },
                        action: x
                    }), u = getApp().store.getState(), d = u.user.open_id, t.startLazyLoading(), e.next = 14, 
                    A({
                        trace_tag: t.traceTagEnd({
                            tgt_block: I
                        }),
                        touchPoint: i,
                        data: {
                            poicoupon_view_id: 0,
                            wx_pay_params: {
                                openid: d,
                                app_id: "wx2c348cf579062e56"
                            }
                        }
                    });

                  case 14:
                    p = e.sent, t.clearLazyLoading(), t.setToken({
                        token: p.token
                    }), (l = getApp()).previewData = p, wx.navigateTo({
                        url: "../preview/preview?hash_id=" + c
                    }), t.loading(!1), e.next = 52;
                    break;

                  case 23:
                    if (e.prev = 23, e.t0 = e.catch(7), h = e.t0.code, f = e.t0.message, p = e.t0.data, 
                    t.loading(!1), t.clearLazyLoading(), 3 !== h) {
                        e.next = 35;
                        break;
                    }
                    return t.alert({
                        message: f,
                        textOK: "知道了",
                        ok: function() {
                            for (var e = t.poiID, o = t.data.cart, a = Object.create(null), i = o.length - 1; i > -1; --i) {
                                var n = o[i];
                                a[n.id] = n;
                            }
                            var r = k(p).map(function(t) {
                                var e = t.id, o = t.stock;
                                return g({}, a[e], {
                                    count: Math.max(0, Math.min(a[e].count, o))
                                });
                            });
                            t.setSKUs({
                                poiID: e,
                                skus: r
                            });
                            var s = t.data, c = s.cartFoodCount;
                            s.isHiddenCart || t.setData({
                                isHiddenCart: !c
                            }), t.reload();
                        }
                    }), e.abrupt("return");

                  case 35:
                    if (5 !== h) {
                        e.next = 43;
                        break;
                    }
                    return t.setToken({
                        token: p.order_token
                    }), m = getApp(), m.verifyPhoneData = p, wx.navigateTo({
                        url: "../verify-phone/verify-phone"
                    }), e.abrupt("return");

                  case 43:
                    if (10 !== h && 401 !== h) {
                        e.next = 48;
                        break;
                    }
                    return t.navigateToLogin("submit"), e.abrupt("return");

                  case 48:
                    if (4 !== h) {
                        e.next = 51;
                        break;
                    }
                    return t.alert({
                        message: f,
                        ok: function() {
                            t.reload();
                        }
                    }), e.abrupt("return");

                  case 51:
                    t.toast({
                        message: f || "未知错误 " + h
                    });

                  case 52:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 7, 23 ] ]);
        }))();
    },
    closeCartIfEmpty: function() {
        var t = this.data, e = t.isHiddenCart, o = t.cartFoodCount;
        e || 0 !== o || this.setData({
            isHiddenCart: !0
        });
    },
    loadPoiInfo: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var a, i, n, r, s;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!t.data.poiInfo) {
                        e.next = 2;
                        break;
                    }
                    return e.abrupt("return");

                  case 2:
                    return t.loading(!0), e.prev = 3, e.next = 6, F({
                        wmpoiid: t.poiID
                    });

                  case 6:
                    for (a = e.sent, i = a.discounts2, n = i.length - 1; n > -1; --n) (r = i[n]).icon_url = p(r.icon_url, 0, 0, "o");
                    t.setData({
                        poiInfo: a
                    }), e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(3), s = e.t0.message, t.alert({
                        message: s
                    });

                  case 16:
                    t.loading(!1);

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 3, 12 ] ]);
        }))();
    },
    loadCommentInfo: function(t) {
        var a = this;
        return e(o.default.mark(function e() {
            var i, n, r, s, c, u, d, l, h, f, g, m, _, v, S, y;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t && a.setData({
                        poiCommentOffset: 0
                    }), null === a.data.poiCommentTotal || a.data.poiCommentOffset !== a.data.poiCommentTotal) {
                        e.next = 3;
                        break;
                    }
                    return e.abrupt("return");

                  case 3:
                    return a.loading(!0), a.setData({
                        loadingLogo: !0
                    }), e.prev = 5, e.next = 8, E({
                        wmpoiid: a.poiID,
                        comment_score_type: a.data.currentCategorieType,
                        label_id: a.data.label_id,
                        page_size: 20,
                        page_offset: a.data.poiCommentOffset
                    });

                  case 8:
                    for (i = e.sent, n = i.comment_categories.length - 1; n > -1; --n) r = i.comment_categories[n], 
                    i.comment_categories[n] = {
                        type: "",
                        content: ""
                    }, i.comment_categories[n].type = i.comment_score_type_infos[n].comment_score_type, 
                    i.comment_categories[n].content = r.replace(/\d+/g, function(t) {
                        return "(" + t + ")";
                    });
                    for (s = function(t) {
                        var e = t.url;
                        return p(e, 350, 350, 80);
                    }, c = function(t) {
                        var e = t.url;
                        return p(e, 750, 0, 80);
                    }, u = i.comments.length - 1; u > -1; --u) {
                        if (d = i.comments[u], d.comment_pics_preview = d.comment_pics.map(c), d.comment_pics_thumbnail = d.comment_pics.map(s), 
                        d.comment_pics = null, l = new Date(1e3 * d.comment_time), h = l.getMonth() + 1 >= 10 ? l.getMonth() + 1 : "0" + (l.getMonth() + 1), 
                        f = l.getDate() >= 10 ? l.getDate() : "0" + l.getDate(), d.comment_time = l.getFullYear() + "." + h + "." + f, 
                        d.comment_labels) for (g = 0; g < d.comment_labels.length - 1; g++) g < d.comment_labels.length - 1 && (d.comment_labels[g].content = d.comment_labels[g].content + ",");
                        if (d.praise_food_list) for (m = 0; m < d.praise_food_list.length - 1; m++) m < d.praise_food_list.length - 1 && (d.praise_food_list[m].name = d.praise_food_list[m].name + ",");
                    }
                    a.setData({
                        poiCommentTotal: i.filter_type_num
                    }), (_ = a.data.poiCommentOffset + 20) < i.filter_type_num ? a.setData({
                        poiCommentOffset: _
                    }) : a.setData({
                        poiCommentOffset: i.filter_type_num
                    }), t ? a.setData({
                        commentInfo: i
                    }) : (v = a.data.commentInfo, S = v.comments.concat(i.comments), v.comments = S, 
                    a.setData({
                        commentInfo: v
                    })), a.setData({
                        loadingLogo: !1
                    }), e.next = 25;
                    break;

                  case 20:
                    e.prev = 20, e.t0 = e.catch(5), y = e.t0.message, a.setData({
                        loadingLogo: !1
                    }), a.alert({
                        message: y
                    });

                  case 25:
                    a.loading(!1);

                  case 26:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 5, 20 ] ]);
        }))();
    },
    onClickCall: function() {
        var t = this.data.poiInfo.phone_list, e = t.map(function(t) {
            return "商家电话：" + t;
        });
        this.showPhoneCall({
            phones: t,
            texts: e
        });
    },
    onScrollBottom: function() {
        this.loadCommentInfo(), console.log("到底部了");
    },
    onClickCommentTag: function(t) {
        var e = t.currentTarget.dataset.index, o = this.data.commentInfo.comment_score_type_infos[e].comment_score_type;
        this.setData({
            currentCategorieType: o,
            label_id: 0
        }), this.loadCommentInfo(!0);
    },
    onClickLabelCommentTag: function(t) {
        var e = t.currentTarget.dataset.labelid;
        this.setData({
            label_id: e,
            currentCategorieType: 0
        }), this.loadCommentInfo(!0);
    },
    onClickPhotos: function(t) {
        var e = t.currentTarget.dataset, o = e.picarry, a = e.picnow;
        wx.previewImage({
            current: o[a],
            urls: o
        });
    },
    goBack: function() {
        var t = !1;
        try {
            var e = getCurrentPages();
            if (e.length > 1) for (var o = e.length - 2; o > -1; --o) {
                var a = e[e.length - 1];
                if (t = "index" === a.pageName || -1 !== a.__route__.indexOf("pages/index")) break;
            }
        } catch (t) {}
        t ? wx.navigateBack() : wx.switchTab({
            url: "/pages/index/index"
        });
    },
    LogWhenShowDiscounts: function(t, e) {
        var o = {
            poi_id: t,
            container_type: e
        };
        this.lxShowDiscounts(o);
    },
    initPoiIdAndContainerTypeForLx: function(t) {
        var e = void 0;
        return e = t && 1 === t.code ? 1 : 10, this.setData({
            container_type: e
        }), e;
    },
    reload: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var i, n, r, s, c, u, d, l, h, f, g, m, _, v, S, y, T, x, w, C, b, I, k, L, A, P, F, E, O, j, H, B, N, q, V, U, J, Z, Q, $, tt, et, ot, at, it, nt, rt, st, ct, ut, dt, pt, lt, ht, ft, gt, mt, _t;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.loading(!0), i = t.onLoadFocus || {}, n = i.spu_id, r = void 0 === n ? "" : n, 
                    e.prev = 2, e.next = 5, M({
                        wm_poi_id: t.poiID,
                        product_spu_id: r,
                        trace_tag: t.traceTagEnd({
                            tgt_block: D
                        })
                    });

                  case 5:
                    for (s = e.sent, c = s.poi_info, u = c.id, d = c.status, l = c.name, h = c.discounts2, 
                    f = c.poi_coupon, g = s.container_operation_source.poi_coupon_list, m = s.shopping_cart, 
                    _ = s.container_template, t.poiID = u, v = h.length - 1; v > -1; --v) (S = h[v]).icon_url = p(S.icon_url, 0, 0, "o");
                    if (t.setNavigationBarTitle({
                        title: l
                    }), y = [], f && f.coupon_list.length > 0 ? (f.coupon_list.forEach(function(t, e) {
                        if (0 === t.coupon_status) t.feId = e, y.push(t); else if (1 === t.coupon_status) {
                            for (var o = !1, a = 0, i = 0; i < e; i++) y[i] && 1 === y[i].coupon_status && t.coupon_value === y[i].coupon_value && (o = !0, 
                            a = i);
                            o ? (y[a].isMutiple = !0, y[a].mutipleCount += 1) : (t.mutipleCount = 1, t.isMutiple = !1, 
                            y.push(t));
                        }
                    }), t.setData({
                        poi_coupon_list: g,
                        poi_coupon: y,
                        poi_coupon_big: f.coupon_list
                    })) : t.setData({
                        poi_coupon_list: g,
                        poi_coupon: [],
                        ifCouponModalShouldShow: !1
                    }), t.loadedPoiData(s), T = t.store.getState(), x = T.poi, t.validateCart(t.poiID, {
                        skuIds: Object.keys(x.skuMap).filter(function(t) {
                            return 0 === x.skuMap[t].status;
                        })
                    }), w = t.initPoiIdAndContainerTypeForLx(_), d === G.normal) {
                        e.next = 33;
                        break;
                    }
                    C = "门店不可配送，请重试", b = "知道了", e.t0 = d, e.next = e.t0 === G.busy ? 22 : e.t0 === G.closed ? 24 : e.t0 === G.offline ? 29 : 31;
                    break;

                  case 22:
                    return C = "门店忙碌中，请一会再来噢", e.abrupt("break", 32);

                  case 24:
                    return C = "本店打烊了，暂时不接受新订单", b = "关闭", t.setData({
                        offlineMessage: "本店打烊了"
                    }), t.lxViewShopInRest({
                        poi_id: t.poiID,
                        container_type: w
                    }), e.abrupt("break", 32);

                  case 29:
                    return C = "商家已经下线", e.abrupt("break", 32);

                  case 31:
                    return e.abrupt("break", 32);

                  case 32:
                    t.confirm({
                        message: C,
                        textOK: "逛逛别的",
                        textCancel: b,
                        ok: function() {
                            t.goBack();
                        }
                    });

                  case 33:
                    t.error(), h.length > 0 && t.LogWhenShowDiscounts(t.poiID, w), I = t.store.getState(), 
                    k = I.poi.food_spu_tags, L = t.onLoadFocus, A = R(k, L), P = a(A, 3), F = P[0], 
                    E = P[1], O = P[2], j = t.data.activeTypeIndex, H = "number" == typeof j && !isNaN(j) && j >= 0 && j < k.length, 
                    B = 0, B = -1 !== F ? F : H ? j : 0, N = -1 !== F && L && L.spu_id ? L.spu_id : "", 
                    Y = f && 0 !== f.coupon_list.length ? {
                        up: X[1].up,
                        down: X[1].down,
                        scrollTop: z[1]
                    } : {
                        up: X[0].up,
                        down: X[0].down,
                        scrollTop: z[0]
                    }, q = 0, V = !1, k.forEach(function(t) {
                        q += t.spus.length;
                    }), -1 !== F && k[F] && k[F].spus instanceof Array && k[F].spus[E] instanceof Object && (k[F].spus[E].highlight = !0), 
                    U = 1 === s.container_template.code, q <= 200 && !U && (V = !0), V && !U ? (t.LogAllTagSpus(k, w, t.poiID), 
                    J = k.map(function(t) {
                        return {
                            name: t.name,
                            tag: t.tag,
                            icon: t.icon
                        };
                    }), wx.getSystemInfo({
                        success: function(t) {
                            var e = t.SDKVersion[1], o = t.SDKVersion[3];
                            1 === e && o < 4 && (K = !0);
                        }
                    }), Z = [], Q = Math.max(0, F), $ = Math.max(0, E + 1), tt = t.checkCurrentIfNeedToLoadMore(Q, $), 
                    K ? Z = k.map(function() {
                        return !0;
                    }) : (Z = k.map(function() {
                        return !1;
                    })).forEach(function(t, e) {
                        e <= tt && (Z[e] = !0);
                    }), et = -1 !== F ? F : tt, ot = -1 !== F ? k[et].name : k[0].name, at = -1 !== F ? k[et].description : k[0].description, 
                    t.data.throttleDelay, t.setData({
                        menuTabs: J,
                        isUnderSpuMaxNumber: V,
                        activeTypeIndex: B,
                        mainScrollTop: "" === t.data.mainScrollTop ? Y.scrollTop : t.data.mainScrollTop,
                        spuTagShouldShow: t.data.spuTagShouldShow ? t.data.spuTagShouldShow : Z,
                        tagViewName: t.data.tagViewName ? t.data.tagViewName : ot,
                        tagViewDes: t.data.tagViewDes ? t.data.tagViewDes : at,
                        food_spu_tags: k
                    }, function() {
                        K || (t.getSpuTagEachHeight(), t.getSpuScrollHeight(), t.getEmptySoltHeight());
                    })) : (it = k[B], nt = B, t.LogViewTagSpus(it, nt, w, t.poiID), rt = k.map(function(t) {
                        return {
                            name: t.name,
                            tag: t.tag,
                            icon: t.icon
                        };
                    }), t.setData({
                        isUnderSpuMaxNumber: V,
                        menuTabs: rt,
                        menuData: it,
                        activeTypeIndex: B,
                        mainScrollTop: Y.scrollTop
                    }), W.hasAlreadyBeTop = !0, W.hasAlreadyBeBottom = !0, W.currentRightSrollTop = 0), 
                    N && t.setData({
                        onLoadTagIndex: F,
                        onLoadSpuIndex: E,
                        onLoadFocusSpu: N,
                        onLoadFocusTag: O
                    }), st = getApp(), ct = st.restaurantBuyAgain, st.restaurantBuyAgain = null, ct && ((ut = ct.message) && t.alert({
                        message: ut,
                        textOK: "知道了"
                    }), t.tryShowCart()), dt = t.store.getState(), (pt = dt.cart) && pt[t.poiID] && pt[t.poiID].length > 0 ? t.addMoreProcess(s) : m && m.activity_info && m.activity_info.content && t.newCustomerProcess(m.activity_info.content), 
                    t.setData({
                        dataIsLoaded: !0
                    }), t.loading(!1), e.next = 70;
                    break;

                  case 62:
                    e.prev = 62, e.t1 = e.catch(2), lt = e.t1.code, C = e.t1.message, ht = e.t1.data, 
                    t.loading(!1), t.setData({
                        dataIsLoaded: !0
                    }), 1 === lt ? (ft = 0, t.error({
                        ok: function() {
                            clearInterval(ft), wx.switchTab({
                                url: "/pages/index/index"
                            });
                        },
                        textOK: "回到首页",
                        message: "链接已失效"
                    }), gt = t.data.error, mt = 3, gt.textOK = "回到首页" + mt, t.setData({
                        error: gt
                    }), _t = t, ft = setInterval(function() {
                        mt -= 1, gt.textOK = "回到首页" + mt, mt <= 0 && (clearInterval(ft), wx.switchTab({
                            url: "/pages/index/index"
                        })), _t.setData({
                            error: gt
                        });
                    }, 1e3), t.loading(!1)) : 513001 === lt ? t.error({
                        message: "商家休息中",
                        textOK: "逛逛别的",
                        ok: function() {
                            t.goBack();
                        }
                    }) : t.error({
                        message: "啊哦，出错了，请重试",
                        textOK: "重新加载",
                        ok: function() {
                            t.reload();
                        }
                    });

                  case 70:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 2, 62 ] ]);
        }))();
    },
    tryShowCart: function() {
        var t = this.data.cartFoodCount;
        this.setData({
            isHiddenCart: !t
        });
    },
    onShow: function() {
        var t = this;
        return e(o.default.mark(function e() {
            var a, i, n, r, s, c, u, d, p;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a = getApp(), i = a.yodaVerifyData, n = a.afterLoginAction, a.yodaVerifyData = "", 
                    i && !n && (r = i.status, s = i.requestCode, c = i.responseCode, u = i.code, d = i.msg, 
                    "1" !== r && "0" !== r || t.getLoginStatus({
                        status: r,
                        requestCode: s,
                        responseCode: c,
                        code: u,
                        msg: d
                    })), a.showCart && (a.showCart = !1, t.tryShowCart()), t.data.isSuperMarket) {
                        e.next = 8;
                        break;
                    }
                    return e.next = 8, t.reload();

                  case 8:
                    t.closeCartIfEmpty(), p = a.orderValidated, n && (a.afterLoginAction = "", "submit" === n ? t.onClickSubmit() : "coupon" === n && t.onClickGetCoupon()), 
                    p && (a.orderValidated = !1, t.onClickSubmit());

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onLoad: function(t) {
        var e = t.poi_id, o = t.cat_id, a = void 0 === o ? 0 : o, i = t.hash_id, n = void 0 === i ? "" : i, r = t.spu_id, s = void 0 === r ? "" : r, c = t.tag, u = void 0 === c ? "" : c, d = t.from, p = t.scene;
        if (p) {
            var l = (p = decodeURIComponent(p)).match(/poi\!\w*/)[0];
            l && l.split("!")[1] && (e = l.split("!")[1], this.poi_id = e);
        }
        s && (this.onLoadFocus = {
            spu_id: s,
            tag: u
        }), this.poiID = e, this.cat_id = a, this.hash_id = n, this.loadFrom = {
            poi_id: e,
            cat_id: a,
            hash_id: n,
            spu_id: s,
            tag: u,
            from: d,
            scene: p
        }, "orders" === d && this.setRecipient({
            id: 0,
            phone: "",
            name: "",
            address: "",
            house_number: "",
            gender: "",
            latitude: "",
            longitude: ""
        }), this.loadPoiData(e);
    },
    onUnload: function() {
        this.unload();
    },
    onShareAppDesc: function() {
        try {
            var t = this.data.poiData.poi_info.name;
            return f(y).replace(/å/g, t);
        } catch (t) {
            console.error(t);
        }
        return "";
    },
    onShareAppMessage: function() {
        var t = this.pageName || "unknown";
        return {
            title: "美团外卖",
            desc: this.onShareAppDesc(),
            path: "/pages/restaurant/restaurant?poi_id=" + this.poiID + "&from=from_share_" + t
        };
    },
    getReportData: function() {
        return {
            cid: "c_CijEL",
            val: {
                poi_id: this.poiID,
                order_id: this.hash_id,
                cat_id: this.cat_id
            }
        };
    },
    touchEnd: function(t) {
        var e = this.data.activeTypeIndex, o = t.changedTouches[0].clientY, a = o - W.touchStartPosition, i = o - W.touchStartPosition > 0, n = i ? a : -a;
        if ((this.data.isUnderSpuMaxNumber || this.data.isSuperMarket) && this.data.isUnderSpuMaxNumber && this.data.throttleDelay && !K) {
            var r = this;
            setTimeout(function() {
                r.findCurrentPosition(W.scrollTopRecord);
            }, this.data.throttleDelay);
        }
        var s = this.data, c = s.cartTip, u = s.poiData.shopping_cart;
        !i && null === c && u && u.prompt_text && n > 5 && 0 === this.couponGoodsAddCnt ? this.setData({
            cartTipShow: !0,
            cartTip: [ u.prompt_text ]
        }) : (W.hasAlreadyBeTop || !W.isScollFunctionActived) && i && c && c[0] === u.prompt_text && 0 === e && this.setData({
            cartTipShow: !1,
            cartTip: null
        });
    },
    loadTagFood: function(t, e) {
        var o = this.data.activeTypeIndex, a = this.store.getState().poi.food_spu_tags, i = -1;
        switch (t) {
          case "PREVIOUS":
            i = o - 1;
            break;

          case "NEXT":
            i = o + 1;
            break;

          default:
            i = e;
        }
        i < 0 || i >= a.length || (this.LogViewTagSpus(a[i], i), "PREVIOUS" !== t && this.setData({
            menuData: {
                name: a[i].name,
                spus: []
            }
        }), this.setData({
            menuData: a[i],
            activeTypeIndex: i
        }), W.hasAlreadyBeTop = !0, W.hasAlreadyBeBottom = !0, W.isScollFunctionActived = !0, 
        W.isStarted = !1, W.currentRightSrollTop = 0, W.isAlreadyBeTopGoTop = "", W.isAlreadyBeTopGoDown = "");
    },
    touchStart: function(t) {
        this.setData({
            isScollFunctionActived: !1
        }), W.touchStartPosition = t.changedTouches[0].clientY;
    },
    LogWhenLeftTabScroll: function() {
        var t = this.data, e = t.poiData.poi_info, o = t.activeTypeIndex, a = this.store.getState().poi.food_spu_tags, i = this.data.container_type;
        null === a[o] && this.lxLogWXAppError("NULL", void 0, {
            food_spu_tags: a,
            activeTypeIndex: o,
            source: "LogWhenLeftTabScroll"
        });
        var n = {
            poi_id: e.id,
            category_id: a[o].tag,
            category_index: o,
            category_name: a[o].name,
            category_type: a[o].type,
            container_type: i
        };
        this.lxScrollLeftTab(n);
    },
    scrollLeft: U(function() {
        this.LogWhenLeftTabScroll();
    }, 100),
    scroll: function(t) {
        var e = t.detail.scrollTop;
        this.data.isUnderSpuMaxNumber && e > 0 && (this.data.throttleDelay ? W.scrollTopRecord = e : K || this.findCurrentPosition(e));
        var o = this.data, a = o.cartTip, i = o.poiData.shopping_cart;
        0 === o.activeTypeIndex && e < 5 && a && a[0] === i.prompt_text && this.setData({
            cartTipShow: !1,
            cartTip: null
        });
    },
    onClickPoiService: function(t) {
        2 === t.target.dataset.type && this.alert({
            title: "极速退款规则说明",
            messagelist: [ "1. 极速退款是商家为用户提供的退款权益，用户可在骑手服务/商家配送前使用该权益", "2. 选择极速退款后无需商家同意即可直接退款至您的支付账户", "3. 用户每周享有2次极速退款权益。如有刷单、恶意退款等行为将取消极速退款权益", "4. 仅全单退款且金额少于200元的在线支付订单可使用极速退款权益", "5. 如有其它问题，请咨询客服，美团外卖保留法律允许范围内的活动解释权" ],
            textOK: "知道了"
        });
    },
    getCoupon: function(t) {
        var a = this, i = t.currentTarget.dataset, n = i.item, r = i.index;
        return e(o.default.mark(function t() {
            var e, i, s, c, u, d, p, l, h;
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, e = a.store.getState(), i = e.user.token) {
                        t.next = 5;
                        break;
                    }
                    return a.navigateToLogin(), t.abrupt("return");

                  case 5:
                    if (n.coupon_status) {
                        t.next = 16;
                        break;
                    }
                    return s = {
                        wm_poi_id: a.poiID,
                        coupon_pool_id: n.coupon_pool_id,
                        activity_id: n.activity_id,
                        coupon_id: n.coupon_id
                    }, t.next = 9, O(s);

                  case 9:
                    c = t.sent, u = {
                        coupon_status: c.coupon_status,
                        index: r
                    }, a.updateThisCoupon(u), d = a.store.getState(), p = d.poi.data.poi_info.poi_coupon, 
                    l = [], p.coupon_list.forEach(function(t, e) {
                        if (0 === t.coupon_status) t.feId = e, l.push(t); else if (1 === t.coupon_status) {
                            for (var o = !1, a = 0, i = 0; i < e; i++) l[i] && 1 === l[i].coupon_status && t.coupon_value === l[i].coupon_value && (o = !0, 
                            a = i);
                            o ? (l[a].isMutiple = !0, l[a].mutipleCount += 1) : (t.mutipleCount = 1, t.isMutiple = !1, 
                            l.push(t));
                        }
                    }), a.setData({
                        poi_coupon: l,
                        poi_coupon_big: p.coupon_list
                    });

                  case 16:
                    t.next = 22;
                    break;

                  case 18:
                    t.prev = 18, t.t0 = t.catch(0), h = t.t0.message, a.toast({
                        message: h || "领取失败，请稍后再试"
                    });

                  case 22:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 0, 18 ] ]);
        }))();
    }
};

(0, n.page)(h(J, B(function(t) {
    var e = t.poi.data, o = N(t), a = o.count, i = o.countMap, n = o.cents, r = o.boxCents, s = o.needCents, c = o.cart, u = o.alreadySelecCount, d = q(n), p = s ? q(s) : "", l = q(r);
    return c.forEach(function(t) {
        t.priceTotal = q(t.cents);
    }), {
        poiData: e,
        isSuperMarket: 1 === (e && e.container_template && e.container_template.code),
        cart: c,
        cartBoxPrice: l,
        cartCountMap: i,
        cartFoodCount: a,
        cartFoodPrice: d,
        priceToGo: p,
        alreadySelecCount: u
    };
}, function(t) {
    return {
        loadPoiData: function(e) {
            t((0, r.request)({
                id: e
            }));
        },
        loadedPoiData: function(e) {
            t((0, r.loaded)({
                data: e
            }));
        },
        addFood: function(e) {
            t((0, c.add)(e));
        },
        delFood: function(e) {
            t((0, c.del)(e));
        },
        clearFood: function(e) {
            t((0, c.clear)(e));
        },
        unload: function() {
            t((0, r.exit)());
        },
        setToken: function(e) {
            t((0, s.setToken)(e));
        },
        setRecipient: function(e) {
            t((0, s.setRecipient)(e));
        },
        setSKUs: function(e) {
            t((0, c.setSKUs)(e));
        },
        setProducts: function(e) {
            t((0, r.products)({
                data: e
            }));
        },
        productsCollect: function(e) {
            t((0, r.productsCollect)({
                data: e
            }));
        },
        updateThisCoupon: function(e) {
            t((0, r.getCoupon)({
                data: e
            }));
        },
        validateCart: function(e, o) {
            t((0, c.validate)({
                poiID: e,
                data: o
            }));
        }
    };
}), _, v, S, l, m, u.default, d));