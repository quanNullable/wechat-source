var t = require("../../../cwx/cwx"), e = require("../common/service");

(0, t.CPage)({
    pageId: t.cwx.config.isTieyou ? "10650001040" : "10650001039",
    data: {
        oid: "",
        relationGuid: "",
        isGetAnswer: "",
        questionTitle: "",
        questionAnswer: [],
        QuestionList: [],
        currentIndex: "",
        questionAnswerList: {},
        isShow: !0
    },
    onLoad: function(t) {
        var e = t.data, n = e.item, i = void 0 === n ? {} : n, s = e.oid, r = e.isGetAnswer;
        this.setData({
            oid: s,
            isGetAnswer: r,
            relationGuid: i.RelationGuid
        }), r ? this.loadQuestionAnswer() : this.loadQuestionList();
    },
    loadQuestionAnswer: function() {
        var t = this;
        return (0, e.GetBuAnswerPromise)({
            OrderID: this.data.oid,
            RelationGuid: this.data.relationGuid
        }).then(function(e) {
            if (e.IsSuccessful && e.Answer) {
                var n = e.Answer.Content, i = [];
                (n = JSON.parse(n)).forEach(function(t) {
                    i.push({
                        TextType: t.TextType,
                        Content: t.Text,
                        Link: t.Link
                    });
                }, t), t.data.questionAnswerList[t.data.currentIndex] = n[0].Text, t.setData({
                    questionTitle: e.Answer.QuestionContent,
                    questionAnswer: i,
                    questionAnswerList: t.data.questionAnswerList
                });
            }
        }).catch(function(t) {
            console.error(t);
        });
    },
    loadQuestionList: function() {
        var t = this;
        return (0, e.GetQuestionListPromise)({
            OrderId: this.data.oid
        }).then(function(t) {
            if (t.IsSuccessful && t.CaseDetail) return t.CaseDetail.QuestionList;
        }).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            t.setData({
                QuestionList: e
            });
        }).catch(function(t) {
            console.error(t);
        });
    },
    getAnswer: function(t) {
        var e = t.currentTarget.dataset.item, n = void 0;
        this.data.currentIndex === t.currentTarget.dataset.index ? this.setData({
            currentIndex: ""
        }) : (n = t.currentTarget.dataset.index, this.setData({
            questionAnswer: "",
            currentIndex: n,
            relationGuid: e.RelationGuid
        }), this.data.questionAnswerList[n] || this.loadQuestionAnswer());
    },
    makeCall: function() {
        t.cwx.makePhoneCall({
            phoneNumber: "tieyou" === t.cwx.config.partner ? "02122268888" : "02160420000"
        });
    },
    previewImg: function(e) {
        var n = e.currentTarget.dataset.link;
        n = n.substring(n.indexOf("ImgSrc=") + 7), t.cwx.previewImage({
            current: n,
            urls: [ n ]
        });
    },
    toggleTap: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    }
});