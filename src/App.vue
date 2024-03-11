<script setup lang="ts">
import { computed, type ComputedRef, type Ref, ref } from 'vue'
import useClientSize from '@/composables/client-size'

const clientSize = useClientSize();

const rows: ComputedRef<number> = computed(() => {
  return Math.floor(clientSize.height.value / 24);
})

const taxOptions: Ref<Array<{ label: string, value: number }>> = ref([
  { label: 'VAT', value: 0.15 },
  { label: 'TAX 2', value: 0.02 },
  { label: 'TAX 10', value: 0.1 }
])

const records: Array<{ index: string, label: string, description: string }> = [
  {
    index: 'y',
    label: 'Gross Price',
    description: 'The price that appears on the receipt',
  },
  {
    index: 't',
    label: 'Tax Type',
    description: 'VAT (15%), TOT (2%) or TOT (10%)'
  },
  {
    index: 'x',
    label: 'Price Before Tax',
    description: 'The price before tax rate is added'
  },
  {
    index: 'w',
    label: 'Withheld Amount',
    description: 'The amount that is written into the Withholding Receipt'
  },
  {
    index: 'r',
    label: 'Paid Amount',
    description: 'The amount that is received by the seller'
  }
];



const input: Ref<{ y: number, t: number, x: number, w: number, r: number }> = ref({
  y: 0,
  t: 0.02,
  x: 0,
  w: 0,
  r: 0
})

const data: ComputedRef<{ y: number, t: string, x: number, w: number, r: number }> = computed(() => {
  return {
    'y': 15800.25,
    'x': 14322.22,
    'w': 205.22,
    'r': 150004.2
  }
});

function calculateTax(index: string) {
  console.log('hello world')
}

</script>

<template>

  <main class="fixed overflow-auto top-0 left-0 bottom-0 right-0">
    <h1 class="h-6 text-sm whitespace-nowrap font-bold flex items-center justify-center border-b border-gray-300 shadow-sm">Withholding Calculator</h1>

    <table class="h-[calc(100%-24px)] w-full bg-gray-50">

      <tr v-for="(record, r) in records" :key="r" class="group md:hover:bg-gray-100 md:hover:border-blue-500 h-6 border-b shadow-sm border-gray-300">
        <td class="border-r text-xs text-gray-500 w-fit px-1 xl:px-1.5 border-gray-300 text-center">{{ r + 1 }}</td>
        <td class="whitespace-nowrap pl-2 pr-2 md:pr-12 border-gray-300">{{ record.label }}</td>
        <td class="hidden md:table-cell w-full px-2 text-right text-gray-700">{{ record.description }}</td>
        <td class="px-2 whitespace-nowrap font-bold font-mono text-right pl-2 md:pl-12">
          <input v-if="record.index !== 't'" @input="calculateTax(record.index)" :value="input[record.index as keyof typeof input]" type="text" class="md:group-hover:bg-gray-100 w-full bg-gray-50 rounded-none outline-none outline-0 text-right" />
          <div v-else class="flex items-center justify-end gap-2.5">
            <div class="flex items-center gap-1" v-for="(option, o) in taxOptions" :key="o">
              <input type="radio" :value="option.value" v-model="input['t']" />
              <label class="text-xs">{{ option.label }}</label>
            </div>
          </div>
        </td>
        <td class="hidden sm:table-cell border-l text-xs text-gray-500 w-fit px-1 xl:px-1.5 border-gray-300 text-center">{{ r + 1 }}</td>
      </tr>

      <tr v-for="(row, r) in Math.max(rows - records.length, 0)" :key="r" class="md:hover:bg-gray-100 md:hover:border-blue-500 h-6 border-b shadow-sm border-gray-300">
        <td class="border-r text-xs text-gray-500 w-fit px-1 xl:px-1.5 border-gray-300 text-center">{{ row + records.length }}</td>
        <td class="whitespace-nowrap pl-2 pr-2 md:pr-12 border-gray-300"></td>
        <td class="hidden md:table-cell w-full px-2 text-right text-gray-700"></td>
        <td class="pr-2 whitespace-nowrap font-bold font-mono text-right pl-2 md:pl-12"></td>
        <td class="hidden sm:table-cell border-l text-xs text-gray-500 w-fit px-1 xl:px-1.5 border-gray-300 text-center">{{ row + records.length }}</td>
      </tr>

    </table>
  </main>

</template>