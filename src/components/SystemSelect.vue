<template>
    <div class="modal-body">
        <label :for="selectId">{{ label }}:</label>
        <select
                :id="selectId"
                v-model="innerValue"
                :multiple="multiple"
        >
            <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
        </select>
        <span class="error" v-if="dirty && error">{{ error }}</span>
    </div>
</template>

<script>
export default ({
    name: "SystemSelect",
    props: {
        label: {
            type: String
        },
        selectId: {
            type: String
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
        multiple: {
            type: Boolean,
            default: true,
        },
        value: {
            type: null
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            innerValue: this.multiple ? [] : "",
        }
    },
    methods: {
        validateSelect(value) {
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
    },
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("dirty", true);
            this.$emit("input", newVal);
            this.validateSelect(newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        }
    },
    created() {
        // init the innerValue with the parent value
        // if it is not multiple and has value or if is multiple and has elements in it
        if (this.value && (this.multiple === false || this.value.length > 0)) {
            this.innerValue = this.value;
        }
    },
    mounted() {
        this.validateSelect(this.value);
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
