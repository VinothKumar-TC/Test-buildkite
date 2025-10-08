import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  labels?: string[];
  responsive?: ApexResponsive[];
  colors?: string[];
  yaxis?: ApexYAxis;
  legend?: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
})
export class DashboardComponent implements OnInit {
  public campaignChart!: Partial<ChartOptions>;
  public campaignRange: 'weekly' | 'monthly' | 'yearly' = 'weekly';
  public countryChart!: Partial<ChartOptions>;
  public complexityChart!: Partial<ChartOptions>;
  public roiChart!: Partial<ChartOptions>;
  public roiRange: 'weekly' | 'monthly' | 'yearly' = 'weekly';
  ngOnInit(): void {
    this.updateCampaignChart();
    this.initCountryChart();
    this.initComplexityChart();
    this.updateROIChart();
  }

  /** 1️⃣ Campaigns Running */
  private initCampaignChart(seriesData: number[], categories: string[]) {
    this.campaignChart = {
      series: [{ name: 'Campaigns', data: seriesData }],
      chart: { type: 'bar', height: 320, toolbar: { show: false } },
      colors: ['#6C63FF'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 6,
        },
      },
      dataLabels: { enabled: false },
      xaxis: { categories },
      tooltip: { theme: 'dark' },
    };
  }

  public updateCampaignChart() {
    if (this.campaignRange === 'weekly') {
      this.initCampaignChart(
        [5, 8, 12, 9, 14, 16, 13],
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      );
    } else if (this.campaignRange === 'monthly') {
      this.initCampaignChart(
        [50, 60, 72, 65, 80, 95, 88, 77, 90, 100, 110, 105],
        [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
      );
    } else if (this.campaignRange === 'yearly') {
      this.initCampaignChart(
        [500, 620, 720, 650, 800],
        ['2019', '2020', '2021', '2022', '2023']
      );
    }
  }

  /** 2️⃣ Country Wise Distribution */
private initCountryChart() {
  this.countryChart = {
    series: [35, 25, 20, 12, 8],
    chart: {
      type: 'polarArea',
      height: 280,
      toolbar: { show: false }
    },
    labels: ['USA', 'India', 'UK', 'Germany', 'Others'],
    colors: [
      'rgba(0, 227, 150, 0.85)',
      'rgba(254, 176, 25, 0.85)',
      'rgba(255, 69, 96, 0.85)',
      'rgba(119, 93, 208, 0.85)',
      'rgba(30, 144, 255, 0.85)'
    ],
    stroke: { colors: ['#fff'], width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.4,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100]
      }
    },
    yaxis: { show: false },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontWeight: 600,
      labels: { colors: '#555' },
      markers: { radius: 12 }
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '13px' },
      y: { formatter: (val: number) => `${val}%` }
    },
    plotOptions: {
      polarArea: {
        // startAngle: 15,
        rings: { strokeWidth: 1, strokeColor: '#e0e0e0' },
        spokes: { strokeWidth: 1, connectorColors: '#e0e0e0' }
      }
    }
  };
}



  /** 3️⃣ Campaign Complexity */
  private initComplexityChart() {
    this.complexityChart = {
      series: [
        { name: 'Complex', data: [10, 15, 8, 12, 20, 14, 18] },
        { name: 'Moderate', data: [20, 18, 25, 22, 19, 21, 23] },
        { name: 'Simple', data: [15, 12, 14, 10, 13, 15, 12] },
      ],
      chart: { type: 'radar', height: 320 },
      colors: ['#FF6347', '#1E90FF', '#32CD32'],
      stroke: { width: 2 },
      fill: { opacity: 0.3 },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      tooltip: { theme: 'dark' },
    };
  }

  /** 4️⃣ ROI of Campaigns */
private initROIChart(seriesData: { invested: number[]; profit: number[] }, categories: string[], format: 'hundreds' | 'normal' | 'thousands') {
  this.roiChart = {
    series: [
      { name: 'Invested', data: seriesData.invested },
      { name: 'Profit', data: seriesData.profit }
    ],
    chart: { type: 'area', height: 320, toolbar: { show: false } },
    colors: ['#FF9F43', '#28C76F'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.9 }
    },
    xaxis: { categories },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          if (format === 'hundreds') {
            return `$${value}h`; // Example: $120h
          } else if (format === 'thousands') {
            return `$${value / 1000}k`; // Example: $6k
          }
          return `$${value}`; // Normal mode
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `$${val}` // Tooltip always in $ format
      }
    }
  };
}

public updateROIChart() {
  if (this.roiRange === 'weekly') {
    this.initROIChart(
      { invested: [120, 150, 180, 200, 170, 210, 190], profit: [80, 110, 440, 160, 130, 170, 350] },
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      'hundreds'
    );
  } else if (this.roiRange === 'monthly') {
    this.initROIChart(
      { invested: [500, 600, 650, 700, 750, 800, 820, 780, 760, 800, 850, 900],
        profit: [300, 850, 400, 420, 450, 480, 500, 470, 660, 480, 500, 720] },
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      'normal'
    );
  } else if (this.roiRange === 'yearly') {
    this.initROIChart(
      { invested: [6000, 7200, 7500, 8000, 8500], profit: [4000, 8800, 5000, 5500, 7000] },
      ['2019', '2020', '2021', '2022', '2023'],
      'thousands'
    );
  }
}

}
