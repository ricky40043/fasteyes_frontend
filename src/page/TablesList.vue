<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div class="table-full-width table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card>
      </div>

      <!-- <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </paper-table>
          </div>
        </card>
      </div>

      <div class="col-12">
        <card :title="table3.title" :subTitle="table3.subTitle">
          <div class="table-full-width table-responsive">
            <paper-table :data="table3.data" :columns="table3.columns" />

          </div>
        </card>
      </div> -->
    </div>
</template>

<script>
import  PaperTable  from "../components/PaperTable.vue";
const tableColumns = ["裝置名稱", "時間", "部門", "ID", "人員", "體溫", "類型"];
// const tableColumns = ["deviceName", "time", "department", "ID", "staff", "temperature", "status"];
// const tableColumns = ["deviceName"];
const tableData = [
  {
    deviceName: "FasteyesDevice1",
    time: "2021.02.28 21:40:06",
    department: "RD",
    ID: "400430012",
    staff: "ricky",
    temperature: "36.8°C",
    status: "0"
  }
];
export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData]
      }
      // table2: {
      //   title: "Table on Plain Background",
      //   subTitle: "Here is a subtitle for this table",
      //   columns: [...tableColumns],
      //   data: [...tableData]
      // }
    };
  }
};
</script>