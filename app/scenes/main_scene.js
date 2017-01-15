/**
 * Main scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  ListView,
  Image,
  Alert,
  Navigator,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  Button,
  ViewPagerAndroid,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#F5FCFF',
  },

  top: {
    // flex: 1,
    height: 50,
  },

  top_title: {
    fontSize: 20,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    // height: 500,
  },

  content_navigation: {
    // flex: 1,
    height: 30,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  bottom: {
    // flex: 1,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Show hero list in grid
  item_list: {
    // flex: 1,
    padding: 12,
    // height: 300,
    // flexDirection: 'row',
    // alignItems: 'center',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden'
  },

  item_box: {
    // width: 59,
    height: 33,
    // backgroundColor: 'red',
    margin: 3,
    // alignItems: 'stretch',
    flexDirection: 'row',
  },

  item_image: {
    // flex: 1,
    width: 59,
    height: 33
  },

  item_text: {
    padding: 3,
  }
});

// NOTE: All React components must start with a upper case letter, or contain a dot.
class Top extends Component {
  render() {
    return (
      <View style={styles.top}>
        <Text style={styles.top_title}>
          DOTOWIKI
        </Text>
      </View>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props);
    // Setup data source for ListView
    // Initialize with empty data
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this._onPressIcon = this._onPressIcon.bind(this);
    this._onPressIconHero = this._onPressIconHero.bind(this);
    this._onPressIconItem = this._onPressIconItem.bind(this);
    this.state = {
      modalVisisble: false,
      // dataSource: ds.cloneWithRows([]),
      // dataSourceHeroes: ds.cloneWithRows(this.props.heroes),
      // dataSourceItems: ds.cloneWithRows(this.props.items),
      // heroes:[],
      // heroes_bio: {},
      // item: [],
      heroes: this.props.heroes,
      items: this.props.items,
      isHeroSelected: true,
      isItemSelected: false,
    };
  }

  componentDidMount() {
    // // Get heroes from https://dotowiki.herokuapp.com/heroes
    // try {
    //   const data = AsyncStorage.getItem("dotowiki_heroes.json")
    //   .then((response) => {
    //     if (response) {
    //       data = JSON.parse(response);
    //       console.log(data);
    //       // Avoid empty data
    //       if (data === "") {
    //         Alert.alert("No heroes data! Please download again!");
    //         data = [];
    //       }
    //       this.setState({
    //         heroes: data,
    //       });
    //       this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
    //       });
    //     } else {
    //       Alert.alert("No heroes data! Please download again!");
    //     }
    //   });
    // } catch (error) {
    //   // Error retrieving data
    //   console.log(error);
    //   Alert.alert("Incorrect heroes data! Please download again!");
    //   this.setState({
    //     heroes: [],
    //   });
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
    //   });
    // }

    // // Get items from https://dotowiki.herokuapp.com/dotowiki_items.json
    // try {
    //   const data = AsyncStorage.getItem("dotowiki_items.json")
    //   .then((response) => {
    //     if (response) {
    //       data = JSON.parse(response);
    //       console.log(data);
    //       // Avoid empty data
    //       if (data === "") {
    //         Alert.alert("No items data! Please download again!");
    //         data = [];
    //       }
    //       this.setState({
    //         items: data,
    //       });
    //       // this.setState({
    //       //   dataSource: this.state.dataSource.cloneWithRows(this.state.items),
    //       // });
    //     } else {
    //       Alert.alert("No items data! Please download again!");
    //     }
    //   });
    // } catch (error) {
    //   // Error retrieving data
    //   console.log(error);
    //   Alert.alert("Incorrect items data! Please download again!");
    //   this.setState({
    //     items: [],
    //   });
    //   // this.setState({
    //   //   dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
    //   // });
    // }

    var heroes = this.state.heroes;
    for (hero of heroes) {
      hero['visibility'] = true;
    }
    var items = this.state.items;
    for (item of items) {
      item['visibility'] = true;
    }
    this.setState({
      heroes: heroes,
      items: items
    });
  }

  _onPressIcon(data) {
    if (this.state.isHeroSelected == true) {
      // Push Hero scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: "HeroScene",
        // heroes_bio: this.state.heroes_bio,
        selected_hero: data,
      });
    } else if (this.state.isItemSelected == true) {
      // Push Item scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: "ItemScene",
        selected_item: data,
      });
    } else {

    }
  }

  _onPressIconHero(data) {
    // Push Hero scene to stack of navigator with necessary data
    this.props.navigator.push({
      scene_id: "HeroScene",
      // heroes_bio: this.state.heroes_bio,
      selected_hero: data,
    });
  }

  _onPressIconItem(data) {
    // Push Item scene to stack of navigator with necessary data
    this.props.navigator.push({
      scene_id: "ItemScene",
      selected_item: data,
    });
  }

  _onPressButtonHero() {
    this.viewPager.setPage(0);
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      isHeroSelected: true,
      isItemSelected: false,
    });
  }

  _onPressButtonItem() {
    this.viewPager.setPage(1);
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(this.state.items),
      isHeroSelected: false,
      isItemSelected: true,
    });
  }

  _onPressButtonDownload() {
    var counter = 2;

    this.setState({
      modalVisisble: true
    });

    console.log("Downloading heroes data from https://dotowiki.herokuapp.com/dotowiki_heroes.json");
    try {
      fetch("https://dotowiki.herokuapp.com/dotowiki_heroes.json", {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Downloading heroes is done!");
        this.setState({
          heroes: data,
        });
        console.log(data);

        AsyncStorage.setItem("dotowiki_heroes.json", JSON.stringify(data));

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
        });

        counter--;
        if (counter === 0) {
          this.setState({
            modalVisisble: false
          });
        }
      })
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading heroes is failed!");
      console.log(error);
    }

    console.log("Downloading items from https://dotowiki.herokuapp.com/dotowiki_items.json");
    try {
      fetch("https://dotowiki.herokuapp.com/dotowiki_items.json", {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Downloading items is done!");
        this.setState({
          items: data,
        });
        console.log(data);

        AsyncStorage.setItem("dotowiki_items.json", JSON.stringify(data));

        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(this.state.items),
        // });
        counter--;
        if (counter === 0) {
          this.setState({
            modalVisisble: false
          });
        }
      })
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading items is failed!");
      console.log(error);
    }
  }

  _onChangeInputSearch(text) {
    // console.log(text);
    if (this.state.isHeroSelected) {
      var heroes = this.state.heroes;
      for (var hero of heroes) {
        if (hero.localized_name.toLowerCase().search(text.toLowerCase()) === (-1)) {
          hero.visibility = false;
        } else {
          hero.visibility = true;
        }
      }
      this.setState({
        heroes: heroes
      });
    } else if (this.state.isItemSelected) {
      var items = this.state.items;
      for (var item of items) {
        if (item.localized_name.toLowerCase().search(text.toLowerCase()) === (-1)) {
          item.visibility = false;
        } else {
          item.visibility = true;
        }
      }
      this.setState({
        items: items
      });
    }
  }

  _onPressButtonClearInput() {
    this.searchInput.clear();
    this._onChangeInputSearch("");
  }

  render() {
    return (
      <View style={styles.content}>
        <Modal
          animationType = {"fade"}
          transparent = {false}
          visible = {this.state.modalVisisble}
          onRequestClose={() => {
              this.setState({
                modalVisisble: false
              });
            }
          }
        >
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{textAlign: 'center'}}>Downloading...</Text>
            <ActivityIndicator
              animating={true}
              size="small"
            />
          </View>
        </Modal>
{/*        <Button
          title="Download data"
          onPress={() => this._onPressButtonDownload()}
        />*/}
        <View style={styles.content_navigation}>
          <TouchableHighlight onPress={() => this._onPressButtonHero()}>
            <Text style={{fontSize: 18}}>Hero</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onPressButtonItem()}>
            <Text style={{fontSize: 18}}>Item</Text>
          </TouchableHighlight>
        </View>
{/*        <ListView
          contentContainerStyle={styles.item_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
              // Only render heroes and items whose cost is greater than 0 (no need recipe)
              if (Number(rowData.cost) > 0 || rowData.cost === undefined) {
                return (
                  <View style={styles.item_box}>
                    <TouchableHighlight onPress={() => this._onPressIcon(rowData)}>
                      <Image
                        source={{uri: rowData.icon_url}}
                        style={styles.item_image}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this._onPressIcon(rowData)}>
                      <Text style={styles.item_text}>{rowData.localized_name}</Text>
                    </TouchableHighlight>
                  </View>
                );
              } else {
                // Render empty element
                return (<View></View>);
              }
            }
          }
        />*/}
        <View style={{flex: 1}}>
          <ViewPagerAndroid  style={{flex: 1}} ref={(viewPager) => {this.viewPager = viewPager;}}>
            <View>
              <ScrollView>
                {
                  this.state.heroes.map((hero, index) => {
                    if (hero.visibility) {
                      return (
                        <View key={hero.short_name} style={styles.item_box}>
                          <TouchableHighlight onPress={() => this._onPressIconHero(hero)}>
                            <Image
                              source={{uri: hero.icon_url}}
                              style={styles.item_image}
                            />
                          </TouchableHighlight>
                          <TouchableHighlight onPress={() => this._onPressIconHero(hero)}>
                            <Text style={styles.item_text}>{hero.localized_name}</Text>
                          </TouchableHighlight>
                        </View>
                      );
                    } else {
                      return(<View key={hero.short_name}></View>);
                    }
                  })
                }
              </ScrollView>
            </View>
            <View>
              <ScrollView>
                {
                  this.state.items.map((item, index) => {
                    // Only render items whose cost is greater than 0 (no need recipe)
                    if (Number(item.cost) > 0 || item.cost === undefined) {
                      if (item.visibility) {
                        return (
                          <View key={item.short_name} style={styles.item_box}>
                            <TouchableHighlight onPress={() => this._onPressIconItem(item)}>
                              <Image
                                source={{uri: item.icon_url}}
                                style={styles.item_image}
                              />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this._onPressIconItem(item)}>
                              <Text style={styles.item_text}>{item.localized_name}</Text>
                            </TouchableHighlight>
                          </View>
                        );
                      } else {
                        return(<View key={item.short_name}></View>);
                      }
                    } else {
                      return(<View key={item.short_name}></View>);
                    }
                  })
                }
              </ScrollView>
            </View>
          </ViewPagerAndroid>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            ref={(searchInput) => this.searchInput = searchInput}
            style={{flex: 10}}
            placeholder="Type to start searching..."
            onChangeText={(text) => this._onChangeInputSearch(text)}
          />
          <Button
            title="Clear"
            onPress={() => this._onPressButtonClearInput()}
          />
        </View>
      </View>
    );
  }
}

class Bottom extends Component {
  render() {
    return (
      <View style={styles.bottom}>
        <TextInput
          placeholder="Input everything you want to search!"
        />
      </View>
    );
  }
}

class MainScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Top/>
        <Content
          navigator={this.props.navigator}
          heroes={this.props.heroes}
          items={this.props.items}
        />
        {/*<Bottom/>*/}
      </View>
    )
  }
}

module.exports = MainScene;
