import { Container, Content, Footer, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, TouchableOpacity, Image } from "react-native";
import { colorBlack, colorGreyDark, colorPrimary } from "./../../../app.json";
import Toast from "./../../components/Toast";
import logo from "./../../assets/images/mobil.png";
import Map from "../../components/Modal/MapKantor";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;

class WelcomeScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    modalMap: false,
  };

  componentDidMount = () => {};

  _requestRegister = () => {
    this.props.navigation.navigate("WelcomeSignUp");
  };

  _isVisibleModalMap = (visible) => {
    this.setState({ modalMap: visible });
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content showsVerticalScrollIndicator={false}>
          <View padder>
            <View
              style={{
                padding: 20,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text welcome>Rental Mobil</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={logo}
                style={{
                  width: WIDTH / 2,
                  height: WIDTH / 2,
                  marginBottom: 3,
                }}
              />
            </View>
            <View style={{ margin: 20 }}>
              <Text
                style={{ color: colorGreyDark, fontSize: 18, marginBottom: 20 }}
              >
                Rental Mobil di Jakarta
              </Text>
              <Text
                style={{ color: colorGreyDark, fontSize: 18, marginBottom: 20 }}
              >
                Dalam melakukan Transaksi harus memiliki Akun
              </Text>
              <Text
                style={{ color: colorGreyDark, fontSize: 18, marginBottom: 5 }}
              >
                Pilih login jika sudah memiliki Akun
              </Text>
              <Text
                style={{ color: colorGreyDark, fontSize: 18, marginBottom: 30 }}
              >
                Pilih register jika belum punya Akun
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderColor: colorGreyDark,
                  borderWidth: 2.5,
                  width: WIDTH2 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: colorPrimary,
                }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text bold style={{ color: colorBlack }}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderColor: colorGreyDark,
                  borderWidth: 2.5,
                  width: WIDTH2 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: colorPrimary,
                }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text bold style={{ color: colorBlack }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </Content>
        <Footer>
          <TouchableOpacity
            onPress={() => {
              this._isVisibleModalMap(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Tampilkan Map Kantor Rental Mobil</Text>
          </TouchableOpacity>
        </Footer>
        <Toast ref="defaultToastBottom" position="bottom" />
        <Map
          modalVisible={this.state.modalMap}
          _isVisible={this._isVisibleModalMap}
        />
      </Container>
    );
  }
}

export default WelcomeScreen;
