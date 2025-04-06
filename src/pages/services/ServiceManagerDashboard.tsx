
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon } from '@/components/ui/line-chart-icon';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceManagerDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.serviceManager.title')}</h1>
        <p className="text-muted-foreground">{t('admin.serviceManager.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.serviceManager.stats.activeServices')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.serviceManager.stats.premiumServices', { count: 8 })}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.serviceManager.stats.serviceRequests')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.serviceManager.stats.pendingApproval', { count: 4 })}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.serviceManager.stats.revenueToday')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3,200</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.serviceManager.stats.revenueChange', { percent: '8%' })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('admin.serviceManager.charts.usageTrend')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">{t('admin.serviceManager.charts.comingSoon')}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('admin.serviceManager.charts.customerFeedback')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">{t('admin.serviceManager.charts.comingSoon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceManagerDashboard;
