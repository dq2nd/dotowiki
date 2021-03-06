/**
 * Hero scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text as ReactNativeText,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  // Button,
  Slider
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  InputGroup,
  Input,
  Text,
  Card,
  CardItem,
  Tabs,
  List,
  ListItem,
  Thumbnail,
  H1,
  H2,
  H3
} from 'native-base';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';

const styles = StyleSheet.create({

});

class HeroScene extends Component {
  constructor(props) {
    super(props);

    this._onPressBack = this._onPressBack.bind(this);
    this._onPressAbility = this._onPressAbility.bind(this);
    this._onChangeValueLevelSlider = this._onChangeValueLevelSlider.bind(this);

    this.state = {
      hero: this.props.hero,
      heroLevel: 0
    };
  }

  componentWillMount() {
    var hero = this.state.hero;

    hero["attackDamageMinLevelX"] = hero.attackDamageMin;
    hero["attackDamageMaxLevelX"] = hero.attackDamageMax;
    hero["attributeStrengthLevelX"] = hero.attributeBaseStrength;
    hero["attributeAgilityLevelX"] = hero.attributeBaseAgility;
    hero["attributeIntelligenceLevelX"] = hero.attributeBaseIntelligence;
    hero["statusHealthLevelX"] = hero.statusHealth;
    hero["statusHealthRegenLevelX"] = hero.statusHealthRegen;
    hero["statusManaLevelX"] = hero.statusMana;
    hero["statusManaRegenLevelX"] = hero.statusManaRegen;
    hero["armorPhysicalLevelX"] = hero.armorPhysical;
    hero["magicalResistanceLevelX"] = hero.magicalResistance;

    this.setState({
      hero: hero
    });
  }

  _onPressBack() {
    this.props.navigator.pop();
  }

  _onPressAbility(ability) {
    this.props.navigator.push({
      scene_id: "AbilityScene",
      selected_ability: ability
    });
  }

  _onChangeValueLevelSlider(heroLevel) {
    var hero = this.state.hero;

    // Based on primary attribute, calculate stats at level X
    if (heroLevel === 0) {
      hero.attributeStrengthLevelX = 0;
      hero.attributeAgilityLevelX = 0;
      hero.attributeIntelligenceLevelX = 0;
    } else {
      hero.attributeStrengthLevelX = hero.attributeBaseStrength + hero.attributeStrengthGain * heroLevel;
      hero.attributeAgilityLevelX = hero.attributeBaseAgility + hero.attributeAgilityGain * heroLevel;
      hero.attributeIntelligenceLevelX = hero.attributeBaseIntelligence + hero.attributeIntelligenceGain * heroLevel;
    }


    if (hero.attributePrimary === 'STRENGTH') {
      // If strength is a hero's primary attribute, every point in strength increases his or her attack damage by 1.
      hero.attackDamageMinLevelX = hero.attackDamageMin + hero.attributeStrengthLevelX;
      hero.attackDamageMaxLevelX = hero.attackDamageMax + hero.attributeStrengthLevelX;
    } else if (hero.attributePrimary === 'AGILITY') {
      // If agility is a hero's primary attribute, every point in agility increases his or her attack damage by 1
      hero.attackDamageMinLevelX = hero.attackDamageMin + hero.attributeAgilityLevelX;
      hero.attackDamageMaxLevelX = hero.attackDamageMax + hero.attributeAgilityLevelX;
    } else if (hero.attributePrimary === 'INTELLECT') {
      // If intelligence is a hero's primary attribute, every point in intelligence increases his or her attack damage by 1.
      hero.attackDamageMinLevelX = hero.attackDamageMin + hero.attributeIntelligenceLevelX;
      hero.attackDamageMaxLevelX = hero.attackDamageMax + hero.attributeIntelligenceLevelX;
    }
    // Every point in strength increases maximum health by 20.
    hero.statusHealthLevelX = hero.statusHealth + hero.attributeStrengthLevelX * 20;
    // Every point in strength increases health regeneration by 0.03 HP per second.
    hero.statusHealthRegenLevelX = hero.statusHealthRegen + hero.attributeStrengthLevelX * 0.03;
    // Every point in agility increases a hero's armor by 1/7.
    hero.armorPhysicalLevelX = hero.armorPhysical + hero.attributeAgilityLevelX / 7;
    // Every point in agility increases a hero's attack speed by 1.
    // TODO: Add this stat
    // Every point in intelligence increases a hero's maximum Mana by 12.
    hero.statusManaLevelX = hero.statusMana + hero.attributeIntelligenceLevelX * 12;
    // Every point in intelligence increases a hero's mana regeneration by 0.04 mana per second.
    hero.statusManaRegenLevelX = hero.statusManaRegen + hero.attributeIntelligenceLevelX * 0.04;
    // Every point in intelligence increases a hero's spell damage by 0.0625%.
    hero.magicalResistanceLevelX = hero.magicalResistance + hero.attributeIntelligenceLevelX * 0.00625;

    hero.attributeStrengthLevelX = hero.attributeBaseStrength + hero.attributeStrengthGain * heroLevel;
    hero.attributeAgilityLevelX = hero.attributeBaseAgility + hero.attributeAgilityGain * heroLevel;
    hero.attributeIntelligenceLevelX = hero.attributeBaseIntelligence + hero.attributeIntelligenceGain * heroLevel;

    this.setState({
      hero: hero,
      heroLevel: heroLevel
    })
  }

  render() {
    var theLastIndexOfNormalAbility = 0;

    return (
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Header>
          <Button transparent>
            <Icon
              name='ios-arrow-back'
              onPress={() => this._onPressBack()}
            />
          </Button>
          <Title>{this.state.hero.localized_name}</Title>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 272/2, width: 234/2, marginRight: 3}} source={{uri: this.state.hero.portrait_url}} />
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {
                    this.state.hero.attributePrimary === 'STRENGTH' ?
                      <Image source={require('./../images/icons/strength_primary.png')} style={{height: 40, width: 40, margin: 3}}/> :
                      <Image source={require('./../images/icons/strength.png')} style={{height: 40, width: 40, margin: 3}}/>
                  }
                    <Text>{this.state.hero.attributeStrengthLevelX.toFixed(0)} (+{this.state.hero.attributeStrengthGain})</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {
                    this.state.hero.attributePrimary === 'AGILITY' ?
                      <Image source={require('./../images/icons/agility_primary.png')} style={{height: 40, width: 40, margin: 3}}/> :
                      <Image source={require('./../images/icons/agility.png')} style={{height: 40, width: 40, margin: 3}}/>
                  }
                    <Text>{this.state.hero.attributeAgilityLevelX.toFixed(0)} (+{this.state.hero.attributeAgilityGain})</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {
                    this.state.hero.attributePrimary === 'INTELLECT' ?
                      <Image source={require('./../images/icons/intelligence_primary.png')} style={{height: 40, width: 40, margin: 3}}/> :
                      <Image source={require('./../images/icons/intelligence.png')} style={{height: 40, width: 40, margin: 3}}/>
                  }
                    <Text>{this.state.hero.attributeIntelligenceLevelX.toFixed(0)} (+{this.state.hero.attributeIntelligenceGain})</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>Level {this.state.heroLevel}</Text>
                <Slider
                  minimumValue={0}
                  maximumValue={25}
                  step={1}
                  onValueChange={(value) => this._onChangeValueLevelSlider(value)}
                />

                <Text>Health: {this.state.hero.statusHealthLevelX.toFixed(0)} (+{this.state.hero.statusHealthRegenLevelX.toFixed(3)}/s)</Text>
                <Text>Mana: {this.state.hero.statusManaLevelX.toFixed(0)} (+{this.state.hero.statusManaRegenLevelX.toFixed(3)}/s)</Text>
                <Text>Damage: {this.state.hero.attackDamageMinLevelX.toFixed(0)}-{this.state.hero.attackDamageMaxLevelX.toFixed(0)}</Text>
                <Text>Range: {this.state.hero.attackRange}</Text>
                <Text>Move speed: {this.state.hero.movementSpeed}</Text>
                <Text>Armor Physical: {this.state.hero.armorPhysicalLevelX.toFixed(3)}</Text>
                <Text>Magical Resistance: {this.state.hero.magicalResistanceLevelX.toFixed(3)}</Text>
                <Text>Vision (Day/Night): {this.state.hero.visionDaytimeRange}/{this.state.hero.visionNighttimeRange}</Text>
              </View>
            </CardItem>

            <CardItem header>
              <Text>ROLE</Text>
            </CardItem>
            <CardItem>
              <Text>{this.state.hero.role}</Text>
            </CardItem>

            <CardItem header>
              <Text>ABILITIES</Text>
            </CardItem>
            <CardItem>
            {
              this.state.hero.abilities.map((ability, index) => {
                if (ability.name.toLowerCase().search("special_bonus_") === (-1)) {
                  theLastIndexOfNormalAbility = index;
                  if (ability.full_name) {
                    return (
                      <TouchableOpacity key={ability.id} onPress={() => this._onPressAbility(ability)}>
                        <View style={{flexDirection: 'row', margin: 3}}>
                          <Image
                            source={{uri: ability.icon_url}}
                            style={{
                              height: 45,
                              width: 45
                            }}
                          />
                          <Text style={{paddingLeft: 5}}>{ability.full_name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    return null;
                  }
                }
              })
            }
            </CardItem>

            <CardItem header>
              <Text>TALENT TREE</Text>
            </CardItem>
            <CardItem>
            {
              this.state.hero.abilities.map((ability, index) => {
                if (ability.name.toLowerCase().search("special_bonus_") !== (-1)) {
                  var indexOfAbilityInTalentTree = index - theLastIndexOfNormalAbility;
                  switch (indexOfAbilityInTalentTree) {
                    case (1):
                    case (3):
                    case (5):
                    case (7):
                      return (
                        <View  key={this.state.hero.abilities[index].id + "_" + this.state.hero.abilities[index + 1].id}>
                          <Text>
                            Level {10 + 2.5 * (indexOfAbilityInTalentTree - 1)}: {this.state.hero.abilities[index].full_name} OR {this.state.hero.abilities[index + 1].full_name}
                          </Text>
                        </View>
                      );
                    default:
                      return null;
                  }
                }
              })
            }
            </CardItem>

            <CardItem header>
              <Text>LORE</Text>
            </CardItem>
            <CardItem>
              <Text>{this.state.hero.lore}</Text>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = HeroScene;
