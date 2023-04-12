import { HealingPotion } from "./objects/HealingPotion.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import { Item } from "./objects/Item.js";
import { Location } from "./objects/Location.js";
import { LootItem } from "./objects/LootItem.js";
import { Monster } from "./objects/Monster.js";
import { PlayerQuest } from "./objects/PlayerQuest.js";
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
  //populateMonsters();
  //populateQuests();
  //populateLocations();
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

// create world
populateWorld();