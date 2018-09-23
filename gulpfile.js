// 'use strict'
 
// var fs = require('fs');
// var gulp = require('gulp')
// var GulpSSH = require('gulp-ssh')
 
// var config = {
//   host: '104.251.214.168',
//   username: 'root',
//   password: '',
//   port: 22,
// }
 
// var gulpSSH = new GulpSSH({
//   ignoreErrors: false,
//   sshConfig: config
// })

// gulp.task('test', function () {
//   console.log('ok')
//   return gulpSSH
//     .shell(['sudo cd ~/', 'sudo mkdir test'])
//     .pipe(gulp.dest('logs'))
// })

// gulp.task('mytask', function() {
//   console.log(process.argv);
// });