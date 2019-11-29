module.exports = function(t, o) {
    var r = function() {};
    return r.prototype = o.prototype, t.prototype = new r(), t.prototype.constructor = t, 
    t.superClass = o.prototype, o.prototype.constructor == Object.prototype.constructor && (o.prototype.constructor = o), 
    this;
};