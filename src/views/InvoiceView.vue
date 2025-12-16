<template>

    <div class="center-container" id="report-download-container">
        <p>

            Hello, You can now download your {{ report_type }}
        </p>
        <button class="bg-red-500" @click="download">Download {{ report_type }}</button>
    </div>
    <div class="center-container">
        <Vue3Html2pdf :show-layout="true" :float-layout="false" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="3000" :pdf-quality="2" :manual-pagination="false" pdf-format="a4"
            pdf-orientation="portrait" pdf-content-width="800px" ref="html2Pdf" :htmlToPdfOptions="htmlToPdfOptions">
            <template v-slot:pdf-content>

                <div id="invoice" style="color: black;">

                    <div class="container py-3" :class="branch === 'silverstar' ? 'mt-1' : 'my-3'">
                        <div class="text-center" v-if="branch !== 'silverstar'">
                            <h1 class="invoice-company-title text-primary logo mb-2">TOPMARK <br><span>CONT LTD.</span>
                            </h1>
                            <h5 class="fw-bold">Dealers in: General Hardware & Building Contractors</h5>

                        </div>
                        <div class="text-center" v-else>
                            <img src="@/assets/silver_star_header.png" alt="Silver Star Header"
                                style="max-width: 50%; height: auto; margin: 0 auto;" />
                        </div>
                        <div class="my-1 py-1" v-if="branch !== 'silverstar'">
                            <span class="fw-semibold">Pin No: </span>P051376139H

                        </div>
                        <div class="d-md-flex justify-content-between my-1" v-if="branch !== 'silverstar'">
                            <div>
                                <h6 class="fw-bold my-1">Contact Us</h6>
                                <ul class="list-unstyled">
                                    <li>Chieni Road, Nanyuki</li>
                                    <li>0721608932</li>
                                    <li>topmarkcontractors@gmail.com</li>
                                </ul>

                                <h6 class="fw-bold my-1 mt-3">Payment Details</h6>
                                <ul class="list-unstyled">
                                    <li><strong>Till Number:</strong> 909098</li>
                                </ul>
                            </div>

                            <div>
                                <ul class="list-unstyled">
                                </ul>
                            </div>
                        </div>

                        <!-- Silverstar payment details only (no contact block) -->
                        <div class="d-md-flex justify-content-end my-1" v-else>
                            <div class="text-end">
                                <h6 class="fw-bold my-1 mt-3">Payment Details</h6>
                                <ul class="list-unstyled">
                                    <li><strong>MPESA Paybill:</strong> 400200</li>
                                    <li><strong>Account No:</strong> 1109169</li>
                                </ul>
                            </div>
                        </div>
                        <div class="border-top mt-2 pt-2">
                            <h6 class="display-9 fw-semibold" v-if="receipient != ''">M/s: <span class="fw-bold">{{
                                    receipient }}</span></h6>
                        </div>
                        <div class="text-center border-top border-bottom my-1 py-1">
                            <h2 class="display-8 fw-bold text-primary">{{ report_type }} </h2>
                            <p class="m-0">{{ report_type }} Date: {{ invoiceDate }}</p>
                        </div>


                        <table class="table mytable border my-2 invoice-table">
                            <thead>
                                <tr class="invoice-table__header-row">
                                    <th scope="col" class="invoice-table__header-cell text-center">NO</th>
                                    <th scope="col" class="invoice-table__header-cell">DESCRIPTION</th>
                                    <th scope="col" class="invoice-table__header-cell text-end">PRICE</th>
                                    <th scope="col" class="invoice-table__header-cell text-center">NO. OF UNITS</th>
                                    <th scope="col" class="invoice-table__header-cell text-end">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, index in items" :key="index">
                                    <th scope="row" class="text-center invoice-table__body-cell">
                                        {{ index + 1 }}
                                    </th>
                                    <td class="invoice-table__body-cell">
                                        {{ item.name }}
                                    </td>
                                    <td class="text-end invoice-table__body-cell">
                                        {{ item.price.toLocaleString() }}/=
                                    </td>
                                    <td class="text-center invoice-table__body-cell">
                                        {{ item.quantity }}
                                    </td>
                                    <td class="text-end invoice-table__body-cell">
                                        {{ item.total.toLocaleString() }}/=
                                    </td>
                                </tr>
                                <tr>
                                    <th class="invoice-table__footer-empty"></th>
                                    <td class="invoice-table__footer-empty"></td>
                                    <td class="invoice-table__footer-empty"></td>
                                    <td class="text-danger fw-bold text-end invoice-table__footer-label">TOTAL</td>
                                    <td class="text-danger fw-bold text-end invoice-table__footer-amount">
                                        {{ getTotalPrice.toLocaleString() }}/=
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <p class="footer-text my-2">{{ footerText }}</p>
                    </div>
                </div>
            </template>

        </Vue3Html2pdf>
    </div>
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

        footerText() {
            if (this.report_type === 'Invoice') {
                return 'Accounts are due on demand'
            } else if (this.report_type == "Quotation") {
                return 'Quotations are valid for 30 days'
            }
            else {
                return ''
            }
        },

        filename() {
            var date_time = moment().format('DD-MM-YYYY-hh-mm-ss')
            return `${this.report_type} - ${date_time}`
        },


        htmlToPdfOptions() {
            return {

                filename: `${this.filename}.pdf`,
                html2canvas: {
                    scale: 1,
                    useCORS: true,
                    background: null,
                },
            }
        },
        ...mapState(['items', 'report_type', 'receipient', 'branch']),
        ...mapGetters(['getTotalPrice'])
    },
    components: {
        Vue3Html2pdf
    },
    methods: {
        download() {
            this.$refs.html2Pdf.generatePdf()
        }
    },

    mounted() {
        console.log(this.report_type)
        //this.$refs.html2Pdf.generatePdf()
    }

}
</script>