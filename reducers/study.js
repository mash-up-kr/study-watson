export const initialState = {
  studies: [],
  study: {},
  memberships: {},
};

export const ADD_STUDY_REQUEST = 'ADD_STUDY_REQUEST';
export const ADD_STUDY_SUCCESS = 'ADD_STUDY_SUCCESS';
export const ADD_STUDY_FAILURE = 'ADD_STUDY_FAILURE';

export const LOAD_STUDIES_REQUEST = 'LOAD_STUDIES_REQUEST';
export const LOAD_STUDIES_SUCCESS = 'LOAD_STUDIES_SUCCESS';
export const LOAD_STUDIES_FAILURE = 'LOAD_STUDIES_FAILURE';

export const LOAD_STUDY_REQUEST = 'LOAD_STUDY_REQUEST';
export const LOAD_STUDY_SUCCESS = 'LOAD_STUDY_SUCCESS';
export const LOAD_STUDY_FAILURE = 'LOAD_STUDY_FAILURE';

export const LOAD_STUDY_MEMBERSHIPS_REQUEST = 'LOAD_STUDY_MEMBERSHIPS_REQUEST';
export const LOAD_STUDY_MEMBERSHIPS_SUCCESS = 'LOAD_STUDY_MEMBERSHIPS_SUCCESS';
export const LOAD_STUDY_MEMBERSHIPS_FAILURE = 'LOAD_STUDY_MEMBERSHIPS_FAILURE';

export const WITHDRAW_STUDY_REQUEST = 'WITHDRAW_STUDY_REQUEST';
export const WITHDRAW_STUDY_SUCCESS = 'WITHDRAW_STUDY_SUCCESS';
export const WITHDRAW_STUDY_FAILURE = 'WITHDRAW_STUDY_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDY_REQUEST:
      return {
        ...state,
      };
    case ADD_STUDY_SUCCESS:
      return {
        ...state,
        studies: [...state.studies, action.data],
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

    case LOAD_STUDY_REQUEST:
      return {
        ...state,
      };
    case LOAD_STUDY_SUCCESS:
      return {
        ...state,
        study: action.data,
      };
    case LOAD_STUDY_FAILURE:
      return {
        ...state,
      };

    case LOAD_STUDY_MEMBERSHIPS_REQUEST:
      return {
        ...state,
      };
    case LOAD_STUDY_MEMBERSHIPS_SUCCESS:
      return {
        ...state,
        memberships: action.data,
      };
    case LOAD_STUDY_MEMBERSHIPS_FAILURE:
      return {
        ...state,
      };

    case WITHDRAW_STUDY_REQUEST:
      return {
        ...state,
      };
    case WITHDRAW_STUDY_SUCCESS:
      return {
        ...state,
      };
    case WITHDRAW_STUDY_FAILURE:
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
