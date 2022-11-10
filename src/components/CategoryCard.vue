<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="d-flex flex-row align-items-center">
        <div class="flex-grow-1 flex-shrink-1 p-3">
          <div class="card-title text-dark font-weight-bolder h4 mb-1">
            {{headline}}
          </div>
          <div class="text-dark-75">{{sub_headline}}</div>
        </div>
        <div class="flex-grow-3 flex-shrink-0">
          <div class="symbol symbol-120 d-block image-no-svg p-2" style="background-color: rgb(53, 173, 206)">
            <img style="max-height:120px;max-width:120px;width:100%;height:100%" height="120" width="120"
              v-bind:src="'/assets/categories/' + image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "headline", "sub_headline", "image"]
}
</script>

<style>

</style>

