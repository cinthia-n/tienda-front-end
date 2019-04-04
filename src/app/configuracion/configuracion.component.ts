import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AppURL} from '../shared/appUrl';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {RequestService} from '../services/request.service';
import {Maquinaria} from '../shared/maquinaria';
import {MaquinariaService} from '../services/maquinaria.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  maquinarias: Maquinaria[];
  maquinariaList: Observable<Maquinaria[]>;
  maquinaria: FormGroup;
  public url = AppURL.getUrlMaquinarias();

  imageSrc = '';

  // employees: Employee[];
  // employeeList: Observable<Employee[]>;
  // employee: FormGroup;
  // public url2 = AppURL.getUrlEmployee();

  constructor(private http: HttpClient,
              public dialog: MatDialog, private requestService: RequestService,
              public maquinariaService: MaquinariaService) { }

  ngOnInit() {

    this.maquinariaService.getMaquinarias().subscribe(maquinarias => this.maquinarias = maquinarias);
    this.maquinaria = new FormGroup({
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      capacidad: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      subCategoriaId: new FormControl('', Validators.required)
    });

    // this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
    // this.employee = new FormGroup({firstName: new FormControl('', Validators.required)});
  }





  onSubmit() {
    this.requestService.add(this.url, this.maquinaria.value, []).subscribe(
      response => {
        //  this.user.reset();
        //  this.router.navigate(['/compra']);
        window.location.reload();
      },
      error => {
        console.log(error);
        window.location.reload();
      }
    );
    console.log( this.maquinaria.value);
  }


}
