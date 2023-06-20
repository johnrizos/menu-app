<script setup>
import { ref, reactive, computed } from 'vue';


const props = defineProps({
    product_id: Number,
    title: String,
    description: String,
    image_url: String,
    price: String,
    addToTheCard: Function
})

const productQuantity = ref(1)

const addQuantityToProduct = () => {
    productQuantity.value++;
}

const subtractQuantityToProduct = () => {
    if (productQuantity.value > 1) {
        productQuantity.value--;

    }
}

const textPriceToNumber = (price) => {

    const replacedPrice = price.replace(",", ".");

    const number = parseFloat(replacedPrice);
    const roundedNumber = Math.round(number * 100) / 100;
    return roundedNumber;
}

const calculateNumberPriceAndQuantity = (price, quantity) => {
    return (price * quantity).toFixed(2).toString().replace(".", ",");

}

const totalProductPrice = computed(() => {
    return calculateNumberPriceAndQuantity(textPriceToNumber(product.price), productQuantity.value)
})

const addToBasket = () => {

}

const viewMoreFunction = () => {
    hideExtraTextInDescription.value = !hideExtraTextInDescription.value;
    console.log("viewMoreFunction works");
}


const hideExtraTextInDescription = ref(true);


const product = reactive({
    product_id: 1,
    title: "Ελληνικός μονός",
    description: "O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής.O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής",
    img_url: "http://localhost/menu/api/images/products/6475b39226d34951cb70767239394d2208f47a5995d38.jpg",
    price: "1,75",
})
</script>
<template>
    <div class="modal d-block " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog m-auto modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content position-relative" style="background-color:rgb(247, 247, 247)">
                <div class="modal-header p-0 position-sticky top-0 end-0 " style="z-index:1">

                    <div class="close "><font-awesome-icon icon="fa-solid fa-xmark" /></div>


                </div>
                <div class="modal-body p-0">
                    <div class="card">
                        <img :src="product.img_url" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-start ">{{ product.title }}</h5>
                            <p v-if="product.description" class="card-text text-start"
                                :class="hideExtraTextInDescription ? 'limitDescriptionCharacters pb-0 mb-0' : ''"
                                style="color:rgb(155, 155, 155)">{{
                                    product.description }}</p>
                            <p v-if="hideExtraTextInDescription" @click="viewMoreFunction" class="text-start fw-bold"
                                style="color:rgb(155, 155, 155)">Μάθε περισσότερα</p>

                            <p class="text-start fw-bold">{{ totalProductPrice }}€</p>

                        </div>
                    </div>
                </div>
                <div class="modal-footer position-sticky bottom-0 end-0 bg-white" style="z-index:1">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="input-group">
                                    <span @click="subtractQuantityToProduct"
                                        class="input-group-text plusAndMinusButton"><font-awesome-icon
                                            icon="fa-solid fa-minus" /></span>
                                    <span class="input-group-text bg-white">{{ productQuantity }}</span>
                                    <span @click="addQuantityToProduct"
                                        class="input-group-text plusAndMinusButton"><font-awesome-icon
                                            icon="fa-solid fa-plus" /></span>

                                </div>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-success btn-sm add">Προσθήκη <b>{{ totalProductPrice }}€</b></button>

                            </div>

                        </div>
                    </div>
                    <!-- <div class="bottom d-flex flex-row justify-content-between  position-sticky " style="bottom:0px;left:0px;width:100%;"> -->
                    <!-- <div ><button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-angle-left" />
                                Πίσω</button></div> -->
                    <!-- <div class="input-group mb-3">
                            <span class="input-group-text plusAndMinusButton"><font-awesome-icon
                                    icon="fa-solid fa-minus" /></span> -->
                    <!-- <input type="text" class="form-control" value="1"> -->
                    <!-- <span class="input-group-text bg-white">1</span>
                            <span class="input-group-text plusAndMinusButton"><font-awesome-icon
                                    icon="fa-solid fa-plus" /></span>

                        </div>
                        <button class="btn btn-success btn-sm add">Προσθήκη <b>1,75€</b></button> -->
                    <!-- <button class="btn btn-success btn-sm add">Add For <b>$1.75</b></button> -->




                    <!-- </div> -->




                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
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



.add {

    height: 38px;
    border-radius: 4px;
    /* margin-left: 40px;
    padding-right: 22px;
    padding-left: 20px; */
}

.limitDescriptionCharacters {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}


.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
}
</style>