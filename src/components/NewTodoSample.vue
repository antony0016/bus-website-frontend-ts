<template>
  <simple-card title="瀏覽事項" style="margin-bottom: 20px">
    <el-table :data="TodoList">
      <el-table-column prop="title" label="標題"/>
      <el-table-column prop="content" label="內容"/>
    </el-table>
  </simple-card>
  <simple-card title="新建事項">
    <el-input v-model="title"></el-input>
    <el-input v-model="content"></el-input>
    <p></p>
    <el-button @click="sendTodo1" class="send-button">
      送出1
    </el-button>
    <p></p>
    <el-button @click="sendTodo2" class="send-button">
      送出2
    </el-button>
    <p>{{ title }}</p>
    <p>{{ content }}</p>
    <p>{{ TodoList }}</p>
  </simple-card>
</template>

<script setup lang="ts">

import useTodoListSampleStore from "../store/TodoListSampleStore";
import { ref, toRefs } from "vue";

const todoListSampleStore = useTodoListSampleStore();
const { TodoList } = toRefs(todoListSampleStore);
const { newTodo } = todoListSampleStore;

const title = ref("");
const content = ref("");

const clearUserInput = () => {
  title.value = ""
  content.value = ""
}

const sendTodo1 = () => {
  const todo = {
    title: title.value,
    content: content.value
  }
  newTodo({ todo: todo });
  clearUserInput()
}


const sendTodo2 = () => {
  TodoList.value.push({
    title: title.value,
    content: content.value
  })
  clearUserInput()
}

</script>

<style scoped>
.send-button {
  width: 100%;
}
</style>
