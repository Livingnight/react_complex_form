import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LookupForm = () => {
	const navigate = useNavigate()
	const [error, setError] = useState(false)

	const redirectToApplication = e => {
		e.preventDefault()
		const id = e.target.elements.id.value
		if (id.trim().length > 0) {
			navigate(`/apps/${id}`)
		} else {
			setError(true)
		}
	}

	return (
		<div>
			<form onSubmit={redirectToApplication}>
				<div>
					<label htmlFor='application_id'>Application id</label>
					<input
						name='id'
						type='text'
					/>
					{error && <p>Application id can't be blank</p>}
				</div>
				<button>Find application</button>
			</form>
		</div>
	)
}

export { LookupForm as default }
