module.exports = {
  env: {
    APOLLO_SERVER: process.env.APOLLO_SERVER,
  },
  future: {
    webpack5: true,
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        lodash: 'lodash-es',
      });
    }

    return config;
  },
};
