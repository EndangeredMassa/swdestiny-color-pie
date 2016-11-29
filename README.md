# Star Wars Destiny: Color Pie Analysis

This project seeks to understand the color pie of the Star Wars Destiny card/dice game.

A color pie is a breakdown of what capabilities exist (and the degree to which they exist) in the different factions of a game.


## Methodology

The data comes from [swdestinydb.com's source](https://github.com/fafranco82/swdestinydb-json-data/blob/master/set/AW.json).

The rules text of cards is scanned for certain terms that are used to automatically tag cards. This includes ability keywords, like "Guardian", but not things like "discard" because it's not clear (with simple string searching) if you are discarding a card to pay a cost or your opponent is discarding a card.

Not everything can be automatically tagged in this way because it can be unclear. So, we also have many manual tags per specific cards. Judgement calls have to be made. In general, this was done pretty liniently. If a card can in any way remove an opponent's die, then it's tagged with `remove-die`, for example.

The die faces of cards (if applicable) are automatically converted to the appropriate tags.

The card types are also used as tags.

These three tag sets can be analyzed individually or as a combined, unique set of tags.

## Analysis

The results are different sets of cards that can be broken down into tag counts within that set. See [ANALYSIS.md](ANALYSIS.md) for a full breakdown.

The larger insights are listed below.

```
Red:

- LOW: upgrades
- LOW: remove dice
- HIGH: ranged damage
- HIGH: guardian
- HIGH: battlefield
- HIGH: draw cards

Blue:

- HIGH: requiring blue cards
- HIGH: shields
- HIGH: melee damage
- HIGH: unblockable
- HIGH: hand size

Yellow:

- HIGH: remove dice
- HIGH: ambush

General:

- HIGH: battlefield


Hero:

- HIGH: shields
- HIGH: ambush
- HIGH: regrow cards from discard

Villain:

- HIGH: guardian
- HIGH: unblockable
- HIGH: hand size
- HIGH: remove shield
- HIGH: remove resource

Neutral:

- HIGH: upgrade
- HIGH: requiring colored cards
- HIGH: resource
- HIGH: battlefield
```



