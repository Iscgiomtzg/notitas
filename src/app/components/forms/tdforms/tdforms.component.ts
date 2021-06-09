import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdforms',
  templateUrl: './tdforms.component.html',
  styleUrls: ['./tdforms.component.scss']
})
export class TDFormsComponent implements OnInit {
  title = 'Template driven forms';

  countryList:country[] = [
    new country("1", "India"),
    new country('2', 'USA'),
    new country('3', 'England')
  ];
  ngOnInit(){}
  onSubmit(form: any){
    console.log(form.value);
  }
}

export class country {
  id:string;
  name:string;

  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}
