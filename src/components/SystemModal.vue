<template>
    <Transition name="fade">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <button
                        class="modal-close-button"
                        @click="$emit('close')"
                    >❌
                    </button>
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">default body</slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>

export default ({
    name: "Modal",
    props: {
        show: Boolean
    },
    watch: {
        show(newValue) {
            if (newValue) {
                document.body.classList.add('prevent-scroll')
            } else {
                document.body.classList.remove('prevent-scroll')
            }
        }
    },
})
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    display: table;
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 70%;
    min-width: 300px;
    min-height: 300px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    padding-bottom: 30px;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-body input {
    height: 48px;
    width: 30%;
    min-width: 280px;
    max-width: 300px;
}
.modal-body select {
    height: 100%;
    max-height: 100px;
    width: 30%;
    min-width: 280px;
    max-width: 300px;
}
select.modal-body-input {
    padding-top: 16px;
}
.modal-body button {
    height: 48px;
    width: 50%;
    min-width: 100px;
    max-width: 200px;
}

.modal-close-button {
    background: transparent !important;
    display: flex;
    justify-content: flex-end;
}

.modal-footer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

.prevent-scroll, .prevent-scroll #app {
    overflow: hidden;
}
</style>