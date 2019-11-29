var s = require("../utils/apiCaller.js");

module.exports = {
    getValidateCode: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, s.post)("api/sms/vcode", {
            data: e,
            success: t
        });
    },
    validCode: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, s.post)("api/sms/vcode/valid", {
            data: e,
            success: t
        });
    }
};