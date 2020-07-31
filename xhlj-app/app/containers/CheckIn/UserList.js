import styled from 'styled-components';

const UserList = styled.div`
    margin-bottom: ${(props) => (props.lpsmallmargin ? '0' : '8px')};
    margin-top: ${(props) => (props.lpsmallmargin ? '-12px' : '0')};
`;

export default UserList;
