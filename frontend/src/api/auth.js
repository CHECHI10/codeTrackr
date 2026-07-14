import api from './axios'

export const registerUser = (data) => {
  return api.post('/auth/register', data)
}

export const loginUser = (data) => {
  return api.post('/auth/login', data)
}

export const logoutUser = () => {
  return api.post('/auth/logout')
}

export const getCurrentUser = () => {
  return api.get('/auth/me', {
    // 401 means "not authenticated" — not an unexpected failure for bootstrap
    validateStatus: (status) => status === 200 || status === 401,
  })
}
