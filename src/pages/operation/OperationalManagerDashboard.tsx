
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon } from '@/components/ui/line-chart-icon';
import { useLanguage } from '@/contexts/LanguageContext';

const OperationalManagerDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.operations.title')}</h1>
        <p className="text-muted-foreground">{t('admin.operations.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.operations.stats.totalRooms')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.operations.stats.roomBreakdown')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.operations.stats.currentOccupancy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.operations.stats.occupancyRate', { rate: '71%' })}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.operations.stats.revenueToday')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$14,500</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.operations.stats.revenueChange', { percent: '12%' })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('admin.operations.charts.occupancyTrend')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">{t('admin.operations.charts.comingSoon')}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('admin.operations.charts.guestSatisfaction')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">{t('admin.operations.charts.comingSoon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperationalManagerDashboard;
