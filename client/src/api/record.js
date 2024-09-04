import axios from "./axios";

export const getRecordsRequest = (page, limit) => axios.get(`/records?page=${page}&limit=${limit}`);

export const saveRecordRequest = (record) => axios.post(`/save_record`, record);

export const deleteRecordRequest = (id) => axios.delete(`/delete_record/${id}`);