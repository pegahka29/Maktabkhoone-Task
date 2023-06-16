<template>
    <div class="profile">
        <div class="card">
            <DoctorIcon class="avatar"/>
            <div class="data">
                <div class="profile-content">
                    <div>
                        <strong>{{ profile.name }}</strong>
                        <a :href="profile.email" class="email">{{ profile.email }}</a>
                    </div>
                    <div class="description">
                        <span v-for="(specialisation,index) in profile.specialisations" :key="index">{{
                            specialisation
                            }}
                         <span v-if="profile.specialisations.length -1 !== index ">,</span>
                        </span>
                    </div>
                </div>
                <div class="reactions-button">
                    <div class="likes" @click="$emit('updateLikes')">
                        <span v-if="profile.hasLiked" class="likes-icon">💚</span>
                        <span v-else class="likes-icon">🤍</span>
                        <span class="likes-value"
                              :class="profile.likes < 0 ? 'text-negative' : 'text-positive'">{{ profile.likes }}</span>
                    </div>
                    <div class="likes" @click="$emit('updateDislikes')">
                        <span v-if="profile.hasDisliked" class="likes-icon">👎🏾</span>
                        <span v-else class="likes-icon">👎🏻</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment">
            <input v-model="commentValue" class="comment-input" placeholder="Write your comment...">
        </div>
    </div>
</template>

<script>
import DoctorIcon from "./DoctorIcon";

export default {
    name: "ProfileCard",
    data() {
        return {
            commentValue: ''
        }
    },
    components: {
        DoctorIcon
    },

    props: {
        profile: {
            type: Object,
            required: true
        }
    }
};
</script>

<style>
.card {
    display: flex;
    align-items: center;
    border: solid 1px rgb(172, 172, 172);
    border-radius: 3px;
    padding: 10px;
    font-size: 14px;
    color: rgb(82, 82, 82);
    background-color: #fff;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.avatar {
    width: 64px;
    min-width: 64px;
    height: 64px;
    border: 1px solid rgb(172, 172, 172);
    border-radius: 100%;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.profile-content {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 15px;
}

.email {
    margin-left: 15px;
}

.description {
    margin-top: 5px;
}

.likes {
    margin-top: 10px;
    margin-left: 15px;
    cursor: pointer;
}

.likes-value {
    margin-left: 5px;
}

.text-positive {
    color: rgb(76, 202, 114);
}

.text-negative {
    color: red;
}

.comment {
    display: flex;
    width: 100%;
}

.comment-input {
    width: 100%;
}

.reactions-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
