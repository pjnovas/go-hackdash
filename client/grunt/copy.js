module.exports = {
  assets: {
    files: [
      {
        expand: true,
        cwd: 'dist/',
        src: ['**/*.js'],
        dest: '../public/js/',
        rename: function(dest, src) {
          return dest + src;
        }
      },
      {
        expand: true,
        cwd: 'dist/',
        src: ['**/*.css'],
        dest: '../public/css/',
        rename: function(dest, src) {
          return dest + src;
        }
      }
    ]
  }
};
