function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t, c = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var c = arguments[t];
        for (var o in c) Object.prototype.hasOwnProperty.call(c, o) && (e[o] = c[o]);
    }
    return e;
}, o = e(require("../core/cos-wx-sdk-v5.js")), n = e(require("./uuid.js")), u = {
    Bucket: "",
    Region: "ap-guangzhou",
    SecretId: "",
    SecretKey: ""
}, i = new o.default({
    getAuthorization: function(e, t) {
        t(o.default.getAuthorization({
            SecretId: u.SecretId,
            SecretKey: u.SecretKey,
            Method: e.Method,
            Key: e.Key
        }));
    }
}), g = function(e, t) {
    console.log(e || t), e && e.error ? wx.showModal({
        title: "返回错误",
        content: "请求失败：" + e.error.Message + "；状态码：" + e.statusCode,
        showCancel: !1
    }) : e ? wx.showModal({
        title: "请求出错",
        content: "请求出错：" + e + "；状态码：" + e.statusCode,
        showCancel: !1
    }) : wx.showToast({
        title: "请求成功",
        icon: "success",
        duration: 3e3
    });
}, a = {
    getService: function() {
        i.getService(g);
    },
    putBucket: function() {
        i.putBucket({
            Bucket: "testnew-" + u.Bucket.substr(u.Bucket.lastIndexOf("-") + 1),
            Region: "ap-guangzhou"
        }, g);
    },
    getBucket: function() {
        i.getBucket({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    headBucket: function() {
        i.headBucket({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    deleteBucket: function() {
        i.deleteBucket({
            Bucket: "testnew-" + u.Bucket.substr(u.Bucket.lastIndexOf("-") + 1),
            Region: "ap-guangzhou"
        }, g);
    },
    getBucketACL: function() {
        i.getBucketAcl({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    putBucketACL: function() {
        i.putBucketAcl({
            Bucket: u.Bucket,
            Region: u.Region,
            ACL: "public-read"
        }, g);
    },
    getBucketCors: function() {
        i.getBucketCors({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    putBucketCors: function() {
        i.putBucketCors({
            Bucket: u.Bucket,
            Region: u.Region,
            CORSRules: [ {
                AllowedOrigin: [ "*" ],
                AllowedMethod: [ "GET", "POST", "PUT", "DELETE", "HEAD" ],
                AllowedHeader: [ "*" ],
                ExposeHeader: [ "ETag" ],
                MaxAgeSeconds: "5"
            } ]
        }, g);
    },
    putBucketPolicy: function() {
        var e = u.Bucket.substr(u.Bucket.lastIndexOf("-") + 1);
        i.putBucketPolicy({
            Bucket: u.Bucket,
            Region: u.Region,
            Policy: {
                version: "2.0",
                principal: {
                    qcs: [ "qcs::cam::uin/10001:uin/10001" ]
                },
                statement: [ {
                    effect: "allow",
                    action: [ "name/cos:GetBucket", "name/cos:PutObject", "name/cos:PostObject", "name/cos:PutObjectCopy", "name/cos:InitiateMultipartUpload", "name/cos:UploadPart", "name/cos:UploadPartCopy", "name/cos:CompleteMultipartUpload", "name/cos:AbortMultipartUpload", "name/cos:AppendObject" ],
                    resource: [ "qcs::cos:" + u.Region + ":uid/" + e + ":" + u.Bucket + "/*" ]
                } ]
            }
        }, g);
    },
    deleteBucketCORS: function() {
        i.deleteBucketCors({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    getBucketLocation: function() {
        i.getBucketLocation({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    getBucketPolicy: function() {
        i.getBucketPolicy({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    getBucketTagging: function() {
        i.getBucketTagging({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    putBucketTagging: function() {
        i.putBucketTagging({
            Bucket: u.Bucket,
            Region: u.Region,
            Tagging: {
                Tags: [ {
                    Key: "k1",
                    Value: "v1"
                }, {
                    Key: "k2",
                    Value: "v2"
                } ]
            }
        }, g);
    },
    deleteBucketTagging: function() {
        i.deleteBucketTagging({
            Bucket: u.Bucket,
            Region: u.Region
        }, g);
    },
    putObject: function() {
        i.putObject({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt",
            Body: "hello world"
        }, g);
    },
    getObject: function() {
        i.getObject({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt"
        }, g);
    },
    headObject: function() {
        i.headObject({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt"
        }, g);
    },
    deleteObject: function() {
        i.deleteObject({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt"
        }, g);
    },
    getObjectACL: function() {
        i.getObjectAcl({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt"
        }, g);
    },
    putObjectACL: function() {
        i.putObjectAcl({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.txt",
            ACL: "default"
        }, g);
    },
    putObjectCopy: function() {
        i.putObjectCopy({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: "1.copy.txt",
            CopySource: u.Bucket + ".cos." + u.Region + ".myqcloud.com/1.txt"
        }, g);
    },
    postObject: function(e) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            dirName: "ceoclass/",
            onProgress: function() {},
            onCompleted: function() {}
        }, g = n.default.uuid() + "." + e.split(".").splice(-1), a = "ceoclass/" + o.dirName + g;
        i.postObject({
            Bucket: u.Bucket,
            Region: u.Region,
            Key: a,
            FilePath: e,
            TaskReady: function(e) {
                t = e;
            },
            onProgress: o.onProgress
        }, function(e, t) {
            o.onCompleted(e, c({}, t, {
                path: a
            }));
        });
    },
    cancelTask: function() {
        i.cancelTask(t), console.log("canceled");
    },
    pauseTask: function() {
        i.pauseTask(t), console.log("paused");
    },
    restartTask: function() {
        i.restartTask(t), console.log("restart");
    }
};

module.exports = a;