import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
        username
        email
        password
      }
    }
  }
`;


export const ADD_VINYL = gql`
  mutation addVinyl(
    $userId: ID!, 
    $title: String!, 
    $vinylId:Int,
    $cover_image: String
  ) {
    addVinyl(
      userId:$userId, 
      title:$title, 
      vinylId:$vinylId,
      cover_image: $cover_image
      
    ){
      user {
        username
        email
        vinyl {
          title
          format
          label
          type
          genre
          style
          cover_image
        }
      }
    }
  }
`;
