import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import IconFilter from './IconFilter.js';

import ANewTab from '../common/ANewTab.js';
import ButtonToggle from '../common/ButtonToggle.js';

import ButtonViewSwitch from './ButtonViewSwitch.js';
import ButtonRefresh from './ButtonRefresh.js';

import Keyword from './pb_filters/Keyword.js';
import Attributes from './pb_filters/Attributes.js';
import Closing from './pb_filters/Closing.js';
import Close from './pb_filters/Close.js';

const style = {
    first: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginLeft: 11,
    },
};

export default function PBFilters (props) {
    const sogh = props.sogh;
    const core = props.core;
    const callbacks = props.callbacks.filter;

    const projects = props.projects;
    const filterd_projects = props.filterd_projects;

    const filter = core._filter;
    const filters = core.getFilters(projects);

    const help = props.help;

    const changeKeyword = (e) => callbacks.keyword.change(e.target.value);
    const clearKeyword = (e) => callbacks.keyword.change('');
    const switchPriority = (code) => {
        const f = d => d.code===code;

        const item = filters.assignees.find(f)
              || filters.types.find(f)
              || filters.priorities.find(f);

        callbacks.priority.switch(item);
    };

    return (
        <div>
          <div style={style.first}>
            <IconFilter style={{marginTop: -15}}/>

            <Keyword filter={filter}
                     changeKeyword={changeKeyword}
                     clearKeyword={clearKeyword}/>

            <Close   filter={filter} callbacks={callbacks}/>

            <Closing filter={filter} callbacks={callbacks}/>
          </div>

          <div>
            {['priorities', 'types', 'assignees'].map(type=> (
                <Attributes key={type}
                            type={type}
                            sogh={sogh}
                            filter={filter}
                            filters={filters}
                            callbacks={callbacks}
                            callback={switchPriority}/>
            ))}
          </div>
        </div>
    );
}
