<template>
  <div class="analytics">
    <h1 class="text-4xl font-bold my-7">Аналитика</h1>
    <GraphComponent/>
  </div>
</template>
<script>
import GraphComponent from "@/components/GraphComponent";

export default {
  name: 'AnalyticsView',
  components: {
    GraphComponent
  },
  created() {
    if (localStorage.getItem('leadhit-site-id') == null) {
      this.$router.push('/');
    }
  }
}
</script>
