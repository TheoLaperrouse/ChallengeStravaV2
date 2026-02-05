<script setup lang="ts">
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import type { Activity } from "../../types/index.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps<{
	activities: Activity[];
}>();

const chartData = computed(() => {
	const monthly: Record<string, number> = {};

	for (const a of props.activities) {
		if (!a.startDate) continue;
		const date = new Date(a.startDate);
		const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		monthly[key] = (monthly[key] ?? 0) + 1;
	}

	const sortedKeys = Object.keys(monthly).sort();

	return {
		labels: sortedKeys.map((k) => {
			const [year, month] = k.split("-");
			return `${month}/${year}`;
		}),
		datasets: [
			{
				label: "Nombre d'activités",
				data: sortedKeys.map((k) => monthly[k]),
				backgroundColor: "rgba(59, 130, 246, 0.7)",
				borderRadius: 4,
			},
		],
	};
});

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false },
		title: { display: true, text: "Activités par mois" },
	},
	scales: {
		y: { beginAtZero: true, ticks: { stepSize: 1 } },
	},
};
</script>

<template>
	<div class="rounded-lg bg-white p-6 shadow">
		<div class="h-64">
			<Bar v-if="activities.length > 0" :data="chartData" :options="chartOptions" />
			<p v-else class="flex h-full items-center justify-center text-sm text-gray-400">
				Aucune donnée
			</p>
		</div>
	</div>
</template>
