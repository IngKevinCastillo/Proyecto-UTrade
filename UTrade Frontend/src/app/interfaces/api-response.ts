export interface ApiResponse<T = any> {
  estado: boolean;
  valor?: T;
  mgs?: string;
}
