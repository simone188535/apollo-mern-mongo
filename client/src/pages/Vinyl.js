import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL } from "../utils/queries";

const Vinyl = () => {
  const { title } = useParams();
  const { loading, data } = useQuery(QUERY_VINYL, { variables: { title } });
  const vinyl = data?.vinyl

  console.log(vinyl)

  if (loading) {
    return <h1>loading...</h1>
  }
  return (
    <h1>Vinyl: {vinyl.title}</h1>

  )
};

export default Vinyl