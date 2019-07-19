const webpack = require('webpack');

module.exports = {
  distDir: 'build',
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  webpack(config) {
    const { module = {}, plugins = [] } = config;
    return {
      ...config,
      devtool:
        process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval',
      output: {
        ...config.output,
        publicPath: '/_next/',
      },
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            loader: 'webpack-ant-icon-loader',
            enforce: 'pre',
            include: [],
          },
          {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 20000,
            },
          },
          {
            test: /.*?.css$/,
            loader: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        ...plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ],
    };
  },
};
