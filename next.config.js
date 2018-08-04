const config = { 
    USE_SSR: true,
    USE_HTTP2: false,
    USE_HTTPS: true,
    USE_LAZY_LOAD: true,
    USE_SPA: true,
    USE_SW: false,
    USE_PRELOAD_IMAGES: true,
    USE_PRELOAD: true,
    USE_PREFETCH: false,
    PORT: 3000
};

module.exports = {
    serverRuntimeConfig: {}, // Will only be available on the server side
    publicRuntimeConfig: config, // Will be available on both server and client
}