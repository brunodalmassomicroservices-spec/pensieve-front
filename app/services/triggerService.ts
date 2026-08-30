import { api } from '../services/api';

export interface CreateTriggerPayload {
  clientId: string;
  subject: string;
  title: string;
  notes: string;
}

export const createTrigger = async (payload: CreateTriggerPayload) => {
  const response = await api.post('/triggers', payload);
  return response.data;
};

