<template>
    <div class="modal-body">
        <label :for="inputId">{{ label }}:</label>
        <input
            :id="inputId"
            v-model="innerValue"
            :type="type"
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
        type:{
            type: String,
            default: 'text'
        },
        rules: {
            type: Array,
        },
        error:{
            type: String,
        },
        dirty:{
            type: Boolean,
        },
        value: {
            type: null
        }
    },
    data() {
        return {
            innerValue: ""
        }
    },
    methods: {
        validateInput(value) {
            let tempError ="";
            for (let rule of this.rules) {
                let result = rule(value);
                if (result !== true) {
                    tempError = result;
                    break;
                }
            }
            this.$emit("error", tempError);
        },
    },
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("dirty", true);
            this.$emit("input", newVal);
            this.validateInput(newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    },
    mounted() {
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