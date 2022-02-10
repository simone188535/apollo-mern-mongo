import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL } from "../utils/queries";
import './assets/css/vinyl.css'

const Vinyl = () => {
  const { title } = useParams();
  const { loading, data } = useQuery(QUERY_VINYL, { variables: { title } });
  const vinyl = data?.vinyl

  console.log(vinyl)

  const vinylProperties = [
    { id: '0', key: 'Title', val: vinyl?.title },
    { id: '1', key: 'Format', val: vinyl?.format },
    { id: '2', key: 'Label', val: vinyl?.label?.[0] },
    { id: '3', key: 'Genre', val: vinyl?.genre },
    { id: '4', key: 'Style', val: vinyl?.style }
  ];

  const displayVinylProps = vinylProperties.map((vinylProperty) => (vinylProperty.val) ? <h4 className="text-center p-3 fs-5 border-bottom" key={vinylProperty.id}>{vinylProperty.key} : {vinylProperty.val}</h4> : <></>)

  if (loading) {
    return <h1 className="text-center display-1">loading...</h1>
  }
  return (
    <main className="container-fluid home min-vh-100">
      <ul className="row justify-content-center mb-0">
        <li
          className="card text-left border border-dark p-3 mt-5 mb-5 col-md-6"
          key={vinyl.id}>
          {displayVinylProps}
          <img
            className="d-block mx-auto styles"
            alt={vinyl.title}
            src={vinyl.cover_image}
          />
        </li>
      </ul>
    </main>
  )
};

export default Vinyl