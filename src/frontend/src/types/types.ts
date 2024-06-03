export interface GithubUser {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
}

export interface LinkType {
  _id: string;
  userId?: string;
  fromUrl: string;
  toUrl: string;
  numClicks?: number;
  maxNumClicks?: number;
  password?: string;
  description?: string;
}
