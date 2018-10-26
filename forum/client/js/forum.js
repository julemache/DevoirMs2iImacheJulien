'use strict';
let app = new Vue({
  el: '#app',
  data: {
    articles: [],
    comments: [],
    accountid: 1,
  },
  mounted() {
    this.getarticle();
    this.getcomment();
  },
  methods: {
    getarticle() {
      this.$http.get('http://localhost:3000/api/articles').then(response => {
            // get body data
        this.articles = response.body;
      }, response => {
            // error callback
      });
    },
    getcomment() {
      this.$http.get('http://localhost:3000/api/comments').then(response => {
        // get body data
        this.comments = response.body;
      }, response => {
        // error callback
      });
    },
  },
  sockets: {
    connect() {
      this.getMessages(this.id);
      this.getTopic();
    },

    disconnect() {
      // Send a message when user disconnected
    },
    
    // eslint-disable-next-line
    submitMessage (message) {
       this.getMessages(this.id);
    }
  },

});
