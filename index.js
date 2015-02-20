var loaderUtils = require("loader-utils");
var path = require('path');

module.exports = function (content) {
    this.cacheable && this.cacheable();

    var query = loaderUtils.parseQuery(this.query);
    var ngModule = query.module || 'ng'; // ng is the global angular module that does not need to explicitly required
    var relativeTo = query.relativeTo || '';
    var prefix = query.prefix || '';
    var absolute = false;

    // if a unix path starts with // we treat is as an absolute path e.g. //Users/wearymonkey
    // if we're on windows, then we ignore the / prefix as windows absolute paths are unique anyway e.g. C:\Users\wearymonkey
    if (relativeTo[0] == '/') {
        if (path.sep == '\\') { // we're on windows
            relativeTo = relativeTo.substring(1);
        } else if (relativeTo[1] == '/') {
            absolute = true;
            relativeTo = relativeTo.substring(1);
        }
    }

    // convert unix paths into window paths / -> \
    relativeTo = relativeTo.replace(/\//g, path.sep);
    prefix = prefix.replace(/\//g, path.sep);

    var relativeToIndex = this.resource.indexOf(relativeTo);
    if (relativeToIndex === -1 || (absolute && relativeToIndex !== 0)) {
        throw 'The path for file doesn\'t contains relativeTo param';
    }

    var filePath = prefix + this.resource.slice(relativeToIndex + relativeTo.length); // get the base path
    var html;

    if (content.match(/^module\.exports/)) {
        var firstQuote = findQuote(content, false);
        var secondQuote = findQuote(content, true);
        html = content.substr(firstQuote, secondQuote - firstQuote + 1);
    } else {
        html = content;
    }

    return "window.angular.module('" + ngModule + "').run(['$templateCache', function(c) { c.put('"+ filePath +"', " + html + ") }]);";

    function findQuote(content, backwards) {
        var i = backwards ? content.length - 1 : 0;
        while (i >= 0 && i < content.length) {
            if (content[i] == '"' || content[i] == "'") {
                return i;
            }
            i += backwards ? -1 : 1;
        }
        return -1;
    }
};