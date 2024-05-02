import { httpService } from './http-service';
import { parseJSON, stringifyJSON } from '../utils/storageUtils';

const collectionEndpoint = '/collections';

export const setLocalSelectedCollection = (collection) =>
  stringifyJSON('selectedCollection', collection);
export const getLocalSelectedCollection = (collection) => parseJSON('selectedCollection', collection);

export const createCollection = async (userId, collectionData) => {
  try {
    return await httpService.post(`${collectionEndpoint}/${userId}/create-collection`, collectionData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectionById = async (collectionId) => {
  try {
    return await httpService.get(`${collectionEndpoint}/${collectionId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollections = async (params = {}) => {
  try {
    return await httpService.get(collectionEndpoint, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCollection = async (collectionId, updatedData) => {
  try {
    return await httpService.put(`${collectionEndpoint}/${collectionId}`, updatedData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    return await httpService.delete(`${collectionEndpoint}/${collectionId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectionItems = async (collectionId) => {
  try {
    return await httpService.get(`${collectionEndpoint}/${collectionId}/items`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCollectionItem = async (collectionId, item) => {
  try {
    return await httpService.put(`${collectionEndpoint}/${collectionId}/item`, { item });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
