var path = require('path');

global.__root = path.resolve(__dirname, '../..');
global.__core = path.resolve(__root, 'core');
global.__themes = path.resolve(__root, 'theme');
global.__sites = path.resolve(__root, 'sites');
