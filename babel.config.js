module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './source',
          '@assets': './assets',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'NODE_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
        globals: ['__scanCodes'],
      },
    ],
    ['react-native-worklets-core/plugin'],
  ],
};
