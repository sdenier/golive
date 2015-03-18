module.exports = {
  config: {
    files: {
      javascripts: {
        joinTo: {
          'app.js': /^app/,
          'vendor.js': /^bower_components/
        }
      },
      stylesheets: {
        joinTo: 'app.css'
      }
    }
  }
}
 