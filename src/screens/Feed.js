import React, {Component} from 'react'
import {StyleSheet, FlatList, View} from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'
import {connect} from 'react-redux'

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Post key={item.id} {...item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
})

const mapStateToProps = ({posts}) => ({posts: posts.posts})

export default connect(mapStateToProps)(Feed)
