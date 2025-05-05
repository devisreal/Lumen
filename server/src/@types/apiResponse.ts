export enum ResponseStatus {
  Success = "success",
  Fail = "fail",
  Error = "error",
}

export type ApiResponse<T> =
  | {
      status: ResponseStatus.Success;
      message: string;
      data: T;
      meta?: object;
    }
  | {
      status: ResponseStatus.Fail | ResponseStatus.Error;
      message: string;
      meta?: object;
    };
