/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      body
      type
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $id: ID
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        body
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPostsOrderByUpdatedAt = /* GraphQL */ `
  query ListPostsOrderByUpdatedAt(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsOrderByUpdatedAt(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        body
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrivatePost = /* GraphQL */ `
  query GetPrivatePost($id: ID!) {
    getPrivatePost(id: $id) {
      id
      title
      body
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const listPrivatePosts = /* GraphQL */ `
  query ListPrivatePosts(
    $id: ID
    $filter: ModelPrivatePostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPrivatePosts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        body
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
