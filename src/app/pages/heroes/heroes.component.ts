import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;
  
  constructor(private http: HttpClient, public heroesService: HeroesService) { }
  


  ngOnInit(): void {


    this.loading = true;

    this.heroesService.mostrarHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.loading = false;
      })
  }

  eliminarHeroe(heroe: any, i: number){

    console.log(heroe.value.id);
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar el registro ${ heroe.value.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      
      if ( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.eliminarHeroe( heroe.value.id ).subscribe();
      }

    });
  
  }

  
}
