// Ultra-Professional Service Worker - Multi-Framework Support
const CACHE_NAME = 'cad-foundation-ultra-v1.0.0';
const STATIC_CACHE = 'cad-static-v1.0.0';
const DYNAMIC_CACHE = 'cad-dynamic-v1.0.0';

// Enhanced cache strategy with framework resources
const urlsToCache = [
    '/',
    '/index-ultra.html',
    '/manifest.json',
    '/assets/css/ultra-professional.css',
    '/assets/img/favicon.png',
    '/assets/img/apple-touch-icon.png',
    '/assets/img/logo.png',
    
    // Framework CDN resources (cached for offline support)
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css',
    'https://cdn.jsdelivr.net/npm/windicss@3.5.6/dist/windi.min.css',
    'https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css',
    'https://cdn.metroui.org.ua/current/css/metro-all.min.css',
    'https://cdn.metroui.org.ua/current/js/metro.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    
    // Fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=SF+Pro+Display:wght@100;200;300;400;500;600;700;800;900&family=SF+Pro+Text:wght@100;200;300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(urlsToCache);
            }),
            self.skipWaiting()
        ])
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        Promise.all([
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        cacheFirst(request)
            .catch(() => networkFirst(request))
            .catch(() => fallbackResponse(request))
    );
});

// Cache-first strategy for static resources
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    throw new Error('Not in cache');
}

// Network-first strategy for dynamic content
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Only cache successful responses
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            // Clone the response because it can only be consumed once
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Try to get from cache if network fails
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Fallback response for offline scenarios
function fallbackResponse(request) {
    const url = new URL(request.url);
    
    // Return a fallback for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
        return caches.match('/index-ultra.html');
    }
    
    // Return a fallback for image requests
    if (request.headers.get('accept').includes('image')) {
        return caches.match('/assets/img/logo.png');
    }
    
    // Return a generic offline response
    return new Response(
        JSON.stringify({
            error: 'Offline',
            message: 'You are currently offline. Please check your internet connection.'
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
    );
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync triggered');
        event.waitUntil(handleBackgroundSync());
    }
});

// Handle background sync operations
async function handleBackgroundSync() {
    try {
        // Get pending requests from IndexedDB or localStorage
        const pendingRequests = await getPendingRequests();
        
        for (const requestData of pendingRequests) {
            try {
                await fetch(requestData.url, requestData.options);
                // Remove successful request from pending
                await removePendingRequest(requestData.id);
                console.log('Background sync: Request completed', requestData.id);
            } catch (error) {
                console.error('Background sync: Request failed', error);
            }
        }
    } catch (error) {
        console.error('Background sync: Error handling sync', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    console.log('Service Worker: Push event received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from CAD Foundation',
        icon: '/assets/img/favicon.png',
        badge: '/assets/img/apple-touch-icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/img/favicon.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/img/favicon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('CAD Foundation', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE).then(cache => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

// Utility functions for IndexedDB operations
async function getPendingRequests() {
    // Implementation would use IndexedDB to store pending requests
    // For now, return empty array
    return [];
}

async function removePendingRequest(id) {
    // Implementation would remove request from IndexedDB
    console.log('Removing pending request:', id);
}

// Performance monitoring
self.addEventListener('install', event => {
    console.log('Service Worker install time:', performance.now());
});

self.addEventListener('activate', event => {
    console.log('Service Worker activate time:', performance.now());
});

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled promise rejection:', event.reason);
});

// Cleanup on termination
self.addEventListener('beforeunload', event => {
    console.log('Service Worker: Cleaning up before unload');
});
