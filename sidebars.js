/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    'core-concepts',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api-reference/player-api',
        'api-reference/npc-api',
        'api-reference/item-api',
        'api-reference/guild-api',
        'api-reference/game-api',
        'api-reference/party-api',
        'api-reference/dungeon-api',
        'api-reference/other-apis',
      ],
    },
    'user-interface',
    'advanced-topics',
    'best-practices',
    'reference',
  ],
};

module.exports = sidebars;
