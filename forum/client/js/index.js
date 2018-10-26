'use strict';
let app = new Vue({
  el: '#app',
  data: {
    email: this.email,
    mdp: this.mdp,
  },
  methods: {
      connexion : function(
          // GET /someUrl
      this.$http.get('/someUrl').then(response => {

      // get body data
      this.someData = response.body;

  }, response => {
    // error callback
  });

      )
  },

});
