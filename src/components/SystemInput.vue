<template>
    <div class="modal-body-input">
        <label :for="inputId">{{ label }}</label>
        <input
                :id="inputId"
                :value="value"
                :type="type"
                @input="handleInput"
        />
        <span class="error" v-if="dirty && error">{{ error }}</span>
    </div>
</template>

<script>

export default ({
    name: "SystemInput",
    props: {
        label: {
            type: String
        },
        inputId: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        rules: {
            type: Array,
        },
        error: {
            type: String,
        },
        dirty: {
            type: Boolean,
        },
        value: {
            type: null
        }
    },
    methods: {
        validateInput(value) {
            let tempError = "";
            for (let rule of this.rules) {
                let result = rule(value);
                if (result !== true) {
                    tempError = result;
                    break;
                }
            }
            this.$emit("error", tempError);
        },
        handleInput(event) {
            // this.dirty = true;
            this.$emit("dirty", true);
            this.$emit("input", event.target.value);
            this.validateInput(event.target.value);
        },
    },
    mounted() {
        //set initial form input in order to prevent submitting a form that is empty and not dirty
        this.validateInput(this.value);
    },
})
</script>

<style scoped>
.error {
    color: red;
    font-size: medium;
    margin-top: 2px;
}
</style>