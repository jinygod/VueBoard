<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>작성자: {{ post.author }}</p>
    <p>날짜: {{ formatDate(post.date) }}</p>
    <!-- 글 내용 표시 -->
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: 1,
        title: "글 제목",
        author: "작성자",
        date: "2022-01-01",
        content: "글 내용",
      },
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
  },
};
</script>
