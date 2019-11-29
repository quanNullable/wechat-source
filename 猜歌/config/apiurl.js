module.exports = {
    system: {
        login: "api/v1/user/login",
        addformid: "api/v1/log/create",
        moregames: "index/Versioncontrol/index",
        config: "index/Versioncontrol/index"
    },
    index: {
        index: "api/v1/index/index",
        rule: "index/Versioncontrol/index",
        start: "index/Versioncontrol/index"
    },
    game: {
        level: "api/v1/level/index",
        gold: "api/v1/index/indexGetGold",
        gamedata: "api/v1/game/gameStart",
        feedback: "index/Versioncontrol/index",
        gameend: "api/v1/game/gameEnd"
    },
    favorite: {
        add: "api/v1/collect_music/collect_music",
        list: "api/v1/collect_music/collect_list",
        remove: "api/v1/collect_music/collect_del"
    },
    ad: {
        index: "api/index/index",
        more: "api/index/applink",
        statistics: "api/collect/index"
    },
    share: {
        share: "index/Versioncontrol/index"
    },
    gift: {
        prize: "api/v1/prize/index",
        receive: "api/v1/prize/receive"
    },
    rank: {
        top: "api/v1/rank/index"
    },
    profile: {
        index: "api/v1/user/index",
        update: "api/v1/user/update"
    }
};