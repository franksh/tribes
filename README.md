# Tribes

![Tribes Screenshot](https://github.com/franksh/tribes/raw/master/assets/screenshot.gif)

Tribes is a small real-time strategy game (in development).

You control a small tribe of people that gather resources, expand their
territory and compete with other tribes.

Each unit acts on its own - The player can only indirectly control the tribe,
for example by buying units or unlocking new technology.

# Setup

You’ll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

`git clone https://github.com/franksh/tribes.git`

## 2. Install node.js and npm:

https://nodejs.org/en/

## 3. Install dependencies (optionally you could install [yarn](https://yarnpkg.com/)):

Navigate to the cloned repo’s directory.

Run:

`npm install`

or if you choose yarn, just run `yarn`

## 4. Run the development server:

Run:

`npm run dev`

This will run a server so you can run the game in a browser.

Open your browser and enter localhost:3000 into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser.

## Build for deployment:

Run:

`npm run deploy`

This will optimize and minimize the compiled bundle.

# Thanks to

-   @nkholski for his awesome [Phaser3 ES6 boilerplate code](https://github.com/nkholski/phaser3-es6-webpack)
