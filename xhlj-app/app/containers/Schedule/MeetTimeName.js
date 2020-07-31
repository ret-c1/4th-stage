import styled from 'styled-components';

const MeetTimeName = styled.span`
    color: #e4e4e4;
    line-height: 1.5;
    margin-left: ${(props) => {
        const { noleft } = props;
        return noleft ? '' : '20px';
    }};
`;

export default MeetTimeName;
