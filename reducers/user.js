export const initialState = {
  isLogin: false,
  id: '',
  name: '',
  email: '',
  studies: [],
};

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';

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
    default: {
      return {
        ...state,
      };
    }
  }
};
