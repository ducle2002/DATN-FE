const assetExts = require('metro-config/src/defaults/defaults').assetExts;
const sourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    resetCache: true,
  };
})();
