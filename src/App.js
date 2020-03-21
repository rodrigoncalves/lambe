import React, {Component} from 'react'
import {Alert} from 'react-native'
import {connect} from 'react-redux'
import Navigator from './Navigator'
import {setMessage} from './store/actions/message'

class App extends Component {
  componentDidUpdate = () => {
    if (this.props.msg && this.props.msg.trim()) {
      console.log('props', this.props)
      Alert.alert(this.props.title || 'Atenção', this.props.msg)
      this.props.clearMessage()
    }
  }

  render() {
    return <Navigator />
  }
}

const mapStateToProps = ({message}) => ({
  title: message.title,
  msg: message.msg,
})

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch(setMessage({title: '', msg: ''})),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
