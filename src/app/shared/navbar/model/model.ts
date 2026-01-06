export interface ContentData {
  items: ContentItem[];
}

export interface ContentItem {
  id: number;
  type: 'card' | 'carousel';
  message?: Message;
  images: string[];
}

export interface Message {
  title: string;
  text: string;
}
