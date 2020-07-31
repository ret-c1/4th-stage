import styled from 'styled-components';

const MeetDiv = styled.div`
    background-color: rgba(255, 255, 255, 0.05);
    margin: 15px;
    padding: 15px;
    padding-left: ${(props) => {
        const { left } = props;
        return left ? '' : 0;
    }};
    border-radius: 2px;
    padding-top: ${(props) => {
        const { notop } = props;
        return notop ? '0' : '';
    }};
`;

export default MeetDiv;
