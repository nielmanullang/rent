import { Text, View } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import { mapApiKey } from "./../../../app.json";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentDisModal: {
    backgroundColor: "#fff",
    width: WIDTH * 0.9,
  },
  title: {
    flexDirection: "column",
    marginTop: 30,
    marginLeft: WIDTH * 0.075,
  },
  desc: {
    marginLeft: WIDTH * 0.075,
    marginRight: WIDTH * 0.05,
    color: "#868686",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
});

class Map extends React.Component {
  state = {
    latitude: -6.2006314,
    longitude: 106.7826341,
  };

  componentDidMount() {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.state.latitude +
        "," +
        this.state.longitude +
        "&key=" +
        mapApiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
        );
      });
  }

  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}
      >
        <View style={styles.contentDisModal}>
          <View style={{ height: "75%" }}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              minZoomLevel={16}
              region={{
                latitude: parseFloat(this.state.latitude),
                longitude: parseFloat(this.state.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(this.state.latitude),
                  longitude: parseFloat(this.state.longitude),
                }}
              />
            </MapView>
          </View>
          <View style={styles.title}>
            <Text title>{"Posisi "}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Map;
