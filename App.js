import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, TextInput, Modal, Linking, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';



const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

const profileImages = [
  'https://meuvalordigital.com.br/wp-content/uploads/2023/08/mulher-feliz-150x150.jpg',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1392f2e3-d214-440d-8a97-65e1d6f5a460/dcthe25-c3f48252-f92b-4e35-8462-ca3caaa4b09a.png/v1/fill/w_150,h_150/_f2u__woods__by_raridecor_dcthe25-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUwIiwicGF0aCI6IlwvZlwvMTM5MmYyZTMtZDIxNC00NDBkLThhOTctNjVlMWQ2ZjVhNDYwXC9kY3RoZTI1LWMzZjQ4MjUyLWY5MmItNGUzNS04NDYyLWNhM2NhYWE0YjA5YS5wbmciLCJ3aWR0aCI6Ijw9MTUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.g4i7eTcNkKxKLk7zljaoSIpZ9BNWkZ1myTPsKV6yWuw',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f4bd7a6-f763-4518-9b81-bdfd40ce3fc9/d26yer1-421bb5b8-9fc2-4d5a-b2d1-1e1f81b26b82.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVmNGJkN2E2LWY3NjMtNDUxOC05YjgxLWJkZmQ0MGNlM2ZjOVwvZDI2eWVyMS00MjFiYjViOC05ZmMyLTRkNWEtYjJkMS0xZTFmODFiMjZiODIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.p5vfqGmq9kIylfG3glHGa20CAPUtoWlAxKEGpIvGOi8',
  // Adicione quantos URLs de imagens desejar
];

const svgContent = `
<svg
version="1.1"
id="svg4058"
width="880"
height="880"
viewBox="0 0 880 880"
sodipodi:docname="park-landscape-publicdomainvectors.org.svg"
inkscape:version="1.2 (dc2aedaf03, 2022-05-15)"
xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
xmlns="http://www.w3.org/2000/svg"
xmlns:svg="http://www.w3.org/2000/svg">
`;

const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Função para trocar a imagem de perfil
const changeProfileImage = () => {
  // Verifica se há uma próxima imagem no array
  if (currentImageIndex < profileImages.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1);
  } else {
    // Se estiver na última imagem, volte para a primeira
    setCurrentImageIndex(0);
  }
};



  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleGoBack = () => {
    setShowCamera(false);
  };

  const handleToggleCamera = () => {
    setShowCamera(!showCamera);
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();
        console.log('Foto tirada:', uri);

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
        console.log('Foto salva no armazenamento local');
      } catch (error) {
        console.error('Erro ao tirar a foto:', error);
      }
    }
  };

  const sendSMS = () => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openMaps = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=';
    Linking.openURL(url);
  };

  const handleLoginCadastro = () => {
    setLoginModalVisible(true);
  };

  const [loggedInEmail, setLoggedInEmail] = useState('');

  const handleLogin = () => {

      // Permitir o login independentemente do e-mail e senha inseridos
      setLoggedInEmail(email);
      setLoggedIn(true);
      setLoginModalVisible(false);
    

    // if (email === 'seuemail@gmail.com' && password === 'suasenha') {
    //   setLoggedIn(true);
    //   setLoginModalVisible(false);
    // } else {
    //   alert('Email ou senha incorretos.');
    // }
  };

  const handleGoogleLogin = () => {
    setLoggedIn(true);
    setLoginModalVisible(false);
  };

  const handleProfile = () => {
    setProfileModalVisible(true);
  };

  return (
    <View style={styles.container}>
    <SvgXml xml={svgContent} width="100%" height={160} />
      {!showCamera && !loggedIn && (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginCadastro}>
          <Icon name="log-in" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      )}

      {loggedIn && (
        <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
          <Icon name="user" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {!showCamera && loggedIn && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleToggleCamera}>
          <Icon name="camera" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Icon name='message-circle'  size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openMaps}>
          <Icon name='map-pin'  size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      )}

      {showCamera && (
        <Camera style={styles.camera} type={type} ref={(ref) => (camera = ref)}>
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
            <Icon name='refresh-ccw'  size={25} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Icon name='camera'  size={25} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={handleGoBack}>
            <Icon name='corner-up-right'  size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {showCamera || (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Configurar SMS</Text>
              <TextInput
                style={styles.input}
                placeholder="Número de Telefone"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
              <Button title="Enviar SMS" onPress={sendSMS} />
              <Button title="Fechar" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      )}

<Modal
  animationType="fade"
  transparent={true}
  visible={loginModalVisible}
  onRequestClose={() => setLoginModalVisible(false)}>
  <View style={styles.loginModalContainer}>
    <View style={styles.loginModalContent}>
      <Text style={styles.modalText}>Login/Cadastro</Text>
      <TextInput
        style={[styles.input, styles.emailInput]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, styles.passwordInput]}
        placeholder="Senha"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.showPasswordButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
      {/* <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/google-512.png' }}
          style={styles.googleButtonImage}
        />
      </TouchableOpacity> */}
      <Button title="Fechar" onPress={() => setLoginModalVisible(false)} />
    </View>
  </View>
</Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}>
        <View style={styles.profileModalContainer}>
          <View style={styles.profileModalContent}>
            <Text style={styles.modalText}>Perfil</Text>
            <Image source={{ uri: profileImages[currentImageIndex] }} style={styles.profileImage} />
            <Text style={styles.profileText}>teste</Text>
            <Text style={styles.profileText}>Email:teste {loggedInEmail}</Text>
            <Button title="Trocar Imagem de Perfil" onPress={changeProfileImage} />
            <Button title="Fechar" onPress={() => setProfileModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3CB371',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#006400',
    borderRadius: 80,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  cameraButton: {
    padding: 15,
    backgroundColor: '#006400',
    borderRadius: 80,
  },
  cameraButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: 300,
  },
  emailInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
  showPasswordButton: {
    marginBottom: 20,
  },
  loginButton: {
    position: 'absolute',
    bottom: 700,
    right: 20,
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 80,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
  },
  loginModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loginModalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
  },
  googleButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  googleButtonImage: {
    width: 30,
    height: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  showPasswordButtonText: {
    color: 'blue',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#006400',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  profileButtonText: {
    fontSize: 14,
    color: 'white',
  },
  profileModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
