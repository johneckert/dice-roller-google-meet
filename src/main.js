// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { meet } from '@googleworkspace/meet-addons/meet.addons';

const CLOUD_PROJECT_NUMBER = '486310787385';
const MAIN_STAGE_URL =
  'https://johneckert.github.io/dice-roller-google-meet/MainStage.html';

/**
 * Prepares the Add-on Side Panel Client, and adds an event to launch the
 * activity in the main stage when the main button is clicked.
 */
export async function setUpAddon() {
  const session = await meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  const sidePanelClient = await session.createSidePanelClient();
  // document
  //   .getElementById('start-activity')
  //   .addEventListener('click', async () => {
  //     await sidePanelClient.startActivity({ mainStageUrl: MAIN_STAGE_URL });
  //   });
  document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('roll-button')
      .addEventListener('click', () => {
        let diceNotation = document.getElementById('roll-input').value;
        let result = rollDice(diceNotation);
        document.getElementById('result').innerText = `Result: ${result}`;
    });
  });
}

/**
 * Prepares the Add-on Main Stage Client, which signals that the add-on has
 * successfully launched in the main stage.
 */
export async function initializeMainStage() {
  const session = await meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  await session.createMainStageClient();
}

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
