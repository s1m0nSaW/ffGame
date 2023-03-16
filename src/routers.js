import { Page, Router } from '@happysanta/router';
import { useSelector } from 'react-redux';
import axios from './axios.js';
import bridge from '@vkontakte/vk-bridge'

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

let arr = [];

router.on('update', (nextRote, oldRoute) => {
	nextRote.getPageId() // /product/:id([0-9]+)
	nextRote.getParams() // { id: "12" }
	nextRote.getPanelId() // panel_product
	nextRote.getViewId() // view_main
	nextRote.getLocation() // /product/12
	nextRote.isModal() // false
	nextRote.isPopup() // false
	nextRote.hasOverlay() // false

    

    /*if (oldRoute) {
        arr.push(nextRote.getLocation())
        if (arr.length == 4) {
            bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' });
        }
        if (arr.length == 5) {
            bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
                .then((data) => {
                    if (data.result)
                        {console.log('Реклама показана');
                        arr.length=0}
                    else
                        console.log('Ошибка при показе');
                })
                .catch((error) => { console.log(error); });
        }

    } */
});

router.start();