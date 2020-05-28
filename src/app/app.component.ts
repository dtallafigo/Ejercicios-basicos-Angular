import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSourceURL = '../assets/datasource.json';
  infoURL = '../assets/info-population.json';
  res = new Map<string , []>();
  public readonly COUNTRY_ID = 'COUNTRY';
  public readonly SEX_ID = 'SEX';
  public readonly PERSON_ID = 'PERSON';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log(this.res);
  }

  ngAfterViewInit(): void {
    this.http.get(this.dataSourceURL).subscribe(resp => {
      this.res.set(this.COUNTRY_ID, resp['data']['country']);
      this.res.set(this.SEX_ID , resp.data.sex);
      console.log(this.res.get(this.COUNTRY_ID));
    });
    this.http.get(this.infoURL).subscribe(resp => {
      this.res.set(this.PERSON_ID, resp.population.person);
      console.log(this.res.get(this.PERSON_ID));
    });
  }

  public getCountries(): any{
    return this.res.has(this.COUNTRY_ID) ? this.res.get(this.COUNTRY_ID) : [];
  }
}
