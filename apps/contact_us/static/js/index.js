"use strict";

// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

app.data = {
  data() {
    return {
      // Required fields
      new_request: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      // ViewModel fields
      contacts: [],
      filteredContacts: [],
      // Control fields
      nameSearch: "",
      messageSearch: "",
    };
  },
  computed: {
    filtered_requests() {
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
    print_contacts: function() {
      console.log("CONTACTS:", this.contacts);
    },
    // Complete as you see fit.
    submit_request: function() {
      axios.post(submit_request_url, {
        name: this.new_request.name,
        email: this.new_request.email,
        phone: this.new_request.phone,
        message: this.new_request.message,
      }).then(function(response) {
        console.log("Request submitted. Response:", response);
        app.vue.new_request.name = "";
        app.vue.new_request.email = "";
        app.vue.new_request.phone = "";
        app.vue.new_request.message = "";
      }).catch(function(error) {
        console.log(error);
      });
    },
    delete_contact: function(contact_id) {
      axios.post(delete_contact_url, {
        id: contact_id,
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
    load_all_contacts: function() {
      axios.get(load_all_contacts_url).then(function(response) {
        app.vue.contacts = response.data.contacts;
        app.vue.filteredContacts = app.vue.contacts;
      }).catch(function(error) {
        console.log(error);
      });
    },
    search_contacts_name: function(name) {
      this.filteredContacts = this.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    },
    search_contacts_message: function(message) {
      this.filteredContacts = this.contacts.filter(contact => contact.message.toLowerCase().includes(message.toLowerCase()));
    },
  }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
  if (window.location.pathname.endsWith('contact_requests.html')) {
    app.vue.load_all_contacts();
  }
}

app.load_data();
