<template>
<div class="modal" v-show="isOpen">
    <span class="close" @click="hide">&times;</span>
    <div class="modal_content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi in dolorem, eligendi, voluptate ullam alias ut similique iusto voluptatum, ea nostrum dicta illo adipisci sapiente! Numquam maxime excepturi aspernatur dolore.
    </div>
</div>
</template>

<script>
export default {
    setup(){
        const isOpen = ref(true);

        function hide(){
            isOpen.value = false;
        }

        function show(){
            isOpen.value = true;
        }

        return{
            isOpen,
            hide,
            show
        }
    }
};

</script>
<style>
.modal {
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal_content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 500px;
    border: 1px solid #888;
}
.close {
    padding: 10px;
    cursor: pointer;
    color: #aaa;
    float:right;
    font-size:28px;
    font-weight: bold;
}
</style>