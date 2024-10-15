<template>

    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="text-lg font-semibold">Delete Document</h2>
                <span @click="closeModal" class="close-btn">X</span>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this document?</p>
                <p> {{ document.type }} - {{ document.recepient }}</p>
                <div class="flex justify-between gap-4 mt-4">
                    <div class="btn btn-danger" @click="deleteDocument">Delete</div>
                    <div class="btn btn-secondary" @click="closeModal">Cancel</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { firestore } from '@/firebase/init';
import { deleteDoc, doc } from 'firebase/firestore';
import { useToast } from 'vue-toastification';
import { defineEmits,defineProps } from 'vue';
import { useRouter } from 'vue-router';
var toast = useToast()
var router = useRouter()
var props = defineProps(['document'])
const emit = defineEmits(['close'])
var closeModal = () =>{
    emit('close')
}

var deleteDocument = () => {
    deleteDoc(
        doc(firestore, 'reports/' + props.document.id)
    ).then(() => {
        toast.success(`Document deleted successfully`)
        router.replace('/')
        emit('close')
    }).catch(() => {
        toast.error(`Error deleting document`)
    })
}


</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.close-btn {
    cursor: pointer;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.btn {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-danger {
    background-color: red;
    color: white;
}

.btn-secondary {
    background-color: #f0f0f0;
    color: black;
}

</style>