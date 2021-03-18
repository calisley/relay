/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      image
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
      createdAt
      updatedAt
    }
  }
`;
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGlowsick = /* GraphQL */ `
  query GetGlowsick($id: ID!) {
    getGlowsick(id: $id) {
      id
      dedication
      note
      image {
        id
        image
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      glowsickImageId
      createdAt
      updatedAt
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
        image {
          id
          image
          createdAt
          updatedAt
        }
        glowsickImageId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
