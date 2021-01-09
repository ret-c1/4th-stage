export const authStateAction = {
    get: () => localStorage.getItem('isAuthenticated'),
    set: (state) => {
        localStorage.setItem('isAuthenticated', state);
    },
    remove: () => {
        localStorage.removeItem('isAuthenticated');
    },
};

export const authAction = {
    get: () => localStorage.getItem('AUTHENTICATION'),
    set: (state) => {
        localStorage.setItem('AUTHENTICATION', state);
    },
    remove: () => {
        localStorage.removeItem('AUTHENTICATION');
    },
};

export const redirectAction = {
    get: () => localStorage.getItem('redirect_from'),
    set: (state) => {
        localStorage.setItem('redirect_from', state);
    },
    remove: () => {
        localStorage.removeItem('redirect_from');
    },
};
