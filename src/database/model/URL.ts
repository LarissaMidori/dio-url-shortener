import { prop } from '@typegoose/typegoose';

export class URL {

  @prop({ required: true})
  hash!: string;

  @prop({ required: true })
  originURL!: string;

  @prop({ required: true})
  shortURL!: string;
  getModelForClass: any;
}

export const URLModel = new URL().getModelForClass(URL)