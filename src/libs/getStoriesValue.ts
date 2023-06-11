import axios from 'axios';

export default async function getStoriesCount() {
  const res = await axios.get(`http://localhost:3000/api/stories/value`);
  if (res.status !== 200) throw new Error('Ашибка!!!');

  return res.data;
}
