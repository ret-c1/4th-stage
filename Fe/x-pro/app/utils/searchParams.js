export const searchParams = () => {
    // const params = new URL(window.location);
    // const qs = params.searchParams.get(query);
    // return qs;
    const obj = {};
    decodeURI(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        obj[key] = value;
    });
    return obj;
};
