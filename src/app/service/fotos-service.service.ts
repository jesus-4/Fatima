import { inject, Injectable } from '@angular/core';
import { fotos } from '../shared/navbar/model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosServiceService {
  private http = inject(HttpClient);
  getFotos(){
    return this.http.get<fotos[]>('assets/data/productos.json');
  }
}
