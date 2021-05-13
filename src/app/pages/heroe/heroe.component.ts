import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';
import { HeroesService } from 'src/app/services/heroes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();


  constructor(private heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){
      this.heroeService.obtenerHeroePorID(id).subscribe(
        (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        }
      )
    }else{
      console.log('ERROR DE ID');
    }

    console.log(id);
  }

  guardar(form: NgForm){

    //variable para manejar si es actualizacion o nuevo
    let peticion: Observable<any>;

    if(form.invalid){
      console.log('Formulario Invalido')
    }

    if( this.heroe.id ){
      peticion = this.heroeService.actualizarHeroe(this.heroe);
      console.log('PETICION: ' + peticion);
    }else{
      peticion = this.heroeService.crearHeroe(this.heroe);
      console.log('PETICION: ' + peticion);
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    peticion.subscribe( resp => {
      Swal.fire(this.heroe.nombre,'Actualizado Correctamente', 'success')
    })

    this.heroe;
  }

 

}
