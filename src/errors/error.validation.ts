import { MessageI18N } from "./message.i18n";

export class ErrorValidation {

  private _messageI18N: MessageI18N;
  
  constructor (messageI18N: MessageI18N) {
    this._messageI18N= messageI18N;
  }

  public get messageI18N():MessageI18N {
    return this._messageI18N;
  }

}