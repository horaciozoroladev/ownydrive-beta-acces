import axios from "axios";
import { getToken, getUserInfo } from "./auth.service";
import { CONFIG_FRONT } from "../config";

export const getAlbums = async () => {
  const { id } = getUserInfo();
  const response = await axios.get(
    `${CONFIG_FRONT.API_URL}/api/users/${id}/albums`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data
};

export const getAlbumsById = async (id) => {
  const response = await axios.get(
    `${CONFIG_FRONT.API_URL}/api/albums/${id}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data
}
export const getPhotosByAlbumId = async (id) => {
  const response = await axios.get(
    `${CONFIG_FRONT.API_URL}/api/albums/${id}/photos`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data
};

