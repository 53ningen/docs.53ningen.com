/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  id?: string | null,
  title: string,
  body: string,
  type: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  body: string,
  type: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreatePrivatePostInput = {
  id?: string | null,
  title: string,
  body: string,
  owner?: Array< string | null > | null,
  type: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelPrivatePostConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPrivatePostConditionInput | null > | null,
  or?: Array< ModelPrivatePostConditionInput | null > | null,
  not?: ModelPrivatePostConditionInput | null,
};

export type PrivatePost = {
  __typename: "PrivatePost",
  id: string,
  title: string,
  body: string,
  owner?: Array< string | null > | null,
  type: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePrivatePostInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  owner?: Array< string | null > | null,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePrivatePostInput = {
  id: string,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelPrivatePostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPrivatePostFilterInput | null > | null,
  or?: Array< ModelPrivatePostFilterInput | null > | null,
  not?: ModelPrivatePostFilterInput | null,
};

export type ModelPrivatePostConnection = {
  __typename: "ModelPrivatePostConnection",
  items:  Array<PrivatePost | null >,
  nextToken?: string | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePrivatePostMutationVariables = {
  input: CreatePrivatePostInput,
  condition?: ModelPrivatePostConditionInput | null,
};

export type CreatePrivatePostMutation = {
  createPrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePrivatePostMutationVariables = {
  input: UpdatePrivatePostInput,
  condition?: ModelPrivatePostConditionInput | null,
};

export type UpdatePrivatePostMutation = {
  updatePrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePrivatePostMutationVariables = {
  input: DeletePrivatePostInput,
  condition?: ModelPrivatePostConditionInput | null,
};

export type DeletePrivatePostMutation = {
  deletePrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  id?: string | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      body: string,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsOrderByUpdatedAtQueryVariables = {
  type: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsOrderByUpdatedAtQuery = {
  listPostsOrderByUpdatedAt?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      body: string,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPrivatePostQueryVariables = {
  id: string,
};

export type GetPrivatePostQuery = {
  getPrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPrivatePostsQueryVariables = {
  id?: string | null,
  filter?: ModelPrivatePostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPrivatePostsQuery = {
  listPrivatePosts?:  {
    __typename: "ModelPrivatePostConnection",
    items:  Array< {
      __typename: "PrivatePost",
      id: string,
      title: string,
      body: string,
      owner?: Array< string | null > | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePrivatePostSubscription = {
  onCreatePrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePrivatePostSubscription = {
  onUpdatePrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePrivatePostSubscription = {
  onDeletePrivatePost?:  {
    __typename: "PrivatePost",
    id: string,
    title: string,
    body: string,
    owner?: Array< string | null > | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
