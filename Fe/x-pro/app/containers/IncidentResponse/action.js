export const SET_TABEL_CHECKED = 'SET_TABEL_CHECKED'; // 单选
export const SET_TABEL_ALLCHECKED = 'SET_TABEL_ALLCHECKED'; // 全选

// 单选
export const tabelcheckAction = (payload) => ({
    type: SET_TABEL_CHECKED,
    payload,
});

// 全选
export const tabelallcheckAction = (payload) => ({
    type: SET_TABEL_ALLCHECKED,
    payload,
});
