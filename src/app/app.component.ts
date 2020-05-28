import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PersonView} from './entities/PersonView.entities';
import {columnToDisplay, columnTitle} from './entities/tableProperties.entities';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSourceURL = '../assets/datasource.json';
  infoURL = '../assets/info-population.json';
  res = new Map<string, []>();
  columnsToDisplay = columnToDisplay;
  columnsTitle = columnTitle;
  persons: any = [];
  dataSource: any;
  public readonly COUNTRY_ID = 'COUNTRY';
  public readonly SEX_ID = 'SEX';
  public readonly PERSON_ID = 'PERSON';

  constructor(private http: HttpClient) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.http.get(this.dataSourceURL).subscribe(resp => {
      this.res.set(this.COUNTRY_ID, resp.data.country);
      this.res.set(this.SEX_ID, resp['data']['sex']);
    });
    this.http.get(this.infoURL).subscribe(resp => {
      this.res.set(this.PERSON_ID, resp.population.person);
    });
  }

  public getCountries(): any {
    return this.res.has(this.COUNTRY_ID) ? this.res.get(this.COUNTRY_ID) : [];
  }

  public getSexs(): any {
    return this.res.has(this.SEX_ID) ? this.res.get(this.SEX_ID) : [];
  }

  public getPopulation(): any {
    return this.res.has(this.PERSON_ID) ? this.res.get(this.PERSON_ID) : [];
  }

  public getPersonsView(): any {
    if (this.getCountries() && this.getPopulation()) {
      this.persons = [];
      const population = this.getPopulation();
      population.forEach(element => {
        const personAux = new PersonView();
        personAux.name = `${element.surname}  ${element.surname2} ,  ${element.name}`;
        personAux.countryId = this.getCountries()[element['country-id'] - 1]['description'];
        personAux.datebirthday = element.datebirthday;
        personAux.setSex(element.sex, this.getSexs());
        personAux.id = element.id;
        personAux.setPhone(element.phone, this.getCountries(), element['country-id']);
        personAux.lastModification = element.lastModification;
        this.persons.push(personAux);
      });
      this.dataSource = new MatTableDataSource(this.persons);
      this.dataSource.sort = this.sort;
    }
    return this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
