<script setup lang="ts">
import type { LeaderboardEntry } from "../types/index.js";

defineProps<{
	leaderboard: LeaderboardEntry[];
}>();

function formatDistance(meters: string | null): string {
	if (!meters) return "0 km";
	return `${(Number(meters) / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: string | null): string {
	if (!seconds) return "0h";
	const totalSec = Number(seconds);
	const h = Math.floor(totalSec / 3600);
	const m = Math.floor((totalSec % 3600) / 60);
	return `${h}h ${m}m`;
}
</script>

<template>
	<div class="overflow-x-auto rounded-lg bg-white shadow">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">#</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Athlète</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Activités</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Distance</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Temps</th>
					<th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">D+</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<tr v-for="(entry, index) in leaderboard" :key="entry.userId" class="hover:bg-gray-50">
					<td class="px-4 py-3 text-sm font-bold text-gray-900">
						<span
							:class="{
								'text-yellow-500': index === 0,
								'text-gray-400': index === 1,
								'text-orange-400': index === 2,
							}"
						>
							{{ index + 1 }}
						</span>
					</td>
					<td class="px-4 py-3">
						<div class="flex items-center gap-3">
							<img
								v-if="entry.avatarUrl"
								:src="entry.avatarUrl"
								:alt="entry.firstname ?? ''"
								class="h-8 w-8 rounded-full"
							/>
							<div
								v-else
								class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600"
							>
								{{ (entry.firstname?.[0] ?? '') + (entry.lastname?.[0] ?? '') }}
							</div>
							<span class="text-sm font-medium text-gray-900">
								{{ entry.firstname }} {{ entry.lastname }}
							</span>
						</div>
					</td>
					<td class="px-4 py-3 text-right text-sm text-gray-900">
						{{ entry.totalActivities }}
					</td>
					<td class="px-4 py-3 text-right text-sm font-semibold text-gray-900">
						{{ formatDistance(entry.totalDistance) }}
					</td>
					<td class="px-4 py-3 text-right text-sm text-gray-900">
						{{ formatDuration(entry.totalMovingTime) }}
					</td>
					<td class="px-4 py-3 text-right text-sm text-gray-900">
						{{ entry.totalElevation ? `${Math.round(Number(entry.totalElevation))} m` : '0 m' }}
					</td>
				</tr>
				<tr v-if="leaderboard.length === 0">
					<td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500">
						Aucun participant pour le moment.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
