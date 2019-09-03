<template>
  <h1 class="app-description">
    {{ $t('APP_DESCRIPTION') }}
  </h1>
</template>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.06;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-description {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-description {
    font-size: $relative-font-size;
  }
}
</style>
