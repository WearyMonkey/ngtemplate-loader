console.log(require('../../index.js!html-loader!./test.html'));
console.log(require('../../index.js!raw-loader!./test.html'));
console.log(require('../../index.js?relativeTo=/test/src/!html-loader!./test.html'));
console.log(require('../../index.js?module=testModule!html-loader!./test.html'));