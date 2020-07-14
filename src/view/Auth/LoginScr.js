import { Container, Content, Header, Icon } from "native-base";
import React from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colorBlack,
  colorGreyDark,
  colorPrimary,
  colorPrimaryDark,
} from "./../../../app.json";
import { convertToLetterCase } from "./../../../native-base-theme/variables/convert";
import logo from "./../../assets/images/logo.png";
import Toast from "./../../components/Toast";
import {
  apiCall,
  getAsyncStoreSave,
  resetNavigation,
} from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;

class Login extends React.Component {
  static navigationOptions = { header: null };

  state = {
    username: "",
    password: "",
    error: false,
    dataUser: null,
    showPass: true,
    press: false,
  };

  componentDidMount = () => {};

  uOnchange(e) {
    this.setState({ username: e.nativeEvent.text });
  }

  pOnchange(e) {
    this.setState({ password: e.nativeEvent.text });
  }

  _requestLogin = () => {
    let type =
      this.props.navigation.state.params.data == "RENTER"
        ? "RENTER"
        : "PROVIDER";
    const api = endPoint.login;
    const data = {
      username: this.state.username,
      password: this.state.password,
      role: type,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    apiCall.post(api, data, this.getDoLogin, header);
  };

  getDoLogin = (callback) => {
    if (callback != null && callback.data.status == "OK") {
      const api = endPoint.getDetailUser + "?token=" + callback.data.token;
      const header = { headers: { "Content-Type": "application/json" } };
      getAsyncStoreSave("dataUser", callback.data, () => {
        apiCall.get(api, header, this.getAccountPersonal, callback.data);
      });
    } else {
      this.refs.defaultToastBottom.ShowToastFunction(callback.data.message);
    }
  };

  getAccountPersonal = (callback, dataUser) => {
    if (callback != null && callback.data.status == "OK") {
      getAsyncStoreSave("personalData", callback.data.data, () => {
        dataUser.role == "RENTER"
          ? resetNavigation("CustomerIndex", this.props.navigation)
          : resetNavigation("ProviderIndex", this.props.navigation);
      });
    }
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  _requestResetPassword = () => {
    this.refs.defaultToastBottom.ShowToastFunction("Fitur Belum Tersedia");
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Header>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Icon name="arrow-back" style={{ color: colorBlack }} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 8,
                paddingRight: 10,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: colorBlack, fontSize: 22, fontWeight: "bold" }}
              >
                LOGIN
              </Text>
            </View>
          </View>
        </Header>
        <Content>
          <View style={{ backgroundColor: "#FFF" }}>
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
              <Text
                style={{ color: colorGreyDark, fontSize: 40, marginBottom: 10 }}
              >
                Sign In
              </Text>
              <Text style={{ color: colorGreyDark, fontSize: 20 }}>
                {convertToLetterCase(this.props.navigation.state.params.data)}
              </Text>
            </View>
            <Text
              style={{
                color: colorPrimaryDark,
                fontSize: 14,
                fontWeight: "bold",
                marginLeft: 25,
                paddingTop: 40,
                paddingLeft: 17,
                paddingEnd: 15,
                paddingBottom: 10,
              }}
            >
              Username :
            </Text>
            <View>
              <View
                style={{
                  position: "absolute",
                  top: 18,
                  left: 22,
                  backgroundColor: "#571745",
                  width: 7,
                  height: 7,
                  zIndex: 1,
                  borderRadius: 3,
                }}
              />
              <TextInput
                autoFocus={true}
                style={{
                  width: WIDTH - 55,
                  height: 45,
                  borderRadius: 10,
                  fontSize: 16,
                  paddingLeft: 17,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#571745",
                  marginHorizontal: 25,
                  overflow: "hidden",
                }}
                placeholder={"Enter Username"}
                autoCapitalize="none"
                placeholderTextColor={"rgba(0, 0, 0, 0.35)"}
                underlineColorAndroid="transparent"
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
                borderColor={colorPrimaryDark}
                onChange={(username) => this.uOnchange(username)}
              />
              <Icon
                name="person"
                size={26}
                color={colorPrimaryDark}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 37,
                  color: colorPrimaryDark,
                }}
              />
            </View>
            <Text
              style={{
                color: colorPrimaryDark,
                fontSize: 14,
                fontWeight: "bold",
                marginLeft: 25,
                paddingLeft: 17,
                paddingBottom: 10,
                paddingTop: 15,
              }}
            >
              Password :
            </Text>
            <View>
              <View
                style={{
                  position: "absolute",
                  top: 18,
                  left: 22,
                  backgroundColor: "#571745",
                  width: 7,
                  height: 7,
                  zIndex: 1,
                  borderRadius: 3,
                }}
              />
              <TextInput
                style={{
                  width: WIDTH - 55,
                  height: 45,
                  borderRadius: 10,
                  fontSize: 16,
                  paddingLeft: 17,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#571745",
                  marginHorizontal: 25,
                  overflow: "hidden",
                }}
                placeholder={"Enter Password"}
                autoCapitalize="none"
                secureTextEntry={this.state.showPass}
                placeholderTextColor={"rgba(0, 0, 0, 0.35)"}
                underlineColorAndroid="transparent"
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                borderColor={colorPrimaryDark}
                onChange={(passowrd) => this.pOnchange(passowrd)}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 37,
                  color: colorPrimaryDark,
                }}
                onPress={this.showPass.bind(this)}
              >
                <Icon
                  name={this.state.press == false ? "md-eye" : "md-eye-off"}
                  size={26}
                  style={{ color: colorPrimaryDark }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                padding: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  width: WIDTH2 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this._requestResetPassword()}
              >
                <Text bold style={{ color: colorBlack }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderColor: colorGreyDark,
                  borderWidth: 2.5,
                  width: WIDTH2 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: colorPrimary,
                }}
                onPress={() => this._requestLogin()}
              >
                <Text
                  bold
                  style={{
                    color: colorBlack,
                    marginLeft: -15,
                    marginRight: 10,
                  }}
                >
                  LOGIN
                </Text>
                <Icon
                  name="send"
                  size={26}
                  color={colorPrimaryDark}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 30,
                    color: colorBlack,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default Login;
