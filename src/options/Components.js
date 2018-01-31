import AccentsOnly from './components/AccentsOnly';
import AlbumAccents from './components/AlbumAccents';
import Core from './components/Core';
import Enabled from './components/Enabled';
import Favicon from './components/Favicon';
import LargeTable from './components/LargeTable';
import Logo from './components/Logo';
import Menus from './components/Menus';
import Playlists from './components/Playlists';
import Queue from './components/Queue';
import Settings from './components/Settings';
import SoundSearch from './components/SoundSearch';
import StaticSidebars from './components/StaticSidebars';

export default [
  // Core
  Core,
  Logo,
  Settings,

  // General
  AccentsOnly,
  Enabled,

  // Colorize
  AlbumAccents,

  // Customize
  Favicon,
  Queue,
  LargeTable,
  StaticSidebars,

  // Menus
  Menus,

  // Playlists
  Playlists,
  SoundSearch,
];
