import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

async function sendApplicationHandler(applicationDetails) {
	console.log(applicationDetails)
	const response = await fetch('http://localhost:3000/applications', {
		method: 'POST',
		body: JSON.stringify(applicationDetails),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong! Try again later')
	}
	return data
}

export default function ApplicationForm() {
	const navigate = useNavigate()

	const enteredCompanyName = useRef()
	const enteredContactName = useRef()
	const enteredContactEmail = useRef()
	const enteredSponsorshipLevel = useRef()
	const enteredComments = useRef()
	const booleanContactLater = useRef(null)

	async function handleApplicationSubmit(e) {
		e.preventDefault()

		try {
			const response = await sendApplicationHandler({
				company_name: enteredCompanyName.current.value,
				contact_name: enteredContactName.current.value,
				contact_email: enteredContactEmail.current.value,
				sponsorship_level: enteredSponsorshipLevel.current.value,
				comments: enteredComments.current.value,
				contact_about_future_ops: booleanContactLater.current.checked,
			})

			const applicationId = response.application.id

			// console.log('application response: ' + JSON.stringify(response))

			navigate(`/apps/${applicationId}`)
		} catch (error) {
			console.log(error.message)
		} finally {
		}
	}
	return (
		<>
			<Link to='/'>Home</Link>

			<h1>Apply To Sponsor</h1>
			<form onSubmit={handleApplicationSubmit}>
				<div>
					<label
						aria-label='company name'
						htmlFor='company_name'
					>
						Company Name:
					</label>
					<input
						type='text'
						id='company_name'
						ref={enteredCompanyName}
						required
					/>
				</div>
				<div>
					<label
						aria-label='contact name'
						htmlFor='contact_name'
					>
						Contact Name:
					</label>
					<input
						type='text'
						id='contact_name'
						ref={enteredContactName}
						required
					/>
				</div>
				<div>
					<label
						aria-label='contact email'
						htmlFor='contact_email'
					>
						Contact Email:
					</label>
					<input
						type='email'
						id='contact_email'
						ref={enteredContactEmail}
						required
					/>
				</div>
				<div>
					<label
						aria-label='sponsorship_level'
						htmlFor='sponsorship_level'
					>
						Sponsorship Level
					</label>
					<select
						name='sponsorship_level'
						id='sponsorship_level'
						ref={enteredSponsorshipLevel}
						required
					>
						<option value=''>Choose A Level</option>
						<option value='gold'>Gold</option>
						<option value='silver'>Silver</option>
						<option value='bronze'>Bronze</option>
					</select>
				</div>
				<div>
					<label htmlFor='comments'>Comments</label>
					<textarea
						rows='5'
						ref={enteredComments}
					></textarea>
				</div>
				<div>
					<label htmlFor='contactAboutFutureOps'>
						<input
							type='checkbox'
							id='contactAboutFutureOps'
							name='contactAboutFutureOps'
							ref={booleanContactLater}
						/>
						Contact about future sponsorship opportunities?
					</label>
				</div>

				<button>Submit</button>
			</form>
		</>
	)
}
