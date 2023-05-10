<template>
  <div class="card">
                            <!---->
                            <div class="card-body p-2">
                                <div
                                    class="d-flex align-items-center justify-content-start singleitem flex-row">
                                    <div class="mr-2 flex-grow-1 flex-shrink-1 text-start">
                                        <div class="text-dark font-weight-bold mb-1">
                                            <h5>{{product.title}}</h5>
                                        </div>
                                        <div v-if="product.description" class="text-dark-75 mb-1">
                                            {{product.description}}
                                        </div>
                                        <!---->
                                        <div v-for="price in product.prices" :key="price.id"
                                            class="text-dark-75 label label-inline d-inline label-rounded label-xl">
                                            {{price.value}}
                                        </div>
                                    </div>
                                    <div class="flex-grow-3 flex-shrink-0 image">
                                        <div class="symbol symbol-100">
                                            <img v-if="product.img"
                                                :src="images_url + 'products/'+ product.img"
                                                alt="/assets/media/logos/menurio-icon.png" class="lazyload lazyloaded">
                                            <!---->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
</template>

<script>
export default {
    props:["product"],
    inject:["api_url","images_url"],

    created(){
        console.log("product.prices=",this.product);
    }  

}
</script>

<style scoped>
.label {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    font-size: 0.8rem;
    background-color: #ebedf3;
    color: #3f4254;
    font-weight: 400;
    height: 20px;
    width: 20px;
    font-size: 0.8rem;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 0.42rem;
}

img {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 0.42rem;

    width: 100%;
    max-width: 100px;
    max-height: 100px;

}

.symbol {
    display: inline-block;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
    border-radius: 0.42rem;
}
</style>