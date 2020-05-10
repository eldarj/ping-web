export class PageResponseModel<T> {
  public content: T[];

  public empty: boolean;
  public first: boolean;
  public last: boolean;
  public number: number;
  public numberOfElements: number;
  public pageable: any;
  // pageable: {sort: {…}, offset: 0, pageNumber: 0, pageSize: 20, paged: true, …}

  public size: number;
  public sort: any;
  // sort: {unsorted: false, sorted: true, empty: false}

  public contentMap: Map<any, T>;
}
