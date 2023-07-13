<template>
  <div
    v-if="showModal"
    class="modal d-flex align-items-center justify-content-center"
    tabindex="-1"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editingMode ? editedPost.title : post.title }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>작성자: {{ post.author }}</p>
          <p>날짜: {{ formatDate(post.date) }}</p>
          <p>내용: {{ editingMode ? editedPost.context : post.context }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deletePost">
            Delete
          </button>
          <button
            v-if="!editingMode" 
            type="button"
            class="btn btn-primary"
            @click="toggleEditingMode"
          >
            Edit
          </button>
          <button
            v-else 
            type="button"
            class="btn btn-success"
            @click="updatePost"
          >
            Save
          </button>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
        </div>
        <div v-if="editingMode"> <!-- 입력 가능한 블록 추가 -->
          <input v-model="editedPost.title" class="form-control" placeholder="Title" />
          <textarea v-model="editedPost.context" class="form-control" placeholder="Content"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      editingMode: false,
      editedPost: {
        title: '',
        context: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, options)
    },
    toggleEditingMode() { // 수정 모드를 토글하는 메서드로 변경
      this.editingMode = !this.editingMode;
      if (this.editingMode) {
        this.editedPost.title = this.post.title;
        this.editedPost.context = this.post.context;
      }
    },
    async updatePost() {
      const { id } = this.post;

      try {
        await axios.put(`http://localhost:3001/posts/${id}`, this.editedPost);
        this.$emit('postUpdated');
        alert(`Post with id ${id} was updated successfully.`);
        this.closeModal();

        // 글을 수정한 후에 글 목록을 다시 정렬하여 업데이트
        this.$emit('refreshPostList'); // 부모 컴포넌트에 이벤트를 발생시켜 글 목록을 다시 로드하도록 요청
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost() {
      try {
        await axios.delete(`http://localhost:3001/posts/${this.post.id}`);
        this.$emit('postDeleted');
        alert(`${this.post.id}번 글이 삭제되었습니다.`);
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
  },
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
  background-color: rgba(0, 0, 0, 0.5);
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
  width: 500px;
  height: 600px;
  max-width: 100%;
  max-height: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
</style>

