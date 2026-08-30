import { api } from './api';

export interface ReviewItemResponse {
  reviewId: string;
  trigger: string;
  subject: string;
  triggerTitle: string;
  notes: string;
  intervalDays: number;
}

export interface TodayReviewsApiResponse {
  total_pending: number;
  items: ReviewItemResponse[];
}

export const getTodayReviews = async (userId: string): Promise<TodayReviewsApiResponse> => {
  const response = await api.get<TodayReviewsApiResponse>(`/reviews/${userId}/today`);
  return response.data;
};