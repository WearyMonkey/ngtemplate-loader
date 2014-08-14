var loaderUtils = require("loader-utils");

module.exports = function (content) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var ngModule = query.module || 'ngTemplates';
    var relativeTo = query.relativeTo || '';
    var path = this.resource.slice(relativeTo.length); // get the base path
    var html = content.slice(17, -1); // trim the module.exports = prefix and ; postfix

    return "angular.module('" + ngModule + "').run(['$templateCache', function(c) { c.put('"+ path +"', " + html + ") }]);"
};