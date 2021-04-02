/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGlowsick = /* GraphQL */ `
  subscription OnCreateGlowsick($glowsickImageId: String) {
    onCreateGlowsick(glowsickImageId: $glowsickImageId) {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
