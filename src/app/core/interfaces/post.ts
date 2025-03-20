export interface Post {
  _id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
