<template>
  <div class="table-containers">
    <h1>Vue Board</h1>
    <!-- 글 목록 표시 -->
    <table class="table table-hover custom-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <!-- 글 목록 아이템 반복 표시 -->
        <tr v-for="post in posts" :key="post.id" @click="handlePostClick(post)">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

.custom-table {
  max-width: 50%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.table-header {
  background-color: #f0f0f0;
}

.highlight-cell {
  color: blue;
}
</style>
<script>
export default {
  data() {
    return {
      posts: [], // 게시글 목록을 빈 배열로 초기화
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
    handlePostClick(post) {
      // 클릭한 글에 대한 동작 처리
      console.log("Clicked post:", post);
    },
    fetchPosts() {
      // 서버에서 게시글 목록을 가져오는 메소드
      fetch('http://localhost:3001/posts')
        .then(response => response.json())
        .then(data => {
          this.posts = data; // 가져온 게시글 목록을 데이터에 할당
        })
        .catch(error => {
          console.log('Error fetching posts:', error);
        });
    },
  },
  mounted() {
    this.fetchPosts(); // 컴포넌트가 마운트되면 게시글 목록을 가져오도록 호출
  },
};
</script>