/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGlowsick = /* GraphQL */ `
  subscription OnCreateGlowsick($glowsickImageId: String) {
    onCreateGlowsick(glowsickImageId: $glowsickImageId) {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
