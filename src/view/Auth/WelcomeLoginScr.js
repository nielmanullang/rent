import { Container, Content, Footer, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { colorBlack, colorGreyDark, colorPrimary } from "./../../../app.json";
import Toast from "./../../components/Toast";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;

class WelcomeLoginScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    listUnit: [],
    listNews: null,
    moreNews: true,
    listMarketplace: [],
  };

  componentDidMount = () => {};

  _requestLogin = (data) => {
    this.props.navigation.navigate("Login", { data: data });
  };

  _requestRegister = () => {
    this.props.navigation.navigate("WelcomeSignUp");
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content showsVerticalScrollIndicator={false}>
          <View padder>
            <View
              style={{
                paddingTop: HEIGHT / 3,
                paddingBottom: 50,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text welcome>Sign In</Text>
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
                onPress={() => this._requestLogin("RENTER")}
              >
                <Text bold style={{ color: colorBlack }}>
                  RENTER
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
                onPress={() => this._requestLogin("PROVIDER")}
              >
                <Text bold style={{ color: colorBlack }}>
                  PROVIDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </Content>
        <Footer>
          <TouchableOpacity
            onPress={() => {
              this._requestRegister();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Belum Punya Akun?</Text>
            <Text> Sign Up</Text>
          </TouchableOpacity>
        </Footer>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default WelcomeLoginScreen;
