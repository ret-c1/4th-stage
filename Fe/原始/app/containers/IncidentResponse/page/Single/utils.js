export const formAction = {
    get: () => {
        const form = sessionStorage.getItem('singleResponsForm');
        return JSON.parse(form);
    },
    set: (form) => {
        sessionStorage.setItem('singleResponsForm', JSON.stringify(form));
    },
    remove: () => {
        sessionStorage.removeItem('singleResponsForm');
    },
};
