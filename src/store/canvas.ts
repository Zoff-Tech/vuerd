import Vue from 'vue';
import Vuex from 'vuex';
import {canvasMove} from './canvas/canvasController';
import {showChange} from './canvas/showController';
import {dataShow, dataInit} from '@/data/canvas';

Vue.use(Vuex);

export interface State {
  width: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
  show: Show;
}

export interface Show {
  tableComment: boolean;
  columnComment: boolean;
  columnDataType: boolean;
  columnDefault: boolean;
  columnAutoIncrement: boolean;
  columnPrimaryKey: boolean;
  columnUnique: boolean;
  columnNotNull: boolean;
  relationship: boolean;
}

export const enum ShowKey {
  tableComment = 'tableComment',
  columnComment = 'columnComment',
  columnDataType = 'columnDataType',
  columnDefault = 'columnDefault',
  columnAutoIncrement = 'columnAutoIncrement',
  columnPrimaryKey = 'columnPrimaryKey',
  columnUnique = 'columnUnique',
  columnNotNull = 'columnNotNull',
  relationship = 'relationship',
}

export const enum Commit {
  init = 'init',
  load = 'load',
  canvasMove = 'canvasMove',
  showChange = 'showChange',
}

export function createStore() {
  return new Vuex.Store<State>({
    state: {
      width: 2000,
      height: 2000,
      scrollTop: 0,
      scrollLeft: 0,
      show: dataShow(),
    },
    getters: {},
    mutations: {
      init(state: State) {
        const stateData = state as any;
        const initData = dataInit() as any;
        Object.keys(state).forEach((key) => {
          stateData[key] = initData[key];
        });
      },
      load(state: State, load: State) {
        const stateData = state as any;
        const loadData = load as any;
        Object.keys(state).forEach((key) => {
          stateData[key] = loadData[key];
        });
        state.scrollTop = 0;
        state.scrollLeft = 0;
      },
      canvasMove,
      showChange,
    },
    actions: {},
  });
}