import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Cards      from './product_backlogs/Cards.js';
import Table      from './product_backlogs/Table.js';
import Controller from './product_backlogs/Controller.js';

const style = {
    root: {
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        height:'100%',
    },
    controller: {
        paddingLeft: 88,
        paddingRight: 88,
    },
};

export default function ProductBacklogs (props) {
    const [updated_at, setUpdatedAt] = useState(new Date());
    const [core, setCore] = useState(null);
    const [projects, setProjects] = useState([]);

    const sogh = props.sogh;
    const repository = props.repository;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    useEffect(() => {
        if (!sogh) return;

        setCore(sogh.productBacklogs());
    }, [sogh]);

    useEffect(() => {
        if (!repository) return;

        sogh.getProjectsByRepository(repository, (projects) => {
            setProjects(projects);
        });

    }, [repository]);

    if (!core) return <NotSignIn />;

    const callbacks = {
        refresh: () => {
            setProjects([]);

            sogh.getProjectsByRepository(repository, (projects) => {
                console.log(projects);
                setProjects(projects);
            });
        },
    };

    const callbacks2 = {
        filter: {
            keyword: {
                change: (v) => {
                    core.changeFilterKeyword(v);
                    setUpdatedAt(new Date());
                },
            },
            priority: {
                switch: (item) => {
                    core.switchFilterPriority(item);
                    setUpdatedAt(new Date());
                }
            },
            closing: (code) => {
                core.switchFilterClosing (code);
                setUpdatedAt(new Date());
            },
        },
        view: {
            change: (type) => {
                core.changeViewMode(type);
                setUpdatedAt(new Date());
            },
        },
        refresh: () => callbacks.refresh(),
    };

    const filterd_projects = core.filtering(projects);

    return (
        <div style={style.root} updated_at={updated_at.toGMTString()}>

          <div style={style.controller}>
            <Controller sogh={sogh}
                        core={core}
                        callbacks={callbacks2}
                        projects={projects}
                        filterd_projects={filterd_projects}
                        help={props.help} />
          </div>

          <div style={{flexGrow: 1, overflow: 'auto', padding: 22, paddingTop:11}}>
            {'table'===core._view_mode &&
             <Table projects={filterd_projects}
                    sogh={sogh}
                    productbacklog_url_prefix={productbacklog_url_prefix} />}

            {'cards'===core._view_mode &&
             <Cards projects={filterd_projects} sogh={sogh} />}
          </div>
        </div>
    );
}
