import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchValue, page = 1, perPage = 15) {
  const searchParams = new URLSearchParams({
    key: '45041443-5e59051ebb139c7689a42bd95',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`?${searchParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}