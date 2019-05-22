import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, ListItem } from 'react-native-elements';
import { FlatList, ScrollView, TouchableHighlight } from 'react-native';
import styled, { css } from 'styled-components/native';

import { colors, texts } from '../config';

export const ListTitle = styled.Text`
  color: ${colors.darkText};
  ${(props) =>
    props.alternativeLayout &&
    css`
      font-weight: bold;
    `};
`;

export const ListSubtitle = styled(ListTitle)`
  color: ${colors.primary};
  margin-bottom: 10;
  font-weight: 100;

  ${(props) =>
    props.listService &&
    css`
      margin-bottom: 0;
      font-size: 1;
      color: ${colors.lightestText};
    `};
  ${(props) =>
    props.alternativeLayout &&
    css`
      color: ${colors.darkText};
    `};
`;

export class TextList extends React.Component {
  keyExtractor = (item, index) => item + index;

  renderItem = ({ item }) => {
    const { navigation, alternativeLayout, noSubtitle } = this.props;

    return (
      <ListItem
        title={
          noSubtitle ? null : (
            <ListSubtitle second={alternativeLayout}>{item.subtitle}</ListSubtitle>
          )
        }
        subtitle={<ListTitle second={alternativeLayout}>{item.title}</ListTitle>}
        bottomDivider={true}
        containerStyle={
          alternativeLayout ? { backgroundColor: '#ddf2f3', borderBottomColor: '#fff' } : null
        }
        rightIcon={<Icon name="angle-right" type="font-awesome" color={colors.primary} />}
        onPress={() => navigation.navigate('Detail', item)}
      />
    );
  };
  render() {
    const { data } = this.props;

    return (
      <FlatList
        scrollEnabled="false"
        keyExtractor={this.keyExtractor}
        data={data}
        renderItem={this.renderItem}
      />
    );
  }
}
