import fetch from './Config';

export const createWidget = () => {
    const body = {};
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    return fetch.post('/widget/', body, {headers});
};

export const getWidget = () => {
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    return fetch.get('/widget/', {headers});
};

export const updateWidget = (body) => {
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    return fetch.put('/widget/', body, {headers});
};

export const upload = (url) => {
    const body = {url};
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    return fetch.post('/upload/', body, {headers});
};

export const register = (name, email, password) => {
    const body = {name, email, password};
    return fetch.post('/register/', body);
};

export const forgotPassword = (email) => {
    const body = {email};
    return fetch.post('/forgot/', body);
};

export const getInvoices = () => {
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    return fetch.get('/invoice/', {headers});
};

export const login = (email, password) => {
    const body = {email, password};
    return fetch.post('/login/', body);
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
