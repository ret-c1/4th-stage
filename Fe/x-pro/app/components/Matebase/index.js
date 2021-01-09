import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const Matebase = (props) => {
    const [iframeUrl, setIframeUrl] = useState(null);
    const {
        id = '0',
        starttime = moment().subtract(1, 'days').format('YYYY-MM-DD'),
        endtime = moment().format('YYYY-MM-DD'),
        height = '700',
        width = '1000',
    } = props;

    useEffect(() => {
        const METABASE_SITE_URL = '/metabase';
        const METABASE_SECRET_KEY =
            'cc5c2be75c80c6c318d1e0057ed24782e108d0c6aefac795aae29ed1f6a0305e';
        const payload = {
            resource: { dashboard: Number(id) },
            params: {
                starttime,
                endtime,
            },
            exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
        };
        if (props.user_id) {
            payload.params.user_id = props.user_id;
        }

        const token = jwt.sign(payload, METABASE_SECRET_KEY);
        setIframeUrl(`${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false`);
    }, [starttime, endtime, props.user_id]);

    return (
        <div style={{ textAlign: 'center' }}>
            <iframe title="bar" src={iframeUrl} frameBorder="0" width={width} height={height} />
        </div>
    );
};

Matebase.propTypes = {
    id: PropTypes.number,
    user_id: PropTypes.number,
    starttime: PropTypes.string,
    endtime: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

const withConnect = connect(null, null);

export default compose(withConnect, memo)(Matebase);
