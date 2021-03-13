import * as ACTIONS from '../actions/sogh.js';

export const successedConnectGithub = (state, action) => {
    return action.data;
};

export const failedConnectGithub = (state, action) => {
    return action.data;
};

const sogh = (state = [], action) => {
    switch (action.type) {

    case ACTIONS.SUCCESSED_CONNECT_GITHUB: return successedConnectGithub(state, action);
    case ACTIONS.FAILED_CONNECT_GITHUB:    return failedConnectGithub(state, action);

    default:
        return state;
    }
};

export default sogh;
