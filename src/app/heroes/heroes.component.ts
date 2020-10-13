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


  constructor(private heroService:HeroService, private messageService: MessageService) { }

  //Lifecycle Hook
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero)
  {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selcted hero id=${hero.id}`);
  }

  getHeroes()
  {
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
    //getHeroes() method returns the list of HEROES and subscribe just fill's up the parameter this.heroes.
  }
//The details behind the Observable
/* The previous version assigns an array of heroes to the component's heroes property. 
The assignment occurs synchronously, as if the server could return heroes instantly or the browser could 
freeze the UI while it waited for the server's response.

That won't work when the HeroService is actually making requests of a remote server.

The new version waits for the Observable to emit the array of heroes—which could happen now or several 
minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's 
heroes property.

This asynchronous approach will work when the HeroService requests heroes from the server. */
}
