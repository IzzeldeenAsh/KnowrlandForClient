import InsighterTransactionsTab from './components/InsighterTransactionsTab';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InsighterWalletTransactionsPage({ params }: Props) {
  const { id } = await params;
  return <InsighterTransactionsTab insighterId={id} />;
}

