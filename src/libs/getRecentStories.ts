import axios from 'axios';

export default async function getRecentStories() {
  let res;
  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stories/recent?amount=16&filter=desc`,
    );
  } catch (err) {
    return;
  }

  return res.data;
}
