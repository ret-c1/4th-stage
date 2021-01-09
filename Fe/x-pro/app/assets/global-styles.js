import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    p {
        margin-bottom: 0;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            margin: 0;
            padding: 0;
        }
    }
    dl {
        list-style: none;
        margin: 0;
        padding: 0;
        dt, dd {
            margin: 0;
            padding: 0;
        }
    }
    .ck-editor .ck-content {
        min-height: 100px;
    }
    .ant-drawer-content-wrapper{
        min-width: 600px;
    }
    .ant-modal{
        min-width: 600px;
    }
    .ant-tabs-nav{
        background: #fff;
    }
    .ant-table-tbody > tr > td {
        cursor: pointer;
    }
    @media (max-width: 1400px) {
        html {
            zoom: 80%;
        }
    }
`;
