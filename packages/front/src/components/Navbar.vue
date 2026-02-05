<script setup lang="ts">
import { useAuth } from "../composables/useAuth.js";

const { user, logout } = useAuth();
</script>

<template>
	<nav class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between items-center">
				<div class="flex items-center gap-8">
					<span class="text-xl font-bold text-orange-600">Challenge Strava</span>
					<div class="flex gap-4">
						<router-link
							to="/dashboard"
							class="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
							active-class="text-orange-600 border-b-2 border-orange-600"
						>
							Mon Dashboard
						</router-link>
						<router-link
							to="/global"
							class="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
							active-class="text-orange-600 border-b-2 border-orange-600"
						>
							Classement
						</router-link>
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div v-if="user" class="flex items-center gap-2">
						<img
							v-if="user.avatarUrl"
							:src="user.avatarUrl"
							:alt="user.firstname ?? ''"
							class="h-8 w-8 rounded-full"
						/>
						<span class="text-sm text-gray-700">
							{{ user.firstname }} {{ user.lastname }}
						</span>
					</div>
					<button
						@click="logout"
						class="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
					>
						Déconnexion
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>
