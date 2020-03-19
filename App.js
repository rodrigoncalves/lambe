import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Header from './src/components/Header'
import Post from './src/components/Post'

const fence = require('./assets/imgs/fence.jpg')

export default class App extends Component {
  render() {
    const comments = [
      {
        nickname: 'Joanna Elena Silva',
        comment: 'Excelente foto!',
      },
      {
        nickname: 'Rafael Gustavo Pereira',
        comment: 'Muito ruim! Faço melhor...',
      },
    ]

    return (
      <View style={styles.container}>
        <Header />
        <Post image={fence} comments={comments} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
