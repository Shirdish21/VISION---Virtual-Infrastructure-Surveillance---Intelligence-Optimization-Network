"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import DashboardOverview from "@/components/dashboard-overview";
import AssetList from "@/components/asset-list";
import AddAssetForm from "@/components/add-asset-form";
import IssueReporting from "@/components/issue-reporting";
import ReportedIssues from "@/components/reported-issues";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  return (
    <SidebarProvider>
      <AppSidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight capitalize">
              {currentTab === 'dashboard' ? 'System Overview' : currentTab.replace('-', ' ')}
            </h2>
            <p className="text-muted-foreground">
              {currentTab === 'dashboard' && 'Centralized city infrastructure monitoring and management.'}
              {currentTab === 'assets' && 'Real-time inventory of all registered city infrastructure.'}
              {currentTab === 'add' && 'Register new assets into the smart intelligence network.'}
              {currentTab === 'report' && 'Submit citizen alerts for infrastructure damage or maintenance.'}
              {currentTab === 'issues' && 'Chronological log of all citizen reported infrastructure issues.'}
            </p>
          </div>

          <Tabs value={currentTab} className="space-y-6">
            <TabsContent value="dashboard" className="space-y-8 focus-visible:outline-none outline-none">
              <DashboardOverview />
              <div className="grid gap-8 lg:grid-cols-2">
                 <AssetList limit={5} />
                 <ReportedIssues limit={5} />
              </div>
            </TabsContent>

            <TabsContent value="assets" className="focus-visible:outline-none outline-none">
              <AssetList />
            </TabsContent>

            <TabsContent value="add" className="max-w-2xl mx-auto focus-visible:outline-none outline-none">
              <AddAssetForm />
            </TabsContent>

            <TabsContent value="report" className="max-w-2xl mx-auto focus-visible:outline-none outline-none">
              <IssueReporting />
            </TabsContent>

            <TabsContent value="issues" className="focus-visible:outline-none outline-none">
              <ReportedIssues />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}