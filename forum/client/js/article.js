'use strict';
let app = new Vue({
  el: '#app',
  data: {
    articles: [],
    titre: this.titre,
    user: '1',
    idarticle: '',
    editarticle: '',

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
    modifier(id) {
      this.$http.put('http://localhost:3000/api/articles/' + id, {title: this.editarticle, datecreation: new Date(Date.now())}).then((response) => {
        this.articles = response.data;
      }, (response) => {
        console.log('erreur', response);
      });
      this.getarticle();
      this.editarticle = '';
      this.idarticle = '';
    },
    modif(id, titree) {
      console.info(id);
      console.info(titree);
      this.idarticle = id;
      this.editarticle = titree;
    },
  },

});
