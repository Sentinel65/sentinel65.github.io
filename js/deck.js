var deck = {
  cards: [{
      id: 1,
      suit: 'Zeme',
      name: 'Hora',
      strength: 9,
      bonus: '<span class="land">Zeme</span><br />+50, mas-li kartu <span class="weather">Kour</span> a <span class="flame">Pozar</span>. <br />ODSTRANUJE postih ze vsech karet <span class="flood">Potopa</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Kour') && hand.contains('Pozar') ? 50 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Potopa';
      },
      relatedSuits: ['Potopa'],
      relatedCards: ['Kour', 'Pozar']
    },
    {
      id: 2,
      suit: 'Zeme',
      name: 'Jeskyne',
      strength: 6,
      bonus: '<span class="land">Zeme</span><br />+25, mas-li kartu <span class="army">Trpaslici pechota</span> nebo <span class="beast">Drak</span>. <br />ODSTRANUJE postih ze vsech karet <span class="weather">Pocasi</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Trpaslici pechota') || hand.contains('Drak') ? 25 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Pocasi';
      },
      relatedSuits: ['Pocasi'],
      relatedCards: ['Trpaslici pechota', 'Drak']
    },
    {
      id: 3,
      suit: 'Zeme',
      name: 'Zvonice',
      strength: 8,
      bonus: '<span class="land">Zeme</span><br />+15, mas-li alespon jednu kartu <span class="wizard">Caroděj</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Carodej') ? 15 : 0;
      },
      relatedSuits: ['Carodej'],
      relatedCards: []
    },
    {
      id: 4,
      suit: 'Zeme',
      name: 'Les',
      strength: 7,
      bonus: '<span class="land">Zeme</span><br />+12 za kazdou kartu <span class="beast">Tvor</span> a <span class="army">Elfi lucistnici</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 12 * hand.countSuit('Tvor') + (hand.contains('Elfi lucistnici') ? 12 : 0);
      },
      relatedSuits: ['Tvor'],
      relatedCards: ['Elfi lucistnici']
    },
    {
      id: 5,
      suit: 'Zeme',
      name: 'Elemental zeme',
      strength: 4,
      bonus: '<span class="land">Zeme</span><br />+15 za kazdou dalsi kartu <span class="land">Zeme</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Zeme', this.id);
      },
      relatedSuits: ['Zeme'],
      relatedCards: []
    },
    {
      id: 6,
      suit: 'Potopa',
      name: 'Fontana zivota',
      strength: 1,
      bonus: '<span class="flood">Potopa</span><br />Pridej zakladni silu jakekoli karte <span class="weapon">Zbran</span>, <span class="flood">Potopa</span>, <span class="flame">Ohen</span>, <span class="land">Zeme</span> nebo <span class="weather">Pocasi</span> ve tve ruce.',
      penalty: null,
      bonusScore: function(hand) {
        var max = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Zbran' || card.suit === 'Potopa' || card.suit === 'Ohen' || card.suit === 'Zeme' || card.suit === 'Pocasi') {
            if (card.strength > max) {
              max = card.strength;
            }
          }
        }
        return max;
      },
      relatedSuits: ['Zbran', 'Potopa', 'Ohen', 'Zeme', 'Pocasi'],
      relatedCards: []
    },
    {
      id: 7,
      suit: 'Potopa',
      name: 'Bazina',
      strength: 18,
      bonus: null,
      penalty: '<span class="flood">Potopa</span><br />-3 za kazdou kartu <span class="army">Armada</span> a <span class="flame">Ohen</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Ohen');
        if (!(hand.containsId(25) || hand.containsId(41))) { // these clear the word 'Armada' from the penalty
          penaltyCards += hand.countSuit('Armada');
        }
        return -3 * penaltyCards;
      },
      relatedSuits: ['Armada', 'Ohen'],
      relatedCards: []
    },
    {
      id: 8,
      suit: 'Potopa',
      name: 'Stoleta voda',
      strength: 32,
      bonus: null,
      penalty: '<span class="flood">Potopa</span><br />VYMAZE vsechny karty <span class="army">Armada</span>, vsechny karty <span class="land">Zeme</span>, krome karty <span class="land">Hora</span> a vsechny karty <span class="flame">Ohen</span>, krome karty <span class="flame">Blesk</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Armada' && !(hand.containsId(25) || hand.containsId(41))) || // these clear the word 'Armada' from the penalty
          (card.suit === 'Zeme' && card.name !== 'Hora') ||
          (card.suit === 'Ohen' && card.name !== 'Blesk');
      },
      relatedSuits: ['Armada', 'Zeme', 'Ohen'],
      relatedCards: ['Hora', 'Blesk']
    },
    {
      id: 9,
      suit: 'Potopa',
      name: 'Ostrov',
      strength: 14,
      bonus: '<span class="flood">Potopa</span><br />ODSTRANUJE postih z jedne karty  <span class="flood">Potopa</span> nebo <span class="flame">Ohen</span>.',
      penalty: null,
      action: 'Pro ODSTRANENI postihu vyber ze sve ruky jednu kartu Potopa nebo Ohen.',
      relatedSuits: ['Potopa', 'Ohen'],
      relatedCards: []
    },
    {
      id: 10,
      suit: 'Potopa',
      name: 'Elemental vody',
      strength: 4,
      bonus: '<span class="flood">Potopa</span><br />+15 za kazdou dalsi kartu <span class="flood">Potopa</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Potopa', this.id);
      },
      relatedSuits: ['Potopa'],
      relatedCards: []
    },
    {
      id: 11,
      suit: 'Pocasi',
      name: 'Boure',
      strength: 8,
      bonus: '<span class="weather">Pocasi</span><br />+10 za kazdou dalsi kartu <span class="flood">Potopa</span>.',
      penalty: 'VYMAZE vsechny  karty <span class="flame">Ohen</span>, krome karty <span class="flame">Blesk</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Potopa');
      },
      blanks: function(card, hand) {
        return card.suit === 'Ohen' && card.name !== 'Blesk';
      },
      relatedSuits: ['Potopa', 'Ohen'],
      relatedCards: ['Blesk']
    },
    {
      id: 12,
      suit: 'Pocasi',
      name: 'Snehova vanice',
      strength: 30,
      bonus: null,
      penalty: '<span class="weather">Pocasi</span><br />VYMAZE vsechny karty <span class="flood">Potopa</span>. <br />-5 za kazdou kartu <span class="army">Armada</span>, <span class="leader">Vudce</span>, <span class="beast">Tvor</span> a <span class="flame">Ohen</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Vudce') + hand.countSuit('Tvor') + hand.countSuit('Ohen');
        if (!hand.containsId(25)) { // clears the word 'Armada' from the penalty
          penaltyCards += hand.countSuit('Armada');
        }
        return -5 * penaltyCards;
      },
      blanks: function(card, hand) {
        return card.suit === 'Potopa';
      },
      relatedSuits: ['Vudce', 'Tvor', 'Ohen', 'Armada', 'Potopa'],
      relatedCards: []
    },
    {
      id: 13,
      suit: 'Pocasi',
      name: 'Kour',
      strength: 27,
      bonus: null,
      penalty: '<span class="weather">Pocasi</span><br />Tato karty je VYMAZANA, nemas-li alespon jednu kartu <span class="flame">Ohen</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Ohen');
      },
      relatedSuits: ['Ohen'],
      relatedCards: []
    },
    {
      id: 14,
      suit: 'Pocasi',
      name: 'Tornado',
      strength: 13,
      bonus: '<span class="weather">Pocasi</span><br />+40, mas-li kartu <span class="weather">Boure</span> a k ni bud kartu <span class="weather">Snehová vanice</span> nebo kartu <span class="flood">Stoleta voda</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Boure') && (hand.contains('Snehova vanice') || hand.contains('Stoleta voda')) ? 40 : 0;
      },
      relatedSuits: ['Boure'],
      relatedCards: ['Snehova vanice', 'Stoleta voda']
    },
    {
      id: 15,
      suit: 'Pocasi',
      name: 'Elemental vzduchu',
      strength: 4,
      bonus: '<span class="weather">Pocasi</span><br />+15 za kazdou dalsi kartu <span class="weather">Pocasi</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Pocasi', this.id);
      },
      relatedSuits: ['Pocasi'],
      relatedCards: []
    },
    {
      id: 16,
      suit: 'Ohen',
      name: 'Pozar',
      strength: 40,
      bonus: null,
      penalty: '<span class="flame">Ohen</span><br />VYMAZE vsechny karty krome karet <span class="flame">Ohen</span>, <span class="wizard">Carodej</span>, <span class="weather">Pocasi</span>, <span class="weapon">Zbran</span>, <span class="artifact">Artefakt</span>, <span class="land">Hora</span>, <span class="flood">Stoleta voda</span>, <span class="flood">Ostrov</span>, <span class="beast">Jednorozec</span> a <span class="beast">Drak</span>.',
      blanks: function(card, hand) {
        return !(card.suit === 'Ohen' || card.suit === 'Carodej' || card.suit === 'Pocasi' ||
          card.suit === 'Zbran' || card.suit === 'Artefakt' || card.suit === 'Divoka' || card.name === 'Hora' ||
          card.name === 'Stoleta voda' || card.name === 'Ostrov' || card.name === 'Jednorozec' || card.name === 'Drak');
      },
      relatedSuits: allSuits(),
      relatedCards: ['Hora', 'Stoleta voda', 'Ostrov', 'Jednorozec', 'Drak']
    },
    {
      id: 17,
      suit: 'Ohen',
      name: 'Svicka',
      strength: 2,
      bonus: '<span class="flame">Ohen</span><br />+100, mas-li kartu <span class="artifact">Kniha promen</span>, <span class="land">Zvonice</span> a alespon jednu kartu <span class="Wwzard">Carodej</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Kniha promen') && hand.contains('Zvonice') && hand.containsSuit('Carodej') ? 100 : 0;
      },
      relatedSuits: ['Carodej'],
      relatedCards: ['Kniha promen', 'Zvonice']
    },
    {
      id: 18,
      suit: 'Ohen',
      name: 'Kovarna',
      strength: 9,
      bonus: '<span class="flame">Ohen</span><br />+9 za kazdou kartu <span class="weapon">Zbran</span> nebo kartu <span class="artifact">Artefakt</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * (hand.countSuit('Zbran') + hand.countSuit('Artefakt'));
      },
      relatedSuits: ['Zbran', 'Artefakt'],
      relatedCards: []
    },
    {
      id: 19,
      suit: 'Ohen',
      name: 'Blesk',
      strength: 11,
      bonus: '<span class="flame">Ohen</span><br />+30, mas-li kartu <span class="weather">Boure</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Boure') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Boure']
    },
    {
      id: 20,
      suit: 'Ohen',
      name: 'Elemental ohne',
      strength: 4,
      bonus: '<span class="flame">Ohen</span><br />+15 za kazdou dalsi kartu <span class="flame">Ohen</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Ohen', this.id);
      },
      relatedSuits: ['Ohen'],
      relatedCards: []
    },
    {
      id: 21,
      suit: 'Armada',
      name: 'Rytirky',
      strength: 20,
      bonus: null,
      penalty: '<span class="army">Armada</span><br />-8, nemas-li alespon jednoho <span class="leader">Vudce</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Vudce') ? 0 : -8;
      },
      relatedSuits: ['Vudce'],
      relatedCards: []
    },
    {
      id: 22,
      suit: 'Armada',
      name: 'Elfi lucistnici',
      strength: 10,
      bonus: '<span class="army">Armada</span><br />+5, nemas-li zadne <span class="weather">Pocasi</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Pocasi') ? 0 : 5;
      },
      relatedSuits: ['Pocasi'],
      relatedCards: []
    },
    {
      id: 23,
      suit: 'Armada',
      name: 'Tezka jizda',
      strength: 17,
      bonus: null,
      penalty: '<span class="army">Armada</span><br />-2 za kazdou jinou kartu <span class="land">Zeme</span>.',
      penaltyScore: function(hand) {
        return -2 * hand.countSuit('Zeme');
      },
      relatedSuits: ['Zeme'],
      relatedCards: []

    },
    {
      id: 24,
      suit: 'Armada',
      name: 'Trpaslici pechota',
      strength: 15,
      bonus: null,
      penalty: '<span class="army">Armada</span><br />-2 za kazdou jinou kartu <span class="army">Armada</span>.',
      penaltyScore: function(hand) {
        if (!hand.containsId(25)) { // clears the word 'Armada' from the penalty
          return -2 * hand.countSuitExcluding('Armada', this.id);
        }
        return 0;
      },
      relatedSuits: ['Armada'],
      relatedCards: []
    },
    {
      id: 25,
      suit: 'Armada',
      name: 'Hranicari',
      strength: 5,
      bonus: '<span class="army">Armada</span><br />+10 kazdou kartu <span class="land">Zeme</span>. <br />ODSTRANUJE slovo <span class="army">Armada</span> ze vsech postihu.',
      penalty: null,
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Zeme');
      },
      relatedSuits: ['Zeme', 'Armada'],
      relatedCards: []
    },
    {
      id: 26,
      suit: 'Carodej',
      name: 'Sberatel',
      strength: 7,
      bonus: '<span class="wizard">Carodej</span><br />+10 za tri ruzné karty stejne barvy, +40 za ctyri ruzné karty stejne barvy, +100 za pet ruznych karet stejne barvy.',
      penalty: null,
      bonusScore: function(hand) {
        var bySuit = {};
        for (const card of hand.nonBlankedCards()) {
          var suit = card.suit;
          if (bySuit[suit] === undefined) {
            bySuit[suit] = {};
          }
          bySuit[suit][card.name] = card;
        }
        var bonus = 0;
        for (const suit of Object.values(bySuit)) {
          var count = Object.keys(suit).length;
          if (count === 3) {
            bonus += 10;
          } else if (count === 4) {
            bonus += 40;
          } else if (count >= 5) {
            bonus += 100;
          }
        }
        return bonus;
      },
      relatedSuits: allSuits(),
      relatedCards: []
    },
    {
      id: 27,
      suit: 'Carodej',
      name: 'Pan selem',
      strength: 9,
      bonus: '<span class="wizard">Carodej</span><br />+9 za kazdou kartu <span class="beast">Tvor</span>. <br />ODSTRANUJE postihy na vsech kartach <span class="beast">Tvor</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * hand.countSuit('Tvor');
      },
      clearsPenalty: function(card) {
        return card.suit === 'Tvor';
      },
      relatedSuits: ['Tvor'],
      relatedCards: []
    },
    {
      id: 28,
      suit: 'Carodej',
      name: 'Nekromant',
      strength: 3,
      bonus: '<span class="wizard">Carodej</span><br />Na konci hry si z odkladaciho prostoru muzes vzit jakoukoli kartu <span class="army">Armada</span>, <span class="leader">Vudce</span>, <span class="wizard">Carodej</span> nebo <span class="beast">Tvor</span> a pridat si ji do ruky jako osmou kartu.',
      penalty: null,
      relatedSuits: ['Armada', 'Vudce', 'Carodej', 'Tvor'],
      relatedCards: []
    },
    {
      id: 29,
      suit: 'Carodej',
      name: 'Nejvyssi mag',
      strength: 25,
      bonus: null,
      penalty: '<span class="wizard">Carodej</span><br />-10 za kazdou dalsi kartu <span class="leader">Vudce</span> nebo <span class="wizard">Carodej</span>.',
      penaltyScore: function(hand) {
        return -10 * (hand.countSuit('Vudce') + hand.countSuitExcluding('Carodej', this.id));
      },
      relatedSuits: ['Vudce', 'Carodej'],
      relatedCards: []
    },
    {
      id: 30,
      suit: 'Carodej',
      name: 'Kouzelnice',
      strength: 5,
      bonus: '<span class="wizard">Carodej</span><br />+5 za kazdou kartu <span class="land">Zeme</span>, <span class="weather">Pocasi</span>, <span class="flood">Potopa</span> a <span class="flame">Ohen</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 5 * (hand.countSuit('Zeme') + hand.countSuit('Pocasi') + hand.countSuit('Potopa') + hand.countSuit('Ohen'));
      },
      relatedSuits: ['Zeme', 'Pocasi', 'Potopa', 'Ohen'],
      relatedCards: []
    },
    {
      id: 31,
      suit: 'Vudce',
      name: 'Kral',
      strength: 8,
      bonus: '<span class="leader">Vudce</span><br />+5 za kazdou kartu <span class="army">Armada</span>. <br />NEBO +20 za kazdou kartu <span class="army">Armada</span>, mas-li zaroven i kartu <span class="leader">Kralovna</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('Kralovna') ? 20 : 5) * hand.countSuit('Armada');
      },
      relatedSuits: ['Armada'],
      relatedCards: ['Kralovna']
    },
    {
      id: 32,
      suit: 'Vudce',
      name: 'Kralovna',
      strength: 6,
      bonus: '<span class="leader">Vudce</span><br />+5 za kazdou kartu <span class="army">Armada</span>. <br />NEBO +20 za kazdou kartu <span class="army">Armada</span>, mas-li zaroven i kartu <span class="leader">Kral</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('Kral') ? 20 : 5) * hand.countSuit('Armada');
      },
      relatedSuits: ['Armada'],
      relatedCards: ['Kral']
    },
    {
      id: 33,
      suit: 'Vudce',
      name: 'Princezna',
      strength: 2,
      bonus: '<span class="leader">Vudce</span><br />+8 za kazdou kartu <span class="army">Armada</span>, <span class="wizard">Carodej</span> nebo dalsi kartu <span class="leader">Vudce</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 8 * (hand.countSuit('Armada') + hand.countSuit('Carodej') + hand.countSuitExcluding('Vudce', this.id));
      },
      relatedSuits: ['Armada', 'Carodej', 'Vudce'],
      relatedCards: []
    },
    {
      id: 34,
      suit: 'Vudce',
      name: 'Velitel',
      strength: 4,
      bonus: '<span class="leader">Vudce</span><br />Soucet zakladních sil vsech karet <span class="army">Armada</span>, ktere mas v ruce.',
      penalty: null,
      bonusScore: function(hand) {
        var total = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Armada') {
            total += card.strength;
          }
        }
        return total;
      },
      relatedSuits: ['Armada'],
      relatedCards: []
    },
    {
      id: 35,
      suit: 'Vudce',
      name: 'Cisarovna',
      strength: 15,
      bonus: '<span class="leader">Vudce</span><br />+10 za kazdou kartu <span class="army">Armada</span>.',
      penalty: '-5 za kazdou dalsi kartu <span class="leader">Vudce</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Armada');
      },
      penaltyScore: function(hand) {
        return -5 * hand.countSuitExcluding('Vudce', this.id);
      },
      relatedSuits: ['Armada', 'Vudce'],
      relatedCards: []
    },
    {
      id: 36,
      suit: 'Tvor',
      name: 'Jednorozec',
      strength: 9,
      bonus: '<span class="beast">Tvor</span><br />+30, mas-li kartu <span class="leader">Princezna</span>. <br />NEBO +15, mas-li kartu <span class="leader">Cisarovna</span>, <span class="leader">Kralovna</span> nebo <span class="leader">Kouzelnice</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Princena') ? 30 : (hand.contains('Cisarovna') || hand.contains('Kralovna') || hand.contains('Kouzelnice')) ? 15 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Princezna', 'Cisarovna', 'Kralovna', 'Kouzelnice']
    },
    {
      id: 37,
      suit: 'Tvor',
      name: 'Bazilisek',
      strength: 35,
      bonus: null,
      penalty: '<span class="beast">Tvor</span><br />VYMAZE vsechny karty <span class="army">Armada</span>, <span class="leader">Vudce</span> a dalsi karty <span class="beast">Tvor</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Armada' && !hand.containsId(25)) || // clears the word 'Armada' from the penalty
          card.suit === 'Vudce' ||
          (card.suit === 'Tvor' && card.id !== this.id);
      },
      relatedSuits: ['Armada', 'Vudce', 'Tvor'],
      relatedCards: []
    },
    {
      id: 38,
      suit: 'Tvor',
      name: 'Valecny or',
      strength: 6,
      bonus: '<span class="beast">Tvor</span><br />+14, mas-li kartu <span class="leader">Vudce</span> nebo kartu <span class="wizard">Carodej</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Vudce') || hand.containsSuit('Carodej') ? 14 : 0;
      },
      relatedSuits: ['Vudce', 'Carodej'],
      relatedCards: []
    },
    {
      id: 39,
      suit: 'Tvor',
      name: 'Drak',
      strength: 30,
      bonus: null,
      penalty: '<span class="beast">Tvor</span><br />-40, nemas-li alespon jednu kartu <span class="wizard">Carodej</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Carodej') ? 0 : -40;
      },
      relatedSuits: ['Carodej'],
      relatedCards: []
    },
    {
      id: 40,
      suit: 'Tvor',
      name: 'Hydra',
      strength: 12,
      bonus: '<span class="beast">Tvor</span><br />+28, mas-li kartu <span class="flood">Bazina</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Bazina') ? 28 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Bazina']
    },
    {
      id: 41,
      suit: 'Zbran',
      name: 'Valecna lod',
      strength: 23,
      bonus: '<span class="weapon">Zbran</span><br />ODSTRANUJE slovo <span class="army">Armada</span> ze vsech postihu na vsech kartach <span class="flood">Potopa</span>.',
      penalty: 'Je VYMAZANA, nemas-li alespon jednu kartu <span class="flooda">Potopa</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Potopa');
      },
      relatedSuits: ['Armada', 'Potopa'],
      relatedCards: []
    },
    {
      id: 42,
      suit: 'Zbran',
      name: 'Magicka hul',
      strength: 1,
      bonus: '<span class="weapon">Zbran</span><br />+25, mas-li alespon jednu kartu <span class="wizard">Carodej</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Carodej') ? 25 : 0;
      },
      relatedSuits: ['Carodej'],
      relatedCards: []
    },
    {
      id: 43,
      suit: 'Zbran',
      name: 'Kethsky mec',
      strength: 7,
      bonus: '<span class="weapon">Zbran</span><br />+10, mas-li alespon jednu kartu <span class="leader">Vudce</span>. <br />NEBO +40, mas-li kartu <span class="leader">Vudce</span> a k ni kartu <span class="artifact">Kethsky stit</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Vudce') ? (hand.contains('Kethsky stit') ? 40 : 10) : 0;
      },
      relatedSuits: ['Vudce'],
      relatedCards: ['Kethsky stit']
    },
    {
      id: 44,
      suit: 'Zbran',
      name: 'Elfsky luk',
      strength: 3,
      bonus: '<span class="weapon">Zbran</span><br />+30, mas-li kartu <span class="army">Elfi lucistnici</span>, <span class="leader">Velitel</span> nebo <span class="wizard">Pan selem</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Elfi lucistnici') || hand.contains('Velitel') || hand.contains('Pan selem') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Elfi lucistnici', 'Velitel', 'Pan selem']
    },
    {
      id: 45,
      suit: 'Zbran',
      name: 'Bojova vzducholod',
      strength: 35,
      bonus: null,
      penalty: '<span class="weapon">Zbran</span><br />Je VYMAZANA, nemas-li alespon jednu kartu <span class="army">Armada</span>. <br />Je VYMAZANA, mas-li jakoukoli kartu <span class="weather">Pocasi</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Armada') || hand.containsSuit('Pocasi');
      },
      relatedSuits: ['Armada', 'Pocasi'],
      relatedCards: []
    },
    {
      id: 46,
      suit: 'Artefakt',
      name: 'Kethsky stit',
      strength: 4,
      bonus: '<span class="artifact">Artefakt</span><br />+15, mas-li alespon jednu kartu <span class="leader">Vudce</span>. <br />NEBO +40, mas-li kartu <span class="leader">Vudce</span> a kartu <span class="weapon">Kethsky mec</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Vudce') ? (hand.contains('Kethsky mec') ? 40 : 15) : 0;
      },
      relatedSuits: ['Vudce'],
      relatedCards: ['Kethsky mec']
    },
    {
      id: 47,
      suit: 'Artefakt',
      name: 'Krystal radu',
      strength: 5,
      bonus: '<span class="artifact">Artefakt</span><br />+10 za postupku ze 3 karet, +30 za postupku ze 4 karet, +60 za postupku z 5 karet, +100 za postupku ze 6 karet, +150 za postupku ze 7 karet. <br />Pocitaji se ihned po sobe jdouci zakladní sily karet.',
      penalty: null,
      bonusScore: function(hand) {
        var strengths = hand.nonBlankedCards().map(card => card.strength);
        var currentRun = 0;
        var runs = [];
        for (var i = 0; i <= 40; i++) {
          if (strengths.includes(i)) {
            currentRun++;
          } else {
            runs.push(currentRun);
            currentRun = 0;
          }
        }
        var bonus = 0;
        for (var run of runs) {
          if (run === 3) {
            bonus += 10;
          } else if (run === 4) {
            bonus += 30;
          } else if (run === 5) {
            bonus += 60;
          } else if (run === 6) {
            bonus += 100;
          } else if (run >= 7) {
            bonus += 150;
          }
        }
        return bonus;
      },
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 48,
      suit: 'Artefakt',
      name: 'Strom sveta',
      strength: 2,
      bonus: '<span class="artifact">Artefakt</span><br />+50, pokud maji vsechny NEVYMAZANE karty rozdilne barvy.',
      penalty: null,
      bonusScore: function(hand) {
        var suits = [];
        for (const card of hand.nonBlankedCards()) {
          if (suits.includes(card.suit)) {
            return 0;
          }
          suits.push(card.suit);
        }
        return 50;
      },
      relatedSuits: allSuits(),
      relatedCards: []
    },
    {
      id: 49,
      suit: 'Artefakt',
      name: 'Kniha promen',
      strength: 3,
      bonus: '<span class="artifact">Artefakt</span><br />Muzes zmenit barvu jedne karty ve sve ruce. Jeji jmeno, bonus a postihy zustavaji.',
      penalty: null,
      action: 'Pick a suit and a target card from your hand.',
      relatedSuits: [], // empty because the main reason for relatedSuits is to determine how to use 'Book of Changes'
      relatedCards: []
    },
    {
      id: 50,
      suit: 'Artefakt',
      name: 'Ochranna runa',
      strength: 1,
      bonus: '<span class="artifact">Artefakt</span><br />ODSTRANI postihy ze vsech karet v ruce.',
      penalty: null,
      clearsPenalty: function(card) {
        return true;
      },
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 51,
      suit: 'Divoka',
      name: 'Menavec',
      strength: 0,
      bonus: '<span class="wild">Divoka</span><br /><b>Menavec</b> muze zkopirovat jmeno a barvu jakekoliv karty  <span class="artifact">Artefakt</span>, <span class="leader">Vudce</span>, <span class="wizard">Carodej</span>, <span class="weapon">Zbran</span> nebo <span class="beast">Tvor</span> ve hre. <br />Zakladni sila, bonusy ani postihy se nekopiruji.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chces zkopirovat.',
      relatedSuits: ['Artefakt', 'Vudce', 'Carodej', 'Zbran', 'Tvor'].sort(),
      relatedCards: []
    },
    {
      id: 52,
      suit: 'Divoka',
      name: 'Prelud',
      strength: 0,
      bonus: '<span class="wild">Divoka</span><br /><b>Prelud</b> muze zkopirovat jmeno a barvu jakekoliv karty  <span class="army">Armada</span>, <span class="land">Zeme</span>, <span class="weather">Pocasi</span>, <span class="flooda">Potopa</span> nebo <span class="flame">Ohen</span> ve hře. <br />Zakladni sila, bonusy ani postihy se nekopiruji.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chces zkopirovat.',
      relatedSuits: ['Armada', 'Zeme', 'Pocasi', 'Potopa', 'Ohen'].sort(),
      relatedCards: []
    },
    {
      id: 53,
      suit: 'Divoka',
      name: 'Dvojnik',
      strength: 0,
      bonus: '<span class="wild">Divoka</span><br /><b>Dvojnik</b> muze kopirovat jmeno, barvu, zakladni silu, ALE NIKOLI BONUS jakekoli jine karty ve tve ruce.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chces zkopirovat.',
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 54,
      suit: 'Carodej',
      name: 'Sasek',
      strength: 3,
      bonus: '<span class="wizard">Carodej</span><br />+3 za kazdou dalsi kartu ve tve ruce s lichou zakladni silou. <br />NEBO +50, maji-li vsechny karty ve tve ruce lichou zakladni silu .',
      penalty: null,
      bonusScore: function(hand) {
        var oddCount = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.strength % 2 === 1) {
            oddCount++;
          }
        }
        if (oddCount === hand.size()) {
          return 50;
        } else {
          return (oddCount - 1) * 3;
        }
      },
      relatedSuits: [],
      relatedCards: []
    }
  ],
  getCardByName: function(cardName) {
    for (const card of this.cards) {
      if (card.name === cardName) {
        return card;
      }
    }
  },
  getCardById: function(id) {
    return this.cards[id - 1];
  },
  getCardsBySuit: function(suits) {
    var cardsBySuit = {};
    for (const card of this.cards) {
      if (suits === undefined || suits.includes(card.suit)) {
        if (cardsBySuit[card.suit] === undefined) {
          cardsBySuit[card.suit] = [];
        }
        cardsBySuit[card.suit].push(card);
      }
    }
    var ordered = {};
    Object.keys(cardsBySuit).sort().forEach(function(key) {
      ordered[key] = cardsBySuit[key];
    });
    return ordered;
  }
};

function allSuits() {
  return ['Zeme', 'Potopa', 'Pocasi', 'Ohen', 'Armada', 'Carodej', 'Vudce', 'Tvor', 'Zbran', 'Artefakt', 'Divoka'].sort();
}

var NONE = -1;
var ISLAND = 9;
var NECROMANCER = 28;
var BOOK_OF_CHANGES = 49;
var SHAPESHIFTER = 51;
var MIRAGE = 52;
var DOPPELGANGER = 53;

var ACTION_ORDER = [DOPPELGANGER, MIRAGE, SHAPESHIFTER, BOOK_OF_CHANGES, ISLAND];
