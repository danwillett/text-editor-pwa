import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Import the expiration plugin
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'static-resources';
const matchCallback = ({ request }) => {
  console.log(request);
  return (
    // CSS
    request.destination === 'style' ||
    // JavaScript
    request.destination === 'script'
  );
};

registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);