import { Component } from '@angular/core';

declare function drawWordCloud(...args:any):any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WordCloud';

  ngOnInit(){
    drawWordCloud('#chart',["You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
    "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
    "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
    "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."],{switchInterval:5000})
  }
}
