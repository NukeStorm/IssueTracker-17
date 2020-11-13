import React, { useEffect, useState, useReducer } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getissueList } from '../../api/issueTransaction';
import { getMileStoneList } from '../../api/milestoneTransaction';
import { getLabelList } from '../../api/labelTransaction';
import { getUserList } from '../../api/userTransaction';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { FilterBarComponent } from './FilterBar';
import { IssueList } from './issueList';
import { FilterSelectArea } from './FilterSelectArea/FilterSelectArea';
import { FilterCancelButton } from './FilterCancelButton/FilterCancelButton';
import { GreenButton } from 'Style';
import * as reducers from 'Reducer';
import {Link} from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
    
  }

  a{
    text-decoration: none;
    color:black;

  }

`;
const TopMenuBar = styled.div`
  display: flex;
  border: none;
  height: 40px;

  margin-bottom: 15px;
  justify-content: space-between;
`;
const MenuHeaderArea = styled.div`
  margin: 2px;
  margin-right: 5px;
`;

const GreenButtonMargin = styled(GreenButton)`
  margin-left: 5px;
`;

const IssueContainer = styled.div`
  width: 1024px;
  margin: auto;
`;

const ListHeader = styled.div`
  display: flex;
  border: 1px solid rgb(225 228 232);
  border-bottom: none;
  height: 40px;
  padding: 5px;
  justify-content: space-between;
  background-color: #f4f4f4;
`;

const ListContainer = styled.div`
  border: 1px solid rgb(225 228 232);
`;

const AllSelectChkboxArea = styled.div`
  width: 400px;
`;

const CheckBox = styled.input`
  margin: 11px;
`;

const FilterColumn = styled.div`
  width: 100px;
  display: flex;
  text-align: center;
  & * {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 2px;
  }
`;

export const FilterContext = React.createContext();
const initialState = {
  issueList: [],
  labelList: [],
  mileStoneList: [],
  assigneeList: [],
  authorList: [],
};

const filterInitialState = {
  author: { text: '', id: -1 },
  labels: { text: '', id: -1 },
  milestone: { text: '', id: -1 },
  asignee: { text: '', id: -1 },
};

const IssueListComponent = () => {
  const [store, dispatch] = useReducer(reducers.issueReducer, initialState);
  const [filterStore, filterDispatch] = useReducer(reducers.filterReducer, filterInitialState);
  const [filterText, setFilterText] = useState('is:issue is:open');
  const [close, setClose] = useState(false);
  const [status, setStatus] = useState(0);
  const [labelNumber, setLabelNumber] = useState(0);
  const [milestoneNumber, setMilestoneNumber] = useState(0);

  useEffect(async () => {
    const { labels, milestones } = await initialDispatch();
    setLabelNumber(labels);
    setMilestoneNumber(milestones);
  }, []);

  useEffect(async () => {
    checkClose();
    const { str, query } = makeFilterText();
    setFilterText(str);
    const res = await getissueList(query);
    dispatch({ type: 'pushIssues', data: res });
  }, [filterStore]);

  const initialDispatch = async () => {
    const issues = await getissueList('?status=0');
    const milestones = await getMileStoneList();
    const labels = await getLabelList();
    const users = await getUserList();
    dispatch({ type: 'pushAll', data: { issues, milestones, labels, users } });
    return { labels: labels.length, milestones: milestones.length };
  };

  const checkClose = () => {
    for (const key in filterStore) {
      if (filterStore[key]['id'] !== -1) {
        setClose(true);
        return;
      }
      setClose(false);
    }
  };

  const makeFilterText = () => {
    let str = 'is:issue';
    let query = '';
    str += ' is:' + (status === 0 ? 'open' : 'close');
    query += 'status=' + (status === 0 ? '0' : '1');
    for (const key in filterStore) {
      str +=
        filterStore[key]['text'] !== ''
          ? ' ' + key + ':' + filterStore[key]['text']
          : '';
      query +=
        filterStore[key]['id'] !== -1
          ? '&' + key + '=' + filterStore[key]['id']
          : '';
    }
    query = '?' + query;
    return { str, query };
  };

  return (
    <FilterContext.Provider
      value={{
        store,
        filterText,
        filterDispatch,
        setFilterText,
        close,
        setClose,
        filterStore,
        setStatus,
      }}
    >
      <IssueContainer>
        <GlobalStyle />

        <TopMenuBar>
          <FilterBarComponent />
          <MenuHeaderArea>
            <LabelButton count={labelNumber} />
            <MilestoneButton count={milestoneNumber} />
            <Link to="/newIssue">
              <GreenButtonMargin>New Issue</GreenButtonMargin>
            </Link>
          </MenuHeaderArea>
        </TopMenuBar>
        <FilterCancelButton />
        <ListHeader>
          <AllSelectChkboxArea>
            <CheckBox type="checkbox" />
          </AllSelectChkboxArea>
          <FilterSelectArea />
        </ListHeader>
        <ListContainer>
          <IssueList issueList={store.issueList} />
        </ListContainer>
      </IssueContainer>
    </FilterContext.Provider>
  );
};

export default IssueListComponent;
