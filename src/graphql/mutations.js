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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createGlowsick = /* GraphQL */ `
  mutation CreateGlowsick(
    $input: CreateGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    createGlowsick(input: $input, condition: $condition) {
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
export const updateGlowsick = /* GraphQL */ `
  mutation UpdateGlowsick(
    $input: UpdateGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    updateGlowsick(input: $input, condition: $condition) {
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
export const deleteGlowsick = /* GraphQL */ `
  mutation DeleteGlowsick(
    $input: DeleteGlowsickInput!
    $condition: ModelGlowsickConditionInput
  ) {
    deleteGlowsick(input: $input, condition: $condition) {
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
