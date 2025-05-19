'use client';

import React, { useState, useEffect, FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { fetchOpenAIResponse } from '@/app/utils/fetchOpenAIResponse';
import RequestForm from './components/RequestForm';
import Chat from './components/Chat';
import { InterviewData } from './types';

// Types
type Props = {
  language: string;
  value: string;
};

type languageMap = {
  [key: string]: string | undefined;
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

// Utility Functions
export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

// Components
const CodeBlock: FC<Props> = memo(({ language, value }) => {

  return (
    <div className="relative w-full font-sans codeblock bg-zinc-950">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 rounded-t bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

const InterviewGPT: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialText, setInitialText] = useState<string>();
  const [interviewData, setInterviewData] = useState<InterviewData>({
    jobDescriptionText: '',
    interviewType: '',
    resumeText: '',
    difficultyLevel: 'medium',
  });

  useEffect(() => {
    const startInterview = async (text: string) => {
      const messageToSend = `INTERVIEW TYPE: ${interviewData.interviewType}
------------
DIFFICULTY LEVEL: ${interviewData.difficultyLevel}
------------
RESUME: ${text}
------------
JOB DESCRIPTION: ${interviewData.jobDescriptionText}
------------`;
      await fetchOpenAIResponse([{role: 'user', content: messageToSend }], (msg: string) => setInitialText(msg));
    };

    if (isLoading && interviewData.resumeText !== '' && interviewData.resumeText !== undefined) {
      startInterview(interviewData.resumeText).then(() => {
        setIsLoading(false);
        setShowChat(true);
      });
    }
  }, [
    interviewData.resumeText,
    interviewData.difficultyLevel,
    interviewData.interviewType,
    interviewData.jobDescriptionText,
    isLoading
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!showChat ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <RequestForm interviewData={interviewData} setIsLoading={setIsLoading} setInterviewData={setInterviewData} />
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Chat initialText={initialText} interviewData={interviewData} />
        </div>
      )}
    </div>
  );
};

export default InterviewGPT; 