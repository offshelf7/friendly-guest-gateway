
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileText,
  BarChart
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('admin.finance.title')}</h1>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">{t('admin.finance.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="budgets">{t('admin.finance.tabs.budgets')}</TabsTrigger>
          <TabsTrigger value="financial-reports">{t('admin.finance.tabs.reports')}</TabsTrigger>
          <TabsTrigger value="billing">{t('admin.finance.tabs.billing')}</TabsTrigger>
          <TabsTrigger value="revenue">{t('admin.finance.tabs.revenue')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.finance.stats.dailyRevenue.title')}
                </CardTitle>
                <CardDescription>
                  {t('admin.finance.stats.dailyRevenue.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">$12,450</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.finance.stats.monthlyGrowth.title')}
                </CardTitle>
                <CardDescription>
                  {t('admin.finance.stats.monthlyGrowth.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-2xl font-bold">8.2%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.finance.stats.pendingPayments.title')}
                </CardTitle>
                <CardDescription>
                  {t('admin.finance.stats.pendingPayments.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">14</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.finance.stats.invoicesGenerated.title')}
                </CardTitle>
                <CardDescription>
                  {t('admin.finance.stats.invoicesGenerated.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">22</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.finance.overview.title')}</CardTitle>
                <CardDescription>
                  {t('admin.finance.overview.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">
                    {t('admin.finance.overview.chartPlaceholder')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="budgets">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.finance.budgets.title')}</CardTitle>
              <CardDescription>
                {t('admin.finance.budgets.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  {t('admin.finance.budgets.interfacePlaceholder')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial-reports">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.finance.reports.title')}</CardTitle>
              <CardDescription>
                {t('admin.finance.reports.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  {t('admin.finance.reports.toolsPlaceholder')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.finance.billing.title')}</CardTitle>
              <CardDescription>
                {t('admin.finance.billing.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  {t('admin.finance.billing.interfacePlaceholder')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.finance.revenue.title')}</CardTitle>
              <CardDescription>
                {t('admin.finance.revenue.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  {t('admin.finance.revenue.dashboardPlaceholder')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;
