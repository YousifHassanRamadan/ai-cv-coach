export interface ChartDataPoint {
  date: string;
  score: number;
}

export interface ScoreTrendChartProps {
  data: ChartDataPoint[];
  trendLabel?: string;
}
