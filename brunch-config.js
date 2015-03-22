module.exports = {
  config: {
    modules: {
      definition: false,
      wrapper: false
    },
    files: {
      javascripts: {
        joinTo: {
          'app.js': /^app/,
          'vendor.js': /^bower_components/
        }
      },
      stylesheets: {
        joinTo: {
          'app.css': /^app/, 
          'vendor.css': /^vendor/
        }
      }
    },
    server: {
      path: 'server.js',
      run: 'yes'
    }
  }
}
