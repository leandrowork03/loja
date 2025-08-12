
//src/app/types/info.ts
export interface Post {
  id: string;
  title: string;
  price: number;
  description: string;
  img: string;
}

export type InformationParams = {
  params: {
    id: string;
  };
};
