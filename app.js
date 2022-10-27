import express from 'express'
import bodyParser from 'body-parser'
import db from './db/db.js'
const app = express()
const port = 3001

function error(status, msg) {
	var err = new Error(msg)
	err.status = status
	return err
}

db.dbInit()

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/applications', async (req, res) => {
	let application = req.body
	console.log(application)

	// validate first
	if (!db.validateApplication(application)) {
		let errors = db.getApplicationErrors(application)
		return res.status(400).json({ errors: errors })
	}

	let result = await db.saveApplication(application)
	if (result) {
		return res.send({ application: result })
	}

	//add errors here
	return res.status(400)
})

app.get('/applications/:id', (req, res) => {
	let application = db.getApplication(req.params.id)
	if (application != null && application != [] && application != {}) {
		res.json({ application: application })
	} else {
		res.status(404).json({})
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
