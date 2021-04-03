import React, { useState, useEffect } from 'react';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductBacklogs from '../common/ProductBacklogs.js';

import ListProductBacklogs from './ListProductBacklogs.js';
import ProductAndMilestone from '../common/ProductAndMilestone.js';
import Filter from '../common/Filter.js';
import ChartBardown from '../common/ChartBardown.js';

import ContentsArea  from './ContentsArea.js';
import SprintListArea from './SprintListArea.js';

import style from './Style.js';

export default function Contents (props) {
    const scrum = props.scrum;
    const sogh = scrum._sogh;

    const base = scrum._data;
    const data = scrum._projects;

    const projects = data.projects;
    const projects_filterd = data.projects_filterd;

    const sorted_projects = sogh.sortProjectsByPriority(projects.list);
    const sorted_projects_filterd = sogh.sortProjectsByPriority(projects_filterd.list);

    const repository = props.repository;
    const issues = base.issues;
    const milestone = base.milestone;
    const filter = data.filter;
    const callbacks = props.callbacks;

    return (
        <div style={style.contents_area.root}>
          <div style={style.contents_area.head}>
            <ProductAndMilestone repository={repository}
                                 milestone={milestone} />
          </div>

          <div style={style.contents_area.controller}>
            <div>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <Filter issues={issues}
                    filter={filter}
                    callbacks={callbacks}
                    sogh={sogh} />
          </div>

          <div style={style.contents_area.body}>

            <div style={{minWidth:333, maxWidth:333}}>
              <ListProductBacklogs projects={sorted_projects}
                                   filter={filter}
                                   callbacks={callbacks} />
            </div>

            <div style={{flexGrow:1, marginLeft: 11}}>
              <div>
                <ChartBardown issues={issues}
                              milestone={milestone} />
              </div>

              <ProductBacklogs projects={sorted_projects_filterd}
                               close_projects={data.close_projects}
                               callbacks={callbacks}
                               sogh={sogh} />
            </div>
          </div>
        </div>
    );
}
