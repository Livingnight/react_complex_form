import React from 'react'
import { Link } from 'react-router-dom'
import LookupForm from './LookupApp'

const Home = () => {
	return (
		<div>
			<h1>Sponsor Our Event</h1>
			<div>
				<h3>Fill out the application</h3>
				<Link to='/apps'>Get started</Link>
			</div>
			<div>
				<h3>Check the status of an existing application</h3>
				<LookupForm />
			</div>
		</div>
	)
}

export { Home as default }
