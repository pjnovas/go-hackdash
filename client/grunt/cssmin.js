module.exports = {
  all: {
    options: {
      report: 'gzip'
    },
    files: {
      'dist/<%= pkg.name %>.css': [ 'dist/<%= pkg.name %>.css' ]
    }
  }
};