"use strict";

// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


app.data = {    
    data: function() {
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
            fileredContacts: [],


        };
    },
    methods: {
        // Complete as you see fit.
        create_contact: function() {
            axios.post(create_contact_url, {
                name: this.new_request.name,
                email: this.new_request.email,
                phone: this.new_request.phone,
                message: this.new_request.message,
            }).then(function(response) {
                console.log(response);
                app.vue.name = "";
                app.vue.email = "";
                app.vue.phone = "";
                app.vue.message = "";
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
            }).catch(function(error) {
                console.log(error);
            });
        },
        search_contacts_name: function(name) {
            this.fileredContacts = this.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
        },
        search_contacts_message: function(message) {
            this.fileredContacts = this.contacts.filter(contact => contact.message.toLowerCase().includes(message.toLowerCase()));
        },


        

    }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
    app.vue.load_all_contacts();
}

app.load_data();

