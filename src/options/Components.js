import Core from './components/A - Core/Core';
import FAB from './components/A - Core/FAB';
import AccentsOnly from './components/B - General/AccentsOnly';
import Enabled from './components/B - General/Enabled';
import Favicon from './components/C - Customize/Favicon';
import Menus from './components/D - Menus/Menus';
import Playlists from './components/E - Playlists/Playlists';

const CORE = [Core, FAB];
const GENERAL = [AccentsOnly, Enabled];
const CUSTOMIZE = [Favicon];
const MENUS = [Menus];
const PLAYLISTS = [Playlists];

export default [...CORE, ...GENERAL, ...CUSTOMIZE, ...MENUS, ...PLAYLISTS];
