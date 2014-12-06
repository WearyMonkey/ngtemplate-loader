var loaderUtils = require("loader-utils");

module.exports = function (content) {
    this.cacheable && this.cacheable();

    var query = loaderUtils.parseQuery(this.query);
    var ngModule = query.module || 'ngTemplates';
    var relativeTo = query.relativeTo || '';
    var relativeStartIndex = this.resource.indexOf(relativeTo);
    if (relativeStartIndex === -1){
    	throw 'The path for file doesn\'t contains relativeTo param';
    }
    var path = this.resource.slice(relativeStartIndex + relativeTo.length); // get the base path
    var html;

    if (content.match(/^module\.exports/)) {
        var firstQuote = findQuote(content, false);
        var secondQuote = findQuote(content, true);
        html = content.substr(firstQuote, secondQuote - firstQuote + 1);
    } else {
        html = content;
    }

    return "angular.module('" + ngModule + "').run(['$templateCache', function(c) { c.put('"+ path +"', " + html + ") }]);";

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