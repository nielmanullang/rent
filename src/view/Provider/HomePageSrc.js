import { Container, Content, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar } from "react-native";
import Toast from "./../../components/Toast";
import { getAsyncStoreLoad } from "./../../redux/actions/commonAction";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };
  state = {
    dataUser: null,
    personalData: null,
    listKategory: [],
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
    getAsyncStoreLoad("personalData", this.getPersonalData);
  };

  getDataUser = (dataUser) => {
    this.setState({ dataUser });
  };

  getPersonalData = (personalData) => {
    this.setState({ personalData });
  };

  _actionKategory = (data) => {
    this.props.navigation.navigate("Product", { data: data });
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content>
          <View style={{ padding: 15 }}>
            <Text style={{ textAlign: "center", fontSize: 25 }}>
              Dashboard Provider
            </Text>
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default HomePageScreen;
