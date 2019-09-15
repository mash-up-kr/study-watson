import axios from 'axios';

import { login } from './redirect';
import { userProfile } from './url';

export default async ({res, token}) => {
  try {
    const result = await axios.get(userProfile, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!result.data.pk) {
      login(res);
    }
    console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error)
    login(res);
  }
}