import styled from 'styled-components';

const IsHideDiv = styled.div`
    display: ${(props) => {
        const { show } = props;
        return show ? '' : 'none';
    }};
    /* text-align: center; */
`;

export default IsHideDiv;
