import React from 'react';

const style = {
    display: 'flex',
    width: '100%',
    height: 333,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 33,
    color: '#666666'
};

export default function NotSignIn (props) {
    return (
        <div style={style}>
          <p>Not connected to Github</p>
        </div>
    );
}
