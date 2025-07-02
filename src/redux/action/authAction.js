import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
export const login = (credentials, navigate) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', credentials);
    const token = res.data.token;
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
        navigate('/dashboard');
    
  } catch (err) {
    console.error(err);
  }
};

export const register = (formData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });

      const res = await axios.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      navigate('/login');
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: err.response?.data?.message || 'Erreur lors de l’inscription',
      });
      throw err;
    }
  };
};

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/me');
    dispatch({ type: 'SET_USER', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
