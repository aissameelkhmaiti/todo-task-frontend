const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, token: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { token: null, user: null };
    default:
      return state;
  }
}
