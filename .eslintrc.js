module.exports = {
	"extends": "airbnb",
  "parser": "babel-eslint",
	"rules": {
    "react/prop-types": 0,
    "comma-dangle": ["error", "never"],
    "max-len": 0,
    "react/no-danger": 0
	},
	"globals": {
		"document": true,
		"window": true,
    "sessionStorage": true
	}
}