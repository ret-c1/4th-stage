import React from 'react';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import DashboadPage from './Dashboad';

const IndexPage = () => {
    const location = useLocation();
    console.log(location);
    return <DashboadPage />;
};

// IndexPage.propTypes = {
//     requestLogin: PropTypes.func,
// };

export default IndexPage;
