import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {createUser} from '../store/actions/user'

const initialState = {
  name: '',
  email: '',
  password: '',
}

class Register extends Component {
  state = {...initialState}

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({...initialState})
      this.props.navigation.navigate('Profile') // ou Feed
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Nome"
          autoFocus={true}
          style={styles.input}
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.onCreateUser(this.state)
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    // ...commonStyle.input
    marginTop: 20,
    width: '90%',
    height: 40,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#333',
    paddingLeft: 15,
  },
})

const mapStateToProps = ({user}) => ({
  isLoading: user.isLoading,
})

const mapDispatchToProps = dispatch => ({
  onCreateUser: user => dispatch(createUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
