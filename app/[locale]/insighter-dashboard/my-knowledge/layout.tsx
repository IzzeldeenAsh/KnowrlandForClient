import MyKnowledgeTabs from '@/components/insighter-dashboard/my-knowledge/MyKnowledgeTabs';

export default function MyKnowledgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MyKnowledgeTabs />
      {children}
    </div>
  );
}
