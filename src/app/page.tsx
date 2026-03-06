
import Header from '@/components/header';
import DashboardOverview from '@/components/dashboard-overview';
import AssetList from '@/components/asset-list';
import AddAssetForm from '@/components/add-asset-form';
import IssueReporting from '@/components/issue-reporting';
import ReportedIssues from '@/components/reported-issues';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Database, 
  PlusSquare, 
  AlertCircle, 
  ListOrdered 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
          <p className="text-muted-foreground">Centralized city infrastructure monitoring and management.</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-3">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-3">
              <Database className="mr-2 h-4 w-4" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-3">
              <PlusSquare className="mr-2 h-4 w-4" />
              Add Asset
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-3">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="issues" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-3">
              <ListOrdered className="mr-2 h-4 w-4" />
              Issue Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview />
            <div className="grid gap-6 md:grid-cols-2">
               <AssetList />
               <ReportedIssues />
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <AssetList />
          </TabsContent>

          <TabsContent value="add" className="max-w-2xl mx-auto">
            <AddAssetForm />
          </TabsContent>

          <TabsContent value="report" className="max-w-2xl mx-auto">
            <IssueReporting />
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <ReportedIssues />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
