import { PolymerElement, html } from "../aw_polymer_3/polymer/polymer-element.js";
import Sortable from "../sortablejs/modular/sortable.esm.js";

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
            group: { type: Object },
            sort: { type: Boolean },
            delay: { type: Boolean },
	        delayOnTouchOnly: { type: Boolean },
            touchStartThreshold: { type: Number },
            disabled: { type: Boolean },
            store: { type: Object },
            animation: { type: Number },
            easing: { type: String },
            handle: { type: String },
            filter: { type: String },
            preventOnFilter: { type: Boolean },
            draggable: { type: String },
            draggableItem: { type: String },

            dataIdAttr: { type: String },

            ghostClass: { type: String },
            chosenClass: { type: String },
            dragClass: { type: String },

            swapThreshold: { type: Number },
            invertSwap: { type: Boolean },
            invertedSwapThreshold: { type: Number },
            direction: { type: String },

            forceFallback: { type: Boolean },
            fallbackClass: { type: String },
            fallbackOnBody: { type: Boolean },
            fallbackTolerance: { type: Number },

            dragoverBubble: { type: Boolean },
            removeCloneOnHide: { type: Boolean },
            emptyInsertThreshold: { type: Number },

            onChose: { type: Function },
            onUnchoose: { type: Function },
            onStart: { type: Function },
            onEnd: { type: Function },
            onAdd: { type: Function },
            onUpdate: { type: Function },
            onSort: { type: Function },
            onRemove: { type: Function },
            onFilter: { type: Function },
            onMove: { type: Function },
            onClone: { type: Function },
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
        this.draggableItem = undefined;
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