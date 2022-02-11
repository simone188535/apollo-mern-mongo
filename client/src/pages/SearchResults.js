import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_VINYLS, QUERY_ME } from "../utils/queries";
import { ADD_VINYL } from "../utils/mutations";
import searchResultsImg from './assets/images/logologin-test.png';

const SearchResults = ({ easterEgg, setEasterEgg }) => {
  const [loggedIn, setLoggedIn] = useState(false)




  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const variables = Object.fromEntries(params.entries())
  const canSearch = (variables?.q && ('artist' in variables || 'song' in variables || 'genre' in variables))

  const { loading, data } = useQuery(QUERY_VINYLS, canSearch ? { variables } : {});
  const vinyls = data?.vinyls || []


  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const me = userData?.me;

  const userVinylIds = me?.vinyl.map((vinyl) => vinyl.id);

  console.log(userVinylIds)

  const [addVinyl, { data: vinylData, loading: vinylLoading, error }] = useMutation(ADD_VINYL);

  useEffect(() => {
    if (me) {
      setLoggedIn(true)
    }
  }, [me]);


  const addToFav = async (e, { id, title, cover_image }) => {

    if (!userLoading) {
      e.target.disabled = true
      e.target.textContent = 'Adding to Favorites'
      await addVinyl({
        variables: {
          "userId": me._id,
          "vinylId": parseInt(id),
          "title": title,
          "cover_image": cover_image
        }
      })
      e.target.disabled = false
      e.target.textContent = 'Add to Favorites'
    };
  };



  if (loading) {
    return <h1 className="container-fluid min-vh-100 text-center mt-5">loading...</h1>
  };
  return (
    <>
      <main className="container-fluid home min-vh-100">
        <img alt='search Results' src={searchResultsImg} className='searchResultsImg col-5  mx-auto d-block pt-2'></img>
        <ul className="row justify-content-center mb-0 px-3">
          {vinyls.map((vinyl) => {
            return (
              <li
                className={easterEgg ? "spin card border border-dark p-3 mt-4 m-3 col-xl-3 col-lg-4 col-sm-6 justify-content-center text-center" : "card border border-dark p-3 mt-4 m-3 col-xl-3 col-lg-4 col-sm-6 justify-content-center text-center"}
                key={vinyl.id}>
                <Link to={`/vinyl/${encodeURIComponent(vinyl.title)}`}>
                  <h2
                    className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
                  <div>
                    <img
                      className="resultImage d-block mx-auto img-fluid"
                      alt={vinyl.title}
                      src={vinyl.cover_image}
                    />
                  </div>
                </Link>
                {loggedIn ? <div>
                  <button className="btn btn-rounded btn-light btn-white w-10 border border-info"
                    onClick={(e) => addToFav(e, vinyl)}>Add to Favorites</button>
                </div> : <></>}

              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
};

export default SearchResults;
