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
    $userId: ID!
    $vinylId: Int
    $title: String!
    $format: [String]
    $label: [String]
    $type: String
    $genre: [String]
    $style: [String]
    $cover_image: String!
  ) {
    addVinyl(
      userId: $userId
      vinylId:$vinylId,
      title: $title
      format: $format
      label: $label
      type: $type
      genre: $genre
      style: $style
      cover_image: $cover_image
    ) {
      user {
        username
        email
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
    }
  }
`;

export const UPDATE_USER = gql`
   mutation updateUser(
    $id:ID!, 
    $email:String,
    $username:String, 
    $password:String
  ){
    updateUser(
      id: $id,
      email:$email,
      username:$username,
      password:$password
    ){
      user {
        username
        email
        password
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      token
      user {
        username
        email
        password
      }
    }
  }
`;

export const DELETE_VINYL = gql`
    mutation removeVinyl ($userId:ID!, $vinylId:ID!){
    removeVinyl(userId:$userId, vinylId:$vinylId){
      user{
        _id
        vinyl {
          id
        }
      }
    }
  }
`;
