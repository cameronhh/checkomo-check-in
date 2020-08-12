import axios from 'axios';
import moment from 'moment';

export async function getVenueDetail(venueId) {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE}/venue/${venueId}`);

  return { name: res.data.name };
}

export async function getVenueCodeDetail(venueId, venueCode) {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE}/venue/${venueId}/venuecode?code=${venueCode}`);
  const isValidCode = res.data.end_dttm ? moment.utc(res.data.end_dttm).isAfter(moment.utc()) : true
  return { name: res.data.name, id: res.data.id, isValidCode: isValidCode};
}

export const postVisit = async (mutationData) => {
  const body = {
    "given_name": mutationData.firstName,
    "surname": mutationData.lastName,
    "address": mutationData.address,
    "email": mutationData.email,
    "phone": mutationData.phone,
    "in_dttm": moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    "venue_code_id": mutationData.venueCodeId,
    "out_dttm": null,
    "clustered_id": null,
    "meta_info": "",
  }

  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/venue/${mutationData.venueId}/visit?venue_code=${mutationData.venueCode}`,
    body);

  return res.data;
}
