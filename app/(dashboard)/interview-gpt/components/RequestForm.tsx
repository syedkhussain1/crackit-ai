'use client';

import React, { useState } from 'react';
import type { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import { InterviewData } from '../types';
import Chat from './Chat';

interface RequestFormProps {
  interviewData: InterviewData;
  setInterviewData: React.Dispatch<React.SetStateAction<InterviewData>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestForm: React.FC<RequestFormProps> = ({ interviewData, setInterviewData, setIsLoading }) => {
  const { interviewType } = interviewData;
  const [jobDescriptionUrl, setJobDescriptionUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const mergeTextContent = (textContent: TextContent) => {
    return textContent.items.map(item => {
      const { str, hasEOL } = item as TextItem;
      return str + (hasEOL ? '\n' : '');
    }).join('');
  };

  const readResume = async (pdfFile: File | undefined) => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
        const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
        loadingTask.promise.then((pdfDoc) => {
          pdfDoc.getPage(1).then((page) => {
            page.getTextContent().then((textContent) => {
              const extractedText = mergeTextContent(textContent);
              setInterviewData(data => ({
                ...data,
                resumeText: extractedText
              }));
              setResumeUploaded(true);
            });
          });
        }, (reason) => {
          console.error(`Error during PDF loading: ${reason}`);
        });
      }
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  const scrapeJobDescription = async (url: string) => {
    const response = await fetch(`/api/scrapper`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const responseData = await response.json();
    setInterviewData(data => ({
      ...data,
      jobDescriptionText: responseData.textContent
    }));
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setInterviewData(data => ({
      ...data,
      resumeText: ''
    }));
    const file = event.target.files?.[0];
    if (!file) {
      console.error('No file selected');
      setIsLoading(false);
      return;
    }
    await scrapeJobDescription(jobDescriptionUrl);
    await readResume(file);
    setIsLoading(false);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeUploaded(false);
    setInterviewData(data => ({ ...data, resumeText: '' }));
  };

  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <h2 className='capitalize font-semibold text-4xl mb-6 text-primary md:col-span-3'>Interview GPT</h2>
        <div className="flex flex-col gap-2 md:col-span-3">
          <label htmlFor="job-input" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Job Description or URL
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            name="job-input"
            rows={3}
            placeholder="Paste the job description or enter a job URL"
            value={jobDescriptionUrl}
            onChange={(e) => setJobDescriptionUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="interview-type" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Interview Type</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            name="interview-type"
            value={interviewType} 
            onChange={(e) => setInterviewData(data => ({
              ...data,
              interviewType: e.target.value
            }))}
          >
            <option value="">Select Interview Type</option>
            <option value="behavioral">Behavioral</option>
            <option value="leetcode">Leetcode</option>
            <option value="project">Project</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="difficulty" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Difficulty Level</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            name="difficulty"
            value={interviewData.difficultyLevel} 
            onChange={(e) => setInterviewData(data => ({
              ...data,
              difficultyLevel: e.target.value as 'easy' | 'medium' | 'hard' | 'expert'
            }))}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy - Basic concepts and simple problems</option>
            <option value="medium">Medium - Standard interview questions</option>
            <option value="hard">Hard - Challenging problems and deep concepts</option>
            <option value="expert">Expert - Advanced topics and complex scenarios</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 md:col-span-3 items-end">
          <input type="file" id="file-upload" onChange={handleResumeUpload} accept="application/pdf" className="hidden" />
          <label 
            htmlFor="file-upload" 
            className="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            onClick={handleOpenModal}
          >
            Next
          </label>
        </div>
      </form>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white">&times;</button>
            {!resumeUploaded ? (
              <div className="flex flex-col items-center justify-center h-64">
                <input type="file" id="modal-file-upload" onChange={handleResumeUpload} accept="application/pdf" className="hidden" />
                <label htmlFor="modal-file-upload" className="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  Select Resume PDF
                </label>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Please upload your resume to start the interview.</p>
              </div>
            ) : (
              <Chat interviewData={interviewData} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RequestForm; 