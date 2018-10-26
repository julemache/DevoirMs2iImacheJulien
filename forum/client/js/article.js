'use strict';
let app = new Vue({
  el: '#app',
  data: {
    articles: [],
  },
  mounted() {
    this.getarticle();
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
  },

  ajouter() {
    this.$http.post('http://localhost:3000/api/articles', {title: this.titre, datecreation: new Date(Date.now())});
    this.getarticle();
  },
  supprimer() {

  },
  modifier() {

  },

});
