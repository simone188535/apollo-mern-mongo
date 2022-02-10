import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL } from "../utils/queries";

const Vinyl = () => {
  const { title } = useParams();
  const { loading, data } = useQuery(QUERY_VINYL, { variables: { title } });
  const vinyl = data?.vinyl

  console.log(vinyl)

  const vinylProperties = [
    { id: 'gjfkdlhqgjk', key: 'Format', val: vinyl?.format },
    { id: 'vfhjdslgqvhjk', key: 'Label', val: vinyl?.label },
    { id: 'fbhjqklgbhfk', key: 'Genre', val: vinyl?.genre },
    { id: 'fgdhkqlgh', key: 'Style', val: vinyl?.style }
  ];

  const displayVinylProps = vinylProperties.map((vinylProperty) => (vinylProperty.val) ? <h4 key={vinylProperty.id}>{vinylProperty.key} : {vinylProperty.val}</h4> : <></>)

  if (loading) {
    return <h1>loading...</h1>
  }
  return (
    <main className="container-fluid home min-vh-100">
      <h1 className="container text-center bg-black text-light display-5 p-1 rounded-3">{vinyl.title}</h1>
      <ul className="row justify-content-center mb-0">
        <li
          className="card border border-dark p-3 mt-5 m-3 col-md-3"
          key={vinyl.id}>
          {displayVinylProps}
          <img
            className="resultImage d-block mx-auto"
            alt={vinyl.title}
            src={vinyl.cover_image}
          />
        </li>
      </ul>
    </main>
  )
};

export default Vinyl