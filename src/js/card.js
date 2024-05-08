export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;
    this.createElement();
  }

  createElement() {
    this.card = document.createElement('div');
    this.card.classList.add('game__card', 'col-3', 'd-flex');
    this.face = document.createElement('span');
    this.face.classList.add('game__face', 'd-flex', 'justify-content-center', 'align-items-center');
    this.face.append(this._cardNumber);
    const back = document.createElement('span');
    back.classList.add('game__back', 'd-flex', 'justify-content-center', 'align-items-center');
    back.innerText = '?';
    this.card.append(this.face);
    this.card.append(back);
    this.container.append(this.card);
    this.card.addEventListener('click', () => this.flip(this));
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    if (value) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    }
  }

  get open() {
    if (this.card.classList.contains('open')) {
      return true;
    }
    return false;
  }

  set success(value) {
    if (value) {
      this.card.classList.add('success');
    } else {
      this.card.classList.remove('success');
    }
  }

  get success() {
    if (this.card.classList.contains('success')) {
      return true;
    }
    return false;
  }
}

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardNumber(value) {
    const cardsImgArray = [
      'img/1.svgвыфвфы',
      'img/2.svg',
      'img/3.svg',
      'img/4.svg',
      'img/5.svg',
      'img/6.svg',
      'img/7.svg',
      'img/8.svg',
    ];
    const img = document.createElement('img');
    img.classList.add('game__image');
    img.src = cardsImgArray[value - 1];
    img.onerror = () => {
      img.src = 'img/error.svg';
      img.onerror = null;
    };
    this._cardNumber = img;

  }

  get cardNumber(){
    return this._cardNumber;
  }
}
