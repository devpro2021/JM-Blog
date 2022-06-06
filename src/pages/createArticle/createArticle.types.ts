export interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IArticle {
  article: ICreateArticle;
}
