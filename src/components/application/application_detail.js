import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ApplicationDetails() {
	let { applicationId } = useParams()
	const [application, setApplication] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('http://localhost:3000/applications/' + applicationId)
			.then(response => response.json())
			.then(data => {
				setIsLoading(false)
				setApplication(data.application)
			})
	}, [applicationId])

	const loadingMessage = <p>Loading...</p>
	const errorMessage = (
		<>
			<p>Something went wrong. Please check the Id you entered</p>
			<Link to='/'>Home</Link>
		</>
	)

	return (
		<>
			{isLoading && loadingMessage}
			{!isLoading && !application && errorMessage}
			{application && (
				<>
					<Link to='/'>Home</Link>
					<h1>Your Application</h1>
					<p>
						<strong>Your application is pending approval</strong>
					</p>
					<h4>id</h4>
					<p> {applicationId} </p>
					<h4>Company Name:</h4>
					<p>{application.company_name}</p>
					<h4>Contact Name:</h4>
					<p>{application.contact_name}</p>
					<h4>Contact Email:</h4>
					<p>{application.contact_email}</p>
					<h4>Sponsorship Level:</h4>
					<p>{application.sponsorship_level}</p>
					{application.comments && (
						<div>
							<h4>Tell us a little more about your company</h4>
							<p>{application.comments}</p>
						</div>
					)}
					<div>
						<p>
							<strong>Contact about future sponsorship opportunities?</strong>
						</p>
						<p>{application.contact_about_future_ops ? '\nYes' : '\nNo'}</p>
					</div>
				</>
			)}

			{console.log('The application state: ' + JSON.stringify(application))}
		</>
	)
}
