/**
 * config.js - Global Configuration for Sigma Developer Portfolio
 * Production-ready: uses relative paths on the production domain and loopback for local dev.
 *
 * HOW IT WORKS:
 *  - Local dev  -> http://127.0.0.1:3000/api/...  (hits your local Express server)
 *  - Netlify    -> /api/...  (hits /.netlify/functions/* via redirect in netlify.toml)
 *  - Vercel     -> /api/...  (hits /api/* serverless functions via vercel.json)
 *
 * No hardcoded production URL is needed because relative paths work on the deployed domain.
 */

const CONFIG = {
    get API_URL() {
        const isLocal = window.location.hostname === '127.0.0.1';

        // Keep local development explicit while production stays origin-relative.
        return isLocal ? 'http://127.0.0.1:3000' : '';
    }
};

Object.freeze(CONFIG);
window.CONFIG = CONFIG;
