import styled from 'styled-components';

const Zzs = styled.div`
    width: 110px;
    height: 31px;
    background-color: #fff;
    background-image: ${(props) => {
        const { src } = props;
        return src !== '' ? `url(${src})` : '';
    }};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    margin-bottom: 10px;
    margin-right: 5px;
`;

export default Zzs;
