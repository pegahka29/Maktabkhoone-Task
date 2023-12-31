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
                    v-for="(profile,index) in filteredData"
                    :key="profile.id"
                    :profile="profile"
                    @updateLikes="handleLike(index)"
                    @updateDislikes="handleDislike(index)"
                    class="profile"
            />
            <div class="icons-note">
                Icons made by
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            <button @click.prevent="showModal" class="show-modal__button">Add new profile</button>
            <system-modal :show="showAddProfileModal" @close="hideAddProfileModal">
                <template v-slot:body>
                    <form @submit.prevent="submitForm">
                        <div v-for="(input, index) in formInputs" :key="index">
                            <system-select
                                    v-if="input.type === 'select'"
                                    class="mb-16"
                                    :input-id="input.id"
                                    :label="input.label"
                                    :type="input.type"
                                    :rules="input.rules"
                                    :error="input.error"
                                    :dirty="input.dirty"
                                    v-model="input.value"
                                    :options="input.options"
                                    @error="handleError(input, $event)"
                                    @dirty="handleDirty(input, $event)"/>
                            <system-input
                                    v-else
                                    class="mb-16"
                                    :input-id="input.id"
                                    :label="input.label"
                                    :type="input.type"
                                    :rules="input.rules"
                                    :error="input.error"
                                    :dirty="input.dirty"
                                    v-model="input.value"
                                    @error="handleError(input, $event)"
                                    @dirty="handleDirty(input, $event)"/>
                        </div>
                        <button type="submit" style="display: none">Submit</button>
                    </form>
                </template>
                <template v-slot:header>
                    <h3> Add Profile </h3>
                </template>
                <template v-slot:footer>
                    <button
                            type="button"
                            :disabled="!formIsValid"
                            :class="formIsValid ? '':'disabled'"
                            class="modal-add-button"
                            @click="submitForm"
                    >
                        Add
                    </button>
                </template>
            </system-modal>
        </div>
    </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard"
import SystemModal from "./components/SystemModal"
import SystemInput from "./components/SystemInput"
import SystemSelect from "./components/SystemSelect"

export default {
    name: "App",
    components: {
        ProfileCard,
        SystemModal,
        SystemInput,
        SystemSelect
    },
    data() {
        return {
            // if you use DefaultFormMixin the name of inputs must be: formInputs
            formInputs: {
                name: {
                    id: "name",
                    label: "Name",
                    value: "",
                    type: "text",
                    rules: [this.$va.required, this.$va.englishAlphabet],
                    error: "",
                    dirty: false,
                },
                specialisations: {
                    id: "specialisations",
                    label: "Specialisations",
                    value: [],
                    type: "select",
                    rules: [this.$va.required],
                    error: "",
                    dirty: false,
                    options: [
                        {text: "Surgeon", value: "Surgeon"},
                        {text: "Radiologist", value: "Radiologist"},
                        {text: "Cardiologist", value: "Cardiologist"},
                        {text: "Psychiatrist", value: "Psychiatrist"},
                        {text: "Dermatologist", value: "Dermatologist"},
                    ],
                },
                email: {
                    id: "email",
                    label: "Email",
                    value: "",
                    type: "email",
                    rules: [this.$va.required, this.$va.email],
                    error: "",
                    dirty: false,
                },
            },
            profiles: [
                {
                    id: 1,
                    name: "Wojciech",
                    email: "wojciech@poz.pl",
                    specialisations: ["Anaesthesiologist"],
                    likes: 34,
                    hasLiked: false,
                    hasDisliked: false
                },
                {
                    id: 2,
                    name: "Maria",
                    email: "maria@poz.pl",
                    specialisations: ["Radiologist"],
                    likes: 28,
                    hasLiked: false,
                    hasDisliked: false
                },
                {
                    id: 3,
                    name: "Anna",
                    email: "anna@poz.pl",
                    specialisations: ["Surgeon"],
                    likes: 53,
                    hasLiked: false,
                    hasDisliked: false
                }
            ],
            searchedName: "",
            showAddProfileModal: false,
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
        },
        formIsValid() {
            // check if every input has an empty error property

            // return this.formInputs.every(input => !input.error);
            return Object.values(this.formInputs).every(input => !input.error);
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
            this.resetForm()
        },
        // if you use DefaultFormMixin the name of this method must be  addNewDoctorProfile
        addNewDoctorProfile() {
            let specialisationsTemp = []
            if (Array.isArray(this.formInputs.specialisations.value)) {
                specialisationsTemp = this.formInputs.specialisations.value
            } else if (this.formInputs.specialisations.value) {
                specialisationsTemp.push(this.formInputs.specialisations.value)
            }
            this.profiles.push({
                id: this.profiles.length + 1,
                name: this.formInputs.name.value,
                likes: 0,
                specialisations: specialisationsTemp,
                email: this.formInputs.email.value,
                hasLiked: false,
                hasDisliked: false
            })
            this.resetForm();
            this.showAddProfileModal = false
        },
        handleError(input, error) {
            input.error = error; // update the input error based on the event payload
        },
        handleDirty(input, dirty) {
            input.dirty = dirty; // update the input dirty state based on the event payload
        },
        submitForm() {
            if (this.formIsValid) {
                this.addNewDoctorProfile();
            } else {
                // making all fields dirty to show the errors if the form is submitted and is not valid
                for (let input in this.formInputs) {
                    this.formInputs[input].dirty = true;
                }
            }
        },
        resetForm() {
            for (let input in this.formInputs) {
                this.formInputs[input].value = '';
                this.formInputs[input].dirty = false;
                this.formInputs[input].error = '';
            }
        },
        handleLike(id) {
            if (this.profiles[id].hasLiked) {
                //undo like
                this.profiles[id].likes -= 1
                this.profiles[id].hasLiked = false
            } else {
                this.profiles[id].likes += 1
                this.profiles[id].hasLiked = true
                if (this.profiles[id].hasDisliked) {
                    this.profiles[id].likes += 1
                    this.profiles[id].hasDisliked = false
                }
            }
        },
        handleDislike(id) {
            if (this.profiles[id].hasDisliked) {
                //undo dislike
                this.profiles[id].likes += 1
                this.profiles[id].hasDisliked = false
            } else {
                this.profiles[id].likes -= 1
                this.profiles[id].hasDisliked = true
                if (this.profiles[id].hasLiked) {
                    this.profiles[id].likes -= 1
                    this.profiles[id].hasLiked = false
                }
            }
        }
    },
};
</script>

<style>

html, body {
    padding: 0;
    margin: 0;
    width: 100%;
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
    box-sizing: border-box;
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

.mb-16 {
    margin-bottom: 16px;
}
</style>
