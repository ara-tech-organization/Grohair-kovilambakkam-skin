/**
 * SINGLE PLACE TO EDIT BUSINESS DETAILS AND THE FORM API.
 * Empty values are hidden in the UI rather than invented.
 */
export const CLINIC = {
  name: 'Advanced GroHair & GloSkin',
  shortName: 'AdGro Hair & GloSkin',
  area: 'Kovilambakkam, Chennai',
  address: 'Medavakkam Main Rd, Kovilambakkam, Chennai', // from reference page metadata; confirm full address / PIN
  phone: '+917599256789',
  phoneDisplay: '+91 75992 56789',
  email: 'adgrohair.kovilambakkam@gmail.com',
  mapUrl: '',       // TODO Google Maps link (hidden while empty)
  privacyUrl: '',   // TODO existing privacy policy URL (hidden while empty)
  siteUrl: 'https://adgrohairkovilambakkam.com',
};

export const FORM = {
  // TODO: paste the endpoint used by the existing site's appointment form.
  apiUrl: 'https://adgrohairkovilambakkam.com/api/email.php',
  // 'json' | 'form' (FormData) | 'urlencoded'. Match what the existing endpoint expects.
  format: 'json',
  // Where to go after success (existing thank-you route). Empty = show inline success message.
  thankYouPath: '', // e.g. '/thank-you'
  // Treatment value sent with every lead.
  treatment: 'Skin',
  // Matches the endpoint's $sheetPayload. Fields the form does not collect are sent as 'N/A'.
  buildPayload: (v) => {
    const na = (x) => (x && String(x).trim() ? String(x).trim() : 'N/A');
    return {
      name: na(v.name),
      email: 'N/A',
      phone: na(v.phone),
      date: na(v.date),
      time: 'N/A',
      treatment: na(v.concern) !== 'N/A' ? v.concern.trim() : FORM.treatment,
      message: 'N/A',
      source: 'skin-landing-kovilambakkam',
    };
  },
  // Existing GTM event name, if the old site pushes one.
  gtmEvent: 'form_submit',
};
