import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= 'https://login-app-4d7ba-default-rtdb.firebaseio.com';
  
  constructor(private http: HttpClient) { }


  
  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    )
  }


  actualizarHeroe(heroe: HeroeModel){
    
    //con spread ... toma cada propiedad del heroe y crea cada propiedad del heroe
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id}.json`, heroeTemp);
  }

  eliminarHeroe(id: string){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }


  obtenerHeroePorID(id: string){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }


  mostrarHeroes(){
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.crearArregloHeroes)
      );
  }

  private crearArregloHeroes( heroesObj : Object){
    const heroes: HeroeModel[] = [];

    console.log(heroesObj);

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    if(heroesObj === null){
      return [];
    }

    return heroes;
  } 

  
}
