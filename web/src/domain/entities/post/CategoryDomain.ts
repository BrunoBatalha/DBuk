type Params = {
  id: number;
  title: string;
};

export class CategoryDomain {
  id: number;
  title: string;

  private constructor(params: Params) {
    this.id = params.id;
    this.title = params.title;
  }

  static create(params: Params): CategoryDomain {
    return new CategoryDomain(params);
  }
}
