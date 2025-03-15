const OLD_ARCH = process.env.OLD_ARCH === 'TRUE';

export default ({ config }) => ({
    ...config,
    newArchEnabled: !OLD_ARCH,
    ios: {
        supportsTablet: true,
        bundleIdentifier: `com.legendapp.listtest${OLD_ARCH ? '.oldarch' : ''}`,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
        package: `com.legendapp.listtest${OLD_ARCH ? '.oldarch' : ''}`,
    },
    name: `list-test${OLD_ARCH ? '-oldarch' : ''}`,
});
