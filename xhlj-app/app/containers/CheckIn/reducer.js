import {
    setToken,
    getToken,
    getRole,
    setRole,
    getSignType,
    setSignType,
    getCodeString,
    setCodeString,
    getUserId,
    setUserId,
    getHotelId,
    setHotelId,
} from 'utils/authority';

const localToken = getToken();
const tokenState = {
    token: localToken,
};

export const setTokenReducer = (state = tokenState, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return state;
        case 'SET_TOKEN':
            setToken(action.astoken);
            return Object.assign({}, state, {
                token: action.astoken,
            });
        default:
            return state;
    }
};

const localRole = getRole();
const roleState = {
    role: localRole,
};

export const setRoleReducer = (state = roleState, action) => {
    switch (action.type) {
        case 'GET_ROLE':
            return state;
        case 'SET_ROLE':
            setRole(action.asrole);
            return Object.assign({}, state, {
                role: action.asrole,
            });
        default:
            return state;
    }
};

const localSignType = getSignType();
const signTypeState = {
    signType: localSignType,
};

export const setSignTypeReducer = (state = signTypeState, action) => {
    switch (action.type) {
        case 'GET_SIGNTYPE':
            return state;
        case 'SET_SIGNTYPE':
            setSignType(action.assignType);
            return Object.assign({}, state, {
                signType: action.assignType,
            });
        default:
            return state;
    }
};

const localCodeString = getCodeString();
const codeStringState = {
    codeString: localCodeString,
};

export const setCodeStringReducer = (state = codeStringState, action) => {
    switch (action.type) {
        case 'GET_CODESTRING':
            return state;
        case 'SET_CODESTRING':
            setCodeString(action.ascodeString);
            return Object.assign({}, state, {
                codeString: action.ascodeString,
            });
        default:
            return state;
    }
};

const localUserId = getUserId();
const userIdState = {
    userId: localUserId,
};

export const setUserIdReducer = (state = userIdState, action) => {
    switch (action.type) {
        case 'GET_USERID':
            return state;
        case 'SET_USERID':
            setUserId(action.asuserid);
            return Object.assign({}, state, {
                userId: action.asuserid,
            });
        default:
            return state;
    }
};

const localHotelId = getHotelId();
const hotelIdState = {
    hotelId: localHotelId,
};

export const setHotelIdReducer = (state = hotelIdState, action) => {
    switch (action.type) {
        case 'GET_HOTELID':
            return state;
        case 'SET_HOTELID':
            setHotelId(action.ashotelId);
            return Object.assign({}, state, {
                hotelId: action.ashotelId,
            });
        default:
            return state;
    }
};
