export const trackDownload = async (trackingConfig: TrackingConfig) => {
  try {
    if (!trackingConfig?.enabled) return;

    const params = new URLSearchParams(window.location.search);
    const sourceParam = trackingConfig.sourceDetection.ignoreParam;
    const ignoreValue = trackingConfig.sourceDetection.ignoreValue;

    const source = params?.get(sourceParam);
    if (source && source === ignoreValue) {
      return;
    }

    const ipResponse = await fetch(trackingConfig.ipServices.ipLookup);
    const { ip } = await ipResponse.json();

    const formData = new FormData();
    formData.append(trackingConfig.googleForm.fields.timestamp, new Date().toISOString());
    formData.append(trackingConfig.googleForm.fields.eventType, 'resume_downloaded');
    formData.append(trackingConfig.googleForm.fields.ipAddress, ip);
    formData.append(trackingConfig.googleForm.fields.userAgent, navigator.userAgent);
    formData.append(trackingConfig.googleForm.fields.country, '');
    formData.append(trackingConfig.googleForm.fields.additionalData, '');

    await fetch(trackingConfig.googleForm.actionUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
  } catch (error) {
    console.error('Tracking error:', error);
  }
};