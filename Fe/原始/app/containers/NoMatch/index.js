import { connect } from 'react-redux';
import NoMatch from './page';

const connectNoMatch = connect(null, null)(NoMatch);

export const nomatchRouter = [
    {
        path: '/404',
        component: connectNoMatch,
    },
];

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
