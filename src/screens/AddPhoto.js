import React, {Component} from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native'
import {connect} from 'react-redux'
import {addPost} from '../store/actions/posts'

const initialState = {
  image: null,
  comment: '',
}

const noUser = 'Você precisa estar logado para adicionar imagens'
class AddPhoto extends Component {
  state = {
    ...initialState,
  }

  pickImage = () => {
    if (!this.props.name || !this.props.email) {
      Alert.alert('Falha!', noUser)
      return
    }

    ImagePicker.showImagePicker(
      {
        title: 'Escolha a imagem',
        maxHeight: 600,
        maxWidth: 800,
      },
      res => {
        console.log(res)
        if (!res.didCancel) {
          this.setState({image: {uri: res.uri, base64: res.data}})
        }
      },
    )
  }

  save = async () => {
    if (!this.props.name || !this.props.email) {
      Alert.alert('Falha!', noUser)
      return
    }

    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment,
        },
      ],
    })

    this.setState({...initialState})
    this.props.navigation.navigate('Feed')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compatilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image source={this.state.image} style={styles.image} />
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Algum comentário para foto?"
            editable={!!this.props.name}
            style={styles.input}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment})}
          />
          <TouchableOpacity onPress={this.save} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#eee',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
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
    marginTop: 20,
    width: '90%',
  },
})

const mapStateToProps = ({user}) => ({...user})

const mapDispatchToProps = dispatch => ({
  onAddPost: post => dispatch(addPost(post)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
