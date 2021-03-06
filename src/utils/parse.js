const getComponentAndPhaseName = require('./parseMeasures')

// Schema for storing the time duration of each phase of a React component
function createSchema() {
  return {
    // Phases
    mount: {
      timeSpent: []
    },
    unmount: {
      timeSpent: []
    },
    update: {
      timeSpent: []
    },
    render: {
      timeSpent: []
    },

    // Lifecycle hooks
    componentWillMount: {
      timeSpent: []
    },
    componentDidMount: {
      timeSpent: []
    },
    componentWillReceiveProps: {
      timeSpent: []
    },
    shouldComponentUpdate: {
      timeSpent: []
    },
    componentWillUpdate: {
      timeSpent: []
    },
    componentDidUpdate: {
      timeSpent: []
    },
    componentWillUnmount: {
      timeSpent: []
    }
  }
}

// Update the time duration of each phase
function updateTime(store, componentName, phase, measure) {
  if (phase === '[mount]') {
    store[componentName].mount.timeSpent.push(measure.duration)
  }

  if (phase === '[unmount]') {
    store[componentName].unmount.timeSpent.push(measure.duration)
  }

  if (phase === '[update]') {
    store[componentName].update.timeSpent.push(measure.duration)
  }

  if (phase === '[render]') {
    store[componentName].render.timeSpent.push(measure.duration)
  }

  if (phase === 'componentWillMount') {
    store[componentName].componentWillMount.timeSpent.push(measure.duration)
  }

  if (phase === 'componentWillUnmount') {
    store[componentName].componentWillUnmount.timeSpent.push(measure.duration)
  }

  if (phase === 'componentDidMount') {
    store[componentName].componentDidMount.timeSpent.push(measure.duration)
  }

  if (phase === 'componentWillReceiveProps') {
    store[componentName].componentWillReceiveProps.timeSpent.push(
      measure.duration
    )
  }

  if (phase === 'shouldComponentUpdate') {
    store[componentName].shouldComponentUpdate.timeSpent.push(measure.duration)
  }

  if (phase === 'componentWillUpdate') {
    store[componentName].componentWillUpdate.timeSpent.push(measure.duration)
  }

  if (phase === 'componentDidUpdate') {
    store[componentName].componentDidUpdate.timeSpent.push(measure.duration)
  }
}

// Get data from the performance measures
function getReactPerformanceData(measures) {
  const store = {}

  for (let measure of measures) {
    if (getComponentAndPhaseName(measure) !== null) {
      const { componentName, phase } = getComponentAndPhaseName(measure)
      if (!store[componentName]) {
        store[componentName] = createSchema()
      }

      updateTime(store, componentName, phase, measure)
    }
  }

  return store
}

module.exports = getReactPerformanceData
