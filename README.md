# AngularJS Template loader for [webpack](http://webpack.github.io/)

Includes your AngularJS templates into your webpack Javascript Bundle. Pre-loads the AngularJS template cache
to remove initial load times of templates.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
require("!ngtemplate?module=myTemplates&relativeTo=/projects/test/app!html!file.html");
// => returns the javascript:
// angular.module('myTemplates').run(['$templateCache', function(c) { c.put('file.html', "<file.html processed by html-loader>") }]);
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

## webpack config

It's recommended to adjust your `webpack.config` so `ngtemplate!html!` is applied automatically on all files ending on `.html`:

``` javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "ngtemplate?module=myTemplates&relativeTo=^" +
            (path.resolve(__dirname, './app/')) + "!html"
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