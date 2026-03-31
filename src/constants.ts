import { Announcement, Milestone, QuickLink, ResourceCategory } from './types';

export const QUICK_LINKS: QuickLink[] = [
  {
    id: 'freee',
    title: 'Freee',
    url: 'https://accounts.secure.freee.co.jp/sessions/new',
    icon: 'LogIn',
    description: '会計・経費精算システム',
    category: 'tool',
  },
  {
    id: 'slack',
    title: 'Slack',
    url: 'https://slack.com/',
    icon: 'MessageSquare',
    description: 'コミュニケーションツール',
    category: 'tool',
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    url: 'https://drive.google.com/',
    icon: 'HardDrive',
    description: 'プロジェクト共有フォルダ',
    category: 'drive',
  },
  {
    id: 'notion',
    title: 'Notion',
    url: 'https://notion.so/',
    icon: 'BookOpen',
    description: 'ドキュメント・Wiki',
    category: 'site',
  },
];

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'design',
    title: 'デザイン・UI/UX',
    icon: 'Palette',
    links: [
      { title: 'Figma デザインデータ', url: '#', description: '最新のUIプロトタイプ' },
      { title: 'ロゴ・アセット集', url: '#', description: '公式ロゴ・アイコン素材' },
      { title: 'スタイルガイド', url: '#', description: 'プロジェクトの配色・フォント規定' },
    ],
  },
  {
    id: 'dev',
    title: '開発・技術資料',
    icon: 'Code',
    links: [
      { title: 'GitHub リポジトリ', url: '#', description: 'ソースコード管理' },
      { title: 'API ドキュメント', url: '#', description: 'Swagger / Postman' },
      { title: '環境構築手順書', url: '#', description: '新メンバー向けセットアップ' },
    ],
  },
  {
    id: 'legal',
    title: '法務・契約・事務',
    icon: 'FileText',
    links: [
      { title: 'NDA (秘密保持契約)', url: '#', description: '契約書テンプレート' },
      { title: '請求書発行フロー', url: '#', description: '事務手続きマニュアル' },
      { title: 'プロジェクト規約', url: '#', description: '参加メンバーの心得' },
    ],
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    date: '2025-03-25',
    title: 'プロジェクトWikiを更新しました',
    content: '新メンバー向けの開発環境構築手順を最新版に更新しました。',
    tag: '更新',
  },
  {
    id: '2',
    date: '2025-03-20',
    title: '定例ミーティングの時間変更',
    content: '来週より月曜10:00からに変更となります。',
    tag: '重要',
  },
  {
    id: '3',
    date: '2025-03-15',
    title: '新メンバーが参加しました',
    content: 'デザイナーの佐藤さんがチームに加わりました。',
    tag: 'お知らせ',
  },
];

export const MILESTONES: Milestone[] = [
  { id: 'm1', date: '2025-04-01', title: 'ベータ版リリース', status: 'urgent' },
  { id: 'm2', date: '2025-04-15', title: 'ユーザーテスト実施', status: 'upcoming' },
  { id: 'm3', date: '2025-05-01', title: '正式ローンチ', status: 'upcoming' },
];
