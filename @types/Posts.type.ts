export interface Post {
  $id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  creator: PostCreator;
}

export interface PostCreator {
  username: string;
  avatar: string;
}

export interface FileMedia {
  mimeType?: string;
  name?: string;
  size?: number;
  uri?: string;
}
