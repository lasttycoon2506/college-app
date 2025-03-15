export type ApiResponse<T> = {
  data?: T;
  error?: { message?: string; statusCode?: number };
};
