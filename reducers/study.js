export const initialState = {
  studies: [],
};

export const ADD_STUDY_REQUEST = 'ADD_STUDY_REQUEST';
export const ADD_STUDY_SUCCESS = 'ADD_STUDY_SUCCESS';
export const ADD_STUDY_FAILURE = 'ADD_STUDY_FAILURE';
export const LOAD_STUDIES_REQUEST = 'LOAD_STUDIES_REQUEST';
export const LOAD_STUDIES_SUCCESS = 'LOAD_STUDIES_SUCCESS';
export const LOAD_STUDIES_FAILURE = 'LOAD_STUDIES_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDY_REQUEST:
      return {
        ...state,
      };
    case ADD_STUDY_SUCCESS:
      return {
        ...state,
        studies: [
          ...state.studies,
          {
            category: action.data.category,
            name: action.data.name,
            description: action.data.description,
          },
        ],
      };
    case ADD_STUDY_FAILURE:
      return {
        ...state,
      };

    case LOAD_STUDIES_REQUEST:
      return {
        ...state,
      };
    case LOAD_STUDIES_SUCCESS:
      return {
        ...state,
        studies: action.data,
      };
    case LOAD_STUDIES_FAILURE:
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
