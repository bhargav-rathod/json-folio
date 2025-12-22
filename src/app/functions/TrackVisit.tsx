import { TrackingConfig } from "../types/portfolio-data.type";

interface NavigatorExtended extends Omit<Navigator, 'pdfViewerEnabled'> {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    saveData?: boolean;
  };
  pdfViewerEnabled?: boolean;
}

export const trackVisit = async (trackingConfig: TrackingConfig) => {
  try {
    if (!trackingConfig?.enabled) return;
    if (!trackingConfig?.googleForm?.enabled) return;

    // Detect source
    const params = new URLSearchParams(window.location.search);
    const sourceParam = trackingConfig.sourceDetection.ignoreParam;
    let source = params?.get(sourceParam);

    if (!source || source?.toLocaleLowerCase() === '') {
      const referrer = document?.referrer?.toLocaleLowerCase() || '';
      const referrerConfig = trackingConfig.sourceDetection.referrers;

      source = trackingConfig.sourceDetection.defaultSource;

      for (const [key, value] of Object.entries(referrerConfig)) {
        if (referrer.includes(value)) {
          source = key;
          break;
        }
      }
    } else if (source === trackingConfig.sourceDetection.ignoreValue) {
      return;
    }

    // Get IP and location info
    const ipResponse = await fetch(trackingConfig.ipServices.ipLookup);
    const { ip } = await ipResponse.json();

    const geoResponse = await fetch(
      trackingConfig.ipServices.geoLookup.replace('{ip}', ip)
    );
    const geoData = await geoResponse.json();

    // Cast navigator to extended type
    const nav = navigator as NavigatorExtended;

    // Prepare additional data string
    const additionalData = [
      `Source: ${source}`,
      `City: ${geoData?.city}`,
      `Region: ${geoData?.region}`,
      `TimeZone: ${geoData?.timezone}`,
      `Latitude: ${geoData?.latitude}`,
      `Longitude: ${geoData?.longitude}`,
      `Postal: ${geoData?.postal}`,
      `Org: ${geoData?.org}`,
      `Platform: ${nav.platform}`,
      `User Agent: ${nav.userAgent}`,
      `Language: ${nav.language}`,
      `Languages: ${nav.languages?.join(',')}`,
      `Screen Resolution: ${window.screen.width}x${window.screen.height}`,
      `Color Depth: ${window.screen.colorDepth}-bit`,
      `Device Memory: ${nav.deviceMemory || 'Unknown'}GB`,
      `Logical Cores: ${nav.hardwareConcurrency || 'Unknown'}`,
      `Connection Type: ${nav.connection?.effectiveType || 'Unknown'}`,
      `Connection Speed: ${nav.connection?.downlink || 'Unknown'}Mbps`,
      `Connection Save Data: ${nav.connection?.saveData ? 'Yes' : 'No'}`,
      `Max Touch Points: ${nav.maxTouchPoints || 0}`,
      `Device Type: ${/Mobi|Android/i.test(nav.userAgent) ? 'Mobile' : 'Desktop'}`,
      `PDF Viewer: ${nav.pdfViewerEnabled ? 'Yes' : 'No'}`,
      `Cookies Enabled: ${nav.cookieEnabled ? 'Yes' : 'No'}`,
      `Online Status: ${nav.onLine ? 'Online' : 'Offline'}`,
      `Do Not Track: ${nav.doNotTrack}`,
      `Time Zone Offset: ${new Date().getTimezoneOffset()}`,
      `Local Time: ${new Date().toLocaleString()}`,
    ].join(" | ");

    // Submit to Google Form
    const formData = new FormData();
    formData.append(trackingConfig.googleForm.fields.timestamp, new Date().toISOString());
    formData.append(trackingConfig.googleForm.fields.eventType, 'page_visited');
    formData.append(trackingConfig.googleForm.fields.ipAddress, ip);
    formData.append(trackingConfig.googleForm.fields.userAgent, nav.userAgent);
    formData.append(trackingConfig.googleForm.fields.country, geoData?.country_name || '');
    formData.append(trackingConfig.googleForm.fields.additionalData, additionalData);

    await fetch(trackingConfig.googleForm.actionUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
  } catch (error) {
    console.error('Tracking error:', error);
  }
};