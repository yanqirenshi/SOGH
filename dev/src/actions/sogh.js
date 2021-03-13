import Sogh from '../lib/js/Sogh.js';

export const SUCCESSED_CONNECT_GITHUB = 'SUCCESSED_CONNECT_GITHUB';
export const FAILED_CONNECT_GITHUB = 'FAILED_CONNECT_GITHUB';

export const successedConnectGithub = (sogh) => ({
    type: SUCCESSED_CONNECT_GITHUB,
    data: sogh,
});
export const failedConnectGithub = () => ({
    type: FAILED_CONNECT_GITHUB,
    data: null,
});

export const connectGithub = (token) => {
    return (dispatch) => {
        new Sogh().connect(token,
                           (sogh) => dispatch(successedConnectGithub(sogh)),
                           ()     => dispatch(failedConnectGithub()));
    };
};
