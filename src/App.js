import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useDispatch } from 'react-redux';

import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './panels/Main';
import Property from './panels/Property';
import Bank from './panels/Bank';
import Intro from './panels/Intro';
import Register from './panels/Register';
import Training from './panels/Training';
import Settings from './panels/Settings';
import Pause from './panels/Pause';
import Profile from './panels/Profile';
import AppLayout from './components/AppLayout';

import { getHouses } from './redux/slices/housesSlice';
import { getCars } from './redux/slices/carsSlice';
import { getBizs } from './redux/slices/bizsSlice';
import { getUsers, getProfs } from './redux/slices/userSlice.js';
import { AdaptivityProvider, AppRoot, ConfigProvider, SplitCol, SplitLayout } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [fetchedUser, setUser] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getHouses())
		dispatch(getCars())
		dispatch(getBizs())
		dispatch(getUsers())
		dispatch(getProfs())

		bridge.subscribe(({ detail: { type, data }}) => {
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

	return (
		<ConfigProvider scheme={scheme}  isWebView={true}>
			<AdaptivityProvider>
				<AppRoot>
					<Routes>
						<Route path='/' element={<AppLayout/>}/>
						<Route index element={<Intro fetchedUser={fetchedUser} />}/>
						<Route path='register' element={<Register fetchedUser={fetchedUser} />}/>
						<Route path='training' element={<Training fetchedUser={fetchedUser} />}/>
						<Route path='settings' element={<Settings fetchedUser={fetchedUser} />}/>
						<Route path='pause' element={<Pause fetchedUser={fetchedUser} />}/>
						<Route path='main/' element={<Layout fetchedUser={fetchedUser} />}>
							<Route path='main' element={<Main/>}/>
							<Route path='property' element={<Property/>}/>
							<Route path='bank' element={<Bank/>}/>
							<Route path='profile' element={<Profile/>}/>
						</Route>
					</Routes>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
