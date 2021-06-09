import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rforms',
  templateUrl: './rforms.component.html',
  styleUrls: ['./rforms.component.scss']
})
export class RFormsComponent implements OnInit {
  public profileForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormGroup({
      calle: new FormControl(''),
      numero: new FormControl(''),
      colonia: new FormControl(''),
      municipio: new FormControl(''),
      estado: new FormControl(''),
      codigoPostal: new FormControl(''),
    }),
  });

  public pagosForm = this.fb.group({
    nombre: ['', Validators.required],
    numeroTarjeta: ['', Validators.required],
    codigoCVV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expiracion: this.fb.group({
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required]
    }),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  public onSubmit(){
    console.warn(this.profileForm.value);
  }
  public onSubmitPagos(){
    console.warn(this.pagosForm.value);
  }
}
