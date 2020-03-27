export class DatetimeValueConverter {
  toView(value: string) {
   return new Date(value).toLocaleString();
  }
}
