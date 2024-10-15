<template>
    <div class="item w-full">
        <div class="item-name">{{ item.name }}</div>
        <div class="row justify-between py-2">
            <p class="item-quantity"><span class="text-xs text-gray-300">Quantity: </span>{{ item.quantity }}</p>
            <p class="item-price"><span class="text-xs text-gray-300">Unit Price: </span>{{ item.price }} KES</p>

        </div>
        <p class="item-total"><span class="text-xs text-gray-300">Total Price: </span> {{ item.total }} KES</p>

        <p class="text-btn" @click="removeItem">Remove</p>
    </div>
</template>

<script>


export default {
    props: {
        item: Object
    },

    methods: {
        removeItem() {
            this.$store.commit('removeItem', this.item)

        }
    }
}

</script>
