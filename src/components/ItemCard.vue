<template>
    <div class="item">
        <div class="item-name">{{ item.name }}</div>
        <div class="row">
            <p class="item-quantity">{{ item.quantity }} X </p>
            <p class="item-price">{{ item.price }} KES</p>
            
        </div>

        <p class="text-btn" @click="removeItem">Remove</p>
    </div>
</template>

<script>
export default{
    props: {
        item: Object
    },

    methods:{
        removeItem(){
            this.$store.commit('removeItem', this.item)
        }
    }
}

</script>
