function buildDiceCard() {
  var card = CardService.newCardBuilder();
  
  // Title
  card.setHeader(CardService.newCardHeader().setTitle('Dice Roller'));

  // Input field for dice notation (e.g., "3d6+2")
  var inputField = CardService.newTextInput()
    .setFieldName('diceNotation')
    .setTitle('Enter dice roll (e.g., 3d6+2)');
  
  // Button to roll the dice
  var rollDiceButton = CardService.newTextButton()
    .setText('Roll the Dice')
    .setOnClickAction(CardService.newAction()
      .setFunctionName('rollDice'));
  
  // Add the input field and button to a section
  var section = CardService.newCardSection()
    .addWidget(inputField)
    .addWidget(rollDiceButton);

  card.addSection(section);

  return card.build();
}

function rollDice(e) {
  var notation = e.formInput.diceNotation;
  
  var result;
  try {
    result = parseAndRollDice(notation);
  } catch (err) {
    result = 'Invalid input. Use format like "3d6+2".';
  }

  // Display the result in a new card
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Dice Roll Result'))
    .addSection(
      CardService.newCardSection()
      .addWidget(
        CardService.newTextParagraph().setText('Result: ' + result)
      )
    );
  
  return CardService.newNavigation().updateCard(card.build());
}



function parseAndRollDice(notation) {
  //3d6+5
  const regex = /(\d+)d(\d+)([+-])?(\d+)?/;
  const match = roll.match(regex);

  if (!match) {
    throw new Error("Invalid dice notation eg. 3d6+1");
  }

  const numberOfDice = parseInt(match[1], 10);
  const diceSides = parseInt(match[2], 10);
  const sign = match[3] || '+';
  let modifier = match[4] ? parseInt(match[4], 10) : 0;

  if (sign === '-') {
    modifier *= -1;
  }
  
  let result = modifier;
  for (let i = 0; i < numberOfDice; i++) {
    result += Math.floor(Math.random() * diceSides) + 1;
  } 

  // return {
  //   numberOfDice,
  //   diceSides,
  //   modifier,
  //   result
  // };

  return result;
}

function onHomepage(e) {
  return buildDiceCard();
}


// YO! I NEED TO MOVE THIS TO GCP LIKE THE FISH ONE.