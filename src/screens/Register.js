import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          autoFocus={true}
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
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Profile')
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
