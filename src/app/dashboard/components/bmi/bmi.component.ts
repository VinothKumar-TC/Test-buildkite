import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.scss'
})
export class BmiComponent implements OnInit{

  weight: number | null = null;
  height: number | null = null;
  targetBMI: number | null = null;
  weightUnit: string = 'kg';
  heightUnit: string = 'cm';
  result: { bmi: number; bsa: number; targetWeightKg?: number; } | null = null;


  constructor() {}

  ngOnInit(): void {
    
  }

    // Converts inches to cm
  toCm(height: number, unit: string): number {
    return unit === 'in' ? height * 2.54 : height;
  }

  // Converts lbs to kg
  toKg(weight: number, unit: string): number {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  }

    toggleHeightUnit() {
  this.heightUnit = this.heightUnit === 'cm' ? 'in' : 'cm';
}

toggleWeightUnit() {
  this.weightUnit = this.weightUnit === 'kg' ? 'lbs' : 'kg';
}

calculate(): void {
  if (this.weight == null || this.height == null) {
    this.result = null;
    return;
  }

  const heightCm = this.toCm(this.height, this.heightUnit);
  const weightKg = this.toKg(this.weight, this.weightUnit);
  const heightM = heightCm / 100;

  const bmi = weightKg / (heightM * heightM);
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);

   let targetWeightKg: number | undefined = undefined;
    if (this.targetBMI != null && this.targetBMI > 0) {
      targetWeightKg = this.targetBMI * heightM * heightM;
    }
  this.result = { bmi, bsa, targetWeightKg  };
}


}
