const DEFAULT_STATE = {
  data: [],
  loading: false,
  erroe: null,
};

export const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "NOTES/LOADING":
      return {
        loading: true,
        error: null,
        data: [],
      };
    case "NOTES/SET":
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case "NOTES/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: action.payload,
      };
    case "NOTES/DELETE":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
