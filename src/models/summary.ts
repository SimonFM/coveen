export class Summary {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;

  constructor() {
    this.NewConfirmed = -1;
    this.TotalConfirmed = -1;
    this.NewDeaths = -1;
    this.TotalDeaths = -1;
    this.NewRecovered = -1;
    this.TotalRecovered = -1;
  }
}
