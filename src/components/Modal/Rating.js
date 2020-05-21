import moment from 'moment';
import {Icon, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    borderTopColor: '#F8F8F8',
    borderTopWidth: 1,
  },
  leftHeader: {
    flex: 0.2,
    alignItems: 'center',
  },
  rightHeader: {
    flex: 0.6,
    alignItems: 'center',
  },
  coverBtn: {
    backgroundColor: '#fff',
  },
  btnNext: {
    alignContent: 'center',
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#FCFCFC',
    borderTopWidth: 1,
  },
  btnNextDisable: {
    backgroundColor: '#868686',
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  btnNextLink: {
    backgroundColor: '#CE9D3C',
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  btnNextText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  content2: {
    marginTop: 15,
  },
});
const styles2 = StyleSheet.create({
  container: {backgroundColor: 'white', left: 0},
  content: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  cover: {flexDirection: 'column', marginTop: 15},
  title: {fontSize: 15, fontWeight: 'bold', color: '#3D3D3D'},
  title2: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3D3D3D',
    marginTop: 10,
    textAlign: 'center',
  },
  note: {fontSize: 14, fontWeight: 'normal', color: '#3D3D3D', marginTop: 10},
  desc: {fontSize: 12, fontWeight: 'normal', color: '#868686', flex: 0.65},
  noteCover: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  btnEdit: {
    flex: 0.35,
    borderWidth: 1,
    borderColor: '#CC9E1D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  btnEditText: {fontWeight: 'bold', fontSize: 12, color: '#CC9E1D'},
  descRight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#CC9E1D',
    flex: 0.65,
    textAlign: 'right',
  },
  title3: {fontSize: 12, fontWeight: '600', color: '#3D3D3D'},
  title4: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D3D3D',
    marginTop: 10,
    textAlign: 'center',
  },
});

class Rating extends React.Component {
  state = {
    rating: [],
    submit: false,
  };

  componentDidMount() {
    let index = this.props.rating;
    let rating = [];
    if (index !== undefined && index !== null) {
      for (i = 0; i < 5; i++) {
        if (i < index) {
          rating.push({
            picked: true,
          });
        } else {
          rating.push({
            picked: false,
          });
        }
      }
    } else {
      for (i = 0; i < 5; i++) {
        rating.push({
          picked: false,
        });
      }
    }

    this.setState({rating});
  }

  _pick = index => {
    let rating = this.state.rating;
    for (i = 0; i < 5; i++) {
      if (i < index + 1) {
        rating[i].picked = true;
      } else {
        rating[i].picked = false;
      }
    }
    this.setState({rating, submit: true});
  };

  buttonSubmit = () => {
    if (this.state.rating[0].picked) {
      return (
        <View style={styles.btnNext}>
          <TouchableOpacity
            onPress={() => this.props._submitRating(this.state.rating)}
            style={styles.btnNextLink}>
            <Text style={styles.btnNextText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.btnNext}>
          <View style={styles.btnNextDisable}>
            <Text style={styles.btnNextText}>SUBMIT</Text>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}
        style={{
          justifyContent: 'flex-end',
          height: '100%',
          margin: 0,
        }}>
        <View style={styles2.container}>
          <View style={styles2.content}>
            <View style={styles.content}>
              <View
                style={{
                  backgroundColor: 'black',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -10,
                  marginBottom: 10,
                }}>
                <Icon white type="FontAwesome" name="home" />
              </View>
              <Text style={styles2.title}>{this.props.title}</Text>
              <Text style={styles2.title4}>
                {'No. ' + this.props.ticketCode}
              </Text>
              <Text style={styles2.title2}>{this.props.desc}</Text>
            </View>
            <View style={styles2.cover}>
              <View style={{flexDirection: 'row'}}>
                {this.state.rating.map((data, i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => this._pick(i)}>
                      <Icon
                        type="FontAwesome"
                        name={data.picked ? 'star' : 'star-o'}
                        size={20}
                        style={{color: '#EFC54F'}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={styles.content2}>
              <Text style={styles2.title3}>
                {moment(new Date()).format('ddd, D MMM YYYY, H:mm')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.coverBtn}>{this.buttonSubmit()}</View>
      </Modal>
    );
  }
}

export default Rating;
