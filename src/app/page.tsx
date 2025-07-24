import Header from '@/components/header';
import WebcamFeed from '@/components/webcam-feed';
import SettingsPanel from '@/components/settings-panel';
import ActionsPanel from '@/components/actions-panel';
import AssistantPanel from '@/components/assistant-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, ListTodo, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WebcamFeed />
          </div>
          <div className="lg:col-span-1">
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="settings">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="actions">
                  <ListTodo className="mr-2 h-4 w-4" />
                  Actions
                </TabsTrigger>
                <TabsTrigger value="assistant">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Assistant
                </TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <SettingsPanel />
              </TabsContent>
              <TabsContent value="actions">
                <ActionsPanel />
              </TabsContent>
              <TabsContent value="assistant">
                <AssistantPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
