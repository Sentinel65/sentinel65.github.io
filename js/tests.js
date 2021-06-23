$(document).ready(function() {
  assertScoreByName(['Sněhová vánice', 'Stoletá voda', 'Elfí lučištníci'], 35);
  assertScoreByName(['Kouř', 'Trpasličí pěchota', 'Bojová vzducholoď'], 50);
  assertScoreByName(['Svíčka', 'Kouř', 'Trpasličí pěchota', 'Bojová vzducholoď'], 44);
  assertScoreByCode('21,24,25,31,32,43,46+', 265);
  assertScoreByCode('6,7,8,9,10,11,26+', 326);
  assertScoreByCode('18,22,31,32,43,46,47+', 351, 'Max počet bodů bez speciálních karet?');
  assertScoreByCode('1,8,13,14,15,16,52+52:11', 260, 'Pravidla příklad I')
  assertScoreByCode('3,17,32,43,46,47,49+49:47:Wizard-Čaroděj', 380, 'Pravidla přílad II');
  assertScoreByCode('3,17,28,38,43,46,47,49+49:3:Leader-Vůdce', 397, 'Největší bodový zisk na ruce?');
  assertScoreByCode('2,3,5,17,26,28,47,49+49:17:Land-Země', 388, 'Druhý největší');
  assertScoreByCode('3,17,28,32,43,46,47,49+49:3:Army-Armáda', 388, 'Druhý největší');
  assertScoreByCode('28,29,31,32,34,35,51,53+51:31,53:29', -74, 'Nejhorší bodový zisk na ruce?');
  assertScoreByCode('37,53+53:37', 0, '2 Bazilišek by se měl při kopírování Dvojníkem navzájem vymazat');
  assertScoreByCode('24,53+53:24', 26, '2 Trpasličí pěchota se bude s Dvojníkem navzájem postihovat');
  assertScoreByCode('9,12,16,37+9:16', 95, 'OStrov lze použít, i když je vymazaný');
  assertScoreByCode('10,53+53:10', 23, 'Elementálové počítají s Dvojníkem');
  assertScoreByCode('26,27,30,36,38,39,40+', 193, 'Sběratel může bodovat vícekrát');
  assertScoreByCode('26,46,47,51,53+51:46,53:46', 20, 'Sběratel neboduje u duplikovaných karet');
  assertScoreByCode('22,31,36,43,44,46,47+', 206, 'Krystal řádu může bodovat vícekrát')
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
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; zisk ' + score + ' bodů' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST CHYBA:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; zisk ' + score + ' bodů (očekáváno: ' + expectedScore + ')' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  }
}
