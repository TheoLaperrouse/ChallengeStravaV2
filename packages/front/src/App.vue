<script setup lang="ts">
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useAuth } from "./composables/useAuth.js";

const { user } = useAuth();
const route = useRoute();
</script>

<template>
	<div class="min-h-screen bg-dark">
		<Navbar v-if="user" />
		<main
			:class="[
				'px-4 py-6 sm:px-6 lg:px-8',
				route.meta.fullWidth ? '' : 'mx-auto max-w-7xl',
			]"
		>
			<router-view />
		</main>
		<footer v-if="user" class="border-t border-dark-border py-4 text-center">
			<div class="flex flex-col items-center gap-2">
				<a href="https://www.strava.com" target="_blank" rel="noopener noreferrer">
					<img
						src="/powered_by_strava_orange.svg"
						alt="Powered by Strava"
						class="h-6"
					/>
				</a>
				<router-link to="/privacy" class="text-xs text-concrete hover:text-offwhite">
					Politique de confidentialit&eacute;
				</router-link>
			</div>
		</footer>
	</div>
</template>
