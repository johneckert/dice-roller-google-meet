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

const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Dice Roller',
  //     favicon: './src/images/catlogo-small.png',
  //     template: './src/MainStage.html',
  //   }),
  //   new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/images', to: './images' },
        { from: './src/docs', to: './docs' },
        { from: './src/MainStage.html', to: './MainStage.html' },
        { from: './src/SidePanel.html', to: './SidePanel.html' },
      ]}),
  ],
  output: {
    library: 'diceRoller',
    path: path.resolve(__dirname, './dist'),
  },
};