import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import Sogh from '../js/Sogh.js';
import Search from './product_backlogs/Search.js';

import ANewTab from './common/ANewTab.js';

import ButtonViewSwitch from './product_backlogs/ButtonViewSwitch.js';
import ButtonRefresh from './product_backlogs/ButtonRefresh.js';
import Cards from './product_backlogs/Cards.js';
import Table from './product_backlogs/Table.js';
import ButtonToggle from './product_backlogs/ButtonToggle.js';

import style from './daily_scrum/Style.js';

function filtering (filter, projects) {
    const keyword = filter.keyword;
    const priorities = filter.priorities;
    const closing = filter.closing;

    return projects.filter(d => {
        if (keyword && !d.name.includes(keyword))
            return false;

        if (priorities[d.priority])
            return false;

        if (closing
            && !(d.progress.doneCount > 1 &&
                 d.progress.inProgressCount === 0 &&
                 d.progress.todoCount <= 1))
            return false;

        return true;
    });
}

function fetchProjects (repository, sogh, setProjects) {
    sogh.getProjectsByRepository(repository, (ret_projects) => {
        setProjects(ret_projects);
    });
}

export default function ProductBacklogs (props) {
    const [sogh] = useState(new Sogh(props.token));
    const [projects, setProjects] = useState([]);
    const [view, setView] = useState('table');
    const [filter, setFilter] = useState({
        keyword: null,
        priorities: {},
        closing: false,
    });

    useEffect(() => fetchProjects(props.repository, sogh, setProjects), [sogh]);
    useEffect(() => {
        if (projects===null) {
            fetchProjects(props.repository, sogh, setProjects);
            setProjects([]);
        }
    }, [projects]);

    const callbacks = {

        filter: {
            keyword: {
                change: (v) => {
                    const new_filter = {...filter};

                    if (v.length===0)
                        new_filter.keyword = null;
                    else
                        new_filter.keyword = v;

                    setFilter(new_filter);
                },
            },
            priority: {
                switch: (code) => {
                    const new_filter = {...filter};
                    const new_priorities = {...new_filter.priorities};

                    if (new_priorities[code])
                        delete new_priorities[code];
                    else
                        new_priorities[code] = true;

                    new_filter.priorities = new_priorities;

                    setFilter(new_filter);
                }
            },
            closing: (code) => {
                const new_filter = {...filter};

                new_filter[code] = !new_filter[code];
                setFilter(new_filter);
            },
        },
        view: {
            change: (type) => setView(type),
        },
        refresh: () => setProjects(null),
    };

    const filterd_projects = sogh.sortProjectsByPriority(filtering(filter, projects || []));

    return (
        <div style={style.root}>
          <div style={{display:'flex', justifyContent: 'center', paddingTop: 11, paddingBottom: 0 }}>
            <div style={{marginRight:33}}>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <div style={{marginRight:22}}>
              <ButtonViewSwitch type={view} callbacks={callbacks} />
            </div>

            <Search filter={filter}
                    projects={projects || []}
                    sogh={sogh}
                    callbacks={callbacks.filter} />

            {filterd_projects.length>0 &&
             <div style={{marginRight:22}}>
               <ButtonToggle label="Closing"
                             on={!filter.closing}
                             code={'closing'}
                             callback={callbacks.filter.closing}/>
             </div>}

            {props.help &&
             <div style={{marginLeft:22, fontSize: 22, display: 'flex', alignItems:'center'}}>
               <ANewTab to={props.help.to}>
                 <FontAwesomeIcon style={{}} icon={faQuestionCircle} />
               </ANewTab>
             </div>}
          </div>

          <div style={{flexGrow: 1, overflow: 'auto', padding: 22}}>
            {'table'===view && <Table projects={filterd_projects} sogh={sogh} />}
            {'cards'===view && <Cards projects={filterd_projects} sogh={sogh} />}
          </div>
        </div>
    );
}
