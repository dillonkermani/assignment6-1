"use strict";

// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

app.data = {
  data() {
    return {
      // Required fields
      new_form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      // ViewModel fields
      forms: [],
      filteredForms: [],
      // Control fields
      nameSearch: "",
      messageSearch: "",
    };
  },
  computed: {
    filtered_forms() {
      if (this.filte.length === 0) {
        return this.posts;
      }
      console.log("Filtering posts by tags: ", this.activeTags.map(tag => tag));
      console.log("Post tags: ", this.posts.flatMap(post => post.tags.map(tag => tag)));
      return this.posts.filter(post => 
        post.tags.some(postTag => {
          const cleanTags = postTag.replace(/[{}'"]/g, "").split(','); // Split tags by comma
          return cleanTags.some(cleanTag => {
            const trimmedTag = cleanTag.trim(); // Remove leading and trailing whitespace
            return this.activeTags.includes(trimmedTag);
          });
        })
      );
    }
  },
  methods: {
    // Temp function
    print_forms: function() {
      console.log("forms:", this.forms);
    },
    // Complete as you see fit.
    create_form: function() {
      axios.post(create_form_url, {
        new_form: this.new_form,
      }).then(function(response) {
        console.log("form submitted. Response:", response.data.form_id);
        app.vue.new_form.name = "";
        app.vue.new_form.email = "";
        app.vue.new_form.phone = "";
        app.vue.new_form.message = "";
      }).catch(function(error) {
        console.log(error);
      });
    },
    delete_form: function(contact_id) {
      axios.post(delete_form_url, {
        id: contact_id,
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
    load_all_forms: function() {
      axios.get(load_all_forms_url).then(function(response) {
        app.vue.forms = response.data.forms;
        app.vue.filteredforms = app.vue.forms;
      }).catch(function(error) {
        console.log(error);
      });
    },
    search_forms_name: function(name) {
      this.filteredforms = this.forms.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    },
    search_forms_message: function(message) {
      this.filteredforms = this.forms.filter(contact => contact.message.toLowerCase().includes(message.toLowerCase()));
    },
  }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
  if (window.location.pathname.endsWith('contact_requests.html')) {
    app.vue.load_all_forms();
  }
}

app.load_data();
