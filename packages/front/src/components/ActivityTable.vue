<script setup lang="ts">
import type { Activity } from "../types/index.js";

defineProps<{
	activities: Activity[];
}>();

function formatDistance(meters: number | null): string {
	if (!meters) return "-";
	return `${(meters / 1000).toFixed(2)} km`;
}

function formatDuration(seconds: number | null): string {
	if (!seconds) return "-";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	return h > 0 ? `${h}h${String(m).padStart(2, "0")}m` : `${m}m${String(s).padStart(2, "0")}s`;
}

function formatDate(date: string | null): string {
	if (!date) return "-";
	return new Date(date).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

function formatSpeed(mps: number | null): string {
	if (!mps) return "-";
	return `${(mps * 3.6).toFixed(1)} km/h`;
}
</script>

<template>
	<div class="overflow-x-auto rounded-lg bg-white shadow">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Nom</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Type</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Distance</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Durée</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">D+</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Vitesse moy.</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<tr v-for="activity in activities" :key="activity.id" class="hover:bg-gray-50">
					<td class="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
						{{ formatDate(activity.startDate) }}
					</td>
					<td class="px-4 py-3 text-sm font-medium text-gray-900">
						{{ activity.name }}
					</td>
					<td class="px-4 py-3 text-sm text-gray-600">
						{{ activity.sportType ?? activity.type }}
					</td>
					<td class="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900">
						{{ formatDistance(activity.distance) }}
					</td>
					<td class="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900">
						{{ formatDuration(activity.movingTime) }}
					</td>
					<td class="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900">
						{{ activity.totalElevationGain ? `${Math.round(activity.totalElevationGain)} m` : '-' }}
					</td>
					<td class="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900">
						{{ formatSpeed(activity.averageSpeed) }}
					</td>
				</tr>
				<tr v-if="activities.length === 0">
					<td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500">
						Aucune activité. Cliquez sur "Synchroniser" pour importer vos activités Strava.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
