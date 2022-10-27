import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import { Validator } from 'jsonschema'
import { validate as validateEmail } from 'email-validator'

const db__dirname = dirname(fileURLToPath(import.meta.url))
const v = new Validator()

// Use JSON file for storage
const file = join(db__dirname, 'db.json')
const adapter = new JSONFile(file)
const low = new Low(adapter)

const sponsorshipLevels = ['gold', 'silver', 'bronze']
const applicationSchema = {
	id: '/Application',
	type: 'object',
	properties: {
		company_name: { type: 'string', maxLength: 128 },
		contact_name: { type: 'string', maxLength: 128 },
		contact_email: { type: 'string', format: 'email' },
		sponsorship_level: { type: 'string' },
		comments: { type: 'string', maxLength: 512 },
		contact_about_future_ops: { type: 'boolean' },
	},
	required: [
		'company_name',
		'contact_name',
		'contact_email',
		'sponsorship_level',
	],
}
v.addSchema(applicationSchema, '/Application')

const db = {
	dbInit: async function () {
		// Read data from JSON file, this will set db.data content
		await low.read()

		// If file.json doesn't exist, db.data will be null
		// Set default data
		low.data = low.data || { applications: [] } // Node < v15.x
		//db.data ||= { application: [] }             // Node >= 15.x

		// Write db.data content to db.json
		await low.write()
	},

	getApplicationErrors: function (application) {
		let errors = {}
		// sponsorship_level
		if (
			application.sponsorship_level == undefined &&
			!(application.sponsorship_level in sponsorshipLevels)
		) {
			errors.sponsorship_level = 'Sponsorship level is not included in the list'
		}
		// contact_email
		if (
			application.contact_email == undefined ||
			!validateEmail(application.contact_email)
		) {
			errors.contact_email = 'Contact email is invalid'
		}
		// company_name, contact_name
		if (application.company_name == undefined) {
			errors.company_name = "Company name can't be blank"
		}
		if (application.contact_name == undefined) {
			errors.contact_name = "Contact name can't be blank"
		}
		return errors
	},

	validateApplication: function (application) {
		let result = v.validate(application, applicationSchema, {
			allowUnknownAttributes: false,
		})
		return result.valid
	},

	saveApplication: async function (application) {
		let newApp = application
		newApp.id = uuidv4()
		newApp.created_at = newApp.updated_at = new Date().toISOString()

		low.data.applications.push(newApp)
		await low.write()
		return newApp
	},

	getApplication: function (applicationId) {
		const { applications } = low.data
		let application = applications.filter(function (application) {
			if (application.id == applicationId) {
				return application
			}
		})
		if (application.length < 1) {
			return null
		}
		return application[0]
	},
}

export default db
