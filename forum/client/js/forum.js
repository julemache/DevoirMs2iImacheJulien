'use strict';

let app = new Vue({
  el: '#app',
  data: {
    article: '',
    articles: [],
    comments: [],
    accountid: 1,
    commentaire: '',
  },
  mounted() {
    this.getarticle();
    this.getcomment();
  },
  methods: {
    getarticle() {
      this.$http.get('http://localhost:3000/api/articles/').then(response => {
            // get body data
        this.articles = response.body;
      }, response => {
            // error callback
      });
    },
    recuparticle() {

    },
    getcomment() {
      this.$http.get('http://localhost:3000/api/comments').then(response => {
        // get body data
        this.comments = response.body;
      }, response => {
        // error callback
      });
    },
    ajoutercommentaire() {
      this.$http.post('http://localhost:3000/api/comments/', {text: this.commentaire, date: new Date(Date.now()), accountId: '1'}).then(response => {
        // get body data
        this.comments = response.body;
      }, response => {
        // error callback
      });
      this. getcomment();
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
