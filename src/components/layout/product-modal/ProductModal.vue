<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    image_url: String,
    price: String,
    addToTheCard: Function
})

const product = reactive({
    title: "Ελληνικός μονός",
    description: "O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής.",
    img_url: "http://localhost/menu/api/images/products/6475b39226d34951cb70767239394d2208f47a5995d38.jpg",
    price: "2,10",
})
</script>
<template>
    <!-- Scrollable modal -->
    <!-- <div class="modal-dialog modal-dialog-scrollable">

  this is a test
</div> -->
    <!-- <div class="modal-dialog modal-fullscreen-sm-down show">
 other test
    </div> -->

    <div class="modal d-block " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        style="background-color:rgb(247, 247, 247)">
        <div class="modal-dialog m-0">
            <div class="modal-content position-relative">
                <div class="modal-header p-0 position-sticky top-0 end-0 " style="z-index:1">
                    <!-- <button type="button" class="btn-close position-absolute top-0 end-0 m-1" style="z-index:1"
                        data-bs-dismiss="modal" aria-label="Close"></button> -->
                    <div class="close "><font-awesome-icon icon="fa-solid fa-xmark" /></div>


                    <!-- <h5 class="modal-title" id="exampleModalLabel">Product title</h5> -->
                </div>
                <div class="modal-body p-0">
                    <!-- <button type="button" class="btn-close position-absolute top-0 end-0" style="z-index:1" data-bs-dismiss="modal" aria-label="Close"></button> -->

                    <div class="card">
                        <img :src="product.img_url" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-start">{{ product.title }}</h5>
                            <p v-if="product.description" class="card-text text-start" style="color:rgb(155, 155, 155)">{{
                                product.description }}</p>
                            <p v-if="product.description" class="card-text text-start" style="color:rgb(155, 155, 155)">{{
                                product.description }}</p>

                        </div>
                    </div>
                </div>
                <div class="modal-footer position-sticky bottom-0 end-0 " style="z-index:1">

                    <div class="bottom d-flex flex-row justify-content-center  position-sticky"
                        style="bottom:0px;left:0px;width:100%;">
                        <div ><button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-angle-left" />
                                Πίσω</button></div>
                        <div class="input-group mb-3">
                            <span class="input-group-text plusAndMinusButton"><font-awesome-icon
                                    icon="fa-solid fa-minus" /></span>
                            <input type="text" class="form-control" value="1">
                            <span class="input-group-text plusAndMinusButton"><font-awesome-icon
                                    icon="fa-solid fa-plus" /></span>

                        </div>
                        <button class="btn btn-success btn-sm add">Προσθήκη στο καλάθι</button>
                        <!-- <button class="btn btn-success btn-sm add">Add For <b>$1.75</b></button> -->




                    </div>




                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.plusAndMinusButton {
    font-size: 10px
}

.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    z-index: 1052;
    width: 2rem;
    height: 2rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    color: rgb(155, 155, 155);
}


.input-group {

    width: 109px;
}


.add {

    height: 38px;
    border-radius: 4px;
    margin-left: 40px;
    padding-right: 22px;
    padding-left: 20px;
}


.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
}
</style>