import axios from 'axios';

import { login } from './redirect';
import { userProfile } from './url';
import { deleteCookie } from './cookie';

export default async ({ res, token }) => {
  try {
    const result = await axios.get(userProfile, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!result.data.pk) {
      login({ res });
    }
    return result.data;
  } catch (error) {
    console.log(error);
    deleteCookie('token');
    deleteCookie('pk');
    login({ res });
  }
};
