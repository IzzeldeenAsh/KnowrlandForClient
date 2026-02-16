import TransferFormTab from './components/TransferFormTab';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InsighterTransferFormPage({ params }: Props) {
  const { id } = await params;
  return <TransferFormTab insighterId={id} />;
}

