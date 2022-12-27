import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useDispatch } from 'react-redux';

import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './panels/Main';
import Home from './panels/Home';
import Property from './panels/Property';
import Bank from './panels/Bank';
import Intro from './panels/Intro';
import Register from './panels/Register';

import { getHouses } from './redux/slices/housesSlice';
import { getCars } from './redux/slices/carsSlice';
import { getBizs } from './redux/slices/bizsSlice';
import { getUsers, getProfs } from './redux/slices/userSlice.js';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [fetchedUser, setUser] = useState(null)

	const navigate = useNavigate()
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
		<>
			<Routes>
				<Route path='/' element={<Intro fetchedUser={fetchedUser} />}/>
				<Route path='/register' element={<Register fetchedUser={fetchedUser} />}/>
				<Route path='/main/' element={<Layout fetchedUser={fetchedUser} />}>
					<Route path='main' element={<Main/>}/>
					<Route path='property' element={<Property/>}/>
					<Route path='bank' element={<Bank/>}/>
					<Route path='home' element={<Home/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;