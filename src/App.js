import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, withRouter } from '@happysanta/router';

import { VIEW_MAIN, PANEL_INTRO, PANEL_REGISTER, PANEL_TRAINING, PANEL_SETTINGS, PANEL_PAUSE, PANEL_MAIN, PANEL_PROPERTY, PANEL_BANK, PANEL_PROFILE } from './routers';

import Main from './panels/Main';
import Property from './panels/Property';
import Bank from './panels/Bank';
import Intro from './panels/Intro';
import Register from './panels/Register';
import Training from './panels/Training';
import Settings from './panels/Settings';
import Pause from './panels/Pause';
import Profile from './panels/Profile';

import { getHouses } from './redux/slices/housesSlice';
import { getCars } from './redux/slices/carsSlice';
import { getBizs } from './redux/slices/bizsSlice';
import { getUsers, getProfs, setDebts, setGreetings } from './redux/slices/userSlice.js';
import { AppRoot, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { ThemeProvider, createTheme } from '@mui/material';

const App = () => {
	const [scheme, setScheme] = useState('bright_light') //space_gray  bright_light
	const [fetchedUser, setUser] = useState(null)
	const user = useSelector((state) => state.user.user)
	const theme = useSelector((state) => state.user.theme)

	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		if (Object.keys(user).length != 0) {
			if (user.debts > 0) { dispatch(setDebts(true)) } else { dispatch(setDebts(false)) }
			if (user.greetingIn.length > 0) { dispatch(setGreetings(true)) } else { dispatch(setGreetings(false)) }
		}
	}, [user])

	useEffect(() => {
		dispatch(getHouses())
		dispatch(getCars())
		dispatch(getBizs())
		dispatch(getUsers())
		dispatch(getProfs())

		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();


	}, []);

	const themeSettings = () => {
		if(theme == 'dark'){
			return {
				palette: {
					mode: "dark"
				},
				typography: {
					fontFamily: [
						'Jura',
						'sans-serif'
					].join(','),
				},
			}
		} else
		if(theme == 'light'){
			return{
				palette: {
					mode: "light",
					background: {
						default: '#FFFFFF',
						paper: '#F2F2F2'
					}
				},
				typography: {
					fontFamily: [
						'Jura',
						'sans-serif'
					].join(','),
				},
			}
		} else
		if(theme == 'auto'){
			if(scheme == 'bright_light'){
				return{
					palette: {
						mode: "light",
						background: {
							default: '#FFFFFF',
							paper: '#F2F2F2'
						}
					},
					typography: {
						fontFamily: [
							'Jura',
							'sans-serif'
						].join(','),
					},
				}
			} else {
				return {
					palette: {
						mode: "dark"
					},
					typography: {
						fontFamily: [
							'Jura',
							'sans-serif'
						].join(','),
					},
				}
			}
		}
	}

	const themeMode = createTheme(themeSettings())
	return (
		<AppRoot>
			<ThemeProvider theme={themeMode}>
				<View
					id={VIEW_MAIN}
					history={location.hasOverlay() ? [] : location.getViewHistory(VIEW_MAIN)}
					activePanel={location.getViewActivePanel(VIEW_MAIN)}>
					<Intro id={PANEL_INTRO} fetchedUser={fetchedUser} />
					<Register id={PANEL_REGISTER} fetchedUser={fetchedUser} />
					<Training id={PANEL_TRAINING} />
					<Settings id={PANEL_SETTINGS} fetchedUser={fetchedUser} />
					<Pause id={PANEL_PAUSE} />
					<Main id={PANEL_MAIN} fetchedUser={fetchedUser} />
					<Property id={PANEL_PROPERTY} fetchedUser={fetchedUser} />
					<Bank id={PANEL_BANK} fetchedUser={fetchedUser} />
					<Profile id={PANEL_PROFILE} fetchedUser={fetchedUser} />
				</View>
			</ThemeProvider>
		</AppRoot>
	);
}

export default withRouter(App);
