<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useAuth } from "./composables/useAuth.js";

const { user } = useAuth();
</script>

<template>
	<div class="min-h-screen bg-gray-50">
		<Navbar v-if="user" />
		<main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<router-view />
		</main>
	</div>
</template>
