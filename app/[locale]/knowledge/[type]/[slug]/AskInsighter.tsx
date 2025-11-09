'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { Avatar, Badge, Text, Card, Button } from '@mantine/core';
import { IconX, IconTrash } from '@tabler/icons-react';

// Import CSS module for thread connectors
import styles from './AskInsighter.module.css';

// Import toast context
import { useToast } from '@/components/toast/ToastContext';

import { Question, KnowledgeDetails } from './types';

// Update User interface to include roles
interface User {
  id?: number;
  uuid?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  profile_photo_url?: string;
  profile_image?: string;
  roles?: string[];
}

interface AskInsighterProps {
  knowledgeSlug: string;
  questions?: Question[];
  is_owner?: boolean;
  onRefreshData?: () => void; // Function to refresh knowledge data
}

export default function AskInsighter({ knowledgeSlug, questions = [], is_owner = false, onRefreshData }: AskInsighterProps) {
  // Get toast context with notification methods
  const { error, success } = useToast();
  const [questionText, setQuestionText] = useState('');
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // Keeping this for tracking which question is being replied to, even though forms will always be visible
  // Track the parent question ID for nested replies
  const [parentQuestionId, setParentQuestionId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Track which question's reply form is currently visible
  const [visibleReplyForm, setVisibleReplyForm] = useState<number | null>(null);
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
    writeReply: isRTL ? '\u0627\u0643\u062a\u0628 \u0631\u062f\u0643...' : 'Add your comment...',
    writeAnswer: isRTL ? '\u0627\u0643\u062a\u0628 \u0625\u062c\u0627\u0628\u062a\u0643...' : 'Add your reply...',
    postQuestion: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644' : 'Send Question',
    postReply: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f' : 'Comment',
    postAnswer: isRTL ? '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629' : 'Reply',
    cancelReply: isRTL ? '\u0625\u0644\u063a\u0627\u0621' : 'Cancel',
    reply: isRTL ? '\u0631\u062f' : 'Comment',
    answer: isRTL ? '\u0625\u062c\u0627\u0628\u0629' : 'Answer',
    edit: isRTL ? '\u062a\u0639\u062f\u064a\u0644' : 'Edit',
    remove: isRTL ? '\u062d\u0630\u0641' : 'Remove',
    report: isRTL ? '\u0625\u0628\u0644\u0627\u063a' : 'Report',
    author: isRTL ? '\u0627\u0644\u0645\u0624\u0644\u0641' : 'Author',
    commentSettings: isRTL ? '\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0642' : 'Comment settings',
    noQuestionsYet: isRTL ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0633\u0626\u0644\u0629 \u0628\u0639\u062f' : 'No questions yet',
    submittingQuestion: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644...' : 'Submitting question...',
    submittingReply: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f...' : 'Submitting reply...',
    submittingAnswer: isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629...' : 'Submitting answer...',
    questionSubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0628\u0646\u062c\u0627\u062d!' : 'Question submitted successfully!',
    replySubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f \u0628\u0646\u062c\u0627\u062d!' : 'Reply submitted successfully!',
    answerSubmitted: isRTL ? '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062c\u0627\u0628\u0629 \u0628\u0646\u062c\u0627\u062d!' : 'Answer submitted successfully!',
    errorSubmitting: isRTL ? '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.' : 'Error submitting. Please try again.',
    loginRequired: isRTL ? 'للتواصل مع الخبير يرجى تسجيل الدخول' : 'To ask with the Insighter, please log in.',
    loginButton: isRTL ? '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644' : 'Login',
    questions: isRTL ? '\u0623\u0633\u0626\u0644\u0629' : 'Questions',
    question: isRTL ? '\u0633\u0624\u0627\u0644' : 'Question',
    deleteQuestion: isRTL ? '\u062d\u0630\u0641 \u0627\u0644\u0633\u0624\u0627\u0644' : 'Delete Question',
    deletingQuestion: isRTL ? '\u062c\u0627\u0631\u064a \u062d\u0630\u0641 \u0627\u0644\u0633\u0624\u0627\u0644...' : 'Deleting question...',
    questionDeleted: isRTL ? '\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0633\u0624\u0627\u0644 \u0628\u0646\u062c\u0627\u062d!' : 'Question deleted successfully!',
    deleteError: isRTL ? '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u062d\u0630\u0641 \u0627\u0644\u0633\u0624\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.' : 'Error deleting question. Please try again.',
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
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch(
        `https://api.insightabusiness.com/api/account/ask/insighter/knowledge/${knowledgeSlug}`,
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
            const errorMsg = errorMessages[0] as string;
            setSubmitError(errorMsg);
            error(errorMsg); // Show toast notification
          } else {
            const errorMsg = errorData.message || translations.errorSubmitting;
            setSubmitError(errorMsg);
            error(errorMsg); // Show toast notification
          }
        } else {
          const errorMsg = errorData?.message || translations.errorSubmitting;
          setSubmitError(errorMsg);
          error(errorMsg); // Show toast notification
        }
        
        throw new Error(`Failed to submit question: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Question submitted successfully:', data);
      setQuestionText('');
      setSubmitSuccess(true);
      success(translations.questionSubmitted);
      
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
  
  const handleReplySubmit = async (e: React.FormEvent, questionId: number, parentId: number | null = null) => {
    e.preventDefault();
    
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
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Get the reply text for this specific question
      const replyText = replyTexts[questionId] || '';
      
      if (!replyText.trim()) {
        const errorMessage = 'Reply cannot be empty';
        setSubmitError(errorMessage);
        error(errorMessage);
        return;
      }
      
      if (is_owner) {
        // For authors/owners, always use the specific question ID provided
        // For insighters, this will be the deepest question ID in the thread
        console.log(`[AskInsighter] Owner answering question ID: ${questionId}`);
        response = await fetch(
          `https://api.insightabusiness.com/api/insighter/library/knowledge/answer/${questionId}`,
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
        // parentId should always be the top-level parent question ID
        if (!parentId) {
          console.error('[AskInsighter] Error: Missing parent_id for nested question');
          const errorMessage = 'Missing parent question reference';
          setSubmitError(errorMessage);
          error(errorMessage);
          return;
        }
        
        console.log(`[AskInsighter] Submitting reply to parent question ID: ${parentId}`);
        response = await fetch(
          `https://api.insightabusiness.com/api/account/ask/insighter/knowledge/${knowledgeSlug}`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              question: replyText,
              parent_id: parentId  // Always use the explicit parent ID
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
            const errorMsg = errorMessages[0] as string;
            setSubmitError(errorMsg);
            error(errorMsg); // Show toast notification
          } else {
            const errorMsg = errorData.message || translations.errorSubmitting;
            setSubmitError(errorMsg);
            error(errorMsg); // Show toast notification
          }
        } else {
          const errorMsg = errorData?.message || translations.errorSubmitting;
          setSubmitError(errorMsg);
          error(errorMsg); // Show toast notification
        }
        
        throw new Error(`Failed to submit reply: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Reply submitted successfully:', data);
      
      // Clear only the specific reply text for this question
      setReplyTexts(prev => {
        const updated = {...prev};
        delete updated[questionId];
        return updated;
      });
      
      setSubmitSuccess(true);
      
      // Show success toast notification
      success(is_owner ? translations.answerSubmitted : translations.replySubmitted);
      
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

  // Helper function to find the deepest unanswered question in a thread
  const findDeepestUnansweredQuestion = (question: Question): Question => {
    // If the question has children (replies)
    if (question.children && question.children.length > 0) {
      // Sort children by date (newest last)
      const sortedChildren = [...question.children].sort((a, b) => {
        const dateA = new Date(a.question.question_date).getTime();
        const dateB = new Date(b.question.question_date).getTime();
        return dateA - dateB; // Ascending order (oldest first)
      });
      
      // Get the last child (most recent)
      const lastChild = sortedChildren[sortedChildren.length - 1];
      
      // If the last child doesn't have an answer, return the result of recursively checking it
      if (!lastChild.answer || !lastChild.answer.answer) {
        return findDeepestUnansweredQuestion(lastChild);
      }
    }
    
    // If no children or all children have answers, return this question
    return question;
  };
  
  // Helper function to find the original top-level parent of a question
  const findTopLevelParent = (questions: Question[], targetId: number): number => {
    // First check if this question is a direct top-level question
    const foundQuestion = questions.find(q => q.id === targetId);
    if (foundQuestion) {
      return foundQuestion.id; // It's already a top-level question
    }
    
    // Search through all top-level questions and their children recursively
    for (const question of questions) {
      if (findQuestionInChildren(question, targetId)) {
        return question.id; // Return the ID of the top-level parent
      }
    }
    
    // If not found, default to the target ID itself as a fallback
    // This should rarely happen but provides a safe default
    console.warn(`[AskInsighter] Could not find top-level parent for question ID: ${targetId}`);
    return targetId;
  };
  
  // Helper function to search for a question ID in the children hierarchy
  const findQuestionInChildren = (question: Question, targetId: number): boolean => {
    // Check if any direct child matches the target ID
    if (question.children && question.children.length > 0) {
      // Direct child match
      if (question.children.some(child => child.id === targetId)) {
        return true;
      }
      
      // Recursive search in each child's children
      for (const child of question.children) {
        if (findQuestionInChildren(child, targetId)) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  // Function to delete a question
  const deleteQuestion = async (questionId: number) => {
    if (!authToken) {
      setSubmitError(translations.loginRequired);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://api.insightabusiness.com/api/account/knowledge/question/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      
      if (response.ok) {
        // Show success message
        setSubmitSuccess(true);
        success(translations.questionDeleted);
        
        // Refresh the page after successful deletion
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || translations.deleteError;
        setSubmitError(errorMessage);
        error(errorMessage);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      setSubmitError(translations.deleteError);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderQuestions = (questionsToRender: Question[], isReply = false) => {
    if (questionsToRender.length === 0 && !isReply) {
      return (
        <Card >
          <Text color="dimmed" className="text-start">
          {translations.noQuestionsYet}
          </Text>
        </Card>
      );
    }
    
    // Sort questions/replies by date (oldest first)
    const sortedQuestions = [...questionsToRender].sort((a, b) => {
      const dateA = new Date(a.question.question_date).getTime();
      const dateB = new Date(b.question.question_date).getTime();
      return dateA - dateB; // Ascending order (oldest first)
    });
    
    // Function to check if this is the last reply in a thread
    const isLastReply = (index: number) => isReply && index === sortedQuestions.length - 1;

    return sortedQuestions.map((question, index, array) => {
      const userImage = question.question.user.profile_photo_url || question.question.user.profile_image;
      const userName = question.question.user.name || `${question.question.user.first_name} ${question.question.user.last_name}`.trim();
      const userInitials = userName
        ? userName
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('')
        : 'U';
      const questionDate = formatDate(question.question.question_date);
      // Check if the question has a valid answer (ensure we handle null/undefined/empty strings properly)
      const hasAnswer = Boolean(question.answer?.answer);
      const hasReplies = question.children && question.children.length > 0;
      
      // Check if this is the last item in the array
      const isLastItem = index === array.length - 1;
      
      return (
        <>  {/* Add question number badge for parent questions only */}
        {!isReply && (
          <div className="">
            <div
              className="bg-[#5AA9E6] text-white font-bold px-3 py-2 text-center max-w-[150px] shadow-md"
              style={{ 
                minWidth: '40px', 
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px' 
              }}
            >
              {translations.question} {questions.findIndex(q => q.id === question.id) + 1}
            </div>
          </div>
        )}
      <div 
        id={!isReply ? `question-${question.id}` : undefined}
        className={`${isReply ? '' : 'border shadow-sm p-5'} bg-white rounded mb-5 overflow-hidden relative`}
      >
        
          
          <div className={styles.commentContainer} key={question.id} dir={isRTL ? 'rtl' : 'ltr'}>
       
          <article 
            className={`${styles.commentBox} ${isReply ? 'dark:bg-gray-800' : 'dark:bg-gray-900'}`}
          >
          
          <footer className="flex justify-between items-center ">
            <div className="flex items-center">
                 {/* Avatar - different position for parent vs child */}
          {question.question.user.uuid ? (
            <Link 
              href={`/${locale}/profile/${question.question.user.uuid}${getEntityParam(question.question.user)}`}
            >
              <Avatar
                className={`${styles.commentAvatar} ${isReply ? styles.childAvatar : styles.parentAvatar}`}
                src={userImage}
                alt={userName}
                data-testid={`avatar-${question.id}`}
              >
                {!userImage && userInitials}
              </Avatar>
            </Link>
          ) : (
            <Avatar
              className={`${styles.commentAvatar} ${isReply ? styles.childAvatar : styles.parentAvatar}`}
              src={userImage}
              alt={userName}
              data-testid={`avatar-${question.id}`}
            >
              {!userImage && userInitials}
            </Avatar>
          )}
          
              <p className="inline-flex items-start mx-3 text-sm text-gray-900 dark:text-white font-semibold capitalize" >
                {question.question.user.uuid ? (
                  <Link 
                    href={
                      `/${locale}/profile/${question.question.user.uuid}${getEntityParam(question.question.user)}`
                    } 
                    className="hover:underline"
                  >
                    <span className="capitalize">{userName.toLowerCase()}</span>
                  </Link>
                ) : (
                  userName.toLowerCase()
                )}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <time dateTime={question.question.question_date} title={question.question.question_date}>
                  {questionDate}
                </time>
              </p>
            </div>
          </footer>
        <div className="flex pb-4">
        <div aria-hidden="true" className={hasAnswer ? styles.commentsThreadLine : 'ps-10'} role="button"></div>
          {/* Question content */}
          <div className="flex justify-between items-start px-3 w-full">
                  <p className="text-gray-800 mb-4 text-sm font-semibold">{question.question?.question}</p>
                  {question.is_owner && (
                    <Button
                      size="xs"
                      color="red"
                      variant="subtle"
                      onClick={() => deleteQuestion(question.id)}
                      disabled={isSubmitting}
                      className="hover:bg-red-50 ml-2"
                    >
                      <div className="flex items-center">
                        <IconTrash size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
                        {translations.deleteQuestion}
                      </div>
                    </Button>
                  )}
                </div>
       
        </div>
          
          {/* Answer if exists */}
          {hasAnswer && (
            <div className={`${styles.commentContainer} ${styles.answer} `} dir={isRTL ? 'rtl' : 'ltr'}>
            
              
              <article className={`${styles.commentBox}  `}>
                <footer className="flex justify-between items-center ">
                  <div className="flex items-center ">
                  <div aria-hidden="true" className={styles.curveElement} role="button"></div>
              {question.answer.user.uuid ? (
                <Link 
                  href={`/${locale}/profile/${question.answer.user.uuid}${getEntityParam(question.answer.user)}`}
                >
                  <Avatar
                    className={`${styles.commentAvatar} ${styles.childAvatar}`}
                    src={question.answer.user.profile_photo_url || question.answer.user.profile_image}
                    alt={question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim()}
                    data-testid={`avatar-answer-${question.id}`}
                  >
                    {!(question.answer.user.profile_photo_url || question.answer.user.profile_image) &&
                      (question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim())
                        .split(' ')
                        .map(name => name.charAt(0).toUpperCase())
                        .join('')
                    }
                  </Avatar>
                </Link>
              ) : (
                <Avatar
                  className={`${styles.commentAvatar} ${styles.childAvatar}`}
                  src={question.answer.user.profile_photo_url || question.answer.user.profile_image}
                  alt={question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim()}
                  data-testid={`avatar-answer-${question.id}`}
                >
                  {!(question.answer.user.profile_photo_url || question.answer.user.profile_image) &&
                    (question.answer.user.name || `${question.answer.user.first_name} ${question.answer.user.last_name}`.trim())
                      .split(' ')
                      .map(name => name.charAt(0).toUpperCase())
                      .join('')
                  }
                </Avatar>
              )}
                    <p className="inline-flex  items-center mx-3 text-sm text-gray-900 dark:text-white font-semibold">
                      {question.answer.user.uuid ? (
                        <Link 
                          href={
                            `/${locale}/profile/${question.answer.user.uuid}${getEntityParam(question.answer.user)}`
                          } 
                          className="hover:underline"
                        >
                          <span className=" capitalize">{question.answer.user.name?.toLowerCase() || `${question.answer.user.first_name.toLowerCase()} ${question.answer.user.last_name.toLowerCase()}`.trim()}</span>
                        </Link>
                      ) : (
                        <span className=" capitalize">{question.answer.user.name?.toLowerCase() || `${question.answer.user.first_name.toLowerCase()} ${question.answer.user.last_name.toLowerCase()}`.trim()}</span>
                      )}
                    </p>
                    <span className="me-2 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">{translations.author}</span>
                    {question.answer.answer_date && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mx-2">
                        <time dateTime={question.answer.answer_date} title={question.answer.answer_date}>
                          {formatDate(question.answer.answer_date)}
                        </time>
                      </p>
                    )}
                  </div>
                </footer>
                
             <div className="flex pb-4">
             <div aria-hidden="true" className={styles.emptyThread} role="button"/>
             <p className="text-gray-800 dark:text-gray-300 text-sm ps-4 bg-[#eff6ff] p-4 rounded-lg flex-1">{question.answer.answer}</p>
             </div>
              </article>
          
            </div>
          )}
          
          {/* Reply form for answering the current question - shown before replies for owners */}
          {isLoggedIn && is_owner && !hasAnswer && (
            <div className="rounded-lg mb-4">
              <form onSubmit={(e) => {
                handleReplySubmit(e, question.id, null);
              }}>
                <div className="relative"             style={isReply?{width: '92%',marginInlineStart: 'auto'}:{width: '100%',marginInlineStart: '0'}}>
                  <label htmlFor={`replyText-${question.id}`} className="sr-only">
                    {translations.writeAnswer}
                  </label>
                  <textarea
                    id={`replyText-${question.id}`}
                    rows={2}
                    className=" px-3 py-2 pe-20 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px]"
                    placeholder={translations.writeAnswer}
        
                    value={replyTexts[question.id] || ''}
                    onChange={(e) => setReplyTexts(prev => ({ ...prev, [question.id]: e.target.value }))}
                    disabled={isSubmitting}
                  />
                  <div className="absolute mb-2 bottom-2 end-5 flex gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && replyingTo === question.id
                        ? translations.submittingAnswer
                        : translations.postAnswer}
                    </button>
                  </div>
                </div>
                {/* Error handling now done via toast system */}
              </form>
            </div>
          )}

          {/* Render children/replies */}
          {hasReplies && renderQuestions(question.children, true)}
          
          {/* Reply form - shown for regular users */}
          {isLoggedIn && (
            <>
              {/* Show form if user is not owner and it's either:
                  1. The last reply in a thread
                  2. A parent with no replies */}
              {(!is_owner && ((isReply && isLastReply(index)) || (!isReply && !hasReplies))) && (
                <div className="rounded-lg">
                  <form onSubmit={(e) => {
                    // Different handling for owners vs regular users
                    if (is_owner) {
                      // For owners/authors, directly use the current question's ID
                      // No need to find deepest question since we're showing answer forms for all unanswered questions
                      handleReplySubmit(e, question.id, null);
                    } else {
                      // For regular users, ALWAYS find the top-level parent question ID
                      // This ensures replies are always attached to the original parent question, not an immediate parent
                      const topLevelParentId = findTopLevelParent(questions, question.id);
                      handleReplySubmit(e, question.id, topLevelParentId);
                    }
                  }}>
                    <div className="relative" >
                      <label htmlFor={`replyText-${question.id}`} className="sr-only">
                        {is_owner ? translations.writeAnswer : translations.writeReply}
                      </label>
                      <textarea
                        id={`replyText-${question.id}`}
                        rows={2}
                        className="px-3 py-2 pe-20 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px]"
                        placeholder={is_owner ? translations.writeAnswer : translations.writeReply}
                        value={replyTexts[question.id] || ''}
                        onChange={(e) => setReplyTexts(prev => ({ ...prev, [question.id]: e.target.value }))}
                        disabled={isSubmitting}
                      />
                      <div className="absolute mb-2 bottom-2 end-5 flex gap-2">
                        <button
                          type="submit"
                          className="inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && replyingTo === question.id
                            ? (is_owner ? translations.submittingAnswer : translations.submittingReply) 
                            : (is_owner ? translations.postAnswer : translations.postReply)}
                        </button>
                      </div>
                    </div>
                    {/* Error handling now done via toast system */}
                  </form>
                </div>
              )}
            </>
          )}
          
          {/* Login button for non-logged in users - only show for top-level questions */}
          {!isLoggedIn && !isReply && (
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-4'}`}>
              <a
                href={getLoginUrl()}
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
            </div>
          )}
          </article>
        </div>
      </div>
      </>
      );
    });
  };

  // Redirect URL for login button with returnUrl parameter
  const getLoginUrl = () => {
    return `https://app.insightabusiness.com/auth/login?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`;
  };
  
  // Determine if user is logged in
  const isLoggedIn = authToken !== null;
  
  // Helper function to add entity parameter based on user roles
  const getEntityParam = (user: any): string => {
    // Safely access roles with type checking
    const roles = user?.roles;
    if (!roles || !Array.isArray(roles)) return '';
    
    if (roles.includes('company-insighter')) return '?entity=company-insighter';
    else if (roles.includes('insighter')) return '?entity=insighter';
    else if (roles.includes('company')) return '?entity=company';
    
    return '';
  };
  
  return (
    <section className="dark:bg-gray-900 py-8 antialiased" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={styles.threadWrapper}>
        
        {/* Show login prompt if user is not logged in */}
        {!isLoggedIn ? (
          <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="mb-4 text-gray-700">{translations.loginRequired}</p>
            <a 
              href={getLoginUrl()}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              {translations.loginButton}
            </a>
          </div>
        ) : (
          /* Only show question form if user is logged in AND not the owner */
          !is_owner && (
            <form className="mb-6" onSubmit={handleQuestionSubmit}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="question" className="sr-only">
                  {translations.writeQuestion}
                </label>
                <div className="flex flex-col">
                  <textarea
                    id="question"
                    rows={3}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder={translations.writeQuestion}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2 px-4 text-xs font-bold text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? translations.submittingQuestion : translations.postQuestion}
                    </button>
                  </div>
                </div>
              </div>
              {/* Error handling now done via toast system */}
     
            </form>
          )
        )}
        
        {/* Display all questions */}
        {renderQuestions(questions)}
        </div>
      </div>
    </section>
  );
}
