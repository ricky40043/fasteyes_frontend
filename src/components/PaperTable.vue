<template>
  <table class="w-full text-left border-collapse" :class="tableClass">
    <thead class="border-b">
    <slot name="columns">
      <th lass="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800" v-for="column in columns" :key="column">{{column}}</th>
    </slot>
    </thead>
    <tbody>
      <th lass="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800" v-for="column in columns" :key="column">{{column}}</th>
    <!-- <tr class="hover:bg-gray-200" v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td class="px-6 py-4 text-lg text-gray-700 border-b" v-for="(column, index) in columns" :key="index">
          {{itemValue(item, column)}}
        </td>
      </slot>
    </tr> -->
    </tbody>
  </table>
</template>


<script>
export default {
  name: 'paper-table',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style>
</style>
