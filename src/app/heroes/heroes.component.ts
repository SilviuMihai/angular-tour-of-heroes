import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/mock-heroes';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]; //declared as a list
  selectedHero: Hero;


  constructor(private heroService:HeroService) { }

  //Lifecycle Hook
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero)
  {
    this.selectedHero = hero;
  }

  getHeroes()
  {
    this.heroes = this.heroService.getHeroes();
    //returns the list of HEROES from the SERVICE
  }
}
