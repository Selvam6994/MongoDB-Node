const os = require('os');

console.log('free memory : ',(os.freemem()/1024/1024/1024).toFixed(2));

