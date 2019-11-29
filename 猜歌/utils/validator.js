String.format = function() {
    if (0 == arguments.length) return null;
    for (var u = arguments[0], r = 1; r < arguments.length; r++) {
        var n = new RegExp("\\{" + (r - 1) + "\\}", "gm");
        u = u.replace(n, arguments[r]);
    }
    return u;
};

var u = {
    required: function(u, r) {
        return 0 == r || !!u;
    },
    mobile: function(u) {
        return !u || !!u && /^1(3|4|5|6|7|8|9)\d{9}$/.test(u);
    },
    maxLength: function(u, r) {
        return !u || !!u && u.length <= parseInt(r);
    },
    minLength: function(u, r) {
        return !u || !!u && u.length >= parseInt(r);
    },
    minValue: function(u, r) {
        return !u && !(u + "") || u >= r;
    },
    maxValue: function(u, r) {
        return !u || u <= r;
    },
    inequalTo: function(u, r) {
        return !!u && u.length >= parseInt(this.props.minCharacters);
    },
    email: function(u) {
        var r = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return !u || r.test(u);
    },
    strong: function(u) {
        return new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}").test(u);
    },
    equals: function(u, r) {
        return u === r;
    },
    bigger: function(u, r) {
        return u > r;
    },
    number: function(u, r) {
        new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}");
        return /^[-\+]?\d+$/.test(u) || /^[-\+]?\d+(\.\d+)?$/.test(u);
    },
    bankCard: function(u) {
        for (var r = u.substr(u.length - 1, 1), n = u.substr(0, u.length - 1), e = [], F = n.length - 1; F > -1; F--) e.push(n.substr(F, 1));
        for (var t = [], a = [], s = [], i = 0; i < e.length; i++) (i + 1) % 2 == 1 ? 2 * parseInt(e[i]) < 9 ? t.push(2 * parseInt(e[i])) : a.push(2 * parseInt(e[i])) : s.push(e[i]);
        for (var o = [], f = [], x = 0; x < a.length; x++) o.push(parseInt(a[x]) % 10), 
        f.push(parseInt(a[x]) / 10);
        for (var l = 0, g = 0, p = 0, D = 0, h = 0, m = 0; m < t.length; m++) l += parseInt(t[m]);
        for (var d = 0; d < s.length; d++) g += parseInt(s[d]);
        for (var c = 0; c < o.length; c++) p += parseInt(o[c]), D += parseInt(f[c]);
        return h = parseInt(l) + parseInt(g) + parseInt(p) + parseInt(D), r == 10 - (parseInt(h) % 10 == 0 ? 10 : parseInt(h) % 10);
    },
    money: function(u, r) {
        var n = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        return !u || !!u && n.test(u);
    },
    isInt: function(u, r) {
        var n = parseInt(u);
        return !u || !!u && n + "" == u;
    },
    multiples: function(u, r) {
        return !u || u % r == 0;
    },
    isValid: function(r, n) {
        var e = {};
        for (var F in n) if (F && u[F] && "message" != F && !u[F](r, n[F])) {
            e[F] = n.message && n.message[F] ? n.message && n.message[F] : u.message[F];
            break;
        }
        return e;
    },
    isValids: function(r, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, F = {};
        for (var t in n) {
            var a = n[t];
            for (var s in a) if (s && void 0 != a[s] && u.hasOwnProperty(s) && "function" == typeof u[s] && 0 == u[s](r[t], a[s])) {
                var i = e.hasOwnProperty(t) && e[t] && e[t].hasOwnProperty(s) ? e[t][s] : "", o = u.message[s];
                F[t] = String.format(i || o, a[s]);
                break;
            }
        }
        return F;
    },
    showError: function(u) {
        for (var r in u) {
            showInfo(u[r]);
            break;
        }
    },
    message: {
        required: "必须填写",
        strong: "密码中必须包含字母、数字，至少6个字符，最多30个字符",
        email: "填写有效的邮箱地址",
        equals: "需与目标相同",
        bigger: "需大于目标",
        maxLength: "最多填写{0}个字",
        minLength: "至少填写{0}个字",
        mobile: "输入正确的手机号码",
        number: "输入有效的数字",
        minValue: "输入值必须大于{0}",
        maxValue: "输入值必须小于{0}",
        bankCard: "请输入正确的银行卡号",
        money: "输入正确的金额",
        isInt: "输入整数",
        multiples: "请填写{0}的倍数数值"
    }
};

module.exports = {
    isValid: u.isValid,
    isValids: u.isValids,
    showError: u.showError
};