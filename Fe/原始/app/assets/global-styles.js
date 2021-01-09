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
`;
