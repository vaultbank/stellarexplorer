import React from 'react'
import AccountTable from './AccountTable'

class Accounts extends React.Component {
  render() {
    return (
      <AccountTable limit={10} />
    )
  }
}

export default Accounts
