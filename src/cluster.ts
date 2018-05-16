import * as cluster from 'cluster';
import * as os from 'os';

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster
    .on('exit', (worker, code, signal) => {
      console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
      cluster.fork();
    })
    .on('online', (worker) => {
      console.log("worker(" + worker.id + ").online " + worker.process.pid);
    })
    .on('listening', (worker, address) => {
      console.log("worker(" + worker.id + ").listening " + address.address + ":" + address.port);
    });
} else {
  console.log('test');
  require('../bin/www');
}