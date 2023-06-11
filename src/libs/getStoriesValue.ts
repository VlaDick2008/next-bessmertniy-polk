import axios from 'axios';

export default async function getStoriesCount() {
  let res;
  try {
    res = await axios.get(`${process.env.BASE_URL}/api/stories/value`);
  } catch (err) {
    return;
  }

  return res?.data;
}
