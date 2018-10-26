'use strict';
let app = new Vue({
  el: '#app',
  data: {
    articles: [],
    titre: this.titre,
    user: '1',
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
    ajouter() {
      this.$http.post('http://localhost:3000/api/articles', {title: this.titre, datecreation: new Date(Date.now()), accountId: this.user}).then((response) => {
        this.articles = response.data;
      }, (response) => {
        console.log('erreur', response);
      });
      this.titre = '';
      this.getarticle();
    },
    supprimer(id) {
      this.$http.delete('http://localhost:3000/api/articles/' + id).then((response) => {
        this.articles = response.data;
      }, (response) => {
        console.log('erreur', response);
      });
      this.getarticle();
    },
    modifier() {

    },
  },

});
