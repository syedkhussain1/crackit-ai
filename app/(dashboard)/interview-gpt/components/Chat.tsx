'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { fetchOpenAIResponse } from '@/app/utils/fetchOpenAIResponse';
import MarkdownRenderer from './MarkdownRenderer';
import { InterviewData, Message, aiMessage, aiAuthor, userAuthor } from '../types';

interface ChatProps {
  initialText?: string;
  interviewData: InterviewData;
}

const Chat: React.FC<ChatProps> = ({ initialText, interviewData }) => {
  const [input, setInput] = useState('');
  const { resumeText, jobDescriptionText, interviewType } = interviewData;
  
  const initialMessage = {
    author: aiAuthor,
    text: initialText ?? 'Hello, I am Bob the Interviewer. How can I help you?',
    type: 'text',
    timestamp: +new Date(),
  };

  const resumeMessage: aiMessage = {
    role: 'system',
    content: `You help students prepare for technical interviews.
The quality and complexity of your help should be based on the selected difficulty level.
For easy level, focus on basic concepts and simple problems.
For medium level, provide standard interview questions and moderate challenges.
For hard level, include challenging problems and deep technical concepts.
For expert level, cover advanced topics and complex scenarios.
------------
INTERVIEW TYPE: ${interviewType}
------------
DIFFICULTY LEVEL: ${interviewData.difficultyLevel}
------------
RESUME: ${resumeText}
------------
JOB DESCRIPTION: ${jobDescriptionText}
------------`
  };

  const initialAiMessage: aiMessage = {
    role: 'assistant',
    content: initialText ?? 'Hello, I am Bob the Interviewer. How can I help you?',
  };

  const [chatMessages, setChatMessages] = useState<Message[]>([initialMessage]);
  const [aiMessages, setAiMessages] = useState<aiMessage[]>([resumeMessage, initialAiMessage]);
  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [chatMessages]);

  const handleOnSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget['input-field'].value;
    setInput('');

    setChatMessages(messages => [...messages, {
      author: userAuthor,
      text: message,
      type: 'text',
      timestamp: +new Date()
    }, {
      author: aiAuthor,
      text: '...',
      type: 'text',
      timestamp: +new Date()
    }]);

    const messageToSend: aiMessage[] = [...aiMessages, {role: 'user' as const, content: message }];

    const response = await fetchOpenAIResponse(
      messageToSend, 
      (msg: string) => setChatMessages(messages => 
        [...messages.slice(0, messages.length-1), {
          author: aiAuthor,
          text: msg,
          type: 'text',
          timestamp: +new Date()
        }]
      )
    );
    setAiMessages(messages => [...messages, {role: 'user' as const, content: message }, {role: 'assistant' as const, content: response }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div ref={chatContainer} className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((m, index) => (
          <div key={index} className={`flex items-start space-x-4 ${m.author.username === 'User' ? 'justify-end' : 'justify-start'}`}>
            {m.author.username !== 'User' && (
              <Image className="rounded-full" alt="avatar" src={m.author.avatarUrl} width={32} height={32} />
            )}
            <div className={`max-w-[70%] ${m.author.username === 'User' ? 'order-1' : 'order-2'}`}>
              <div className={`p-4 rounded-lg ${
                m.author.username === 'User' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}>
                <MarkdownRenderer>{m.text}</MarkdownRenderer>
              </div>
            </div>
            {m.author.username === 'User' && (
              <Image className="rounded-full order-2" alt="avatar" src={m.author.avatarUrl} width={32} height={32} />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleOnSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <input 
            name="input-field" 
            type="text" 
            placeholder="Say anything" 
            onChange={(e) => setInput(e.target.value)} 
            value={input}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 