function a(a, t, e) {
  return t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}

var t = Object.assign || function (a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t];
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (a[s] = e[s]);
  }
  return a;
}, e = (require("../../config/appsetting.js"), require("../../api/adApi.js")), s = getApp();

Page({
  data: {
    time: 10,
    que_list: [],
    game_id: 0,
    game_questions_number: "*",
    game_time: 10,
    again_limit: 0,
    again_limit_max: 3,
    again_true: 10,
    is_game: !0,
    clock: 0,
    timer: "",
    limit: 0,
    mark: 0,
    answers: "",
    answer_status: 100,
    answer_right_status: 100,
    answer_wrong_status: 100,
    right_status: "hide",
    wrong_status: "hide",
    over_status: "hide",
    faild_status: "hide",
    success_status: "hide",
    ad_status: "",
    disabled: "",
    wave_status: "",
    progress_status: "",
    player_status: "",
    control_status: "",
    clock_status: "",
    ready_animation: "",
    go_animation: "",
    step_animation: "",
    box_animation: "",
    answers_animation: "",
    isToLoad: !1,
    disabledAnswers: !0
  },
  audioError: function () {
    console.log("audioError");
    var a = this;
    wx.showModal({
      title: "加载音频失败",
      content: "网络好像有点小问题，请检查网络，建议使用WiFi获取更好体验",
      showCancel: !1,
      confirmText: "再试试",
      success: function (t) {
        t.confirm && a.setQuestion();
      }
    });
  },
  audioWaiting: function () {
    console.log("audioWaiting"), wx.showLoading({
      title: "音频缓冲中...",
      icon: "none"
    });
  },
  audioCanplay: function () {
    wx.hideLoading(), console.log("audioCanplay");
  },
  onLoad: function (a) {
    var t = this;
    wx.showLoading({
      title: "加载中",
      mask: !0
    });
    var e = wx.createInnerAudioContext(), o = wx.createInnerAudioContext();
    e.onWaiting(t.audioWaiting), e.onCanplay(t.audioCanplay), e.onError(t.audioError),
      o.onError(t.audioError), this.loadAd(), this.setData({
        music: e,
        sound: o
      }), t.data.load_timer = setInterval(function () {
        0 != s.globalData.user_id && (clearInterval(t.data.load_timer), t.get_ganme_data());
      }, 200);
  },
  loadAd: function () {
    var a = this;
    (0, e.getIndex)(function (e) {
      a.setData(t({}, e));
    });
  },
  get_ganme_data: function () {
    var t = this;
    wx.request({
      url: s.globalData.get_url + "/index/Versioncontrol/index",
      data: {
        secretkey: s.globalData.secretkey,
        libVersion: s.globalData.libVersion,
        action: "game",
        user_id: s.globalData.user_id
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function (e) {
        console.log('success', e)
        if ("404" == e.statusCode && t.get_ganme_data(), 2 == e.data.code) wx.showModal({
          title: "提示",
          content: "你已经没有挑战次数了",
          success: function (a) {
            wx.navigateBack({
              url: "../index/index"
            });
          }
        }); else if (1 == e.data.code) {
          var o;
          t.setData((o = {
            game_secretkey: e.data.data.game_secretkey,
            time: e.data.data.game_time,
            que_list: e.data.data.que_list,
            game_id: e.data.data.game_id,
            game_questions_number: e.data.data.game_questions_number,
            game_time: e.data.data.game_time,
            again_limit_max: e.data.data.again_limit_max,
            again_true: e.data.data.again_true,
            game_fail_share_txt: s.globalData.game_fail_share_txt,
            game_fail_share_txt_1: s.globalData.game_fail_share_txt_1,
            game_fail_share_txt_2: s.globalData.game_fail_share_txt_2,
            game_fail_share_txt_3: s.globalData.game_fail_share_txt_3,
            game_fail_share_txt_4: s.globalData.game_fail_share_txt_4,
            game_win_share_txt: s.globalData.game_win_share_txt,
            is_send_goods: s.globalData.is_send_goods,
            game_win_share_txt_1: s.globalData.game_win_share_txt_1,
            game_win_share_txt_2: s.globalData.game_win_share_txt_2,
            game_win_share_txt_3: s.globalData.game_win_share_txt_3,
            game_win_share_txt_4: s.globalData.game_win_share_txt_4,
            isToLoad: !0
          }, a(o, "is_send_goods", s.globalData.is_send_goods), a(o, "is_game_bottom_ad", s.globalData.is_game_bottom_ad),
            a(o, "game_bottom_ad", s.globalData.game_bottom_ad), a(o, "is_ad3", s.globalData.is_ad3),
            o)), wx.hideLoading(), t.data.ready_timer = setTimeout(function () {
              t.setData({
                ready_animation: "ready-in"
              }), t.readyAudioPlay();
            }, 500), t.data.game_timer = setTimeout(function () {
              t.setData({
                ready_animation: "ready-out"
              }), t.setQuestion();
            }, 1600);
        }
      },
      fail: function (a) {
        console.log('error', a)
      }
    });
  },
  game_over: function () {
    var a = this;
    a.setData({
      is_game: !1,
      disabled: "disabled"
    }), setTimeout(function () {
      0 == a.data.clock ? a.setData({
        over_status: "show",
        ad_status: "show"
      }) : (a.setData({
        wrong_status: "show",
        ad_status: "show"
      }), a.music2AudioPlay());
    }, 1e3), wx.request({
      url: s.globalData.get_url + "/index/Versioncontrol/index",
      data: {
        secretkey: s.globalData.secretkey,
        game_secretkey: a.data.game_secretkey,
        libVersion: s.globalData.libVersion,
        action: "game_end",
        user_id: s.globalData.user_id,
        game_id: a.data.game_id,
        mark: a.data.mark,
        answers: a.data.answers
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function (t) {
        "404" == t.statusCode && a.game_over();
      },
      fail: function (a) {
        console.log('error', a)
      }
    });
  },
  game_goon: function () {
    var a = this;
    a.setData({
      disabled: "disabled"
    }), a.data.mark == a.data.game_questions_number ? wx.request({
      url: s.globalData.get_url + "/index/Versioncontrol/index",
      data: {
        secretkey: s.globalData.secretkey,
        game_secretkey: a.data.game_secretkey,
        libVersion: s.globalData.libVersion,
        action: "game_end",
        user_id: s.globalData.user_id,
        game_id: a.data.game_id,
        mark: a.data.mark,
        answers: a.data.answers
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function (t) {
        "404" == t.statusCode && a.game_goon(), setTimeout(function () {
          a.setData({
            control_status: "stop",
            wave_status: "none",
            progress_status: "none",
            player_status: "none",
            clock_status: "hide",
            success_status: "show",
            ad_status: "show",
            step_animation: "step-out",
            box_animation: "box-out",
            answers_animation: "answers-out"
          }), a.music2AudioPlay();
        }, 1e3);
      },
      fail: function (a) {
        console.log('error', a)
      }
    }) : setTimeout(function () {
      a.setData({
        control_status: "stop",
        wave_status: "none",
        progress_status: "none",
        player_status: "none",
        right_status: "show",
        ad_status: "show",
        step_animation: "step-out",
        box_animation: "box-out",
        answers_animation: "answers-out"
      }), a.music2AudioPlay();
    }, 1e3);
  },
  setQuestion: function () {
    var a = this;
    a.setData({
      disabledAnswers: !0,
      is_game: !0,
      time: a.data.game_time,
      clock: a.data.game_time,
      answer_wrong_status: 100,
      answer_right_status: 100,
      disabled: "",
      step_animation: "step-in",
      box_animation: "box-in",
      answers_animation: "answers-in"
    }), a.music1AudioPlay();
  },
  nextQuestion: function () {
    var a = this;
    a.data.music && a.data.music.stop(), a.setData({
      disabledAnswers: !0,
      limit: a.data.limit + 1,
      right_status: "hide",
      ad_status: "hide",
      clock_status: "hide"
    }), a.setQuestion();
  },
  selectAnswer: function (a) {
    var t = this;
    clearTimeout(t.data.timer), t.data.music && t.data.music.stop(), t.setData({
      disabled: "disabled",
      control_status: "stop",
      wave_status: "play stop",
      progress_status: "play stop",
      player_status: "play stop"
    });
    a.currentTarget.dataset.answer;
    var e = a.currentTarget.dataset.id, s = t.data.que_list[t.data.limit].answer;
    e != s ? (t.setData({
      answer_wrong_status: e,
      answer_right_status: s
    }), t.wrongAudioPlay(), t.game_over()) : (t.setData({
      mark: t.data.mark + 1,
      answers: t.data.answers + "," + e,
      answer_right_status: s
    }), t.rightAudioPlay(), t.game_goon());
  },
  overTime: function () {
    var a = this;
    a.setData({
      disabled: "disabled",
      control_status: "stop",
      wave_status: "play over",
      progress_status: "play over",
      player_status: "play over"
    }), a.wrongAudioPlay(), a.game_over();
  },
  countDown: function () {
    var a = this, t = a.data.clock;
    if (t < 5 && a.setData({
      clock_status: "show"
    }), 0 == t) return clearTimeout(a.data.timer), a.data.music && a.data.music.stop(),
      a.overTime(), void a.setData({
        clock: "0"
      });
    a.data.timer = setTimeout(function () {
      a.setData({
        clock: t - 1
      }), console.log(a.data.clock), a.countDown();
    }, 1e3);
  },
  closePopupWrong: function () {
    var a = this;
    a.data.music && a.data.music.stop(), a.data.sound && a.data.sound.stop(), wx.reLaunch({
      url: "../index/index"
    });
  },
  closePopupFaild: function () {
    var a = this;
    a.data.music && a.data.music.stop(), a.data.sound && a.data.sound.stop(), wx.reLaunch({
      url: "../index/index"
    });
  },
  closePopupSuccess: function () {
    var a = this;
    a.data.music && a.data.music.stop(), a.data.music && a.data.sound.stop(), wx.reLaunch({
      url: "../index/index"
    });
  },
  soundPlay: function (a) {
    var t = this;
    t.data.sound && (t.data.sound.stop(), t.data.sound.destroy(), t.setData({
      sound: null
    }));
    var e = wx.createInnerAudioContext();
    e.onError(t.audioError), e.autoplay = !0, e.src = a;
  },
  readyAudioPlay: function () {
    this.soundPlay("/audio/readygo.mp3");
  },
  rightAudioPlay: function () {
    this.soundPlay("/audio/right.mp3");
  },
  wrongAudioPlay: function () {
    this.soundPlay("/audio/wrong.mp3");
  },
  faildAudioPlay: function () {
    this.soundPlay("/audio/faild.mp3");
  },
  successAudioPlay: function () {
    this.soundPlay("/audio/success.mp3");
  },
  music1AudioPlay: function () {
    var a = this;
    a.data.music && (a.data.music.stop(), a.data.music.destroy(), a.setData({
      music: null
    }));
    var t = wx.createInnerAudioContext();
    t.onError(a.audioError), t.onCanplay(a.audioCanplay), t.onWaiting(a.audioWaiting),
      t.autoplay = !1, t.obeyMuteSwitch = !1, t.src = a.data.que_list[a.data.limit].music1,
      t.onPlay(function () {
        console.log("audio on paly"), wx.hideLoading(), a.countDown(), a.setData({
          disabledAnswers: !1,
          control_status: "play",
          wave_status: "play",
          progress_status: "play",
          player_status: "play",
          clock_status: "hide"
        }), console.log("本题时间:" + a.data.time);
      }), this.setData({
        music: t
      }), t.play();
  },
  music2AudioPlay: function () {
    var a = this;
    a.data.music && (a.data.music.stop(), a.data.music.destroy(), a.setData({
      music: null
    }));
    var t = wx.createInnerAudioContext();
    t.onError(a.audioError), t.src = a.data.que_list[a.data.limit].music2, t.onPlay(function () {
      console.log("高潮");
    }), t.play(), this.setData({
      music: t
    });
  },
  onUnload: function () {
    var a = this;
    clearInterval(a.data.load_timer), clearTimeout(a.data.ready_timer), clearTimeout(a.data.game_timer),
      clearTimeout(a.data.timer), a.data.music && (a.data.music.stop(), a.data.music.destroy()),
      a.data.sound && (a.data.sound.stop(), a.data.sound.destroy());
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: !0
    });
    var a = "/pages/group/index?uid=" + s.globalData.user_id + "&timestamp=" + new Date().getTime();
    return console.log("group share path ", a), {
      title: s.globalData.index_share_title,
      path: a,
      imageUrl: s.globalData.index_share_img,
      success: function (a) {
        console.log("share success ", a);
        var t = a.shareTickets, e = t ? t[t.length - 1] : null;
        e ? wx.getShareInfo({
          shareTicket: e,
          success: function (a) {
            var o = encodeURIComponent(a.encryptedData), i = encodeURIComponent(a.iv);
            wx.request({
              url: s.globalData.get_url + "/index/Versioncontrol/index",
              data: {
                shareTicket: e,
                secretkey: s.globalData.secretkey,
                libVersion: s.globalData.libVersion,
                action: "insert_click_share",
                user_id: s.globalData.user_id,
                encryptedData: o,
                iv: i
              },
              method: "POST",
              header: {
                "content-type": "application/json"
              },
              success: function (a) {
                console.log("insert_click_share result ", a), 0 == a.data.code ? wx.showModal({
                  title: "提示",
                  showCancel: !1,
                  content: s.globalData.pk_share_repeat_tishi
                }) : wx.redirectTo({
                  url: "/pages/group/index?wait=1&useRandUser=" + (null != t)
                });
              },
              fail: function (a) {
                console.log('error', a)
              }
            });
          }
        }) : wx.request({
          url: s.globalData.get_url + "/index/Versioncontrol/index",
          data: {
            secretkey: s.globalData.secretkey,
            libVersion: s.globalData.libVersion,
            action: "insert_click_share",
            user_id: s.globalData.user_id
          },
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            wx.redirectTo({
              url: "/pages/group/index?wait=1&useRandUser=" + (null != t)
            });
          }
        });
      },
      fail: function (a) { }
    };
  },
  more_games: function (a) {
    var t = a.currentTarget.dataset, s = t.toid, o = t.appid, i = t.path, n = t.extardata, r = t.version;
    wx.navigateToMiniProgram({
      appId: o,
      path: i,
      extarData: {
        channel: n,
        data: n
      },
      envVersion: r,
      success: function (a) {
        (0, e.addStatistics)(s);
      }
    });
  }
});