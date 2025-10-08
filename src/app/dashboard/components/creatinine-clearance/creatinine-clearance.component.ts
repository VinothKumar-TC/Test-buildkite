import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creatinine-clearance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creatinine-clearance.component.html',
  styleUrl: './creatinine-clearance.component.scss'
})
export class CreatinineClearanceComponent implements AfterViewInit {
age: number | null = null;
  weight: number | null = null;
  height: number | null = null;
  creatinine: number | null = null;

  gender: string = 'male';
  weightUnit: string = 'kg';
  heightUnit: string = 'cm';
  creatinineUnit: string = 'mg/dL';
  weightType: string = 'actual';

  result: number | null = null;
bootstrap: any;
  // Converts inches to cm
  toCm(height: number, unit: string): number {
    return unit === 'in' ? height * 2.54 : height;
  }

  // Converts lbs to kg
  toKg(weight: number, unit: string): number {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  }

  // Converts µmol/L to mg/dL
  toMgPerDl(creatinine: number, unit: string): number {
    return unit === 'µmol/L' ? creatinine / 88.4 : creatinine;
  }

  getIBW(heightCm: number): number {
    const heightIn = heightCm / 2.54;
    if (this.gender === 'male') {
      return 50 + 2.3 * (heightIn - 60);
    } else {
      return 45.5 + 2.3 * (heightIn - 60);
    }
  }

  getAdjustedWeight(actual: number, ibw: number): number {
    return ibw + 0.4 * (actual - ibw);
  }

  calculate(): void {
    if (
      this.age == null ||
      this.weight == null ||
      this.height == null ||
      this.creatinine == null
    ) {
      this.result = null;
      return;
    }

    const heightCm = this.toCm(this.height, this.heightUnit);
    const weightKg = this.toKg(this.weight, this.weightUnit);
    const serumCreatinineMgDl = this.toMgPerDl(this.creatinine, this.creatinineUnit);
    const ibw = this.getIBW(heightCm);

    // let usedWeight = weightKg;
    // if (this.weightType === 'ideal') {
    //   usedWeight = ibw;
    // } else if (this.weightType === 'adjusted') {
    //   usedWeight = this.getAdjustedWeight(weightKg, ibw);
    // }

    let crCl = ((140 - this.age) * weightKg) / (72 * serumCreatinineMgDl);
    if (this.gender === 'female') {
      crCl *= 0.85;
    }

    this.result = crCl;
  }

  toggleHeightUnit() {
  this.heightUnit = this.heightUnit === 'cm' ? 'in' : 'cm';
}

toggleWeightUnit() {
  this.weightUnit = this.weightUnit === 'kg' ? 'lbs' : 'kg';
}

toggleCreatinineUnit() {
  this.creatinineUnit = this.creatinineUnit === 'mg/dL' ? 'µmol/L' : 'mg/dL';
}

  ngAfterViewInit() {
    // const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  }

}
