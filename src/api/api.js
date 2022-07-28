import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28348938-0384dcc8789dbce7d9ed883a2';

export async function requestImage(name, page = 1) {
  const params = {
    url: BASE_URL,
    params: {
      key: API_KEY,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      q: name,
      per_page: 12,
    },
  };

  try {
    return await axios(params);
  } catch (error) {
    return error;
  }
}
