import { httpService } from './http-service';
import { parseJSON, stringifyJSON } from '../utils/storageUtils';
import { sanitizeUserObject } from '../utils/sanitizeUserObject';

const userEndpoint = '/users';

export const getLocalUser = () => parseJSON('user', null);

export const setLocalUser = (user) => {
  localStorage.setItem('user', JSON.stringify(sanitizeUserObject(user)));
};
export const createUser = async (userData) => {
  try {
    return await httpService.post(userEndpoint, userData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserBySub = async (sub) => {
  try {
    return await httpService.get(`${userEndpoint}/${sub}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserCollections = async (userId) => {
  try {
    return await httpService.get(`${userEndpoint}/my-collections/${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCollectionToUser = async (userId, collectionId) => {
  try {
    return await httpService.post(`${userEndpoint}/${userId}/add-collection/${collectionId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeCollectionFromUser = async (userId, collectionId) => {
  try {
    return await httpService.post(`${userEndpoint}/${userId}/remove-collection/${collectionId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    return await httpService.get(userEndpoint);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    return await httpService.put(`${userEndpoint}/${id}`, data);
  } catch (error) {
    console.error('Failed to update user', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await httpService.delete(`${userEndpoint}/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
