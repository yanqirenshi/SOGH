import React from 'react';

import {Tabs} from 'react-bulma-components';

function makeTab (d, selected, pathname) {
    return <Tabs.Tab key={d.code}
                     active={d.code===selected}
                     href={pathname + '?tab='+d.code}>
             {d.label}
           </Tabs.Tab>;
}

function TabsRoot (props) {
    return (
        <Tabs type={'boxed'} align={'centered'}>
          {props.tabs.map(d => {
              return makeTab(d, props.selected, props.pathname);
          })}
        </Tabs>
    );
}

export default TabsRoot;
