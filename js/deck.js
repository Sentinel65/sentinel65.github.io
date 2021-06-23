var deck = {
  cards: [{
      id: 1,
      suit: 'Land-Země',
      name: 'Hora',
      strength: 9,
      bonus: '<span class="land">Land-Země</span><br />+50, máš-li kartu <span class="weather">Kouř</span> a <span class="Flame-Oheň">Požár</span>. <br />ODSTRAŇUJE postih ze všech karet <span class="Flood-Potopa">Flood-Potopa</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Kouř') && hand.contains('Požár') ? 50 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Flood-Potopa';
      },
      relatedSuits: ['Flood-Potopa'],
      relatedCards: ['Kouř', 'Požár']
    },
    {
      id: 2,
      suit: 'Land-Země',
      name: 'Jeskyně',
      strength: 6,
      bonus: '<span class="land">Land-Země</span><br />+25, máš-li kartu <span class="army">Trpasličí pěchota</span> nebo <span class="Beast-Tvor">Drak</span>. <br />ODSTRAŇUJE postih ze všech karet <span class="weather">Weather-Počasí</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Trpasličí pěchota') || hand.contains('Drak') ? 25 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Weather-Počasí';
      },
      relatedSuits: ['Weather-Počasí'],
      relatedCards: ['Trpasličí pěchota', 'Drak']
    },
    {
      id: 3,
      suit: 'Land-Země',
      name: 'Zvonice',
      strength: 8,
      bonus: '<span class="land">Land-Země</span><br />+15, máš-li alespoň jednu kartu <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Wizard-Čaroděj') ? 15 : 0;
      },
      relatedSuits: ['Wizard-Čaroděj'],
      relatedCards: []
    },
    {
      id: 4,
      suit: 'Land-Země',
      name: 'Les',
      strength: 7,
      bonus: '<span class="land">Land-Země</span><br />+12 za každou kartu <span class="Beast-Tvor">Beast-Tvor</span> a <span class="army">Elfí lučištník</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 12 * hand.countSuit('Beast-Tvor') + (hand.contains('Elfí lučištník') ? 12 : 0);
      },
      relatedSuits: ['Beast-Tvor'],
      relatedCards: ['Elfí lučištník']
    },
    {
      id: 5,
      suit: 'Land-Země',
      name: 'Elementál země',
      strength: 4,
      bonus: '<span class="land">Land-Země</span><br />+15 za každou další kartu <span class="land">Land-Země</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Land-Země', this.id);
      },
      relatedSuits: ['Land-Země'],
      relatedCards: []
    },
    {
      id: 6,
      suit: 'Flood-Potopa',
      name: 'Fontána života',
      strength: 1,
      bonus: '<span class="flood">Flood-Potopa</span><br />Přidej základní sílu jakékoli kartě <span class="weapon">Weapon-Zbraň</span>, <span class="Flood-Potopa">Flood-Potopa</span>, <span class="Flame-Oheň">Flame-Oheň</span>, <span class="land">Land-Země</span> nebo <span class="weather">Weather-Počasí</span> ve tvé ruce.',
      penalty: null,
      bonusScore: function(hand) {
        var max = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Weapon-Zbraň' || card.suit === 'Flood-Potopa' || card.suit === 'Flame-Oheň' || card.suit === 'Land-Země' || card.suit === 'Weather-Počasí') {
            if (card.strength > max) {
              max = card.strength;
            }
          }
        }
        return max;
      },
      relatedSuits: ['Weapon-Zbraň', 'Flood-Potopa', 'Flame-Oheň', 'Land-Země', 'Weather-Počasí'],
      relatedCards: []
    },
    {
      id: 7,
      suit: 'Flood-Potopa',
      name: 'Bažina',
      strength: 18,
      bonus: null,
      penalty: '<span class="flood">Flood-Potopa</span><br />-3 za každou kartu <span class="army">Army-Armáda</span> a <span class="Flame-Oheň">Flame-Oheň</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Flame-Oheň');
        if (!(hand.containsId(25) || hand.containsId(41))) { // these clear the word 'Army-Armáda' from the penalty
          penaltyCards += hand.countSuit('Army-Armáda');
        }
        return -3 * penaltyCards;
      },
      relatedSuits: ['Army-Armáda', 'Flame-Oheň'],
      relatedCards: []
    },
    {
      id: 8,
      suit: 'Flood-Potopa',
      name: 'Stoletá voda',
      strength: 32,
      bonus: null,
      penalty: '<span class="flood">Flood-Potopa</span><br />VYMAŽE všechny karty <span class="army">Armmy-Armáda</span>, všechny karty <span class="land">Land-Země</span> kromě karty <span class="land">Hora</span> a všechny karty <span class="Flame-Oheň">Flame-Oheň</span> kromě karty <span class="Flame-Oheň">Blesk</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Army-Armáda' && !(hand.containsId(25) || hand.containsId(41))) || // these clear the word 'Army-Armáda' from the penalty
          (card.suit === 'Land-Země' && card.name !== 'Mountain') ||
          (card.suit === 'Flame-Oheň' && card.name !== 'Lightning');
      },
      relatedSuits: ['Army-Armáda', 'Land-Země', 'Flame-Oheň'],
      relatedCards: ['Mountain', 'Lightning']
    },
    {
      id: 9,
      suit: 'Flood-Potopa',
      name: 'Ostrov',
      strength: 14,
      bonus: '<span class="flood">Flood-Potopa</span><br />ODSTRAŇUJE postih z jedné karty  <span class="Flood-Potopa">Flood-Potopa</span> nebo <span class="Flame-Oheň">Flame-Oheň</span>.',
      penalty: null,
      action: 'Vyber kartu Flood-Potopa nebo Flame-Oheň ze své ruky pro odstranění postihu.',
      relatedSuits: ['Flood-Potopa', 'Flame-Oheň'],
      relatedCards: []
    },
    {
      id: 10,
      suit: 'Flood-Potopa',
      name: 'Elementál vody',
      strength: 4,
      bonus: '<span class="flood">Flood-Potopa</span><br />+15 za každou další kartu <span class="Flood-Potopa">Flood-Potopa</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Flood-Potopa', this.id);
      },
      relatedSuits: ['Flood-Potopa'],
      relatedCards: []
    },
    {
      id: 11,
      suit: 'Weather-Počasí',
      name: 'Bouře',
      strength: 8,
      bonus: '<span class="weather">Weather-Počasí</span><br />+10 za každou další kartu <span class="Flood-Potopa">Flood-Potopa</span>.',
      penalty: 'VYMAŽE všechny  karty <span class="Flame-Oheň">Flame-Oheň</span> kromě karty <span class="Flame-Oheň">Blesk</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Flood-Potopa');
      },
      blanks: function(card, hand) {
        return card.suit === 'Flame-Oheň' && card.name !== 'Blesk';
      },
      relatedSuits: ['Flood-Potopa', 'Flame-Oheň'],
      relatedCards: ['Blesk']
    },
    {
      id: 12,
      suit: 'Weather-Počasí',
      name: 'Sněhová vánice',
      strength: 30,
      bonus: null,
      penalty: '<span class="weather">Weather-Počasí</span><br />VYMAŽE všechny karty <span class="Flood-Potopa">Flood-Potopa</span>. <br />-5 za každou kartu <span class="army">Army-Armáda</span>, <span class="leader">Leader-Vůdce</span>, <span class="Beast-Tvor">Beast-Tvor</span> a <span class="Flame-Oheň">Flame-Oheň</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Leader-Vůdce') + hand.countSuit('Beast-Tvor') + hand.countSuit('Flame-Oheň');
        if (!hand.containsId(25)) { // clears the word 'Army-Armáda' from the penalty
          penaltyCards += hand.countSuit('Army-Armáda');
        }
        return -5 * penaltyCards;
      },
      blanks: function(card, hand) {
        return card.suit === 'Flood-Potopa';
      },
      relatedSuits: ['Leader-Vůdce', 'Beast-Tvor', 'Flame-Oheň', 'Army-Armáda', 'Flood-Potopa'],
      relatedCards: []
    },
    {
      id: 13,
      suit: 'Weather-Počasí',
      name: 'Kouř',
      strength: 27,
      bonus: null,
      penalty: '<span class="weather">Weather-Počasí</span><br />Tato karty je VYMAZÁNA, nemáš-li alespoň jednu kartu <span class="Flame-Oheň">Flame-Oheň</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Flame-Oheň');
      },
      relatedSuits: ['Flame-Oheň'],
      relatedCards: []
    },
    {
      id: 14,
      suit: 'Weather-Počasí',
      name: 'Tornádo',
      strength: 13,
      bonus: '<span class="weather">Weather-Počasí</span><br />+40, máš-li kartu <span class="weather">Bouře</span> a k ní buď kartu <span class="weather">Sněhová vánice</span> nebo kartu <span class="Flood-Potopa">Stoletá voda</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Bouře') && (hand.contains('Sněhová vánice') || hand.contains('Stoletá voda')) ? 40 : 0;
      },
      relatedSuits: ['Bouře'],
      relatedCards: ['Sněhová vánice', 'Stoletá voda']
    },
    {
      id: 15,
      suit: 'Weather-Počasí',
      name: 'Elementál vzduchu',
      strength: 4,
      bonus: '<span class="weather">Weather-Počasí</span><br />+15 za každou další kartu <span class="weather">Weather-Počasí</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Weather-Počasí', this.id);
      },
      relatedSuits: ['Weather-Počasí'],
      relatedCards: []
    },
    {
      id: 16,
      suit: 'Flame-Oheň',
      name: 'Požár',
      strength: 40,
      bonus: null,
      penalty: '<span class="flame">Flame-Oheň</span><br />VYMAŽE všechny karty kromě karet <span class="Flame-Oheň">Flame-Oheň</span>, <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>, <span class="weather">Weather-Počasí</span>, <span class="weapon">Weapon-Zbraň</span>, <span class="artifact">Artifact-Artefakt</span>, <span class="land">Hora</span>, <span class="Flood-Potopa">Stoletá voda</span>, <span class="Flood-Potopa">Ostrov</span>, <span class="Beast-Tvor">Jednorožec</span> a <span class="Beast-Tvor">Drak</span>.',
      blanks: function(card, hand) {
        return !(card.suit === 'Flame-Oheň' || card.suit === 'Wizard-Čaroděj' || card.suit === 'Weather-Počasí' ||
          card.suit === 'Weapon-Zbraň' || card.suit === 'Artifact-Artefakt' || card.suit === 'Wild-Divoká' || card.name === 'Hora' ||
          card.name === 'Stoletá voda' || card.name === 'Ostrov' || card.name === 'Jednorožec' || card.name === 'Drak');
      },
      relatedSuits: allSuits(),
      relatedCards: ['Hora', 'Stoletá voda', 'Ostrov', 'Jednorožec', 'Drak']
    },
    {
      id: 17,
      suit: 'Flame-Oheň',
      name: 'Svíčka',
      strength: 2,
      bonus: '<span class="flame">Flame-Oheň</span><br />+100, máš-li kartu <span class="artifact">Kniha proměn</span>, <span class="land">Zvonice</span> a alespoň jednu kartu <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Kniha proměn') && hand.contains('Zvonice') && hand.containsSuit('Wizard-Čaroděj') ? 100 : 0;
      },
      relatedSuits: ['Wizard-Čaroděj'],
      relatedCards: ['Kniha proměn', 'Zvonice']
    },
    {
      id: 18,
      suit: 'Flame-Oheň',
      name: 'Kovárna',
      strength: 9,
      bonus: '<span class="flame">Flame-Oheň</span><br />+9 za každou kartu <span class="weapon">Weapon-Zbraň</span> nebo kartu <span class="artifact">Artifact-Artefakt</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * (hand.countSuit('Weapon-Zbraň') + hand.countSuit('Artifact-Artefakt'));
      },
      relatedSuits: ['Weapon-Zbraň', 'Artifact-Artefakt'],
      relatedCards: []
    },
    {
      id: 19,
      suit: 'Flame-Oheň',
      name: 'Blesk',
      strength: 11,
      bonus: '<span class="flame">Flame-Oheň</span><br />+30, máš-li kartu <span class="weather">Bouře</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Bouře') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Bouře']
    },
    {
      id: 20,
      suit: 'Flame-Oheň',
      name: 'Elementál ohně',
      strength: 4,
      bonus: '<span class="flame">Flame-Oheň</span><br />+15 za každou další kartu <span class="Flame-Oheň">Flame-Oheň</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Flame-Oheň', this.id);
      },
      relatedSuits: ['Flame-Oheň'],
      relatedCards: []
    },
    {
      id: 21,
      suit: 'Army-Armáda',
      name: 'Rytířky',
      strength: 20,
      bonus: null,
      penalty: '<span class="army">Army-Armáda</span><br />-8 nemáš-li alespoň jednoho <span class="leader">Vůdce</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Leader-Vůdce') ? 0 : -8;
      },
      relatedSuits: ['Leader-Vůdce'],
      relatedCards: []
    },
    {
      id: 22,
      suit: 'Army-Armáda',
      name: 'Elfí lučištníci',
      strength: 10,
      bonus: '<span class="army">Army-Armáda</span><br />+5 nemáš-li žádné <span class="weather">Počasí</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Weather-Počasí') ? 0 : 5;
      },
      relatedSuits: ['Weather-Počasí'],
      relatedCards: []
    },
    {
      id: 23,
      suit: 'Army-Armáda',
      name: 'Těžká jízda',
      strength: 17,
      bonus: null,
      penalty: '<span class="army">Army-Armáda</span><br />-2 za každou jinou kartu <span class="land">Země</span>.',
      penaltyScore: function(hand) {
        return -2 * hand.countSuit('Land-Země');
      },
      relatedSuits: ['Land-Země'],
      relatedCards: []

    },
    {
      id: 24,
      suit: 'Army-Armáda',
      name: 'Trpasličí pěchota',
      strength: 15,
      bonus: null,
      penalty: '<span class="army">Army-Armáda</span><br />-2 za každou jinou kartu <span class="army">Army-Armáda</span>.',
      penaltyScore: function(hand) {
        if (!hand.containsId(25)) { // clears the word 'Army-Armáda' from the penalty
          return -2 * hand.countSuitExcluding('Army-Armáda', this.id);
        }
        return 0;
      },
      relatedSuits: ['Army-Armáda'],
      relatedCards: []
    },
    {
      id: 25,
      suit: 'Army-Armáda',
      name: 'Hraničáři',
      strength: 5,
      bonus: '<span class="army">Army-Armáda</span><br />+10 každou kartu <span class="land">Země</span>. <br />ODSTRAŇUJE slovo <span class="army">Army-Armáda</span> ze všech postihů.',
      penalty: null,
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Land-Země');
      },
      relatedSuits: ['Land-Země', 'Army-Armáda'],
      relatedCards: []
    },
    {
      id: 26,
      suit: 'Wizard-Čaroděj',
      name: 'Sběratel',
      strength: 7,
      bonus: '<span class="wizard">Wizard-Čaroděj</span><br />+10 za tři různé karty stejné barvy, +40 za čtyři různé karty stejné barvy, +100 za pět různých karet stejné barvy.',
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
      suit: 'Wizard-Čaroděj',
      name: 'Pán šelem',
      strength: 9,
      bonus: '<span class="wizard">Wizard-Čaroděj</span><br />+9 za každou kartu <span class="Beast-Tvor">Tvor</span>. <br />ODSTRAŇUJE postihy na všech kartách <span class="Beast-Tvor">Tvor</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * hand.countSuit('Beast-Tvor');
      },
      clearsPenalty: function(card) {
        return card.suit === 'Beast-Tvor';
      },
      relatedSuits: ['Beast-Tvor'],
      relatedCards: []
    },
    {
      id: 28,
      suit: 'Wizard-Čaroděj',
      name: 'Nekromant',
      strength: 3,
      bonus: '<span class="wizard">Wizard-Čaroděj</span><br />Na konci hry si z odkládacího prostoru můžeš vzít jakoukoli kartu <span class="army">Army-Armáda</span>, <span class="leader">Vůdce</span>, <span class="Wizard-Čaroděj">Wizard-Čaroděj</span> nebo <span class="Beast-Tvor">Tvor</span> a přidat si ji do ruky jako osmou kartu.',
      penalty: null,
      relatedSuits: ['Army-Armáda', 'Leader-Vůdce', 'Wizard-Čaroděj', 'Beast-Tvor'],
      relatedCards: []
    },
    {
      id: 29,
      suit: 'Wizard-Čaroděj',
      name: 'Nejvyšší mág',
      strength: 25,
      bonus: null,
      penalty: '<span class="wizard">Wizard-Čaroděj</span><br />-10 za každou další kartu <span class="leader">Vůdce</span> nebo <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penaltyScore: function(hand) {
        return -10 * (hand.countSuit('Leader-Vůdce') + hand.countSuitExcluding('Wizard-Čaroděj', this.id));
      },
      relatedSuits: ['Leader-Vůdce', 'Wizard-Čaroděj'],
      relatedCards: []
    },
    {
      id: 30,
      suit: 'Wizard-Čaroděj',
      name: 'Kouzelnice',
      strength: 5,
      bonus: '<span class="wizard">Wizard-Čaroděj</span><br />+5 za každou kartu <span class="land">Země</span>, <span class="weather">Počasí</span>, <span class="Flood-Potopa">Potopa</span> a <span class="Flame-Oheň">Oheň</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 5 * (hand.countSuit('Land-Země') + hand.countSuit('Weather-Počasí') + hand.countSuit('Flood-Potopa') + hand.countSuit('Flame-Oheň'));
      },
      relatedSuits: ['Land-Země', 'Weather-Počasí', 'Flood-Potopa', 'Flame-Oheň'],
      relatedCards: []
    },
    {
      id: 31,
      suit: 'Leader-Vůdce',
      name: 'Král',
      strength: 8,
      bonus: '<span class="leader">Leader-Vůdce</span><br />+5, za každou kartu <span class="army">Army-Armáda</span>. <br />NEBO +20 za každou kartu <span class="army">Army-Armáda</span>, máš-li zároveň i kartu <span class="leader">Královna</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('Královna') ? 20 : 5) * hand.countSuit('Army-Armáda');
      },
      relatedSuits: ['Army-Armáda'],
      relatedCards: ['Královna']
    },
    {
      id: 32,
      suit: 'Leader-Vůdce',
      name: 'Královna',
      strength: 6,
      bonus: '<span class="leader">Leader-Vůdce</span><br />+5 za každou kartu <span class="army">Army-Armáda</span>. <br />NEBO +20 za každou kartu <span class="army">Army-Armáda</span>, máš-li zároveň i kartu <span class="leader">Král</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('Král') ? 20 : 5) * hand.countSuit('Army-Armáda');
      },
      relatedSuits: ['Army-Armáda'],
      relatedCards: ['Král']
    },
    {
      id: 33,
      suit: 'Leader-Vůdce',
      name: 'Princezna',
      strength: 2,
      bonus: '<span class="leader">Leader-Vůdce</span><br />+8 za každou kartu <span class="army">Army-Armáda</span>, <span class="Wizard-Čaroděj">Wizard-Čaroděj</span> nebo další kartu <span class="leader">Leader-Vůdce</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 8 * (hand.countSuit('Army-Armáda') + hand.countSuit('Wizard-Čaroděj') + hand.countSuitExcluding('Leader-Vůdce', this.id));
      },
      relatedSuits: ['Army-Armáda', 'Wizard-Čaroděj', 'Leader-Vůdce'],
      relatedCards: []
    },
    {
      id: 34,
      suit: 'Leader-Vůdce',
      name: 'Velitel',
      strength: 4,
      bonus: '<span class="leader">Leader-Vůdce</span><br />Součet základních sil všech karet <span class="army">Army-Armáda</span>, které máš.',
      penalty: null,
      bonusScore: function(hand) {
        var total = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Army-Armáda') {
            total += card.strength;
          }
        }
        return total;
      },
      relatedSuits: ['Army-Armáda'],
      relatedCards: []
    },
    {
      id: 35,
      suit: 'Leader-Vůdce',
      name: 'Císařovna',
      strength: 15,
      bonus: '<span class="leader">Leader-Vůdce</span><br />+10 za každou kartu <span class="army">Army-Armáda</span>.',
      penalty: '-5 za každou další kartu <span class="leader">Leader-Vůdce</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Army-Armáda');
      },
      penaltyScore: function(hand) {
        return -5 * hand.countSuitExcluding('Leader-Vůdce', this.id);
      },
      relatedSuits: ['Army-Armáda', 'Leader-Vůdce'],
      relatedCards: []
    },
    {
      id: 36,
      suit: 'Beast-Tvor',
      name: 'Jednorožec',
      strength: 9,
      bonus: '<span class="beast">Beast-Tvor</span><br />+30, máš-li kartu <span class="leader">Princezna</span>. <br />NEBO +15, máš-li kartu <span class="leader">Císařovna</span>, <span class="leader">Královna</span> nebo <span class="leader">Kouzelnice</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Princess') ? 30 : (hand.contains('Empress') || hand.contains('Queen') || hand.contains('Enchantress')) ? 15 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Princezna', 'Císařovna', 'Královna', 'Kouzelnice']
    },
    {
      id: 37,
      suit: 'Beast-Tvor',
      name: 'Bazilišek',
      strength: 35,
      bonus: null,
      penalty: '<span class="beast">Beast-Tvor</span><br />VYMAŽE všechny karty <span class="army">Army-Armáda</span>, <span class="leader">Leader-Vůdce</span> a další karty <span class="Beast-Tvor">Beast-Tvor</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Army-Armáda' && !hand.containsId(25)) || // clears the word 'Army-Armáda' from the penalty
          card.suit === 'Leader-Vůdce' ||
          (card.suit === 'Beast-Tvor' && card.id !== this.id);
      },
      relatedSuits: ['Army-Armáda', 'Leader-Vůdce', 'Beast-Tvor'],
      relatedCards: []
    },
    {
      id: 38,
      suit: 'Beast-Tvor',
      name: 'Válečný oř',
      strength: 6,
      bonus: '<span class="beast">Beast-Tvor</span><br />+14, máš-li kartu <span class="leader">Leader-Vůdce</span> nebo kartu <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader-Vůdce') || hand.containsSuit('Wizard-Čaroděj') ? 14 : 0;
      },
      relatedSuits: ['Leader-Vůdce', 'Wizard-Čaroděj'],
      relatedCards: []
    },
    {
      id: 39,
      suit: 'Beast-Tvor',
      name: 'Drak',
      strength: 30,
      bonus: null,
      penalty: '<span class="beast">Beast-Tvor</span><br />-40, nemáš-li alespoň jednu kartu <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Wizard-Čaroděj') ? 0 : -40;
      },
      relatedSuits: ['Wizard-Čaroděj'],
      relatedCards: []
    },
    {
      id: 40,
      suit: 'Beast-Tvor',
      name: 'Hydra',
      strength: 12,
      bonus: '<span class="beast">Beast-Tvor</span><br />+28, máš-li kartu <span class="Flood-Potopa">Bažina</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Bažina') ? 28 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Bažina']
    },
    {
      id: 41,
      suit: 'Weapon-Zbraň',
      name: 'Válečná loď',
      strength: 23,
      bonus: '<span class="weapon">Weapon-Zbraň</span><br />ODSTRAŇUJE slovo <span class="army">Army-Armáda</span> ze všech postihů na všech kartách <span class="Flood-Potopa">Flood-Potopa</span>.',
      penalty: 'Je VYMAZÁNA, nemáš-li alespoň jednu kartu <span class="Flood-Potopa">Flood-Potopa</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Flood-Potopa');
      },
      relatedSuits: ['Army-Armáda', 'Flood-Potopa'],
      relatedCards: []
    },
    {
      id: 42,
      suit: 'Weapon-Zbraň',
      name: 'Magická hůl',
      strength: 1,
      bonus: '<span class="weapon">Weapon-Zbraň</span><br />+25, máš-li alespoň jednu kartu <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Wizard-Čaroděj') ? 25 : 0;
      },
      relatedSuits: ['Wizard-Čaroděj'],
      relatedCards: []
    },
    {
      id: 43,
      suit: 'Weapon-Zbraň',
      name: 'Kethský meč',
      strength: 7,
      bonus: '<span class="weapon">Weapon-Zbraň</span><br />+10, máš-li alespoň jednu kartu <span class="leader">Leader-Vůdce</span>. <br />NEBO +40, máš-li kartu <span class="leader">Leader-Vůdce</span> a k ní kartu <span class="artifact">Kethský štít</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader-Vůdce') ? (hand.contains('Kethský štít') ? 40 : 10) : 0;
      },
      relatedSuits: ['Leader-Vůdce'],
      relatedCards: ['Kethský štít']
    },
    {
      id: 44,
      suit: 'Weapon-Zbraň',
      name: 'Elfský luk',
      strength: 3,
      bonus: '<span class="weapon">Weapon-Zbraň</span><br />+30, máš-li kartu <span class="army">Elfí lučištník</span>, <span class="leader">Velitel</span> nebo <span class="Wizard-Čaroděj">Pán šelem</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Elfí lučištník') || hand.contains('Velitel') || hand.contains('Pán šelem') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Elfí lučištník', 'Velitel', 'Pán šelem']
    },
    {
      id: 45,
      suit: 'Weapon-Zbraň',
      name: 'Bojová vzducholoď',
      strength: 35,
      bonus: null,
      penalty: '<span class="weapon">Weapon-Zbraň</span><br />Je VYMAZÁNA, nemáš-li alespoň jednu kartu <span class="army">Army-Armáda</span>. <br />Je VYMAZÁNA, máš-li jakoukoli kartu <span class="weather">Weather-Počasí</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Army-Armáda') || hand.containsSuit('Weather-Počasí');
      },
      relatedSuits: ['Army-Armáda', 'Weather-Počasí'],
      relatedCards: []
    },
    {
      id: 46,
      suit: 'Artifact-Artefakt',
      name: 'Kethský štít',
      strength: 4,
      bonus: '<span class="artifact">Artifact-Artefakt</span><br />+15 máš-li alespoň jednu kartu <span class="leader">Leader-Vůdce</span>. <br />NEBO +40, máš-li kartu <span class="leader">Leader-Vůdce</span> a kartu <span class="weapon">Kethský meč</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader-Vůdce') ? (hand.contains('Sword of Keth') ? 40 : 15) : 0;
      },
      relatedSuits: ['Leader-Vůdce'],
      relatedCards: ['Sword of Keth']
    },
    {
      id: 47,
      suit: 'Artifact-Artefakt',
      name: 'Krystal řádu',
      strength: 5,
      bonus: '<span class="artifact">Artifact-Artefakt</span><br />+10 za postupku ze 3 karet, +30 za postupku ze 4 karet, +60 za postupku z 5 karet, +100 za postupku ze 6 karet, +150 za postupku ze 7 karet. Počítají se ihned po sobě jdoucí základní síly karet.',
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
      suit: 'Artifact-Artefakt',
      name: 'Strom světa',
      strength: 2,
      bonus: '<span class="artifact">Artifact-Artefakt</span><br />+50, pokud mají všechny NEVYMAZANÉ karty rozdílné barvy.',
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
      suit: 'Artifact-Artefakt',
      name: 'Kniha proměn',
      strength: 3,
      bonus: '<span class="artifact">Artifact-Artefakt</span><br />Můžeš změnit barvu jedné karty ve své ruce. Její jméno, bonus a postihy zůstávají.',
      penalty: null,
      action: 'Vyber kartu, jejíž barvu chceš změnit.',
      relatedSuits: [], // empty because the main reason for relatedSuits is to determine how to use 'Book of Changes'
      relatedCards: []
    },
    {
      id: 50,
      suit: 'Artifact-Artefakt',
      name: 'Ochranná runa',
      strength: 1,
      bonus: '<span class="artifact">Artifact-Artefakt</span><br />ODSTRANÍ postihy ze všech karet v ruce.',
      penalty: null,
      clearsPenalty: function(card) {
        return true;
      },
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 51,
      suit: 'Wild-Divoká',
      name: 'Měňavec',
      strength: 0,
      bonus: '<span class="wild">Wild-Divoká</span><br /><b>Měňavec</b> může zkopírovat jméno a barvu jakékoliv karty  <span class="artifact">Artifact-Artefakt</span>, <span class="leader">Leader-Vůdce</span>, <span class="Wizard-Čaroděj">Wizard-Čaroděj</span>, <span class="weapon">Weapon-Zbraně</span> nebo <span class="Beast-Tvor">Beast-Tvor</span> ve hře. <br />Základní síla, bonusy ani postihy se nekopírují.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chceš zkopírovat.',
      relatedSuits: ['Artifact-Artefakt', 'Leader-Vůdce', 'Wizard-Čaroděj', 'Weapon-Zbraň', 'Beast-Tvor'].sort(),
      relatedCards: []
    },
    {
      id: 52,
      suit: 'Wild-Divoká',
      name: 'Přelud',
      strength: 0,
      bonus: '<span class="wild">Wild-Divoká</span><br /><b>Přelud</b> může zkopírovat jméno a barvu jakékoliv karty  <span class="army">Army-Armáda</span>, <span class="land">Land-Země</span>, <span class="weather">Waether-Počasí</span>, <span class="Flood-Potopa">Potopa</span> nebo <span class="Flame-Oheň">Flame-Oheň</span> ve hře. <br />Základní síla, bonusy ani postihy se nekopírují.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chceš zkopírovat.',
      relatedSuits: ['Army-Armáda', 'Land-Země', 'Weather-Počasí', 'Flood-Potopa', 'Flame-Oheň'].sort(),
      relatedCards: []
    },
    {
      id: 53,
      suit: 'Wild-Divoká',
      name: 'Dvojník',
      strength: 0,
      bonus: '<span class="wild">Wild-Divoká</span><br /><b>Dvojník</b> může kopírovat jmeno, barvu, základní sílu, ALE NIKOLI BONUS jakékoli jiné karty ve tvé ruce.',
      penalty: null,
      action: 'Vyber z ruky kartu, kterou chceš zkopírovat.',
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 54,
      suit: 'Wizard-Čaroděj',
      name: 'Šašek',
      strength: 3,
      bonus: '<span class="wizard">Wizard-Čaroděj</span><br />+3 za každou další kartu ve tvé ruce s lichou základní silou. <br />NEBO +50, mají-li všechny karty ve tvé ruce lichou základní sílu .',
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
  return ['Land-Země', 'Flood-Potopa', 'Weather-Počasí', 'Flame-Oheň', 'Army-Armáda', 'Wizard-Čaroděj', 'Leader-Vůdce', 'Beast-Tvor', 'Weapon-Zbraň', 'Artifact-Artefakt', 'Wild-Divoká'].sort();
}

var NONE = -1;
var ISLAND = 9;
var NECROMANCER = 28;
var BOOK_OF_CHANGES = 49;
var SHAPESHIFTER = 51;
var MIRAGE = 52;
var DOPPELGANGER = 53;

var ACTION_ORDER = [DOPPELGANGER, MIRAGE, SHAPESHIFTER, BOOK_OF_CHANGES, ISLAND];
