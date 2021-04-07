module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          components: './app/components',
          fileApi: './app/fileApi',
          'graphql-api': './app/graphql-api',
          'react-graphql': './app/react-graphql',
          localization: './app/localization',
          screen: './app/screen',
        },
      },
    ],
  ],
};
