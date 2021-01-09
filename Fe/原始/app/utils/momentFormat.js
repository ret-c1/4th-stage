import moment from 'moment';

export const dateFormat = (date = '1970-01-01', format = 'YY-MM-DD') =>
    date && moment(date).format(format);
