import Core from './components/0 - Core/Core';
import FAB from './components/0 - Core/FAB';
import AccentsOnly from './components/1 - General/AccentsOnly';
import Enabled from './components/1 - General/Enabled';
import Favicon from './components/3 - Customize/Favicon';

const CORE = {
  [Core.id]: Core,
  [FAB.id]: FAB
};

const GENERAL = {
  [AccentsOnly.id]: AccentsOnly,
  [Enabled.id]: Enabled
};

const CUSTOMIZE = {
  [Favicon.id]: Favicon
};

export default {
  ...CORE,
  ...GENERAL,
  ...CUSTOMIZE
};
