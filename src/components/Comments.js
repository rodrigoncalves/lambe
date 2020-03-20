import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Comments extends Component {
  render() {
    let commentsView = null
    if (this.props.comments) {
      commentsView = this.props.comments.map((item, index) => (
        <View style={styles.commentContainer} key={index}>
          <Text style={styles.nickname}>{item.nickname}: </Text>
          <Text style={styles.comment}>{item.text}</Text>
        </View>
      ))
    }

    return <View style={styles.container}>{commentsView}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  nickname: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#444',
  },
  comment: {
    color: '#555',
  },
})
