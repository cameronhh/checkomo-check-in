import axios from 'axios';
import moment from 'moment';

const getMetaData = () => ({
  timezone: new Date().getTimezoneOffset() / 60,
  pageon: window.location.pathname,
  referrer: document.referrer,
  previousSites: window.history.length,
  browserName: navigator.appName,
  browserEngine: navigator.product,
  browserVersion1a: navigator.appVersion,
  browserVersion1b: navigator.userAgent,
  browserLanguage: navigator.language,
  browserOnline: navigator.onLine,
  browserPlatform: navigator.platform,
  javaEnabled: navigator.javaEnabled(),
  dataCookiesEnabled: navigator.cookieEnabled,
  dataCookies1: document.cookie,
  dataCookies2: decodeURIComponent(document.cookie.split(';')),
  dataStorage: localStorage,
  sizeScreenW: window.screen.width,
  sizeScreenH: window.screen.height,
  sizeDocW: document.width,
  sizeDocH: document.height,
  sizeInW: window.innerWidth,
  sizeInH: window.innerHeight,
  sizeAvailW: window.screen.availWidth,
  sizeAvailH: window.screen.availHeight,
  scrColorDepth: window.screen.colorDepth,
  scrPixelDepth: window.screen.pixelDepth,
});

export async function getVenueDetail(venueId) {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE}/venue/${venueId}`);

  return { name: res.data.name };
}

export async function getVenueCodeDetail(venueId, venueCode) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/venuecode?code=${venueCode}`
  );
  const isValidCode = res.data.end_dttm
    ? moment.utc(res.data.end_dttm).isAfter(moment.utc())
    : true;
  return { name: res.data.name, id: res.data.id, isValidCode: isValidCode };
}

export const postVisit = async (mutationData) => {
  const body = {
    given_name: mutationData.firstName,
    surname: mutationData.lastName,
    address: mutationData.address,
    email: mutationData.email,
    phone: mutationData.phone,
    in_dttm: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    venue_code_id: mutationData.venueCodeId,
    out_dttm: null,
    clustered_id: null,
    meta_info: JSON.stringify(getMetaData()),
  };

  console.log(body);

  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/venue/${mutationData.venueId}/visit?venue_code=${mutationData.venueCode}`,
    body
  );

  return res.data;
};
