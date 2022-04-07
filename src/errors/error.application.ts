import { MessageI18N } from "./message.i18n";

export class ErrorApplication extends Error {
  
  private _messageI18N: MessageI18N;
  private _cause?: Error;

  constructor (messageI18N: MessageI18N, cause?:Error) {
    super();
    this._messageI18N= messageI18N;
    this._cause = cause;
  }

  public get messageI18N():MessageI18N {
    return this._messageI18N;
  }

  public get cause():Error {
    return this._cause!;
  }

}