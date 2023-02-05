import { Page, Router } from '@happysanta/router';
import { useSelector } from 'react-redux';
import axios from './axios.js';

export const PAGE_INTRO = '/';
export const PAGE_REGISTER = '/register';
export const PAGE_TRAINING = '/training';
export const PAGE_SETTINGS = '/settings';
export const PAGE_PAUSE = '/pause';
export const PAGE_MAIN = '/main';
export const PAGE_PROPERTY = '/property';
export const PAGE_BANK = '/bank';
export const PAGE_PROFILE = '/profile';

export const PANEL_INTRO = 'panel_intro';
export const PANEL_REGISTER = 'panel_register';
export const PANEL_TRAINING = 'panel_training';
export const PANEL_SETTINGS = 'panel_settings';
export const PANEL_PAUSE = 'panel_pause';
export const PANEL_MAIN = 'panel_main';
export const PANEL_PROPERTY = 'panel_property';
export const PANEL_BANK = 'panel_bank';
export const PANEL_PROFILE = 'panel_profile';

export const VIEW_MAIN = 'view_main';

const routes = {
	[PAGE_INTRO]: new Page(PANEL_INTRO, VIEW_MAIN),
	[PAGE_REGISTER]: new Page(PANEL_REGISTER, VIEW_MAIN),
	[PAGE_TRAINING]: new Page(PANEL_TRAINING, VIEW_MAIN),
	[PAGE_SETTINGS]: new Page(PANEL_SETTINGS, VIEW_MAIN),
    [PAGE_PAUSE]: new Page(PANEL_PAUSE, VIEW_MAIN),
    [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
    [PAGE_PROPERTY]: new Page(PANEL_PROPERTY, VIEW_MAIN),
    [PAGE_BANK]: new Page(PANEL_BANK, VIEW_MAIN),
    [PAGE_PROFILE]: new Page(PANEL_PROFILE, VIEW_MAIN),
};

export const router = new Router(routes);


router.start();