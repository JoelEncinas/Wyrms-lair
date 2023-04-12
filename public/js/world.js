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

const ITEM_ID_RUSTY_SWORD = 1;
const ITEM_ID_RAT_TAIL = 2;
const ITEM_ID_PIECE_OF_FUR = 3;
const ITEM_ID_SNAKE_FANG = 4;
const ITEM_ID_SNAKESKIN = 5;
const ITEM_ID_CLUB = 6;
const ITEM_ID_HEALING_POTION = 7;
const ITEM_ID_SPIDER_FANG = 8;
const ITEM_ID_SPIDER_SILK = 9;
const ITEM_ID_ADVENTURER_PASS = 10;

const MONSTER_ID_RAT = 1;
const MONSTER_ID_SNAKE = 2;
const MONSTER_ID_GIANT_SPIDER = 3;

const QUEST_ID_CLEAR_ALCHEMIST_GARDEN = 1;
const QUEST_ID_CLEAR_FARMERS_FIELD = 2;

const LOCATION_ID_HOME = 1;
const LOCATION_ID_TOWN_SQUARE = 2;
const LOCATION_ID_GUARD_POST = 3;
const LOCATION_ID_ALCHEMIST_HUT = 4;
const LOCATION_ID_ALCHEMISTS_GARDEN = 5;
const LOCATION_ID_FARMHOUSE = 6;
const LOCATION_ID_FARM_FIELD = 7;
const LOCATION_ID_BRIDGE = 8;
const LOCATION_ID_SPIDER_FIELD = 9;

function populateWorld() {
  populateItems();
  populateMonsters();
  populateQuests();
  populateLocations();
}

function populateItems() {
  items.push(
    new Weapon(ITEM_ID_RUSTY_SWORD, "Rusty sword", "Rusty swords", 0, 5)
  );
  items.push(new Item(ITEM_ID_RAT_TAIL, "Rat tail", "Rat tails"));
  items.push(new Item(ITEM_ID_PIECE_OF_FUR, "Piece of fur", "Pieces of fur"));
  items.push(new Item(ITEM_ID_SNAKE_FANG, "Snake fang", "Snake fangs"));
  items.push(new Item(ITEM_ID_SNAKESKIN, "Snakeskin", "Snakeskins"));
  items.push(new Weapon(ITEM_ID_CLUB, "Club", "Clubs", 3, 10));
  items.push(
    new HealingPotion(
      ITEM_ID_HEALING_POTION,
      "Healing potion",
      "Healing potions",
      5
    )
  );
  items.push(new Item(ITEM_ID_SPIDER_FANG, "Spider fang", "Spider fangs"));
  items.push(new Item(ITEM_ID_SPIDER_SILK, "Spider silk", "Spider silks"));
  items.push(
    new Item(ITEM_ID_ADVENTURER_PASS, "Adventurer pass", "Adventurer passes")
  );
}

function populateMonsters() {
  const rat = new Monster(MONSTER_ID_RAT, "Rat", 5, 3, 10, 3, 3);
  rat.LootTable.push(new LootItem(itemByID(ITEM_ID_RAT_TAIL), 75, false));
  rat.LootTable.push(new LootItem(itemByID(ITEM_ID_PIECE_OF_FUR), 75, true));

  const snake = new Monster(MONSTER_ID_SNAKE, "Snake", 5, 3, 10, 3, 3);
  snake.LootTable.push(new LootItem(itemByID(ITEM_ID_SNAKE_FANG), 75, false));
  snake.LootTable.push(new LootItem(itemByID(ITEM_ID_SNAKESKIN), 75, true));

  const giantSpider = new Monster(
    MONSTER_ID_GIANT_SPIDER,
    "Giant spider",
    20,
    5,
    40,
    10,
    10
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_ID_SPIDER_FANG), 75, true)
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_ID_SPIDER_SILK), 25, false)
  );

  monsters.push(rat);
  monsters.push(snake);
  monsters.push(giantSpider);
}

function populateQuests() {
  const clearAlchemistGarden = new Quest(
    QUEST_ID_CLEAR_ALCHEMIST_GARDEN,
    "Clear the alchemist's garden",
    "Kill rats in the alchemist's garden and bring back 3 rat tails. You will receive a healing potion and 10 gold pieces.",
    20,
    10
  );

  clearAlchemistGarden.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_ID_RAT_TAIL), 3)
  );

  clearAlchemistGarden.RewardItem = itemByID(ITEM_ID_HEALING_POTION);

  const clearFarmersField = new Quest(
    QUEST_ID_CLEAR_FARMERS_FIELD,
    "Clear the farmer's field",
    "Kill snakes in the farmer's field and bring back 3 snake fangs. You will receive an adventurer's pass and 20 gold pieces.",
    20,
    20
  );

  clearFarmersField.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_ID_SNAKE_FANG), 3)
  );

  clearFarmersField.RewardItem = itemByID(ITEM_ID_ADVENTURER_PASS);

  quests.push(clearAlchemistGarden);
  quests.push(clearFarmersField);
}

function populateLocations() {
  const home = new Location(
    LOCATION_ID_HOME,
    "Home",
    "Your house. You really need to clean up the place."
  );

  const townSquare = new Location(
    LOCATION_ID_TOWN_SQUARE,
    "Town square",
    "You see a fountain."
  );

  const alchemistHut = new Location(
    LOCATION_ID_ALCHEMIST_HUT,
    "Alchemist's hut",
    "There are many strange plants on the shelves."
  );
  alchemistHut.QuestAvailableHere = questByID(QUEST_ID_CLEAR_ALCHEMIST_GARDEN);

  const alchemistsGarden = new Location(
    LOCATION_ID_ALCHEMISTS_GARDEN,
    "Alchemist's garden",
    "Many plants are growing here."
  );
  alchemistsGarden.MonsterLivingHere = monsterByID(MONSTER_ID_RAT);

  const farmhouse = new Location(
    LOCATION_ID_FARMHOUSE,
    "Farmhouse",
    "There is a small farmhouse, with a farmer in front."
  );
  farmhouse.QuestAvailableHere = questByID(QUEST_ID_CLEAR_FARMERS_FIELD);

  const farmersField = new Location(
    LOCATION_ID_FARM_FIELD,
    "Farmer's field",
    "You see rows of vegetables growing here."
  );
  farmersField.MonsterLivingHere = monsterByID(MONSTER_ID_SNAKE);

  const guardPost = new Location(
    LOCATION_ID_GUARD_POST,
    "Guard post",
    "There is a large, tough-looking guard here.",
    itemByID(ITEM_ID_ADVENTURER_PASS)
  );

  const bridge = new Location(
    LOCATION_ID_BRIDGE,
    "Bridge",
    "A stone bridge crosses a wide river."
  );

  const spiderField = new Location(
    LOCATION_ID_SPIDER_FIELD,
    "Forest",
    "You see spider webs covering covering the trees in this forest."
  );
  spiderField.MonsterLivingHere = monsterByID(MONSTER_ID_GIANT_SPIDER);

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

function itemByID(id) {
  return items.find((item) => item._ID === id) || null;
}

function monsterByID(id) {
  return monsters.find((monster) => monster._ID === id) || null;
}

function questByID(id) {
  return quests.find((quest) => quest._ID === id) || null;
}

function locationByID(id) {
  return locations.find((location) => location._ID === id) || null;
}

// create world
populateWorld();
