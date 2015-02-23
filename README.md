# AngularJS Template loader for [webpack](http://webpack.github.io/)

Includes your AngularJS templates into your webpack Javascript Bundle. Pre-loads the AngularJS template cache
to remove initial load times of templates.

ngTemplate loader does not minify or process your HTML at all, and instead uses the standard loaders such as html-loader
or raw-loader. This gives you the flexibility to pick and choose your HTML loaders.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

ngTemplate loader will export the path of the HTML file, so you can use require directly AngularJS with templateUrl parameters e.g. 

``` javascript
app.directive('testDirective', function() {
    return {
        restrict: 'E',
        templateUrl: require('ngtemplate!html!./test.html')
    }
});
```

ngTemplate creates a JS module that initialises the $templateCache with the HTML under the file path e.g. 

``` javascript
require("!ngtemplate?relativeTo=/projects/test/app!html!file.html");
// => generates the javascript:
// angular.module('ng').run(['$templateCache', function(c) { c.put('file.html', "<file.html processed by html-loader>") }]);
```

### RelativeTo and Prefix

You can set the base path of your templates using `relativeTo` and `prefix` parameters. `relativeTo` is used
to strip a matching prefix from the absolute path of the input html file. `prefix` is then appended to path.

The prefix of the path up to and including the first `relativeTo` match is stripped, e.g.

``` javascript
require("!ngtemplate?relativeTo=/src/!html!/test/src/test.html");
// c.put('test.html', ...)
```

To match the from the start of the absolute path prefix a '//', e.g.

``` javascript
require("!ngtemplate?relativeTo=//Users/WearyMonkey/project/test/!html!/test/src/test.html");
// c.put('src/test.html', ...)
```

You can combine `relativeTo` and `prefix` to replace the prefix in the absolute path, e.g.

``` javascript
require("!ngtemplate?relativeTo=src/&prefix=build/!html!/test/src/test.html");
// c.put('build/test.html', ...)
```

### Module

By default ngTemplate loader adds a run method to the global 'ng' module which does not need to explicitly required by your app.
You can override this by setting the `module` parameter, e.g.

``` javascript
require("!ngtemplate?module=myTemplates&relativeTo=/projects/test/app!html!file.html");
// => returns the javascript:
// angular.module('myTemplates').run(['$templateCache', function(c) { c.put('file.html', "<file.html processed by html-loader>") }]);
```

### Path Separators (Or using on Windows)

 By default, ngTemplate loader will assume you are using unix style path separators '/' for html paths in your project.
 e.g. `templateUrl: '/views/app.html'`. If however you want to use Window's style path separators '\'
 e.g. `templateUrl: '\\views\\app.html'` you can override the separator by providing the pathSep parameter.

 ```javascript
 require('ngtemplate?pathSep=\\!html!.\\test.html')
 ```

 Make sure you use the same path separator for the `prefix` and `relativeTo` parameters, all templateUrls and in your webpack.config.js file.

## webpack config

It's recommended to adjust your `webpack.config` so `ngtemplate!html!` is applied automatically on all files ending on `.html`:

``` javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "ngtemplate?relativeTo=(path.resolve(__dirname, './app')) + "/!html"
      }
    ]
  }
};
```

Then you only need to write: `require("file.html")`.

## Install

`npm install ngtemplate-loader`

## License

MIT (http://www.opensource.org/licenses/mit-license.php)