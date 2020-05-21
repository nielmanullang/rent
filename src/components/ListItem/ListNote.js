import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  list: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 12,
    color: '#868686',
  },
});

class ListNote extends React.Component {
  renderlistItem = () => {
    return this.props.listItem.map((data, i) => {
      return (
        <Text key={i} style={styles.list}>
          {data.text}
        </Text>
      );
    });
  };

  render() {
    return <View style={styles.container}>{this.renderlistItem()}</View>;
  }
}

export default ListNote;
