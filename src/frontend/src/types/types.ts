export interface GithubUser {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
}

export interface LinkType {
  id: string;
  origen: string;
  destino: string;
  idUser: string;
  status?: boolean;
  description?: string;
  nClicks?: number;
  creationDate: Date;
}
