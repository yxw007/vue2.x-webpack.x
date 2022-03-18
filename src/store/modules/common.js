export default {
	state: {
		user_name: "小明",
	},

	getters: {
		user_name: (state) => state.user_name,
	},

	mutations: {
		SET_USER_NAME: (state, data) => {
			state.user_name = data;
		},
	},
};
