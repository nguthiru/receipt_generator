<template>
    <div class="dash-view px-4">
        <div class="flex items-center justify-between">

            <h1 class="text-lg font-semibold">Your Documents</h1>
            <RouterLink :to="{ name: 'doc-view' }">

                <button class="circle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    Create New
                </button>
            </RouterLink>

        </div>
        <div class="help-text">
            <p>* Click on a document to update or delete</p>
        </div>
        <div class="documents-view flex flex-wrap gap-4 py-4">
            <DocumentCard v-for="document in documents" :key="document.id" :document="document" />


        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { firestore } from '@/firebase/init';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import DocumentCard from '@/components/DocumentCard.vue';

const documents = ref([])

onMounted(async () => {
    const collection_ref = collection(firestore, 'reports')
    const orderedDocuments = query(collection_ref, orderBy('created_at', 'desc'))
    getDocs(
        orderedDocuments
    ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var document = {
                id: doc.id,
                ...doc.data()
            }
            documents.value.push(document)
        });
    })

})

</script>