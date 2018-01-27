import AccentsOnly from './components/AccentsOnly';
import Core from './components/Core';
import Enabled from './components/Enabled';
import FAB from './components/FAB';
import Favicon from './components/Favicon';
import Logo from './components/Logo';
import Menus from './components/Menus';
import Playlists from './components/Playlists';
import Queue from './components/Queue';
import SoundSearch from './components/SoundSearch';

// Categorized for My Sanity
const CORE = [Core, FAB, Logo];
const GENERAL = [AccentsOnly, Enabled];
const CUSTOMIZE = [Favicon, Queue];
const MENUS = [Menus];
const PLAYLISTS = [Playlists, SoundSearch];

export default [...CORE, ...GENERAL, ...CUSTOMIZE, ...MENUS, ...PLAYLISTS];
