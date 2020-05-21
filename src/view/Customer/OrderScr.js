import { Container, Content, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar } from "react-native";
import Toast from "./../../components/Toast";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class ChatScreen extends React.Component {
  static navigationOptions = { header: null };
  state = {};

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                marginTop: HEIGHT / 2,
              }}
            >
              List Order
            </Text>
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default ChatScreen;
