'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { Question, KnowledgeDetails, User } from './types';

interface AskInsighterProps {
  knowledgeSlug: string;
  questions?: Question[];
  is_owner?: boolean;
  onRefreshData?: () => void; // Function to refresh knowledge data
}

export default function AskInsighter({ knowledgeSlug, questions = [], is_owner = false, onRefreshData }: AskInsighterProps) {
  const [questionText, setQuestionText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  // Track the parent question ID for nested replies
  const [parentQuestionId, setParentQuestionId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  
  // Get the authentication token from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setAuthToken(token);
    }
  }, []);
  
  // Translations for the component
  const translations = {
    discussion: isRTL ? '\u0627\u0644\u0623\u0633\u0626\u0644\u0629' : 'Questions',
    writeQuestion: isRTL ? '\u0627\u0643\u062a\u0628 \u0633\u0624\u0627\u0644\u0643 \u0644\u0644\u062e\u0628\u064a\u0631...' : 'Write your question to the insighter...',
    writeReply: isRTL ? '\u0627\u0643\u062a\u0628 \u0631\u062f\u0643...' : 'Write your reply...',
    writeAnswer: isRTL ? '\u0627\u0643\u062a\u0628 \u0625\u062c\u0627\u0628\u062a\u0643...' : 'Write your answer...',
    postQuestion: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644' : 'Send Question',
    postReply: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f' : 'Send Reply',
    postAnswer: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629' : 'Send Answer',
    cancelReply: isRTL ? '\u0625\u0644\u063a\u0627\u0621' : 'Cancel',
    reply: isRTL ? '\u0631\u062f' : 'Reply',
    answer: isRTL ? '\u0625\u062c\u0627\u0628\u0629' : 'Answer',
    edit: isRTL ? '\u062a\u0639\u062f\u064a\u0644' : 'Edit',
    remove: isRTL ? '\u062d\u0630\u0641' : 'Remove',
    report: isRTL ? '\u0625\u0628\u0644\u0627\u063a' : 'Report',
    author: isRTL ? '\u0627\u0644\u0645\u0624\u0644\u0641' : 'Author',
    commentSettings: isRTL ? '\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0642' : 'Comment settings',
    noQuestionsYet: isRTL ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0633\u0626\u0644\u0629 \u0628\u0639\u062f. \u0643\u0646 \u0623\u0648\u0644 \u0645\u0646 \u064a\u0633\u0623\u0644!' : 'No questions yet. Be the first to ask!',
    submittingQuestion: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644...' : 'Submitting question...',
    submittingReply: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f...' : 'Submitting reply...',
    submittingAnswer: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629...' : 'Submitting answer...',
    questionSubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0628\u0646\u062c\u0627\u062d!' : 'Question submitted successfully!',
    replySubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f \u0628\u0646\u062c\u0627\u062d!' : 'Reply submitted successfully!',
    answerSubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629 \u0628\u0646\u062c\u0627\u062d!' : 'Answer submitted successfully!',
    errorSubmitting: isRTL ? '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.' : 'Error submitting. Please try again.',
    loginRequired: isRTL ? '\u064a\u062c\u0628 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629' : 'Login required to participate',
    loginButton: isRTL ? '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644' : 'Login'
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale,
      };
      
      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch(
        `https://api.knoldg.com/api/account/ask/insighter/knowledge/${knowledgeSlug}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            question: questionText,
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
        
        // Handle validation errors returned by the API
        if (errorData && errorData.errors) {
          // Get first error message from each field
          const errorMessages = Object.values(errorData.errors)
            .map(fieldErrors => Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors)
            .filter(Boolean);
          
          if (errorMessages.length > 0) {
            setSubmitError(errorMessages[0] as string);
          } else {
            setSubmitError(errorData.message || translations.errorSubmitting);
          }
        } else {
          setSubmitError(errorData?.message || translations.errorSubmitting);
        }
        
        throw new Error(`Failed to submit question: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Question submitted successfully:', data);
      setQuestionText('');
      setSubmitSuccess(true);
      
      // Refresh knowledge data to show the new question
      if (onRefreshData) {
        setTimeout(() => {
          onRefreshData();
        }, 500); // Small delay to ensure server has processed the data
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      // Error is already set in the error handling above
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingTo === null) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      let response;
      
      // Prepare headers with authentication token if available
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale,
      };
      
      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      if (is_owner) {
        // Author answering a question - use the specific question ID, not the parent
        console.log(`[AskInsighter] Owner answering question ID: ${replyingTo}`);
        response = await fetch(
          `https://api.knoldg.com/api/insighter/library/knowledge/answer/${replyingTo}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              answer: replyText,
            }),
          }
        );
      } else {
        // Regular user replying to a question (creating a nested question)
        // Use the parent question ID for API requests (top-level question IDs)
        const questionIdForApi = parentQuestionId || replyingTo;
        console.log(`[AskInsighter] Submitting reply to parent question ID: ${questionIdForApi}`);
        response = await fetch(
          `https://api.knoldg.com/api/account/ask/insighter/knowledge/${knowledgeSlug}`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              question: replyText,
              parent_id: questionIdForApi
            }),
          }
        );
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
        
        // Handle validation errors returned by the API
        if (errorData && errorData.errors) {
          // Get first error message from each field
          const errorMessages = Object.values(errorData.errors)
            .map(fieldErrors => Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors)
            .filter(Boolean);
          
          if (errorMessages.length > 0) {
            setSubmitError(errorMessages[0] as string);
          } else {
            setSubmitError(errorData.message || translations.errorSubmitting);
          }
        } else {
          setSubmitError(errorData?.message || translations.errorSubmitting);
        }
        
        throw new Error(`Failed to submit reply: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Reply submitted successfully:', data);
      setReplyText('');
      setReplyingTo(null);
      setParentQuestionId(null); // Reset parent question ID after successful reply
      setSubmitSuccess(true);
      
      // Refresh knowledge data to show the new reply
      if (onRefreshData) {
        setTimeout(() => {
          onRefreshData();
        }, 500); // Small delay to ensure server has processed the data
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      // Error is already set in the error handling above
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: isRTL ? ar : enUS
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const renderQuestions = (questionsToRender: Question[], isReply = false) => {
    if (questionsToRender.length === 0 && !isReply) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">{translations.noQuestionsYet}</p>
        </div>
      );
    }
    
    // Sort questions/replies by date (oldest first)
    const sortedQuestions = [...questionsToRender].sort((a, b) => {
      const dateA = new Date(a.question.question_date).getTime();
      const dateB = new Date(b.question.question_date).getTime();
      return dateA - dateB; // Ascending order (oldest first)
    });

    return sortedQuestions.map((question) => {
      const userImage = question.question.user.profile_photo_url || question.question.user.profile_image || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg';
      const userName = question.question.user.name || `${question.question.user.first_name} ${question.question.user.last_name}`.trim();
      const questionDate = formatDate(question.question.question_date);
      const hasAnswer = question.answer && question.answer.answer;
      const hasReplies = question.children && question.children.length > 0;
      
      return (
        <article 
          key={question.id} 
          className={`p-4 text-base mb-4 ${isReply ? 'bg-gray-50 rounded-lg mt-3 dark:bg-gray-800' : 'bg-white rounded-lg dark:bg-gray-900'} ${!isReply && question.id !== questionsToRender[0].id ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className={`${isRTL ? 'ml-2' : 'mr-2'} w-6 h-6 rounded-full`}
                  src={userImage}
                  alt={userName}
                />
                {question.question.user.uuid ? (
                  <Link href={`/${locale}/profile/${question.question.user.uuid}`} className="hover:underline">
                    {userName}
                  </Link>
                ) : (
                  userName
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={question.question.question_date} title={question.question.question_date}>
                  {questionDate}
                </time>
              </p>
            </div>
            <button
              id={`dropdownQuestion${question.id}Button`}
              data-dropdown-toggle={`dropdownQuestion${question.id}`}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">{translations.commentSettings}</span>
            </button>
            {/* Dropdown menu */}
            <div
              id={`dropdownQuestion${question.id}`}
              className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby={`dropdownMenuIconHorizontalButton${question.id}`}
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {translations.edit}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {translations.remove}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {translations.report}
                  </a>
                </li>
              </ul>
            </div>
          </footer>
          
          {/* Question content */}
          <p className="text-gray-500 dark:text-gray-400 mb-4">{question.question.question}</p>
          
          {/* Answer if exists */}
          {hasAnswer && (
            <div className="p-4 bg-gray-50 rounded-lg mt-3 dark:bg-gray-800">
              <div className="flex items-center mb-2">
                <img
                  className={`${isRTL ? 'ml-2' : 'mr-2'} w-6 h-6 rounded-full`}
                  src={question.answer.user.profile_photo_url || question.answer.user.profile_image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                  alt={question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim()}
                />
                <div className="flex items-center">
                  <p className="text-sm font-semibold">
                    {question.answer.user.uuid ? (
                      <Link href={`/${locale}/profile/${question.answer.user.uuid}`} className="hover:underline">
                        {question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim()}
                      </Link>
                    ) : (
                      question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim()
                    )}
                  </p>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">{translations.author}</span>
                  {question.answer.answer_date && (
                    <p className="text-xs text-gray-500 ml-2">{formatDate(question.answer.answer_date)}</p>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{question.answer.answer}</p>
            </div>
          )}
          
          {/* Render children/replies */}
          {hasReplies && renderQuestions(question.children, true)}
          
          {/* For sub-questions/replies, show Answer button for owners if there's no answer */}
          {isReply && is_owner && isLoggedIn && !hasAnswer && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => {
                  // For owner answering, just set the specific question ID 
                  setReplyingTo(question.id);
                  setParentQuestionId(null); // No parent needed for owner answers
                }}
                className="flex items-center text-xs text-blue-600 hover:underline dark:text-blue-500 font-medium"
              >
                <svg className={`${isRTL ? 'ml-1.5' : 'mr-1.5'} w-3 h-3`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                {translations.answer}
              </button>
            </div>
          )}
          
          {/* Reply form - only shown if user is authenticated and positioned just above reply button */}
          {replyingTo === question.id && isLoggedIn && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
              {isReply && !is_owner && (
                <div className="mb-2 text-xs text-blue-500">
                  {isRTL ? 'إضافة رد على تعليق متداخل' : 'Adding reply to nested comment'}
                </div>
              )}
              {is_owner && (
                <div className="mb-2 text-xs text-blue-500">
                  {isRTL ? 'إضافة إجابة على السؤال' : 'Adding answer to question'}
                </div>
              )}
              <form onSubmit={handleReplySubmit}>
                <div className="mb-4">
                  <label htmlFor="replyText" className="sr-only">
                    {is_owner ? translations.writeAnswer : translations.writeReply}
                  </label>
                  <textarea
                    id="replyText"
                    rows={3}
                    className="px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={is_owner ? translations.writeAnswer : translations.writeReply}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {submitError && (
                  <Notification
                    icon={<IconX size={20} />}
                    color="red"
                    onClose={() => setSubmitError('')}
                    mt="sm"
                    mb="md"
                    withCloseButton
                  >
                    {submitError}
                  </Notification>
                )}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setParentQuestionId(null); // Reset parent question ID when canceling
                    }}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    {translations.cancelReply}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (is_owner ? translations.submittingAnswer : translations.submittingReply) 
                      : (is_owner ? translations.postAnswer : translations.postReply)}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Reply/Answer button - Only show for comments without answers or for regular users */}
          {!isReply && (
            <div className={`flex items-center mt-4 ${isRTL ? 'space-x-reverse' : 'space-x-4'}`}>
              {isLoggedIn ? (
                // Conditional rendering based on owner status and whether the question has an answer
                (is_owner && !hasAnswer ? (
                  <button
                    type="button"
                    onClick={() => {
                      // For owner answering, just set the specific question ID
                      setReplyingTo(question.id);
                      setParentQuestionId(null); // No parent needed for owner answers
                    }}
                    className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-500 font-medium"
                  >
                    <svg className={`${isRTL ? 'ml-1.5' : 'mr-1.5'} w-3.5 h-3.5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    {translations.answer}
                  </button>
                ) : !is_owner ? (
                  // Regular user reply button (only show if not owner)
                  <button
                    type="button"
                    onClick={() => {
                      // Set the currently replying-to question ID
                      setReplyingTo(question.id);
                      
                       // This is a top-level question, use its own ID as parent
                       setParentQuestionId(question.id);
                    }}
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg className={`${isRTL ? 'ml-1.5' : 'mr-1.5'} w-3.5 h-3.5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    {translations.reply}
                  </button>
                ) : null) // Don't show any button for owner if question already has an answer
              ) : (
                <a
                  href={loginUrl}
                  className="flex items-center text-sm text-blue-500 hover:underline dark:text-blue-400 font-medium"
                >
                  <svg className={`${isRTL ? 'ml-1.5' : 'mr-1.5'} w-3.5 h-3.5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  {translations.loginButton}
                </a>
              )}
            </div>
          )}
        </article>
      );
    });
  };

  // Redirect URL for login button
  const loginUrl = 'https://app.knoldg.com/auth/login';
  
  // Determine if user is logged in
  const isLoggedIn = authToken !== null;
  
  return (
    <section className="dark:bg-gray-900 py-8 antialiased" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            {translations.discussion} ({questions.length})
          </h2>
        </div>
        
        {/* Show login prompt if user is not logged in */}
        {!isLoggedIn ? (
          <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="mb-4 text-gray-700">{translations.loginRequired}</p>
            <a 
              href={loginUrl}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              {translations.loginButton}
            </a>
          </div>
        ) : (
          /* Show question form if user is logged in */
          <form className="mb-6" onSubmit={handleQuestionSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="question" className="sr-only">
                {translations.writeQuestion}
              </label>
              <textarea
                id="question"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder={translations.writeQuestion}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            {submitError && (
              <Notification
                icon={<IconX size={20} />}
                color="red"
                onClose={() => setSubmitError('')}
                mt="sm"
                mb="md"
                withCloseButton
              >
                {submitError}
              </Notification>
            )}
            
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? translations.submittingQuestion : translations.postQuestion}
            </button>
          </form>
        )}
        
        {/* Display all questions */}
        {renderQuestions(questions)}
      </div>
    </section>
  );
}
