import React from 'react';

export default function GrobalOperator (props) {
    const item = {
        width: 55,
        height: 55,
        borderRadius: 55,
        background: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const contents = {
        background: '#fff',
        width: 45,
        height: 45,
        borderRadius: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const icon = {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundImage: 'url(https://github.githubassets.com/images/modules/logos_page/Octocat.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <a href="https://github.com/yanqirenshi/GeniusParty"
           target="_blank"
           rel="noopener noreferrer" >
          <div style={item}>
            <div style={contents}>
              <div style={icon}>
              </div>
            </div>
          </div>
        </a>
    );
}
