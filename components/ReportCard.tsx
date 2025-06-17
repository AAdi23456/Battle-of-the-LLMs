'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ReportData } from '@/types';
import { TrendingUp, Award, BarChart3 } from 'lucide-react';

interface ReportCardProps {
  data: ReportData;
}

const COLORS = {
  closed: '#3B82F6',
  open: '#10B981',
};

export default function ReportCard({ data }: ReportCardProps) {
  const chartData = [
    {
      category: 'Clarity',
      Closed: data.averageRatings.closed.clarity,
      Open: data.averageRatings.open.clarity,
    },
    {
      category: 'Accuracy',
      Closed: data.averageRatings.closed.accuracy,
      Open: data.averageRatings.open.accuracy,
    },
    {
      category: 'Conciseness',
      Closed: data.averageRatings.closed.conciseness,
      Open: data.averageRatings.open.conciseness,
    },
  ];

  const pieData = [
    {
      name: 'Closed-Source',
      value: data.preferenceCount.closed,
      color: COLORS.closed,
    },
    {
      name: 'Open-Source',
      value: data.preferenceCount.open,
      color: COLORS.open,
    },
  ];

  const winnerType = data.preferenceCount.closed > data.preferenceCount.open ? 'closed' : 'open';
  const winnerCount = Math.max(data.preferenceCount.closed, data.preferenceCount.open);
  const winnerPercentage = ((winnerCount / data.totalComparisons) * 100).toFixed(1);

  const averageScore = (rating: { clarity: number; accuracy: number; conciseness: number }) => {
    return ((rating.clarity + rating.accuracy + rating.conciseness) / 3).toFixed(1);
  };

  if (data.totalComparisons === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Report
          </CardTitle>
          <CardDescription>
            Submit ratings to see the comparison report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Summary
          </CardTitle>
          <CardDescription>
            Based on {data.totalComparisons} comparison{data.totalComparisons !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Winner */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full ${winnerType === 'closed' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                <h3 className="font-semibold">
                  {winnerType === 'closed' ? '🔒 Closed-Source' : '🌐 Open-Source'} Winner
                </h3>
              </div>
              <div className="text-2xl font-bold">{winnerPercentage}%</div>
              <p className="text-sm text-muted-foreground">preference rate</p>
            </div>

            {/* Closed-Source Stats */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold">Closed-Source</h3>
              </div>
              <div className="text-2xl font-bold">{averageScore(data.averageRatings.closed)}</div>
              <p className="text-sm text-muted-foreground">avg rating</p>
            </div>

            {/* Open-Source Stats */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold">Open-Source</h3>
              </div>
              <div className="text-2xl font-bold">{averageScore(data.averageRatings.open)}</div>
              <p className="text-sm text-muted-foreground">avg rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Breakdown</CardTitle>
            <CardDescription>Average scores across all criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="Closed" fill={COLORS.closed} name="Closed-Source" />
                <Bar dataKey="Open" fill={COLORS.open} name="Open-Source" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
            <CardDescription>Which summaries users preferred overall</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Closed-Source Performance
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Clarity:</span>
                  <Badge variant="secondary">{data.averageRatings.closed.clarity.toFixed(1)}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accuracy:</span>
                  <Badge variant="secondary">{data.averageRatings.closed.accuracy.toFixed(1)}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conciseness:</span>
                  <Badge variant="secondary">{data.averageRatings.closed.conciseness.toFixed(1)}/5</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Open-Source Performance
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Clarity:</span>
                  <Badge variant="secondary">{data.averageRatings.open.clarity.toFixed(1)}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accuracy:</span>
                  <Badge variant="secondary">{data.averageRatings.open.accuracy.toFixed(1)}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conciseness:</span>
                  <Badge variant="secondary">{data.averageRatings.open.conciseness.toFixed(1)}/5</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 