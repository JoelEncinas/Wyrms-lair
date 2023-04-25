import { HealingPotion } from "./objects/HealingPotion.js";
import { Item } from "./objects/Item.js";
import { Location } from "./objects/Location.js";
import { LootItem } from "./objects/LootItem.js";
import { Monster } from "./objects/Monster.js";
import { Quest } from "./objects/Quest.js";
import { QuestCompletionItem } from "./objects/QuestCompletionItem.js";
import { Vendor } from "./objects/Vendor.js";
import { Weapon } from "./objects/Weapon.js";
import { Scroll } from "./objects/Scroll.js";
import { Region } from "./objects/Region.js";
import { Craft } from "./objects/Craft.js";
import { Recipe } from "./objects/Recipe.js";
import { RecipeItem } from "./objects/RecipeItem.js";

export const items = [];
export const monsters = [];
export const quests = [];
export const locations = [];
export const regions = [];
export const recipes = [];

export const ITEM_IDS = {
  RUSTY_SWORD: 1,
  RAT_TAIL: 2,
  PIECE_OF_FUR: 3,
  SNAKE_FANG: 4,
  SNAKESKIN: 5,
  BATTLEWORN_HAMMER: 6,
  HEALING_POTION: 7,
  SPIDER_FANG: 8,
  SPIDER_SILK: 9,
  ADVENTURER_PASS: 10,
  TARNISHED_BASTARD_SWORD: 11,
  GREATER_HEALING_POTION: 12,
  SCROLL_FIREBALL_I: 13,
  SCROLL_RENEW_I: 14,
  BRIGHT_DUST: 15,
  BONE: 16,
  ROLL_OF_PAPYRUS: 17,
  SCORPION_TAIL: 18,
  MYSTERY_MEAT: 19,
};

const UNSELLABLE_ITEM_PRICE = -1;

export const MONSTER_IDS = {
  RAT: 1,
  SNAKE: 2,
  GIANT_SPIDER: 3,
  DUST_DEVIL: 4,
  SKELETON: 5,
  FIRE_SCORPION: 6,
};

export const QUEST_IDS = {
  CLEAR_ALCHEMIST_GARDEN: 1,
  CLEAR_FARMERS_FIELD: 2,
};

export const LOCATION_IDS = {
  HOME: 1,
  AVORIAS_MARKET: 2,
  GUARD_POST: 3,
  ALCHEMIST_HUT: 4,
  ALCHEMISTS_GARDEN: 5,
  FARMHOUSE: 6,
  FARM_FIELD: 7,
  AVORIAS_BRIDGE: 8,
  SPIDER_FIELD: 9,
  SAND_DUNES: 10,
  SUNSET_OASIS: 11,
  SEA_OF_BONES: 12,
  BURNING_WASTES: 13,
  THE_ACID_PITS: 14,
  THE_CRATER: 15,
  THE_CRUMBLING_CLIFFS: 16,
  ABANDONED_MINE: 17,
};

export const REGION_IDS = {
  ANNORA_VALLEY: 1,
  THE_BLASTED_WASTELAND: 2,
};

export const SPELL_TYPES = {
  DAMAGE: 1,
  HEALING: 2,
};

export const RECIPE_IDS = {
  CRAFT_SCROLL_FIREBALL_I: 1,
  CRAFT_SCROLL_RENEW_I: 2,
};

function populateWorld() {
  populateItems();
  populateRecipes();
  populateMonsters();
  populateQuests();
  populateLocations();
}

function populateItems() {
  items.push(
    new Weapon(
      ITEM_IDS.RUSTY_SWORD,
      "Rusty Sword",
      "Rusty Swords",
      UNSELLABLE_ITEM_PRICE,
      5,
      10
    )
  );
  items.push(new Item(ITEM_IDS.RAT_TAIL, "Rat Tail", "Rat Tails", 1));
  items.push(
    new Item(ITEM_IDS.PIECE_OF_FUR, "Piece of Fur", "Pieces of Fur", 1)
  );
  items.push(new Item(ITEM_IDS.SNAKE_FANG, "Snake Fang", "Snake Fangs", 1));
  items.push(new Item(ITEM_IDS.SNAKESKIN, "Snakeskin", "Snakeskins", 1));
  items.push(
    new Weapon(
      ITEM_IDS.BATTLEWORN_HAMMER,
      "Battleworn Hammer",
      "Battleworn Hammer",
      20,
      7,
      11
    )
  );
  items.push(
    new HealingPotion(
      ITEM_IDS.HEALING_POTION,
      "Healing Potion",
      "Healing Potions",
      10,
      40
    )
  );
  items.push(new Item(ITEM_IDS.SPIDER_FANG, "Spider Fang", "Spider Fangs", 1));
  items.push(new Item(ITEM_IDS.SPIDER_SILK, "Spider Silk", "Spider Silks", 2));
  items.push(
    new Item(
      ITEM_IDS.ADVENTURER_PASS,
      "Adventurer Pass",
      "Adventurer Passes",
      UNSELLABLE_ITEM_PRICE
    )
  );
  items.push(
    new Weapon(
      ITEM_IDS.TARNISHED_BASTARD_SWORD,
      "Tarnished Bastard Sword",
      "Tarnished Bastard Swords",
      35,
      8,
      12
    )
  );
  items.push(
    new HealingPotion(
      ITEM_IDS.GREATER_HEALING_POTION,
      "Greater Healing Potion",
      "Greater Healing Potions",
      25,
      100
    )
  );
  items.push(
    new Scroll(
      ITEM_IDS.SCROLL_FIREBALL_I,
      "Scroll: Fireball I",
      "Scrolls: Fireball I",
      25,
      30,
      40,
      SPELL_TYPES.DAMAGE,
      "Fireball I"
    )
  );
  items.push(
    new Scroll(
      ITEM_IDS.SCROLL_RENEW_I,
      "Scroll: Renew I",
      "Scrolls: Renew I",
      25,
      25,
      50,
      SPELL_TYPES.HEALING,
      "Renew I"
    )
  );
  items.push(
    new Item(
      ITEM_IDS.BRIGHT_DUST,
      "Bright Dust",
      "Bright Dust",
      3,
    )
  );
  items.push(
    new Item(
      ITEM_IDS.BONE,
      "Bone",
      "Bones",
      2,
    )
  );
  items.push(
    new Item(
      ITEM_IDS.ROLL_OF_PAPYRUS,
      "Roll of Papyrus",
      "Rolls of Papyrus",
      3,
    )
  );
  items.push(
    new Item(
      ITEM_IDS.SCORPION_TAIL,
      "Scorpion Tail",
      "Scorpion Tails",
      1,
    )
  );
  items.push(
    new Item(
      ITEM_IDS.MYSTERY_MEAT,
      "Mystery Meat",
      "Mystery Meat",
      2,
    )
  );
}

function populateRecipes() {
  const fireballIRecipeComponent = new RecipeItem(
    itemByID(ITEM_IDS.ROLL_OF_PAPYRUS),
    3
  );

  const fireballIRecipeResult = new RecipeItem(
    itemByID(ITEM_IDS.SCROLL_FIREBALL_I),
    1
  );

  const fireballIRecipe = new Recipe(
    RECIPE_IDS.CRAFT_SCROLL_FIREBALL_I,
    "Craft Scroll: Fireball I",
    fireballIRecipeComponent,
    fireballIRecipeResult
  );

  recipes.push(fireballIRecipe);
}

function populateMonsters() {
  const rat = new Monster(MONSTER_IDS.RAT, "Rat", 4, 8, 0, 30, 30, 3, false);
  rat.LootTable.push(new LootItem(itemByID(ITEM_IDS.RAT_TAIL), 75, false));
  rat.LootTable.push(new LootItem(itemByID(ITEM_IDS.PIECE_OF_FUR), 65, true));

  const snake = new Monster(
    MONSTER_IDS.SNAKE,
    "Snake",
    6,
    8,
    0,
    45,
    45,
    4,
    true
  );
  snake.LootTable.push(new LootItem(itemByID(ITEM_IDS.SNAKE_FANG), 75, false));
  snake.LootTable.push(new LootItem(itemByID(ITEM_IDS.SNAKESKIN), 65, true));

  const giantSpider = new Monster(
    MONSTER_IDS.GIANT_SPIDER,
    "Giant spider",
    7,
    10,
    0,
    100,
    100,
    7,
    true
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.SPIDER_FANG), 75, true)
  );
  giantSpider.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.SPIDER_SILK), 25, false)
  );

  const dustDevil = new Monster(
    MONSTER_IDS.DUST_DEVIL,
    "Dust Devil",
    10,
    12,
    0,
    90,
    90,
    8,
    false
  );

  dustDevil.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.BRIGHT_DUST), 100, true)
  );

  const skeleton = new Monster(
    MONSTER_IDS.SKELETON,
    "Skeleton",
    13,
    16,
    0,
    120,
    120,
    9,
    false
  );

  skeleton.LootTable.push(new LootItem(itemByID(ITEM_IDS.BONE), 75, true));
  skeleton.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.ROLL_OF_PAPYRUS), 20, false)
  );
  skeleton.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.BATTLEWORN_HAMMER), 5, false)
  );

  const fireScorpion = new Monster(
    MONSTER_IDS.FIRE_SCORPION,
    "Fire Scorpion",
    15,
    17,
    0,
    145,
    145,
    12,
    false
  );

  fireScorpion.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.SCORPION_TAIL), 75, true)
  );
  fireScorpion.LootTable.push(
    new LootItem(itemByID(ITEM_IDS.MYSTERY_MEAT), 25, false)
  );

  monsters.push(rat);
  monsters.push(snake);
  monsters.push(giantSpider);
  monsters.push(dustDevil);
  monsters.push(skeleton);
  monsters.push(fireScorpion);
}

function populateQuests() {
  const clearAlchemistGarden = new Quest(
    QUEST_IDS.CLEAR_ALCHEMIST_GARDEN,
    "The Alchemist's Infestation",
    "The alchemist, Master Agrippa, is in desperate need of your help! His prized garden, where he grows rare and exotic plants for his experiments, has been overrun by hordes of rats.",
    6
  );

  clearAlchemistGarden.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_IDS.RAT_TAIL), 5)
  );

  clearAlchemistGarden.addRewardItems(itemByID(ITEM_IDS.HEALING_POTION));

  const clearFarmersField = new Quest(
    QUEST_IDS.CLEAR_FARMERS_FIELD,
    "The Farmer's Plight",
    "A farmer by the name of John has reported a severe infestation of venomous snakes in his fields, and he fears for the safety of his family and his livestock. You have to venture into John's fields and eliminate the snake population.",
    5
  );

  clearFarmersField.QuestCompletionItems.push(
    new QuestCompletionItem(itemByID(ITEM_IDS.SNAKE_FANG), 3)
  );

  clearFarmersField.addRewardItems(itemByID(ITEM_IDS.ADVENTURER_PASS));

  quests.push(clearAlchemistGarden);
  quests.push(clearFarmersField);
}

function populateLocations() {
  // ANNORA
  const annoraValley = new Region(
    REGION_IDS.ANNORA_VALLEY,
    "Annora Valley",
    "Annora, a serene farmer's valley, with quaint thatched-roof cottages, fertile fields, grazing livestock, and a gentle flowing river."
  );

  regions.push(annoraValley);

  const home = new Location(
    LOCATION_IDS.HOME,
    "Home",
    "Few basic furnishings with a not so comfy sleeping mat. Life here is simple but often hard."
  );

  const avoriasMarket = new Location(
    LOCATION_IDS.AVORIAS_MARKET,
    "Avoria's Market",
    "Bustling hub of commerce and trade, where merchants and traders from all Annora converge to sell their wares. You hear a cacophony of sounds, from the clattering of horses and wagons to the chatter of vendors."
  );

  const bobTheRatCatcher = new Vendor("Bob the Rat-Catcher");
  bobTheRatCatcher.addItemToInventory(itemByID(ITEM_IDS.PIECE_OF_FUR), 5);
  bobTheRatCatcher.addItemToInventory(itemByID(ITEM_IDS.RAT_TAIL), 3);
  avoriasMarket.VendorWorkingHere = bobTheRatCatcher;

  const alchemistHut = new Location(
    LOCATION_IDS.ALCHEMIST_HUT,
    "Alchemist's hut",
    "Small, rustic structure hidden from view, obscured by thick vines, overgrown shrubs, and ancient trees. Inside, the hut is a cluttered and chaotic space, with shelves lining the walls, stacked high with jars of herbs, crystals, powders, and other arcane ingredients."
  );
  alchemistHut.QuestAvailableHere = questByID(QUEST_IDS.CLEAR_ALCHEMIST_GARDEN);

  const alchemistsGarden = new Location(
    LOCATION_IDS.ALCHEMISTS_GARDEN,
    "Alchemist's garden",
    "Plants grown here are used in the creation of potions, tinctures, and other alchemical concoctions. You are greeted by a riot of color and scent, with plants of every shape and size vying for your attention."
  );
  alchemistsGarden.MonsterLivingHere = monsterByID(MONSTER_IDS.RAT);

  const farmhouse = new Location(
    LOCATION_IDS.FARMHOUSE,
    "Farmhouse",
    "Humble dwelling made of wood and stone, located on the outskirts of the village. It's surrounded by a small patch of land, where the farmer grows crops and raise livestock."
  );
  farmhouse.QuestAvailableHere = questByID(QUEST_IDS.CLEAR_FARMERS_FIELD);

  const farmersField = new Location(
    LOCATION_IDS.FARM_FIELD,
    "Farmer's field",
    "The crops in the field are a sight to behold. They come in a myriad of colors and shapes, ranging from towering stalks of corn to glowing orbs of enchanted fruit."
  );
  farmersField.MonsterLivingHere = monsterByID(MONSTER_IDS.SNAKE);

  const guardPost = new Location(
    LOCATION_IDS.GUARD_POST,
    "Guard post",
    "As you approach the guard post, you can see the imposing stone walls rising up in front of you, punctuated by the wooden lookout towers on each corner. One of the guards steps forward, his hand on the hilt of his sword."
  );

  const bridge = new Location(
    LOCATION_IDS.BRIDGE,
    "Stone Bridge",
    "The bridge is old and weathered, with small cracks and uneven surfaces that have been worn down by centuries of use. You can see the water rushing below you, a crystal-clear stream that sparkles in the sunlight.",
    itemByID(ITEM_IDS.ADVENTURER_PASS)
  );

  const spiderField = new Location(
    LOCATION_IDS.SPIDER_FIELD,
    "Dark Forest",
    "As you move deeper into the field, you can see that the ground is covered with a thick layer of spider webs, criss-crossing and overlapping in intricate patterns. "
  );
  spiderField.MonsterLivingHere = monsterByID(MONSTER_IDS.GIANT_SPIDER);

  home.LocationToNorth = avoriasMarket;

  avoriasMarket.LocationToNorth = alchemistHut;
  avoriasMarket.LocationToSouth = home;
  avoriasMarket.LocationToEast = guardPost;
  avoriasMarket.LocationToWest = farmhouse;

  farmhouse.LocationToEast = avoriasMarket;
  farmhouse.LocationToWest = farmersField;

  farmersField.LocationToEast = farmhouse;

  alchemistHut.LocationToSouth = avoriasMarket;
  alchemistHut.LocationToNorth = alchemistsGarden;

  alchemistsGarden.LocationToSouth = alchemistHut;

  guardPost.LocationToEast = bridge;
  guardPost.LocationToWest = avoriasMarket;

  bridge.LocationToWest = guardPost;
  bridge.LocationToEast = spiderField;

  spiderField.LocationToWest = bridge;

  locations.push(home);
  locations.push(avoriasMarket);
  locations.push(guardPost);
  locations.push(alchemistHut);
  locations.push(alchemistsGarden);
  locations.push(farmhouse);
  locations.push(farmersField);
  locations.push(bridge);
  locations.push(spiderField);

  home.Region = annoraValley;
  avoriasMarket.Region = annoraValley;
  guardPost.Region = annoraValley;
  alchemistHut.Region = annoraValley;
  alchemistsGarden.Region = annoraValley;
  farmhouse.Region = annoraValley;
  farmersField.Region = annoraValley;
  bridge.Region = annoraValley;
  spiderField.Region = annoraValley;

  // ALACIA
  const theBlastedWasteland = new Region(
    REGION_IDS.THE_BLASTED_WASTELAND,
    "Alacia, the Blasted Wasteland",
    "Harsh desert wasteland that was ravaged by a magical apocalypse, now home to mutants and other dangerous creatures."
  );

  regions.push(theBlastedWasteland);

  const sandDunes = new Location(
    LOCATION_IDS.SAND_DUNES,
    "Sand Dunes",
    "Vast expanse of shifting sand dunes that stretch on for miles. The wind is fierce and unrelenting, and travelers can easily become lost in the endless sea of sand."
  );

  const sunsetOasis = new Location(
    LOCATION_IDS.SUNSET_OASIS,
    "Sunset Oasis",
    "The oasis is a patch of lush greenery that sits amidst the endless sea of sand, surrounded by palm trees and sparkling pools of water. The sight of it is a welcome relief to travelers who have been wandering through the desert for days, struggling to survive in the blistering heat and relentless sandstorms."
  );

  const sabanaTheMage = new Craft(
    "Sabana the Mage",
    recipeByID(RECIPE_IDS.CRAFT_SCROLL_FIREBALL_I)
  );
  sunsetOasis.CraftHere = sabanaTheMage;

  const seaOfBones = new Location(
    LOCATION_IDS.SEA_OF_BONES,
    "Sea of Bones",
    "Bleak and barren landscape where the ground is littered with the bones of long-dead creatures. Looks haunted by restless spirits and dark magic."
  );

  const burningWastes = new Location(
    LOCATION_IDS.BURNING_WASTES,
    "Burning Wastes",
    "Place of searing heat, where the sun beats down relentlessly on the parched earth, and where the sand burns like fire beneath your feet."
  );

  const theAcidPits = new Location(
    LOCATION_IDS.THE_ACID_PITS,
    "The Acid Pits",
    "A series of deep pits filled with acidic sludge. The fumes from the pits are toxic and can cause severe burns and respiratory problems."
  );

  const theCrater = new Location(
    LOCATION_IDS.THE_CRATER,
    "The Crater",
    "A massive impact crater caused by a meteor strike. The area is scorched and blasted, with twisted metal and debris scattered throughout."
  );

  const theCrumblingCliffs = new Location(
    LOCATION_IDS.THE_CRUMBLING_CLIFFS,
    "The Crumbling Cliffs",
    "Steep cliffs that rise high above the wasteland. The edges are treacherous and unstable, and rockslides are common."
  );

  const ostaTheErmit = new Vendor("Osta the Ermit");
  ostaTheErmit.addItemToInventory(itemByID(ITEM_IDS.PIECE_OF_FUR), 5);
  ostaTheErmit.addItemToInventory(itemByID(ITEM_IDS.RAT_TAIL), 3);
  theCrumblingCliffs.VendorWorkingHere = ostaTheErmit;

  const abandonedMine = new Location(
    LOCATION_IDS.ABANDONED_MINE,
    "Abandoned Mine",
    "A long-abandoned mine filled with dark and twisting tunnels. The air is thick with dust and the smell of sulfur, and the area is infested with dangerous creatures."
  );

  spiderField._LocationToEast = burningWastes;

  sandDunes.LocationToWest = spiderField;

  sunsetOasis.LocationToNorth = theAcidPits;
  sunsetOasis.LocationToEast = sandDunes;
  sunsetOasis.LocationToWest = seaOfBones;

  seaOfBones.LocationToEast = sunsetOasis;
  seaOfBones.LocationToWest = burningWastes;

  burningWastes.LocationToEast = seaOfBones;
  // burningWastes.LocationToWest = burningWastes;

  theAcidPits.LocationToSouth = sunsetOasis;
  theAcidPits.LocationToNorth = theCrater;

  theCrater.LocationToNorth = theCrumblingCliffs;
  theCrater.LocationToSouth = theAcidPits;
  theCrater.LocationToWest = abandonedMine;

  // theCrumblingCliffs.LocationToNorth = theCrater;
  theCrumblingCliffs.LocationToSouth = theCrater;

  locations.push(sandDunes);
  locations.push(sunsetOasis);
  locations.push(seaOfBones);
  locations.push(burningWastes);
  locations.push(theAcidPits);
  locations.push(theCrater);
  locations.push(theCrumblingCliffs);
  locations.push(abandonedMine);

  sandDunes.Region = theBlastedWasteland;
  sunsetOasis.Region = theBlastedWasteland;
  seaOfBones.Region = theBlastedWasteland;
  burningWastes.Region = theBlastedWasteland;
  theAcidPits.Region = theBlastedWasteland;
  theCrater.Region = theBlastedWasteland;
  theCrumblingCliffs.Region = theBlastedWasteland;
  abandonedMine.Region = theBlastedWasteland;
}

export function itemByID(id) {
  return items.find((item) => item.ID === id) || null;
}

export function recipeByID(id) {
  return recipes.find((recipe) => recipe.ID === id) || null;
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

export function regionByID(id) {
  return regions.find((region) => region.ID === id) || null;
}

populateWorld();
