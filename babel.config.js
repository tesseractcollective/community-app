function getAliasesFromTsConfig() {
  const tsConfig = require('./tsconfig.json');

  const paths = tsConfig.compilerOptions.paths;
  let alias = {};
  Object.keys(paths).forEach((key) => {
    alias[key] = `./${paths[key][0]}`;
  });

  // alias["react-native-reanimated"] = "react-native-reanimated/src/Animated"

  return alias;
}
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
    development: {},
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        // alias: {
        //   components: './app/components',
        //   fileApi: './app/fileApi',
        //   'graphql-api': './app/graphql-api',
        //   'react-graphql': './app/react-graphql',
        //   localization: './app/localization',
        //   screen: './app/screen',
        //   ...getAliasesFromTsConfig(),
        // },
        alias: getAliasesFromTsConfig(),
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
