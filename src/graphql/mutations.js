/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createGlowsick = /* GraphQL */ `
  mutation CreateGlowsick(
    $input: CreateGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    createGlowsick(input: $input, condition: $condition) {
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
export const updateGlowsick = /* GraphQL */ `
  mutation UpdateGlowsick(
    $input: UpdateGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    updateGlowsick(input: $input, condition: $condition) {
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
export const deleteGlowsick = /* GraphQL */ `
  mutation DeleteGlowsick(
    $input: DeleteGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    deleteGlowsick(input: $input, condition: $condition) {
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
