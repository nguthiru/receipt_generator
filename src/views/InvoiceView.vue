<template>

    <Vue3Html2pdf :show-layout="true" :float-layout="true" :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="myPDF" :pdf-quality="2" :manual-pagination="false" pdf-format="a4"
        pdf-orientation="portrait" pdf-content-width="800px" ref="html2Pdf" :htmlToPdfOptions="htmlToPdfOptions">
        <template v-slot:pdf-content>

            <section id="invoice" style="color: black;">

                <div class="container my-2 py-2">
                    <div class="text-center">
                        <h1 class="invoice-company-title">Topmark Contractors LTD.</h1>
                    </div>
                    <div class="text-center border-top border-bottom my-5 py-3">
                        <h2 class="display-5 fw-bold">{{ report_type }} </h2>
                        <p class="m-0">{{ report_type }} Date: {{ invoiceDate }}</p>
                    </div>


                    <table class="table border my-5">
                        <thead>
                            <tr class="bg-primary-subtle">
                                <th scope="col">No.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in items" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item.name }}</td>
                                <td>KES {{ item.price }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>KES {{ item.total }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td class="text-primary fw-bold">Total</td>
                                <td class="text-primary fw-bold">KES {{ getTotalPrice }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="d-md-flex justify-content-between my-5">
                        <div>
                            <h5 class="fw-bold my-4">Contact Us</h5>
                            <ul class="list-unstyled">
                                <li><iconify-icon class="social-icon text-primary fs-5 me-2" icon="mdi:location"
                                        style="vertical-align:text-bottom"></iconify-icon> Chieni Road, Nanyuki</li>
                                <li><iconify-icon class="social-icon text-primary fs-5 me-2" icon="solar:phone-bold"
                                        style="vertical-align:text-bottom"></iconify-icon> 254721608932</li>
                                <li><iconify-icon class="social-icon text-primary fs-5 me-2" icon="ic:baseline-email"
                                        style="vertical-align:text-bottom"></iconify-icon>topmarkcontractors@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 class="fw-bold my-4">Payment Info</h5>
                            <ul class="list-unstyled">
                                <li><span class="fw-semibold">Mpesa Till: </span> 909098</li>

                            </ul>
                        </div>


                    </div>


                </div>
            </section>
        </template>

    </Vue3Html2pdf>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex';
import Vue3Html2pdf from 'vue3-html2pdf'

export default {

    computed: {
        invoiceDate() {
            return moment().format('DD MMM, YYYY')
        },


        htmlToPdfOptions() {
            return {
                html2canvas: {
                    scale: 1,
                    useCORS: true,
                    background: null,
                },
            }
        },
        ...mapState(['items', 'report_type']),
        ...mapGetters(['getTotalPrice'])
    },
    components: {
        Vue3Html2pdf
    },
    methods: {

    },

    mounted() {
        this.$refs.html2Pdf.generatePdf()
    }

}
</script>