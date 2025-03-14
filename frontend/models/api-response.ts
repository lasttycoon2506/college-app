export type ApiResponse<T> =
  | { data: T; error?: null; statusCode: number }
  | { data?: null; error: { message: string; statusCode?: number } };
