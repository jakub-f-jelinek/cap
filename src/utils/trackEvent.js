/**
 * Pushes a custom event into the GTM dataLayer (initialized in
 * index.html before the app mounts). Whether it reaches GA4 depends
 * on the visitor's cookie consent and how the tag is set up in GTM.
 */
export function trackEvent(event, params = {}) {
  window.dataLayer?.push({ event, ...params });
}
