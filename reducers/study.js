export const initialState = {
  studies: [],
};

export const ADD_STUDY = 'ADD_STUDY';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDY:
      return {
        ...state,
        studies: [...state.studies, action.payload],
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
