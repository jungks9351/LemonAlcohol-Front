import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';

const BoardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = {
    sort: searchParams.get('sort'),
    page: searchParams.get('page'),
  };

  const { data, isLoading } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true,
    },
  );

  return (
    <BoardListWrapper>
      {isLoading && '로딩'}
      {data?.boards &&
        data.boards.map((board) => (
          <BoardItem key={board._id} boardInfo={board} />
        ))}
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </BoardListWrapper>
  );
};

const BoardListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default BoardList;
