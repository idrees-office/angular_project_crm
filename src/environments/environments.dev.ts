export const environment = {
  production: false,
  baseUrl: getBaseUrl()
};

function getBaseUrl(): string {
  const currentUrl = window.location.href;

  // Check if the current URL is your production URL
  if (currentUrl.includes('newcrmbackend.evernestre.ae')) {
    return 'https://newcrmbackend.evernestre.ae/api';
  } else {
    // If not, use a default base URL for development
    return 'http://127.0.0.1:8000/api';
    // Or use a base URL based on the current domain
    // return `${window.location.origin}/api`;
  }
}
