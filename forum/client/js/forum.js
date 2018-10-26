'use strict';
let app = new Vue({
  el: '#app',
  data: {
    article: '',
    articles: [],
    comments: [],
    accountid: 1,
    url: '5bd2b9f2f635181854f1c3c0',
  },
  mounted() {
    this.getarticle();
    this.getcomment();
  },
  methods: {
    getarticle() {
      this.$http.get('http://localhost:3000/api/articles/' + this.url).then(response => {
            // get body data
        this.articles = response.body;
      }, response => {
            // error callback
      });
    },
    recuparticle() {
      
    },
    getcomment(){
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
    },
  },

});
