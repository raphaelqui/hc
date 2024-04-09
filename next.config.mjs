/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Füge einen neuen Loader für Videos hinzu
      config.module.rules.push({
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/videos/',
              outputPath: 'static/videos/',
            },
          },
        ],
      });
  
      // Gib die modifizierte Konfiguration zurück
      return config;
    },
  };
  
  export default nextConfig;
  