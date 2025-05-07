import { ResponseStatus, ApiResponse } from "@/types/apiResponse";
import { Response } from "express";

export function sendResponse<T>(
  res: Response,
  status: ResponseStatus,
  message: string,
  data?: T,
  httpStatusCode: number = 200,
  meta?: object,
) {
  let response: ApiResponse<T>;

  if (status === ResponseStatus.Success) {
    // ✅ On success, data is required
    response = {
      status,
      message,
      data: data as T,
      meta,
    };
  } else {
    // ✅ On fail/error, data is not included
    response = {
      status,
      message,
      data: (data as T) || undefined,
      meta,
    } as ApiResponse<T>;
  }

  return res.status(httpStatusCode).json(response);
}
