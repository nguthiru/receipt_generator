<template>
  <div class="home h-full flex p-6">
    <DocumentDeleteModal v-if="showDeleteModal" :document="document" @close="showDeleteModal = false" />

    <section class="input-section w-9/12">
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
        <div class="flex space-between items-center">
          <span class="flex gap-2 cursor-pointer text-red-600 font-medium" @click="showDeleteModal = true"
            v-if="document">

            <vue-feather type="trash" size="20" />
            Delete
          </span>
          <button class="circle-btn" @click="setReportType" style="margin-left: auto;">
            Proceed
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18M9 12H9.01" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
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

          <span class="flex gap-2 cursor-pointer text-red-600 font-medium" @click="previous">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-6">
              <path d="M15 6L9 12L15 18M15 12H15.01" stroke="#9d2e2a" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Previous
          </span>
          <button class="circle-btn" @click="addItem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Add Item
          </button>
        </div>
      </div>



    </section>

    <section class="summary-section w-3/12 h-full flex flex-col justify-between overflow-scroll max-h-screen">
      <h6>Current Items</h6>
      <div class="items-list overflow-y-scroll flex flex-col gap-2 h-full max-h-screen">
        <ItemCard v-for="item, index in items" :key="index" :item="item" />
      </div>

      <button id="generate-invoice" class="circle-btn w-full" @click="generateInvoice" v-if="items.length != 0">
        Generate {{ report_type }}
      </button>

    </section>


  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import DocumentDeleteModal from '@/components/DocumentDeleteModal.vue';
import { firestore } from '@/firebase/init';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from 'vue-toastification';
import { mapState } from 'vuex'
var toast = useToast()
export default {
  name: 'HomeView',
  components: {
    ItemCard,
    DocumentDeleteModal
  },


  data() {
    return {
      name: "",
      quantity: "",
      price: "",
      recepient: "",
      type: "Invoice",
      document: null,
      showDeleteModal: false
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
      this.$store.commit('setRecepient', this.recepient)
      this.$store.commit('setReportType', this.type)

    },

    getDocument() {
      var ref_id = this.$route.params['documentId']
      if (ref_id === undefined || ref_id === null || ref_id === "") {
        return
      }
      else {
        var document_ref = doc(firestore, 'reports/' + ref_id)
        getDoc(document_ref).then((data) => {
          this.document = {
            id: data.id,
            ...data.data()
          }
          this.recepient = data.data().recepient
          this.type = data.data().type
          this.$store.commit('setItems',this.document.items)
        })
      }

    },

    previous() {
      this.$store.commit('setReportType', null)
    },
    generateInvoice() {
      var ref_id = this.$route.params['documentId']

      this.$store.dispatch('pushToFirebase', ref_id).then(() => {

        this.$router.push('/invoice')
      }).catch((error) => {
        toast.error("Oops! Something went wrong" + error.message)
      })


    }
  },
  mounted() {
    this.getDocument()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';
</style>
