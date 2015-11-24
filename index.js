var ShardingServer = require('./core/server/proxy-server');

ShardingServer(__dirname + '/config.json', process.stdin);
