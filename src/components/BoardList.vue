<template>
  <div class="table-container">
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
        <tr v-for="post in paginatedPosts" :key="post.id" @click="handlePostClick(post)">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.date) }}</td>
        </tr>
      </tbody>
    </table>
<nav>
  <ul class="pagination">
    <!-- 이전 버튼 -->
    <li class="page-item" :class="{ 'disabled': currentPage <= 10 }">
      <button class="page-link" @click="prevPage" :disabled="currentPage <= 10">이전</button>
    </li>
    <!-- 페이지 버튼 -->
    <li class="page-item" v-for="pageNumber in visiblePageNumbers" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
      <button class="page-link" @click="goToPage(pageNumber)">{{ pageNumber }}</button>
    </li>

    <!-- 다음 버튼 -->
    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
      <button class="page-link" @click="nextPage">다음</button>
    </li>
  </ul>
</nav>
<div class="row">
    <div class="col text-end">
      <button class="btn btn-primary write-button" @click="goToWritePost">글 쓰기</button>
    </div>
</div>
  </div>
</template>
<style>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.write-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}


.pagination button {
  margin: 0 5px;
}
</style>
<script>
export default {
  data() {
    return {
      posts: [], // 게시글 목록을 빈 배열로 초기화
      currentPage: 1, // 현재 페이지
      pageSize: 10, // 한 페이지에 보여줄 게시글 수
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.posts.length / this.pageSize);
    },
    visiblePageNumbers() {
      const currentPageGroup = Math.ceil(this.currentPage / 10);
      const startPage = (currentPageGroup - 1) * 10 + 1;
      const endPage = Math.min(this.totalPages, currentPageGroup * 10);
      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index)
        .filter((pageNumber) => pageNumber > 0); // 1보다 작은 페이지 제외
    },
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.posts.slice(startIndex, endIndex);
    },
    isAllDataVisible() {
    return this.currentPage === 1 && this.totalPages <= 10;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },

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
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 10;
      }
    },
    nextPage() {
      if (this.hasNextPage) {
        this.currentPage += 10;
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      }
    },
        goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
      goToWritePost() {
      // 글 쓰기 페이지로 이동하는 메소드
      this.$router.push('/write-post');
    },
  mounted() {
    this.fetchPosts(); // 컴포넌트가 마운트되면 게시글 목록을 가져오도록 호출
  },
};
</script>