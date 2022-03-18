module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["plugin:vue/recommended", "plugin:prettier/recommended"],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		requireConfigFile: true,
		ecmaFeatures: {
			jsx: true,
		},
		vueFeatures: {
			filter: true,
			interpolationAsNonHTML: false,
		},
	},
	plugins: ["vue"],
	rules: {
		"no-unused-vars": "error",
		"vue/no-multiple-template-root": "error",
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				useTabs: true,
			},
		],
		"no-tabs": "off",
	},
	settings: {
		"import/resolver": ["node"],
	},
};
