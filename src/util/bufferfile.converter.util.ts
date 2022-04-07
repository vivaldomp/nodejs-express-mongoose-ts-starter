import { Transform, TransformOptions, TransformCallback} from "stream";
import logger from "../logger";

interface ConverterOptions extends TransformOptions {
  rowSize: number;
  rowIdentifier: RowIdentifier;
  layouts: Layout[];
}

interface RowIdentifier {
  lenght: number;
  position: number;
  type: string;
}

interface Layout {
  rowID: any;
  fields: Field[];
  bindNextRow?: boolean;
}

interface Field {
  name:string;
  lenght:number;
  position:number;
  type: string;
  format?: string;
}

export const TYPE_NUMBER="number";
export const TYPE_STRING="string";
export const TYPE_DATE="date";

export default class BufferFileConverter extends Transform {
  private rowSize:number;
  private rowIdentifier: RowIdentifier;
  private layouts: Layout[];
  private continueThis: boolean;

  constructor(options: ConverterOptions){
      super(options);
      this.rowSize = options.rowSize;
      this.rowIdentifier = options.rowIdentifier;
      this.layouts = options.layouts;
      //this.buffer = Buffer.alloc(0);
      this.continueThis = true;
  }
  stopIt() {
      this.continueThis = false;
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void{
      let buffer = Buffer.alloc(0)
      buffer = Buffer.concat([buffer, chunk]);

      let object = Object.create(Object.prototype);

      while ((buffer.length > this.rowSize || buffer.length === 1) && this.continueThis){
          try {
              let row = buffer.slice(0, this.rowSize);

              const rowID = this.convertValue(
                row.slice(this.rowIdentifier.position, this.rowIdentifier.lenght).toString(),
                this.rowIdentifier.type
              );
              const layout:Layout|undefined = this.layouts.find(layout => layout.rowID === rowID);
              if (layout) {

                row = row.slice(this.rowIdentifier.lenght);
                layout.fields.forEach((field: Field)=>{
                  object[field.name]=this.convertValue(row.slice(0,field.lenght).toString(), field.type, field.format);
                  row = row.slice(field.lenght);
                });
                if (!layout.bindNextRow) {
                  this.push(JSON.stringify(object));
                  object = Object.create(Object.prototype);
                }
              }
              buffer = buffer.slice(this.rowSize);
              if (buffer[0] === 26){
                  logger.debug('EOF : ' + buffer[0]);
              }
          } catch (err) {
              logger.debug('ERR OCCURED => ', err);
              break;
          }
      }
      logger.debug('BUFFER FILE CONVERTER FINISHED');
      callback();
  }

  private convertValue(value:string, type:string, format?:string):string|number {
    let valueConverted: string|number;
    switch(type) {
      case TYPE_NUMBER:
        valueConverted=Number(value);
        break;
      case TYPE_DATE:
        valueConverted=value.trim();
        break;
      default:
        valueConverted=value.trim();
    }
    return valueConverted;
  }
}
