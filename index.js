'use strict';

const _ = require('lodash');
const cards = require('./cards.json');

const taggableTerms = {
  'guardian': 'guardian',
  'redeploy': 'redeploy',
  'ambush': 'ambush',
  ' special': 'special',
  'unblockable': 'unblockable',
  'play restrictions': 'ignore-play-restrictions',
  'red ': 'play-limited:color',
  'blue ': 'play-limited:color',
  'yellow ': 'play-limited:color',
  'draw a card': 'draw',
  'draw 2 card': 'draw',
  'draw card': 'draw',
  'battlefield': 'battlefield',
  'upgrade': 'upgrade',
  'weapon': 'weapon',
  'support': 'support',
  'ranged': 'ranged',
  'melee': 'melee',
  'disrupt': 'disrupt',
  'vehicle': 'vehicle',
  'resolve': 'resolve',
  'equipment': 'equipment'
};


// from abilities, not dice
const manualTags = {
  '01004': 'focus',
  '01005': 'remove-support',
  '01006': 'remove-shield',
  '01009': 'shield',
  '01010': ['discard', 'discard:hand'],
  '01011': 'peek',
  '01012': 'reroll-opponent',
  '01013': 'focus-opponent',
  '01014': 'focus-opponent',
  '01018': ['remove-die', 'bonus-action'],
  '01020': 'reroll',
  '01021': 'activate',
  '01024': 'area-of-effect',
  '01026': ['remove-shield', 'remove-die'],
  '01027': 'discard:hand',
  '01028': 'reroll',
  '01031': 'hand-count',
  '01033': ['discard', 'discard:hand'],
  '01037': 'shield',
  '01038': 'bonus-action',
  '01039': 'shield',
  '01040': 'shield',
  '01041': ['shield', 'unblockable'],
  '01043': 'reroll',
  '01044': 'remove-die',
  '01045': 'ignore-deck-restrictions',
  '01046': ['ambush', 'shield'],
  '01048': ['discard', 'discard:deck'],
  '01049': ['regrow', 'regrow:event'],
  '01050': 'shield',
  '01051': 'remove-die',
  '01052': 'reroll-opponent',
  '01057': 'remove-die',
  '01058': ['shield', 'resource'],
  '01060': 'hand-count-opponent',
  '01061': ['reroll', 'reroll-opponent'],
  '01062': 'focus',
  '01066': ['shield', 'remove-die'],
  '01067': 'area-of-effect',
  '01068': 'guardian',
  '01069': 'remove-die',
  '01070': ['regrow', 'regrow:character'],
  '01071': 'remove-resource',
  '01072': ['peek', 'discard', 'discard:hand'],
  '01073': 'reroll-opponent',
  '01074': 'bonus-action',
  '01075': 'remove-die',
  '01076': 'resource',
  '01077': 'remove-resource',
  '01079': ['remove-resource', 'discard', 'discard:hand'],
  '01080': 'hand-count',
  '01081': 'resource',
  '01082': 'remove-die',
  '01083': 'focus',
  '01084': 'remove-shield',
  '01085': 'remove-die',
  '01086': 'hand-count',
  '01088': 'hand-count',
  '01089': 'reroll',
  '01090': 'shield',
  '01091': 'focus',
  '01094': 'remove-upgrade',
  '01097': 'remove-die',
  '01098': ['discard', 'discard:hand', 'hand-count'],
  '01099': 'unblockable',
  '01100': 'resource',
  '01101': 'resource',
  '01102': 'remove-die',
  '01103': 'discard',
  '01104': 'remove-die',
  '01105': 'heal',
  '01106': 'activate',
  '01107': 'focus',
  '01109': ['regrow', 'regrow:upgrade'],
  '01110': 'end-action-phase',
  '01111': ['exhaust-support'],
  '01112': 'remove-support',
  '01113': 'shield',
  '01114': 'remove-die',
  '01115': 'shield',
  '01116': 'remove-die',
  '01117': 'guardian',
  '01118': 'character-exhaust',
  '01119': 'discard:deck',
  '01120': ['regrow', 'regrow:event'],
  '01121': 'shield',
  '01122': 'unblockable',
  '01123': ['discard', 'discard:deck', 'draw-opponent'],
  '01126': 'reroll-opponent',
  '01127': 'draw-opponent',
  '01129': 'end-action-phase',
  '01130': 'remove-die',
  '01131': 'remove-die',
  '01132': ['regrow', 'regrow:upgrade', 'regrow:support'],
  '01133': 'remove-die',
  '01134': 'resource',
  '01135': ['reroll', 'resource'],
  '01136': 'peek',
  '01137': 'heal',
  '01139': 'shield',
  '01142': 'resource',
  '01143': 'activate',
  '01145': 'remove-die',
  '01146': ['reroll', 'reroll-opponent'],
  '01147': 'remove-die',
  '01149': 'focus',
  '01151': 'focus',
  '01153': 'remove-die',
  '01154': 'discard',
  '01155': 'remove-die',
  '01156': 'remove-die',
  '01157': 'shield',
  '01159': 'remove-die',
  '01160': 'remove-die',
  '01161': 'reroll-opponent',
  '01162': ['reroll', 'reroll-opponent'],
  '01164': 'shield'
};

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function noBattlefields(card) {
  return card.type_code !== 'batttlefield';
}

function tagAbilities(card) {
  let tags = [];

  const manualTagSet = manualTags[card.code];
  if (manualTagSet) {
    if (isArray(manualTagSet)) {
      tags = tags.concat(manualTagSet);
    } else {
      tags.push(manualTagSet);
    }
  }

  _.forIn(taggableTerms, (tag, term) => {
    if (card.text && card.text.toLowerCase().indexOf(term) > -1) {
      tags.push(tag);
    }
  });

  tags = _.uniq(tags);

  if (_.includes(tags, 'ranged') && _.includes(tags, 'melee')) {
    tags = _.pull(tags, 'ranged', 'melee');
  }

  return tags;
}

const sideTags = {
  'MD': 'melee',
  'RD': 'ranged',
  'F': 'focus',
  'Dr': 'disrupt',
  'Dc': 'discard',
  'Sh': 'shield',
  'R': 'resource'
};

function tagDice(card) {
  if (!card.sides) {
    return [];
  }

  let tags = [];

  card.sides.forEach((side) => {
    _.forIn(sideTags, (tag, id) => {
      if (side.indexOf(id) > -1) {
        tags.push(tag);
      }
    });
  });

  tags = _.uniq(tags);

  if (_.includes(tags, 'ranged') && _.includes(tags, 'melee')) {
    tags = _.pull(tags, 'ranged', 'melee');
  }

  return tags;
}

function tagTypes(card) {
  if (card.type_code && card.type_code !== 'character' && card.type_code !== 'event') {
    return [card.type_code];
  }

  return [];
}

const taggedCards = cards.filter(noBattlefields).map((originalCard) => {
  const card = _.clone(originalCard);
  card.abilityTags = tagAbilities(card);;
  card.diceTags = tagDice(card);
  card.typeTags = tagTypes(card);
  card.tags = _.uniq(card.abilityTags.concat(card.diceTags).concat(card.typeTags));
  return card;
});


function topTags(cards) {
  const countedBy = _.countBy(_.flatten(_.map(cards, (card) => {
    return card.tags;
  })));

  const countedTags = [];
  _.forIn(countedBy, (count, label) => {
    countedTags.push({count, label});
  });

  const sortedTags = _.sortBy(countedTags, tag => -tag.count);

  return _.filter(sortedTags, tag => tag.count > 2);
}

const data = _.map(taggedCards, card => _.pick(card, 'affiliation_code', 'faction_code', 'tags'));

const redCards = _.filter(data, card => card.faction_code === 'red');
const yellowCards = _.filter(data, card => card.faction_code === 'yellow');
const blueCards = _.filter(data, card => card.faction_code === 'blue');
const generalCards = _.filter(data, card => card.faction_code === 'gray');

const villainCards = _.filter(data, card => card.affiliation_code === 'villain');
const heroCards = _.filter(data, card => card.affiliation_code === 'hero');
const neutralCards = _.filter(data, card => card.affiliation_code === 'neutral');

console.log('# Abilities, Dice, and Card Types Care About');
console.log('----------------------');
console.log('Yellow: \n', topTags(yellowCards));
console.log('Red: \n', topTags(redCards));
console.log('Blue: \n', topTags(blueCards));
console.log('General: \n', topTags(generalCards));
console.log('----------------------');
console.log('Hero: \n', topTags(heroCards));
console.log('Villain: \n', topTags(villainCards));
console.log('Neutral: \n', topTags(neutralCards));


