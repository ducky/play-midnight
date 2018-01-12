const OPTIONS = [
  // Section - General
  {
    id: 'enabled',
    section: 'general',
    type: 'boolean',
    defaultValue: true,
    title: 'Enable Play Midnight',
    description: `This will temporarily disable/enable Play Midnight if you don't want it on all the time`,
  },
  {
    id: 'accentsOnly',
    section: 'general',
    type: 'boolean',
    defaultValue: false,
    title: 'Enable Light-Mode Accents',
    description: 'This enables custom accents when Play Midnight is disabled',
  },

  // Section - Colorize
  {
    id: 'accent',
    plural: 'accents',
    section: 'colorize',
    type: 'array',
    title: 'Accent Colors',
    description: `Customize the accent color to your heart's content`,
    defaultValue: 'default',
    defaultValues: [
      { id: 'default', name: 'Play Music (Default)', value: '#fb8521' },
      { id: 'blue-abyss', name: 'Blue Abyss', value: '#007AA5' },
      { id: 'midnight-oil', name: 'Midnight Oil', value: '#8400a3' },
      { id: 'prince-purple', name: 'Prince Purple', value: '#673ab7' },
      { id: 'redrum', name: 'Redrum', value: '#981046' },
      { id: 'rusty-spoon', name: 'Rusty Spoon', value: '#4c9014' },
    ],
  },

  // Section - Customize
  {
    id: 'favicon',
    section: 'customize',
    type: 'boolean',
    defaultValue: true,
    title: 'Show Play Midnight Favicon',
    description: `This is the icon that shows on your Google Play tab in the browser`,
  },
  {
    id: 'faviconAccent',
    section: 'customize',
    reliesOn: 'favicon',
    type: 'boolean',
    defaultValue: true,
    title: 'Show Accent Favicon',
    description: `Makes the favicon match your selected accent color instead of dark`,
  },
  {
    id: 'queue',
    section: 'customize',
    type: 'boolean',
    defaultValue: true,
    title: 'Enable Larger Queue',
    description: `Makes the now playing queue span across your screen further to prevent cutting off song titles`,
  },
  // {
  //   id: 'staticSidebar',
  //   section: 'customize',
  //   type: 'boolean',
  //   defaultValue: false,
  //   title: 'Enable Static Sidebar',
  //   description: `Show main sidebar on page load and keep it open permanently`,
  // },
  // {
  //   id: 'staticPlaylists',
  //   section: 'customize',
  //   type: 'boolean',
  //   defaultValue: false,
  //   title: 'Enable Static Playlists',
  //   description: `Show playlists sidebar on page load and keep it open permanently`,
  // },

  // Section - Visible Menus
  {
    id: 'myLibrary',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'My Library',
    description: `The home of your wonderful music collection`,
  },
  {
    id: 'recent',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Recent Activity',
    description: `Access to your most recently played and added music`,
  },
  {
    id: 'topCharts',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Top Charts',
    description: `Top songs and albums currently trending in Play Music`,
  },
  {
    id: 'newReleases',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'New Releases',
    description: `Newest albums and singles added to Play Music`,
  },
  {
    id: 'browseStations',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Browse Stations',
    description: `Radio stations brought directly to you from Google`,
  },
  {
    id: 'podcasts',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Podcasts',
    description: `Podcasts brought directly to you from Google`,
  },
  {
    id: 'shop',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Shop (Free Users Only)',
    description: `Shop menu for purchasing music if you're not an 'All Access' subscriber`,
  },
  {
    id: 'subscribe',
    section: 'visibleMenus',
    type: 'boolean',
    defaultValue: true,
    title: 'Subscribe Now (Free Users Only)',
    description: `Subscribe button for converting you to an 'All Access' subscriber`,
  },

  // Section - Visible Playlists
  {
    id: 'thumbsUp',
    section: 'visiblePlaylists',
    type: 'boolean',
    defaultValue: true,
    title: `Thumbs Up`,
    description: `All your favorite songs`,
  },
  {
    id: 'soundSearch',
    section: 'visiblePlaylists',
    type: 'boolean',
    defaultValue: false,
    title: `Sound search`,
    description: `The music you've found over time via Google Sound Search`,
  },
  {
    id: 'lastAdded',
    section: 'visiblePlaylists',
    type: 'boolean',
    defaultValue: true,
    title: `Last Added`,
    description: `All of your most recently added music`,
  },
  {
    id: 'freePurchased',
    section: 'visiblePlaylists',
    type: 'boolean',
    defaultValue: true,
    title: `Free and Purchased`,
    description: `The music you've paid for or collected over time`,
  },

  // Section - Default
  {
    id: 'devNote',
    type: 'string',
    title: 'Thanks!',
    description: `Here's a big old thanks for all you do!`,
  },
];

export const SECTIONS = [
  { id: 'general', title: 'General' },
  { id: 'colorize', title: 'Colorize' },
  { id: 'customize', title: 'Customize' },
  { id: 'visibleMenus', title: 'Visible Menus' },
  { id: 'visiblePlaylists', title: 'Visible Auto-Playlists' },
  { id: 'tidbits', title: 'Tidbits' },
  { id: 'default' },
];

export default OPTIONS;
