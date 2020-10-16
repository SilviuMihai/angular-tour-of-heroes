import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/mock-heroes';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

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

  getHeroes()
  {
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name:string)
  {
    name = name.trim();
    if(!name)
    { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => { this.heroes.push(hero)});
  }

  delete(hero:Hero)
  {
    this.heroes = this.heroes.filter(h => h !== hero); //refreshes the page with the heroes - 
    //heores it is declared as a list and it is used in the HTML
    this.heroService.deleteHero(hero).subscribe();
  }
}

/* There's really nothing for the component to do with the Observable returned by heroService.delete() 
but it must subscribe anyway.

If you neglect to subscribe(), the service will not send the delete request to the server. 
As a rule, an Observable does nothing until something subscribes.
Confirm this for yourself by temporarily removing the subscribe(), clicking "Dashboard", 
then clicking "Heroes". You'll see the full list of heroes again. */