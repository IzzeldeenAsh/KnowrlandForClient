// The backend sizes string() columns to VARCHAR(191) (Schema::defaultStringLength in
// AppServiceProvider) and does not length-check them, so longer text fails on insert.
export const BACKEND_STRING_MAX = 191
