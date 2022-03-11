import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PokemonModel } from "../../models/DataResponse";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private prefixUrl = environment.server

  constructor(
    private http: HttpClient
  ) { }

  getListPokemon(limit, offset): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(
      this.prefixUrl + "pokemon?limit=" + limit + "&offset=" + offset,
      httpOptions
    );
  }

  getDetailPokemon(name): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(
      this.prefixUrl + "pokemon/" + name,
      httpOptions
    );
  }

  getSpeciesPokemon(name): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(
      this.prefixUrl + "pokemon-species/" + name,
      httpOptions
    );
  }

}
