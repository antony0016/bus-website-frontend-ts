import { defineStore } from "pinia";

const useTodoListSampleStore = defineStore('TodoListSampleStore', {
  state: () => ({
    TodoList: [
      { title: 'first', content: '123' }
    ]
  }),
  getters: {},
  actions: {
    newTodo: function (payload: { todo: { title: string, content: string } }) {
      this.TodoList.push(payload.todo)
    }
  }
})

export default useTodoListSampleStore;
