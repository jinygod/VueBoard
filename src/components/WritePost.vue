<template>
  <div>
    <h2>글 쓰기</h2>
    <!-- 글 작성 폼 -->
    <form @submit.prevent="submitPost">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" id="title" v-model="title" class="form-control">
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">작성자</label>
        <input type="text" id="author" v-model="author" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">글 작성</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      author: '',
    };
  },
  methods: {
    submitPost() {
      // 글 작성 처리 로직
    },
  },
};
</script>
