export const initialState = {
  isLogin: true,
  name: '김주성',
  email: 'jusung.design@gmail.com',
  phone: '010-2947-0547',
};

export const LOG_OUT = 'LOG_OUT';
export const WITHDRAW = 'WITHDRAW';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER':
      return {
        ...state,
        ...action.payload,
      }

    case LOG_OUT:
      return {
        ...state,
        isLogin: action.isLogin
      }

    case WITHDRAW:
      return {
        ...state,
        isLogin: action.isLogin
      }

    default: {
      return {
        ...state,
      };
    }
  }
};
