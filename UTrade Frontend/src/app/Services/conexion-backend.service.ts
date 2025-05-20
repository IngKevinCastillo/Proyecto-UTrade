import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionBackendService {
  readonly baseUrl: string = 'http://localhost:5264/api';

  constructor() {}
}
