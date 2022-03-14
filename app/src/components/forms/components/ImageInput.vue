<template>
  <div>
    <div v-if="alert" class="badge bg-danger mb-2 p-2 fs-6 fst-italic fw-bold">
      {{ alert }}
    </div>
    <input
      type="file"
      :name="face"
      :id="face + 'FileInput'"
      accept=".png, .jpeg, .jpg, .webp"
      @change="filePreview"
      class="form-control"
    />
    <CardImage :card="card" :face="face" :filePath="path" class="mt-2" />
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  props: {
    card: {
      type: Object,
      default: null,
    },
    face: {
      type: String,
      default: null,
    },
    filePath: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      alert: null,
      path: null,
    }
  },
  methods: {
    filePreview(event) {
      if (event.target.files[0].size > 2097152) {
        event.target.value = null;
        this.$emit('fileChange', null);
        this.path = null;
        return this.alert = "Image trop volumineuse (2MB max)"
      }
      else this.alert = null;
      let url = URL.createObjectURL(event.target.files[0]);
      this.path = url;
      this.$emit('fileChange', new Date());
    },
  },
  mounted() {
    this.path = this.filePath;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

input {
  border: none;
  box-shadow: 0 0 0 1px $primary;
  color: currentColor !important;
}
</style>
