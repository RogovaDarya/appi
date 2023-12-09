const DEFAULT_STATE = {
  loading: false,
  data: null,
  error: null,
};

export function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'USER/LOADING/SET':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'USER/SET':
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case 'USER/ERROR':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case 'USER/LOGOUT':
      return {
        state: {},
      };
    default:
      return state;
  }
}
