import styled from 'styled-components';

const IsHideDiv = styled.div`
    display: ${(props) => {
        const { show } = props;
        return show ? '' : 'none';
    }};
    text-align: ${(props) => {
        const { no } = props;
        return no ? '' : 'center';
    }};
`;

export default IsHideDiv;
