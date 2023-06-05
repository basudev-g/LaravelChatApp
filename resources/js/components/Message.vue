<template>
  <div>
    <li class="list-group-item" :class="ClassName"><slot></slot></li>
    <small class="badge float-end" :class="BadgeColor">You</small>
  </div>
</template>

<script>
export default {
  props: ["color"],

  computed: {
    ClassName() {
      return "list-group-item-" + this.color;
    },
    BadgeColor(){
        return 'bg-'+ this.color;
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
