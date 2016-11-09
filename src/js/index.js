import React from 'react'
import {render} from 'react-dom'
import Mapping from '../components'
import _Configuration from '../components/_Configuration'

window.MAPPING = Mapping
window.cleanObject = (obj) => {
  if (!obj) return
  let result = {}
  Object.keys(obj).forEach(key => {
    result[key] = obj[key].value
  })

  return result
}

let deepCopy = window.deepCopy = (target, source) => {
  for (let key in source) {
    if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = deepCopy({}, source[key])
    } else {
      target[key] = source[key]
    }
  }

  return target
}

let mapping = groupMapping(Array.from(Mapping))
// 删除私有的组件
delete mapping.private

let treeList = ['Layout', 'Block', 'Inline'].map(key => {
  let result = {
    title: key,
    items: mapping[key]
  }
  return result
})

render(<_Configuration mapping={treeList}/>, document.getElementById('root'))

function groupMapping (mapping) {
  let result = {}
  mapping.forEach(item => {
    let type = item.type
    let child = result[type] = result[type] || []
    child.push(item)
  })

  return result
}