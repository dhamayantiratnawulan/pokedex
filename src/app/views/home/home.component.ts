import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  pokemon: any = []
  countPokemon
  loading: Boolean
  offset: number = 0
  limit: number = 20
  shimmersCount = Array.from({length: 50})

  constructor(
    private service: PokemonService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    window.addEventListener('scroll', ()=>  {
      if (!this.loading && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600)) {
        this.getListPokemon()
      }
    });
  }

  ngOnInit() {
    this.getListPokemon()
  }

  getListPokemon() {
    this.loading = true
    this.service.getListPokemon(this.limit, this.offset).subscribe(resp => {
      this.loading = false
      this.countPokemon = resp.count
      resp.results.map(x => Object.assign(x, {
        id: x.url.split('/')[6]
      }))
     this.pokemon = this.pokemon.concat(resp.results)
      this.getDetail()
      this.offset += 20
    })
  }

  getImage(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  getDetail() {
    this.pokemon.forEach(x => {
      this.service.getDetailPokemon(x.name).subscribe(resp => {
        Object.assign(x, { types: resp.types })
      })
    })
  }

  detail(name) {
    this.router.navigateByUrl('pokemon/' + name)
  }

}
