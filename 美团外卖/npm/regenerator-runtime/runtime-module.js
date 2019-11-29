var e = function() {
    return this;
}() || Function("return this")(), r = e.regeneratorRuntime && Object.getOwnPropertyNames(e).indexOf("regeneratorRuntime") >= 0, t = r && e.regeneratorRuntime;

if (e.regeneratorRuntime = void 0, module.exports = require("./runtime.js"), r) e.regeneratorRuntime = t; else try {
    delete e.regeneratorRuntime;
} catch (r) {
    e.regeneratorRuntime = void 0;
}