
export const trackVisit = async (trackingConfig: TrackingConfig) => {
  try {
    if (!trackingConfig?.enabled) return;

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

    // Prepare additional data string
    const additionalData = [
      `Source: ${source}`,
      `City: ${geoData?.city}`,
      `Region: ${geoData?.region}`,
      `TimeZone: ${geoData?.timezone}`,
      `Latitude: ${geoData?.latitude}`,
      `Longitude: ${geoData?.longitude}`,
      `Postal: ${geoData?.postal}`,
      `Org: ${geoData?.org}`
    ].join(" | ");

    // Submit to Google Form
    const formData = new FormData();
    formData.append(trackingConfig.googleForm.fields.timestamp, new Date().toISOString());
    formData.append(trackingConfig.googleForm.fields.eventType, 'page_visited');
    formData.append(trackingConfig.googleForm.fields.ipAddress, ip);
    formData.append(trackingConfig.googleForm.fields.userAgent, navigator.userAgent);
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