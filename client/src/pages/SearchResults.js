import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL, QUERY_VINYLS } from '../utils/queries';

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const variables = Object.fromEntries(params.entries())
    console.log(variables)
    const canSearch = (variables?.q && ('artist' in variables || 'song' in variables || 'genre' in variables))
    const { loading, data } = useQuery(QUERY_VINYLS, canSearch ? { variables } : {});
    const vinyls = data?.vinyls || []



    if (loading) {
        return <h1>loading...</h1>
    }
    return (
        <>
            <h1>Search Results</h1>
            <main className="container-fluid home min-vh-100">
                <ul className="row justify-content-center mb-0">
                    {vinyls.map((vinyl) => {
                        return (
                            <li
                                className="card border border-dark p-3 mt-5 m-3 col-md-3"
                                key={vinyl.id}>
                                <h2
                                    className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
                                <img
                                    className="resultImage d-block mx-auto"
                                    alt={vinyl.title}
                                    src={vinyl.cover_image} />
                            </li>
                        )
                    })}
                </ul>
            </main>
        </>
    )
};

export default SearchResults;