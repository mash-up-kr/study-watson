
import axios from 'axios';

import redirect from './redirect';

export default async ({ res, token, studyId, pk }) => {
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/memberships/?user=${pk}&study=${studyId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!result.data || !result.data[0] || result.data[0].isWithdraw === true) {
      redirect({ res })
    }
    return result.data[0];
  } catch (error) {
    console.log(error);
    redirect({ res })
  }
}

