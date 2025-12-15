import { createStore } from "vuex";
import { firestore } from "@/firebase/init";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useToast } from "vue-toastification";

var toast = useToast();
export default createStore({
  state: {
    items: [],
    report_type: null,
    receipient: "",
    // Branch for the document: 'topmark' (default) or 'silverstar'
    branch: "topmark",
  },
  getters: {
    getTotalPrice(state) {
      return state.items.reduce((acc, item) => acc + item.total, 0);
    },
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    removeItem(state, item) {
      state.items = state.items.filter((i) => i !== item);
    },
    setReportType(state, type) {
      state.report_type = type;
    },
    setRecepient(state, receipient) {
      state.receipient = receipient;
    },
    setBranch(state, branch) {
      state.branch = branch;
    },
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    pushToFirebase({ state }, ref_id) {
      var collection_ref = collection(firestore, "reports");

      var document_data = {
        type: state.report_type,
        recepient: state.receipient,
        created_at: serverTimestamp(),
        items: state.items,
        branch: state.branch,
      };

      if (ref_id) {
        var document_ref = doc(firestore, `reports/${ref_id}`);
        if(state.report_type == null || state.report_type == "" || state.report_type == undefined){
          delete document_data.type;
        }
        if(state.receipient == "" || state.receipient == undefined || state.receipient == null){
          delete document_data.recepient;
        }
        if(state.branch == "" || state.branch == undefined || state.branch == null){
          delete document_data.branch;
        }

        return updateDoc(document_ref,document_data)
          .then(() => {
            toast.success("Document updated successfully");
          })
          .catch((error) => {
            toast.error("Error updating document: " + error.message);
          });
      } else {
        return addDoc(collection_ref, document_data)
          .then(() => {
            toast.success("Document created successfully");
          })
          .catch((error) => {
            toast.error("Error creating document: " + error.message);
          });
      }
    },
  },
  modules: {},
});
