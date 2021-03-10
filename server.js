const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const usersRouter = require("./users/users-router")
const db = require("./database/config")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // for laws against setting cookies automatically
	secret: "keep it secret keep it safe", // cryptographically sign the session/cookie
	store: new KnexSessionStore({
		knex: db, // pass configured instance of knex
		createtable: true, // if the session table does not exist, create it
	}),
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
