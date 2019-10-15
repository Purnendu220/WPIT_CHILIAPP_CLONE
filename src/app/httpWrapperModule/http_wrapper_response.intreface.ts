export interface HttpSuccesFailureResponse {
  onSuccess(type, responsedata, successId?: number);
  onFailure(type, response: string , failedId?: any);
}
