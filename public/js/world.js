import { HealingPotion } from "./objects/HealingPotion.js";
import { Item } from "./objects/Item.js";
import { Location } from "./objects/Location.js";
import { LootItem } from "./objects/LootItem.js";
import { Monster } from "./objects/Monster.js";
import { Quest } from "./objects/Quest.js";
import { QuestCompletionItem } from "./objects/QuestCompletionItem.js";
import { Weapon } from "./objects/Weapon.js";

export const items = [];
export const monsters = [];
export const quests = [];
export const locations = [];

export const ITEM_IDS = {
  RUSTY_SWORD: 1,
  RAT_TAIL: 2,
  PIECE_OF_FUR: 3,
  SNAKE_FANG: 4,
  SNAKESKIN: 5,
  CLUB: 6,
  HEALING_POTION: 7,
  SPIDER_FANG: 8,
  SPIDER_SILK: 9,
  ADVENTURER_PASS: 10,
  KNIFE: 11,
};

export const MONSTER_IDS = {
  RAT: 1,
  SNAKE: 2,
  GIANT_SPIDER: 3,
};

export const QUEST_IDS = {
  CLEAR_ALCHEMIST_GARDEN: 1,
  CLEAR_FARMERS_FIELD: 2,
};

export const LOCATION_IDS = {
  HOME: 1,
  TOWN_SQUARE: 2,
  GUARD_POST: 3,
  ALCHEMIST_HUT: 4,
  ALCHEMISTS_GARDEN: 5,
  FARMHOUSE: 6,
  FARM_FIELD: 7,
  BRIDGE: 8,
  SPIDER_FIELD: 9,
};

function populateWorld() {
  populateItems();
  populateMonsters();
  populateQuests();
  populateLocations();
}

function populateItems() {
  items.push(
    new Weapon(ITEM_IDS.RUSTY_SWORD, "Rusty sword", "Rusty swords", 0, 5)
  );
  items.push(new Item(ITEM_IDS.RAT_TAIL, "Rat tail", "Rat tails"));
  items.push(new Item(ITEM_IDS.PIECE_OF_FUR, "Piece of fur", "Pieces of fur"));
  items.push(new Item(ITEM_IDS.SNAKE_FANG, "Snake fang", "Snake fangs"));
  items.push(new Item(ITEM_IDS.SNAKESKIN, "Snakeskin", "Snakeskins"));
  items.push(new Weapon(ITEM_IDS.CLUB, "Club", "Clubs", 3, 10));
  items.push(
    new HealingPotion(
      ITEM_IDS.HEALING_POTION,
      "Healing potion",
      "Healing potions",
      5
    )
  );
  items.push(new Item(ITEM_IDS.SPIDER_FANG, "Spider fang", "Spider fangs"));
  items.push(new Item(ITEM_IDS.SPIDER_SILK, "Spider silk", "Spider silks"));
  items.push(
    new Item(ITEM_IDS.ADVENTURER_PASS, "Adventurer pass", "Adventurer passes")
  );
  items.push(new Weapon(ITEM_IDS.KNIFE, "Knife", "Knives", 1, 3));
}

function populateMonsters() {
  const rat = new Monster(MONSTER_IDS.RAT, "Rat", 5, 3, 10, 3, 3);
  rat.LootTable.push(new LootItem(itemByID(ITEM_IDS.RAT_TAIL), 75, false));
  rat.LootTable.push(new LootItem(itemByID(ITEM_IDS.PIECE_OF_FUR), 75, true));

  const snake = new Monster(MONSTER_IDS.SNAKE, "Snake", 5, 3, 10, 3, 3);
  snake.LootTable.push(new LootItem(itemByID(ITEM_IDS.SNAKE_FANG), 75, false));
  snake.LootTable.push(new LootItem(itemByID(ITEM_IDS.SNAKESKIN), 75, true));

  const giantSpider = new Monster(
    MONSTER_IDS.GIANT_SPIDER,
    "Giant spider",
    20,
    5,
    40,
    10,
    10
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.SPIDER_FANG), 75, true)
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.SPIDER_SILK), 25, false)
  );

  monsters.push(rat);
  monsters.push(snake);
  monsters.push(giantSpider);
}

function populateQuests() {
  const clearAlchemistGarden = new Quest(
    QUEST_IDS.CLEAR_ALCHEMIST_GARDEN,
    "Clear the alchemist's garden",
    "Kill rats in the alchemist's garden and bring back 3 rat tails. You will receive a healing potion and 10 gold pieces.",
    20,
    10
  );

  clearAlchemistGarden.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_IDS.RAT_TAIL), 3)
  );

  clearAlchemistGarden.addRewardItems(itemByID(ITEM_IDS.HEALING_POTION));
  clearAlchemistGarden.addRewardItems(itemByID(ITEM_IDS.CLUB));

  const clearFarmersField = new Quest(
    QUEST_IDS.CLEAR_FARMERS_FIELD,
    "Clear the farmer's field",
    "Kill snakes in the farmer's field and bring back 3 snake fangs. You will receive an adventurer's pass and 20 gold pieces.",
    20,
    20
  );

  clearFarmersField.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_IDS.SNAKE_FANG), 3)
  );

  clearFarmersField.addRewardItems(itemByID(ITEM_IDS.ADVENTURER_PASS));

  quests.push(clearAlchemistGarden);
  quests.push(clearFarmersField);
}

function populateLocations() {
  const home = new Location(
    LOCATION_IDS.HOME,
    "Home",
    "Your house. You really need to clean up the place."
  );

  const townSquare = new Location(
    LOCATION_IDS.TOWN_SQUARE,
    "Town square",
    "You see a fountain."
  );

  const alchemistHut = new Location(
    LOCATION_IDS.ALCHEMIST_HUT,
    "Alchemist's hut",
    "There are many strange plants on the shelves."
  );
  alchemistHut.QuestAvailableHere = questByID(QUEST_IDS.CLEAR_ALCHEMIST_GARDEN);

  const alchemistsGarden = new Location(
    LOCATION_IDS.ALCHEMISTS_GARDEN,
    "Alchemist's garden",
    "Many plants are growing here."
  );
  alchemistsGarden.MonsterLivingHere = monsterByID(MONSTER_IDS.RAT);

  const farmhouse = new Location(
    LOCATION_IDS.FARMHOUSE,
    "Farmhouse",
    "There is a small farmhouse, with a farmer in front."
  );
  farmhouse.QuestAvailableHere = questByID(QUEST_IDS.CLEAR_FARMERS_FIELD);

  const farmersField = new Location(
    LOCATION_IDS.FARM_FIELD,
    "Farmer's field",
    "You see rows of vegetables growing here."
  );
  farmersField.MonsterLivingHere = monsterByID(MONSTER_IDS.SNAKE);

  const guardPost = new Location(
    LOCATION_IDS.GUARD_POST,
    "Guard post",
    "There is a large, tough-looking guard here.",
    itemByID(ITEM_IDS.ADVENTURER_PASS)
  );

  const bridge = new Location(
    LOCATION_IDS.BRIDGE,
    "Bridge",
    "A stone bridge crosses a wide river."
  );

  const spiderField = new Location(
    LOCATION_IDS.SPIDER_FIELD,
    "Forest",
    "You see spider webs covering covering the trees in this forest."
  );
  spiderField.MonsterLivingHere = monsterByID(MONSTER_IDS.GIANT_SPIDER);

  home.LocationToNorth = townSquare;

  townSquare.LocationToNorth = alchemistHut;
  townSquare.LocationToSouth = home;
  townSquare.LocationToEast = guardPost;
  townSquare.LocationToWest = farmhouse;

  farmhouse.LocationToEast = townSquare;
  farmhouse.LocationToWest = farmersField;

  farmersField.LocationToEast = farmhouse;

  alchemistHut.LocationToSouth = townSquare;
  alchemistHut.LocationToNorth = alchemistsGarden;

  alchemistsGarden.LocationToSouth = alchemistHut;

  guardPost.LocationToEast = bridge;
  guardPost.LocationToWest = townSquare;

  bridge.LocationToWest = guardPost;
  bridge.LocationToEast = spiderField;

  spiderField.LocationToWest = bridge;

  locations.push(home);
  locations.push(townSquare);
  locations.push(guardPost);
  locations.push(alchemistHut);
  locations.push(alchemistsGarden);
  locations.push(farmhouse);
  locations.push(farmersField);
  locations.push(bridge);
  locations.push(spiderField);
}

export function itemByID(id) {
  return items.find((item) => item.ID === id) || null;
}

export function monsterByID(id) {
  return monsters.find((monster) => monster.ID === id) || null;
}

export function questByID(id) {
  return quests.find((quest) => quest.ID === id) || null;
}

export function locationByID(id) {
  return locations.find((location) => location.ID === id) || null;
}

// create world
populateWorld();
