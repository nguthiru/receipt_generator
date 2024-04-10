<template>
  <div class="home">

    <section class="input-section">
      <div class="input-container" v-if="report_type === null">
        <h5>Type To Generate</h5>

        <div class="form-container">
          <label for="">Type</label>
          <select name="" id="" v-model="type">
            <option value="Invoice">Invoice</option>
            <option value="Quotation">Quotation</option>
            <option value="Receipt">Receipt</option>
          </select>
        </div>

        <div class="form-container">
          <label for="name">Recepient</label>
          <input type="text" name="Recepient" id="recepient" v-model="recepient">
        </div>

        <button class="circle-btn" @click="setReportType" style="margin-left: auto;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18M9 12H9.01" stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div class="input-container" v-else>
        <h5>Topmark {{ report_type }} Entry</h5>

        <div class="form-container">
          <label for="name">Item Name</label>
          <input type="text" name="Item Name" id="name" v-model="name">
        </div>
        <div class="row wrap space-between">

          <div class="form-container">
            <label for="name">Quantity</label>
            <input type="number" name="Item Name" id="quantity" class="small-input" v-model.number="quantity">
          </div>
          <div class="form-container">
            <label for="name">Unit Price</label>
            <input type="text" name="Item Name" id="name" class="small-input" v-model.number="price">
          </div>
        </div>
        <div class="row space-between">

          <button class="circle-btn" @click="previous">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18M15 12H15.01" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button class="circle-btn" @click="addItem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      
        
    </section>

    <section class="summary-section">
      <h6>Current Items</h6>
      <div class="items-list">
        <ItemCard v-for="item, index in items" :key="index" :item="item" />
      </div>

      <button id="generate-invoice" class="circle-btn" @click="generateInvoice" v-if="items.length != 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M9 9H15M9 12H15M9 15H15M5 3V21L8 19L10 21L12 19L14 21L16 19L19 21V3L16 5L14 3L12 5L10 3L8 5L5 3Z"
            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

    </section>


  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    ItemCard
  },

  data() {
    return {
      name: "",
      quantity: "",
      price: "",
      recepient: "",
      type: "Invoice"
    }
  },
  computed: {
    ...mapState(['items', 'report_type'])
  },

  methods: {
    addItem() {
      if (this.name != "" && this.quantity != "" && this.price != "") {

        var item = {
          name: this.name,
          quantity: this.quantity,
          price: this.price,
          total: this.quantity * this.price
        }

        this.$store.commit('addItem', item)
        this.name = ""
        this.quantity = ""
        this.price = ""
      }

    },
    setReportType() {
      this.$store.commit('setReportType', this.type)
      this.$store.commit('setRecepient', this.recepient)
      // console.log(this.report_type)

    },

    previous() {
      this.$store.commit('setReportType', null)
    },
    generateInvoice() {
      this.$router.push('/invoice')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';
</style>
