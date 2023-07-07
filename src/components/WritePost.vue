<template>
  <div class="d-flex justify-content-center align-items-center vh-75">
    <div class="col-12 col-md-6">
      <h2 class="text-center">글 쓰기</h2>
      <!-- 글 작성 폼 -->
      <form @submit.prevent="submitPost">
        <div class="mb-3 d-flex flex-column align-items-center">
          <label for="title" class="form-label">제목</label>
          <input
            type="text"
            id="title"
            v-model="title"
            class="form-control"
            style="max-width: 300px"
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-center">
          <label for="context" class="form-label">내용</label>
          <textarea
            id="context"
            v-model="context"
            class="form-control"
            rows="10"
            style="max-width: 300px; resize: none"
          ></textarea>
        </div>
        <div
          class="d-flex justify-content-end"
          style="max-width: 300px; margin: 0 auto"
        >
          <button type="submit" class="btn btn-primary me-2">등록</button>
          <router-link to="/" class="btn btn-secondary">취소</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      context: '',
    }
  },
  methods: {
    async submitPost() {
      const post = {
        title: this.title,
        author: '전성진',
        context: this.context,
        date: new Date().toISOString(),
        views: 0,
      }

      try {
        const response = await axios.post('http://localhost:3001/posts', post)
        console.log(response.data)
        alert('등록되었습니다.')
        this.$router.push('/') // 글 작성후 '/' 경로로 이동
      } catch (error) {
        console.error('An error occurred while creating a new post:', error)
      }
    },
  },
}
</script>
