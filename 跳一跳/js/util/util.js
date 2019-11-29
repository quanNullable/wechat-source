Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = exports.Util = {}, l = wx.getFileSystemManager();

window.fileManager = l;

var o = function(e) {
    l.saveFile({
        tempFilePath: e.tempFilePath,
        filePath: wx.env.USER_DATA_PATH + "/" + e.filePath,
        success: function() {
            e.success && e.success();
        },
        fail: function() {
            e.fail && e.fail();
        }
    });
};

e.saveFile = function(e) {
    console.log("saveFile", e);
    var i = e.filePath.split("/");
    i.length >= 2 && l.access({
        path: wx.env.USER_DATA_PATH + "/" + i[0],
        success: function() {
            console.log("success, access dir"), o(e);
        },
        fail: function(s) {
            l.mkdir({
                dirPath: wx.env.USER_DATA_PATH + "/" + i[0],
                success: function() {
                    console.log("mrk dir ok", e), o(e);
                },
                fail: function(l) {
                    console.log("fail mrk dir"), o(e);
                }
            });
        }
    });
}, e.deleteFiles = function(e) {
    for (var o = 0, i = e.length; o < i; ++o) l.unlinkSync(wx.env.USER_DATA_PATH + "/" + e[o]);
}, e.removeDirsNotInList = function(e) {
    console.log("remove list", e), e && l.readdir({
        dirPath: wx.env.USER_DATA_PATH,
        success: function(o) {
            for (var i = o.files, s = 0, n = i.length; s < n; ++s) e.indexOf(i[s]) < 0 && "block_" == i[s].substr(0, 6) && (console.log("remove dirs", i[s]), 
            l.rmdir({
                filePath: wx.env.USER_DATA_PATH + "/" + i[s],
                success: function() {
                    console.log("remove dir ok");
                }
            }));
        },
        fail: function(e) {
            console.log("faile", e);
        }
    });
}, e.downloadSaveFile = function(l) {
    console.log("downloadSaveFile", l), wx.downloadFile({
        url: l.url,
        header: l.header || "",
        success: function(o) {
            console.log("download okkkkkk", o.tempFilePath), e.saveFile({
                filePath: l.filePath,
                tempFilePath: o.tempFilePath,
                success: l.success,
                fail: l.fail
            });
        },
        fail: function(e) {
            console.log("fail download", e), l.fail && l.fail();
        }
    });
};