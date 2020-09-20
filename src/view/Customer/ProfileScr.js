import { Container, Content, Icon, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { colorBlack, colorGreyDark, colorPrimary } from "./../../../app.json";
import Toast from "./../../components/Toast";
import {
  apiCall,
  getAsyncStoreLoad,
  getAsyncStoreSave,
  resetNavigation,
} from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;
class ProfileScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    dataUser: null,
    personalData: null,
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
  };

  componentWillUnmount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
  }

  getDataUser = (dataUser) => {
    this.setState({ dataUser }, () => {
      getAsyncStoreLoad("personalData", this.getPersonalData);
    });
  };

  getPersonalData = (personalData) => {
    this.setState({ personalData });
  };

  _logout = () => {
    getAsyncStoreSave("dataUser", null, () => {
      getAsyncStoreSave(
        "personalData",
        null,
        resetNavigation("WelcomeLogin", this.props.navigation)
      );
    });
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              backgroundColor: colorPrimary,
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 50,
                justifyContent: "center",
                backgroundColor: colorPrimary,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Icon style={{ fontSize: 75 }} name="md-person" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text bold style={{ color: colorGreyDark, fontSize: 20 }}>
                Halo {this.state.personalData && this.state.personalData.name}
              </Text>
            </View>
          </View>
          <View style={{ padding: 15 }}>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderColor: colorGreyDark,
                  borderWidth: 2.5,
                  width: WIDTH - 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: colorPrimary,
                }}
                onPress={() => this._logout()}
              >
                <Text bold style={{ color: colorBlack }}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default ProfileScreen;
