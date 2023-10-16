declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
  }
  
  // THIS IS NEW
  declare module 'vue3-virtual-scroller';