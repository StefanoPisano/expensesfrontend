import { Expenses } from './Expenses';

export class Schedule {

  constructor(
    public id: Number,
    public name: string,
    public description: string,
    public category: string,
    public price: number,
    public fromDate: Date,
    public toDate: Date
  ) {
  }
}
