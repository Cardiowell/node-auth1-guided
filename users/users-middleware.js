function restrict() {
	return async (req, res, next) => {
		try {
			// if either of these values are missing, there is no valid session for this user
			if (!req.session || !req.session.user) {
				return res.status(403).json({
					message: "Invalid Credentials",
				})
			}

			next()
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}