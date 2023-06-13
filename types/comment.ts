export interface AddCommentReducer {
  isPendeing?: boolean;
  document?: any;
  success?: boolean;
  error?: any;
}

export interface DocsComment {
  nickname: string;
  password: string;
  createTime: any;
  comment: string;
}

export interface Comment {
  id?: string;
  nickname?: string;
  password?: string;
  comment?: string;
  createdTime?: any;
}
