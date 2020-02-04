const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addWebpackModuleRule,
    addWebpackPlugin,
} = require('customize-cra')
const WorkerPlugin = require('worker-plugin')

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
    // addWebpackModuleRule({ test: /\.worker\.js$/, use: { loader: 'worker-loader' } }),
    addWebpackPlugin(new WorkerPlugin()),
)
