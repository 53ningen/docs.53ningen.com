/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      body
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      body
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      body
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPrivatePost = /* GraphQL */ `
  mutation CreatePrivatePost(
    $input: CreatePrivatePostInput!
    $condition: ModelPrivatePostConditionInput
  ) {
    createPrivatePost(input: $input, condition: $condition) {
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
export const updatePrivatePost = /* GraphQL */ `
  mutation UpdatePrivatePost(
    $input: UpdatePrivatePostInput!
    $condition: ModelPrivatePostConditionInput
  ) {
    updatePrivatePost(input: $input, condition: $condition) {
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
export const deletePrivatePost = /* GraphQL */ `
  mutation DeletePrivatePost(
    $input: DeletePrivatePostInput!
    $condition: ModelPrivatePostConditionInput
  ) {
    deletePrivatePost(input: $input, condition: $condition) {
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
