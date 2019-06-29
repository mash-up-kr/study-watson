export const initialState = {
  isLogin: false,
  id: '',
  name: '',
  email: '',
  studies: [],
};

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';
export const WITHDRAW = 'WITHDRAW';
export const EDIT_USER = 'EDIT_USER';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        isLogin: true,
        id: action.id,
        name: action.name,
        email: action.email,
        phone: action.phone,
      };
    case LOG_IN :
      return {
        ...state,
        isLogin: true,
        id: action.id,
        name: action.name,
        email: action.email,
        phone: action.phone,
      };
    case EDIT_USER:
      return {
        ...state,
        name: action.name,
        email: action.email,
        phone: action.phone,
      };

    case LOG_OUT:
      return {
        ...state,
        isLogin: action.isLogin
      };

    case WITHDRAW:
      return {
        ...state,
        isLogin: action.isLogin
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
