import {RollController} from "./components/roll_controller";
import {SiteThemeController} from "./components/site_theme_controller";
import {RollModifiersController} from './components/roll_modifiers_controller';
import {DifficultyTable} from "./components/quickreference/difficulty_table";
import {PageManager} from "./pages/page_manager";

new PageManager(/* defaultPageID = */ "dieRoller");
const rollModifiersCtrl = new RollModifiersController();
new RollController(rollModifiersCtrl);
new SiteThemeController();

// Quick reference page
new DifficultyTable();
