import { Store } from 'vuex';
import { State } from '@/store';// path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
