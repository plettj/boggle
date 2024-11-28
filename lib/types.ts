export type Author = {
  name: string;
  url: string;
};

export type OGData = {
  title: string;
  description: string;
  url: string;
  type?: string;
  previewImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
};
