<template>
   <div v-if="showModal" class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ post.title }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>작성자: {{ post.author }}</p>
          <p>날짜: {{ formatDate(post.date) }}</p>
          <p>내용: {{ post.context }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deletePost">Delete</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
    async deletePost() {
      try {
        await axios.delete(`http://localhost:3001/posts/${this.post.id}`);
        this.$emit('postDeleted'); // post가 삭제되었다는 이벤트를 발생시킴
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, .5);
}

.modal-dialog {
  position: relative;
  margin: 1.75rem auto;
  pointer-events: none;
  max-width: 500px;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: .3rem;
  outline: 0;
}
</style>
