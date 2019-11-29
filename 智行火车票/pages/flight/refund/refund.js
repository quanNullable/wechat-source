function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../cwx/cwx"), a = require("../common/model"), i = e(require("../common/cDate")), n = e(require("../common/util"));

(0, t.CPage)({
    data: {
        sIdx: -1,
        contactPhone: "",
        reasonId: -1,
        refundInfo: {},
        refundRuleArr: [],
        reasonList: [],
        price: 0,
        priceInfos: [],
        isPriceDetailOpen: !1,
        isPriceUndetermined: !1
    },
    onLoad: function(e) {
        var a = e.data.refundInfo || {};
        this.handleRefundData(a), console.log("refundConditionInfo:", a), this.setData({
            contactPhone: t.cwx.user.userName || "",
            refundInfo: a,
            refundRuleArr: e.data.refundRuleArr || []
        });
    },
    handleRefundData: function(e) {
        0 != Object.keys(e).length && e.segmentList.forEach(function(e, t) {
            var a = new i.default(e.departDateTime.replace(/-/g, "/"));
            e.departDate_display = a.format("m-d D");
        });
    },
    onRule: function(e) {
        var t = e.currentTarget.dataset.value, a = this.data.refundRuleArr[t];
        a = a.slice(0, a.length - 4) || "", n.default.showModal({
            m: a.replace(/\<br\/\>/g, "\n").replace(/\<b\>/g, "").replace(/\<\/b\>/g, "")
        });
    },
    onPassengerClick: function(e) {
        var a, i = e.currentTarget.dataset.sIdx, s = e.currentTarget.dataset.pIdx, r = this.data.refundInfo;
        this.data.sIdx < 0 ? (this.data.sIdx = i, r.segmentList[i].tickets[s].isSelected = !0) : i != this.data.sIdx ? n.default.showModal({
            m: "一次只能退同一个航班的乘客"
        }) : (r.segmentList[i].tickets[s].isSelected = !r.segmentList[i].tickets[s].isSelected, 
        t._.find(r.segmentList[i].tickets, function(e) {
            return e.isSelected;
        }) || (this.data.sIdx = -1, a = [])), this.updatePriceDetail(r), this.setData({
            isPriceUndetermined: this.data.isPriceUndetermined,
            price: this.data.price,
            priceInfos: this.data.priceInfos,
            refundInfo: r,
            reasonList: a || r.segmentList[i].refundReasons
        });
    },
    updatePriceDetail: function(e) {
        var t = this;
        if (this.data.sIdx < 0) this.data.price = 0, this.data.priceInfos = []; else {
            var a = 0, i = {}, n = {};
            e.segmentList[this.data.sIdx].tickets.forEach(function(e) {
                e.isSelected && (!e.priceDetails || e.priceDetails.length <= 0 || !e.refundPriceDetails || e.refundPriceDetails.length <= 0 ? t.data.isPriceUndetermined = !0 : (e.priceDetails.forEach(function(e) {
                    var t = e.title + e.price;
                    i[t] || (i[t] = {
                        title: e.title,
                        count: 0,
                        price: e.price
                    }), "P" == e.type ? i[t].count += 1 : i[t].count = 1;
                }), e.refundPriceDetails.forEach(function(e) {
                    var t = e.title + e.price;
                    n[t] || (n[t] = {
                        title: e.title,
                        count: 0,
                        price: e.price
                    }), "P" == e.type ? n[t].count += 1 : n[t].count = 1;
                })));
            });
            var s = [ {
                title: "已付款项",
                priceDetails: []
            }, {
                title: "需扣款项",
                priceDetails: []
            } ];
            Object.keys(i).forEach(function(e) {
                a += i[e].count * i[e].price, s[0].priceDetails.push({
                    title: i[e].title,
                    count: i[e].count,
                    price: i[e].price
                });
            }), Object.keys(n).forEach(function(e) {
                a += n[e].count * n[e].price, s[1].priceDetails.push({
                    title: n[e].title,
                    count: n[e].count,
                    price: n[e].price
                });
            }), this.data.price = a, this.data.priceInfos = s;
        }
    },
    onPriceDetail: function() {
        this.data.price <= 0 || this.setData({
            isPriceDetailOpen: !this.data.isPriceDetailOpen
        });
    },
    onReasonClick: function(e) {
        var t = e.currentTarget.dataset.value, a = this.data.reasonList;
        a.forEach(function(e, a) {
            e.isSelected = a == t && !e.isSelected;
        }), this.data.reasonId = this.data.reasonList[t].isSelected ? this.data.reasonList[t].reasonId : -1, 
        this.setData({
            reasonList: a
        });
    },
    onPhoneNumber: function(e) {
        this.setData({
            contactPhone: e.detail.value
        });
    },
    onSubmit: function() {
        if (this.data.sIdx < 0) n.default.showModal({
            m: "请选择退票乘客"
        }); else if (this.data.reasonId < 0) n.default.showModal({
            m: "请选择退票原因"
        }); else {
            var e = this.data.refundInfo.segmentList[this.data.sIdx], t = [];
            e.tickets.forEach(function(a) {
                a.isSelected && t.push({
                    vendorOrderNumber: e.vendorOrderNumber,
                    filghtNumber: e.filghtNumber,
                    segmentNo: e.segmentNo,
                    sequence: e.sequence,
                    subId: e.subId,
                    passengerName: a.passengerName,
                    passengerId: a.passengerId
                });
            });
            var i = {
                data: {
                    orderNumber: this.data.refundInfo.oid,
                    flightChangeOrderID: this.data.refundInfo.changeOrderId,
                    contactPhone: this.data.refundInfo.contactPhone,
                    reasonId: this.data.reasonId,
                    returnSegments: t
                }
            };
            n.default.showLoading("正在提交退票申请");
            var s = this;
            (0, a.ReturnTicketModel)(i, function(e) {
                n.default.hideLoading();
                var t = e.resultCode, a = e.resultMessage;
                1 == t ? s.navigateBack() : a && wx.showModal({
                    showCancel: !1,
                    content: a,
                    success: function(e) {}
                });
            }, function(e) {
                n.default.showWaringDialog("退票失败，请稍候重试");
            }, function() {});
        }
    }
});