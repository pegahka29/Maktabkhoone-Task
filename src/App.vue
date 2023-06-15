<template>
    <div id="app">
        <div class="header">Profiles List</div>
        <div class="content">
            <input v-model="searchedName" class="search" placeholder="Search By Doctor Name">
            <div class="buttons">
                <button @click="sortAsc">▲</button>
                <button @click="sortDesc">▼</button>
            </div>
            <ProfileCard
                    v-for="profile in filteredData"
                    :key="profile.id"
                    :profile="profile"
                    class="profile"
            />
            <div class="icons-note">
                Icons made by
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            <button @click.prevent="showModal" class="show-modal__button">Add new profile</button>
            <Modal :show="showAddProfileModal" @close="hideAddProfileModal">
                <template v-slot:header>
                    <h3> Add Profile </h3>
                </template>
                <template v-slot:body>
                    <div class="modal-body-input">
                        <span>Name:</span>
                        <input v-model="newDoctor.name">
                    </div>
                    <div class="modal-body-input">
                        <span>Email:</span>
                        <input v-model="newDoctor.email" class="modal-body-input" type="email">
                    </div>
                    <div class="modal-body-input">
                        <span>Description:</span>
                        <input v-model="newDoctor.description" class="modal-body-input">
                    </div>
                </template>
                <template v-slot:footer>
                    <button
                            :disabled="!newDoctor && !newDoctor.email && !newDoctor.description && !newDoctor.name"
                            :class="newDoctor && newDoctor.email && newDoctor.description && newDoctor.name ? '':'disabled'"
                            class="modal-add-button"
                            @click="addNewDoctorProfile"
                    >
                        Add
                    </button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard"
import Modal from "./components/Modal"

export default {
    name: "App",

    components: {
        ProfileCard,
        Modal
    },

    data() {
        return {
            profiles: [
                {
                    id: 1,
                    name: "Wojciech",
                    email: "wojciech@poz.pl",
                    description: "Anaesthesiologist",
                    likes: 34
                },
                {
                    id: 2,
                    name: "Maria",
                    email: "maria@poz.pl",
                    description: "Radiologist",
                    likes: 28
                },
                {
                    id: 3,
                    name: "Anna",
                    email: "anna@poz.pl",
                    description: "Surgeon",
                    likes: 53
                }
            ],
            searchedName: "",
            showAddProfileModal: false,
            newDoctor: {
                name: null,
                email: null,
                description: null,
                likes: 0
            }
        };
    },
    computed: {
        filteredData() {
            if (!this.searchedName) {
                return this.profiles
            }
            return this.profiles.filter(item => {
                return item.name.toLowerCase().indexOf(this.searchedName.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        sortAsc() {
            this.profiles.sort(function (a, b) {
                return a.likes - b.likes;
            });
        },

        sortDesc() {
            this.profiles.sort(function (a, b) {
                return b.likes - a.likes;
            });
        },

        showModal() {
            this.showAddProfileModal = true
        },
        hideAddProfileModal() {
            this.showAddProfileModal = false
        },
        addNewDoctorProfile() {
            this.profiles.push({
                id: this.profiles.length + 1,
                name: this.newDoctor.name,
                likes: this.newDoctor.likes,
                description: this.newDoctor.description,
                email: this.newDoctor.email
            })
            this.newDoctor.name = ''
            this.newDoctor.description = ''
            this.newDoctor.email = ''
            this.showAddProfileModal = false
        }
    }
};
</script>

<style>

html, body {
    padding: 0;
    margin: 0;
    width: 100vw;
}

#app {
    font-family: "Roboto", helvetica, arial, sans-serif;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #2c3e50;
    padding: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;

    background: linear-gradient(
            135deg,
            rgba(65, 184, 131, 0.9),
            rgba(52, 73, 94, 0.9)
    );

    font-size: 1.5em;
}

button {
    display: block;
    padding: 1em;
    width: 100%;
    background-color: #41B883;
    border: 1px solid;
    color: #fff;
    cursor: pointer;
    font-size: 0.75em;
    font-weight: 600;
    text-shadow: 0 1px 0 rgba(black, 0.2);
}

.content {
    width: 100%;
    min-width: 300px;
    padding: 2em;
    margin-top: 30px;
    position: relative;
    background: rgba(0, 0, 0, 0.15);
}

@media screen and (min-width: 600px) {
    .content {
        width: 50vw;
        max-width: 15em;
    }
}

.content::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    height: 2px;
    width: 100%;
    background: #35c3c1;
}

.buttons {
    display: flex;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.profile {
    margin-top: 20px;
}

.icons-note {
    margin-top: 30px;
    font-size: 10px;
}

.search {
    margin-bottom: 1rem;
    width: 100%;
}

.modal-body-input {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.modal-add-button {
    height: 48px;
    width: 30%;
    min-width: 280px;
    max-width: 300px;
    padding: 0 3px;
    box-sizing: content-box;
    margin-top: 1rem;
}

.show-modal__button {
    margin-top: 1rem;
}
.disabled {
    background: darkgray !important;
}
</style>
