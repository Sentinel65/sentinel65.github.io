$(document).ready(function() {
  assertScoreByCode('6,9,16,53+9:16', 95, 'Fontana zivota kopiruje silu karty Pozar, Dvojnik nemuze take zkopirovat kartu Pozar, protoze ta by vymazala kartu Fontana zivota') 
  assertScoreByCode('37,53+', 35, 'Dvojnik nemuze kopirovat Baziliska, obe karty se vymazou')
  assertScoreByCode('4,6,27,36,37,44,53+53:37', 199);  
  assertScoreByCode('3,4,6,9,16,28,37,53+9:16,53:9', 189);
  assertScoreByName(['Snehova vanice', 'Stoleta voda', 'Elfi lucistnici'], 35);
  assertScoreByName(['Kour', 'Trpaslici pechota', 'Bojova vzducholod'], 50);
  assertScoreByName(['Svicka', 'Kour', 'Trpaslici pechota', 'Bojova vzducholod'], 44);
  assertScoreByCode('21,24,25,31,32,43,46+', 265);
  assertScoreByCode('6,7,8,9,10,11,26+', 326);
  assertScoreByCode('18,22,31,32,43,46,47+', 351, 'Max pocet bodu bez speciálnich karet?');
  assertScoreByCode('1,8,13,14,15,16,52+52:11', 260, 'Pravidla priklad I')
  assertScoreByCode('3,17,32,43,46,47,49+49:47:Carodej', 380, 'Pravidla priklad II');
  assertScoreByCode('3,17,28,38,43,46,47,49+49:3:Vudce', 397, 'Nejvetsi bodovy zisk na ruce?');
  assertScoreByCode('2,3,5,17,26,28,47,49+49:17:Zeme', 388, 'Druhy nejvetsi');
  assertScoreByCode('3,17,28,32,43,46,47,49+49:3:Armada', 388, 'Druhy nejvetsi');
  assertScoreByCode('28,29,31,32,34,35,51,53+51:31,53:29', -74, 'Nejhorsi bodovy zisk na ruce?');
  assertScoreByCode('37,53+53:37', 0, '2 Bazilisek by se mel pri kopirovani Dvojnikem navzajem vymazat');
  assertScoreByCode('24,53+53:24', 26, '2 Trpaslici pechota se bude s Dvojnikem navzajem postihovat');
  assertScoreByCode('9,12,16,37+9:16', 95, 'Ostrov lze pouzit, i kdyz je vymazany');
  assertScoreByCode('9,16+9:16,', 54, 'Ostrov a Pozar');
  assertScoreByCode('10,53+53:10', 23, 'Elementálove pocitaji s Dvojnikem');
  assertScoreByCode('26,27,30,36,38,39,40+', 193, 'Sberatel muze bodovat vicekrat');
  assertScoreByCode('26,46,47,51,53+51:46,53:46', 20, 'Sberatel neboduje u duplikovanych karet');
  assertScoreByCode('22,31,36,43,44,46,47+', 206, 'Krystal radu muze bodovat vicekrat')
});

function assertScoreByName(cardNames, expectedScore, message) {
  hand.clear();
  for (const cardName of cardNames) {
    hand.addCard(deck.getCardByName(cardName));
  }
  assertScore(hand, expectedScore, message);
}

function assertScoreByCode(code, expectedScore, message) {
  hand.clear();
  hand.loadFromString(code);
  assertScore(hand, expectedScore, message);
}

function assertScore(hand, expectedScore, message) {
  var score = hand.score();
  if (score === expectedScore) {
    $('#tests').append('<li class="list-group-item list-group-item-success"><b>TEST OK</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; zisk ' + score + ' bodu' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST CHYBA:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; zisk ' + score + ' bodu (ocekavano: ' + expectedScore + ')' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  }
}
