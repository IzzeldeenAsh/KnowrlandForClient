'use client';

import { useState, FormEvent } from 'react';
import { KnowledgeDetails, Question, User } from './types';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/app/utils/formatDate';
import { useUserProfile } from '@/app/lib/useUserProfile';
import { getAccessToken } from '@/app/lib/auth/auth';
import { callApi } from './api-helper';
// Removing Mantine import to avoid MantineProvider requirement

interface AskInsighterProps {
  knowledge: KnowledgeDetails;
}

/* ------------------------------------------------------------------ */
/* 🔄  جلب أحدث الأسئلة (بقي كما في الملف الأصلي)                     */
/* ------------------------------------------------------------------ */
async function fetchLatestKnowledge(slug: string, locale: string) {
  try {
    console.log('[AskInsighter] Fetching latest knowledge data for:', slug);

    const response = await fetch(
      `https://api.knoldg.com/api/platform/industries/knowledge/${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) throw new Error(`Failed to fetch knowledge data: ${response.status}`);

    const data = await response.json();
    console.log('[AskInsighter] Latest knowledge data fetched');

    if (data?.data?.questions) {
      console.log(`[AskInsighter] Found ${data.data.questions.length} questions`);
      return data.data.questions as Question[];
    }
    console.warn('[AskInsighter] No questions found');
    return [];
  } catch (err) {
    console.error('[AskInsighter] Error fetching knowledge data:', err);
    return [];
  }
}

export default function AskInsighter({ knowledge }: AskInsighterProps) {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const { user } = useUserProfile();

  /* ------------------------------------------------------------------ */
  /* 🗄️  الحالة                                                          */
  /* ------------------------------------------------------------------ */
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyText, setReplyText] = useState<Record<string | number, string>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [questions, setQuestions] = useState<Question[]>(knowledge.questions || []);

  /* ------------------------------------------------------------------ */
  /* 🔤  الترجمة                                                         */
  /* ------------------------------------------------------------------ */
  const t = {
    discussion: isRTL ? 'النقاش' : 'Discussion',
    askPlaceholder: isRTL ? 'أضف سؤالك هنا…' : 'Write a comment…',
    replyPlaceholder: isRTL ? 'أضف ردك هنا…' : 'Write a reply…',
    submit: isRTL ? 'إرسال' : 'Post comment',
    postQuestion: isRTL ? 'نشر سؤال' : 'Post Question',
    reply: isRTL ? 'رد' : 'Reply',
    askedOn: isRTL ? 'سُئل في' : 'Asked on',
    answeredOn: isRTL ? 'أُجيب في' : 'Answered on',
    seeReplies: isRTL ? 'عرض الردود' : 'See replies',
    hideReplies: isRTL ? 'إخفاء الردود' : 'Hide replies',
    answer: isRTL ? 'إجابة' : 'Answer',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    posting: isRTL ? 'جاري النشر…' : 'Posting…',
    noQuestionsYet: isRTL ? 'لا توجد أسئلة بعد.' : 'No comments yet.',
    login: isRTL ? 'تسجيل الدخول' : 'Login',
    loginToAsk: isRTL ? 'الرجاء تسجيل الدخول للتعليق' : 'Please login to comment',
    loginToReply: isRTL ? 'الرجاء تسجيل الدخول للرد' : 'Please login to reply'
  };

  /* ------------------------------------------------------------------ */
  /* 🔒  صلاحية المالك                                                   */
  /* ------------------------------------------------------------------ */
  const isOwner = knowledge.is_owner;

  /* ------------------------------------------------------------------ */
  /* 🖼️  صورة المستخدم                                                   */
  /* ------------------------------------------------------------------ */
  const initials = (u: User) =>
    u.first_name && u.last_name
      ? `${u.first_name[0]}${u.last_name[0]}`.toUpperCase()
      : u.name?.substring(0, 2).toUpperCase() || 'UN';

  const avatar = (u: any, author = false) => (
    <div className="flex items-center">
      {u.profile_image || u.profile_photo_url ? (
        <Link
          href={`/${locale}/profile/${u.uuid || ''}`}
          className="block h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden"
        >
          <Image
            src={u.profile_image || u.profile_photo_url}
            alt={u.name}
            width={32}
            height={32}
            className="object-cover rounded-full"
          />
        </Link>
      ) : (
        <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-semibold">
          {initials(u)}
        </div>
      )}
      <Link
        href={`/${locale}/profile/${u.uuid || ''}`}
        className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm font-semibold text-gray-900 dark:text-white hover:underline`}
      >
        {u.name}
      </Link>
      {author && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-sm mx-1 bg-sky-100 text-sky-800 border border-sky-200">
          {isRTL ? 'المؤلف' : 'Author'}
        </span>
      )}
    </div>
  );

  /* ------------------------------------------------------------------ */
  /* 📝  إضافة سؤال جديد                                                 */
  /* ------------------------------------------------------------------ */
  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    if (!user) {
      setError(t.loginToAsk);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const questionText = newQuestion;
    setNewQuestion('');

    try {
      const token = getAccessToken();

      await callApi<void>(`account/ask/insighter/knowledge/${knowledge.slug}`, {
        method: 'POST',
        token,
        locale,
        body: { question: questionText }
      });

      setSuccess(isRTL ? 'تم الإرسال بنجاح' : 'Submitted successfully');

      await new Promise((res) => setTimeout(res, 1000));
      const latest = await fetchLatestKnowledge(knowledge.slug, locale);
      setQuestions(latest.length ? latest : questions);
    } catch (err: any) {
      setError(err.message || 'Failed to post question');
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 💬  إضافة رد                                                       */
  /* ------------------------------------------------------------------ */
  const handlePostReply = async (parentId: number, content?: string) => {
    // استخدام المحتوى المقدم أو التقاط المحتوى من حالة replyText
    const replyContent = content || replyText[parentId];
    if (!replyContent?.trim()) return;
    if (!user) {
      setError(t.loginToReply);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = getAccessToken();

      await callApi<void>(`account/ask/insighter/knowledge/${knowledge.slug}`, {
        method: 'POST',
        token,
        locale,
        body: { question: replyContent, parent_id: parentId }
      });

      // إعادة تعيين حقل الإدخال المناسب اعتماداً على ما إذا كان رداً على سؤال أو إجابة
      if (content) {
        setReplyText((p) => ({ ...p, [`answer_reply_${parentId}`]: '' }));
      } else {
        setReplyText((p) => ({ ...p, [parentId]: '' }));
      }
      
      setSuccess(isRTL ? 'تم الإرسال بنجاح' : 'Submitted successfully');

      await new Promise((res) => setTimeout(res, 1000));
      const latest = await fetchLatestKnowledge(knowledge.slug, locale);
      setQuestions(latest.length ? latest : questions);
    } catch (err: any) {
      setError(err.message || 'Failed to post reply');
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* ✅  إجابة الخبير                                                    */
  /* ------------------------------------------------------------------ */
  const handleAnswerQuestion = async (id: number, answerText: string) => {
    if (!answerText.trim() || !isOwner) return;

    setLoading(true);
    setError('');

    try {
      const token = getAccessToken();

      // Using the insighter endpoint for answering questions
      await callApi<void>(`insighter/library/knowledge/answer/${id}`, {
        method: 'PUT',
        token,
        locale,
        body: { answer: answerText }
      });

      setReplyText((p) => ({ ...p, [`answer_${id}`]: '' }));
      setSuccess(isRTL ? 'تم الإرسال بنجاح' : 'Submitted successfully');

      // Wait briefly before refreshing the questions to show the new answer
      await new Promise((res) => setTimeout(res, 1000));
      const latest = await fetchLatestKnowledge(knowledge.slug, locale);
      setQuestions(latest.length ? latest : questions);
    } catch (err: any) {
      setError(err.message || 'Failed to post answer');
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 🔽  حالات عرض الحقول                                               */
  /* ------------------------------------------------------------------ */
  const [showReplies, setShowReplies] = useState<Record<string | number, boolean>>({});
  const [showReplyInput, setShowReplyInput] = useState<{[key: string]: boolean}>({});
  const [showAnswerInput, setShowAnswerInput] = useState<Record<string | number, boolean>>({});;

  /* ------------------------------------------------------------------ */
  /* 🖥️  الواجهة                                                        */
  /* ------------------------------------------------------------------ */
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto px-4">
        {/* ---------- العنوان ---------- */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            {t.discussion} ({questions.length})
          </h2>
        </header>

        {/* ---------- نموذج السؤال الجديد ---------- */}
        <form onSubmit={handleAskQuestion} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <label htmlFor="new-question" className="sr-only">
              {t.askPlaceholder}
            </label>
            <textarea
              id="new-question"
              rows={6}
              className="w-full text-sm bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
              placeholder={t.askPlaceholder}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              disabled={loading || !user}
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-between mt-4">
            {!user && (
              <Link href={`/${locale}/login`} className="text-sm text-sky-600 hover:underline">
                {t.login}
              </Link>
            )}
            
            <button
              disabled={loading || !newQuestion.trim() || !user}
              type="submit"
              className="inline-flex items-center py-3 px-6 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
              style={{ minWidth: '140px' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
                </>
              ) : (
                t.postQuestion
              )}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
        </form>

        {/* ---------- قائمة الأسئلة ---------- */}
        {questions.length === 0 && <p className="text-center text-sm text-gray-500">{t.noQuestionsYet}</p>}

        {questions.map((q) => (
          <article key={q.id} className="p-6 mb-3 bg-gray-100 dark:bg-gray-900 rounded-lg border-t first:border-t-0">
            {/* رأس السؤال */}
            <footer className="flex items-center justify-between mb-2">
              {avatar(q.question.user)}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.askedOn} {formatDate(q.question.question_date, locale)}
              </span>
            </footer>

            <p className="text-base md:text-sm text-gray-700 dark:text-gray-300">{q.question.question}</p>

            {/* الإجابة إن وجدت */}
            {q.answer && q.answer.answer && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <footer className="flex items-center justify-between mb-1">
                  {avatar(knowledge.insighter, true)}
                  <span className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-900 dark:text-sky-400 rounded-full px-2 py-0.5">
                    {t.answeredOn} {formatDate(q.answer.answer_date || '', locale)}
                  </span>
                </footer>
                <p className="text-sm text-gray-700 dark:text-gray-300">{q.answer.answer}</p>
                
                {/* زر الرد على الإجابة */}
                {user && (
                  <div className="mt-2">
                    <button
                      type="button"
                      className="text-xs text-sky-600 hover:underline font-medium rounded-md px-2 py-1 border border-sky-200"
                      onClick={() => setShowReplyInput(prev => ({
                        ...prev,
                        [`answer_${q.id}`]: !prev[`answer_${q.id}`]
                      }))}
                    >
                      {t.reply}
                    </button>
                  </div>
                )}
                
                {/* حقل الرد على الإجابة */}
                {showReplyInput[`answer_${q.id}`] && user && (
                  <div className="mt-3 border border-gray-200 p-3 rounded-md bg-white">
                    <textarea
                      rows={3}
                      className="w-full text-xs p-2 border border-gray-200 dark:border-gray-700 rounded focus:ring-primary-600 focus:outline-none"
                      placeholder={t.replyPlaceholder}
                      value={replyText[`answer_reply_${q.id}`] || ''}
                      onChange={(e) => setReplyText((p) => ({ ...p, [`answer_reply_${q.id}`]: e.target.value }))}
                      disabled={loading}
                    />
                    <div className="flex justify-end gap-2 mt-1">
                      <button
                        type="button"
                        className="text-xs text-gray-500 hover:underline"
                        onClick={() => setShowReplyInput((p) => ({ ...p, [`answer_${q.id}`]: false }))}
                      >
                        {t.cancel}
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePostReply(q.id, replyText[`answer_reply_${q.id}`] || '')}
                        disabled={loading || !(replyText[`answer_reply_${q.id}`]?.trim())}
                        className={`text-xs px-3 py-1 rounded text-white ${
                          loading || !(replyText[`answer_reply_${q.id}`]?.trim())
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-primary-700 hover:bg-primary-800'
                        }`}
                      >
                        {loading ? t.posting : t.submit}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* حقل إجابة المالك */}
            {(!q.answer.answer) && isOwner && showAnswerInput[q.id] && (
              <div className="mt-4">
                <textarea
                  rows={3}
                  className="w-full text-xs p-2 border border-gray-200 dark:border-gray-700 rounded focus:ring-primary-600 focus:outline-none"
                  placeholder={t.replyPlaceholder}
                  value={replyText[`answer_${q.id}`] || ''}
                  onChange={(e) =>
                    setReplyText((p) => ({ ...p, [`answer_${q.id}`]: e.target.value }))
                  }
                  disabled={loading}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:underline"
                    onClick={() => setShowAnswerInput((p) => ({ ...p, [q.id]: false }))}
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAnswerQuestion(q.id, replyText[`answer_${q.id}`] || '')}
                    disabled={loading || !(replyText[`answer_${q.id}`]?.trim())}
                    className={`text-xs px-3 py-1 rounded text-white ${
                      loading || !(replyText[`answer_${q.id}`]?.trim())
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-primary-700 hover:bg-primary-800'
                    }`}
                  >
                    {loading ? t.posting : t.answer}
                  </button>
                </div>
              </div>
            )}

            {/* أزرار الإجراءات */}
            <div className="flex items-center mt-4 space-x-4">
              {user && (
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => setShowReplyInput((p) => ({ ...p, [q.id]: !p[q.id] }))}
                >
                  {t.reply}
                </button>
              )}

              {q.children && q.children.length > 0 && (
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => setShowReplies((p) => ({ ...p, [q.id]: !p[q.id] }))}
                >
                  {showReplies[q.id] ? t.hideReplies : t.seeReplies} ({q.children.length})
                </button>
              )}

              {(!q.answer.answer) && isOwner && !showAnswerInput[q.id] && (
                <button
                  type="button"
                  className="flex items-center text-sm text-sky-600 hover:underline font-medium"
                  onClick={() => setShowAnswerInput((p) => ({ ...p, [q.id]: true }))}
                >
                  {t.answer}
                </button>
              )}
            </div>

            {/* حقل الرد */}
            {showReplyInput[q.id] && user && (
              <div className="mt-4">
                <textarea
                  rows={3}
                  className="w-full text-xs p-2 border border-gray-200 dark:border-gray-700 rounded focus:ring-primary-600 focus:outline-none"
                  placeholder={t.replyPlaceholder}
                  value={replyText[q.id] || ''}
                  onChange={(e) => setReplyText((p) => ({ ...p, [q.id]: e.target.value }))}
                  disabled={loading}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:underline"
                    onClick={() => setShowReplyInput((p) => ({ ...p, [q.id]: false }))}
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePostReply(q.id)}
                    disabled={loading || !(replyText[q.id]?.trim())}
                    className={`text-xs px-3 py-1 rounded text-white ${
                      loading || !(replyText[q.id]?.trim())
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-sky-600 hover:bg-primary-800'
                    }`}
                  >
                    {loading ? t.posting : t.submit}
                  </button>
                </div>
              </div>
            )}

            {/* قائمة الردود */}
            {showReplies[q.id] && q.children &&
              q.children.map((r: Question) => (
                <article
                  key={r.id}
                  className="p-6 mt-3 ml-6 lg:ml-12 bg-white dark:bg-gray-900 rounded-lg border-l dark:border-gray-700"
                >
                  <footer className="flex items-center justify-between mb-2">
                    {avatar(r.question.user)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(r.question.question_date, locale)}
                    </span>
                  </footer>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{r.question.question}</p>

                  {/* إجابة الخبير على الرد */}
                  {r.answer && r.answer.answer && (
                    <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <footer className="flex items-center justify-between mb-1">
                        {avatar(knowledge.insighter, true)}
                        <span className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-900 dark:text-sky-400 rounded-full px-2 py-0.5">
                          {t.answeredOn} {formatDate(r.answer.answer_date || '', locale)}
                        </span>
                      </footer>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{r.answer.answer}</p>
                    </div>
                  )}

                  {/* حقل إجابة الخبير على الرد */}
                  {(!r.answer.answer) && isOwner && showAnswerInput[r.id] && (
                    <div className="mt-3">
                      <textarea
                        rows={3}
                        className="w-full text-xs p-2 border border-gray-200 dark:border-gray-700 rounded focus:ring-primary-600 focus:outline-none"
                        placeholder={t.replyPlaceholder}
                        value={replyText[`answer_${r.id}`] || ''}
                        onChange={(e) =>
                          setReplyText((p) => ({ ...p, [`answer_${r.id}`]: e.target.value }))
                        }
                        disabled={loading}
                      />
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          type="button"
                          className="text-xs text-gray-500 hover:underline"
                          onClick={() => setShowAnswerInput((p) => ({ ...p, [r.id]: false }))}
                        >
                          {t.cancel}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleAnswerQuestion(r.id, replyText[`answer_${r.id}`] || '')
                          }
                          disabled={loading || !(replyText[`answer_${r.id}`]?.trim())}
                          className={`text-xs px-3 py-1 rounded text-white ${
                            loading || !(replyText[`answer_${r.id}`]?.trim())
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-primary-700 hover:bg-primary-800'
                          }`}
                        >
                          {loading ? t.posting : t.answer}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* أزرار الرد والجواب */}
                  <div className="flex items-center mt-4 space-x-4">
                    {user && (
                      <button
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        onClick={() => setShowReplyInput((p) => ({ ...p, [r.id]: !p[r.id] }))}
                      >
                        {t.reply}
                      </button>
                    )}

                    {(!r.answer.answer) && isOwner && !showAnswerInput[r.id] && (
                      <button
                        type="button"
                        className="flex items-center text-sm text-sky-600 hover:underline font-medium"
                        onClick={() => setShowAnswerInput((p) => ({ ...p, [r.id]: true }))}
                      >
                        {t.answer}
                      </button>
                    )}
                  </div>
                </article>
              ))}
          </article>
        ))}
      </div>
    </section>
  );
}
