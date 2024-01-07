import { Component, OnInit } from '@angular/core';

interface Card {
  value: string;
  flipped: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCards: Card[] = [];

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    let cardValues = ['A', 'B', 'C', 'D', 'E', 'F'];
    cardValues = cardValues.concat(cardValues); 
    this.shuffleArray(cardValues);

    this.cards = cardValues.map(value => ({ value, flipped: false }));
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(card: Card) {
    if (!card.flipped && this.flippedCards.length < 2) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 500);
      }
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.value === card2.value) {
      this.matchedCards.push(...this.flippedCards);
      this.flippedCards = [];

      if (this.matchedCards.length === this.cards.length) {
        alert('Matched all cards');
        this.initializeGame();
      }
    } else {
      setTimeout(() => {
        this.flippedCards.forEach(card => card.flipped = false);
        this.flippedCards = [];
      }, 500);
    }
  }
}
