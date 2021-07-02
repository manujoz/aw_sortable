# AW_SORTABLE

Componente que crea listas ordenables para la biblioteca aw_polymer_3.

## Instalación

```
npm i aw_sortable
```

## Uso

```html
<aw-sortable handle=".draggable" on-end="onEnd">
  <div class="sortable">
    <iron-icon class="draggable" icon="reorder"></iron-icon>
    Liata 1
  </div>
  <div class="sortable">
    <iron-icon class="draggable" icon="reorder"></iron-icon>
    Lista 2
  </div>
  <div class="sortable">
    <iron-icon class="draggable" icon="reorder"></iron-icon>
    Lista 3
  </div>
  <div class="sortable">
    <iron-icon class="draggable" icon="reorder"></iron-icon>
    Lista 4
  </div>
</aw-sortable>
<script>
  function onEnd(ev) {
    console.log(ev);
  }
</script>
```

Todas las propiedades que se le pueden pasar al componente están definidas en https://github.com/SortableJS/Sortable#readme
