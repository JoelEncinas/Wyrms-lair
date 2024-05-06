# 🐉 Wyrm's Lair
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="node" style="max-width: 100%;"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="express" style="max-width: 100%;"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" style="max-width: 100%;"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jsonwebtokens" style="max-width: 100%;"> <img src="https://img.shields.io/badge/handlebars-AF4B0C?style=for-the-badge&logo=handlebarsdotjs&logoColor=white" alt="handlebars" style="max-width: 100%;"> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="bootstrap" style="max-width: 100%;">

Classic text-based old-school RPG based on the classic game from Scott Lilly's [C# RPG](https://scottlilly.com/learn-c-by-building-a-simple-rpg-index/). It's a full stack application done in javascript that builds the game from the ground up and expands adding a ton of features:

- Expanded the world featuring the classic intro region + 4 brand new regions each with a bunch of locations and a lot of secrets to discover:

    - More weapons, items, npcs...
    - Increased level cap to 25.
    
- Players can now choose the race of their character.
- Added Crafting:
    - Weapons, potions and scrolls.
    
- Added Scrolls which enable powerful spells.
- Added button bindings, now you can play the game with the keyboard.
- Created level restricted areas.
- Improved trades with vendors:

    - Player's inventory won't show if there is no item available to sell, a message will be displayed instead.
    - Vendor's inventory won't show if the player has no gold and a message will be displayed instead.
    
- Added attributes *Str* and *Int* that scale with Level.
- Added critical chance.
- Added a final boss that doesn't respawn.
- Created respawn points for the character in each region.
- Now monsters don't give exp if the player is way higher level.
- Added poison mechanic to some mobs.
- Improved log with color highlight and better text style:
    - Added log entry that notifies when character levels up.
    - New log entry if the hit is a crit.
      
- Revamped the UI with bars for hp and experience:
    - Hp and experience bar have some animations.

- Players can save their characters to the cloud with mongoDB.


## 📷 App screenshots
<img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/1.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/4.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/5.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/6.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/7.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/8.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/9.PNG" alt="demo" width="600" height="400"> <img src="https://github.com/JoelEncinas/js-rpg/blob/main/demo_imgs/10.PNG" alt="demo" width="600" height="400"> 

## 🤝 Contributing

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.
