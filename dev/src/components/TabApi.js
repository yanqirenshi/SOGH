import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Form, Button, Heading } from 'react-bulma-components';
const { Input, Field, Control, Label } = Form;

const style = {
    paddingTop: 66,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function TabApi (props) {
    const sogh = props.sogh;

    const click = ()=> {
        sogh.searchIssues('is:open is:issue \\"$Owner 岩崎\\" in:body', (issues)=>{
            console.log(issues);
        }); // is:open
    };

    const getIssueByIssueId = ()=> {
        sogh.getIssueByIssueId('I_kwDOEMPGxM5AsSjS', (issue)=>{
            console.log(issue);
        });
    };

    const getIssuesCommentsByIssueId = ()=> {
        sogh.getIssuesCommentsByIssueId('I_kwDOEMPGxM5AsSjS', (issue)=>{
            console.log(issue);
        });
    };

    return (
        <div style={style}>
          <div>
            <button className="button"
                    onClick={click}>
              Search
            </button>
          </div>

          {/* getIssueByIssueId */}
          <div style={{marginTop:88}}>
            <Heading>
              getIssueByIssueId
            </Heading>

            <div style={{display:'flex', alignItems: 'flex-end'}}>
              <Field>
                <Label>
                  Issue ID
                </Label>
                <Control>
                  <Input
                    placeholder="issue id"
                    type="text"
                    value="I_kwDOEMPGxM5AsSjS"
                  />
                </Control>
              </Field>

              <Button color="" style={{marginBottom: '0.75em' }}
                      onClick={getIssueByIssueId}>
                Button
              </Button>
            </div>

          </div>

          {/* getIssuesCommentsByIssueId */}
          <div style={{marginTop:88}}>
            <Heading>
              getIssuesCommentsByIssueId
            </Heading>

            <div style={{display:'flex', alignItems: 'flex-end'}}>
              <Field>
                <Label>
                  Issue ID
                </Label>
                <Control>
                  <Input
                    placeholder="issue id"
                    type="text"
                    value="I_kwDOEMPGxM5AsSjS"
                  />
                </Control>
              </Field>

              <Button color="" style={{marginBottom: '0.75em' }}
                      onClick={getIssuesCommentsByIssueId}>
                Button
              </Button>
            </div>

          </div>
        </div>
    );
}

export default connect(
    (state) => {
        return { sogh: state.sogh };
    },
    (dispatch) => ({}),
)(TabApi);
