/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
    env: {
        //url: 'http://localhost/backendUbunnie/index.php/',
        url: 'https://bo.ubunnies.com/backendUbunnie/index.php/',
        
        //urlArchivos: 'http://localhost/backendUbunnie/',
        urlArchivos: 'https://bo.ubunnies.com/backendUbunnie/',

        //urlDominio: 'http://localhost:3000/',
        urlDominio: 'https://bo.ubunnies.com/',
      },
};
