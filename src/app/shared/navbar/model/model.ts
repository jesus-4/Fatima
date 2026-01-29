export interface ContentData {
  items: ContentItem[];
}

export interface ContentItem {
  id: number;
  colSpan: number;
  rowSpan: number;
  type: 'card' | 'carousel';
  message?: Message;
  images: string[];
}

export interface Message {
  title: string;
  text: string;
}

export interface ContentData {
  items: ContentItem[];
}
