var child_process = require('child_process');
var browserstack = require('browserstack-local');

var bs_local = new browserstack.Local();
var bs_local_args = { 'key': process.env.BROWSERSTACK_ACCESS_KEY, 'forcelocal': true };

bs_local.start(bs_local_args, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected. Now testing...');

    child = child_process.execSync('./node_modules/.bin/wdio wdio.local.conf.js', { stdio: [ 0, 0, 0 ] });

    if(child) {
      child.on('exit', function() {
        if(bs_local) {
          bs_local.stop(function() {});
        }

        exit(0);
      });
    }
  }
  if(bs_local) {
    bs_local.stop(function() {});
  }
});
