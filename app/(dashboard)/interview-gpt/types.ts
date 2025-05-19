export type InterviewData = {
  jobDescriptionText: string;
  interviewType: string;
  resumeText: string;
  difficultyLevel: 'easy' | 'medium' | 'hard' | 'expert';
};

export type Props = {
  language: string;
  value: string;
};

export type languageMap = {
  [key: string]: string | undefined;
};

export type MarkdownRendererProps = {
  children: string;
};

export type Message = {
  author: {
    username: string;
    id: number;
    avatarUrl: string;
  };
  text: string;
  type: string;
  timestamp: number;
};

export type aiMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const userAuthor = {
  username: 'User',
  id: 1,
  avatarUrl: '/user-avatar.jpg',
};

export const aiAuthor = {
  username: 'Bob The Interviewer',
  id: 2,
  avatarUrl: '/bob.jpg',
};

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
}; 