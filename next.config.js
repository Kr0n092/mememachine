const config = { 
    USE_SSR: false,
    USE_HTTP2: false,
    USE_HTTPS: false,
    USE_LAZY_LOAD: true,
    USE_SPA: true,
    USE_SW: false,
    USE_PRELOAD_IMAGES: false,
    USE_LOAD_NORMAL: true,
    USE_PRELOAD: false,
    USE_PREFETCH: false,
    PORT: 3000
};

module.exports = {
    serverRuntimeConfig: {}, // Will only be available on the server side
    publicRuntimeConfig: config, // Will be available on both server and client
}