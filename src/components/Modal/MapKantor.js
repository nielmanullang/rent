import { Text, View } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";

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
  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}
      >
        <View style={styles.contentDisModal}>
          <View style={styles.title}>
            <Text title>{"Posisi "}</Text>
          </View>
          <View style={{ height: "75%" }}>
            {/* <Text style={styles.desc}>{"this.props.item.desc"}</Text> */}
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              minZoomLevel={16}
              region={{
                latitude: parseFloat(-6.2006314),
                longitude: parseFloat(106.7826341),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(-6.2006314),
                  longitude: parseFloat(106.7826341),
                }}
              />
            </MapView>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Map;
