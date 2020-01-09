const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra')

module.exports = override(
    addDecoratorsLegacy(),
    // fixBabelImports('@material-ui/core', {
    //     libraryDirectory: 'esm',
    //     camel2DashComponentName: false,
    // }),
    // fixBabelImports('@material-ui/icons', {
    //     libraryDirectory: 'esm',
    //     camel2DashComponentName: false,
    // }),
    disableEsLint(),
)
