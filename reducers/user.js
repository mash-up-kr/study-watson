export const initialState = {
  isLogin: false,
  pk: '',
  username: '',
  email: '',
  phoneNumber: '',
  imgProfile: '',
  nickname: '',
};

// export const USER_ATTRIBUTE_CHECK_REQUEST = 'USER_ATTRIBUTE_CHECK_REQUEST';
// export const USER_ATTRIBUTE_CHECK_SUCCESS = 'USER_ATTRIBUTE_CHECK_SUCCESS';
// export const USER_ATTRIBUTE_CHECK_FAILURE = 'USER_ATTRIBUTE_CHECK_FAILURE';

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

export const WITHDRAW_USER_REQUEST = 'WITHDRAW_USER_REQUEST';
export const WITHDRAW_USER_SUCCESS = 'WITHDRAW_USER_SUCCESS';
export const WITHDRAW_USER_FAILURE = 'WITHDRAW_USER_FAILURE';

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
      return {
        ...state,
        pk: action.data.pk,
        username: action.data.username,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        nickname: action.data.nickname,
        isLogin: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
      };

    case LOG_IN_REQUEST:
      return {
        ...state,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        pk: action.data.pk,
        username: action.data.username,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        nickname: action.data.nickname,
        isLogin: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
      };

    case LOAD_USER_REQUEST:
      return {
        ...state,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        pk: action.data.pk,
        username: action.data.username,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        imgProfile: action.data.imgProfile,
        nickname: action.data.nickname,
        isLogin: true,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
      };

    case EDIT_USER_REQUEST:
      return {
        ...state,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        imgProfile: action.data.imgProfile,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        nickname: action.data.nickname,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        pk: '',
        username: '',
        email: '',
        phoneNumber: '',
        nickname: '',
        isLogin: false,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
      };

    case WITHDRAW_USER_REQUEST:
      return {
        ...state,
      };
    case WITHDRAW_USER_SUCCESS:
      return {
        ...state,
        pk: '',
        username: '',
        email: '',
        phoneNumber: '',
        nickname: '',
        isLogin: false,
      };
    case WITHDRAW_USER_FAILURE:
      return {
        ...state,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
