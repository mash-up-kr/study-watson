export const initialState = {
  schedules: [],
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_FAILURE = 'ADD_SCHEDULE_FAILURE';

export const LOAD_SCHEDULES_REQUEST = 'LOAD_SCHEDULES_REQUEST';
export const LOAD_SCHEDULES_SUCCESS = 'LOAD_SCHEDULES_SUCCESS';
export const LOAD_SCHEDULES_FAILURE = 'LOAD_SCHEDULES_FAILURE';

export const DELETE_SCHEDULE_REQUEST = 'DELETE_SCHEDULE_REQUEST';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_FAILURE = 'DELETE_SCHEDULE_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCHEDULE_REQUEST:
      return {
        ...state,
      };

    case ADD_SCHEDULE_SUCCESS:
      return {
        ...state,
      };

    case ADD_SCHEDULE_FAILURE:
      return {
        ...state,
      };

    case LOAD_SCHEDULES_REQUEST:
      return {
        ...state,
      };

    case LOAD_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: action.data,
      };

    case LOAD_SCHEDULES_FAILURE:
      return {
        ...state,
      };

    case DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: state.schedules.filter(schedule => {
          return parseInt(schedule.pk, 10) !== parseInt(action.pk, 10);
        }),
      };
    case DELETE_SCHEDULE_FAILURE:
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
