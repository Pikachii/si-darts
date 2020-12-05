import { GetterTree, MutationTree } from 'vuex';

class IndexState {
  playerNum: number = 0;
}

export const state: () => IndexState = () => new IndexState();

export const getters: GetterTree<IndexState, IndexState> = {
  playerNum: state => state.playerNum,
};

export const mutations: MutationTree<IndexState> = {
  setPlayerNum(state: IndexState, payload: number) {
    state.playerNum = payload;
  },
};
