export type IDParams = { id: string };
//common code for pagination 
export type APIResponse<T> = {
  num_results: number;
  objects: T[];
  page: number;
  total_pages: number;
};