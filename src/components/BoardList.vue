<template>
  <div>
    <h2>글 목록</h2>
    <!-- 글 목록 표시 -->
    <table class="table table-hover">
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

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: "글 제목 1", author: "작성자 1", date: "2022-01-01" },
        { id: 2, title: "글 제목 2", author: "작성자 2", date: "2022-01-02" },
        // ...
      ],
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
  },
};
</script>
