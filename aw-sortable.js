import { PolymerElement, html } from "../aw_polymer_3/polymer/polymer-element.js";
import Sortable from "../sortablejs/modular/sortable.esm.js";
import "../aw_form_elements_df/aw-form-elements-df.js";
import "../aw_polymer_3/iron-icons/iron-icons.js";

class AwSortable extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                position: relative;
                display: block;
                user-select: none;
            }
        </style>
        <slot></slot>
        `;
    }

    static get properties() {
        return {
            /** Nombre del grupo, para mover elementos de una lista a otra, deben tener el mismo grupo */
            group: { type: String },
            /** Permite ordenar elementos dentro de una lista */
            sort: { type: Boolean },
            /** Retardo al empezar a ordenar en ms */
            delay: { type: Boolean },
            /** Solo retrasa si es con touch */
	        delayOnTouchOnly: { type: Boolean },
            /** Cuántos píxeles debe mover el punto antes de cancelar un evento de arrastre retrasado. Valores entre 3 y 5 son buenos */
            touchStartThreshold: { type: Number },
            /** Desactiva la ordenación */
            disabled: { type: Boolean },
            /** 
             * Sirve para almacenar la ordenación: https://github.com/SortableJS/Sortable#store
             */
            store: { type: Object },
            /** Tempo en ms que dura la ordenación */
            animation: { type: Number },
            /** Efecto de easing */
            easing: { type: String },
            /** Selector del elemento que maneja la ordenación, si no se quiere que sea en todo el elemento ordenable */
            handle: { type: String },
            /** Selectores que no permiten el arrastre */
            filter: { type: String },
            /** Llama a `event.preventDefault ()` cuando se activa `filter` */
            preventOnFilter: { type: Boolean },
            /** (Selector) Especifica qué elementos dentro del elemento deben poder arrastrarse  */
            draggable: { type: String },

            /** Atributo HTML que es utilizado por el método `toArray()` */
            dataIdAttr: { type: String },

            /** Nombre de clase para el marcador de posición de caída */
            ghostClass: { type: String },
            /** Nombre de clase para el artículo elegido */
            chosenClass: { type: String },
            /** Nombre de clase para el elemento que se arrastra */
            dragClass: { type: String },

            /** 
             * Umbral de la zona de intercambio 
             * @type {1|0}
             */
            swapThreshold: { type: Number },
            /** Siempre usará la zona de intercambio invertida si se establece en verdadero */
            invertSwap: { type: Boolean },
            /** 
             * Umbral de la zona de intercambio invertida (se establecerá en el valor swapThreshold de forma predeterminada)
             * @type {1|0}
             */
            invertedSwapThreshold: { type: Number },
            /** 
             * Dirección de clasificable (se detectará automáticamente si no se proporciona)
             * @type {"vertical"|"horizontal"} 
             */
            direction: { type: String },

            /** ignore el comportamiento de HTML5 DnD y fuerce el respaldo para que se active */
            forceFallback: { type: Boolean },
            /** Nombre de clase para el elemento DOM clonado cuando se usa forceFallback */
            fallbackClass: { type: String },
            /** Agrega el elemento DOM clonado al cuerpo del documento */
            fallbackOnBody: { type: Boolean },
            /** Especifique en píxeles cuánto debe moverse el mouse antes de que se considere un arrastre. Valroes entre 3 y 5 son buenos */
            fallbackTolerance: { type: Number },

            /** Burbuja dragover */
            dragoverBubble: { type: Boolean },
            /** Elimina el elemento clon cuando no se muestra, en lugar de simplemente ocultarlo. */
            removeCloneOnHide: { type: Boolean },
            /** Distancia del mouse debe ser de un orden vacío para insertar el elemento de arrastre en él */
            emptyInsertThreshold: { type: Number },

            /** El elemento es elegido */
            onChose: { type: Function },
            /** El elemento no está elegido */
            onUnchoose: { type: Function },
            /** Empieza el arrastre */
            onStart: { type: Function },
            /** Termina el arrastre */
            onEnd: { type: Function },
            /** El elemento se coloca en la lista de otra lista */
            onAdd: { type: Function },
            /** Clasificación modificada dentro de la lista */
            onUpdate: { type: Function },
            /** Llamado por cualquier cambio en la lista (agregar / actualizar / eliminar) */
            onSort: { type: Function },
            /** El elemento se elimina de la lista a otra lista */
            onRemove: { type: Function },
            /** Intentar arrastrar un elemento filtrado */
            onFilter: { type: Function },
            /** Evento cuando mueve un elemento en la lista o entre listas */
            onMove: { type: Function },
            /** Llamado al crear un clon de elemento */
            onClone: { type: Function },
            /** Llamado cuando el elemento de arrastre cambia de posición */
            onChange: { type: Function },
        }
    }

    /**
     * @method  constructor
     */
    constructor() {
        super();

        this.group = `group${this._random()}`;
        this.sort = undefined;
        this.delay = undefined;
        this.delayOnTouchOnly = undefined;
        this.touchStartThreshold = undefined;
        this.disabled = undefined;
        this.store = undefined;
        this.animation = 150;
        this.easing = undefined;
        this.handle = undefined;
        this.filter = undefined;
        this.preventOnFilter = undefined;
        this.draggable = null;
        this.dataIdAttr = undefined;
        this.ghostClass = undefined;
        this.chosenClass = undefined;
        this.dragClass = undefined;
        this.swapThreshold = undefined;
        this.invertSwap = undefined;
        this.invertedSwapThreshold = undefined;
        this.direction = undefined;
        this.forceFallback = undefined;
        this.fallbackClass = undefined;
        this.fallbackOnBody = undefined;
        this.fallbackTolerance = undefined;
        this.dragoverBubble = undefined;
        this.removeCloneOnHide = undefined;
        this.emptyInsertThreshold = undefined;
        this.onChose = undefined;
        this.onUnchoose = undefined;
        this.onStart = undefined;
        this.onEnd = undefined;
        this.onAdd = undefined;
        this.onUpdate = undefined;
        this.onSort = undefined;
        this.onRemove = undefined;
        this.onFilter = undefined;
        this.onMove = undefined;
        this.onClone = undefined;
        this.onChange = undefined;
    }

    /**
     * @method  connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();

        // Inicializamos el componente
        this._init();
        
        // Resolvemos el componente
        this.removeAttribute( "unresolved" )
    }

    /**
     * @method  disconectedCallback
     */
    disconectedCallback() {
        super.disconectedCallback();
    }

    /**
     * @method  setData
     * 
     * @param {DataTransfer} dataTransfer 
     * @param {HTMLElement} dragEl 
     */
    setData(dataTransfer, dragEl) {
		dataTransfer.setData('Text', dragEl.textContent);
	}

    /**
     * @method  _init
     */
    _init() {
        const options = this._setOptions();

        // Crea el elemento ordenable
        Sortable.create(this, options);
    }

    /**
     * @method  _random
     * 
     * @returns {number}
     */
    _random() {
        return Math.random() * (999999 - 11111) + 11111;
    }

    /**
     * @method  _setOptions
     */
    _setOptions() {
        const optionsNames = [
            `group`,
            `sort`,
            `delay`,
            `delayOnTouchOnly`,
            `touchStartThreshold`,
            `disabled`,
            `store`,
            `animation`,
            `easing`,
            `handle`,
            `filter`,
            `preventOnFilter`,
            `draggable`,
            `dataIdAttr`,
            `ghostClass`,
            `chosenClass`,
            `dragClass`,
            `swapThreshold`,
            `invertSwap`,
            `invertedSwapThreshold`,
            `direction`,
            `forceFallback`,
            `fallbackClass`,
            `fallbackOnBody`,
            `fallbackTolerance`,
            `dragoverBubble`,
            `removeCloneOnHide`,
            `emptyInsertThreshold`,
            `onChose`,
            `onUnchoose`,
            `onStart`,
            `onEnd`,
            `onAdd`,
            `onUpdate`,
            `onSort`,
            `onRemove`,
            `onFilter`,
            `onMove`,
            `onClone`,
            `onChange`,
        ];

        const options = {};
        optionsNames.forEach(opt => {
            if(this[opt]) {
                options[opt] = this[opt];
            }
        });
        
        return options;
    }
}

window.customElements.define( "aw-sortable", AwSortable );