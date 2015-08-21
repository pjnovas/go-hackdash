var _ = require('lodash');

var options = {
  //banner: '<%= banner %>',
  browserifyOptions: {
    debug: true
  },
  debug: true,
  extension: [ '.js', '.jsx' ],
  transform: [
    [ 'babelify'/*, { 'stage': 2 }*/ ],
    [ require('grunt-react').browserify, { global: true } ]
  ],
};

var optsW = _.extend(_.clone(options), { watch: true });
var optsT = _.extend(_.clone(options), { watch: true });

module.exports = {
  app: {
    options: options,
    files: {
      'dist/<%= pkg.name %>.js': ['src/index.js'],
    }
  },

  watch: {
    options: optsW,
    files: {
      'dist/<%= pkg.name %>.js': ['src/index.js'],
    }
  },

  tests: {
    options: optsT,
    src: [ 'test/suite.js' ],
    dest: 'test/browserified_tests.js'
  }

};
