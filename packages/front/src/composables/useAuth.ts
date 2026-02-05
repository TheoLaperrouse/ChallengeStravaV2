import { ref } from "vue";
import type { User } from "../types/index.js";
import { useApi } from "./useApi.js";

const user = ref<User | null>(null);

export function useAuth() {
	const { get, post } = useApi();

	async function fetchUser() {
		try {
			user.value = await get<User>("/auth/me");
		} catch {
			user.value = null;
		}
	}

	function login() {
		window.location.href = "/api/auth/login";
	}

	async function logout() {
		await post("/auth/logout");
		user.value = null;
		window.location.href = "/login";
	}

	return { user, fetchUser, login, logout };
}
