'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  IconWallet,
  IconArrowDownLeft,
  IconArrowUpRight,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import PageHeader from '@/components/insighter-dashboard/PageHeader';
import TransactionDetailsModal from '@/components/ui/TransactionDetailsModal';
import { useToast } from '@/components/toast/ToastContext';
import {
  getWalletBalance,
  getWalletTransactions,
  getWalletStatistics,
  type WalletTransaction,
  type WalletPeriod,
  type WalletStatisticsBucket,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

const PERIODS: WalletPeriod[] = ['weekly', 'monthly', 'yearly'];

/** /insighter-dashboard/wallet — balance, statistics, transactions. */
export default function WalletClient() {
  const t = useTranslations('InsighterDashboard.wallet');
  const locale = useLocale();
  const toast = useToast();

  const [balance, setBalance] = useState(0);
  const [period, setPeriod] = useState<WalletPeriod>('monthly');
  const [stats, setStats] = useState<Record<string, WalletStatisticsBucket>>({});
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<WalletTransaction | null>(null);

  useEffect(() => {
    getWalletBalance(locale).then(setBalance).catch(() => setBalance(0));
  }, [locale]);

  const loadTransactions = useCallback(
    (page: number, p: WalletPeriod) => {
      setLoading(true);
      Promise.all([
        getWalletTransactions(locale, page, 10, p),
        getWalletStatistics(locale, p).catch(() => ({})),
      ])
        .then(([txRes, statsRes]) => {
          setTransactions(txRes.data ?? []);
          setMeta(txRes.meta ?? null);
          setStats(statsRes);
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    loadTransactions(1, period);
  }, [period, loadTransactions]);

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formatDate = (value: string) => {
    const parsed = Date.parse(value?.replace(' ', 'T'));
    return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
  };

  const totals = Object.values(stats).reduce(
    (acc, bucket) => ({
      deposit: acc.deposit + (bucket?.deposit ?? 0),
      withdraw: acc.withdraw + (bucket?.withdraw ?? 0),
    }),
    { deposit: 0, withdraw: 0 }
  );

  const chartEntries = Object.entries(stats);
  const chartMax = Math.max(1, ...chartEntries.flatMap(([, b]) => [b?.deposit ?? 0, b?.withdraw ?? 0]));

  return (
    <div>
      <PageHeader icon={<IconWallet size={22} />} title={t('title')} />

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Balance */}
        <div
          className="flex min-h-[170px] flex-col justify-between rounded-xl border border-gray-100 p-6"
          style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e8f9f1 100%)' }}
        >
          <IconCurrencyDollar size={36} stroke={1.5} className="text-gray-700" />
          <div>
            <div className="text-4xl font-semibold tracking-tight text-gray-900">
              {currency.format(balance)}
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-500">{t('inWallet')}</div>
          </div>
        </div>

        {/* Totals */}
        <div className="flex min-h-[170px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500">
            <IconArrowDownLeft size={18} className="text-green-500" />
            {t('deposits')}
          </span>
          <div className="text-3xl font-semibold text-green-600">{currency.format(totals.deposit)}</div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500">
            <IconArrowUpRight size={18} className="text-red-500" />
            {t('withdrawals')}
          </span>
          <div className="text-3xl font-semibold text-red-500">{currency.format(totals.withdraw)}</div>
        </div>

        {/* Mini bar chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    period === p ? 'bg-sky-500 text-white' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t(`periods.${p}`)}
                </button>
              ))}
            </div>
          </div>
          {chartEntries.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">—</p>
          ) : (
            <div className="flex h-28 items-end gap-2" dir="ltr">
              {chartEntries.map(([label, bucket]) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 88 }}>
                    <div
                      className="w-2.5 rounded-t bg-green-400"
                      title={`${t('deposits')}: ${bucket?.deposit ?? 0}`}
                      style={{ height: `${((bucket?.deposit ?? 0) / chartMax) * 100}%` }}
                    />
                    <div
                      className="w-2.5 rounded-t bg-red-300"
                      title={`${t('withdrawals')}: ${bucket?.withdraw ?? 0}`}
                      style={{ height: `${((bucket?.withdraw ?? 0) / chartMax) * 100}%` }}
                    />
                  </div>
                  <span className="max-w-full truncate text-[10px] text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <h3 className="border-b border-gray-100 px-5 py-4 text-base font-bold text-gray-900">
          {t('transactions')}
        </h3>
        <div className="p-4">
          {loading ? (
            <div className="flex min-h-[160px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
            </div>
          ) : transactions.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">{t('noTransactions')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {transactions.map((tx, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDetail(tx)}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-100 p-3 text-start hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        tx.transaction === 'deposit'
                          ? 'bg-green-50 text-green-500'
                          : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {tx.transaction === 'deposit' ? (
                        <IconArrowDownLeft size={18} />
                      ) : (
                        <IconArrowUpRight size={18} />
                      )}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{tx.type}</div>
                      <div className="text-xs text-gray-400">{formatDate(tx.date)}</div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      tx.transaction === 'deposit' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {tx.transaction === 'deposit' ? '+' : '-'}
                    {currency.format(Math.abs(tx.amount))}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!loading && meta && meta.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {t('page')} {meta.current_page} {t('of')} {meta.last_page}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => loadTransactions(p, period)}
                    className={`min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ${
                      p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <TransactionDetailsModal
        opened={!!detail}
        onClose={() => setDetail(null)}
        transaction={detail as never}
        locale={locale}
      />
    </div>
  );
}
