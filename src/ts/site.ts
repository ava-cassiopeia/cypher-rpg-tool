import {RollController} from "./components/roll_controller";
import {SiteThemeController} from "./components/site_theme_controller";
import {RollModifiersController} from './components/roll_modifiers_controller';

const rollModifiersCtrl = new RollModifiersController();
new RollController(rollModifiersCtrl);
new SiteThemeController();
