import React, { useState } from 'react';

const style = {
    display:'flex',
    justifyContent: 'center',
    padding:22,
};

const data = [
    { title: 'Point(予定)',  regex: '.*@[P|p]oint\\.[P|p]lan:*\\s+(\\d+).*' },
    { title: 'Point(実績)',  regex: '.*@[P|p]oint\\.[R|r]esult:*\\s+(\\d+).*' },
    { title: '納期(旧)',     regex: '.*@[D|d]ate\\.[D|d]ue:*\\s+(\\d+-\\d+-\\d+).*' },
    { title: '納期(新)',     regex: '.*@[D|d]ue\\.[D|d]ate:*\\s+(\\d+-\\d+-\\d+).*' },
    { title: 'Owner',        regex: '.*\\$[O|o]wner:*\\s+(\\S+).*' },
    { title: '次の作業日付', regex: '.*\\$[D|d]ate\\.[N|n]ext:*\\s+(\\d+-\\d+-\\d+).*' },
];

function getValue (regex_string, description) {
    let regex = new RegExp(regex_string);

    const ret = regex.exec(description);

    if (!ret)
        return null;

    return ret[1];
}

function getResults (description) {
    const rs = /\$Point.[R|r]esult:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g;
    const regex = new RegExp(rs);

    return [...description.matchAll(regex)];
}

export default function IssueDescription (props) {
    const [token, setToken] = useState(description_template);

    const update = (e) => setToken(e.target.value);

    const results = getResults(token);

    return (
        <div style={style}>
          <div style={{width: 333}}>
            <textarea style={{width:'100%', height:555}}
                      value={token}
                      onChange={update} />
          </div>

          <div style={{marginLeft:33}}>
            <div>
              <table className="table is-striped is-narrow is-hoverable">
                <thead>
                  <tr>{['項目','正規表現','値'].map(d=><th key={d}>{d}</th>)}</tr>
                </thead>

                <tbody>
                  {data.map(d=>{
                      return (
                          <tr key={d.title}>
                            <th>{d.title}</th>
                            <td><code>{d.regex}</code></td>
                            <td>{getValue(d.regex, token)}</td>
                          </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{marginTop:55}}>
              <table className="table is-striped is-narrow is-hoverable">
                <thead>
                  <tr>{['担当','日付','Point'].map(d=><th key={d}>{d}</th>)}</tr>
                </thead>

                <tbody>
                  {results.map((d,i)=> {
                      return (
                          <tr key={i}>
                            <td>{d[1]}</td>
                            <td>{d[2]}</td>
                            <td>{d[3]}</td>
                          </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
}

const description_template = `## 課題内容

XXX
- a
- b
- c

## 目的/背景

YYYY

1. d
2. e
3. f

---
- @Point.Plan 1
- @Point.Result 2
- @Due.Date 2020-01-01
- @Date.Due 2020-01-02
- $Date.Next 2020-01-03
- $Owner XXX
- $Point.Result 人1 2020-02-01 3
- $Point.Result 人2 2020-02-02 2
- $Point.Result 人3 2020-02-03 1
`;
