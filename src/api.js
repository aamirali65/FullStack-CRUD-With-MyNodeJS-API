import axios from "axios";

const apiUrl = "http://localhost:5000/api/";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/create-user`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/get-user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/get-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (Uid) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete-user/${Uid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${apiUrl}/update-user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
