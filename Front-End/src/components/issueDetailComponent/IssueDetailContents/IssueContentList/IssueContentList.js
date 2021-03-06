import React, { useContext } from 'react';
import styled from 'styled-components';
import Comment from './Comment/Comment';
import { IssueContext } from '../../IssueDetailComponent';

const Container = styled.div`
  width: calc(100% - 320px);
  padding-top: 40px;
`;

const IssueContentList = () => {
  const { state, loginUser, dispatch } = useContext(IssueContext);
  const rows = state.comments;
  const issueDetailRow = {
    id: state.id,
    user_id: state.userId,
    userName: state.userName,
    contents: state.contents,
    created: state.created,
    profileUrl: state.profileUrl,
    edit: state.edit,
  };
  const addOnlyRow = {
    profileUrl: loginUser.profile_url,
    id: -1,
    contents: '',
    edit: true,
  };

  return (
    <Container>
      <Comment row={issueDetailRow} isIssue={true} key={'main_issue'}></Comment>
      {rows.map((row, index) => (
        <Comment row={row} isIssue={false} key={index}></Comment>
      ))}
      <Comment row={addOnlyRow} isIssue={false} key={'add_comment'}></Comment>
    </Container>
  );
};

export default IssueContentList;
