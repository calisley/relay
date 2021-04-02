/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        name
        createdAt
        updatedAt
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      image
      name
      createdAt
      updatedAt
      comments {
        items {
          id
          dedication
          note
          glowsickImageId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getGlowsick = /* GraphQL */ `
  query GetGlowsick($id: ID!) {
    getGlowsick(id: $id) {
      id
      dedication
      note
      glowsickImageId
      createdAt
      updatedAt
      image {
        id
        image
        name
        createdAt
        updatedAt
        comments {
          nextToken
        }
      }
    }
  }
`;
export const listGlowsicks = /* GraphQL */ `
  query ListGlowsicks(
    $filter: ModelGlowsickFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGlowsicks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dedication
        note
        glowsickImageId
        createdAt
        updatedAt
        image {
          id
          image
          name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
