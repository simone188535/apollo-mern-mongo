import {useLocation} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL, QUERY_VINYLS } from '../../utils/queries';

const SearchResults = () => {
    const location  = useLocation();
    const params = new URLSearchParams(location.search);
    const { loading, data } = useQuery(QUERY_VINYLS)
    const vinyls = data?.vinyls || []
        console.log(params.get("term"));
        console.log(params.get("song"));
        console.log(Object.fromEntries(params.entries()))
    return (
        <>
        <h1>Search Results</h1>
        </>
    )
}

export default SearchResults;