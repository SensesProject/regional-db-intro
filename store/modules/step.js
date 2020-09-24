import { has, get, set, isUndefined, isNaN, forEach } from 'lodash'

const steps = [
  {
    text: false,
    points: [],
    highlights: []
  },
  {
    text: 'start',
    points: ['brainstorming', 'backcasting'],
    highlights: ['left']
  },
  {
    text: 'defined',
    points: ['what-should', 'what-could'],
    highlights: ['right']
  },
  {
    text: 'well-defined',
    points: ['what-should', 'what-could'],
    highlights: []
  },
  {
    text: 'ill-defined',
    points: ['what-should', 'what-could'],
    highlights: []
  }
]

const DEFAULTS = {
  points: [],
  step: 0,
  text: null,
  highlights: []
}

const state = () => {
  return {
    points: DEFAULTS.points,
    text: DEFAULTS.text,
    step: DEFAULTS.step,
    highlights: DEFAULTS.highlights,
    maxStep: steps.length - 1
  }
}

const mutations = {
  SETTINGS_CHANGE (state, changes) {
    forEach(changes, (value, key) => {
      if (has(state, key)) {
        let val = value
        if (isUndefined(value) || isNaN(value)) {
          val = get(DEFAULTS, key)
        }
        set(state, key, val)
      }
    })
  },
  CHANGE_STEP (state, step) {
    state.currentStep = step
  }
}

const actions = {
  setStep ({ state, commit, dispatch }, n) {
    const next = Math.max(Math.min(n, state.maxStep), 0)
    const changes = get(steps, next, {})
    commit('SETTINGS_CHANGE', changes)
    commit('CHANGE_STEP', next)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}