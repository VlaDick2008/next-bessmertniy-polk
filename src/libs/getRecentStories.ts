import axios from 'axios';

export default async function getRecentStories() {
  const res = await axios.get(`http://localhost:3000/api/stories/recent?amount=16&filter=desc`);
  if (res.status !== 200) throw new Error('Ашибка!!!');

  return res.data;
}
