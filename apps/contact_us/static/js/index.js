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
      //return this.forms.filter(form => form.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
      if (this.nameSearch != "") {
        this.search_forms_name(this.nameSearch)
      }
      if (this.messageSearch != "") {
        this.search_forms_message(this.messageSearch)
      }
      return this.filteredForms;
    },
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
    delete_form: function(form_id) {
      console.log("deleting form with id:", form_id);
      axios.post(delete_form_url, {
        form_id: form_id,
      }).then((response) => {  // Use arrow function here
        console.log(response);
        const index = this.filteredForms.findIndex(form => form.id === form_id);
        if (index !== -1) {
          this.filteredForms.splice(index, 1);  // Remove the item at the found index
        }
      }).catch(function(error) {
        console.log(error);
      });
    },    
    loadForms: function() {
      axios.get(load_all_forms_url).then(function(response) {
        app.vue.forms = response.data.forms;
        app.vue.filteredForms = response.data.forms;
        console.log("forms loaded:", response.data.forms);
        console.log("filteredforms loaded:", app.vue.filteredForms);
      }).catch(function(error) {
        console.log(error);
      });
    },
    search_forms_name: function(name) {
      this.filteredForms = this.forms.filter(form => form.name.toLowerCase().includes(name.toLowerCase()));
    },
    search_forms_message: function(message) {
      this.filteredForms = this.forms.filter(form => form.message.toLowerCase().includes(message.toLowerCase()));
    },
  }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
  console.log("Calling load_data")
  app.vue.loadForms();
}

app.load_data();
