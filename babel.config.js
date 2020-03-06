var webpack = require('webpack')
module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    [
      "import",
      {
        "libraryName": "view-design",
        "libraryDirectory": "src/components"
      },
      "syntax-dynamic-import"
    ]
  ]
};
