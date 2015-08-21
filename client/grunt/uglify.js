module.exports = {
  all: {
    options: {
      //banner: '<%= banner %>',
      stripBanners: {
        line: true
      },
    },
    files: {
      'dist/<%= pkg.name %>.js': [ 'dist/<%= pkg.name %>.js' ]
    }
  }
};