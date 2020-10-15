import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero:Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack():void{
    this.location.back();
  }

  save()
  {
    this.heroService.updateHero(this.hero).subscribe(()=>this.goBack());
  }
}
/* The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of 
the hero to display.

The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.

The location is an Angular service for interacting with the browser.  */