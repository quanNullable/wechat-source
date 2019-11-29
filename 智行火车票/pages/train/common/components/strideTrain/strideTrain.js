function t(t) {
    if (Array.isArray(t)) {
        for (var r = 0, a = Array(t.length); r < t.length; r++) a[r] = t[r];
        return a;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: {
        CrossStationGrabTicketInfoList: [],
        CrossStationGrabTicketExtraAmount: 0
    },
    methods: {
        CrossStationGrabTicketGetCrossStationGrabExtraAmount: function() {
            var r = this.data.CrossStationGrabTicketInfoList, a = 0;
            if (r.length > 0) {
                var e = r.filter(function(t) {
                    return t.isCrossStationGrabCheckoutSelected;
                }).map(function(t) {
                    return t.f_extraAmount;
                });
                a = Math.max.apply(Math, [ 0 ].concat(t(e)));
            }
            return a;
        }
    }
};