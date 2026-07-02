import InsighterDashboardShell from '@/components/insighter-dashboard/InsighterDashboardShell';
import FooterLight from '@/components/ui/footer-light';

export default function InsighterDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InsighterDashboardShell>{children}</InsighterDashboardShell>
      <FooterLight />
    </>
  );
}
