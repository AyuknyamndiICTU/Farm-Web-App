import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50 min-h-[calc(100vh-64px)]">
      <DashboardSidebar />
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
