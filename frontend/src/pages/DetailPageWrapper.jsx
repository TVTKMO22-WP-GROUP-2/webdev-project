import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from './DetailPage';


//is used for extracting movie_id from URL and passing it to DetailPage

function DetailPageWrapper() {
  const { movie_id } = useParams();

  return <DetailPage movie_id={movie_id} />;
}

export default DetailPageWrapper;
