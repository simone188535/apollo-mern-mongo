import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_VINYL, QUERY_VINYLS } from '../../utils/queries';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [searchTerm, setSearchTerm] = useState()

  const { loading, data } = useQuery(QUERY_VINYLS)
  const vinyls = data?.vinyls[0] || []

  const search = () => {
    console.log(vinyls)
  }

  if (Auth.loggedIn()) {
    return (
      <>
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search Vinyls"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
        <div>
          <NavDropdown title='Account'>
            <Link to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>
            <button onClick={logout}>
              Logout
            </button>
          </NavDropdown>
        </div>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <div className='d-flex'>
        <InputGroup className="mb-3">
          <FormControl aria-label="Text input with dropdown button" placeholder='ex. Elvis'
            onChange={event => setSearchTerm(event.target.value)} />

          <DropdownButton
            variant="outline-secondary"
            title="Search by"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item onClick={() => search("artist")} >Artist</Dropdown.Item>
            <Dropdown.Item onClick={() => search("song")} >Song</Dropdown.Item>
            <Dropdown.Item onClick={() => search("genre")} >Genre</Dropdown.Item>

          </DropdownButton>
        </InputGroup>
        <NavDropdown title='Account'>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Signup
          </Link>
        </NavDropdown>
      </div>
    </>
  )
}

export default Navbar
