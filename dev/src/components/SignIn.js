import React, { useState } from 'react';

const style = {
    root: {
        display:'flex',
        padding:22,
    }
};

export default function SignIn (props) {
    const [token, setToken] = useState('');

    const update = (e) => setToken(e.target.value);

    const click = () => props.callback(token.trim());

    return (
        <div style={style.root}>
          <div style={{width: 333}}>
            <input className="input" type="password" placeholder="Github Parsonal Token"
                   defaultValue={token}
                   onKeyUp={update} />
          </div>

          <div>
            <button className="button"
                    onClick={click}>
              Connect
            </button>
          </div>
        </div>
    );
}
