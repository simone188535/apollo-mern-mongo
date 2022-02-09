import { gql } from "@apollo/client";

export const QUERY_VINYL = gql`
  query vinyl {
    vinyl {
      id
      title
      format
      label
      type
      genre
      style
      cover_image
    }
  }
`;

export const QUERY_VINYLS = gql`
  query vinyls($q:String, $artist:String, $song:String, $genre:String) {
    vinyls(q:$q, artist:$artist, song:$song, genre:$genre) {
      id
      title
      cover_image
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
