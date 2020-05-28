import {element} from 'protractor';

export class PersonView {
  countryId: string;
  datebirthday: Date;
  id: bigint;
  lastModification: Date;
  name: string;
  phone: string;
  sex: string;
  surname: string;
  surname2: string;

  constructor() {

  }

  public setSex(sex: string, sexs: any) {
    // tslint:disable-next-line:no-shadowed-variable
    sexs.forEach(element => {
      // tslint:disable-next-line:triple-equals
      if (sex == element.key) {
        this.sex = element.description;
      }
    });

  }

  setPhone(phone: string, countries: any, countryID: number) {
    this.phone = `+ ${countries[countryID - 1].prefix} ${phone}`;

  }
}
