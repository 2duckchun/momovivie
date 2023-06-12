export interface addCommentReducer {
  isPendeing?: boolean;
  document?: any;
  success?: boolean;
  error?: any;
}

export interface comment {
  nickname: string;
  password: string;
  comment: string;
}
