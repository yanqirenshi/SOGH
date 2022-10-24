import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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

    const getMilestonesByID = ()=> {
        sogh.getMilestonesByID('MI_kwDOEMPGxM4Afs0w', (milestone)=>{
            console.log(milestone);
        });
    };

    const getIssuesCommentsByIssueId = ()=> {
        sogh.getIssuesCommentsByIssueId('I_kwDOEMPGxM5AsSjS', (issue)=>{
            console.log(issue);
        });
    };

    const fetchPullrequestsByRepository = ()=> {
        sogh.fetchPullrequestsByRepository(sogh.activeRepository(), (issue)=>{
            console.log(issue);
        });
    };

    const addComment = (e)=> {
        const subject_id = 'I_kwDOEMPGxM5GzPWe';
        const body = 'aaa\nbbb\nccc';
        const client_mutation_id = moment().format('YYYY-MM-DDTHH:mm:ss');

        sogh.addComment(subject_id, body, client_mutation_id, (result)=>{
            console.log(result);
        });
    };


    return (
        <div style={style}>
          {/* getMilestonesByID */}
          <div style={{marginTop:88}}>
            <Heading>
              addComment
            </Heading>

            <div style={{display:'flex', alignItems: 'flex-end'}}>
              <Field>
                <Label>
                  Issue ID
                </Label>
                <Control>
                  <Input
                    placeholder="Issue ID"
                    type="text"
                    value="I_kwDOEMPGxM5GzPWe"
                  />
                </Control>
              </Field>

              <Button color="" style={{marginBottom: '0.75em' }}
                      onClick={addComment}>
                Button
              </Button>
            </div>
          </div>

          {/* search */}
          <div>
            <button className="button"
                    onClick={click}>
              Search
            </button>
          </div>

          {/* getMilestonesByID */}
          <div style={{marginTop:88}}>
            <Heading>
              getMilestonesByID
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
                      onClick={getMilestonesByID}>
                Button
              </Button>
            </div>
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

          {/* fetchPullrequestsByRepository */}
          <div style={{marginTop:88}}>
            <Heading>
              fetchPullrequestsByRepository
            </Heading>

            <div style={{display:'flex', alignItems: 'flex-end'}}>
              <Button color="" style={{marginBottom: '0.75em' }}
                      onClick={fetchPullrequestsByRepository}>
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
