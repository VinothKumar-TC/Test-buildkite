import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cha2ds2-vasc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cha2ds2-vasc.component.html',
  styleUrl: './cha2ds2-vasc.component.scss'
})
export class Cha2ds2VascComponent {

  ageGroup: number = 0;
  sex: 'male' | 'female' = 'male';
  chf: boolean = false;
  hypertension: boolean = false;
  strokeHistory: boolean = false;
  vascularDisease: boolean = false;
  diabetes: boolean = false;

  score: number | null = null;
  riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
  riskPercent: string = '0%';

  breakdown: { label: string; value: string; points: number }[] = [];
  totalScore = 0;

  calculate(): void {
    this.breakdown = [];
    let total = 0;

    // Age
    const agePoints = this.ageGroup === 1 ? 1 : this.ageGroup === 2 ? 2 : 0;
    total += agePoints;
    this.breakdown.push({ label: 'Age', value: this.ageGroup === 0 ? '<65' : this.ageGroup === 1 ? '65-74' : '75+', points: agePoints });

    // Sex
    const sexPoints = this.sex === 'female' ? 1 : 0;
    total += sexPoints;
    this.breakdown.push({ label: 'Sex', value: this.sex, points: sexPoints });

    // CHF
    const chfPoints = this.chf ? 1 : 0;
    total += chfPoints;
    this.breakdown.push({ label: 'Congestive Heart Failure', value: this.chf ? 'Yes' : 'No', points: chfPoints });

    // Hypertension
    const htnPoints = this.hypertension ? 1 : 0;
    total += htnPoints;
    this.breakdown.push({ label: 'Hypertension', value: this.hypertension ? 'Yes' : 'No', points: htnPoints });

    // Stroke
    const strokePoints = this.strokeHistory ? 2 : 0;
    total += strokePoints;
    this.breakdown.push({ label: 'Stroke/TIA/Thromboembolism', value: this.strokeHistory ? 'Yes' : 'No', points: strokePoints });

    // Vascular Disease
    const vascularPoints = this.vascularDisease ? 1 : 0;
    total += vascularPoints;
    this.breakdown.push({ label: 'Vascular Disease', value: this.vascularDisease ? 'Yes' : 'No', points: vascularPoints });

    // Diabetes
    const diabetesPoints = this.diabetes ? 1 : 0;
    total += diabetesPoints;
    this.breakdown.push({ label: 'Diabetes Mellitus', value: this.diabetes ? 'Yes' : 'No', points: diabetesPoints });

    this.score = total;

    const riskTable: { [key: number]: string } = {
      0: '0%',
      1: '1.3%',
      2: '2.2%',
      3: '3.2%',
      4: '4.8%',
      5: '7.2%',
      6: '9.7%',
      7: '11.2%',
      8: '10.8%',
      9: '12.2%',
    };

    this.riskPercent = riskTable[total] || '>12.2%';
    this.riskLevel = total <= 1 ? 'Low' : total <= 3 ? 'Moderate' : 'High';
  }

  getRiskInterpretation(): string | null {
  const riskData = STROKE_RISK_TABLE.find(item => item.score === this.score);
  if (riskData) {
    return `${this.score} point(s): Stroke risk was ${riskData.ischemicStrokeRisk} per year in >90,000 patients (the Swedish Atrial Fibrillation Cohort Study) and ${riskData.strokeTiaRisk} risk of stroke/TIA/systemic embolism.`;
  }
  return null;
}
}

export interface StrokeRisk {
  score: number;
  ischemicStrokeRisk: string;
  strokeTiaRisk: string;
}

export const STROKE_RISK_TABLE: StrokeRisk[] = [
  { score: 0, ischemicStrokeRisk: '0.2%', strokeTiaRisk: '0.3%' },
  { score: 1, ischemicStrokeRisk: '0.6%', strokeTiaRisk: '0.9%' },
  { score: 2, ischemicStrokeRisk: '2.2%', strokeTiaRisk: '2.9%' },
  { score: 3, ischemicStrokeRisk: '3.2%', strokeTiaRisk: '4.6%' },
  { score: 4, ischemicStrokeRisk: '4.8%', strokeTiaRisk: '6.7%' },
  { score: 5, ischemicStrokeRisk: '7.2%', strokeTiaRisk: '10.0%' },
  { score: 6, ischemicStrokeRisk: '9.7%', strokeTiaRisk: '13.6%' },
  { score: 7, ischemicStrokeRisk: '11.2%', strokeTiaRisk: '15.7%' },
  { score: 8, ischemicStrokeRisk: '10.8%', strokeTiaRisk: '15.2%' },
  { score: 9, ischemicStrokeRisk: '12.2%', strokeTiaRisk: '17.4%' }
];
