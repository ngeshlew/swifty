import React, { useState } from 'react'
import { connect } from 'react-redux'
import Field from './field'
import SecureField from './secure'

import { saveEntry } from 'actions/entries'

const Form = ({ entry, onSaveItem }) => {
  const [credentials, setCredentials] = useState(entry || {
    title: '',
    type: 'login',
    website: '',
    username: '',
    password: '',
    email: '',
    note: ''
  })

  const updateCredentials = event => {
    let obj = {}
    obj[event.target.name] = event.target.value
    setCredentials({ ...credentials, ...obj})
  }

  const saveCredentials = () => {
    if (credentials.title && credentials.username && credentials.password) {
      onSaveItem(credentials)
    } else {
      console.log("Please fill in title, username and password")
    }
  }

  return (
    <div className="aside">
      <Field name="Title" entry={credentials} onChange={updateCredentials} />
      <Field name="Website" entry={credentials} onChange={updateCredentials} />
      <Field name="Username" entry={credentials} onChange={updateCredentials} />
      <SecureField name="Password" entry={credentials} onChange={updateCredentials} />
      <Field name="Email" entry={credentials} onChange={updateCredentials} />
      <Field name="Note" entry={credentials} onChange={updateCredentials} multiline />
      <div className="action">
        <span className="button" onClick={saveCredentials}>Save</span>
      </div>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    onSaveItem: credentials => dispatch(saveEntry(credentials))
  }
}
export default connect(null, mapDispatchToProps)(Form)
