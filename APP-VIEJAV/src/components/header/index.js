import React from 'react';
// import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};
const Header = (props) => {
  const {
    mainText = '',
    leftText,
    leftAction,
    leftComponent,
    noShadow = false,
    imageLeft,
    actionRight = [],
    styleMainText = {},
    styleContainer = {},
    stylesHeader = {},
    stylesHeaderImage = {},
    stylesHeaderText = {},
    stylesTextRight = {},
    stylesTextLeft = {},
  } = props;
  const containerStyles = noShadow ? styles.containerNoShadow : styles.container;
  return (
    <View style={[containerStyles, styleContainer]}>
      <View pointerEvents={'box-none'} style={[styles.headerContainer, stylesHeader]}>
        <View pointerEvents={'box-none'} style={[styles.styleTitle, styleMainText]}>
          {mainText ? (
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.headerText, stylesHeaderText]}>
              {mainText || ''}
            </Text>
          ) : null}
          {props.children && (
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', paddingTop: 15 }}>{props.children}</View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.secondaryHeaderImage, stylesHeaderImage]}
          hitSlop={hitSlop}
          onPress={leftAction}
        >
          {imageLeft ? <Image resizeMode="cover" source={imageLeft} /> : leftComponent ? leftComponent : null}
          {leftText ? (
            <Text style={[styles.secondaryHeaderText, styles.cancelText, stylesTextLeft]}>{leftText}</Text>
          ) : null}
        </TouchableOpacity>
        <View pointerEvents={'box-none'} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {actionRight.map((value, index) => (
            <TouchableOpacity
              key={index}
              hitSlop={hitSlop}
              style={[styles.secondaryHeaderImage, index > 0 ? { marginLeft: 20 } : {}, value.styleTouchable || {}]}
              onPress={value.action}
            >
              {!!value.component && value.component}
              {!!value.icon && <Image resizeMode="cover" source={value.icon} />}
              {/* {!!value.text && <Text style={[styles.secondaryHeaderText, stylesTextRight]}>{value.text || ''}</Text>} */}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Header;
