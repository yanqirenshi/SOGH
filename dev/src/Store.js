import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

let StoreModel = {
    sogh: null,
    // product_backlogs: {
    //     view_mode: 'table',
    //     projects: [],
    // },
    // product_backlog: {
    //     issues: [],
    //     milestones: { ht: {}, list: [] },
    //     columns:    { ht: {}, list: [] },
    //     assignees:  { ht: {}, list: [] },
    // },
    // sprint_planning: {},
    // scrum: {
    //     milestones: [],
    //     milestone: null,
    //     issues: [],
    //     projects: {},
    //     timeline: {},
    // },
    // reports: {
    // }
};

const Store = createStore(
    rootReducer,
    StoreModel,
    applyMiddleware(thunk, logger),
);

export default Store;
