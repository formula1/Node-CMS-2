var fs = require('fs');
var path = require('path');
var nm = path.resolve(__dirname, '../../node_modules');
fs.symlinkSync(__dirname+'/../', nm+'/core', 'dir');