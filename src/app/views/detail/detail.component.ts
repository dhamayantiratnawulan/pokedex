import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { faMars, faVenus, faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PokemonModel } from 'src/app/models/DataResponse';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  paramName
  pokemon
  species
  faMars = faMars
  faVenus = faVenus
  faArrowLeft = faArrowLeft
  faChevronRight = faChevronRight
  male: number
  female: number
  private prefixUrl = environment.server
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  arrayEvolution: any = []
  loading: Boolean

  constructor(
    private route: ActivatedRoute,
    private service: PokemonService,
    private _location: Location,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramName = this.route.snapshot.params.name
    this.getDetail()
    this.getSpecies()
  }

  getDetail() {
    this.loading = true
    this.service.getDetailPokemon(this.paramName).subscribe(resp => {
      this.pokemon = resp
      this.loading = false
    })
  }

  getImage(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  getSpecies() {
    this.service.getSpeciesPokemon(this.paramName).subscribe(resp => {
      this.species = resp
      this.female = (resp.gender_rate / 8) * 100
      this.male = 100 - this.female

      this.getEvolutionChain()
    })
  }

  getEvolutionChain() {
    this.http.get<PokemonModel>(this.species.evolution_chain.url, this.httpOptions).subscribe(resp => {
      this.arrayEvolution.push(resp.chain.species)
      this.arrayEvolution.push(resp.chain.evolves_to[0].species)
      this.arrayEvolution.push(resp.chain.evolves_to[0].evolves_to[0].species)
    })
  }

  joinAbility(item) {
    return item.map(x =>
      x.ability.name
    ).join(', ')
  }

  joinEgg(item) {
    return item.map(x =>
      x.name
    ).join(', ')
  }

  back() {
    this._location.back()
  }

  detail(name) {
    this.router.navigateByUrl('pokemon/' + name)
  }
}
