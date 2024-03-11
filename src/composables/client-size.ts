import { onMounted, ref, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

export default function useClientSize() {

  const width: Ref<number> = ref(0);
  const height: Ref<number> = ref(0);

  function computeSize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {

    window.addEventListener('resize', computeSize)

    width.value = window.innerWidth;
    height.value = window.innerHeight;
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', computeSize);
  })

  return { width, height }
}