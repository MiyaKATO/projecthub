export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  description?: string;
  category: 'tool' | 'drive' | 'site';
}

export interface ResourceCategory {
  id: string;
  title: string;
  icon: string;
  links: {
    title: string;
    url: string;
    description?: string;
  }[];
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
  tag?: string;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  status: 'upcoming' | 'completed' | 'urgent';
}
