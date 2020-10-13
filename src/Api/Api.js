import fetch from './Config';

export const createWidget = () => {
  const body = {};
  const headers = {
    Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.post('/widget/', body, {headers});
}

export const getWidget = () => {
  const headers = {
    Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.get('/widget/', {headers});
}

export const upload = (url) => {
  const body = {url};
  const headers = {
    Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.post('/upload/', body, {headers});
};

export const updateProfile = (header, caption, message) => {
  const body = {header, caption, message};
  const headers = {
    Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.post('/profile/', body, {headers});
};

export const register = (name, email, password) => {
  const body = {name, email, password};
  return fetch.post('/register/', body);
};

export const saveAccessToken = (code, token) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {code, token};
  return fetch.post('/accesstoken/', body, {headers});
};

export const forgotPassword = (email) => {
  const body = {email};
  return fetch.post('/forgot/', body);
};

export const getInvoices = (invoice) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.get('/invoice/', {headers});
};

export const login = (email, password) => {
  const body = {email, password};
  return fetch.post('/login/', body);
};

export const getSite = (token) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {token};
  return fetch.post('/site/', body, {headers});
};

export const verifySnippet = (siteId) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {siteId};
  return fetch.post('/snippet/', body, {headers});
};

export const createSubscription = (
  paymentMethodId,
  customerId,
  planId,
  nickname
) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {
      paymentMethodId,
      customerId,
      planId,
      nickname
  };
  return fetch.post('/subscription/', body, {headers});
};

export const getSubscription = () => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.get('/subscription/', {headers});
};

export const cancelSubscription = () => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.delete('/subscription/', {headers});
};

export const getUser = () => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  return fetch.get('/user/', {headers});
};

export const getPlans = () => {
  return fetch.get('/plans/');
};

export const verifyUpSell = (site_id) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {token: localStorage.getItem('token'), site_id};
  return fetch.post('/upsell/', body, {headers});
};

export const verifyCrossSell = (site_id) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {token: localStorage.getItem('token'), site_id};
  return fetch.post('/crosssell/', body, {headers});
};

export const resetPassword = (
  currentPassword,
  newPassword,
  confirmPassword,
  token
) => {
  const headers = {
      Authorization: 'Token ' + localStorage.getItem('token')
  };
  const body = {
      currentPassword,
      newPassword,
      confirmPassword,
      token
  };
  return fetch.post('/resetpassword/', body, {headers});
};
