export enum MenuEntry {
  About = 'About',
  Quit = 'Quit',
}

export interface NotifyOptions {
  iconType?: 'none' | 'info' | 'warning' | 'error' | 'custom';
  title: string;
  content: string;
  largeIcon?: boolean;
  noSound?: boolean;
  respectQuietTime?: boolean;
}
