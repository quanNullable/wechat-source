module.exports = function(e) {
    return e.replace(/_\w/g, function(e) {
        return e[1].toUpperCase();
    });
};