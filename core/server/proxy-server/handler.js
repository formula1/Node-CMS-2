var cp = require('child_process');
var fs = require('fs');

var STATUS = {
  OFF:'off',
  DISCONNECTING:'disconnecting',
  DISCONNECTED:'disconnected',
  CONNECTING:'connecting',
  CONNECTED:'on'
};

function Handler(name,port){
  this.port = port;
  this.name = name;
  this.site_location = __sites+"/"+name;
  this.isLocal = true;
  this.inProgress = 0;
}

Handler.prototype.toJSON = function(){
  return {
    on: this.fork?true:this.inProgress===1?true:false,
    isLocal:this.isLocal
  };
};

Handler.prototype.on = function(){
  return new Promise(turnOn.bind(this))
    .then(this.setFork.bind(this));
};
Handler.prototype.off = function(){
  return new Promise(turnOff.bind(this))
    .then(this.setFork.bind(this));
};

Handler.prototype.status = function(){
  return new Promise(getStatus.bind(this));
};

Handler.prototype.setFork = function(fork){
  this.inProgress = 0;
  this.fork = fork;
  return this;
};

function turnOn(res,rej){
  if(this.fork) throw new Error('The site '+this.name+' is already on');
  this.inProgress = 1;
  var fork = cp.fork(__dirname+'/../container',{
    cwd:this.site_location,
    silent:true,
    env:{
      PORT:this.port,
      HOSTNAME: this.name
    }
  });
  var el, ol;
  fork.once('error',el = function(err){
    fork.removeListener('message',ol);
    rej(err);
  });
  fork.once('message',ol = function(message){
    fork.removeListener('error',el);
    if(message !== 'ok'){
      return rej(new Error('Improper starting message'));
    }else{
      return res(fork);
    }
  });

  if(!fs.existsSync(this.site_location+'/logs')){
    fs.mkdirSync(this.site_location+'/logs');
    fs.mkdirSync(this.site_location+'/logs/current');
  }
  var logdir = this.site_location+'/logs/Date-'+Date.now();
  var curdir = this.site_location+'/logs/current';
  fs.mkdirSync(logdir);
  fork.stderr.pipe(fs.createWriteStream(logdir+'/error.log'));
  fork.stdout.pipe(fs.createWriteStream(logdir+'/out.log'));
  fork.stderr.pipe(fs.createWriteStream(curdir+'/error.log'));
  fork.stdout.pipe(fs.createWriteStream(curdir+'/out.log'));
  var all = fs.createWriteStream(logdir+'/all.log');
  fork.stdout.pipe(all);
  fork.stderr.pipe(all);
  var curall = fs.createWriteStream(curdir+'/all.log');
  fork.stdout.pipe(curall);
  fork.stderr.pipe(curall);

}
function turnOff(res,rej){
  if(!this.fork) throw new Error('The site '+this.name+' is already off');
  this.inProgress = -1;
  var el, ol;
  var fork = this.fork;
  fork.once('error',function(err){
    fork.removeListener('close',ol);
    rej(err);
  });
  fork.once('close',function(err){
    fork.removeListener('error',el);
    res(void 0);
  });
  fork.kill('SIGHUP');
}

function getStatus(res,rej){
  var fork = this.fork;
  if(!fork) return res({status:STATUS.OFF});
  if(!fork.connected) return res({status:STATUS.DISCONNECTED});
  if(this.inProgress === -1) return res({status:STATUS.DISCONNECTING});
  if(this.inProgress === 1) return res({status:STATUS.CONNECTING});
  var ol;
  var u = Math.random().toString(32).substring(2);
  var d = Date.now();
  var ret = {status:STATUS.CONNECTED};

  fork.on('message',ol = function(message){
    if(message !== "pong-"+u) return;
    fork.removeListener('message',ol);
    res({
      status:STATUS.CONNECTED,
      ping: Date.now() - d
    });
  });
  fork.send("ping-"+u);
}

module.exports = Handler;