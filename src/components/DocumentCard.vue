<template>
    <RouterLink :to="{ name: 'doc-view', params: { documentId: document.id } }">

        <div class="document p-4 w-80 rounded-lg" :class="[document.type]">
            <div class="flex justify-between items-center my-2">

                <p class="font-medium text-sm">{{ document.type }}</p>
                <div class="flex gap-2 items-center">
                    <vue-feather type="calendar" size="10" class="text-gray-500" />
                    <p class="text-xs text-gray-500">{{ formattedDate }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center my-4">

                <div class="flex gap-2">
                    <vue-feather type="user" size="20" />
                    <p class="font-semibold">{{ document.recepient }}</p>
                </div>
                <div class="flex gap-2">
                    <vue-feather type="shopping-bag" size="20" />
                    <p class="font-semibold">{{ itemCount }} Items</p>
                </div>
            </div>
            <div class="flex justify-between items-center my-2">

                <div class="flex gap-2">
                    <p class="text-gray-500 text-xs">Total {{ actionVerb }}: </p>
                    <p class="font-semibold text-xs">{{ total }} KES</p>
                </div>


            </div>
            
        </div>
    </RouterLink>"
</template>

<script setup>
import { computed, defineProps } from 'vue'
var props = defineProps(['document'])

var total = computed(() => {
    var total = 0
    if(!props.document.items){
        return 0
    }
    props.document.items.forEach(item => {
        total += item.total
    });
    return total
})

var itemCount = computed(() => {
    if(!props.document.items){
        return 0
    }
    return props.document.items.length
})

var formattedDate = computed(() => {
    var date = new Date(props.document.created_at.toDate())
    return date.toDateString()
})


var actionVerb = computed(() => {
    if (props.document.type === 'Invoice') {
        return 'Invoiced'
    } else if (document.type === 'Quotation') {
        return 'Quoted'
    } else {
        return ''
    }
})



</script>