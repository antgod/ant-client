import React, { Component } from 'react'

const A = {
  B: 'xxx'
}

class List extends Component {
  render() {
    return <Button
      id="aaaa"
      onClick={this.onSubmit}
    >{A.B}</Button>
  }
}

export default List
