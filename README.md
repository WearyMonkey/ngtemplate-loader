# AngularJS Template loader for [webpack](http://webpack.github.io/)


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var css = require("!ngtemplate?module=myTemplates&relativeTo=/projects/test/app!html!file.html");
// => return the javascript "angular.module('myTemplates').run(['$templateCache', function(c) { c.put('file.html', "<content of file.html processed by html-loader>") }]);"
```

### webpack config

It's recommended to adjust your `webpack.config` so `ngtemplate!html!` is applied automatically on all files ending on `.html`:

``` javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "ngtemplate!html?module=myTemplates&relativeTo=" + (path.resolve(__dirname, './app/'))
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