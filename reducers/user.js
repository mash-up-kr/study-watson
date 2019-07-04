export const initialState = {
  isLogin: false,
  pk: '',
  username: '',
  email: '',
  phoneNumber: '',
  studies: [],
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS';
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
      };
    case SIGN_UP_SUCCESS:
      const { pk, username, email, phoneNumber } = action.data;
      return {
        ...state,
        pk,
        username,
        email,
        phoneNumber,
        isLogin: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLogin: true,
        id: action.id,
        name: action.name,
        email: action.email,
        phone: action.phone,
      };
    case EDIT_USER_REQUEST:
      return {
        ...state,
        name: action.name,
        email: action.email,
        phone: action.phone,
      };

    case LOG_OUT_REQUEST:
      window.localStorage.removeItem('user');
      return {
        ...state,
        isLogin: action.isLogin,
      };

    case WITHDRAW_REQUEST:
      return {
        ...state,
        isLogin: action.isLogin,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
