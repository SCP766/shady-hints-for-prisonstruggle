const clueAnswers = {
    "A blunt weapon, or something to strangle with?": "Chain",
    "A little WD-40 and these will glide.": "Old Roller Skates",
    "A little worn smells like the ranch.": "Old Cowboy Hat",
    "A nice fluffy hat for the winter!": "Santa Hat",
    "A non-lethal solution from the guards": "Guards Gun [Rubber Bullets]",
    "A technology company, and a man who kills vampires.": "Razor Blade",
    "A tricky attempt to eat fruit.": "Orange Slices",
    "A well-filled shirt can stop bullets?": "Liquid Armour Vest",
    "Ah, A real manufactured blade.": "Knife",
    "An oversized coat for an oversized man.": "Santa Outfit",
    "Ba-Ba-Balloomba": "Party Balloons",
    "Be careful with this one. It can be dangerous if misused.": "Firework",
    "Belonged to your grandfather, but it keeps the sun out of your eyes.": "Old Hat",
    "Belongs in a waiting room.": "Chair",
    "Brand name only.": "Nike Trainers",
    "Bring me back to life": "Health Pill",
    "Calling this guarantees you a front seat!": "Shotgun",
    "Care to take a chance at love?": "Cupids Arrow",
    "Chop Chop hurry up!": "Meat Cleaver",
    "Chuck Taylor would want you to buy a new pair.": "Worn All Stars",
    "Compartments for your slop": "Dinner Tray",
    "Definitely not for everyone.": "Cranberry Sauce",
    "Doesn't cure a broken heart.": "Antidote",
    "Don't forget to put it back in the kitchen": "Pan Lid",
    "Don't ___ me, bro!": "Tazer",
    "Each one of these brings you closer to God.": "Bible",
    "Face wig. Got some cookies stuck in it.": "Santa Beard",
    "Fe-Armor.": "Iron Armor",
    "For soup, Or gouging out the eyes of your enemy.": "Sharpened Spoon",
    "Fresh and from the ranch!": "New Cowboy Hat",
    "Fresh outta the box with wheels!": "Roller Skates",
    "Give your items a makeover.": "Paint Can",
    "Goes well in your coffee.": "Sugar",
    "Gold and 50": "Gold Desert Eagle",
    "Good enough for your cubicle job.": "Office Shoes",
    "Gotta get all the sand out at the end of the day.": "Beach Slippers",
    "Hat, or symbol of authority.": "Police Helmet",
    "How terrifying!": "Zombie Rottweiler",
    "How'd this get soot on it? What even is soot?": "Santa Gloves",
    "I look like a rainbow, but some are unkind. The wrong flavor’s a curse, so take your time.": "Jelly Beans",
    "I think this belongs to a coach?": "Whistle",
    "I’m an egg, but not for your breakfast plate. Crack me open, and I’ll make you salivate.": "Peanut Butter Eggs",
    "If dark, better for the heart, but I don't make you fart.": "Choco Butter",
    "If it lasts longer than 4 hours, call a doctor.": "Viagra",
    "If you want you can use this candy as a straw": "Liquorice",
    "If you're going swimming, don't forget to bring one of these!": "Towel",
    "If they don't make you faster, the blade could be useful": "Ice Skates",
    "Inmates or werewolves, certainly helpful.": "Silver Bullets",
    "It cant touch the floor, it cant be underneath another of its kind, however if side by side, it must be at the same height. What am I?": "US Flag",
    "It has to count for something, right?": "Prison Guard Badge",
    "It tastes like Christmas...": "Candy Cane",
    "It tastes so good and makes you feel brand new!": "Party Cupcake",
    "It was once festive now it just decomposes and smells": "Moldy Pumpkin",
    "It's all fun and games until you crack this open": "Rotten Egg",
    "It's not Tempurpedic, but it'll do.": "Mattress",
    "It's said that Dion uses this very item as toilet paper.": "Murphy Ticket",
    "It's ugly, it stinks, and there's blood stains on it.": "Prison Guard Uniform",
    "Just missing the shining armor.": "Knight Helm",
    "Makes you feel like you get more done during the day.": "Caffeine",
    "Nightstick.": "Baton",
    "No one actually does this.": "Flaming Dog Poo",
    "No one complains about minutes anymore.": "Phone",
    "Not a vest for fly swatters.": "Swat Vest",
    "Not just for February 14th": "Valentine Rose",
    "Nothing to worry about when this is on": "Guard Protection",
    "Oddly good for breaking into houses at night quietly. Tip toe…": "Santa Boots",
    "Old McDonald may have worn one of these.": "Farmers Straw Hat",
    "Paid for muscle.": "Mercenary",
    "Pairs nicely with an upscale suit.": "Executive Shoes",
    "Palms strung together to keep the son out.": "Vietnamese Palm Hat",
    "Pesky knives can't get through this vest.": "Stab Proof Vest",
    "Plot twist. It isn't safe!": "Xylazine",
    "Poop literally poop.": "Fertilizer",
    "Pretty picture": "Portrait",
    "Put these on when you are being a baaaaaad boy.": "Prison Guard Handcuffs",
    "Radical Dude!": "Radical Roller Blades",
    "Rarely used with a sword, but it's bulletproof.": "Riot Shield",
    "Read all about it maaaaaan.": "Hippie Newsboy Cap",
    "Rest your head on one of these?": "Pillow",
    "Rumor has it, Audman eats this every day.": "Chilli Peppers",
    "Screw you!": "Screwdriver",
    "Shattered but, it'll stab.": "Piece of Glass",
    "Shoes were made for running at some point?": "Worn out Trainers",
    "Slick and polished shoes, ready to chase down the Gen Pop.": "Prison Guard Shoes",
    "So neatly wrapped. Oh the mysteries.": "Present",
    "Squeakiest wheel gets the?": "Lubricating Oil",
    "Take one if you've had a long day.": "Awake Pill",
    "Taken from the building itself. Good for smashing.": "Iron Bar",
    "The design makes you think you can go faster": "Sporty Roller Blades",
    "The hat from a clockwork orange.": "Bowler Hat",
    "These guys got your back.": "Body Guard",
    "These must be stolen from the commissary's food section. Tons of protein": "Energy Bars",
    "This button-up is deceitfully defensive.": "Padded Shirt",
    "This has to be expired by now... right?": "Milk",
    "This looks like it is pretty universal": "Warden Office Key",
    "This plastic was brilliantly fashioned into a weapon.": "Sharpened Piece of Plastic",
    "This seems kind of stale, but it's sugar.": "Candy Corn",
    "This will definitely make it easier to stab and slash.": "Knife Sharpener",
    "Turns your punches into brass taps.": "Knuckle Dusters",
    "Uhh... Good puppy. Don't Bite.": "Rottweiler",
    "Used to get all the lint off of clothing.": "Suit Brush",
    "Useful in case you need to try to unlock a car door.": "Coat Hanger",
    "Useful while riding your chopper": "Motorbike Helmet",
    "Wear one to protect your noggin, even if you're riding backsies": "Scooter Helmet",
    "Well, certainly inventive footwear": "Trash Can Shoes",
    "What are you a lumberjack?": "Axe",
    "What came first?": "Egg",
    "Why are they still making these out of wood?": "Modern Clogs",
    "Why do I have this still, it isnt October?": "Golden Pumpkin",
    "Why is this hat so big?": "Texan Hat",
    "Why? Why are they made of wood?": "Clogs",
    "Will keep your feet warm but not much else": "Bedroom Slipper",
    "With just a little sharpened metal and some cloth, stab": "Shank",
    "Winner winner turkey dinner!!!!": "Turkey Dinner",
    "Wonderful if you've ripped your pants.": "Sewing Kit",
    "You could shoot someone's eye out with one of these": "Slingshot",
    "Yum on a stick.": "Lollipop",
    "Zombies can't use a gun...Can they?": "Zombie Guards Gun [Rubber Bullets]",
    "Zap!": "Tazer",
  };


function insertAnswers() {
  document.querySelectorAll(".clueContainer").forEach(container => {
      const clueSpan = container.querySelector(".clue > span");
      if (!clueSpan || container.querySelector(".injectedAnswer")) return;

      // Get only text nodes inside <span> to avoid .clueQty
      let clueText = "";
      for (const node of clueSpan.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
              clueText += node.textContent;
          }
      }
      clueText = clueText.trim().replace(/\s+/g, " ");

      const answer = clueAnswers[clueText];
      if (!answer) return;

      // Create .col wrapper
      const colDiv = document.createElement("div");
      colDiv.className = "col";

      // Move the <span> into .col
      colDiv.appendChild(clueSpan);

      // Create styled answer element
      const answerEl = document.createElement("div");
      answerEl.className = "injectedAnswer";
      answerEl.textContent = answer;

      // Style with moving gold gradient and black outline
      answerEl.style.background = "linear-gradient(270deg, gold, orange, gold)";
      answerEl.style.backgroundSize = "400% 400%";
      answerEl.style.webkitBackgroundClip = "text";
      answerEl.style.webkitTextFillColor = "transparent";
      answerEl.style.fontFamily = "'Nanum Pen Script', cursive";
      answerEl.style.marginTop = "5px";
      answerEl.style.textAlign = "left";
      answerEl.style.fontSize = "24px";
      answerEl.style.fontWeight = "bold";
      answerEl.style.textShadow = "0 0 2px #00000014, 0 0 2px #0000002e";

      // Animate the gradient
      answerEl.animate([
          { backgroundPosition: "0% 50%" },
          { backgroundPosition: "100% 50%" },
          { backgroundPosition: "0% 50%" }
      ], {
          duration: 3000,
          iterations: Infinity
      });

      // Insert the styled answer inside .col
      colDiv.appendChild(answerEl);

      // Insert .col as the first child of .clue
      const clueDiv = container.querySelector(".clue");
      clueDiv.insertBefore(colDiv, clueDiv.firstChild);
  });
}


window.addEventListener("load", insertAnswers);
console.log("event added");