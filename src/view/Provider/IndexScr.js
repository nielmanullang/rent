import { Icon } from "native-base";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { colorPrimary } from "./../../../app.json";
import Tab2 from "./OrderScr";
import Tab1 from "./HomePageSrc";
import Tab3 from "./ProfileScr";

export class IndexScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    dataUser: null,
    personalData: null,
  };

  componentDidMount = () => {};

  render() {
    return <Tab1 navigation={this.props.navigation} />;
  }
}

export class Order extends React.Component {
  render() {
    return <Tab2 navigation={this.props.navigation} />;
  }
}

export class Profile extends React.Component {
  render() {
    return <Tab3 navigation={this.props.navigation} />;
  }
}

export default createBottomTabNavigator(
  {
    Home: {
      screen: IndexScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-home" style={{ color: tintColor }} size={24} />
        ),
      },
    },
    Order: {
      screen: Order,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="paper" style={{ color: tintColor }} size={24} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person" style={{ color: tintColor }} size={24} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Order", "Profile"],
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: "#000000",
      inactiveTintColor: "#586589",
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: colorPrimary,
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5,
        paddingTop: 5,
      },
    },
  }
);
