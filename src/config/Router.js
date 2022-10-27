import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import PageNotFound from '../components/PageNotFound'
import ApplicationForm from '../components/application/application_form'
import ApplicationDetails from '../components/application/application_detail'

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/apps'
				element={<ApplicationForm />}
			/>
			<Route
				path='/apps/:applicationId'
				element={<ApplicationDetails />}
			/>
			<Route
				path='*'
				element={<PageNotFound />}
			/>
		</Routes>
	</BrowserRouter>
)

export { Router as default }
